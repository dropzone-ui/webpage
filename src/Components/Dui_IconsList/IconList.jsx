import * as React from "react";
import {
  DynamicLoader,
  PreparingLoader,
} from "../../dropzone-ui/components/loader";
import {
  Cancel,
  CheckCircle,
  Clean,
  Clear,
  Close,
  DoDisturb,
  DownloadFile,
  Info,
  InfoBlack,
  InfoDisney,
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
} from "../../dropzone-ui/icons";

const IconList = (props) => {
  return (
    <>
      {" "}
      <div
        style={{
          width: "100%",
          //height: "100%",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <Cancel />
        <CheckCircle />
        <Clean />
        <Clear />
        <Close />
        <DoDisturb />
        <DownloadFile />
        <Info />
        <InfoBlack />
        <InfoDisney />
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
      <div
        style={{
          width: "100%",
          //height: "100%",
          //display: "flex",
          flexDirection: "row",
          //flexWrap: "wrap",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          backgroundColor: "rgba(0,0,0,0.45)",
        }}
      >
        <PreparingLoader size={60} x={50} y={50} radius={45} />{" "}
        <DynamicLoader
          size={60}
          x={30}
          y={30}
          radius={27}
          percentage={75}
          width={6}
        />
      </div>
      <div
        style={{
          width: "100%",
          //height: "100%",
          display: "flex",
          flexDirection: "row",
          //flexWrap: "wrap",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          backgroundColor: "rgba(0,0,0,0.45)",
        }}
      >
        {/* <DynamicLoader size={80} x={40} y={40} radius={36} percentage={75} />
         */}
      </div>
    </>
  );
};
export default IconList;
