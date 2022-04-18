import * as React from "react";
import { createSyntheticFile, makeSynthticFileValidate } from "./dropzone-ui";
import DropzoneNeo from "./dropzone-ui/components/dropzone/components/Dropzone/DropzoneNeo";
import DropzoneNeoProps from "./dropzone-ui/components/dropzone/components/Dropzone/DropzoneNeoProps";
import FileItemNeo from "./dropzone-ui/components/file-item/components/FileItem/FileItemNeo";
import InputButtonNeo from "./dropzone-ui/components/input-button/InputButtonNeo";
import { DuiFile } from "./dropzone-ui/utils/dropzone-ui-types/DuiFile";
import {
  FileValidated,
  UPLOADSTATUS,
} from "./dropzone-ui/utils/file-validation/validation.types";
import "./FITester.scss";
const dropzoneProps: DropzoneNeoProps = {
  // color: "green",
  autoClean: true,
  uploadConfig: {
    url: "https://duiserver2.deelo.cloud/upload-my-file",
    method: "POST",
    uploadLabel: "file",
    headers: {
      auth: "bearer JVKUBVBYT&R%G/TYR%&%V/TYRC&UTVGYYCRVYTTg",
      //"my header": "my_header value",
    },
    cleanOnUpload: true,
    // autoUpload: true,
    preparingTime: 1500,
  },
};
const makeFileItem = (): FileValidated[] => {
  return [
    {
      ...makeSynthticFileValidate(createSyntheticFile()),
      ...{ uploadStatus: undefined, uploadMessage: undefined },
    },
    {
      ...makeSynthticFileValidate(createSyntheticFile()),
      ...{
        uploadStatus: undefined,
        uploadMessage: undefined,
        alwaysActive: true,
      },
    },
  ];
};
const InnerTester = () => {
  const [files, setFiles] = React.useState<FileValidated[] | DuiFile[]>([]);

  const handleDelete = (id: number | string | undefined) => {
    if (typeof id === "number") {
      setFiles(files.filter((x) => x.id !== id));
    }
  };

  const handleChange = (files: FileValidated[] | DuiFile[]) => {
    setFiles([
      ...files.map((f) => {
        return {
          ...f,
          //, valid:false
        };
      }),
    ]);
  };
  const handleCancel = (id: number) => {
    console.log("cancel", id);
    handleChange(
      files.map((f) => {
        if (f.id === id) {
          return { ...f, uploadStatus: undefined };
        } else {
          return f;
        }
      })
    );
  };

  const handleAdd = () => {
    setFiles([...files, ...makeFileItem()]);
  };
  const handleClean = () => {
    setFiles([...files.filter((x) => x.valid)]);
  };
  const [status, setStatus] = React.useState<UPLOADSTATUS>(
    UPLOADSTATUS.preparing
  );
  const handleStatus = () => {
    if (status === UPLOADSTATUS.preparing) {
      setStatus(UPLOADSTATUS.uploading);
    }
    if (status === UPLOADSTATUS.uploading) {
      setStatus(UPLOADSTATUS.success);
    }
    if (status === UPLOADSTATUS.success) {
      setStatus(UPLOADSTATUS.preparing);
    }
  };
  return (
    <div>
      <button onClick={handleAdd}>ADDD</button>
  
      {files.map((duiFile, index) => {
        return (
          <FileItemNeo
            {...duiFile}
            key={index}
            info
            onDelete={handleDelete}
            alwaysActive
            resultOnTooltip
            onCancel={handleCancel}
            onAbort={() => {}}
            preview
          />
        );
      })}
      {files.map((duiFile, index) => {
        return (
          <FileItemNeo
            {...duiFile}
            key={index * 5}
            info
            onDelete={handleDelete}
            alwaysActive
            resultOnTooltip
            onCancel={handleCancel}
            //onAbort={()=>{}}
            preview
          />
        );
      })}
      {files.map((duiFile, index) => {
        return (
          <FileItemNeo
            onDelete={handleDelete}
            {...duiFile}
            // id={duiFile.id as number +10}
            key={index * 15}
            info
            // alwaysActive
            resultOnTooltip
            xhr={undefined}
            preview
            imageUrl="https://user-images.githubusercontent.com/43678736/132112022-0ca409ae-cca2-43c8-be89-110376260a3f.png"
          />
        );
      })}
    </div>
  );
};

const FITesterNeoInput: React.FC<any> = (props: any) => {
  return (
    <React.Fragment>
      <InnerTester />{" "}
      <div className="main-container">
        <div className="left"></div>
        <div className="right"> </div>
      </div>
    </React.Fragment>
  );
};
export default FITesterNeoInput;
const duiStyles: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  maxHeight: undefined,
  flexWrap: "wrap",
  minHeight: "300px",
  // outline: "1px crimson dashed",
  alignItems: "center",
  justifyContent: "center",
  //overflow: "hidden",
};
