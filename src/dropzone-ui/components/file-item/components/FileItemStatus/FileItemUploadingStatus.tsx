import * as React from "react";
import { FileItemLocalizerSelector } from "../../../../localization";
import {
  Localization,
  LocalLabels,
} from "../../../../localization/localization";
import { UPLOADSTATUS } from "../../../../utils";
import DefaultLoaderNeo from "../../../loader/DefaultLoader/DefaultLoaderNeo";
export type FileItemUploadingStatusProps = {
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
const FileItemUploadingStatus: React.FC<FileItemUploadingStatusProps> = (
  props: FileItemUploadingStatusProps
) => {
  const { uploadStatus, localization } = props;
  const FileItemStatusLocalizer: LocalLabels = FileItemLocalizerSelector(
    localization
  ).status as LocalLabels;
  if (uploadStatus && uploadStatus === UPLOADSTATUS.uploading) {
    return (
      <DefaultLoaderNeo label={FileItemStatusLocalizer.uploading as string} />
    );
  }
  return <React.Fragment></React.Fragment>;
};
export default FileItemUploadingStatus;
