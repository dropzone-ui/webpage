import { OverridableComponentProps } from "@dropzone-ui/core";
import * as React from "react";
import {
  CustomValidateFileResponse,
  fileListToFileValidateArray,
  FileValidated,
  UPLOADSTATUS,
} from "../../../../utils";
import {
  createRipple,
  createRippleFromElement,
} from "../../../../utils/ripple/ripple";
import useDropzoneClassName from "../hooks/useDropzoneClassName";
import useDropzoneLayerClassName from "../hooks/useDropzoneLayerClassName";

import "./DropzoneUI.scss";
export interface DropzoneUIProps extends OverridableComponentProps {
  backgroundColor?: any;
  disableScroll?: boolean;
  header?: boolean;
  footer?: boolean;
  minHeight?: string;
  maxHeight?: string;
  clickable?: boolean;
  disableRipple?: boolean;
  //max file size per file
  maxFileSize?: number;
  //max amount of files
  maxFiles?: number;
  //mimetypes accepted
  accept?: string;
  //disable the ripple effect
  validation?: boolean;
  /**
   * custom validator
   * must be a function that recieves as first parameter a File Object
   * and must return a boolean value
   */
  validator?: (f: File) => CustomValidateFileResponse;
  onDragEnter?: (evt: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave?: (evt: React.DragEvent<HTMLDivElement>) => void;
  colorOnDrag?: string;
  //FILES
  onChange?: (files: FileValidated[]) => void;
  value?: FileValidated[];
}
const DropzoneUI: React.FC<DropzoneUIProps> = (props: DropzoneUIProps) => {
  const {
    children,
    color,
    backgroundColor,
    maxHeight,
    minHeight,
    header,
    footer,
    disableScroll,
    clickable,
    style,
    disableRipple,
    //max file size per file
    maxFileSize,
    //max amount of files
    maxFiles,
    //mimetypes accepted
    accept,
    //disable the ripple effect
    validation,
    validator,
    onDragEnter,
    onDragLeave,
    className,
    colorOnDrag,
    //files
    onChange,
    value = [],
  } = props;
  //ref to handle ripple
  const duiRippleRef = React.useRef<HTMLDivElement>(null);
  //ref to the hidden input tag
  const inputRef = React.useRef<HTMLInputElement>(null);
  //state for drag operation
  const [isDragging, setIsDragging] = React.useState<boolean>(false);
  //custom hook for className
  const classNameCreated: string = useDropzoneClassName(
    color,
    backgroundColor,
    disableScroll ? undefined : maxHeight ? maxHeight : "245px",
    minHeight,
    header && footer ? 50 : !header && footer ? 23 : header && !footer ? 22 : 0,
    isDragging,
    clickable as boolean,
    disableRipple as boolean,
    className
  );
  const classNameLayer: string = useDropzoneLayerClassName(
    colorOnDrag,
    isDragging,
    !onDragEnter && !onDragLeave
  );

  // Rinne-UPLOAD
  const handleChangeFiles = (files: FileValidated[]): void => {
    console.log(
      "handleChangeFiles =>",
      files.map((x) => x.uploadStatus)
    );
    if (value && onChange) {
      //go to exterior
      if (isUploading) {
        onChange(files);
      } else {
        onChange(mergeFileList(files, tempFiles));
      }
    } else {
      //change internally
      if (isUploading) {
        setFiles(files);
      } else {
        setFiles(mergeFileList(files, tempFiles));
      }
    }
  };

  const [files, setFiles] = React.useState<FileValidated[]>([]);
  const [tempFiles, setTempFiles] = React.useState<FileValidated[]>([]);
  const [currIndex, setCurrIndex] = React.useState<number | undefined>(
    undefined
  );
  const [isUploading, setIsUploading] = React.useState<boolean>(false);
  const [isUploadingOne, setIsUploadingOne] = React.useState<boolean>(false);

  React.useEffect(() => {
    console.log("useEffect inside =>", value, isUploading);
    setFiles(value);
  }, [value, isUploading]);
  React.useEffect(() => {
    if (currIndex && currIndex >= files.length) {
      setCurrIndex(undefined);
      setIsUploading(false);
    }
    if (isUploading && currIndex === undefined) {
      setCurrIndex(0);
    }
  }, [currIndex, isUploading]);
  const uploadOneHandler = async (files: FileValidated[], index: number) => {
    setIsUploadingOne(true);
    console.log(
      "uploadOneHandler start",
      files.map((x) => x.uploadStatus),
      index
    );
    let newArr: FileValidated[] = [...files];
    console.log("pre output item 1", files[index]);
    const fiU: FileValidated = await setUploading(files[index]);
    newArr[index] = fiU;
    console.log("pre output item 2", fiU);
    handleChangeFiles([...newArr]);
    const fiF: FileValidated = await uploadOne(newArr[index]);
    newArr[index] = fiF;
    handleChangeFiles([...newArr]);
    console.log("pre output item 3", fiF);

    //newArr[index] = fi;
    console.log("pre output", newArr.map((x) => x.uploadStatus).join(","));
    // setFiles([]);

    setCurrIndex(index + 1);
    setIsUploadingOne(false);
  };
  React.useEffect(() => {
    if (
      isUploading &&
      currIndex !== undefined &&
      currIndex < files.length &&
      currIndex >= 0 &&
      files.length > 0
    ) {
      console.log(
        "called effect uploadOneHandler passsed 1 if",
        files.map((x) => x.uploadStatus)
      );
      if (!isUploadingOne) {
        console.log(
          "called effect uploadOneHandler passsed 2 if",
          files.map((x) => x.uploadStatus)
        );

        console.log(
          "called uploadOneHandler",
          isUploading,
          currIndex,
          isUploadingOne,
          files.map((x) => x.uploadStatus).join(",")
        );
        if (tempFiles.length > 0) {
          uploadOneHandler(mergeFileList(files, tempFiles), currIndex);
          setTempFiles([]);
        } else {
          uploadOneHandler(files, currIndex);
        }
      } else {
        console.log(
          "save temp",
          files.map((x) => x.uploadStatus)
        );
        setTempFiles(mergeFileList(tempFiles, files));
      }
    }
  }, [files, isUploading, currIndex, isUploadingOne]);
  const initUploading = () => {
    const newArrFiles: FileValidated[] = files.map((f) => {
      return { ...f, uploadStatus: UPLOADSTATUS.preparing };
    });
    console.log(
      "preparing?",
      newArrFiles.map((x) => x.uploadStatus)
    );
    handleChangeFiles([...newArrFiles]);
    setIsUploading(true);
  };
  const setUploading = (
    fileValidated: FileValidated
  ): Promise<FileValidated> => {
    return new Promise((resolve, reject) => {
      //no tiene uploading?
      if (
        //fileValidated.uploadStatus !== undefined &&
        fileValidated.uploadStatus === UPLOADSTATUS.preparing
      ) {
        console.log(
          "make uploading from preparing =>",
          fileValidated.uploadStatus
        );
        setTimeout(() => {
          resolve({
            ...fileValidated,
            uploadStatus: UPLOADSTATUS.uploading,
          });
        }, 1500);
      } else {
        resolve({ ...fileValidated });
      }
    });
  };
  const uploadOne = (fileValidated: FileValidated): Promise<FileValidated> => {
    return new Promise((resolve, reject) => {
      //no tiene uploading?
      if (
        //fileValidated.uploadStatus !== undefined &&
        fileValidated.uploadStatus === UPLOADSTATUS.uploading
      ) {
        console.log(
          "make uploading from uploading =>",
          fileValidated.uploadStatus
        );
        setTimeout(() => {
          resolve({
            ...fileValidated,
            uploadStatus: UPLOADSTATUS.success,
          });
        }, 1500);
      } else {
        resolve({ ...fileValidated });
      }
    });
  };
  const uploadAll = async () => {
    handleChangeFiles(
      files.map((x) => {
        return { ...x, uploadStatus: UPLOADSTATUS.preparing };
      })
    );
    for (let i = 0; i < files.length; i++) {
      /* console.log("file in index", i, files);
      const fi: FileValidated = await uploadOne(i);
      //podria consultar sobre el temp
      let updatedArr: FileValidated[] = [...files];
      updatedArr[i] = fi;
      handleChangeFiles([...updatedArr]); */
    }
  };

  const mergeFileList = (
    localFiles: FileValidated[],
    incommingFiles: FileValidated[]
  ): FileValidated[] => {
    console.log(
      "merging?",
      localFiles.map((x) => x.uploadStatus),
      incommingFiles.map((x) => x.uploadStatus)
    );
    if (tempFiles.length === 0) {
      return incommingFiles;
    }
    let newArrFiles: FileValidated[] = [];
    for (let i = 0; i < localFiles.length; i++) {
      //if upload status has been changed to undef, keep the new value
      if (
        //pue ser preparing instead of undef
        localFiles[i].uploadStatus !== undefined &&
        incommingFiles[i].uploadStatus === undefined
      ) {
        newArrFiles.push({ ...incommingFiles[i] });
      } else {
        newArrFiles.push({ ...localFiles[i] });
      }
    }
    return newArrFiles;
  };
  // handles for click and drag-rop
  const handleDragEnter: React.DragEventHandler<HTMLDivElement> = (
    evt: React.DragEvent<HTMLDivElement>
  ) => {
    //console.log("==>", onDragEnter);
    /*  if (onDragEnter) {
      onDragEnter(evt);
    } else { */
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = "link";
    /*  }
    if (onDragLeave) { */
    setIsDragging(true);
    //}
  };
  const handleDragLeave: React.DragEventHandler<HTMLDivElement> = (
    evt: React.DragEvent<HTMLDivElement>
  ) => {
    // if (onDragLeave) {
    //  onDragLeave(evt);
    //} else {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = "link";
    // }
    //if (!onDragEnter) {
    setIsDragging(false);
    //}
  };
  function handleClick<T extends HTMLDivElement>(
    evt: React.MouseEvent<T, MouseEvent>
  ): void {
    evt.preventDefault();
    evt.stopPropagation();
    if (duiRippleRef.current) {
      createRippleFromElement(duiRippleRef.current, evt, color as string);
    }

    //inputRef.current?.click();
  }
  const kamui: React.DragEventHandler<HTMLDivElement> = async (
    evt: React.DragEvent<HTMLDivElement>
  ): Promise<void> => {
    evt.stopPropagation();
    evt.preventDefault();
    if (duiRippleRef.current) {
      createRippleFromElement(duiRippleRef.current, evt, color as string);
    }
    setIsDragging(false);
    // Procesing files
    let fileList: FileList = evt.dataTransfer.files;
    const fileValidatedList: FileValidated[] =
      fileListToFileValidateArray(fileList);
    console.log("Kamui", fileValidatedList);
  };
  const handleOnChangeInput: React.ChangeEventHandler<HTMLInputElement> = (
    evt: React.ChangeEvent<HTMLInputElement>
  ): void => {
    /*  if (onUploadingStart) {
      return;
    } */
    let fileList: FileList = evt.target.files as FileList;
    const fileValidatedList: FileValidated[] =
      fileListToFileValidateArray(fileList);
    console.log("Input", fileValidatedList);
    // handleFilesChange(output);
  };
  const handleFileChange = (files: FileValidated): void => {};

  return (
    <React.Fragment>
      <button onClick={initUploading}>UPLOAAADDDD</button>
      <div
        className={classNameCreated}
        style={style}
        onClick={clickable ? handleClick : () => {}}
        onDragOver={handleDragEnter}
        //onDragOver={handleDragEnd}
        //onDragEnd={handleDragEnd}
        onDragLeave={handleDragLeave}
        onDrop={kamui}
      >
        {!disableRipple && (
          <div ref={duiRippleRef} className="dropzone-ui-base-ripple"></div>
        )}
        <div
          className="dz-ui-header"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          header
        </div>
        {children || " Drop Files"}
        <div className="dz-ui-footer">footer</div>

        {!onDragEnter && !onDragLeave && (
          <div
            onDragLeave={handleDragLeave}
            onDrop={kamui}
            className={classNameLayer}
          ></div>
        )}
      </div>
      <input
        id="dui-input-file"
        aria-label="dui-hidden-input"
        ref={inputRef}
        onChange={handleOnChangeInput}
        type="file"
        accept={accept}
        style={{ display: "none" }}
        multiple={maxFiles ? maxFiles > 1 : true}
      />
    </React.Fragment>
  );
};
export default DropzoneUI;
