import * as React from "react";
import { CloudDone, UploadError } from "../../../../icons";
import { FileItemLocalizerSelector } from "../../../../localization";
import {
  Localization,
  LocalLabels,
} from "../../../../localization/localization";
import { UPLOADSTATUS } from "../../../../utils";
import "./FileItemUploadStatus.scss";
export type FileItemUploadStatusProps = {
  /**
   * sucess
   * error
   * aborted
   */
  uploadStatus?: UPLOADSTATUS;
  /**
   * language to be used on labels
   */
  localization?: Localization;
};
/**
 * Upload ststaus: "success", "aborted" and "error"
 * @returns 
 */
const FileItemUploadStatus: React.FC<FileItemUploadStatusProps> = (
  props: FileItemUploadStatusProps
) => {
  const { uploadStatus, localization } = props;
  const FileItemStatusLocalizer: LocalLabels = FileItemLocalizerSelector(
    localization
  ).status as LocalLabels;
  if (
    uploadStatus &&
    [UPLOADSTATUS.success, UPLOADSTATUS.aborted, UPLOADSTATUS.error].includes(
      uploadStatus
    )
  ) {
    const overloadClassName: string =
      uploadStatus === UPLOADSTATUS.success
        ? " file-status-success"
        : " file-status-error-aborted";
    return (
      <div
        className={`dui-file-item-upload-status-container${overloadClassName}`}
      >
        {uploadStatus === UPLOADSTATUS.success ? (
          <>
            <CloudDone color="#4caf50" size="small" className="status-icon" />
            {FileItemStatusLocalizer.success as string}
          </>
        ) : (
          <>
            <UploadError
              color="#f44336"
              size="semi-medium"
              className="status-icon"
            />
            {uploadStatus === UPLOADSTATUS.aborted ? (
              <>{FileItemStatusLocalizer.aborted as string}</>
            ) : (
              <> {FileItemStatusLocalizer.error as string}</>
            )}
          </>
        )}
      </div>
    );
  }
  return <React.Fragment></React.Fragment>;
};
export default FileItemUploadStatus;
