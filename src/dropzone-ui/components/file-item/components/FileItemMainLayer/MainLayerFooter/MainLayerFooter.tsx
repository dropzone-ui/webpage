import * as React from "react";
import {
  PlayIcon,
  DownloadFile,
  InfoDisney,
  Visibility,
} from "../../../../../icons";
import { Localization } from "../../../../../localization/localization";
import { UPLOADSTATUS } from "../../../../../utils";
import FileItemStatus from "../../FileItemStatus/FileItemStatus";
import FileItemSize from "../FileItemSize";

import "./MainLayerFooter.scss";
export type MainLayerFooterProps = {
  hovering?: boolean;
  onlyImage?: boolean;
  uploadStatus?: UPLOADSTATUS;
  // uploadComplete?: boolean;
  localization?: Localization;
  showInfo?: boolean;
  sizeFormatted?: string;
  /**
   * whether show a valid or rejected message
   * by def. valid is false (if not present, is false too)
   */
  valid?: boolean | null;
  isImage?: boolean;
  isVideo?: boolean;
  info?: boolean;
  onOpenInfo?: Function;
  onOpenImage?: Function | undefined;
  onOpenVideo?: Function | undefined;
  onDownloadFile?: Function | undefined;
};
const MainLayerFooter: React.FC<MainLayerFooterProps> = (
  props: MainLayerFooterProps
) => {
  const {
    onlyImage,
    uploadStatus,
    // uploadComplete,
    localization,
    showInfo,
    sizeFormatted,
    valid,
    info,
    isImage,
    isVideo,
    onDownloadFile,
    onOpenImage,
    onOpenVideo,
    onOpenInfo,
    hovering,
  } = props;
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

  const [uploadComplete, setUploadComplete] = React.useState<boolean>(false);
  React.useEffect(() => {
    if (
      uploadStatus &&
      ["success", "error", "success", "aborted"].includes(uploadStatus)
    ) {
      setTimeout(() => {
        setUploadComplete(true);
      }, 2000);
    }
    return () => {
      setUploadComplete(false);
    };
  }, [uploadStatus]);

/*   React.useEffect(() => {
    console.log("MainLayerFooter", uploadStatus, uploadComplete);
  }, [uploadStatus, uploadComplete]);
 */
  return (
    <React.Fragment>
      <div className="dui-main-layer-footer-container">
        {/** Show only when footer is not visible */}
        <div className="dui-main-layer-footer-status">
          {!onlyImage &&
          uploadStatus &&
          uploadStatus !== UPLOADSTATUS.uploading &&
          uploadComplete ? (
            <React.Fragment>
              {!showInfo && !hovering && (
                <FileItemStatus
                  uploadStatus={uploadStatus}
                  localization={localization as Localization}
                />
              )}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {!showInfo && !hovering && typeof valid !== "undefined" && (
                <FileItemStatus
                  valid={valid}
                  localization={localization as Localization}
                />
              )}
            </React.Fragment>
          )}
        </div>
        {/** Action buttons and file size */}
        <div className="dui-main-layer-footer">
          {!showInfo && hovering && (
            <React.Fragment>
              {!onlyImage && <FileItemSize sizeFormatted={sizeFormatted} />}

              {isImage &&
                onOpenImage &&
                typeof valid === "boolean" &&
                valid && (
                  <Visibility
                    className="dui-file-item-icon"
                    color="rgba(255,255,255,0.851)"
                    onClick={handleOpenImage}
                    size="small"
                  />
                )}
              {isVideo &&
                onOpenVideo &&
                typeof valid === "boolean" &&
                valid && (
                  <PlayIcon
                    className="dui-file-item-icon"
                    color="rgba(255,255,255,0.851)"
                    onClick={handleOpenVideo}
                    size="small"
                  />
                )}
              {onDownloadFile && (
                <DownloadFile
                  className="dui-file-item-icon"
                  color="rgba(255,255,255,0.851)"
                  onClick={handleDownloadFile}
                  size="small"
                />
              )}
              {!onlyImage && info && (
                <InfoDisney
                  className="dui-file-item-icon"
                  onClick={handleOpenInfo}
                  color="rgba(255,255,255,0.851)"
                  size="micro"
                />
              )}
            </React.Fragment>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};
export default MainLayerFooter;
