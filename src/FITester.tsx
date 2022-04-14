import * as React from "react";
import {
  createSyntheticFile,
  FileItem,
  makeSynthticFileValidate,
} from "./dropzone-ui";
import DropzoneNeo from "./dropzone-ui/components/dropzone/components/Dropzone/DropzoneNeo";
import DropzoneNeoProps from "./dropzone-ui/components/dropzone/components/Dropzone/DropzoneNeoProps";
import { DuiFileType } from "./dropzone-ui/utils/dropzone-ui-types/DuiFile";
//import DropzoneUI3 from "./dropzone-ui/components/dropzone/components/Dropzone/DropzoneUI3";
import {
  // FileItemObject,
  FileValidated,
  //UPLOADSTATUS,
} from "./dropzone-ui/utils/file-validation/validation.types";
import "./FITester.scss";
const dropzoneProps: DropzoneNeoProps = {
  color: "crimson",
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
    autoUpload: true,
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
  const [files, setFiles] = React.useState<FileValidated[] | DuiFileType[]>([]);

  const handleDelete = (id: number | string | undefined) => {
    if (typeof id === "number") {
      setFiles(files.filter((x) => x.id !== id));
    }
  };

  const handleChange = (files: FileValidated[] | DuiFileType[]) => {
    setFiles(files);
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
  return (
    <>
      <button onClick={handleAdd}>Add</button>
      <DropzoneNeo
        onClean={handleClean}
        onChange={handleChange}
        value={files}
        //style={duiStyles}
        {...dropzoneProps}
      >
        {files.map((duiFile, index) => {
          return (
            <FileItem
              {...duiFile}
              key={index}
              info
              onDelete={handleDelete}
              alwaysActive
              resultOnTooltip
              onCancel={handleCancel}
            />
          );
        })}
        {files.map((duiFile, index) => {
          return (
            <FileItem
              {...duiFile}
              key={index * 5}
              info
              alwaysActive
              resultOnTooltip
            />
          );
        })}
        {files.map((duiFile, index) => {
          return (
            <FileItem
              {...duiFile}
              key={index * 10}
              info
              onDelete={handleDelete}
              resultOnTooltip
              onCancel={handleCancel}
              onAbort={() => {}}
            />
          );
        })}
      </DropzoneNeo>
    </>
  );
};

const FITester: React.FC<any> = (props: any) => {
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
export default FITester;
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
