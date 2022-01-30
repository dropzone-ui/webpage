import * as React from "react";
import { fileListvalidator } from "../../../../utils/file-validation/validation.methods";
import {
  FileValidated,
  FileValidator,
} from "../../../../utils/file-validation/validation.types";
import { DropzoneAreaProps } from "./DropzoneAreaProps";
import "./DropzoneArea.scss";
import { mergeProps } from "../../../../base";
import { DropzoneAreaDefaults } from "./DropzoneAreaDefault";
const DropzoneArea: React.FC<DropzoneAreaProps> = (
  props: DropzoneAreaProps
) => {
  const {
    //css classname
    className,
    //inline style
    style,
    children,
    //click event
    onClick,
    //change event
    onChange,
    //drag events
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDrop,
    //flags
    clickable,
    behaviour,
    //for validation
    accept,
    maxFileSize,
    maxFiles,
    validator,
    //language
    localization,
  } = mergeProps(props, DropzoneAreaDefaults);

  //ref to the hidden input tag
  const inputRef = React.useRef<HTMLInputElement>(null);
  const inputRefToFilelist = React.useRef<HTMLInputElement>(null);
  //ref to the dropzone input tag
  //const dropzoneRef = React.useRef<HTMLDivElement>(null);
  // list of files (local)
  const [files, setFiles] = React.useState<FileValidated[]>([]);
  //number of files
  const [numberOfValidFiles, setNumberOfValidFiles] = React.useState<number>(0);
  const handleDragEnter: React.DragEventHandler<HTMLDivElement> = (
    evt: React.DragEvent<HTMLDivElement>
  ): void => {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = "link";
    onDragEnter?.(evt);
  };
  const handleDragLeave: React.DragEventHandler<HTMLDivElement> = (
    evt: React.DragEvent<HTMLDivElement>
  ): void => {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = "link";
    onDragLeave?.(evt);
  };
  /**
   * Method to perfomr click event
   * @param evt
   */
  function handleClick<T extends HTMLDivElement>(
    evt: React.MouseEvent<T, MouseEvent>
  ): void {
    //only call this handle if clickable is true
    if (!clickable) {
      return;
    }
    let referenceInput: HTMLInputElement | null = inputRef.current;
    referenceInput?.click();

    onClick?.(evt);
  }
  /**
   * Change files handler
   * @param output
   */
  const handleFilesChange = (
    evt: React.DragEvent<HTMLDivElement> | undefined,
    output: FileValidated[]
  ) => {
    
    if (evt) {
      onDrop?.(evt, output);
    }

    if (onChange) {
      onChange?.(behaviour === "replace" ? output : [...files, ...output]);
    } else {
      setFiles(behaviour === "replace" ? output : [...files, ...output]);
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

    let fileList: FileList = evt.dataTransfer.files;
    //    referenceInput?.value= FIle[];

    const remainingValids: number = (maxFiles || Infinity) - numberOfValidFiles;
    const localValidator: FileValidator = {
      accept: accept,
      maxFileSize: maxFileSize,
    };
    const output: FileValidated[] = fileListvalidator(
      fileList,
      remainingValids,
      localValidator,
      validator,
      maxFiles,
      localization
    );

    handleFilesChange(evt, output);
  };
  /**
   * Handler for drag over event
   * Returns as first parameter the drag event object
   * @param evt
   */
  const handleDragOver: React.DragEventHandler<HTMLDivElement> = async (
    evt: React.DragEvent<HTMLDivElement>
  ) => {
    onDragOver?.(evt);
  };
  /**
   * 
   * @param evt 
   */
  const handleOnChangeInput: React.ChangeEventHandler<HTMLInputElement> = (
    evt: React.ChangeEvent<HTMLInputElement>
  ): void => {
    let fileList: FileList = evt.target.files as FileList;
   // console.log("Inner", fileList);

    const remainingValids: number = (maxFiles || Infinity) - numberOfValidFiles;
    const localValidator: FileValidator = {
      accept: accept,
      maxFileSize: maxFileSize,
    };
    //list of validated files
    const output: FileValidated[] = fileListvalidator(
      fileList,
      remainingValids,
      localValidator,
      validator,
      maxFiles,
      localization
    );
    handleFilesChange(undefined, output);
  };
/**
   * 
   * @param evt 
   */
 const handleOnChangeFileList: React.ChangeEventHandler<HTMLInputElement> = (
  evt: React.ChangeEvent<HTMLInputElement>
): void => {
  let fileList: FileList = evt.target.files as FileList;
  console.log("Inner FileList", fileList);
};
  return (
    <div
      //ref={dropzoneRef}
      className={className || "dropzone-ui-base"}
      style={style || {}}
      onDrop={kamui}
     // onDragEnter={handleDragEnter}
     // onDragLeave={handleDragLeave}
      //onDragOver={handleDragOver}
      onClick={handleClick}
    >
      {children}
      {clickable && (
        <input
          ref={inputRef}
          onChange={handleOnChangeInput}
          type="file"
          accept={accept}
          style={{ display: "none" }}
          multiple={maxFiles ? maxFiles > 1 : true}
        />
      )}
        <input
          ref={inputRefToFilelist}
          onChange={handleOnChangeFileList}
          type="file"
          accept={accept}
          style={{ display: "none" }}
          multiple={maxFiles ? maxFiles > 1 : true}
        />
      
    </div>
  );
};
export default DropzoneArea;
