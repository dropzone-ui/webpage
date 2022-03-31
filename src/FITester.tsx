import * as React from "react";
import {
  createSyntheticFile,
  FileItem,
  makeSynthticFileValidate,
} from "./dropzone-ui";
import DropzoneUI3 from "./dropzone-ui/components/dropzone/components/Dropzone/DropzoneUI3";
import {
  FileItemObject,
  FileValidated,
  UPLOADSTATUS,
} from "./dropzone-ui/utils/file-validation/validation.types";
import "./FITester.scss";
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

const FITester: React.FC<any> = (props: any) => {
  const [files, setFiles] = React.useState<FileValidated[]>([]);
  const [files2, setFiles2] = React.useState<FileValidated[]>([]);
  React.useEffect(() => {
    setTimeout(() => {
      setFiles(makeFileItem());setFiles2([...makeFileItem(),...makeFileItem()]);
    }, 1500);
  }, []);
  const handleDelete = (id: number | string | undefined) => {
    if (typeof id === "number") {
      setFiles(files.filter((x) => x.id !== id));
    }
  };
  const handleChange2 = (files: FileValidated[]) => {
    console.log(
      "handleChange outside => 2",
      files2.map((x) => x.uploadStatus)
    );
    setFiles2(files);
  };
  const handleChange = (files: FileValidated[]) => {
    /* console.log(
      "handleChange outside =>",
      files.map((x) => x.uploadStatus)
    ); */
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
  const handleCancel2 = (id: number) => {
    console.log("cancel", id);
    handleChange2(
      files2.map((f) => {
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
  return (
    <React.Fragment>
      <button onClick={handleAdd}>Add</button>
      <DropzoneUI3
        onChange={handleChange}
        value={files}
        style={{
          display: "flex",
          flexDirection: "row",
          maxHeight: undefined,
          flexWrap: "wrap",
          minHeight: "300px",
          outline: "1px crimson dashed",
          alignItems: "center",
          justifyContent: "center",
          overflow:"hidden"
        }}
      >
        {files.map((f) => {
          return (
            <FileItem
              {...f}
              id={f.id}
              info
              onDelete={handleDelete}
              progress={40}
              //alwaysActive
              resultOnTooltip
              onCancel={handleCancel}
              //uploadStatus={UPLOADSTATUS.uploading}
            />
          );
        })}
      </DropzoneUI3>
      <DropzoneUI3
        onChange={handleChange2}
        value={files2}
        style={{
          display: "flex",
          flexDirection: "row",
          maxHeight: undefined,
          flexWrap: "wrap",
          minHeight: "300px",
          outline: "1px teal dashed",
          alignItems: "center",
          justifyContent: "center",
          overflow:"hidden"
        }}
      >
        {files2.map((f) => {
          return (
            <FileItem
              {...f}
              id={f.id}
              info
              onDelete={handleDelete}
              progress={40}
              //alwaysActive
              resultOnTooltip
              onCancel={handleCancel2}
              //uploadStatus={UPLOADSTATUS.uploading}
            />
          );
        })}
      </DropzoneUI3>
      <div className="main-container">
        <div className="left"></div>
        <div className="right"> </div>
      </div>
    </React.Fragment>
  );
};
export default FITester;
