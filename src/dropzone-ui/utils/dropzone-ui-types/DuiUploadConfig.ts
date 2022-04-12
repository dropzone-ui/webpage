import { Method } from "./method"

export declare type DuiUploadConfig = {
    url?: string;
    method?: Method;
    headers?: Record<string, string>;
    uploadLabel?: string;
    cleanOnUpload?: boolean;
}

export const createDuiUploadConfig = (
    url?: string,
    method?: Method,
    headers?: Record<string, string>,
    uploadLabel?: string,
    cleanonUpload?: boolean
) => {
    return {
        url,
        method,
        headers,
        uploadLabel,
        cleanonUpload
    }
}