import DuiFileInstance, { DuiFile } from "../dropzone-ui-types/DuiFile";
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
 * Converts the fileList into an array of separated DuiFileInstance objects(event.target.files) or drop operation (event.dataTransfer)
 * @param fileList the FileList object given by input
 * @returns an array of DuiFile objects
 */
export const fileListToDuiFileArray = (fileList: FileList): DuiFile[] => {
    let filesValidated: DuiFile[] = [];
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
export const fileListToDuiFileInstanceArray = (fileList: FileList): DuiFileInstance[] => {
    let filesValidated: DuiFileInstance[] = [];
    for (let i = 0, f: File; (f = fileList[i]); i++) {
        filesValidated.push(new DuiFileInstance({ id: FileIdGenerator.getNextId(), file: f, }));
    }
    return filesValidated;
};