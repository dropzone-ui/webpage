import React, { FC, Fragment, useEffect, useState } from "react";
//import { FileItemProps } from "../FileItem/FileItemProps";
import FileItemStatus from "../FileItemStatus/FileItemStatus";
import {
  PlayIcon,
  Cancel,
  Visibility,
  Info,
  Clear,
  InfoBlack,
  DownloadFile,
  InfoDisney,
} from "../../../../icons";
import { Localization } from "../../../../localization/localization";
import MainLayerHeader from "./MainLayerHeader";
import MainLayerFooter from "./MainLayerFooter";
import "./FileItemMainLayer.scss";
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
  valid: boolean;
  isImage: boolean;
  isVideo: boolean;
  uploadStatus?: undefined | "uploading" | "success" | "error";
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
}

const FileItemMainLayer: FC<FileItemMainLayerProps> = (
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
    onAbort
  } = props;
  const handleDelete = () => {
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
  };
  const [uploadComplete, setUploadComplete] = useState<boolean>(false);
  useEffect(() => {
    if (uploadStatus === "success") {
      setTimeout(() => {
        setUploadComplete(true);
      }, 2000);
    }
  }, [uploadStatus]);
  return (
    <Fragment>
      <div className="dui-main-layer-container">
        <MainLayerHeader
          onDelete={onDelete}
          uploadStatus={uploadStatus}
          hovering={hovering}
        />

        {uploadStatus && !showInfo && !uploadComplete && (
          <FileItemStatus
            uploadStatus={uploadStatus}
            localization={localization as Localization}
            progress={progress}
            onAbort={onAbort}
          />
        )}
        <MainLayerFooter
          onlyImage={onlyImage}
          uploadStatus={uploadStatus}
          uploadComplete={uploadComplete}
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
    </Fragment>
  );
};
export default FileItemMainLayer;
