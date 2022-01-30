import { Behaviour } from "../../../dropzone-ui-types";
import { Localization } from "../../../localization/localization";
import { CustomValidateFileResponse, FileValidated } from "../../../utils/file-validation/validation.types";

export interface DropzoneBaseProps {
  /**
   * The default implementation of accept
   * checks the file's mime type or extension
   * against this list. This is a comma
   * separated list of mime types or file extensions.
   * Eg.: image/*,application/pdf,.psd
   */
  accept?: string;
  /**
   * The behaviour on drop files
   * "add" means to add next files to a current list
   * "replace" menas to replace the complete list with a new one
   */
  behaviour?: Behaviour;
  /**
   * If true, the dropzone component itself will be clickable
   */
  clickable?: boolean;
  /**
   * Max number of files to be accepted.
   */
  maxFiles?: number;
  /**
   * max file size allowed in bytes
   */
  maxFileSize?: number;
  /**
   * Extra feature to perform on click
   * Only if clickable was set to true.
   * By default it opens file picker dialog
   */
  onClick?: (evt: React.MouseEvent) => void;
  /**
   * Just like any other input component
   * the value prop is the current value
  */
  value?: FileValidated[];
  /**
    * Probably one of the most important methods.
    * Onchange returns as first parameter the list of validated files,
    * following the structure:
    * file = 
    *  {
    *      file: File;
    *      valid: boolean;
    *      id: number | string | undefined;
    *      errors?: string[];
    *      uploadMessage?: string;
    *      uploadStatus?: undefined | "uploading", success, error;
    *  }
    *
    * This event is also triggered when upload starts and when upload 
    * finishes for each file in order to update the props on very FIleItem
    */
  onChange?: (files: FileValidated[]) => void;
  onDragEnter?: (evt: React.DragEvent) => void;
  onDragLeave?: (evt: React.DragEvent) => void;
  onDragOver?: (evt: React.DragEvent) => void;
  /**
   * This event is triggered when files are dropped or selected. 
   * Returns as first parameter the list of FileValidate files dropped or selected.
   */
  onDrop?: (evt: React.DragEvent, filesDropped: FileValidated[]) => void;
  /**
   * custom validator
   * must be a function that recieves as first parameter a File Object
   * and must return a boolean value.
   * This is supposed to use when user wants to validate
   * the file according to their own  ans custom criteria.
   */
  validator?: (f: File) => CustomValidateFileResponse;
  /**
  * language to be used for labels
  * currently supported:
  * English (by default), French , Portuguese, Italian, Chinnese (traditional and simplyfied) and Spanish
  */
   localization?: Localization;
}