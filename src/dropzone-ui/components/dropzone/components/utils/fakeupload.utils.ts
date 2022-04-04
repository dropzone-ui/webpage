import { FileValidated, UPLOADSTATUS } from "../../../../utils";
import DuiFile from "../../../../utils/dropzone-ui-types/DuiFile";


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


///////////////////////////
export const prepToUploadOne = (
    fileValidated: DuiFile
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
export const uploadOneDuiFile = (fileValidated: DuiFile): Promise<Object> => {
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
