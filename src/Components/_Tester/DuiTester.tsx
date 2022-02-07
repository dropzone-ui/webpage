import { Button } from "@mui/material";
import * as React from "react";
import {
  Dropzone,
  FileItem,
  FileValidated,
  FullScreenPreview,
  UPLOADSTATUS,
  VideoPreview,
} from "../../dropzone-ui";
import { FileItemProps } from "../../dropzone-ui/components/file-item/components/FileItem/FileItemProps";
import IconList from "../Dui_IconsList/IconList";
/**
 * CONSTANTES
 */
const xhr = new XMLHttpRequest();
const ENDPOINT = "https://duiserver2.deelo.cloud/upload-my-file";
const regex: RegExp = /\,(?!\s*?[\{\[\"\'\w])/g;
/**
 *
 * @param props any
 * @returns
 */
const DuiTester: React.FC<any> = (props: any) => {
  const [files, setFiles] = React.useState<FileValidated[]>([]);
  const [imageSrc, setImageSrc] = React.useState<string | undefined>(undefined);
  const [progress, setProgress] = React.useState<string>("");
  const [status, setStatus] = React.useState<string>("---");
  const [videoSrc, setVideoSrc] = React.useState<File | string | undefined>("");
  const updateFiles = (incommingFiles: FileValidated[]) => {
    console.log("incomming files", incommingFiles);
    setFiles(incommingFiles);
  };
  const onDelete = (id: FileItemProps["id"]) => {
    setFiles(files.filter((x) => x.id !== id));
  };
  const handleSee = (imageSource: string | undefined) => {
    setImageSrc(imageSource);
  };
  const handleClean = (files: FileValidated[]) => {
    console.log("list cleaned", files);
  };
  const handleWatch = (vidSrc: string | File | undefined) => {
    console.log("handleWatch", vidSrc);
    setVideoSrc(vidSrc);
  };
  const customUpload = () => {
    const fileValidated: FileValidated = files[0];
    console.log("upload start", fileValidated);

    if (fileValidated && fileValidated.file) {
      // listen for `upload.load` event
      setStatus("starting");

      xhr.upload.onload = () => {
        console.log(`The upload is completed: ${xhr.status} ${xhr.response}`);
        /*    console.log("Response: ", xhr.response);
        console.log("Response: ", xhr.response);
        console.log("Response text: ", xhr.responseText);
        console.log("Response type: ", xhr.responseType); */
        //console.log("XHR:",xhr);

        setStatus("loaded");
      };

      // listen for `upload.error` event
      xhr.upload.onerror = () => {
        console.error("Upload failed.");
        setStatus("An error ocurred");
      };

      // listen for `upload.abort` event
      xhr.upload.onabort = () => {
        console.error("Upload cancelled.");
        setStatus("aborted");
      };

      // listen for `progress` event
      xhr.upload.onprogress = (event) => {
        // event.loaded returns how many bytes are downloaded
        // event.total returns the total number of bytes
        // event.total is only available if server sends `Content-Length` header
        console.log(`Uploaded ${event.loaded} of ${event.total} bytes`);
        setProgress(`${event.loaded}/${event.total}`);
      };
      xhr.onreadystatechange = async () => {
        console.log("Finished", xhr);
        if (xhr.DONE) {
          console.log(
            `onreadystatechange The upload is completed: ${xhr.status} ${xhr.response}`
          );
          console.log("onreadystatechange responseText: ", xhr.responseText);

          // let jsonResponse = await JSON.parse(xhr.responseText);
          let correct = xhr.response.replace(regex, "");
          //myrespose = await JSON.parse(myrespose);
          //const {status, message, payload} = xhr.response;
          const jsonResponse = JSON.parse(correct);
          console.log("=> jsonResponse", jsonResponse);
          // console.log("=> status", jsonResponse.status);
          // console.log("=> message", jsonResponse.message);
          // console.log("=> payload", jsonResponse.payload);
        } else {
          console.log("Changed to " + xhr.status);
        }
      };
      // open request
      xhr.open("POST", ENDPOINT, true);
      xhr.setRequestHeader(
        "Accept",
        "application/json; charset=utf-8, text/plain, */*"
      );
      // xhr.setRequestHeader("Content-Type", "multipart/form-data");

      // prepare a file object

      const formData = new FormData();
      formData.append("file", fileValidated.file);

      // send request
      xhr.send(formData);
      setStatus("loading...");
    } else {
      alert("Sin archivo");
    }
  };
  const customAbort = () => {
    xhr.abort();
  };
  return (
    <div
      style={{
        width: "80%",
        height: "100vh",
        margin: "auto",
      }}
    >
      <Dropzone
        style={{ minWidth: "550px" }}
        onChange={updateFiles}
        minHeight="195px"
        onClean={handleClean}
        value={files}
        maxFiles={5}
        //behaviour="replace"
        maxFileSize={2998000000}
        label="Suleta tus archivos aquí"
        //accept="*"
        // uploadingMessage={"Uploading..."}
        url={ENDPOINT}
        //of course this url doens´t work, is only to make upload button visible
        disableScroll
        localization={"ES-es"}
      >
        {files.map((file) => (
          <FileItem
            {...file}
            key={file.id}
            onDelete={onDelete}
            onSee={handleSee}
            onWatch={handleWatch}
            //elevation={2}
            //localization={"ES-es"}
            alwaysActive
            resultOnTooltip
            //uploadStatus={UPLOADSTATUS.uploading}
            progress={45}
            onAbort={(id?:string | number)=>{alert(`delete ${id}`)}}
            downloadUrl="https://duiserver2.deelo.cloud/download/SSJ2.jpg"
            preview
            info
            hd
          />
        ))}
        <FullScreenPreview
          imgSource={imageSrc}
          openImage={imageSrc !== undefined}
          onClose={(e: any) => handleSee(undefined)}
        />
        <VideoPreview
          videoSrc={videoSrc}
          openVideo={videoSrc !== undefined}
          onClose={(e: any) => handleWatch(undefined)}
          controls
          autoplay
        />
      </Dropzone>
      <Button variant="contained" onClick={customUpload}>
        {" "}
        Subir{" "}
      </Button>
      <Button variant="outlined" onClick={customAbort}>
        {" "}
        Abort{" "}
      </Button>
      <p>{`Current progress ${progress} %`}</p>
      <p>{`Estado: ${status}`}</p>
      <IconList />
    </div>
  );
};
export default DuiTester;

const res = {
  status: true,
  message: "File was uploaded successfully on dui server",
  payload: {
    name: "PostmanShringan.png",
    mimetype: "image/png",
    size: 19603,
    path: "/files/",
    url: "https://my-ftp-server.com/bjYJGFYgjfVGHVb",
  },
};
