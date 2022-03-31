import { DropzoneProps } from "../../components/dropzone/components/Dropzone/DropzoneProps";
import { UploadPromiseResponse } from "../../components/dropzone/components/utils/dropzone-ui.upload.utils";
import { FileValidated, UPLOADSTATUS } from "../file-validation/validation.types";
import { DuiUpload } from "./dui-uploader";

export const uploadPromiseXHR = async (
    file: FileValidated,
    url: string,
    method: DropzoneProps["method"],
    headers?: Record<string, string>
): Promise<UploadPromiseResponse> => {
    return new Promise(async (resolve, reject) => {

        try {
            const uploader: XMLHttpRequest | undefined = file.xhr;
            if (!uploader) {
                resolve(
                    {
                        uploadedFile:
                        {
                            ...file,
                            uploadMessage: "Unable to upload. xhr object was not provided",
                            uploadStatus: UPLOADSTATUS.error
                        },
                        serverResponse: {
                            id: file.id,
                            serverResponse: {}
                        }
                    }
                );
                return;
            }
            const localMethod: DropzoneProps["method"] = method || "POST";
            const fileToUpload: File = file.file;

            const formData = new FormData();
            formData.append("file", fileToUpload);
            const configheaders =
                headers || {};

            let responseDui: DropzoneUIResponse;
            //stablish events    
            responseDui = await DuiUpload(uploader, localMethod, url, formData,
                {
                    headers: configheaders,
                    //onAbort: file.onAbort,
                    // onProgress: file.onProgress,
                    //  onError: file.onError,
                });

            if (responseDui.status) {
                // status is true
                resolve(
                    {
                        uploadedFile:
                        {
                            ...file,
                            uploadMessage: responseDui.message,
                            uploadStatus: UPLOADSTATUS.success
                        },
                        serverResponse:
                        {
                            id: file.id,
                            serverResponse: responseDui
                        }
                    }
                );
            } else {
                // status is false
                resolve(
                    {
                        uploadedFile:
                        {
                            ...file,
                            uploadMessage: responseDui.message,
                            uploadStatus: UPLOADSTATUS.error
                        },
                        serverResponse: {
                            id: file.id,
                            serverResponse: responseDui
                        }
                    }
                );
            }
        } catch (error) {
            // on error
            resolve(
                {
                    uploadedFile:
                    {
                        ...file,
                        uploadMessage: "Unexpected error",
                        uploadStatus: UPLOADSTATUS.error
                    },
                    serverResponse: {
                        id: file.id,
                        serverResponse: {}
                    }
                }
            );
        }
    });
};
export interface UploadPromiseAxiosResponse {
    serverResponse: FileDuiResponse;
    uploadedFile: FileValidated;
}
export interface FileDuiResponse {
    id: number | string | undefined;
    serverResponse: DropzoneUIResponse | {};
}
export interface DropzoneUIResponse {
    status: boolean;
    message: string;
    payload: any;
}

/// queue
/**
 * In construction
 */
/* export const uploadMultipleConcurrent = async (files: FileValidated[], url: string, config: any | undefined): FileValidated[] => {

    if (files && files.length) {
        return;
    }

    }
} */