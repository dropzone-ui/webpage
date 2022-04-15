import * as React from "react";
import { Clear } from "../../../../../icons";
import { FileItemLocalizerSelector } from "../../../../../localization";
import {
  Localization,
  LocalLabels,
} from "../../../../../localization/localization";
import { UPLOADSTATUS } from "../../../../../utils";
import { DynamicLoader, PreparingLoader } from "../../../../loader";
import DefaultLoaderNeo from "../../../../loader/DefaultLoader/DefaultLoaderNeo";
import FileItemStatus from "../../FileItemStatus/FileItemStatus";
import "./FileItemLoader.scss";
interface FileItemLoaderProps {
  height?: number;
  width?: number;
  uploadStatus?: UPLOADSTATUS;
  /**
   * language to be used for now
   * only English, Russian, Chinesse, French, protuguese and Spanish is supported
   */
  localization?: Localization;
  /**
   * the current percentage upload progress
   */
  progress?: number;
  /**
   * abort event
   */
  onAbort?: Function;
  /**
   * cancel event
   */
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
  const FileItemStatusLocalizer: LocalLabels = FileItemLocalizerSelector(
    localization
  ).status as LocalLabels;
  // console.log("Loader", progress);
  const circleRef: React.RefObject<SVGCircleElement> =
    React.useRef<SVGCircleElement>(null);

  function setProgress(
    percent: number,
    myCircle: SVGCircleElement,
    circumference: number
  ) {
    myCircle.style.strokeDashoffset = `${circumference * (1 - percent / 100)}`;
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
  if (!uploadStatus) {
    return <></>;
  }
  return (
    <React.Fragment>
      {uploadStatus === UPLOADSTATUS.preparing && (
        <React.Fragment>
          <div
            className="dui-main-loader-container clickable"
            onClick={handleCancel}
          >
            {onCancel && (
              <div className="dui-abort-icon-container">
                <Clear
                  color="rgba(255,255,255,0.70)"
                  size={60}
                  colorFill="transparent"
                />
              </div>
            )}

            <div className="dui-dynamic-preparing-loader-container">
              <PreparingLoader size={width || 60} x={50} y={50} radius={46} />
            </div>
          </div>
        </React.Fragment>
      )}

      {uploadStatus === UPLOADSTATUS.uploading && (
        <React.Fragment>
          {typeof progress === "undefined" ? (
            <DefaultLoaderNeo
              label={FileItemStatusLocalizer.uploading as string}
            />
          ) : (
            <div
              className={`dui-main-loader-container${
                onAbort ? " clickable" : ""
              }`}
              onClick={handleAbort}
            >
              <div className="dui-abort-icon-container">
                {onAbort && (
                  <Clear
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
      )}
    </React.Fragment>
  );
};
export default FileItemLoader;
