import * as React from "react";
//import "./Dropzone.scss";
import useDropzoneStyles from "../hooks/useDropzoneStyles";

import { DropzoneProps, DropzonePropsDefault } from "./DropzoneProps";

import DropzoneHeader from "../DropzoneHeader/DropzoneHeader";
import DropzoneFooter from "../DropzoneFooter.tsx/DropzoneFooter";
import { FileItemContainer } from "../../../../components/file-item";
import { FileItemContainerProps } from "../../../file-item/components/FileItemContainer/FileItemContainerProps";
import DropzoneLabel from "../DropzoneLabel/DropzoneLabel";
import {
  FileDuiResponse,
  //uploadPromiseAxios,
  UploadPromiseAxiosResponse,
} from "../utils/dropzone-ui.upload.utils";
import {
  DropzoneLocalizerSelector,
  ValidateErrorLocalizerSelector,
} from "../../../../localization";
import {
  FunctionLabel,
  LocalLabels,
} from "../../../../localization/localization";
import { mergeProps } from "@dropzone-ui/core";
import { uploadPromiseXHR } from "../../../../utils/file-upload/dropzone-ui-upload.utils";
import { FileValidated, FileValidator, UPLOADSTATUS } from "../../../../utils";
import {
  customValidateFile,
  validateFile,
} from "../../../../utils/file-validation/validation.methods";
import { createRippleFromElement } from "../../../../utils/ripple/ripple";
import { Method } from "../../../../utils/dropzone-ui-types";

