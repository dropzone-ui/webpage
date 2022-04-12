import { UPLOADSTATUS } from "../../../../utils";
import { Method } from "../../../../utils/dropzone-ui-types";
import DuiFileInstance, { DuiFileType } from "../../../../utils/dropzone-ui-types/DuiFile";

export declare type DuiUploadResponse = {
    serverResponse: DuiFileResponse;
    uploadedFile: DuiFileType;
}
export declare type DuiFileResponse = {
    id: number | string | undefined;
    serverResponse: DuiServerResponse | {};
}
export declare type DuiServerResponse = {
    status: boolean;
    message: string;
    payload: any;
}
export const unexpectedErrorUploadResult = (duiFile: DuiFileType): DuiUploadResponse => {
    return {
        uploadedFile:
        {
            ...duiFile,
            uploadMessage: "Unable to upload. xhr object was not provided",
            uploadStatus: UPLOADSTATUS.error
        },
        serverResponse: {
            id: duiFile.id,
            serverResponse: {}
        }
    }
}
export const unableToUploadResult = (duiFile: DuiFileType): DuiUploadResponse => {
    return {
        uploadedFile: {
            ...duiFile,
            uploadMessage: "Unable to upload. XHR was not provided",
            uploadStatus: UPLOADSTATUS.error
        },
        serverResponse: {
            id: duiFile.id,
            serverResponse: {}
        }
    }
}
export const completeUploadResult = (duiFile: DuiFileType, responseDui: DuiServerResponse, result: UPLOADSTATUS): DuiUploadResponse => {
    return {
        uploadedFile: {
            ...duiFile,
            uploadMessage: responseDui.message,
            uploadStatus: result
        },
        serverResponse: {
            id: duiFile.id,
            serverResponse: responseDui
        }
    }
}
export const uploadOnePromiseXHR = async (
    duiFile: DuiFileType,
    url: string,
    method?: Method,
    headers?: Record<string, string>,
    uploadLabel?: string
): Promise<DuiUploadResponse> => {
    return new Promise(async (resolve, reject) => {
        try {
            const uploader: XMLHttpRequest | undefined = duiFile.xhr;
            if (!uploader) {
                const duiUploadResponse: DuiUploadResponse = unableToUploadResult(duiFile);
                resolve(duiUploadResponse);
                return;
            }
            const localMethod: Method = method || "POST";
            const fileToUpload: File = duiFile.file;

            const formData = new FormData();
            if (typeof uploadLabel === "string" && uploadLabel.length > 0)
                formData.append(uploadLabel, fileToUpload);
            else
                formData.append("file", fileToUpload);

            let responseDui: DuiServerResponse;
            //stablish events    
            responseDui = await DuiUpload(uploader, localMethod, url, formData, headers || {});

            if (responseDui.status) {
                const duiUploadResponse: DuiUploadResponse = completeUploadResult(duiFile, responseDui, UPLOADSTATUS.success);
                resolve(duiUploadResponse);
            } else {
                // status is false
                const duiUploadResponse: DuiUploadResponse = completeUploadResult(duiFile, responseDui, UPLOADSTATUS.error);
                resolve(duiUploadResponse);
            }
        } catch (error) {
            // on error
            console.log("ERROR", error);
            const duiUploadResponse: DuiUploadResponse = unableToUploadResult(duiFile);
            resolve(duiUploadResponse);
        }
    });
};
/**
 * Uploads one formData object to a given endpoint in a promisified way
 * @param xhr XMLHTTPrequest object
 * @param method method for uploading
 * @param endpoint endpoint to upload the file
 * @param data FromData object to perform multipart form data
 * @param headers the set of headers
 * @returns a dui server response that consists on {status, payload, message}
 */
export const DuiUpload = (
    xhr: XMLHttpRequest,
    method: Method,
    endpoint: string,
    data: FormData,
    headers: Record<string, string>
) => {
    return new Promise<DuiServerResponse>((resolve, reject) => {
        console.log("DuiUpload", xhr, method, endpoint, data, headers);
        xhr.upload.onload = () => {
            console.log("DuiUpload onLoad", xhr.readyState,xhr.response);

         };

        xhr.upload.ontimeout = () => {
            //onError("Timeout error");
            resolve(
                {
                    status: false,
                    message: "Timeout error",
                    payload: {}
                }
            );
        };

        xhr.upload.onabort = () => {
            resolve(
                {
                    status: false,
                    message: "Upload aborted",
                    payload: {}
                }
            );
        };
        // listen for `progress` event
        //currently listening on FileItem component hook
        xhr.onreadystatechange = async (e) => {
            //console.log("Finished", xhr);
            console.log("DuiUpload onreadystatechange", xhr.readyState,xhr.response);
            if (xhr.readyState === 4 && xhr.response !== "") {
                let duiRes: DuiServerResponse;
                try {
                    const jsonResponse = JSON.parse(xhr.response);
                    const status: any = jsonResponse.status;
                    const message: string = jsonResponse.message;
                    const payload: any = jsonResponse.payload;
                    console.log("====> status", status);
                    console.log("====> message", message);
                    console.log("====> payload", payload);

                    duiRes = {
                        status: typeof status === "boolean" ? status : false,
                        message: typeof message === "string" ? message : "Error on response",
                        payload: payload || {}
                    }
                    resolve(duiRes);
                } catch (error) {
                    duiRes = {
                        status: false,
                        message: "Unexpected error",
                        payload: {}
                    }
                    console.log("DuiUpload ERROR", error);
                    resolve(duiRes);
                }
            } else {
                console.log("Naranjas Changed to " + xhr.readyState);
            }
        };
        // open request
        xhr.open(method, endpoint, true);
        const headerKeys: string[] = Object.keys(headers);
        //const headerValues: string[] = Object.values(headers);
        for (let i = 0; i < headerKeys.length; i++) {
            console.log("DuiUpload headers", headerKeys[i], headers[headerKeys[i]]);
            xhr.setRequestHeader(
                headerKeys[i],
                headers[headerKeys[i]]
            );
        }
        //start uploading
        xhr.send(data);
    });

};
/**
 * Initializes the xhr attribute for performinf uploads
 * @param duiFileList 
 * @returns the array of duiFiles with the xhr attribute initialized
 */
export const toUploadableDuiFileList = (duiFileList: DuiFileType[]): DuiFileType[] => {
    if (!duiFileList) return [];
    return duiFileList.map(duiFile => {
        return { ...duiFile, xhr: new XMLHttpRequest() }
    });
}

export const preparingToUploadOne = (
    fileValidated: DuiFileInstance | DuiFileType
): Promise<DuiFileInstance | DuiFileType> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (fileValidated.uploadStatus === UPLOADSTATUS.preparing) {
                //for DuiFile instance
                fileValidated.uploadStatus = UPLOADSTATUS.uploading;
                //for DuiFile type
                resolve({
                    ...fileValidated,
                    uploadStatus: UPLOADSTATUS.uploading,
                });
            } else
                resolve(fileValidated);
        }, 1500);
    });
};