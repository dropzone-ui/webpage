import * as React from "react";
import { UPLOADSTATUS } from "../../../../../utils";
import DefaultLoaderNeo from "../../../../loader/DefaultLoader/DefaultLoaderNeo";
export type PrincipalStateProps = {
  uploadStatus?: UPLOADSTATUS;
  valid?: boolean;
};
const PrincipalState: React.FC<PrincipalStateProps> = (
  props: PrincipalStateProps
) => {
  const { uploadStatus, valid } = props;
  const [isUploading, setIsUploading] = React.useState<boolean | undefined>(
    undefined
  );
  const [isValid, setIsValid] = React.useState<boolean | undefined>(undefined);
  React.useEffect(() => {
    setIsUploading(
      uploadStatus &&
        [UPLOADSTATUS.preparing, UPLOADSTATUS.uploading].includes(uploadStatus)
    );
  }, [uploadStatus]);
  return (
    <div>
      <DefaultLoaderNeo color="green" />
    </div>
  );
};
export default PrincipalState;
