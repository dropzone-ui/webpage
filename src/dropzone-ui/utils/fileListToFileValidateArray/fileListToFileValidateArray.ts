import { FileIdGenerator } from "../file-validation/validation.methods";
import { FileValidated } from "../file-validation/validation.types";

export const fileListToFileValdateArray = (fileList: FileList) => {
    let filesValidated: FileValidated[] = [];
    for (let i = 0, f: File; (f = fileList[i]); i++) {
        filesValidated.push({ id: FileIdGenerator.getNextId(), file: f, });
    }
    return filesValidated;
};