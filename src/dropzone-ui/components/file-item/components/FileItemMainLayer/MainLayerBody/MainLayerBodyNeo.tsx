import * as React from "react";
import { Localization } from "../../../../../localization/localization";
import { UPLOADSTATUS } from "../../../../../utils";
import FileItemStatus from "../../FileItemStatus/FileItemStatus";
import FileItemUploadingStatus from "../../FileItemStatus/FileItemUploadingStatus";
import FileItemUploadStatus from "../../FileItemStatus/FileItemUploadStatus";
import FileItemValidStatus from "../../FileItemStatus/FileItemValidStatus";
import FileItemLoader from "../FileItemLoader/FileItemLoader";
import "./MainLayerBody.scss";

export type MainLayerBodyNeoProps = {
  /**
   * whether show a valid or rejected message
   * by def. valid is false (if not present, is false too)
   */
  valid?: boolean | null;

 
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
const MainLayerBodyNeo: React.FC<MainLayerBodyNeoProps> = (
  props: MainLayerBodyNeoProps
) => {
  const {
    uploadStatus,

    hovering,
    //uploadComplete,
    localization,
    onAbort,
    progress,

    valid,
    onCancel,
  } = props;

  const [uploadComplete, setUploadComplete] = React.useState<boolean>(false);
  React.useEffect(() => {
    if (
      uploadStatus &&
      ["success", "error", "aborted"].includes(uploadStatus)
    ) {
      setTimeout(() => {
        setUploadComplete(true);
      }, 2000);
    }
    return () => {
      setUploadComplete(false);
    };
  }, [uploadStatus]);

  return (
    <div className="dui-file-item-main-layer-body">
      {/** Uploading or preparing stage? */}
      {!uploadComplete && (
        <React.Fragment>
          <FileItemLoader
            uploadStatus={uploadStatus}
            localization={localization as Localization}
            progress={progress}
            onAbort={onAbort}
            height={60}
            width={60}
            onCancel={onCancel}
          /> 
          <FileItemUploadStatus
            uploadStatus={uploadStatus}
            localization={localization}
          />
        </React.Fragment>
      )}
      <div className="dui-file-status-aboslute-container">
        {uploadComplete && hovering ? (
          <FileItemUploadStatus
            uploadStatus={uploadStatus}
            localization={localization}
          />
        ) : (
          <FileItemValidStatus valid={valid} localization={localization} />
        )}
      </div>
    </div>
  );
};
export default MainLayerBodyNeo;
