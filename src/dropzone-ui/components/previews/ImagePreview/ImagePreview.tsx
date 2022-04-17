import * as React from "react";
import { readAsDataURL } from "../../../utils/file-readers/readers";
import {
  ImagePreviewDefaultProps,
  ImagePreviewProps,
} from "./ImagePreviewProps";
import "./ImagePreview.scss";
import { mergeProps } from "@dropzone-ui/core";
const ImagePreview: React.FC<ImagePreviewProps> = (
  props: ImagePreviewProps
) => {
  const { src, alt, className, style, width, height } = mergeProps(
    props,
    ImagePreviewDefaultProps
  );
 // console.table({ src, alt, className, style, width, height });
  const [source, setSource] = React.useState<string | undefined>(undefined);
  const getSource = async (src: File): Promise<void> => {
    const newImageSrc = await readAsDataURL(src);
    setSource(newImageSrc);
  };
  React.useEffect(() => {
    //if not undefined
    if (!src) {
      return;
    }
    console.log("ImagePreview There is source :D");

    if (typeof src === "string") {
      //if a url string is given, assign it directly
      setSource(src);
    } else {
      //if a File object is given, check if is a supported format and read it
      const headerMime = src.type ? src.type.split("/")[0] : "octet";

      if (headerMime === "image") {
        //set the video source and create the uri string if is a supported video format
        getSource(src);
      }
    }
  }, [src]);

  return (
    <React.Fragment>
      {src && source && (
        <img
          style={style || {}}
          onClick={(evt) => {
            evt.preventDefault();
          }}
          width={width}
          height={height}
          src={source}
          alt={alt}
          className={className}
        />
      )}
    </React.Fragment>
  );
};
export default ImagePreview;
