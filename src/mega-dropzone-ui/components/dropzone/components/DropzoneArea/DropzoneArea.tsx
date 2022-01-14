import * as React from "react";
import { DropzoneAreaProps } from "./DropzoneAreaProps";
import "./DropzoneAreaProps.scss";
const DropzoneArea: React.FC<DropzoneAreaProps> = (
  props: DropzoneAreaProps
) => {
  const { className, style, children, onClick, accept, maxFileSize, maxFiles } =
    props;

  //ref to the hidden input tag
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleDragEnter: React.DragEventHandler<HTMLDivElement> = (
    evt: React.DragEvent<HTMLDivElement>
  ): void => {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = "link";
  };
  const handleDragLeave: React.DragEventHandler<HTMLDivElement> = (
    evt: React.DragEvent<HTMLDivElement>
  ): void => {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = "link";
  };
  /**
   *
   * @param evt
   */
  function handleClick<T extends HTMLDivElement>(
    evt: React.MouseEvent<T, MouseEvent>
  ): void {
    let referenceInput: HTMLInputElement | null = inputRef.current;
    referenceInput?.click();
    onClick?.(evt);
  }
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

    setIsDragging(false);
    handleFilesChange(output);
  };
  const handleDragOver = async () => {};
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
    handleFilesChange(output);
  };

  return (
    <div
      className={className || "dropzone-ui-base"}
      style={style || {}}
      onDrop={kamui}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onClick={handleClick}
    >
      {children}
      <input
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
export default DropzoneArea;
