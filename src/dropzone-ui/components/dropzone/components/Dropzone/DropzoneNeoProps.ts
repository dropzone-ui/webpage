import { OverridableComponentProps } from "@dropzone-ui/core";
import { Localization } from "../../../../localization/localization";
import { CustomValidateFileResponse, FileValidated } from "../../../../utils";
import { Behaviour, Method } from "../../../../utils/dropzone-ui-types";
import { DuiFileType } from "../../../../utils/dropzone-ui-types/DuiFile";
import { DuiUploadConfig } from "../../../../utils/dropzone-ui-types/DuiUploadConfig";
import { DuiFileResponse, DuiUploadResponse } from "../utils/upload.utils";

export default interface DropzoneNeoProps extends OverridableComponentProps {
    ///////////////         STYLING         ///////////                             
    /**
     * The background color for dropzone,
     * by default is linear-gradient(to bottom, aliceblue,#b7a8a8)
     */
    backgroundColor?: string;
    /**
     * The max height of the container
     * in string format
     * by default "500px"
     * 
     * examples: 
     *    "50vh"
     *    "20%"
     *    "40em"
     *    "1rem"
     */
    minHeight?: string;
    /**
     * if true, shows the dropzone footer
     */
    footer?: boolean;
    /**
      * if true, shows the dropzone footer
      */
    header?: boolean;

    clickable?: boolean;
    /**
     * if true, will show a ripple everytime
     * the user drops files os selects files
     */
    disableRipple?: boolean;
    localization?: Localization;
    //max file size per file
    maxFileSize?: number;
    //max amount of files
    maxFiles?: number;
    //mimetypes accepted
    accept?: string;
    //disable the ripple effect
    validateFiles?: boolean;

    onDragEnter?: (evt: React.DragEvent<HTMLDivElement>) => void;
    onDragLeave?: (evt: React.DragEvent<HTMLDivElement>) => void;
    colorOnDrag?: string;
    ////////////        FILES MANAGEMENT         ///////////
    /**
     * Probably one of the most important methods.
     * OnChange returns as first parameter the list of validated duiFiles,
     * following the structure:
     * duiFile = 
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
     * finishes for each file in order to update the props on very FIleItem
     */
    onChange?: (files: FileValidated[]) => void;
    /**
     * Just like any other input component
     * The value of the input element, required for a controlled component.
     */
    value?: FileValidated[];


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
    uploadConfig?: DuiUploadConfig;
    fakeUpload?:boolean;
    onClean?:Function;

}
export const defaultDrozoneNeoProps: DropzoneNeoProps =
{
    header: true,
    footer: true,
    clickable: true,
    minHeight: "100px",
    uploadConfig: { url: "", method: "POST", uploadLabel: "file" },
    uploadOnDrop: false,
    //maxFileSize: 28000,
    //maxFiles: 10,
    preparingTime: 1000,
    behaviour: "add",
    disabled: false,
    validateFiles: true,


}