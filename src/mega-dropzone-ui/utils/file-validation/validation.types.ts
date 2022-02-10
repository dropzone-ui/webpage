
export enum UPLOADSTATUS {
    uploading = "uploading",
    success = "success",
    error = "error"
}
interface FileValidatedType {
    /**
     * File Object
     */
    file: File;
    valid?: boolean;
    id: number | string | undefined;
    errors?: string[];
    uploadMessage?: string;
    uploadStatus?: undefined | UPLOADSTATUS;
}
export declare type FileValidated = {
    /**
     * File Object
     */
    file: File;
    valid?: boolean;
    id: number | string | undefined;
    errors?: string[];
    uploadMessage?: string;
    uploadStatus?: undefined | UPLOADSTATUS;
}
export interface FileValidator {
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
