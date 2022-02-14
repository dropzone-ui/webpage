import * as React from "react";
import "./MainLayerHeader.scss";
import { Clear } from "../../../../../icons";
import { UPLOADSTATUS } from "../../../../dropzone/components/utils/validation.utils";
export type MainLayerHeaderProps = {
  onDelete?: Function;
  uploadStatus?: UPLOADSTATUS;
  hovering?: boolean;
  showInfo: boolean;
};

const MainLayerHeader: React.FC<MainLayerHeaderProps> = (
  props: MainLayerHeaderProps
) => {
  const { uploadStatus, onDelete, hovering, showInfo } = props;
  const handleDelete = () => {
    onDelete?.();
  };

  return (
    <div className="dui-main-layer-header-container">
      {!showInfo && hovering && uploadStatus !== "uploading" && onDelete && (
        <Clear
          className="dui-file-item-icon"
          color="rgba(255,255,255,0.851)"
          onClick={handleDelete}
          size="small"
          colorFill="transparent"
        />
      )}
    </div>
  );
};
export default MainLayerHeader;
