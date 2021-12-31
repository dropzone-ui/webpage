import React from "react";

const ClipBoardInstall = ({ label, textToCopy }) => {
  return (
    <div className="clipboard-container">
      <span style={{ color: "#60d2ff" }}>
        <span style={{ color: "white" }}>
          <b>{" > "}</b>&nbsp;
        </span>
        <span style={{ color: "#e2d487" }}>{"npm "}&nbsp;</span>
        <span style={{ color: "white" }}>{"install "}&nbsp;</span>
        <span>{"@dropzone-ui/react"} &nbsp;&nbsp;</span>
        {"axios"}
      </span>
      <Clipboard
        style={{ backgroundColor: "grey" }}
        code="npm install @dropzone-ui/react axios"
        onCopyToClipboard={() => {}}
      />
    </div>
  );
};
export default ClipBoardInstall;
