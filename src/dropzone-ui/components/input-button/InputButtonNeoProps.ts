import { OverridableComponentProps } from "@dropzone-ui/core";
import { Localization } from "../../localization/localization";
import { CustomValidateFileResponse } from "../../utils";
import { Behaviour } from "../../utils/dropzone-ui-types";
import { DuiFile } from "../../utils/dropzone-ui-types/DuiFile";
import { DuiUploadConfig } from "../../utils/dropzone-ui-types/DuiUploadConfig";
import { DuiFileResponse } from "../dropzone/components/utils/upload.utils";

export interface InputButtonNeoProps extends OverridableComponentProps {
    /////// BUTTON props
    /**
     * The URL to link to when the button is clicked.
     * If defined, an `<a></a>` element will be used as the root node.
     * @default undefined
     */
    href?: string;
    /**
     * - uppercase: convert label to upper case 
     * - capitalize: convert first letter of each word on label to upper case
     * - lowercase: convert label to lower case 
     * - none: no text decoration 
     * @default 'uppercase'
     */
    textDecoration?: "uppercase" | "capitalize" | "lowercase" | "none";

    /**
     * The type of style that will be rendered.
     * - contained: with background color
     * - outlined: border and transparent backgorund, on hover background color takes the color
     * - text: no borders and no background color, on hover 
     * @default 'contained'
     */
    variant?: "text" | "outlined" | "contained";
    // ONCHANGE & VALUE
    /**
     * Probably one of the most important method.
     * OnChange() returns as first parameter the list of validated duiFiles,
     * with the following structure:
     * 
     * const duiFile:DuiFile =
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
     * finishes for each file in order to update the props on each FileItem
     * @default undefined
     */
    onChange?: (files: DuiFile[]) => void;
    /**
     * The value of the input element, required for a controlled component.
     * Just like any other input component
     * @default undefined
     */
    value?: DuiFile[];
    ///////////////          STYLING          ///////////                             
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
     * Label to place when no files are selected
     */
    label?: string;
    /**
     * If `true`, the component is disabled.
     * @default false
     */
    disabled?: boolean;
    ////////////        FILES MANAGEMENT         ///////////

    preparingTime?: number;
    behaviour?: Behaviour;

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
    onUploadStart?: (files: DuiFile[]) => void;
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

export const defaultInputButtonNeoProps: InputButtonNeoProps =
{
    uploadConfig: { method: "POST", uploadLabel: "file" },
    //maxFileSize: 28000,
    //maxFiles: 10,
    behaviour: "add",
    disabled: false,
    validateFiles: true,
    variant: "contained",
    color: "#071e25",
    textColor: "#FFFFFF",
    textDecoration: "uppercase"
}