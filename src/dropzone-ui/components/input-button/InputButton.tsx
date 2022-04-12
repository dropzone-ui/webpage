import * as React from "react";
import { MaterialButton } from "@unlimited-react-components/material-button";
import { mergeProps } from "@dropzone-ui/core";
import { InputButtonDefaultProps, InputButtonProps } from "./InputButtonProps";

import { LocalLabels } from "../../localization/localization";
import { ValidateErrorLocalizerSelector } from "../../localization";
import { FileValidated, FileValidator } from "../../utils";
import { customValidateFile, validateFile } from "../../utils/file-validation/validation.methods";
import { DuiFileType } from "../../utils/dropzone-ui-types/DuiFile";
import { fileListToDuiFileTypeArray } from "../../utils/fileListToFileValidateArray/fileListToFileValidateArray";

const InputButton: React.FC<InputButtonProps> = (props: InputButtonProps) => {
  let {
    accept,
    color,
    disabled,
    id,
    label,
    maxFileSize,
    multiple,
    onChange,
    style,
    textColor,
    validator,
    variant,localization
  } = mergeProps(props, InputButtonDefaultProps);
  const inputRef = React.useRef<HTMLInputElement>(null);
    //state for checking upload start
    const [isUploading, setIsUploading] = React.useState<boolean>(false);
  const localValidator: FileValidator = {
    //It is assumed that input tag already validated accept property
    //accept: accept,
    maxFileSize: maxFileSize,
  };
  const ValidationErrorLocalizer: LocalLabels =
  ValidateErrorLocalizerSelector(localization);

  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (
    evt: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    if (isUploading) return;
    let fileList: FileList = evt.target.files as FileList;
    let duiFileListOutput: DuiFileType[] = fileListToDuiFileTypeArray(fileList);
  };
  function clickInput(e: React.MouseEvent<MouseEvent>): void {
    e.stopPropagation();
    e.preventDefault();
    let referenceInput = inputRef.current;
    if (referenceInput) {
      referenceInput.click();
    }
  }
  return (
    <React.Fragment>
      <MaterialButton
        style={style}
        color={color}
        variant={variant}
        //size={size}
        onClick={clickInput}
        disabled={disabled}
        textColor={textColor}
      >
        {label}
      </MaterialButton>
      <input
        id={id || ""}
        style={{ display: "none" }}
        ref={inputRef}
        onChange={handleOnChange}
        type="file"
        multiple={multiple}
        accept={accept}
      />
    </React.Fragment>
  );
};

export default InputButton;
