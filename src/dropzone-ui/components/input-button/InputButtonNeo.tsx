import * as React from "react";
import {
  defaultInputButtonNeoProps,
  InputButtonNeoProps,
} from "./InputButtonNeoProps";
import "./InputButtonNeo.scss";
import { mergeProps } from "@dropzone-ui/core";
import useInputButtonClassName from "./hooks/useInputButtonClassName";
import {
  handleClickInput,
  handleClickUtil,
} from "../dropzone/components/utils/dragDropHandles";
import { createDuiRipple } from "../../utils/ripple/ripple";
import DuiFileInstance, {
  DuiFile,
} from "../../utils/dropzone-ui-types/DuiFile";
import { fileListToDuiFileArray } from "../../utils/fileListToFileValidateArray/fileListToFileValidateArray";
import {
  DuiFileResponse,
  DuiUploadResponse,
  instantPreparingToUploadOne,
  sleepTransition,
  toUploadableDuiFileList,
  uploadOnePromiseXHR,
} from "../dropzone/components/utils/upload.utils";
import { DuiUploadConfig } from "../../utils/dropzone-ui-types/DuiUploadConfig";
import { cleanInput } from "../dropzone/components/utils/input.utils";
import {
  DuiFileValidatorProps,
  UPLOADSTATUS,
} from "../../utils/file-validation/validation.types";
import { validateDuiFileList } from "../../utils/file-validation/validation.methods";
import useDropzoneFileListUpdater from "../dropzone/components/hooks/useDropzoneFileUpdater";
import useDropzoneFileListID from "../dropzone/components/hooks/useDropzoneFileListID";
import { LocalLabels } from "../../localization/localization";
import { DropzoneLocalizerSelector } from "../../localization";
import { DuiFileManager } from "../../utils/dropzone-ui-types/DuiFileManager";
import {
  fakeDuiUpload,
  sleepPreparing,
} from "../dropzone/components/utils/fakeupload.utils";
import InputButtonStyleManager from "./utils/InputButtonStyleManager";
const InputButtonNeo: React.FC<InputButtonNeoProps> = (
  props: InputButtonNeoProps
) => {
  const {
    accept,
    autoClean,
    behaviour,
    children,
    className,
    color,
    disableRipple,
    disabled,
    fakeUpload,
    href,
    label,
    localization,
    maxFileSize,
    maxFiles,
    onChange,
    onClean,
    onUploadFinish,
    onUploadStart,
    style,
    textDecoration,
    textColor,
    uploadConfig,
    validateFiles,
    validator,
    value = [],
    variant,
  } = mergeProps(props, defaultInputButtonNeoProps);
  const {
    url,
    method,
    headers,
    uploadLabel,
    cleanOnUpload = true,
    preparingTime = 1500,
    autoUpload = false,
  } = uploadConfig as DuiUploadConfig;
  //localizers
  const DropzoneLocalizer: LocalLabels =
    DropzoneLocalizerSelector(localization);
  //ref to the hidden input tag
  const inputRef = React.useRef<HTMLInputElement>(null);
  //const btn_ref = React.useRef<HTMLButtonElement>(null);
  //const span_ref = React.useRef<HTMLSpanElement>(null);

  //state for checking upload start
  const [isUploading, setIsUploading] = React.useState<boolean>(false);

  //hook for geting fileId for uploding through DuiFileManager
  const duiFileId: number = useDropzoneFileListID();
  //idManager for styles
  const [idClassName, setIdClassName] = React.useState<number>(0);
  React.useEffect(() => {
    if (idClassName===0) {
      //const nextClassNameVar = InputButtonStyleManager.getNextId();
      setIdClassName(InputButtonStyleManager.getNextId());
    }
  }, [idClassName]);
  //state for managing files
  const [classNameCreated, styleInjected]: [string, boolean] =
    useInputButtonClassName(
      variant,
      disabled,
      color,
      textColor,
      textDecoration,
      className,
      idClassName
    );
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

  function handleClick<T extends HTMLAnchorElement | HTMLButtonElement>(
    e: React.MouseEvent<T, MouseEvent>
  ): void {
    handleClickUtil(e);
    if (isUploading) return;
    createDuiRipple(e, color);
    handleClickInput(inputRef.current);
  }

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
  const outerDuiValidation = (duiFileListToValidate: DuiFile[]): DuiFile[] => {
    const localValidator: DuiFileValidatorProps = { maxFileSize, accept };
    const validatedDuiFileList: DuiFile[] = validateDuiFileList(
      duiFileListToValidate,
      maxFiles ? maxFiles - numberOfValidFiles : Infinity,
      localValidator,
      validator,
      maxFiles,
      localization
    );
    return validatedDuiFileList;
  };
  /**
   * Uploads each file in the array of DuiFiles
   * First, sets all the files in preparing status and awaits `preparingTime` miliseconds.
   * If `preparingTime` is not given or its value is false or 0, there won´t be a preparing phase.
   * Then onChange event will be called to update the files outside.
   * If `onCancel` event ocurrs outside on any on the FileItems(e.g. by clicking the cancel button on `FileItem`),
   * the duiFileInstance will change its status from 'preparing' to undefined. If so,
   * after the waiting time the value of status will be find as undefined and won´t perfom the upload.
   * Then, for each file: sets the file in 'uploading' status.
   * Then onChange event will be called to update the files outside.
   * Then uploads the file with the `xhr` instance.
   * After that, that file recieves the new uploadStatus that can be 'success', 'error' or 'aborted'
   * and onChange event will be called to update the files outside.
   * @param localFiles the list of duiFiles to upload
   * @returns nothing
   */
  const uploadfiles = async (localFiles: DuiFile[]): Promise<void> => {
    // set flag to true
    // recieve on the new list
    // initialize new list of DuiFileInstances
    let arrOfDuiFiles: DuiFileInstance[] = [];
    if (isUploading || localFiles.length === 0 || !arrOfDuiFiles) {
      return;
    }
    //const totalNumber: number = localFiles.length;
    const missingUpload: number = localFiles.filter((x: DuiFile) => {
      return (
        (!validateFiles || (validateFiles && x.valid)) &&
        x.uploadStatus !== "success"
      );
    }).length;
    //let totalRejected: number = 0;
    //let currentCountUpload: number = 0;
    if (!(missingUpload > 0 && url)) {
      return;
    }
    setIsUploading(true);
    //PREPARING stage
    //use methods to update on static class
    //obtain a fresher dui file list

    arrOfDuiFiles =
      DuiFileManager.setFileListMapPreparing(
        duiFileId,
        localFiles,
        validateFiles as boolean,
        cleanOnUpload as boolean
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
        instantPreparingToUploadOne(arrOfDuiFiles[i]);

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
        if (!(arrOfDuiFiles[i].uploadStatus === UPLOADSTATUS.aborted))
          await sleepTransition();
        handleFilesChange(
          arrOfDuiFiles.map((x: DuiFileInstance) => x.toFileValidated()),
          true
        );
        serverResponses.push(serverResponse);
      }
    }
    // upload group finished :D
    onUploadFinish?.(serverResponses);
    setIsUploading(false);
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
    duiFileList: DuiFile[],
    isUploading?: boolean
  ): void => {
    let finalDuiFileList: DuiFile[] =
      behaviour === "add" && !isUploading
        ? [...localFiles, ...duiFileList]
        : [...duiFileList];
    if (onChange) {
      onChange(finalDuiFileList);
    } else {
      setLocalFiles(finalDuiFileList);
    }
    if (autoUpload && !isUploading) uploadfiles(finalDuiFileList);
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

    let duiFileListOutput: DuiFile[] = fileListToDuiFileArray(fileList);
    //validate dui files
    if (validateFiles)
      duiFileListOutput = outerDuiValidation(duiFileListOutput);
    //init xhr on each dui file
    if (url) duiFileListOutput = toUploadableDuiFileList(duiFileListOutput);
    // Clean input element to trigger onChange event on input
    cleanInput(inputRef.current);

    handleFilesChange(duiFileListOutput);
  };
  const ButtonNeo: React.FC<any> = () =>
    //props: InputButtonNeoProps
    {
      return React.createElement(href ? "a" : "button", {
        className: classNameCreated,
        "data-testid": href ? "dui-anchor" : "dui-button",
        onClick: handleClick,
        href: href,
        style: style,
        children: <span className="dui-button-label">{children}</span>,
        disabled: disabled,
      });
    };
  if (idClassName && classNameCreated && styleInjected) {
    return (
      <React.Fragment>
        <ButtonNeo />
        <input
          aria-label="dui-hidden-input"
          style={{ display: "none" }}
          ref={inputRef}
          onChange={handleChangeInput}
          type="file"
          multiple={maxFiles ? maxFiles > 1 : true}
          accept={accept}
        />
      </React.Fragment>
    );
  }
  return <></>;
};
export default InputButtonNeo;
