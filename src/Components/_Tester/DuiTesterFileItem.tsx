import * as React from "react";
import {
  createSyntheticFile,
  FileItem,
  FileItemContainer,
  UPLOADSTATUS,
  FileValidated,
} from "../../dropzone-ui";
import { FileItemProps } from "../../dropzone-ui/components/file-item/components/FileItem/FileItemProps";
import IconList from "../Dui_IconsList/IconList";
import DuiSuperFileItem from "./DuiSuperFileItem";
import { listOfPDF } from "./listOfPDFfiles";
import { listOfWord } from "./listOfWordFiles";
const fileObject = createSyntheticFile(
  "video-from-web.png",
  290000000,
  "video/ogg"
);
const superTesterValidActive: FileItemProps[] = [
  //validation
  {
    id: 1,
    file: fileObject,
  },
  {
    id: 2,
    file: fileObject,
    alwaysActive: true,
  },
  {
    id: 3,
    file: fileObject,
    valid: false,
  },
  {
    id: 4,
    file: fileObject,
    alwaysActive: true,
    valid: true,
  },
];
const superTesterValidErrorActiveInfo: FileItemProps[] = [
  //validation
  {
    id: 5,
    file: fileObject,
    valid: false,
    alwaysActive: true,
    errors: ["error 1", "error 2", "error 3"],
    info: true,
  },
  {
    id: 6,
    file: fileObject,
    valid: false,
    errors: ["error 1", "error 2", "error 3"],
    // alwaysActive: true,
    info: true,
  },
  {
    id: 61,
    file: fileObject,
    valid: true,
    errors: ["error 1", "error 2", "error 3"],
    // alwaysActive: true,
    info: true,
  },
];
const superTesterValidErrorActiveInfoTooltip: FileItemProps[] = [
  //validation
  {
    id: 7,
    file: fileObject,
    valid: false,
    alwaysActive: true,
    errors: ["error 1", "error 2", "error 3"],
    info: true,
    resultOnTooltip: true,
  },
  {
    id: 8,
    file: fileObject,
    valid: false,
    errors: ["error 1", "error 2", "error 3"],
    alwaysActive: false,
    info: true,
    resultOnTooltip: true,
    onDelete: () => {},
  },
  {
    id: 9,
    file: fileObject,
    //valid: false,
    errors: ["error 1", "error 2", "error 3"],
    alwaysActive: false,
    info: true,
    resultOnTooltip: true,
    onDelete: () => {},
  },
];
const superTesterValiduploading: FileItemProps[] = [
  //uploading
  {
    id: 10,
    file: fileObject,
    valid: true,
    alwaysActive: true,
    info: true,
    resultOnTooltip: true,
    uploadStatus: UPLOADSTATUS.preparing,
    // OJO
    //si no le mando el progress el preparing no funciona
    // me tira FileStatus: "error" y eso np debe pasar
    progress: 25,
  },
  {
    id: 101,
    file: fileObject,
    valid: true,
    alwaysActive: true,
    info: true,
    resultOnTooltip: true,
    uploadStatus: UPLOADSTATUS.uploading,
  },
  {
    id: 102,
    file: fileObject,
    valid: true,
    alwaysActive: true,
    info: true,
    resultOnTooltip: true,
    uploadStatus: UPLOADSTATUS.uploading,
    progress: 1,
  },
  {
    id: 103,
    file: fileObject,
    valid: true,
    alwaysActive: true,
    info: true,
    resultOnTooltip: true,
    uploadStatus: UPLOADSTATUS.uploading,
    onAbort: () => {},
  },
  {
    id: 103,
    file: fileObject,
    valid: true,
    alwaysActive: true,
    info: true,
    resultOnTooltip: true,
    uploadStatus: UPLOADSTATUS.uploading,
    progress: 25,
    onAbort: () => {},
  },
  {
    id: 11,
    file: fileObject,
    valid: true,
    alwaysActive: true,
    info: true,
    resultOnTooltip: true,
    uploadStatus: UPLOADSTATUS.aborted,
    uploadMessage: "Upload aborted",
  },
  {
    id: 12,
    file: fileObject,
    //valid: true,
    alwaysActive: true,
    info: true,
    resultOnTooltip: true,
    uploadStatus: UPLOADSTATUS.success,
    uploadMessage: "File was successfully uploaded",
    onDelete: () => {},
  },
  {
    id: 13,
    file: fileObject,
    //valid: true,
    alwaysActive: true,
    info: true,
    resultOnTooltip: true,
    uploadStatus: UPLOADSTATUS.error,
    onDelete: () => {},
  },
  {
    id: 14,
    file: fileObject,
    //valid: true,
    alwaysActive: true,
    info: true,
    resultOnTooltip: true,
    uploadStatus: UPLOADSTATUS.success,
    onDelete: () => {},
    downloadUrl: "",
  },
];
const DuiTesterFileItem: React.FC<any> = (props: any) => {
  const handleDelete = (id: string | number | undefined) => {
    alert("deleted " + id);
  };
  const handleAbort = (id: string | number | undefined) => {
    alert("aborted " + id);
  };
  const [mProgress, setMyProgres] = React.useState(10);
  React.useEffect(() => {
    if (mProgress < 100) {
      setTimeout(() => {
        setMyProgres(mProgress + 15);
      }, 800);
    }
    console.log(mProgress);
  }, [mProgress]);

  return (
    <div style={{ minHeight: "100vh", width: "80%", margin: "auto" }}>
      <DuiSuperFileItem fileObject={fileObject} />

      {/*   <h2>Valid + alwaysActive</h2>
      <FileItemContainer
        view="grid"
        disableScroll
        style={{ minHeight: "200px", border: "2px dashed crimson" }}
      >
        {superTesterValidActive.map(
          (fileItemProp: FileItemProps, index: number) => (
            <FileItem key={index} {...fileItemProp} />
          )
        )}
      </FileItemContainer>
      <h2>Valid + errors + alwaysActive +info</h2>

      <FileItemContainer
        view="grid"
        disableScroll
        style={{ minHeight: "200px", border: "2px dashed crimson" }}
      >
        {superTesterValidErrorActiveInfo.map(
          (fileItemProp: FileItemProps, index: number) => (
            <FileItem key={index} {...fileItemProp} />
          )
        )}
      </FileItemContainer>
      <h2>Valid + errors + alwaysActive +info + resultOnTooltip</h2>

      <FileItemContainer
        view="grid"
        disableScroll
        style={{ minHeight: "200px", border: "2px dashed crimson" }}
      >
        {superTesterValidErrorActiveInfoTooltip.map(
          (fileItemProp: FileItemProps, index: number) => (
            <FileItem key={index} {...fileItemProp} />
          )
        )}
      </FileItemContainer>
      <h2>Uploading status</h2>

      <FileItemContainer
        view="grid"
        disableScroll
        style={{ minHeight: "200px", border: "2px dashed crimson" }}
      >
        {superTesterValiduploading.map(
          (fileItemProp: FileItemProps, index: number) => (
            <FileItem key={index} {...fileItemProp} />
          )
        )}
      </FileItemContainer> */}
      <IconList />
    </div>
  );
};
export default DuiTesterFileItem;
{
  /* {listOfWord.map((f: FileItemProps, index: number) => (
          <FileItem
            {...f}
            key={f.id}
            onDelete={handleDelete}
            alwaysActive
            //elevation={2}
            localization={"ES-es"}
            resultOnTooltip
            progress={mProgress}
            // onAbort={handleAbort}
            info
          />
        ))}
        {listOfPDF.map((f, index) => (
          <FileItem
            {...f}
            key={f.id}
            onDelete={handleDelete}
            //alwaysActive
            //elevation={2}
            //localization={"ZH-cn"}

            resultOnTooltip
            info
          />
        ))} */
}
