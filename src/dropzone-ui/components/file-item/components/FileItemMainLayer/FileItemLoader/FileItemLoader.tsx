import * as React from "react";
import { Clear } from "../../../../../icons";
import { Localization } from "../../../../../localization/localization";
import { UPLOADSTATUS } from "../../../../../utils";
import { DynamicLoader, PreparingLoader } from "../../../../loader";
import FileItemStatus from "../../FileItemStatus/FileItemStatus";
import "./FileItemLoader.scss";
interface FileItemLoaderProps {
  height?: number;
  width?: number;
  uploadStatus?: UPLOADSTATUS;
  /**
   * language to be used
   * for now
   * only English and Spanish is supported
   */
  localization?: Localization;

  /**
   * the current percentage upload progress
   *
   */
  progress?: number;
  /**
   * abort event
   */
  onAbort?: Function;
  onCancel?: Function;
}
const FileItemLoader: React.FC<FileItemLoaderProps> = (
  props: FileItemLoaderProps
) => {
  const {
    uploadStatus,
    localization,
    progress,
    onAbort,
    width,
    //height,
    onCancel,
  } = props;
  // console.log("Loader", progress);
  const circleRef: React.RefObject<SVGCircleElement> =
    React.useRef<SVGCircleElement>(null);

  function setProgress(
    percent: number,
    myCircle: SVGCircleElement,
    circumference: number
  ) {
    myCircle.style.strokeDashoffset = `${circumference * (1 - percent / 100)}`;
    /* let pct = document.getElementById("pct");
    pct.innerHTML = percent.toFixed(0) + "%"; */
  }

  React.useEffect(() => {
    const myCircle: SVGCircleElement | null = circleRef.current;
    if (myCircle && progress) {
      console.log("CIRCLE", progress, progress === 0 ? 1 : progress);
      let circumference: number = 2 * Math.PI * myCircle.r.baseVal.value;
      myCircle.style.strokeDasharray = `${circumference} 1000`;
      setProgress(progress === 0 ? 1 : progress, myCircle, circumference);
    }
  }, [progress]);
  const handleAbort = () => {
    onAbort?.();
  };
  const handleCancel = () => {
    onCancel?.();
  };
  return (
    <React.Fragment>
      {progress !== undefined && progress >= 0 ? (
        <React.Fragment>
          {uploadStatus === UPLOADSTATUS.preparing && (
            <div
              className="dui-main-loader-container clickable"
              onClick={handleCancel}
            >
              <div className="dui-abort-icon-container">
                <Clear
                  //className="dui-file-item-icon"
                  color="rgba(255,255,255,0.70)"
                  size={60}
                  colorFill="transparent"
                />
              </div>
              <div className="dui-dynamic-preparing-loader-container">
                <PreparingLoader size={width || 60} x={50} y={50} radius={46} />
              </div>
            </div>
          )}

          {uploadStatus === UPLOADSTATUS.uploading && (
            <div
              className={`dui-main-loader-container${
                onAbort ? " clickable" : ""
              }`}
              onClick={handleAbort}
            >
              <div className="dui-abort-icon-container">
                {onAbort && (
                  <Clear
                    //className="dui-file-item-icon"
                    color="rgba(255,255,255,0.70)"
                    size={60}
                    colorFill="transparent"
                  />
                )}
              </div>
              <div className="dui-dynamic-preparing-loader-container">
                <DynamicLoader
                  size={width || 60}
                  x={30}
                  y={30}
                  radius={27}
                  percentage={progress}
                  width={6}
                  hidePerncentage={onAbort !== undefined}
                />
              </div>
            </div>
          )}
        </React.Fragment>
      ) : (
        <FileItemStatus
          uploadStatus={uploadStatus}
          localization={localization as Localization}
          //progress={progress}
          //onAbort={onAbort}
        />
      )}
    </React.Fragment>
  );
};
export default FileItemLoader;
