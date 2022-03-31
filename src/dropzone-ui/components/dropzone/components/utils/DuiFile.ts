import { FileIdGenerator, FileValidated, UPLOADSTATUS } from "../../../../utils";

export default class DuiFile {
    public id: number | string | undefined;
    public file: File;
    public valid?: boolean;
    public errors?: string[];
    public uploadMessage?: string;
    public uploadStatus?: undefined | UPLOADSTATUS;
    public xhr?: XMLHttpRequest;
    public onAbort?: Function;
    public onProgress?: (currentProgress: number) => void;
    public onError?: (error: string) => void;
    constructor(fileValidated: FileValidated) {
        const { id, file, valid, errors, uploadMessage, uploadStatus, xhr, onAbort, onProgress, onError } = fileValidated;
        console.log("Creating DuiFile: ", FileIdGenerator.getNextId());
        this.id = id || FileIdGenerator.getNextId();
        this.file = file;
        this.valid = valid;
        this.errors = errors;
        this.uploadMessage = uploadMessage;
        this.uploadStatus = uploadStatus;
        this.xhr = xhr || new XMLHttpRequest();
        this.onAbort = onAbort;
        this.onProgress = onProgress;
        this.onError = onError;
    }
    /*  get uploadStatus():undefined | UPLOADSTATUS {
         return this.uploadStatus;
     }
     set uploadStatus(value: undefined | UPLOADSTATUS) {
         this.uploadStatus = value;
     } */
    static toFileValidated(duiFile: DuiFile): FileValidated {
        const { id, file, valid, errors, uploadMessage, uploadStatus, xhr, onAbort, onProgress, onError } = duiFile;
        return { id, file, valid, errors, uploadMessage, uploadStatus, xhr, onAbort, onProgress, onError };
    }
    toFileValidated() {
        const { id, file, valid, errors, uploadMessage, uploadStatus, xhr, onAbort, onProgress, onError } = this;
        return { id, file, valid, errors, uploadMessage, uploadStatus, xhr, onAbort, onProgress, onError };
    }
}