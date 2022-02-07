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
      {hovering ? (
        <div className="info-container">
          {/* <div
            className={
              uploadStatus === "uploading" || !onDelete
                ? "status-close uploading"
                : showInfo
                ? "status-close hide"
                : "status-close"
            }
          >
         
            <Clear
              className="dui-file-item-icon"
              color="rgba(255,255,255,0.851)"
              onClick={uploadStatus === "uploading" ? undefined : handleDelete}
              size="small"
              colorFill="transparent"
            />
          </div>  */}
          <MainLayerHeader
            onDelete={onDelete}
            uploadStatus={uploadStatus}
            hovering={hovering}
          />
          {uploadStatus && !showInfo && (
            <div
              className={uploadComplete ? "file-status hide" : "file-status"}
            >
              <FileItemStatus
                uploadStatus={uploadStatus}
                localization={localization as Localization}
              />
            </div>
          )}

          <div className={"file-item-footer"}>
            {!onlyImage && uploadStatus && uploadComplete ? (
              <div className={showInfo ? "file-status hide" : "file-status"}>
                <div className="file-status-ok">
                  <FileItemStatus
                    uploadStatus={uploadStatus}
                    //message={localization==="ES-es"?"subido":"uploaded"}
                    localization={localization as Localization}
                  />
                </div>
              </div>
            ) : (
              <div className={showInfo ? "file-status hide" : "file-status"}>
                <FileItemStatus
                  valid={valid}
                  localization={localization as Localization}
                />
              </div>
            )}

            <div
              className={showInfo ? "size-open-info hide" : "size-open-info"}
            >
              {!onlyImage && (
                <div className={"file-item-size"}>{sizeFormatted}</div>
              )}

              {isImage && onOpenImage && valid && (
                <Visibility
                  className="dui-file-item-icon"
                  color="rgba(255,255,255,0.851)"
                  onClick={handleOpenImage}
                  size="small"
                />
              )}
              {isVideo && onOpenVideo && valid && (
                <PlayIcon
                  className="dui-file-item-icon"
                  color="rgba(255,255,255,0.851)"
                  onClick={handleOpenVideo}
                  size="small"
                />
              )}
             { <DownloadFile
                className="dui-file-item-icon"
                color="rgba(255,255,255,0.851)"
                onClick={handleOpenVideo}
                size="small"
              />}
              {!onlyImage && info && (
                <InfoDisney
                  className="dui-file-item-icon"
                  onClick={handleOpenInfo}
                  color="rgba(255,255,255,0.851)"
                  size="micro"
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <Fragment>
          <div className="info-container">
            {/*     <div
              className={
                uploadStatus === "uploading" || !onDelete
                  ? "status-close uploading"
                  : showInfo
                  ? "status-close hide"
                  : "status-close"
              }
            >
               <Clear
              color="rgba(255,255,255,0.8)"
              onClick={uploadStatus === "uploading" ? undefined : handleDelete}
              colorFill="black"
            /> 
            </div> */}
            <MainLayerHeader
              onDelete={onDelete}
              uploadStatus={uploadStatus}
              hovering={hovering}
            />
            {uploadStatus && !showInfo && (
              <div
                className={uploadComplete ? "file-status hide" : "file-status"}
              >
                <FileItemStatus
                  uploadStatus={uploadStatus}
                  localization={localization as Localization}
                />
              </div>
            )}

            <div className={"file-item-footer"}>
              {!onlyImage && uploadStatus && uploadComplete ? (
                <div className={showInfo ? "file-status hide" : "file-status"}>
                  <div
                    className="file-status-ok"
                    style={{ marginBottom: "1px" }}
                  >
                    <FileItemStatus
                      uploadStatus={uploadStatus}
                      //message={localization==="ES-es"?"subido":"uploaded"}
                      localization={localization as Localization}
                    />
                  </div>
                </div>
              ) : (
                <div
                  className={showInfo ? "file-status hide" : "file-status"}
                  style={{ marginBottom: "1px" }}
                >
                  <FileItemStatus
                    valid={valid}
                    localization={localization as Localization}
                  />
                </div>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
export default FileItemMainLayer;
