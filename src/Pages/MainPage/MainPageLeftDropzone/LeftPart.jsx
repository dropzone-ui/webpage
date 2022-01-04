import { Clipboard, Highlighter } from "rc-highlight";
import React, { Fragment } from "react";
import Badges from "../../../Components/Badges";
import Options from "../../../Components/OptionsRedirect/Options";
import "./LeftPart.scss";
const LeftPart = (props) => {
  return (
    <Fragment>
      <div className="dropzone-ui-text-container">
        The best and most complete library for managing file uploads
      </div>
      <Badges />
      <h2>Getting started:</h2>
      <p>
        For uploading files, peer dependency axios must be also installed
        together with dropzone-ui this way using{" "}
        <a
          href="https://www.npmjs.com/package/@dropzone-ui/react"
          target="_blank"
        >
          npm
        </a> this way:
      </p>
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
      <p>
        or using{" "}
        <a
          href="https://yarnpkg.com/package/@dropzone-ui/react"
          target="_blank"
        >
          yarn
        </a>
        :
      </p>
      <div className="clipboard-container">
        <span style={{ color: "#60d2ff" }}>
          <span style={{ color: "white" }}>
            <b>{" > "}</b>&nbsp;
          </span>
          <span style={{ color: "#e2d487" }}>{"yarn "}&nbsp;</span>
          <span style={{ color: "white" }}>{"add "}&nbsp;</span>
          <span>{"@dropzone-ui/react"} &nbsp;&nbsp;</span>
          {"axios"}
        </span>
        <Clipboard
          style={{ backgroundColor: "grey" }}
          code="yarn add @dropzone-ui/react axios"
          onCopyToClipboard={() => {}}
        />
      </div>
     {/*  <Options /> */}
    </Fragment>
  );
};
export default LeftPart;
const installCode = `npm i @dropzone-ui/react axios`;
