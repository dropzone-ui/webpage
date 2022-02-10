import { Method } from "../../../mega-dropzone-ui/dropzone-ui-types";
import { FileValidated } from "../../../mega-dropzone-ui/utils/file-validation/validation.types";
import { DropzoneUIResponse } from "./upload.types";

export declare type DuiUploadConfig = {
    headers: Record<string, string>,
   // onAbort?: Function;
    //onProgress?: (currentProgress: number) => void;
   // onError?: (error: string) => void;
}

export const DuiUpload = (
    xhr: XMLHttpRequest,
    method: Method,
    endpoint: string,
    data: FormData,
    config: DuiUploadConfig
) => {
    return new Promise<DropzoneUIResponse>((resolve, reject) => {
        //const xhr = new XMLHttpRequest();
        const { headers, 
            //onAbort, onProgress, onError 
        } = config;
console.log("start upload", );
        xhr.upload.onload = () => {
            /* resolve(
                {
                    status: true,
                    message: "",
                    payload: {}
                }
            ); */
        };

        // listen for `upload.error` event
        /* if (onError) {
            xhr.upload.onerror = () => {
                onError("An error ocurred");
                resolve(
                    {
                        status: false,
                        message: "There was an error while uploading",
                        payload: {}
                    }
                );
            };
        } */
        //if (onError) {
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
        //}
        // listen for `upload.abort` event
        //if (onAbort) {
            xhr.upload.onabort = () => {
                
                resolve(
                    {
                        status: false,
                        message: "Upload aborted",
                        payload: {}
                    }
                );
            };
        //

        // listen for `progress` event
      /*   if (onProgress) {
            xhr.upload.onprogress = (event) => {
                onProgress((event.loaded / event.total) * 100);
            };
        } */
        xhr.onreadystatechange = async (e) => {
            //console.log("Finished", xhr);
            console.log("Finished xhr.DONE", xhr.readyState);
            if (xhr.readyState === 4 && xhr.response !== "") {

                console.log(
                    `onreadystatechange The upload is completed: ${xhr.status} ${xhr.response}`
                );
                console.log("onreadystatechange responseText: ", xhr.responseText);

                try {
                    const jsonResponse = JSON.parse(xhr.response);

                    console.log("=====> jsonResponse", jsonResponse);
                    const status: any = jsonResponse.status;
                    const message: string = jsonResponse.message;
                    const payload: any = jsonResponse.payload;
                    console.log("====> status", status);
                    console.log("====> message", message);
                    console.log("====> payload", payload);

                    let duiRes: DropzoneUIResponse = {
                        status: typeof status === "boolean" ? status : false,
                        message: typeof message === "string" ? message : "Error on response",
                        payload: payload || {}
                    }
                    resolve(
                        duiRes
                    );
                } catch (error) {
                    resolve(
                        {
                            status: false,
                            message: "Unexpected error",
                            payload: {}
                        }
                    );
                }


            } else {
                console.log("Naranjas Changed to " + xhr.readyState);
            }
        };
        // open request
        xhr.open(method, endpoint, true);


        const headerKeys: string[] = Object.keys(headers);
        const headerValues: string[] = Object.values(headers);

        for (let i = 0; i < headerKeys.length; i++) {
            xhr.setRequestHeader(
                headerKeys[i],
                headerValues[i]
            );
        }
        xhr.setRequestHeader(
            "Accept",
            "application/json; charset=utf-8, text/plain, */*"
        );
        // send request
        xhr.send(data);
    });

};