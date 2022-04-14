import { Method } from "./method"

export type DuiUploadConfig = {
    /**
     * The url endpoint to upload the file
     * (e.g. https://www.myasomwbackend/uploads/file)
     */
    url?: string;
    /**
     * upload method, can be POST | PUT | PATCH
     */
    method?: Method;
    /**
     * request headers for http request
     * e.g.
     *  { 
     *    "content-type": "multipart/form-data",
     *    "Authorization": "Bearer YOUR_BEARER_TOKEN_GOES_HERE",
     *  } 
     */
    headers?: Record<string, string>;
    /**
     * the label to use in request
     * On server this must be the label to get the file
     * By deault is "file"
     */
    uploadLabel?: string;
    /**
     * Flag for indicating whther to remove the non-valid files
     * before staring the upload process.
     * This flag is valid only if validation is enable
     */
    cleanOnUpload?: boolean;
    /**
     * The time that will last the "preparing" stage
     * By default is 1500 mlsecons = 1.5 seconds
     */
    preparingTime?: number;
    /**
     * A message to show in the footer when the uploading process happens
     */
    uploadingMessage?: string;
    /**
     * If true, onDrop event no only will return the list of files, but also
     * will upload the files if at least url was set
     * By default is false
     */
    autoUpload?: boolean;
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