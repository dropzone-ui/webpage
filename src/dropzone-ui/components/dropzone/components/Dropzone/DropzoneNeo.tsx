import * as React from "react";
import { mergeProps } from "@dropzone-ui/core";
import "./DropzoneNeo.scss";
import DropzoneNeoProps, { defaultDrozoneNeoProps } from "./DropzoneNeoProps";
import { createDuiRippleFromDiv2 } from "../../../../utils/ripple/ripple";
import {
  handleClickInput,
  handleDragUtil,
  handleDropUtil,
} from "../utils/dragDropHandles";
import useDropzoneFileListID from "../hooks/useDropzoneFileListID";
import useDropzoneNeoClassName from "../hooks/useDropzoneNeoClassName";
import DropzoneHeaderNeo from "../DropzoneHeader/DropzoneHeaderNeo";
import useDropzoneLayerClassName from "../hooks/useDropzoneLayerClassName";
import DropzoneFooterNeo from "../DropzoneFooter.tsx/DropzoneFooterNeo";
import DuiFileInstance, {
  DuiFileType,
} from "../../../../utils/dropzone-ui-types/DuiFile";
import { fileListToDuiFileTypeArray } from "../../../../utils/fileListToFileValidateArray/fileListToFileValidateArray";
import { fakeDuiUpload, sleepPreparing } from "../utils/fakeupload.utils";
import DropzoneDisabledLayer from "../DropzoneDisabledLayer/DropzoneDisabledLayer";
import useDropzoneFileListUpdater from "../hooks/useDropzoneFileUpdater";
import {
  DuiFileValidatorProps,
  UPLOADSTATUS,
} from "../../../../utils/file-validation/validation.types";
import { validateDuiFileList } from "../../../../utils/file-validation/validation.methods";
import {
  DuiFileResponse,
  DuiUploadResponse,
  preparingToUploadOne,
  toUploadableDuiFileList,
  uploadOnePromiseXHR,
} from "../utils/upload.utils";
import {
  FunctionLabel,
  LocalLabels,
} from "../../../../localization/localization";
import { DropzoneLocalizerSelector } from "../../../../localization";
import { DuiUploadConfig } from "../../../../utils/dropzone-ui-types/DuiUploadConfig";
import { DuiFileManager } from "../../../../utils/dropzone-ui-types/DuiFileManager";
const DropzoneNeo: React.FC<DropzoneNeoProps> = (props: DropzoneNeoProps) => {
  const {
    children,
    color,
    backgroundColor,
    minHeight,
    header,
    footer,
    clickable,
    style,
    disableRipple,
    localization,
    //max file size per file
    maxFileSize,
    //max amount of files
    maxFiles,
    //mimetypes accepted
    accept,
    //disable the ripple effect
    validateFiles,
    onDragEnter,
    onDragLeave,
    className,
    //files
    onChange,
    value = [],
    //upload
    uploadConfig,
    //actions
    uploadOnDrop,
    preparingTime,
    behaviour,
    disabled,
    validator,
    onUploadFinish,
    fakeUpload,
    onClean,
  } = mergeProps(props, defaultDrozoneNeoProps);
  const { url, method, headers, uploadLabel } = uploadConfig as DuiUploadConfig;
  //localizers
  const DropzoneLocalizer: LocalLabels =
    DropzoneLocalizerSelector(localization);
  //ref to handle ripple
  const duiRippleRefAbs = React.useRef<HTMLDivElement>(null);
  const duiRippleRefRel = React.useRef<HTMLDivElement>(null);
  //ref to the hidden input tag
  const inputRef = React.useRef<HTMLInputElement>(null);
  //state for drag operation
  const [isDragging, setIsDragging] = React.useState<boolean>(false);
  //state for checking upload start
  const [isUploading, setIsUploading] = React.useState<boolean>(false);
  //state for message on footer
  const [localMessage, setLocalMessage] = React.useState<string>("");
  //hook for geting fileId for uploding through DuiFileManager
  const duiFileId: number = useDropzoneFileListID();
  //state for managing the number of valid files

  //state for managin files
  //const [files, setFiles] = React.useState<DuiFileType[]>([]);
  const [localFiles, numberOfValidFiles, setLocalFiles] =
    useDropzoneFileListUpdater(
      duiFileId,
      value,
      isUploading,
      maxFileSize,
      accept,
      maxFiles,
      validator,
      localization,
      validateFiles
    );

  /**
   * Upload the list of files
   * @returns
   */
  const uploadfiles = async (localFiles: DuiFileType[]): Promise<void> => {
    // set flag to true
    // recieve on the new list
    // initialize new list of DuiFileInstances
    let arrOfDuiFiles: DuiFileInstance[] = [];
    if (isUploading || localFiles.length === 0 || !arrOfDuiFiles) {
      return;
    }
    const totalNumber: number = localFiles.length;
    const missingUpload: number = localFiles.filter(
      (x: DuiFileType) => x.valid && x.uploadStatus !== "success"
    ).length;
    let totalRejected: number = 0;
    let currentCountUpload: number = 0;
    const uploadingMessenger: FunctionLabel =
      DropzoneLocalizer.uploadingMessage as FunctionLabel;

    if (!(missingUpload > 0 && url)) {
      setLocalMessage(DropzoneLocalizer.noFilesMessage as string);
      return;
    }
    setLocalMessage(uploadingMessenger(`${missingUpload}/${totalNumber}`));
    setIsUploading(true);
    //PREPARING stage
    //use methods to update on static class
    //obtain a fresher dui file list
    arrOfDuiFiles =
      DuiFileManager.setFileListMapPreparing(
        duiFileId,
        localFiles,
        validateFiles as boolean
      ) || [];
    //CHANGE
    handleFilesChange(
      arrOfDuiFiles.map((x) => x.toFileValidated()),
      true
    );
    //AWAIT when preparing time is given
    //general sleep for all files
    await sleepPreparing(preparingTime);
    //variable for storing responses
    let serverResponses: DuiFileResponse[] = [];

    for (let i = 0; i < arrOfDuiFiles.length; i++) {
      //all missing filesalways have "preparing" as uploadStatus prop
      if (arrOfDuiFiles[i].uploadStatus === UPLOADSTATUS.preparing) {
        //set stage to "uploading" in one file and notify change
        // PREPARING => UPLOADING
        await preparingToUploadOne(arrOfDuiFiles[i]);
        setLocalMessage(
          uploadingMessenger(`${++currentCountUpload}/${missingUpload}`)
        );
        //CHANGE
        handleFilesChange([...arrOfDuiFiles], true);

        //UPLOADING => UPLOAD()
        //upload one file and notify about change
        const { serverResponse, uploadedFile }: DuiUploadResponse = fakeUpload
          ? await fakeDuiUpload(arrOfDuiFiles[i], DropzoneLocalizer)
          : await uploadOnePromiseXHR(
              arrOfDuiFiles[i],
              url,
              method,
              headers,
              uploadLabel
            );
        //update instance
        arrOfDuiFiles[i].uploadStatus = uploadedFile.uploadStatus;
        arrOfDuiFiles[i].uploadMessage = uploadedFile.uploadMessage;
        //CHNAGE
        handleFilesChange(
          arrOfDuiFiles.map((x: DuiFileInstance) => x.toFileValidated()),
          true
        );
        if (uploadedFile.uploadStatus === "error") {
          totalRejected++;
        }

        serverResponses.push(serverResponse);
      }
    }
    // upload group finished :D
    onUploadFinish?.(serverResponses);
    const finishUploadMessenger: FunctionLabel =
      DropzoneLocalizer.uploadFinished as FunctionLabel;
    setLocalMessage(
      finishUploadMessenger(missingUpload - totalRejected, totalRejected)
    );
    setIsUploading(false);
  };
  const classNameCreated: string = useDropzoneNeoClassName(
    color,
    backgroundColor,
    minHeight,
    header && footer ? 50 : !header && footer ? 23 : header && !footer ? 22 : 0,
    isDragging,
    clickable as boolean,
    className
  );
  const classNameLayer: string = useDropzoneLayerClassName(
    color as string,
    isDragging,
    !onDragEnter && !onDragLeave
  );

  // HANDLERS for CLICK, DRAG NAD DROP
  function handleClick(): void {
    //handleClickUtil(evt);
    if (isUploading) return;
    makeRipple();
    handleClickInput(inputRef.current);
  }
  const handleDragEnter: React.DragEventHandler<HTMLDivElement> = (
    evt: React.DragEvent<HTMLDivElement>
  ) => {
    handleDragUtil(evt);
    setIsDragging(true);
  };
  const handleDragLeave: React.DragEventHandler<HTMLDivElement> = (
    evt: React.DragEvent<HTMLDivElement>
  ) => {
    handleDragUtil(evt);
    setIsDragging(false);
  };
  // RIPPLE
  /**
   * Creates a ripple in the middle of the main container
   */
  const makeRipple = (): void => {
    createDuiRippleFromDiv2(
      duiRippleRefAbs.current,
      duiRippleRefRel.current,
      color as string
    );
  };

  // KAMUI => RECIEVE FILES FROM DROP OR INPUT( CLICK ), VALIDATE NAD CHANGE

  /**
   * Performs the action of recieving the files when user drops the files
   * in the Dropzone container.
   * According to the given config from props, this function could
   * validate files and also start the uploading phase
   * @param evt even handler for getting files from dataTransfer
   */
  const kamui: React.DragEventHandler<HTMLDivElement> = async (
    evt: React.DragEvent<HTMLDivElement>
  ): Promise<void> => {
    handleDropUtil(evt);
    makeRipple();
    setIsDragging(false);
    if (isUploading) return;
    let fileList: FileList = evt.dataTransfer.files;
  
    let duiFileListOutput: DuiFileType[] = fileListToDuiFileTypeArray(fileList);

    //validate dui files
    if (validateFiles)
      duiFileListOutput = outerDuiValidation(duiFileListOutput);

    //init xhr on each dui file
    if (url) duiFileListOutput = toUploadableDuiFileList(duiFileListOutput);

    handleFilesChange(duiFileListOutput);
  };

  /**
   * Performs the action of recieving the files when user selects the files
   * by clicking the Dropzone container
   * @param evt event handler for getting files from input element target
   */
  const handleChangeInput: React.ChangeEventHandler<HTMLInputElement> = (
    evt: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (isUploading) return;
    let fileList: FileList = evt.target.files as FileList;
    let duiFileListOutput: DuiFileType[] = fileListToDuiFileTypeArray(fileList);
    //validate dui files
    if (validateFiles)
      duiFileListOutput = outerDuiValidation(duiFileListOutput);
    //init xhr on each dui file
    if (url) duiFileListOutput = toUploadableDuiFileList(duiFileListOutput);

    handleFilesChange(duiFileListOutput);
  };
  /**
   * reset the complete file list
   */
  const handleReset = (): void => {
    if (onChange) {
      onChange([]);
    } else {
      setLocalFiles([]);
    }
  };
  const handleClean = (): void => {
    onClean?.();
  };
  /**
   * Performs the changes in the DuiFile list.
   * Makes a new array of DuiFiles according to the "behaviour" prop.
   * If isUploading state is not true and the behaviour props is equal to "add",
   * the incoming duiFileList is added at the end of the current list of duiFiles.
   * Otherwise, the complete duiFile list replaced by the incomming duiFileList
   * @param duiFileList the new fileList
   * @param isUploading a flag that dscribes whther the uploading process is active or not
   */
  const handleFilesChange = (
    duiFileList: DuiFileType[],
    isUploading?: boolean
  ): void => {

    let finalDuiFileList: DuiFileType[] =
      behaviour === "add" && !isUploading
        ? [...localFiles, ...duiFileList]
        : [...duiFileList];
    if (onChange) {
      onChange(finalDuiFileList);
    } else {
      setLocalFiles(finalDuiFileList);
    }
    if (uploadOnDrop && !isUploading) uploadfiles(finalDuiFileList);
  };
  /**
   * Performs the validation process for each DuiFile
   * outside the DropzoneNeo component file declaration
   * according to the criteria given by maxFiles and maxFileSize and accept props
   * This function calls validateDuiFileList and sets the valid prop of DuiFile to "true" or "false"
   * depending on the result of the individual validation.
   * It also add the list of errors.
   * @param duiFileListToValidate the duiFileList to validate
   * @returns a list of validated DuiFile list
   */
  const outerDuiValidation = (
    duiFileListToValidate: DuiFileType[]
  ): DuiFileType[] => {
    const localValidator: DuiFileValidatorProps = { maxFileSize, accept };
    const validatedDuiFileList: DuiFileType[] = validateDuiFileList(
      duiFileListToValidate,
      maxFiles ? maxFiles - numberOfValidFiles : Infinity,
      localValidator,
      validator,
      maxFiles,
      localization
    );
    return validatedDuiFileList;
  };
  if (classNameCreated) {
    return (
      <div
        className={classNameCreated}
        style={style}
        onClick={handleClick}
        onDragOver={handleDragEnter}
      >
        {!disableRipple && (
          <div
            ref={duiRippleRefAbs}
            className="dropzone-ui-base-ripple-absolute"
          >
            <div
              ref={duiRippleRefRel}
              className="dropzone-ui-base-ripple-relative"
            ></div>
          </div>
        )}
        {header && (
          <DropzoneHeaderNeo
            onReset={!isUploading ? handleReset : undefined}
            maxFileSize={maxFileSize}
            maxFiles={maxFiles}
            localization={localization}
            urlPresent={url !== undefined}
            onUploadStart={
              !uploadOnDrop ? () => uploadfiles(localFiles) : undefined
            }
            numberOfValidFiles={numberOfValidFiles}
            onClean={handleClean}
          />
        )}
        {children}
        {footer && (
          <DropzoneFooterNeo
            accept={accept}
            message={isUploading ? localMessage : undefined}
            localization={localization}
          />
        )}
        <div
          className={classNameLayer}
          onDragLeave={handleDragLeave}
          onDrop={kamui}
          style={{ display: isDragging ? undefined : "none" }}
        ></div>
        <input
          aria-label="dui-hidden-input"
          ref={inputRef}
          onChange={handleChangeInput}
          type="file"
          accept={accept}
          style={{ display: "none" }}
          multiple={maxFiles ? maxFiles > 1 : true}
        />
        <DropzoneDisabledLayer open={disabled} />
      </div>
    );
  } else {
    return <React.Fragment></React.Fragment>;
  }
};
export default DropzoneNeo;
