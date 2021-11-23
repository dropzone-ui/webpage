import "./App.css";
import { useState } from "react";
import { Dropzone, FileItem, FullScreenPreview } from "./dropzone-ui";
import ViewRadioOptions from "./Components/ViewRadioOptions";

function App() {
  const [viewMode, setViewMode] = useState("list");
  const handleChangeView = (value) => {
    setViewMode(value);
  };
  const [files, setFiles] = useState([]);
  const [imageSrc, setImageSrc] = useState(undefined);
  const updateFiles = (incommingFiles) => {
    console.log("incomming files", incommingFiles);
    setFiles(incommingFiles);
  };
  const onDelete = (id) => {
    setFiles(files.filter((x) => x.id !== id));
  };
  const handleSee = (imageSource) => {
    setImageSrc(imageSource);
  };
  // DROPZONE PROPS
  const [accept, setAccept] = useState("image/jpeg,.ts");
  const handleChangeAccept = (e) => {
    setAccept(e.target.value);
  };
  const [color, setColor] = useState("#071e25");
  const handleChangeColor = (e) => {
    setColor(e.target.value);
  };
  const [maxSize, setmaxSize] = useState(29300000);
  const handleChangeMaxSize = (e) => {
    setmaxSize(e.target.value);
  };
  const [label, setLabel] = useState("Drop Files here or click to browse");
  const handleChangeLabel = (e) => {
    setLabel(e.target.value);
  };

  return (
    <div className="dz-ui-app">
      <p align="center">
        <img
          align="center"
          height="150"
          src="https://user-images.githubusercontent.com/43678736/132112022-0ca409ae-cca2-43c8-be89-110376260a3f.png"
          alt="dropone-ui-logo"
        />
        <h1 align="center"> Dropzone UI </h1> <h2>Set the values :D</h2>
      </p>
      <p>
        <a href="https://github.com/dropzone-ui/react/blob/HEAD/LICENSE">
          <img
            src="https://img.shields.io/badge/license-MIT-blue.svg"
            alt="license"
          />
        </a>

        <a href="https://www.npmjs.com/package/@dropzone-ui/react">
          <img
            src="https://img.shields.io/npm/v/@dropzone-ui/react.svg?logo=npm&logoColor=fff&label=NPM+package&color=limegreen"
            alt="npm latest package"
          />
        </a>

        <a href="https://openbase.com/js/@dropzone-ui/react?utm_source=embedded&utm_medium=badge&utm_campaign=rate-badge">
          <img
            src="https://badges.openbase.com/js/rating/@dropzone-ui/react.svg"
            alt="Rate on Openbase"
          />
        </a>

        <a href="https://app.travis-ci.com/dropzone-ui/react">
          <img
            src="https://app.travis-ci.com/dropzone-ui/react.svg?branch=master"
            alt="Build Status"
          />
        </a>

        <a href="https://lgtm.com/projects/g/dropzone-ui/dropzone-ui/context:javascript">
          <img
            src="https://img.shields.io/lgtm/grade/javascript/g/dropzone-ui/dropzone-ui.svg?logo=lgtm&logoWidth=18"
            alt="Language grade: JavaScript"
          />
        </a>

        <a href="https://lgtm.com/projects/g/dropzone-ui/dropzone-ui/alerts/">
          <img
            src="https://img.shields.io/lgtm/alerts/g/dropzone-ui/dropzone-ui.svg?logo=lgtm&logoWidth=18"
            alt="Total alerts"
          />
        </a>

        <a href="https://snyk.io/test/github/dropzone-ui/react">
          <img
            src="https://snyk.io/test/github/dropzone-ui/react/badge.svg"
            alt="Known Vulnerabilities"
          />
        </a>

        <a href="https://packagequality.com/#?package=dropzone-ui">
          <img
            src="https://packagequality.com/shield/dropzone-ui.svg"
            alt="Package Quality"
          />
        </a>

        <a href="https://packagephobia.com/result?p=@dropzone-ui/react">
          <img
            src="https://packagephobia.com/badge?p=@dropzone-ui/react"
            alt="install size"
          />
        </a>

        <a href="http://isitmaintained.com/project/dropzone-ui/react">
          <img
            src="http://isitmaintained.com/badge/resolution/dropzone-ui/react.svg"
            alt="Average time to resolve an issue"
          />
        </a>

        <a href="http://makeapullrequest.com">
          <img
            src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square"
            alt="PRs Welcome"
          />
        </a>

        <a href="https://github.com/dropzone-ui/react">
          <img
            src="https://img.shields.io/github/stars/dropzone-ui/react?label=Star%20me%20please%20:D&style=social"
            alt="GitHub Repo stars"
          />
        </a>
      </p>
      <div className="fomr-container">
        <div className="form-item ">
          accept:
          <input
            placeholder="accept"
            onChange={handleChangeAccept}
            value={accept}
          />
        </div>
        <div className="form-item ">
          color:
          <input
            placeholder="color"
            onChange={handleChangeColor}
            //value={color}
            type="color"
          />
        </div>
        <div className="form-item ">
          Max file size:
          <input
            placeholder="color"
            onChange={handleChangeMaxSize}
            value={maxSize}
          />
        </div>
        <div className="form-item ">
          Dropzone Label:
          <input
            placeholder="label"
            onChange={handleChangeLabel}
            value={label}
          />
        </div>
      </div>
      <ViewRadioOptions onChange={handleChangeView} value={viewMode} />
      <Dropzone
        style={{ minWidth: "550px" }}
        view={viewMode === "none" ? undefined : viewMode}
        onChange={updateFiles}
        minHeight="195px"
        onClean
        value={files}
        maxFiles={10}
        color={color}
        //header={false}
        // footer={false}
        maxFileSize={2998000}
        //label="Drag'n drop files here or click to browse"
        //label="Suleta tus archivos aquí"
        accept=".png,image/*"
        // uploadingMessage={"Uploading..."}
        url="http://ec2-99-99-9-9.compute-1.amazonaws.com:2800/upload-my-file"
        //of course this url doens´t work, is only to make upload button visible
        //uploadOnDrop
        //clickable={false}
        fakeUploading
        //localization={"FR-fr"}
      >
        {files.map((file) => (
          <FileItem
            {...file}
            key={file.id}
            onDelete={onDelete}
            onSee={handleSee}
            //localization={"FR-fr"}
            //localization={"ES-es"}
            preview
            info
            hd
          />
        ))}
        <FullScreenPreview
          imgSource={imageSrc}
          openImage={imageSrc}
          onClose={(e) => handleSee(undefined)}
        />
      </Dropzone>
    </div>
  );
}

export default App;
