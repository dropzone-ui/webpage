import * as React from "react";
import { FileItem, UPLOADSTATUS } from "../../dropzone-ui";
import { FileItemProps } from "../../dropzone-ui/components/file-item/components/FileItem/FileItemProps";
import MainLayerBody from "../../dropzone-ui/components/file-item/components/FileItemMainLayer/MainLayerBody/MainLayerBody";
import MainLayerFooter from "../../dropzone-ui/components/file-item/components/FileItemMainLayer/MainLayerFooter/MainLayerFooter";

const DuiSuperFileItem: React.FC<any> = ({ fileObject }) => {
  ////// STATES FOR FLOW
  const [fileItemPropsState, setFileItemPropsState] =
    React.useState<FileItemProps>({
      file: fileObject,
      id: 1024,
      progress: 0,
    });

  React.useEffect(() => {
    console.log("PROPS", fileItemPropsState);
  }, [fileItemPropsState]);
  const setAlwaysActive = () => {
    setFileItemPropsState({
      ...fileItemPropsState,
      alwaysActive: !fileItemPropsState.alwaysActive,
    });
  };
  const setOnDelete = () => {
    setFileItemPropsState({
      ...fileItemPropsState,
      onDelete: fileItemPropsState.onDelete ? undefined : () => {},
    });
  };
  const setOnSee = () => {
    setFileItemPropsState({
      ...fileItemPropsState,
      onSee: fileItemPropsState.onSee ? undefined : () => {},
    });
  };
  const setErrors = () => {
    setFileItemPropsState({
      ...fileItemPropsState,
      errors: fileItemPropsState.errors
        ? undefined
        : ["Primer error", " segundo error dela rchivo"],
    });
  };
  const setPreview = () => {
    setFileItemPropsState({
      ...fileItemPropsState,
      preview: !fileItemPropsState.preview,
    });
  };
  const setValid = () => {
    let nextValid: FileItemProps["valid"];
    if (typeof fileItemPropsState.valid === "undefined") {
      nextValid = false;
    } else {
      if (fileItemPropsState.valid) {
        nextValid = undefined;
      } else {
        nextValid = true;
      }
    }
    setFileItemPropsState({
      ...fileItemPropsState,
      valid: nextValid,
    });
  };
  const setInfo = () => {
    setFileItemPropsState({
      ...fileItemPropsState,
      info: !fileItemPropsState.info,
    });
  };
  const setOnlyImage = () => {
    setFileItemPropsState({
      ...fileItemPropsState,
      onlyImage: !fileItemPropsState.onlyImage,
    });
  };
  const setImageUrl = () => {
    setFileItemPropsState({
      ...fileItemPropsState,
      imageUrl: fileItemPropsState.imageUrl
        ? undefined
        : "https://depor.com/resizer/BbDv4ZUAXoXb8T5xE_zjEmnHuUE=/980x0/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/7PQKSZTCEFFTJIJJRC4WN2BCLI.jpg",
    });
  };
  const setUploadStatus = () => {
    let nextStatus: FileItemProps["uploadStatus"];
    if (!fileItemPropsState.uploadStatus) {
      nextStatus = UPLOADSTATUS.preparing;
    } else {
      switch (fileItemPropsState.uploadStatus) {
        case UPLOADSTATUS.preparing:
          nextStatus = UPLOADSTATUS.uploading;
          break;
        case UPLOADSTATUS.uploading:
          nextStatus = UPLOADSTATUS.success;
          break;
        case UPLOADSTATUS.success:
          nextStatus = UPLOADSTATUS.error;
          break;
        case UPLOADSTATUS.error:
          nextStatus = UPLOADSTATUS.aborted;
          break;

        default:
          nextStatus = undefined;
          break;
      }
    }
    setFileItemPropsState({ ...fileItemPropsState, uploadStatus: nextStatus });
  };
  const setResultTooltip = () => {
    setFileItemPropsState({
      ...fileItemPropsState,
      resultOnTooltip: !fileItemPropsState.resultOnTooltip,
    });
  };
  const setProgress = () => {
    let currentProgress = fileItemPropsState.progress;
    console.log("currentProgress", currentProgress);
    let newProgress = undefined;
    if (typeof currentProgress !== "undefined") {
      switch (currentProgress) {
        case 100:
          newProgress = undefined;
          break;
        case 0:
          newProgress = 7;
          break;
        case 7:
          newProgress = 28;
          break;
        case 28:
          newProgress = 48;
          break;
        case 48:
          newProgress = 68;
          break;
        case 68:
          newProgress = 79;
          break;
        case 79:
          newProgress = 85;
          break;
        default:
          newProgress = 100;
          break;
      }
    } else {
      newProgress = 0;
    }
    console.log("newProgress", newProgress);

    setFileItemPropsState({
      ...fileItemPropsState,
      progress: newProgress,
    });
  };
  const setOnAbort = () => {
    setFileItemPropsState({
      ...fileItemPropsState,
      onAbort: fileItemPropsState.onAbort ? undefined : handleAbort,
    });
  };
  const handleCancel = () => {
    setFileItemPropsState({ ...fileItemPropsState, uploadStatus: undefined });
  };
  const handleAbort = () => {
    setFileItemPropsState({
      ...fileItemPropsState,
      uploadStatus: UPLOADSTATUS.aborted,
      uploadMessage:"You aborted the upload"
    });
  };
  return (
    <React.Fragment>
      <h1>FileItem</h1>
      {/* <button onClick={setAlwaysActive}>Alwayas active</button> */}
      <button onClick={setResultTooltip}>tooltip</button>
      <button onClick={setOnDelete}>delete</button>
      <button onClick={setInfo}>Info</button>
      <button onClick={setOnSee}>see</button>
      <button onClick={setValid}>valid</button>
      <button onClick={setErrors}>errors</button>
      <button onClick={setPreview}>preview</button>
      <button onClick={setOnlyImage}>onlyImage</button>
      <button onClick={setImageUrl}>imageUrl</button>
      <div>
        <h3>Upload</h3>
        <button onClick={setUploadStatus}>upload status</button>
        <button onClick={setProgress}>progress</button>
        <button onClick={setOnAbort}>onAbort</button>
      </div>

      <FileItem
        {...fileItemPropsState}
        onCancel={handleCancel}
        alwaysActive={false}

        //onAbort={handleAbort}
      />
      <FileItem
        {...fileItemPropsState}
        onCancel={handleCancel}
        alwaysActive={true}
        //onAbort={handleAbort}
      />
      <div
        style={{
          padding: "15px",
          display: "flex",
          flexDirection: "row",
          width: "calc(100% - 20px)",
          outline: "1px solid green",
        }}
      >
        <div
          style={{
            backgroundColor: "wheat",
            border: "2px crimson dashed",
            padding: "10px",
            margin: "10px",
            flexGrow: 1,
            minHeight: "80px",
          }}
        >
          <MainLayerBody
            {...fileItemPropsState}
            showInfo={false}
            //progress={20}
          />
        </div>
        <div
          style={{
            backgroundColor: "wheat",
            border: "2px crimson dashed",
            padding: "10px",
            margin: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 1,
            minHeight: "80px",
          }}
        >
          <MainLayerFooter {...fileItemPropsState} showInfo={false} />
        </div>
      </div>
    </React.Fragment>
  );
};
export default DuiSuperFileItem;
