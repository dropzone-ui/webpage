import DuiFile, { DuiFileType } from "../dropzone-ui-types/DuiFile";
import { FileIdGenerator } from "../file-validation/validation.methods";
import { FileValidated } from "../file-validation/validation.types";
/**
 * Converts the fileList into an array of separated FIleValidated objects
 * @param fileList the FileList object given by input(event.target.files) or drop operation (event.dataTransfer)
 * @returns an array of FileValidated objects
 */
export const fileListToFileValidateArray = (fileList: FileList): FileValidated[] => {
    let filesValidated: FileValidated[] = [];
    for (let i = 0, f: File; (f = fileList[i]); i++) {
        filesValidated.push({ id: FileIdGenerator.getNextId(), file: f, });
    }
    return filesValidated;
};
/**
 * Converts the fileList into an array of separated DuiFileType objects(event.target.files) or drop operation (event.dataTransfer)
 * @param fileList the FileList object given by input
 * @returns an array of DuiFileType objects
 */
export const fileListToDuiFileTypeArray = (fileList: FileList): DuiFileType[] => {
    let filesValidated: DuiFileType[] = [];
    for (let i = 0, f: File; (f = fileList[i]); i++) {
        filesValidated.push({ id: FileIdGenerator.getNextId(), file: f, });
    }
    return filesValidated;
};
/**
 * Converts the fileList into an array of separated DuiFile instances
 * @param fileList the FileList object given by input (event.target.files) or drop operation (event.dataTransfer)
 * @returns an array of DuiFile instances
 */
export const fileListToDuiFileArray = (fileList: FileList): DuiFile[] => {
    let filesValidated: DuiFile[] = [];
    for (let i = 0, f: File; (f = fileList[i]); i++) {
        filesValidated.push(new DuiFile({ id: FileIdGenerator.getNextId(), file: f, }));
    }
    return filesValidated;
};