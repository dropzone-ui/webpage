import * as React from "react";
import {
  Cancel,
  CheckCircle,
  Clean,
  Clear,
  Close,
  DoDisturb,
  Info,
  Person,
  PhotoCamera,
  PlayIcon,
  Remove,
  RemoveOutline,
  UploadDone,
  UploadError,
  UploadingProcess,
  ViewGrid,
  ViewList,
  Visibility,
} from "../../mega-dropzone-ui/icons";

const IconList = (props) => {
  return (
    <div
      style={{
        width: "100%",
        height:"100%",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      <Cancel />
      <CheckCircle />
      <Clean />
      <Clear/>
      <Close />
      <DoDisturb />
      <Info />
      <Person />
      <PhotoCamera />
      <PlayIcon />
      <Remove />
      <RemoveOutline />
      <UploadDone />
      <UploadError />
      <UploadingProcess />
      <Visibility />
      <ViewGrid />
      <ViewList />
    </div>
  );
};
export default IconList;
