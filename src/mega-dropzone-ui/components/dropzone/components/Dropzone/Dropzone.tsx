import * as React from "react";
import { DropzoneProps, DropzonePropsDefault } from "./DropzoneProps";
import "./Dropzone.scss";
import { mergeProps } from "../../../../base";
import { LocalLabels } from "../../../../localization/localization";
import {
  DropzoneLocalizerSelector,
  ValidateErrorLocalizerSelector,
} from "../../../../localization";
import useDropzoneStyles from "../../hooks/useDropzoneStyes";
import DropzoneArea from "../DropzoneArea/DropzoneArea";
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

  const DropzoneLocalizer: LocalLabels =
    DropzoneLocalizerSelector(localization);
  const ValidationErrorLocalizer: LocalLabels =
    ValidateErrorLocalizerSelector(localization);

    
  return (
    <div className="dropzone-ui-main-container">
      <DropzoneArea className={`dropzone-ui-root`}>{children}</DropzoneArea>
    </div>
  );
};
export default Dropzone;
