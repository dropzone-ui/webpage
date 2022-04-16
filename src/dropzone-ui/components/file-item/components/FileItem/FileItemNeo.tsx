import React, { FC, Fragment, useEffect, useRef, useState } from "react";

import { FileItemProps, FileItemPropsDefault } from "./FileItemProps";
import "./FileItemNeo.scss";
import { mergeProps } from "@dropzone-ui/core";
import {
  fileSizeFormater,
  getURLFileIco,
  readAsDataURL as readImagePromise,
  resizeImage,
  shrinkWord,
} from "../../../../utils";

import FileItemFullInfoLayer from "../FileItemFullInfoLayer/FileItemFullInfoLayer";
import FileItemImage from "../FileItemImage/FileItemImage";
import Tooltip from "../../../tooltip/components/Tooltip";
import FileItemMainLayerNeo from "../FileItemMainLayer/MainLayer/FileItemMainLayerNeo";
import useFileItemNeoClassName from "../../hooks/useFileItemNeoClassName";

const FileItemNeo: FC<FileItemProps> | undefined = (props: FileItemProps) => {
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
    onCancel,
  } = mergeProps(props, FileItemPropsDefault);

  const dui_anchor_ref = useRef<HTMLAnchorElement>(null);
  //actionOnHover
  const [hovering, setHOvering] = useState<boolean>(false);
  const handleOnHoverEnter = () => {
    setHOvering(true);
  };
  const handleOnHoverLeave = () => {
    setHOvering(false);
  };

  //size
  const sizeFormatted: string = file ? fileSizeFormater(file.size) : "0 KB";

  const [isImage, setIsImage] = useState<boolean>(false);
  const [isVideo, setIsVideo] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");
  const [imageSource, setImageSource] = useState<string | undefined>(undefined);
  //alwaysActive
  const [showInfo, setShowInfo] = useState<boolean>(false);
  //upload progress
  const [localProgress, setLocalProgress] = useState<number | undefined>(1);
  useEffect(() => {
    //if (progress) {
    setLocalProgress(!progress || progress === 0 ? 1 : progress);
    //}
  }, [progress]);

  useEffect(() => {
    init(file, valid, preview || false, imageUrl, xhr);

    return () => {
      setImageSource(undefined);
      setIsImage(false);
      setIsVideo(false);
    };
    // eslint-disable-next-line
  }, [file, valid, preview, imageUrl, xhr, errors, localProgress]);

  const init = async (
    file: File | undefined,
    valid: boolean | undefined | null,
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
      if (
        preview &&
        (valid || typeof valid === "undefined" || valid === null) &&
        headerMime === "image"
      ) {
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
        if (!progress) {
          handleProgress((event.loaded / event.total) * 100);
        }
      };
    }
    //if (!localProgress) {
    //handleProgress(1);
    //}
  };
  const handleProgress = (currentProgress: number): void => {
    setLocalProgress(currentProgress);
  };
  const handleDelete = (): void => {
    onDelete?.(id);
  };
  const handleOpenInfo = () => {
    setShowInfo(true);
  };
  const handleCloseInfo = () => {
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
    } else if (typeof downloadUrl == "string") {
      innerDownload(downloadUrl);
    }
  };
  const handleAbort = (): void => {
    //trigger abort event
    xhr?.abort();
    // handle externally the abort event
    onAbort?.(id);
  };
  const handleCancel = (): void => {
    // handle externally the cancel event
    onCancel?.(id);
  };
  const classNameCreated = useFileItemNeoClassName(
    resultOnTooltip as boolean,
    elevation
  );
  if (classNameCreated && file && typeof file.name == "string") {
    return (
      <div
        className={classNameCreated}
        style={style}
        onClick={handleClick}
        onMouseEnter={handleOnHoverEnter}
        onMouseLeave={handleOnHoverLeave}
      >
        <FileItemImage
          imageSource={imageSource}
          url={url}
          fileName={file.name}
        />

        {!showInfo && (
          <FileItemMainLayerNeo
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
            valid={valid}
            isImage={isImage}
            sizeFormatted={sizeFormatted}
            uploadStatus={uploadStatus}
            localization={localization}
            hovering={alwaysActive || hovering}
            progress={localProgress}
            onAbort={onAbort ? handleAbort : undefined}
            onCancel={onCancel ? handleCancel : undefined}
          />
        )}
        <FileItemFullInfoLayer
          showInfo={showInfo}
          errors={errors}
          fileName={file.name}
          fileSize={fileSizeFormater(file.size)}
          fileType={file.type}
          valid={valid}
          onClose={handleCloseInfo}
          uploadStatus={uploadStatus}
          uploadMessage={uploadMessage}
          localization={localization}
          resultOnTooltip={resultOnTooltip}
        />

        {!onlyImage && (
          <div className="file-item-name">{shrinkWord(file.name)}</div>
        )}
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
          >
            download_file
          </a>
        )}
      </div>
    );
  } else return <Fragment></Fragment>;
};
export default FileItemNeo;
