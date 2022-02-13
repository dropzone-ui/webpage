import * as React from "react";
import { Localization } from "../../../../../localization/localization";
import { UPLOADSTATUS } from "../../../../dropzone/components/utils/validation.utils";
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
}
const FileItemLoader: React.FC<FileItemLoaderProps> = (
  props: FileItemLoaderProps
) => {
  const { uploadStatus, localization, progress, onAbort, width, height } =
    props;
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
      let circumference: number = 2 * Math.PI * myCircle.r.baseVal.value;
      myCircle.style.strokeDasharray = `${circumference} 1000`;
      setProgress(progress, myCircle, circumference);
    }
  }, [progress]);

  return (
    <React.Fragment>
      <div className="dui-loader-container">
        {progress || onAbort ? (
          <div className="loader-container">
            <svg
              className="svg_circle_loader"
              width={`${width || 50}px`}
              height={`${height || 50}px`}
            >
              <circle
                cx="30"
                cy="30"
                r="28"
                className="circle_loader"
                id="circle"
                ref={circleRef}
              ></circle>

              {!onAbort && (
                <text x="30" y="35" id="pct">
                  {`${progress} %`}
                </text>
              )}
            </svg>
            {onAbort && (
              <svg
                className="x-button-abort"
                xmlns="http://www.w3.org/2000/svg"
                height="25px"
                viewBox="0 0 24 24"
                width="25px"
                fill="#ffffff"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
              </svg>
            )}
          </div>
        ) : (
          <FileItemStatus
            uploadStatus={uploadStatus}
            localization={localization as Localization}
            //progress={progress}
            //onAbort={onAbort}
          />
        )}
      </div>
    </React.Fragment>
  );
};
export default FileItemLoader;
