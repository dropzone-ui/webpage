import * as React from "react";
import { DropzoneProps, DropzonePropsDefault } from "./DropzoneProps";
import "./Dropzone.scss";
import { mergeProps } from "../../../../base";
import { LocalLabels } from "../../../../localization/localization";
import {
  DropzoneLocalizerSelector,
  ValidateErrorLocalizerSelector,
} from "../../../../localization";
const Dropzone: React.FC<DropzoneProps> = (props: DropzoneProps) => {
  const {
    onDrop,
    children,
    onReset,
    color,
    style,
    backgroundColor,
    onClick,
    validator,
    maxFileSize,
    maxFiles,
    accept,
    disableRipple,
    clickable,
    onChangeView,
    view,
    maxHeight,
    minHeight,
    onClean,
    uploadOnDrop,
    footer,
    header,
    method,
    url,
    config,
    value,
    onUploadStart,
    onUploadFinish,
    // onUploading,
    uploadingMessage,
    onChange,
    behaviour,
    label,
    fakeUploading,
    localization,
    disableScroll,
  } = mergeProps(props, DropzonePropsDefault);

  //localizers
  const classNameCreated: string = useDropzoneStyles(
    color,
    backgroundColor,
    disableScroll ? undefined : maxHeight,
    minHeight,
    header && footer ? 50 : !header && footer ? 23 : header && !footer ? 22 : 0
  );
  const finalClassName: string = `dropzone-ui${classNameCreated}${
    isDragging ? ` drag` : ``
  }${clickable ? ` clickable` : ``}`;
  //localizers
  const DropzoneLocalizer: LocalLabels =
    DropzoneLocalizerSelector(localization);
  const ValidationErrorLocalizer: LocalLabels =
    ValidateErrorLocalizerSelector(localization);
  return (
    <div className="dropzone-ui-main-container">
      <div className={`dropzone-ui-root`}></div>
    </div>
  );
};
export default Dropzone;
