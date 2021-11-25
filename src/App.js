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
      <p></p>
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
