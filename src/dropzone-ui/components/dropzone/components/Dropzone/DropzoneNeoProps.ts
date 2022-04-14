import { OverridableComponentProps } from "@dropzone-ui/core";
import { Localization } from "../../../../localization/localization";
import { CustomValidateFileResponse } from "../../../../utils";
import { Behaviour } from "../../../../utils/dropzone-ui-types";
import { DuiFileType } from "../../../../utils/dropzone-ui-types/DuiFile";
import { DuiUploadConfig } from "../../../../utils/dropzone-ui-types/DuiUploadConfig";
import { DuiFileResponse } from "../utils/upload.utils";

export default interface DropzoneNeoProps extends OverridableComponentProps {
  /**
   * Probably one of the most important method.
   * OnChange() returns as first parameter the list of validated duiFiles,
   * with the following structure:
   * 
   * const duiFile:DuiFileType =
   * {
   *    file: File;
   *    valid: boolean;
   *    id: number | string | undefined;
   *    errors?: string[];
   *    uploadMessage?: string;
   *    uploadStatus?: undefined | "uploading", success, error;
   * }
   *
   * This event is also triggered when upload starts and when upload 
   * finishes for each file in order to update the props on very FileItem
   */
  onChange?: (files: DuiFileType[]) => void;
  /**
   * Just like any other input component
   * The value of the input element, required for a controlled component.
   */
  value?: DuiFileType[];
  ///////////////          STYLING          ///////////                             
  /**
   * The background color for dropzone container,
   * by default is ransparent
   */
  backgroundColor?: string;
  /**
   * The max height of the container in string format
   * by default is "190px"
   * 
   * examples: 
   *    "50vh"
   *    "20%"
   *    "40em"
   *    "1rem"
   */
  minHeight?: string;
  /**
   * If false, hides the dropzone footer
   * By default is true
   */
  footer?: boolean;
  /**
   * If false, hides the dropzone footer
   * By default is true
   */
  header?: boolean;
  /**
   * If true, the dropzone component itself will be clickable
   * If false, the file dialog will not be opened
   * By default is true.
   */
  clickable?: boolean;
  /**
   * If true, will show a ripple everytime
   * the user drops files or selects files
   */
  disableRipple?: boolean;
  /**
  * The language to be used in Dropzone labels
  * Currently only English, French , Portuguese, Chinnese (traditional and simplyfied), Russian and Spanish are supported
  * By default is "EN-en"
  */
  localization?: Localization;
  /**
   * Method for performing specific tasks on drag enter operations
   */
  onDragEnter?: (evt: React.DragEvent<HTMLDivElement>) => void;
  /**
   * Method for performing specific tasks on drag leave operations
   */
  onDragLeave?: (evt: React.DragEvent<HTMLDivElement>) => void;
  /**
   * Specific background color for the drag layer component.
   * By deault takes the value of "color" prop and adds opacity
   */
  colorOnDrag?: string;
  ////////////        FILES MANAGEMENT         ///////////

  /**
   * If true, onDrop event will return the list of files, but also
   * will upload the files if url was set, and also config
   * By default is false
   */
  uploadOnDrop?: boolean;

  preparingTime?: number;
  behaviour?: Behaviour;
  disabled?: boolean;
  /**
   * custom validator
   * must be a function that recieves as first parameter a File Object
   * and must return a boolean value
   */
  validator?: (f: File) => CustomValidateFileResponse;
  /**
   * This event is triggered when upload process starts
   * also returns the list of files that will be uploaded,
   * Unlike Onchange, onUploadStart will only return a list of files thta are candidates to be uploaded,
   * in case they are valid or upload status is "error"
   */
  onUploadStart?: (files: DuiFileType[]) => void;
  /**
  * This event returns as first aparameter the list of responses for each file following the structure:
  * responses = [
  *  {id: <the file id>, serverResponse: the server response}
  * ]
  */
  onUploadFinish?: (responses: DuiFileResponse[]) => void;
  ///////////////         VALIDATION         ///////////////
  /**
   * Max file size allowed in bytes
   */
  maxFileSize?: number;
  /**
   * Max number of files to be accepted.
   */
  maxFiles?: number;
  /**
   * The default implementation of accept
   * checks the file's mime type or extension
   * against this list. This is a comma
   * separated list of mime types or file extensions.
   * Eg.: acccept="image/*, application/pdf, .psd"
   */
  accept?: string;
  /**
   * FLag that indicates whether Dropzone component will validate
   * the given files by user or not.
   */
  validateFiles?: boolean;
  /**
   * When given, "clean" button will be visible if `validateFiles` is set to true.
   * This event is triggered when "clean button is clicked"
   * Returns as first parameter the list of files without not valid files
   */
  onClean?: Function;
  /**
   * Flag that indicates that dropzone will automatically remove non valid files
   * every time user drops files or selects filefrom file dialog.
   * This flag will only work when `validateFiles` prop is set to true.
   */
  autoClean?: boolean;
  ///////////////         UPLOAD FILES         ///////////////
  /**
   * The configuration needed for uploading the files.
   * When "uploadConfig" is not given or uploadConfig.url is undefined
   * the upload button will not be visible
   * and uploadOnDrop flag will not work
   */
  uploadConfig?: DuiUploadConfig;
  /**
   * Flag that indicates Dropzone to perform a fake upload process.
   * If given or true, will ignore `uploadConfig` prop, will show
   * the upload button
   * Will respond with random upload status on every uploadable file
   */
  fakeUpload?: boolean;
}
export const defaultDrozoneNeoProps: DropzoneNeoProps =
{
  header: true,
  footer: true,
  clickable: true,
  minHeight: "100px",
  uploadConfig: { method: "POST", uploadLabel: "file" },
  uploadOnDrop: false,
  //maxFileSize: 28000,
  //maxFiles: 10,
 
  behaviour: "add",
  disabled: false,
  validateFiles: true,
}