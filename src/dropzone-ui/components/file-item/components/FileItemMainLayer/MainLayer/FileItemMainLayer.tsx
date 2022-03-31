import * as React from "react";
//import { FileItemProps } from "../FileItem/FileItemProps";
//import FileItemStatus from "../FileItemStatus/FileItemStatus";

import { Localization } from "../../../../../localization/localization";
import MainLayerHeader from "../MainLayerHeader/MainLayerHeader";
import MainLayerFooter from "../MainLayerFooter/MainLayerFooter";
import "./FileItemMainLayer.scss";
// import FileItemLoader from "../FileItemLoader/FileItemLoader";
// import FileItemStatus from "../../FileItemStatus/FileItemStatus";
import MainLayerBody from "../MainLayerBody/MainLayerBody";
import { UPLOADSTATUS } from "../../../../../utils";
//import {shrinkWord} from "./../../utils";
export interface FileItemMainLayerProps {
  showInfo: boolean;
  onOpenInfo: Function;
  onOpenImage: Function | undefined;
  onOpenVideo: Function | undefined;
  onDelete: Function | undefined;
  onDownloadFile: Function | undefined;
  //fileNamePosition: FileItemProps["fileName"];
  fileName: string;
  info: boolean;
  /**
     * whether show a valid or rejected message
     * by def. valid is false (if not present, is false too)
     */
   valid?: boolean | null;
  isImage: boolean;
  isVideo: boolean;
  uploadStatus?: UPLOADSTATUS;
  sizeFormatted: string;
  /**
   * This feature is hidden, it is not present on documentation
   * because is experimental. If you found this prop, you can test it
   * and comment us if any issue is found. Thanks in advance.
   *
   * Make file name, info layer, size and "valid message"
   * not visible
   */
  onlyImage?: boolean;
  /**
   * language to be used
   * for now
   * only English and Spanish is supported
   */
  localization?: Localization;
  hovering?: boolean;
  /**
   * the current percentage upload progress
   *
   */
  progress?: number;
  /**
   * abort event
   */
  onAbort?: Function;
  onCancel?: Function;
}

const FileItemMainLayer: React.FC<FileItemMainLayerProps> = (
  props: FileItemMainLayerProps
) => {
  const {
    showInfo,
    onDelete,
    info,
    valid,
    isImage,
    isVideo,
    onlyImage,
    onOpenInfo,
    onOpenImage,
    onOpenVideo,
    onDownloadFile,
    sizeFormatted,
    uploadStatus,
    localization,
    hovering,
    progress,
    onAbort,
    onCancel,
  } = props;
  /*  const handleDelete = () => {
    onDelete?.();
  };
  const handleOpenInfo = () => {
    onOpenInfo?.();
  };
  const handleOpenImage = () => {
    onOpenImage?.();
  };
  const handleOpenVideo = () => {
    onOpenVideo?.();
  };
  const handleDownloadFile = () => {
    onDownloadFile?.();
  }; */
  //UPLOADSTATUS.
  /* const [uploadComplete, setUploadComplete] = React.useState<boolean>(false);
  React.useEffect(() => {
    if ( uploadStatus && ["success","error","success","aborted"].includes(uploadStatus)) {
      console.log("FileItemMainLayer-success", props);
      setTimeout(() => {
        setUploadComplete(true);
      }, 2000);
    }
    return()=>{
      setUploadComplete(false);
    }
  }, [uploadStatus]); */
  return (
    <React.Fragment>
      <div className={"dui-main-layer-container"}>
        <MainLayerHeader
          onDelete={onDelete}
          uploadStatus={uploadStatus}
          hovering={hovering}
          showInfo={showInfo}
        />

        <MainLayerBody
          uploadStatus={uploadStatus}
          showInfo={showInfo}
         // uploadComplete={uploadComplete}
          localization={localization}
          progress={progress}
          onAbort={onAbort}
          valid={valid}
          hovering={hovering}
          onlyImage={onlyImage}
          onCancel={onCancel}
        />
        <MainLayerFooter
          onlyImage={onlyImage}
          uploadStatus={uploadStatus}
         // uploadComplete={uploadComplete}
          localization={localization}
          showInfo={showInfo}
          sizeFormatted={sizeFormatted}
          valid={valid}
          info={info}
          isImage={isImage}
          isVideo={isVideo}
          onDownloadFile={onDownloadFile}
          onOpenImage={onOpenImage}
          onOpenVideo={onOpenVideo}
          onOpenInfo={onOpenInfo}
          hovering={hovering}
        />
      </div>
    </React.Fragment>
  );
};
export default FileItemMainLayer;
