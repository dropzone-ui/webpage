import { OverridableComponentProps } from "@dropzone-ui/core";
import * as React from "react";
import {
  CustomValidateFileResponse,
  fileListToFileValdateArray,
  FileValidated,
  UPLOADSTATUS,
} from "../../../../utils";
import { createRippleFromElement } from "../../../../utils/ripple/ripple";
import useDropzoneClassName from "../hooks/useDropzoneClassName";
import useDropzoneLayerClassName from "../hooks/useDropzoneLayerClassName";
import DuiUploader from "../utils/DuiUploader";
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
  noPreparing?: boolean;
}
declare type UploaderManagerType = {
  isUploading: boolean;
  isUploadingOne: boolean;
  currIndex?: number;
  tempFiles: FileValidated[];
};
const defaultManager: UploaderManagerType = {
  isUploading: false,
  isUploadingOne: false,
  currIndex: undefined,
  tempFiles: [],
};

const DropzoneUI2: React.FC<DropzoneUIProps> = (props: DropzoneUIProps) => {
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
    noPreparing = false,
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
  
  const [uploadManager, setUploadManager] =
    React.useState<UploaderManagerType>(defaultManager);
  const setTempFiles = (_tempFiles: FileValidated[]) => {
    setUploadManager({ ...uploadManager, tempFiles: _tempFiles });
  };
  const setCurrIndex = (newIndex: number | undefined) => {
    setUploadManager({ ...uploadManager, currIndex: newIndex });
  };
  const setIsUploading = (_isUploading: boolean) => {
    setUploadManager({ ...uploadManager, isUploading: _isUploading });
  };
  const setIsUploadingOne = (_isUploadingOne: boolean) => {
    setUploadManager({ ...uploadManager, isUploadingOne: _isUploadingOne });
  };
  const [files, setFiles] = React.useState<FileValidated[]>([]);

  const handleChangeFiles = (files: FileValidated[]): void => {
    //merge
    //reconocer cuando es de afuera o desde adentro
    //de afuera puede venir con uploadStatus===undefined
    //osea se hizo click en "onCancel()""
    //lo que viene de afuera me espera en temp
    console.log("handleChange", files);
    onChange?.(files);
    /* const { isUploading, tempFiles } = uploadManager;
    //uploading true
    if (isUploading && tempFiles.length > 0) {
      onChange?.(mergeFileList(files, tempFiles));
    } else {
      onChange?.(files);
    } */
  };
  React.useEffect(() => {
    console.log("files effect", files);
  }, [files]);
  React.useEffect(() => {
    console.log(
      "temp=>",
      uploadManager.tempFiles.map((x) => x.uploadStatus)
    );
  }, [uploadManager.tempFiles]);
  React.useEffect(() => {
    //reconocer cuando es de afuera o desde adentro
    //de afuera puede venir con uploadStatus===undefined
    //osea se hizo click en "onCancel()""
    setFiles(value);
    /* const { isUploading, tempFiles } = uploadManager;
    if (isUploading) {
      //guardo a temp
      setTempFiles(mergeFileList(tempFiles, value));
    } else {
      setFiles(value);
    } */
  }, [value, uploadManager]);

  //finish process
  React.useEffect(() => {
    const { currIndex, isUploading } = uploadManager;
    if (currIndex !== undefined && currIndex >= files.length && isUploading) {
      setUploadManager({
        ...uploadManager,
        currIndex: undefined,
        isUploading: false,
      });
    }
    if (currIndex !== undefined && currIndex === 0 && !isUploading) {
      setIsUploading(true);
    }
  }, [uploadManager]);
  const uploadOneHandler = async (files: FileValidated[], index: number) => {
    setIsUploadingOne(true);
    let newArr: FileValidated[] = [...files];
    console.log("pre output item 1", files[index].uploadStatus);
    //set uploading
    //if (!noPreparing) {
    const fiUploading: FileValidated = await setPrepToUploading(files[index]);
    newArr[index] = fiUploading;
    console.log("pre output item 2", newArr[index].uploadStatus);
    handleChangeFiles([...newArr]);
    //}
    //caso contrario,  STATUS ya esta en uploading
    // set success or error or abort
    const fiSuccess: FileValidated = await uploadOne(newArr[index]);
    newArr[index] = fiSuccess;
    console.log("pre output item 3", newArr[index].uploadStatus);
    handleChangeFiles([...newArr]);
    //espera a ambos que cambien para seguir XD XD XD
    setUploadManager({
      ...uploadManager,
      isUploadingOne: false,
      currIndex: index + 1,
    });
  };
  //trigger upload
  React.useEffect(() => {
    const { isUploading, currIndex, isUploadingOne, tempFiles } = uploadManager;
    console.log(
      "effect uploader",
      files.map((x) => x.uploadStatus),
      currIndex,
      isUploading,
      isUploadingOne
    );
    if (
      isUploading &&
      currIndex !== undefined &&
      currIndex < files.length &&
      currIndex >= 0 &&
      files.length > 0
    ) {
      if (!isUploadingOne) {
        uploadOneHandler(files, currIndex);
      }
    }
  }, [files, uploadManager]);

  const initUploading = (): void => {
    let newArrFiles: FileValidated[];
    //no preparing prop will be used, then turn all files directly to upload status
    if (noPreparing) {
      newArrFiles = files.map((f) => {
        return { ...f, uploadStatus: UPLOADSTATUS.uploading };
      });
    } else {
      newArrFiles = files.map((f) => {
        return { ...f, uploadStatus: UPLOADSTATUS.preparing };
      });
    }
    handleChangeFiles([...newArrFiles]);
    setUploadManager({ ...uploadManager, isUploading: true, currIndex: 0 });
  };
  const setPrepToUploading = (
    fileValidated: FileValidated
  ): Promise<FileValidated> => {
    console.log("setPrepToUploading", fileValidated.uploadStatus, noPreparing);
    return new Promise((resolve, reject) => {
      //then, preparing= yes?

      if (noPreparing) {
        setTimeout(() => {
          resolve({
            ...fileValidated,
            uploadStatus: UPLOADSTATUS.uploading,
          });
        }, 1500);
      } else {
        if (fileValidated.uploadStatus === undefined) {
          setTimeout(() => {
            resolve({
              ...fileValidated,
              uploadStatus: UPLOADSTATUS.uploading,
            });
          }, 1500);
        } else {
          setTimeout(() => {
            resolve({
              ...fileValidated,
            });
          }, 1500);
        }
      }
    });
  };
  const uploadOne = (fileValidated: FileValidated): Promise<FileValidated> => {
    console.log("upoload One", fileValidated);
    return new Promise((resolve, reject) => {
      if (fileValidated.uploadStatus === UPLOADSTATUS.uploading) {
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

  /**
   * We take into account a higher precedense on uploadStatus==undefined
   * @param localFiles The current list of files
   * @param outsideFiles The files that are comming from other source like tempFiles
   * @returns the merged list
   */
  const mergeFileList = (
    //lo que tengo
    localFiles: FileValidated[],
    //lo que este esperando en bandeja, puede venir de afuera
    outsideFiles: FileValidated[]
  ): FileValidated[] => {
    console.log(
      "merging?",
      localFiles.map((x) => x.uploadStatus),
      outsideFiles.map((x) => x.uploadStatus)
    );
    if (outsideFiles.length === 0) return localFiles;
    if (localFiles.length === 0) return outsideFiles;
    let newArrFiles: FileValidated[] = [];
    for (let i = 0; i < localFiles.length; i++) {
      //cuando hago onCancel()
      //afuera es undef
      //aqui probablemente insisto con "preparing"
      if (
        localFiles[i].uploadStatus === UPLOADSTATUS.preparing &&
        outsideFiles[i].uploadStatus === undefined
      ) {
        newArrFiles.push({ ...outsideFiles[i] });
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
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = "link";
    setIsDragging(true);
  };
  const handleDragLeave: React.DragEventHandler<HTMLDivElement> = (
    evt: React.DragEvent<HTMLDivElement>
  ) => {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = "link";
    setIsDragging(false);
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
      fileListToFileValdateArray(fileList);
    console.log("Kamui", fileValidatedList);
  };
  const handleOnChangeInput: React.ChangeEventHandler<HTMLInputElement> = (
    evt: React.ChangeEvent<HTMLInputElement>
  ): void => {
    let fileList: FileList = evt.target.files as FileList;
    const fileValidatedList: FileValidated[] =
      fileListToFileValdateArray(fileList);
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
export default DropzoneUI2;
