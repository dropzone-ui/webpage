import * as React from "react";
import "./MainLayerHeader.scss";
import { Clear } from "../../../../../icons";
import { UPLOADSTATUS } from "../../../../../utils";
export type MainLayerHeaderNeoProps = {
  onDelete?: Function;
  uploadStatus?: UPLOADSTATUS;
  hovering?: boolean;
};

const MainLayerHeaderNeo: React.FC<MainLayerHeaderNeoProps> = (
  props: MainLayerHeaderNeoProps
) => {
  const { uploadStatus, onDelete, hovering } = props;
  const handleDelete = () => {
    onDelete?.();
  };

  return (
    <div className="dui-main-layer-header-container">
      {hovering &&
        ![
          UPLOADSTATUS.preparing,
          UPLOADSTATUS.uploading,
          undefined,
          null,
        ].includes(uploadStatus) &&
        onDelete && (
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
export default MainLayerHeaderNeo;
