import * as React from "react";
import {
  PlayIcon,
  DownloadFile,
  InfoDisney,
  Visibility,
} from "../../../../../icons";
import { Localization } from "../../../../../localization/localization";
import { UPLOADSTATUS } from "../../../../dropzone/components/utils/validation.utils";
import FileItemStatus from "../../FileItemStatus/FileItemStatus";
import FileItemSize from "../FileItemSize";

import "./MainLayerFooter.scss";
export type MainLayerFooterProps = {
  hovering?: boolean;
  onlyImage?: boolean;
  uploadStatus?: UPLOADSTATUS;
  uploadComplete?: boolean;
  localization?: Localization;
  showInfo?: boolean;
  sizeFormatted?: string;
  valid: boolean;
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
    uploadComplete,
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
  /*   React.useEffect(() => {
    console.log("FIfooter", onDownloadFile);
  }, []); */
  return (
    <React.Fragment>
      <div className="dui-main-layer-footer-container">
        {/** Show only when footer is not visible */}
        <div className="dui-main-layer-footer-status">
          { !onlyImage && uploadStatus && uploadComplete  ? (
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
              {!showInfo && !hovering && (
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
