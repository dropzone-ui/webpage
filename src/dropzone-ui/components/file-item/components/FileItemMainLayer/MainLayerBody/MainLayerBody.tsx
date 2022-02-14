import * as React from "react";
import { Localization } from "../../../../../localization/localization";
import { UPLOADSTATUS } from "../../../../dropzone/components/utils/validation.utils";
import FileItemStatus from "../../FileItemStatus/FileItemStatus";
import FileItemLoader from "../FileItemLoader/FileItemLoader";
import "./MainLayerBody.scss";
export type MainLayerBodyProps = {
  valid: boolean;

  showInfo: boolean;
  /**
   * This feature is hidden, it is not present on documentation
   * because is experimental. If you found this prop, you can test it
   * and comment us if any issue is found. Thanks in advance.
   *
   * Make file name, info layer, size and "valid message"
   * not visible
   */
  onlyImage?: boolean;
  uploadStatus?: UPLOADSTATUS;

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
  uploadComplete?: boolean;
};
const MainLayerBody: React.FC<MainLayerBodyProps> = (
  props: MainLayerBodyProps
) => {
  const {
    uploadStatus,
    showInfo,
    hovering,
    uploadComplete,
    localization,
    onAbort,
    progress,
    onlyImage,
    valid,
    onCancel,
  } = props;
  return (
    <div
      className="dui-file-item-main-layer-body"
      //style={{backgroundColor:"wheat"}}
    >
      {uploadStatus && !showInfo && !uploadComplete && (
        <FileItemLoader
          uploadStatus={uploadStatus}
          localization={localization as Localization}
          progress={progress}
          onAbort={onAbort}
          height={60}
          width={60}
          onCancel={onCancel}
        />
      )}
      <div className="dui-file-status-aboslute-container">
        {!onlyImage && uploadStatus && uploadComplete && hovering ? (
          <React.Fragment>
            {!showInfo && hovering && (
              <FileItemStatus
                uploadStatus={uploadStatus}
                localization={localization as Localization}
              />
            )}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {!showInfo && hovering && (
              <FileItemStatus
                valid={valid}
                localization={localization as Localization}
              />
            )}
          </React.Fragment>
        )}
      </div>
    </div>
  );
};
export default MainLayerBody;
