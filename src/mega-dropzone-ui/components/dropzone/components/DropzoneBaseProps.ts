import { Behaviour } from "../../../dropzone-ui-types";
import { ViewMode } from "../../../dropzone-ui-types/view";
import { Localization } from "../../../localization/localization";
import { FileDuiResponse } from "../../../utils/file-upload/upload.types";
import { CustomValidateFileResponse, FileValidated } from "../../../utils/file-validation/validation.types";

export interface DropzoneBaseProps {
  onDragEnter?: (evt: React.DragEvent) => void;
  onDragLeave?: (evt: React.DragEvent) => void;
  onDragOver?: (evt: React.DragEvent) => void;
  /**
   * This event is triggered when files are dropped or selected. 
   * Returns as first parameter the list of FileValidate files dropped or selected.
   */
  onDrop?: (evt: React.DragEvent, filesDropped: File[]) => void;

  /**
   * Max number of files to be accepted.
   */
  maxFiles?: number;
  /**
   * max file size allowed in bytes
   */
  maxFileSize?: number;
  /**
   * If true, the dropzone component itself will be clickable
   */
  clickable?: boolean;
  /**
   * Extra feature to perform on click
   * Only if clickable was set to true.
   * By default it opens file picker dialog
   */
  onClick?: (evt: React.MouseEvent) => void;
  /**
   * The default implementation of accept
   * checks the file's mime type or extension
   * against this list. This is a comma
   * separated list of mime types or file extensions.
   * Eg.: image/*,application/pdf,.psd
   */
  accept?: string;


  /**
   * custom validator
   * must be a function that recieves as first parameter a File Object
   * and must return a boolean value.
   * This is supposed to use when user wants to validate
   * the file according to their own  ans custom criteria.
   */
  validator?: (f: File) => CustomValidateFileResponse;

  /**
  * This event returns as first aparameter the list of responses 
  * for each file following the structure:
  * responses = [
  *  {id: <the file id>, serverResponse: the server response}
  * ]
  */
  onUploadFinish?: (responses: FileDuiResponse[]) => void;
  /**
   * The behaviour on drop files
   * "add" means to add next files to a current list
   * "replace" menas to replace the complete list with a new one
   */
  behaviour?: Behaviour;

  /**
   * Use this prop only in development mode
   * This will make dropzone to simulate a server upload
   */
  fakeUploading?: boolean;
}