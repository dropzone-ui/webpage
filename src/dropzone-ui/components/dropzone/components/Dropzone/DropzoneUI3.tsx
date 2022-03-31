import { OverridableComponentProps } from "@dropzone-ui/core";
import * as React from "react";
import { FileValidated, UPLOADSTATUS } from "../../../../utils";
import DuiFile from "../utils/DuiFile";
import { DuiFileManager } from "../utils/DuiFileManager";
import {
  prepToUploadOne,
  setPrepToUploading,
  sleepPreparing,
  uploadOne,
  uploadOneDuiFile,
} from "../utils/fakeupload.utils";

import "./DropzoneUI.scss";

export interface DUIProps extends OverridableComponentProps {
  //FILES
  onChange?: (files: FileValidated[]) => void;
  value?: FileValidated[];
  preparingTime?: number;
}
//let arrOfDuiFiles: DuiFile[] = [];
const DropzoneUI3: React.FC<DUIProps> = (props: DUIProps) => {
  const { children, style, onChange, value = [], preparingTime = 1500 } = props;
  const [files, setFiles] = React.useState<FileValidated[]>([]);
  //const [duiFiles, setDuiFiles] = React.useState<DuiFile[]>([]);
  const [isUploading, setIsUploading] = React.useState<boolean>(false);
  const [duiFileId, setDuiFileID] = React.useState<number | undefined>(
    undefined
  );
  //obtain next ID
  //depues lo hago hook
  React.useEffect(() => {
    console.log("id effect", duiFileId);
    if (!duiFileId) {
      const newId: number = DuiFileManager.createFileListMap();
      setDuiFileID(newId);
      console.log("id effect set", newId);
    }
  }, [duiFileId]);
  //update files when value changes
  //When isUploading is true, only update when value and arrOfDuiFiles
  // have same lenght. Also, only updates the uploadStatus attribute
  // from "preparing", to undefined when OnCancel() method is called in
  // FileItem component
  React.useEffect(() => {
    let arrOfDuiFiles: DuiFile[] | undefined =
      DuiFileManager.getFileListMap(duiFileId);
    console.log(
      "Changing",
      arrOfDuiFiles?.map((x) => x.uploadStatus),
      value.map((x) => x.uploadStatus),
      isUploading
    );
    if (!isUploading) {
      setFiles(value);
    } else {
      if (arrOfDuiFiles) {
        if (arrOfDuiFiles.length !== value.length || value.length === 0) {
          return;
        }
        for (let i = 0; i < arrOfDuiFiles.length; i++) {
          if (
            value[i].uploadStatus === undefined &&
            arrOfDuiFiles[i].uploadStatus === UPLOADSTATUS.preparing
          ) {
            arrOfDuiFiles[i].uploadStatus = undefined;
          }
        }
      }
    }
  }, [value]);

  const handleFileChange = (files: FileValidated[]): void => {
    onChange?.(files);
  };

  const initUploading = async () => {
    // set flag to true
    // recieve on the new list
    //initialize new list
    let arrOfDuiFiles: DuiFile[] = [];
    console.log("init obtained", arrOfDuiFiles);

    if (isUploading || files.length === 0 || !arrOfDuiFiles) {
      return;
    }
    //use methids to update on static class
    setIsUploading(true);
    console.log(
      "arr before preparing",
      arrOfDuiFiles.map((x) => x.uploadStatus)
    );
    DuiFileManager.setFileList(duiFileId, [
      ...files.map(
        (x) => new DuiFile({ ...x, uploadStatus: UPLOADSTATUS.preparing })
      ),
    ]);
    arrOfDuiFiles = DuiFileManager.getFileListMap(duiFileId) || [];

    console.log(
      "arr after preparing",
      arrOfDuiFiles.map((x) => x.uploadStatus)
    );

    handleFileChange(arrOfDuiFiles.map((x) => x.toFileValidated()));

    await sleepPreparing(preparingTime);

    console.log(
      "arr after preparing sleeping",
      arrOfDuiFiles.map((x) => x.uploadStatus)
    );

    //let newFiles: FileValidated[] = [...files];

    for (let i = 0; i < arrOfDuiFiles.length; i++) {
      console.log("arr prepToUploadOne pre", arrOfDuiFiles[i].uploadStatus);
      if (arrOfDuiFiles[i].uploadStatus) {
        await prepToUploadOne(arrOfDuiFiles[i]);
        console.log("arr prepToUploadOne res", arrOfDuiFiles[i].uploadStatus);
        handleFileChange([...arrOfDuiFiles]);
        await uploadOneDuiFile(arrOfDuiFiles[i]);
        console.log("arr prepToUploadOne res", arrOfDuiFiles[i].uploadStatus);
        handleFileChange([...arrOfDuiFiles]);
      }
    }
    arrOfDuiFiles = [];
    setIsUploading(false);
  };
  return (
    <React.Fragment>
      <button onClick={initUploading}>UPLOAAADDDD</button>
      <div style={style}>{children || " Drop Files"}</div>
    </React.Fragment>
  );
};
export default DropzoneUI3;
