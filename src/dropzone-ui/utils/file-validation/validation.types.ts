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


export declare type DuiFileValidatorProps = {
    /**
     * max file size in bytes
     */
    maxFileSize?: number;
    /**
     * a comma separated list of mime types or file extensions.
     */
    accept?: string;
}