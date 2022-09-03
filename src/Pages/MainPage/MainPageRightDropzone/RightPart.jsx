import {
  Dropzone,
  FileItem,
  FullScreenPreview,
  VideoPreview,
} from "@dropzone-ui/react";
import React, { Fragment, useState } from "react";
import Options from "../../../Components/OptionsRedirect/Options";
/* import {
  Dropzone,
  FileItem,
  FullScreenPreview,
  VideoPreview,
} from "../../../dropzone-ui"; */
import "./RightPart.scss";
const RightPart = (props) => {
  const [files, setFiles] = useState([]);
  const [imageSrc, setImageSrc] = useState(undefined);
  const [videoSrc, setVideoSrc] = useState(undefined);

  const updateFiles = (incommingFiles) => {
    console.log("incomming files", incommingFiles);
    setFiles(
      incommingFiles.filter((f, index) => {
        if (index < 5) {
          return f;
        }
      })
    );
  };
  const onDelete = (id) => {
    setFiles(files.filter((x) => x.id !== id));
  };
  const handleSee = (imageSource) => {
    setImageSrc(imageSource);
  };
  const handleClean = (files) => {
    //console.log("list cleaned", files);
  };
  const handleWatch = (vidSrc) => {
    //console.log("handleWatch", vidSrc);
    setVideoSrc(vidSrc);
  };
  return (
    <Fragment
    //className="dui-right-part-container"
    >
      <div>
        <h2>{"Try this out: "}</h2>
        <p>
          Have fun with dropzone-ui. Just drag'n drop some files and see the
          magic happens
        </p>
        <br />
        <Dropzone
          //footer={false}
          //header={false}
          style={{ minWidth: "350px" }}
          onChange={updateFiles}
          minHeight="195px"
          onClean={handleClean}
          value={files}
          maxFiles={5}
          maxFileSize={29980000000}
          url="http://ec2-99-99-9-9.compute-1.amazonaws.com:2800/upload-my-file"
          uploadOnDrop
          fakeUploading
          disableScroll
        >
          {files.length > 0 &&
            files.map((file) => (
              <FileItem
                {...file}
                key={file.id}
                onWatch={handleWatch}
                onDelete={onDelete}
                onSee={handleSee}
                resultOnTooltip
                preview
                info
                hd
              />
            ))}
        </Dropzone>{" "}
        <FullScreenPreview
          imgSource={imageSrc}
          openImage={imageSrc}
          onClose={(e) => handleSee(undefined)}
        />
        <VideoPreview
          videoSrc={videoSrc}
          openVideo={videoSrc}
          onClose={(e) => handleWatch(undefined)}
          controls
          autoplay
        />
      </div>
      <br />
      <p>
        <b>Note: </b>Files are not actually uploaded, this is just a demo :D
      </p>

      <br />
      <h2>Key features:</h2>
      <ul>
        <li>{"✅ File validation: Validate files before uploading."}</li>
        <li>{"🎨 File Image previews: See a thumbnail preview"}</li>
        <li>
          {
            "🖼️ Full screen image previews: Add more interacion with a full screen preview of images"
          }
        </li>
        <li>
          {"🎥 Full screen video previews. Play the video before uploading."}
        </li>
        <li>
          {
            "👀 status visualization: validation and upload status is shown on a Tooltip or on Info Layer"
          }
        </li>
        <li>
          {"✈️ File upload: Upload valid files to a server using Axios lib."}
        </li>
        <li>{"🎭 Out of the box design and style."}</li>
        <li>
          {
            "🍰 Easy to use. Probably, this is the killer feature you are looking for in a package."
          }
        </li>
      </ul>
      <Options />
    </Fragment>
  );
};
export default RightPart;