const Dropzone: React.FC<DropzoneProps> = (props: DropzoneProps) => {
  const {
    //it is only an output for user
    onDrop,
    //what goes inside
    children,
    //delete everything in dropzone
    onReset,
    //theme color
    color,
    //style for borders, ripple and dragEnter
    style,
    //default is transparent, can be changed
    backgroundColor,
    //
    onClick,
    //function validator for each file
    validator,
    //max file size per file
    maxFileSize,
    //max amount of files
    maxFiles,
    //mimetypes accepted
    accept,
    //disable the ripple effect
    disableRipple,
    //unable or disable open a file dalog
    clickable,
    //change from list to grid
    onChangeView,
    //specific view, when disableScroll is true, this prop is ignored
    view,
    //style MAX height of container
    maxHeight,
    //style MIN height of container
    minHeight,
    //action when clean button is clicked, if not present, button is not showed
    onClean,
    //start uploading if a url was given
    uploadOnDrop,
    //unable or disable footer
    footer,
    //unable or disable header
    header,
    //method for uploading
    method,
    //endpoint for uploading
    url,
    //special config for uploading
    //config,
    // the value, array of FileItems
    value,
    //notify user when upload has started
    onUploadStart,
    //notify user when upload has finished
    onUploadFinish,
    // onUploading,

    //message for footer when uploading
    uploadingMessage,
    //
    onChange,
    behaviour,
    label,
    fakeUploading,
    localization,
    disableScroll,
    headers,
  } = mergeProps(props, DropzonePropsDefault);
  //ref for ripple
  const dz_ui_ripple_ref = React.useRef<HTMLDivElement>(null);
  //re-validation: for development purposes and for preventing clean fileList in web page code generator
  React.useEffect(() => {
    if (files.length > 0) {
      let fileList: FileList = files.map((x) => x.file) as unknown as FileList;
      const remainingValids: number =
        (maxFiles || Infinity) - numberOfValidFiles;
      const localValidator: FileValidator = {
        accept: accept,
        maxFileSize: maxFileSize,
      };
      const output: FileValidated[] = fileListvalidator(
        fileList,
        remainingValids,
        localValidator
      );
      onChange?.(output);
    }
    // eslint-disable-next-line
  }, [accept, maxFileSize, maxFiles]);
  //localizers
  const DropzoneLocalizer: LocalLabels =
    DropzoneLocalizerSelector(localization);
  const ValidationErrorLocalizer: LocalLabels =
    ValidateErrorLocalizerSelector(localization);

  //ref to the hidden input tag
  const inputRef = React.useRef<HTMLInputElement>(null);
  // whether is draggin or not
  const [isDragging, setIsDragging] = React.useState<boolean>(false);
  // list of files (local)
  const [files, setFiles] = React.useState<FileValidated[]>([]);
  const [localView, setLocalView] =
    React.useState<FileItemContainerProps["view"]>("grid");
  const [localMessage, setLocalMessage] = React.useState<string>("");

  //ClassName for dynamic style
  const [onUploadingStart, setOnUploadingStart] =
    React.useState<boolean>(false);
  // const [queueFiles, setQueueFiles] = useState<FileValidated[]>([]);
  // const offset:number= header && footer? 50: (!header && footer?23:(header && !footer?22:0)) ;

  const classNameCreated: string = useDropzoneStyles(
    color,
    backgroundColor,
    disableScroll ? undefined : maxHeight,
    minHeight,
    header && footer ? 50 : !header && footer ? 23 : header && !footer ? 22 : 0
  );
  const finalClassName: string = `dropzone-ui${classNameCreated}${
    isDragging ? ` drag` : ``
  }${clickable ? ` clickable` : ``}`;

  //number of files
  const [numberOfValidFiles, setNumberOfValidFiles] = React.useState<number>(0);
  React.useEffect(() => {
    if (value) {
      setFiles(value);
      setNumberOfValidFiles(value.filter((x: FileValidated) => x.valid).length);
    }
  }, [value]);
  React.useEffect(() => {
    if (disableScroll) {
      setLocalView("grid");
    } else if (view) {
      setLocalView(view);
    }
  }, [view, disableScroll]);
  React.useEffect(() => {
    if (uploadingMessage) {
      setLocalMessage(uploadingMessage);
    }
  }, [uploadingMessage]);

  const handleCleanFiles = (): void => {
    let filesCleaned: FileValidated[] = [];
    filesCleaned = files.filter((x: FileValidated) => x.valid);
    try {
      onClean?.(filesCleaned);
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error(error);
      }
    }

    onChange?.(filesCleaned);
  };
  /**
   * Method for uploading Files
   * It will set valid or not valid in a radom way
   * @param files
   */
  const fakeUpload = (
    file: FileValidated
  ): Promise<UploadPromiseAxiosResponse> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const randomNumber = Math.floor(Math.random() * 10);
        if (randomNumber % 2 === 0) {
          const status = true;
          const message = DropzoneLocalizer.fakeuploadsuccess as string;
          const payload = { url: "" };
          resolve({
            uploadedFile: {
              ...file,
              uploadStatus: UPLOADSTATUS.success,
              uploadMessage: message,
            },
            serverResponse: {
              id: file.id,
              serverResponse: { status, message, payload },
            },
          });
        } else {
          const status = false;
          const message = DropzoneLocalizer.fakeUploadError as string;
          const payload = {};
          resolve({
            uploadedFile: {
              ...file,
              uploadStatus: UPLOADSTATUS.error,
              uploadMessage: message,
            },
            serverResponse: {
              id: file.id,
              serverResponse: { status, message, payload },
            },
          });
        }
      }, 1500);
    });
  };

  const uploadFiles = async (files: FileValidated[]) => {
    const totalNumber = files.length;
    const missingUpload = files.filter(
      (x) => x.valid && x.uploadStatus !== "success"
    ).length;
    let totalRejected: number = 0;
    let currentCountUpload: number = 0;
    const uploadingMessenger: FunctionLabel =
      DropzoneLocalizer.uploadingMessage as FunctionLabel;

    setOnUploadingStart(true);
    if (missingUpload > 0 && url) {
      setLocalMessage(
        uploadingMessenger(`${missingUpload}/${totalNumber}`)
        /* localization === "ES-es"
          ? `Subiendo ${missingUpload}/${totalNumber} archivos`
          : `uploading ${missingUpload}/${totalNumber} files`, */
      );

      let uploadStartFiles: FileValidated[] = files.map((f: FileValidated) => {
        if (f.uploadStatus !== UPLOADSTATUS.success && f.valid) {
          return { ...f, uploadStatus: UPLOADSTATUS.uploading };
        } else return f;
      });

      //make all uploading
      onChange?.(uploadStartFiles);
      ///////
      let updatedList: FileValidated[] = uploadStartFiles;
      let serverResponses: FileDuiResponse[] = [];
      onUploadStart?.(
        uploadStartFiles.filter(
          (f) => f.uploadStatus === UPLOADSTATUS.uploading
        )
      );
      for (let i = 0; i < uploadStartFiles.length; i++) {
        let currentFile: FileValidated = uploadStartFiles[i];
        if (currentFile.uploadStatus === UPLOADSTATUS.uploading) {
          setLocalMessage(
            uploadingMessenger(`${++currentCountUpload}/${missingUpload}`)
          );

          const { serverResponse, uploadedFile }: UploadPromiseAxiosResponse =
            fakeUploading
              ? await fakeUpload(currentFile)
              : //: await uploadPromiseAxios(currentFile, url, method, config);
                await uploadPromiseXHR(currentFile, url, method as Method, headers);
          console.log("*** serverResponse", serverResponse);
          console.log("*** uploadedFile", uploadedFile);
          serverResponses.push(serverResponse);

          if (uploadedFile.uploadStatus === "error") {
            totalRejected++;
          }
          updatedList = updatedList.map((f) => {
            if (f.id === currentFile.id) {
              return uploadedFile;
            } else {
              return f;
            }
          });
          onChange?.(updatedList);
        }
      }

      // upload group finished :D
      onUploadFinish?.(serverResponses);
      const finishUploadMessenger: FunctionLabel =
        DropzoneLocalizer.uploadFinished as FunctionLabel;
      setLocalMessage(
        finishUploadMessenger(missingUpload - totalRejected, totalRejected)
      );
      setTimeout(() => {
        setOnUploadingStart(false);
      }, 2300);
    } else {
      setLocalMessage(
        DropzoneLocalizer.noFilesMessage as string
        /* localization === "ES-es"
          ? `No hay archivos válidos pendientes por subir`
          : `There is not any missing valid file for uploading`, */
      );
      setTimeout(() => {
        setOnUploadingStart(false);
      }, 2300);
    }
  };
  const handleFilesChange = (output: FileValidated[]) => {
    //setNumberOfValidFiles(output.filter((x:FileValidated) => x.valid).length);

    onDrop?.(output);
    onChange?.(behaviour === "replace" ? output : [...files, ...output]);

    setFiles(behaviour === "replace" ? output : [...files, ...output]);

    if (uploadOnDrop) {
      uploadFiles(behaviour === "replace" ? output : [...files, ...output]);
      //uploadFiles();
    }
  };
  /**
   *
   * @param evt
   */
  const kamui: React.DragEventHandler<HTMLDivElement> = async (
    evt: React.DragEvent<HTMLDivElement>
  ): Promise<void> => {
    evt.stopPropagation();
    evt.preventDefault();
    if (onUploadingStart) {
      setIsDragging(false);
      return;
    }
    let fileList: FileList = evt.dataTransfer.files;
    const remainingValids: number = (maxFiles || Infinity) - numberOfValidFiles;
    const localValidator: FileValidator = {
      accept: accept,
      maxFileSize: maxFileSize,
    };
    const output: FileValidated[] = fileListvalidator(
      fileList,
      remainingValids,
      localValidator
    );
    if (!disableRipple) {
      createRippleFromElement(dz_ui_ripple_ref.current, evt, color as string);

      // createRipple(evt, color as string);
    }
    setIsDragging(false);
    handleFilesChange(output);
  };

  const handleOnChangeInput: React.ChangeEventHandler<HTMLInputElement> = (
    evt: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (onUploadingStart) {
      return;
    }
    let fileList: FileList = evt.target.files as FileList;
    const remainingValids: number = (maxFiles || Infinity) - numberOfValidFiles;
    const localValidator: FileValidator = {
      accept: accept,
      maxFileSize: maxFileSize,
    };
    const output: FileValidated[] = fileListvalidator(
      fileList,
      remainingValids,
      localValidator
    );
    // Clean input element to trigger onChange event on input
    let element: HTMLInputElement | null = inputRef.current;
    if (element) {
      element.value = "";
    }
    handleFilesChange(output);
  };
  // validator

  //local function validator
  const fileListvalidator = (
    preValidatedFiles: FileList,
    remainingValids: number,
    localValidator: FileValidator
  ): FileValidated[] => {
    const output: FileValidated[] = [];
    let countdown: number = remainingValids;
    for (let i = 0, f: File; (f = preValidatedFiles[i]); i++) {
      let validatedFile: FileValidated = validateFile(
        f,
        validator,
        localValidator,
        ValidationErrorLocalizer
      );

      if (validatedFile.valid) {
        //not valid due to file count limit
        const isStillValid = countdown > 0;
        validatedFile.valid = isStillValid;
        //add error about amount of files
        if (!isStillValid) {
          const MaxFileErrorMessenger: FunctionLabel =
            ValidationErrorLocalizer.maxFileCount as FunctionLabel;
          validatedFile.errors = validatedFile.errors
            ? [
                ...validatedFile.errors,
                MaxFileErrorMessenger(maxFiles || Infinity),
              ]
            : [MaxFileErrorMessenger(maxFiles || Infinity)];
        } else {
          //add upload object
          validatedFile.xhr = new XMLHttpRequest();
        }
        countdown--;
      }
      output.push(validatedFile);
    }
    return output;
  };
  const handleUploadStart = () => {
    if (numberOfValidFiles > 0) {
      //uploadFiles();
      uploadFiles(files);
    }
  };
  const handleDragEnter: React.DragEventHandler<HTMLDivElement> = (
    evt: React.DragEvent<HTMLDivElement>
  ): void => {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = "link";
    setIsDragging(true);
  };
  const handleDragLeave: React.DragEventHandler<HTMLDivElement> = (
    evt: React.DragEvent<HTMLDivElement>
  ): void => {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = "link";
    setIsDragging(false);
  };
  function handleClick<T extends HTMLDivElement>(
    e: React.MouseEvent<T, MouseEvent>
  ): void {
    let referenceInput = inputRef.current;
    referenceInput?.click();
    if (!disableRipple) {
      createRippleFromElement(dz_ui_ripple_ref.current, e, color as string);
      //createRipple(e, color as string);
    }
    onClick?.(e);
  }
  const handleReset = () => {
    onReset?.();
    setFiles([]);
    onChange?.([]);
    //onDrop?.([]);
  };
  const handleChangeView = (newView: "grid" | "list") => {
    setLocalView(newView);
    onChangeView?.(newView);
  };

  return (
    <div
      className={finalClassName}
      style={style}
      onDragOver={handleDragEnter}
      onClick={clickable ? handleClick : () => {}}
      // onDragLeave={handleDragLeave}
    >
      <div className="dropzone-ui-ripple" ref={dz_ui_ripple_ref}></div>
      {header && (
        <DropzoneHeader
          maxFileSize={maxFileSize}
          numberOfValidFiles={files.filter((x) => x.valid).length}
          onReset={!onUploadingStart ? handleReset : undefined}
          maxFiles={maxFiles}
          //handleReset={handleReset}
          onUploadingStart={onUploadingStart}
          view={localView}
          hideViewIcon={view || disableScroll ? true : false}
          onChangeView={handleChangeView}
          onUploadStart={!uploadOnDrop ? handleUploadStart : undefined}
          onClean={onClean && !onUploadingStart ? handleCleanFiles : undefined}
          urlPresent={url !== undefined}
          localization={localization}
        />
      )}
      {children && value && files && files.length > 0 ? (
        <FileItemContainer
          view={localView}
          style={{
            minHeight: minHeight,
            maxHeight: disableScroll ? undefined : maxHeight,
            marginBottom: footer ? "23px" : undefined,
            marginTop: header ? "22px" : undefined,
          }}
          disableScroll={disableScroll}
        >
          {children}
        </FileItemContainer>
      ) : (
        <DropzoneLabel>
          {label || (DropzoneLocalizer.defaultLabel as string)}
        </DropzoneLabel>
      )}

      {footer && (
        <DropzoneFooter
          accept={accept}
          message={onUploadingStart ? localMessage : undefined}
          localization={localization}
        />
      )}
      <div
        onDragLeave={handleDragLeave}
        onDrop={kamui}
        className={`dropzone-ui-layer${isDragging ? ` drag` : ``}`}
      ></div>
      <input
        aria-label="dui-hidden-input"
        ref={inputRef}
        onChange={handleOnChangeInput}
        type="file"
        accept={accept}
        style={{ display: "none" }}
        multiple={maxFiles ? maxFiles > 1 : true}
      />
    </div>
  );
};

export default Dropzone;
