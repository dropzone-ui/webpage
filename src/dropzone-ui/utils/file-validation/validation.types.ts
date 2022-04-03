import { FileIdGenerator } from "./validation.methods";
import { createSyntheticFile } from "../file-synthetic/SyntheticFile"
export enum UPLOADSTATUS {
    preparing = "preparing",
    aborted = "aborted",
    uploading = "uploading",
    success = "success",
    error = "error"
}

export declare type FileValidated = {
    id: number | string | undefined;
    file: File;
    valid?: boolean;
    errors?: string[];
    uploadMessage?: string;
    uploadStatus?: undefined | UPLOADSTATUS;
    xhr?: XMLHttpRequest;
   /*  onAbort?: Function;
    onProgress?: (currentProgress: number) => void;
    onError?: (error: string) => void; */
}
export class FileItemObject {
    id: number;
    valid: undefined | boolean;
    file: File;
    changeStatus() {
        this.valid = true;

    }

    constructor(file?: File) {
        this.id = FileIdGenerator.getNextId();
        this.valid = undefined;
        this.file = file || createSyntheticFile();
    }
    /*    set id(_id: number) {
           this.id = _id;
       }
       get id() {
           return this.id;
       }
       set valid(_valid: boolean | undefined) {
           this.valid = _valid;
       }
       get valid() {
           return this.valid;
       }
       set file(_file: File) {
           this.file = _file;
       } */


}
export declare type FileValidator = {
    /**
     * max file size in bytes
     */
    maxFileSize?: number;
    /**
     * a comma separated list of mime types or file extensions.
     */
    accept?: string;
}

export declare type CustomValidateFileResponse = {
    /**
     * if true, that means the file is valid
     */
    valid: boolean,
    /**
     * the list of erros associated with an specific file
     */
    errors?: string[]
}

