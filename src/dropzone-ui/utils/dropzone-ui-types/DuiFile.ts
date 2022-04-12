import { FileIdGenerator } from "../file-validation/validation.methods";
import { FileValidated, UPLOADSTATUS } from "../file-validation/validation.types";
//DuiFile
export declare type DuiFileType = {
    id: number | string | undefined;
    file: File;
    valid?: boolean;
    errors?: string[];
    uploadMessage?: string;
    uploadStatus?: undefined | UPLOADSTATUS;
    xhr?: XMLHttpRequest;
}


export default class DuiFileInstance {
    public id: number | string | undefined;
    public file: File;
    public valid?: boolean;
    public errors?: string[];
    public uploadMessage?: string;
    public uploadStatus?: undefined | UPLOADSTATUS;
    public xhr?: XMLHttpRequest;
    constructor(fileValidated: FileValidated | DuiFileType) {
        const { id, file, valid, errors, uploadMessage, uploadStatus, xhr } = fileValidated;
        console.log("Creating DuiFile: ", FileIdGenerator.getNextId());
        this.id = id || FileIdGenerator.getNextId();
        this.file = file;
        this.valid = valid;
        this.errors = errors;
        this.uploadMessage = uploadMessage;
        this.uploadStatus = uploadStatus;
        this.xhr = xhr || new XMLHttpRequest();
    }
    static kamuiDuiFile(){

    }
    static toFileValidated(duiFile: DuiFileInstance): FileValidated {
        const { id, file, valid, errors, uploadMessage, uploadStatus, xhr,
            //onAbort, onProgress, onError 
        } = duiFile;
        return {
            id, file, valid, errors, uploadMessage, uploadStatus, xhr,
            // onAbort, onProgress, onError
        };
    }
    toFileValidated() {
        const { id, file, valid, errors, uploadMessage, uploadStatus, xhr,
            //onAbort, onProgress, onError 
        } = this;
        return {
            id, file, valid, errors, uploadMessage, uploadStatus, xhr,
            //onAbort, onProgress, onError
        };
    }
}

