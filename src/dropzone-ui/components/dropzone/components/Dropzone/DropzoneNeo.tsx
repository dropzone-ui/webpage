import * as React from "react";
import {
  createDuiRipple,
  createRipple,
  //createRippleFromElement,
  createRippleFromElementV4,
  createRippleFromElementV2,
  createDuiRippleFromElement,
  createDuiRippleFromDiv,
  createDuiRippleFromDiv2,
} from "../../../../utils/ripple/ripple";
import useDropzoneNeoClassName from "../hooks/useDropzoneClassName";
import useDropzoneLayerClassName from "../hooks/useDropzoneLayerClassName";
import {
  handleClickUtil,
  handleDragUtil,
  handleDropUtil,
} from "../utils/dragDropHandles";
import DropzoneNeoProps from "./DropzoneNeoProps";
import "./DropzoneNeo.scss";
import { FileItemContainer } from "../../../file-item";
const DropzoneNeo: React.FC<DropzoneNeoProps> = (props: DropzoneNeoProps) => {
  const {
    children,
    color,
    backgroundColor,
    maxHeight,
    minHeight,
    header,
    footer,
    disableScroll,
    clickable,
    style,
    disableRipple,
    //max file size per file
    maxFileSize,
    //max amount of files
    maxFiles,
    //mimetypes accepted
    accept,
    //disable the ripple effect
    validation,
    onDragEnter,
    onDragLeave,
    className,
    colorOnDrag,
    //files
    onChange,
    value = [],
  } = props;
  //ref to handle ripple
  const duiRippleRefAbs = React.useRef<HTMLDivElement>(null);
  const duiRippleRefRel = React.useRef<HTMLDivElement>(null);
  //ref to the hidden input tag
  const inputRef = React.useRef<HTMLInputElement>(null);
  //state for drag operation
  const [isDragging, setIsDragging] = React.useState<boolean>(false);
  const classNameCreated: string = useDropzoneNeoClassName(
    color,
    backgroundColor,
    disableScroll ? undefined : maxHeight ? maxHeight : "245px",
    minHeight,
    header && footer ? 50 : !header && footer ? 23 : header && !footer ? 22 : 0,
    isDragging,
    clickable as boolean,
    disableRipple as boolean,
    className
  );
  const classNameLayer: string = useDropzoneLayerClassName(
    colorOnDrag,
    isDragging,
    !onDragEnter && !onDragLeave
  );
  // handles for click and drag-rop
  function handleClick<T extends HTMLDivElement>(
    evt: React.MouseEvent<T, MouseEvent>
  ): void {
    handleClickUtil(evt);
    //createDuiRipple(evt, color as string);
    //createDuiRippleFromDiv(duiRippleRef.current, color as string);
    createDuiRippleFromDiv2(
      duiRippleRefAbs.current,
      duiRippleRefRel.current,
      color as string
    );
  }
  const handleDragEnter: React.DragEventHandler<HTMLDivElement> = (
    evt: React.DragEvent<HTMLDivElement>
  ) => {
    handleDragUtil(evt);
    setIsDragging(true);
  };
  const handleDragLeave: React.DragEventHandler<HTMLDivElement> = (
    evt: React.DragEvent<HTMLDivElement>
  ) => {
    handleDragUtil(evt);
    setIsDragging(false);
  };
  //KAMUI
  const kamui: React.DragEventHandler<HTMLDivElement> = async (
    evt: React.DragEvent<HTMLDivElement>
  ): Promise<void> => {
    handleDropUtil(evt);
    //createDuiRippleFromElement(duiRippleRef.current, color as string);
    createDuiRippleFromDiv2(
      duiRippleRefAbs.current,
      duiRippleRefRel.current,
      color as string
    );
    setIsDragging(false);
  };

  return (
    <div
      className={classNameCreated}
      style={style}
      //ref={duiRippleRef}
      onClick={handleClick}
      onDragOver={handleDragEnter}
    >
      {!disableRipple && (
        <div ref={duiRippleRefAbs} className="dropzone-ui-base-ripple-absolute">
          <div
            ref={duiRippleRefRel}
            className="dropzone-ui-base-ripple-relative"
          ></div>
        </div>
      )}
      {children}
      <div
        className={classNameLayer}
        onDragLeave={handleDragLeave}
        onDrop={kamui}
      ></div>
    </div>
  );
};
export default DropzoneNeo;
