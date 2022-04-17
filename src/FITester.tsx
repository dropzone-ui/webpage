import * as React from "react";
import {
  createSyntheticFile,
  FileItem,
  makeSynthticFileValidate,
} from "./dropzone-ui";
import DropzoneNeo from "./dropzone-ui/components/dropzone/components/Dropzone/DropzoneNeo";
import DropzoneNeoProps from "./dropzone-ui/components/dropzone/components/Dropzone/DropzoneNeoProps";
import FileItemMainLayerNeo from "./dropzone-ui/components/file-item/components/FileItemMainLayer/MainLayer/FileItemMainLayerNeo";
import { DuiFile } from "./dropzone-ui/utils/dropzone-ui-types/DuiFile";
import {
  FileValidated,
  UPLOADSTATUS,
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
  const [duiFiles, setDuiFiles] = React.useState<FileValidated[] | DuiFile[]>([]);

  const handleDelete = (id: number | string | undefined) => {
    if (typeof id === "number") {
      setDuiFiles(duiFiles.filter((x) => x.id !== id));
    }
  };

  const handleChange = (duiFiles: FileValidated[] | DuiFile[]) => {
    setDuiFiles(duiFiles);
  };
  const handleCancel = (id: number) => {
    console.log("cancel", id);
    handleChange(
      duiFiles.map((duiFile) => {
        if (duiFile.id === id) {
          return { ...duiFile, uploadStatus: undefined };
        } else {
          return duiFile;
        }
      })
    );
  };

  const handleAdd = () => {
    setDuiFiles([...duiFiles, ...makeFileItem()]);
  };
  const handleClean = () => {
    setDuiFiles([...duiFiles.filter((x) => x.valid)]);
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
      <DropzoneNeo
        onClean={handleClean}
        onChange={handleChange}
        value={duiFiles}
        //style={duiStyles}
        {...dropzoneProps}
      >
        {duiFiles.map((duiFile, index) => {
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
        
      </DropzoneNeo>
    </div>
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
