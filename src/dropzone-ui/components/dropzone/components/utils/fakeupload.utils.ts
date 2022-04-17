import {  DropzoneLocalizerSelector } from "../../../../localization";

import { FileValidated, UPLOADSTATUS } from "../../../../utils";
import DuiFileInstance from "../../../../utils/dropzone-ui-types/DuiFile";
import { DuiUploadResponse } from "./upload.utils";


export const setPrepToUploading = (
    fileValidated: FileValidated
): Promise<FileValidated> => {
    console.log("prepToUpload One", fileValidated);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                ...fileValidated,
                uploadStatus: UPLOADSTATUS.uploading,
            });
        }, 1500);

    });
};
export const uploadOne = (fileValidated: FileValidated): Promise<FileValidated> => {
    console.log("upoload One", fileValidated);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                ...fileValidated,
                uploadStatus: UPLOADSTATUS.success,
            });
        }, 2000);
    });
};
/**
 * Awaits the given time before start uploading
 * @param preparingTime the time in miliseconds
 * @returns an empty object
 */
export const sleepPreparing = (preparingTime?: number): Promise<Object> => {
    console.log("upoload preparingTime One", preparingTime);
    return new Promise((resolve, reject) => {
        if (!preparingTime) {
            resolve({});
        } else {
            setTimeout(() => {
                resolve({});
            }, 1500);
        }
    });
}


/**
 * 
 * @param fileValidated 
 * @returns 
 */
export const prepToUploadOne = (
    fileValidated: DuiFileInstance
): Promise<Object> => {
    //console.log("prepToUpload One", fileValidated);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            fileValidated.uploadStatus = UPLOADSTATUS.uploading;
            resolve({
                ...fileValidated,
                uploadStatus: UPLOADSTATUS.uploading,
            });
        }, 1500);

    });
};
export const uploadOneDuiFile = (fileValidated: DuiFileInstance): Promise<Object> => {
    //console.log("upload One", fileValidated);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            fileValidated.uploadStatus = UPLOADSTATUS.success;
            resolve({
                ...fileValidated,
                uploadStatus: UPLOADSTATUS.success,
            });
        }, 2000);
    });
};


/**
 * 
 * @param duiFile the duiFile to upload 
 * @param DropzoneLocalizer the localization
 * @returns a duiUploadResponse object that describes the result
 */
export const fakeDuiUpload = (
    duiFile: DuiFileInstance,
    DropzoneLocalizer = DropzoneLocalizerSelector("EN-en")
): Promise<DuiUploadResponse> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const randomNumber: number = Math.floor(Math.random() * 10);
            if (randomNumber % 2 === 0) {
                const status = true;
                const message = DropzoneLocalizer.fakeuploadsuccess as string;
                const payload = { url: "" };
                resolve({
                    uploadedFile: {
                        ...duiFile,
                        uploadStatus: UPLOADSTATUS.success,
                        uploadMessage: message,
                    },
                    serverResponse: {
                        id: duiFile.id,
                        serverResponse: { status, message, payload },
                    },
                });
            } else {
                const status = false;
                const message = DropzoneLocalizer.fakeUploadError as string;
                const payload = {};
                resolve({
                    uploadedFile: {
                        ...duiFile,
                        uploadStatus: UPLOADSTATUS.error,
                        uploadMessage: message,
                    },
                    serverResponse: {
                        id: duiFile.id,
                        serverResponse: { status, message, payload },
                    },
                });
            }
        }, 1700);
    });
};