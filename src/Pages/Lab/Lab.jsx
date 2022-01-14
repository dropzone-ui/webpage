import * as React from "react";
import IconList from "../../Components/Dui_IconsList/IconList";
import Previews from "../../Components/Dui_Previews/Previews";

const Lab = (props) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "stretch",
        alignContent: "center",
        //flexWrap: "wrap",
      }}
    >
      <h1>Lab</h1>
      <h2>Icons:</h2>
      <IconList />
      <h2>Previews:</h2>
     
      <Previews />
      <h2>FileItem:</h2>
      <br />
      <h2>Avatar:</h2>
      <br />
      <h2>Dropzone:</h2>
      <br />
    </div>
  );
};
export default Lab;
