import React, {
  FC,
  Fragment,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";

import { FileItemProps, FileItemPropsDefault } from "./FileItemProps";
import "./FileItem.scss";
import { Paper } from "../../../paper";
import { mergeProps } from "@dropzone-ui/core";
import {
  fileSizeFormater,
  getURLFileIco,
  readImagePromise,
  resizeImage,
  shrinkWord,
} from "../../utils";

import FileItemFullInfoLayer from "../FileItemFullInfoLayer/FileItemFullInfoLayer";
import FileItemImage from "../FileItemImage/FileItemImage";
import FileItemMainLayer from "../FileItemMainLayer/FileItemMainLayer";
import Tooltip from "../../../tooltip/components/Tooltip";

const FileItem: FC<FileItemProps> = (props: FileItemProps) => {
  const {
    file,
    onDelete,
    onSee,
    onWatch,
    style,
    preview,
    onlyImage,
    info,
    id,
    valid,
    uploadStatus,
    uploadMessage,
    hd,
    localization,
    errors,
    imageUrl,
    elevation,
    alwaysActive,
    resultOnTooltip,
    downloadUrl,
    onDownload,
    progress,
    onAbort,
    xhr,
  } = mergeProps(props, FileItemPropsDefault);
  const dui_anchor_ref = useRef<HTMLAnchorElement>(null);
  //actionOnHover
  const [hovering, setHOvering] = useState<boolean>(false);
  const handleOnHoverEnter = () => {
    //if (!alwaysActive) {
    setHOvering(true);
    //}
  };
  const handleOnHoverLeave = () => {
    //if (!alwaysActive) {
    setHOvering(false);
    //}
  };
  /*   useEffect(() => {
    setHOvering(alwaysActive || false);
  }, [alwaysActive]); */

  //size
  const sizeFormatted: string = file ? fileSizeFormater(file.size) : "0 KB";

  const [isImage, setIsImage] = useState<boolean>(false);
  const [isVideo, setIsVideo] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");
  const [imageSource, setImageSource] = useState<string | undefined>(undefined);
  //alwaysActive
  const [showInfo, setShowInfo] = useState<boolean>(false);
  //upload progress
  const [localProgress, setLocalProgress] = useState<number>(0);
  useEffect(() => {
    if (progress) {
      setLocalProgress(progress);
    }
  }, [progress]);

  useEffect(() => {
    init(file, valid || false, preview || false, imageUrl, xhr);

    return () => {
      setImageSource(undefined);
      setIsImage(false);
      setIsVideo(false);
    };
  }, [file, valid, preview, imageUrl, xhr]);

  const init = async (
    file: File | undefined,
    valid: boolean,
    preview: boolean,
    imageUrl: string | undefined,
    xhr?: XMLHttpRequest
  ) => {
    //////////////////////////////
    if (!file) return;
    const { url } = getURLFileIco(file as File);

    setUrl(url);

    if (imageUrl) {
      setIsImage(true);
      setImageSource(imageUrl);
      return;
    } else {
      const headerMime = file.type ? file.type.split("/")[0] : "octet";
      const tailMime = file.type ? file.type.split("/")[1] : "octet";
      setIsImage(headerMime === "image");
      setIsVideo(
        headerMime === "video" && ["mp4", "ogg", "webm"].includes(tailMime)
      );
      if (preview && valid && headerMime === "image") {
        const response = await readImagePromise(file);
        if (response) {
          const cutt = await resizeImage(response);

          setImageSource(cutt as string);
        } else {
          setImageSource(undefined);
        }
      }
    }
    /////////////// UPLOAD OBJECT ///////////////
    if (xhr && xhr !== null) {
      xhr.upload.onprogress = (event) => {
        handleProgress((event.loaded / event.total) * 100);
      };
     
     
    }
    
  };
  const handleProgress = (currentProgress: number): void => {
    setLocalProgress(currentProgress);
  };
  const handleDelete = (): void => {
    if (onDelete) {
      onDelete(id);
    }
  };
  const handleOpenInfo = () => {
    setShowInfo(true);
  };
  const handleCloseInfo = () => {
    setShowInfo(true);

    setShowInfo(false);
  };
  const handleOpenVideo = async () => {
    if (file) {
      onWatch?.(file);
    }
  };
  const handleOpenImage = async () => {
    if (imageSource && file) {
      if (hd) {
        const response = await readImagePromise(file);
        onSee?.(response || "");
      } else {
        onSee?.(imageSource);
      }
    }
  };
  function handleClick<T extends HTMLDivElement>(
    e: React.MouseEvent<T, MouseEvent>
  ): void {
    //avoid children to trigger onClick ripple from parent
    e.stopPropagation();
  }
  const innerDownload = (url: string | undefined) => {
    const anchorElement = dui_anchor_ref.current;
    if (anchorElement) {
      anchorElement.click();
    }
  };
  const handleDownload = () => {
    if (onDownload) {
      onDownload?.(id, downloadUrl);
    } else if (downloadUrl && typeof downloadUrl == "string") {
      innerDownload(downloadUrl);
    }
  };
  const handleAbort = (): void => {
    //trigger abort event
    xhr?.abort();
    // handle externelly the abort event
    onAbort?.(id);
  };
  if (file && typeof file.name == "string") {
    return (
      <div
        className={`dz-ui-file-item-container${
          resultOnTooltip ? " dz-ui-tooltip" : ""
        }`}
        onClick={handleClick}
        onMouseEnter={handleOnHoverEnter}
        onMouseLeave={handleOnHoverLeave}
      >
        <div className={`file-item-full-container-container`} style={style}>
          <Paper
            shadow={elevation}
            className={`file-item-icon-container ${showInfo ? " hide" : ""}`}
          >
            <FileItemImage
              imageSource={imageSource}
              url={url}
              fileName={file.name}
            />
            <FileItemMainLayer
              showInfo={showInfo}
              //fileNamePosition={fileName}
              fileName={file.name}
              onDelete={onDelete ? handleDelete : undefined}
              onOpenImage={onSee && preview ? handleOpenImage : undefined}
              onOpenVideo={onWatch && preview ? handleOpenVideo : undefined}
              onDownloadFile={
                onDownload || downloadUrl ? handleDownload : undefined
              }
              isVideo={isVideo}
              onOpenInfo={handleOpenInfo}
              info={info || false}
              valid={valid || false}
              isImage={isImage}
              sizeFormatted={sizeFormatted}
              //fileNamePosition={undefined}
              uploadStatus={uploadStatus}
              localization={localization}
              onlyImage={onlyImage}
              hovering={alwaysActive || hovering}
              progress={localProgress}
              onAbort={onAbort ? handleAbort : undefined}
            />
            <FileItemFullInfoLayer
              showInfo={showInfo}
              errors={errors}
              fileName={file.name}
              fileSize={fileSizeFormater(file.size)}
              fileType={file.type}
              valid={valid || false}
              onClose={handleCloseInfo}
              uploadStatus={uploadStatus}
              uploadMessage={uploadMessage}
              localization={localization}
              resultOnTooltip={resultOnTooltip}
            />
          </Paper>

          {!onlyImage && (
            <div className="file-item-name">{shrinkWord(file.name)}</div>
          )}
        </div>
        {resultOnTooltip && (
          <Tooltip
            //open={resultOnTooltip && hovering}
            open={true}
            uploadStatus={uploadStatus}
            valid={valid}
            errors={errors}
            uploadMessage={uploadMessage}
          ></Tooltip>
        )}
        {downloadUrl && (
          <a
            ref={dui_anchor_ref}
            href={downloadUrl}
            download={file.name}
            style={{ display: "none" }}
          />
        )}
      </div>
    );
  } else return <Fragment></Fragment>;
};
export default FileItem;
