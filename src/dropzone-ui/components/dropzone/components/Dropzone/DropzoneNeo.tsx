import * as React from "react";
import { createDuiRippleFromDiv2 } from "../../../../utils/ripple/ripple";

import useDropzoneLayerClassName from "../hooks/useDropzoneLayerClassName";
import {
  handleClickUtil,
  handleDragUtil,
  handleDropUtil,
} from "../utils/dragDropHandles";
import DropzoneNeoProps from "./DropzoneNeoProps";
import "./DropzoneNeo.scss";
import useDropzoneFileListId from "../hooks/useDropzoneFileLst";
import useDropzoneNeoClassName from "../hooks/useDropzoneNeoClassName";
import DropzoneHeaderNeo from "../DropzoneHeader/DropzoneHeaderNeo";
import DropzoneFooterNeo from "../DropzoneFooter.tsx/DropzoneFooterNeo";
import { mergeProps } from "@dropzone-ui/core";
import DuiFile, {
  DuiFileManager,
  DuiFileProps,
} from "../../../../utils/dropzone-ui-types/DuiFile";
import { fileListToDuiFilePropsArray } from "../../../../utils/fileListToFileValidateArray/fileListToFileValidateArray";
import { UPLOADSTATUS } from "../../../../utils";
import { prepToUploadOne, sleepPreparing } from "../utils/fakeupload.utils";
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
    validation,
    onDragEnter,
    onDragLeave,
    className,
    //files
    onChange,
    value = [],
    //upload
    url,
    uploadOnDrop,
    preparingTime,
    behaviour,
  } = mergeProps(props, {
    header: true,
    footer: true,
    clickable: true,
    minHeight: "100px",
    url: "",
    uploadOnDrop: false,
    maxFileSize: 28000,
    maxFiles: 10,
    preparingTime: 1000,
    behaviour: "add",
  });
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
  const duiFileId: number = useDropzoneFileListId();
  //state for managin files
  const [files, setFiles] = React.useState<DuiFileProps[]>([]);
  //effect for keeping track of changes
  //update files when value changes
  //When isUploading is true, only update when value and arrOfDuiFiles
  // have same lenght. Also, only updates the uploadStatus attribute
  // from "preparing", to undefined when OnCancel() method is called in
  // FileItem component
  React.useEffect(() => {
    let arrOfDuiFiles: DuiFile[] | undefined =
      DuiFileManager.getFileListMap(duiFileId);
    console.log(
      "Changing",
      arrOfDuiFiles?.map((x) => x.uploadStatus),
      value.map((x) => x.uploadStatus),
      isUploading
    );
    if (!isUploading) {
      setFiles(value);
    } else {
      if (arrOfDuiFiles) {
        if (arrOfDuiFiles.length !== value.length || value.length === 0) {
          return;
        }
        for (let i = 0; i < arrOfDuiFiles.length; i++) {
          if (
            value[i].uploadStatus === undefined &&
            arrOfDuiFiles[i].uploadStatus === UPLOADSTATUS.preparing
          ) {
            console.log("changeeeee");
            arrOfDuiFiles[i].uploadStatus = undefined;
          }
        }
      }
    }
  }, [value]);

  /**
   * Upload the list of files
   * @returns
   */
  const uploadfiles = async (): Promise<void> => {
    // set flag to true
    // recieve on the new list
    // initialize new list of DuiFileInstances
    let arrOfDuiFiles: DuiFile[] = [];
    if (isUploading || files.length === 0 || !arrOfDuiFiles) {
      return;
    }
    //use methods to update on static class
    setIsUploading(true);
    //init the DUiFIle list on preparing stage
    DuiFileManager.setFileList(duiFileId, [
      ...files.map(
        (x) => new DuiFile({ ...x, uploadStatus: UPLOADSTATUS.preparing })
      ),
    ]);
    //obtain a fresh file list
    arrOfDuiFiles = DuiFileManager.getFileListMap(duiFileId) || [];
    //notify the change
    handleFilesChange(
      arrOfDuiFiles.map((x) => x.toFileValidated()),
      true
    );
    //general sleep for all files
    await sleepPreparing(preparingTime);
    console.log(
      "arr after preparing sleeping",
      arrOfDuiFiles.map((x) => x.uploadStatus)
    );

    for (let i = 0; i < arrOfDuiFiles.length; i++) {
      if (arrOfDuiFiles[i].uploadStatus) {
        //set stage to "uploading" in one file and notify change
        await prepToUploadOne(arrOfDuiFiles[i]);
        handleFilesChange([...arrOfDuiFiles], true);
        //upload one file and notify about change
      }
    }
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

  // handles for click and drag-rop
  function handleClick<T extends HTMLDivElement>(
    evt: React.MouseEvent<T, MouseEvent>
  ): void {
    //handleClickUtil(evt);
    makeRipple();
    if (inputRef.current) {
      inputRef.current.click();
    }
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
  const makeRipple = () => {
    createDuiRippleFromDiv2(
      duiRippleRefAbs.current,
      duiRippleRefRel.current,
      color as string
    );
  };
  // KAMUI
  const kamui: React.DragEventHandler<HTMLDivElement> = async (
    evt: React.DragEvent<HTMLDivElement>
  ): Promise<void> => {
    handleDropUtil(evt);
    makeRipple();
    setIsDragging(false);
    let fileList: FileList = evt.dataTransfer.files;
    const duiFileList: DuiFileProps[] = fileListToDuiFilePropsArray(fileList);
    handleFilesChange(duiFileList);
  };

  const handleChangeInput: React.ChangeEventHandler<HTMLInputElement> = (
    evt: React.ChangeEvent<HTMLInputElement>
  ): void => {
    let fileList: FileList = evt.target.files as FileList;
    const duiFileList: DuiFileProps[] = fileListToDuiFilePropsArray(fileList);
    handleFilesChange(duiFileList);
  };
  const handleReset = (): void => {
    if (onChange) {
      onChange([]);
    } else {
      setFiles([]);
    }
  };
  const handleFilesChange = (
    duiFileList: DuiFileProps[],
    isUploading?: boolean
  ): void => {
    console.log("files change", isUploading, duiFileList);
    let finalDuiFileList: DuiFileProps[] =
      behaviour === "add" && !isUploading
        ? [...files, ...duiFileList]
        : [...duiFileList];
    if (onChange) {
      onChange(finalDuiFileList);
    } else {
      setFiles(finalDuiFileList);
    }
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
            onUploadStart={!uploadOnDrop ? uploadfiles : undefined}
            numberOfValidFiles={2}
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
      </div>
    );
  } else {
    return <React.Fragment></React.Fragment>;
  }
};
export default DropzoneNeo;
