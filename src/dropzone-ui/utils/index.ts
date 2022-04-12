//UTILITIES
import {
    createFile, createDPF,
    createWord,
    createListOfPDF,
    fileSizeFormater,
    getExt,
    MAX_SIZE_WORD,
    shrinkWord,
    getRandomInt
} from "./file-utilities/utilities";
//MIME
import {
    audioSelector,
    applicationSelector,
    checkIsCode,
    extensionSelector,
    fontSelector,
    getURLFileIco,
    imageSelector,
    mimeSelector,
    textSelector,
    videoSelector
} from "./file-mime/mime";
//READERS
import {
    readAsArrayBuffer,
    readAsBinaryString,
    readAsDataURL,
    readAsText
} from "./file-readers/readers";
//RESIZE
import resizeImage from "./file-readers/resizeImage"
//validation
import {
    UPLOADSTATUS,
    CustomValidateFileResponse,
    FileValidated,
    FileValidator
} from "./file-validation/validation.types";
import { createListOfMultiTypeFile, createSyntheticFile } from "../utils/file-synthetic/SyntheticFile";
import { makeSynthticFileValidate } from "./file-synthetic/syntheticfileGenerator";
// VALIDATION 
import { fileListvalidator, FileIdGenerator, customValidateFile, separateAccept, validateAccept, validateFile } from "./file-validation/validation.methods";
import { fileListToFileValidateArray } from "./fileListToFileValidateArray/fileListToFileValidateArray";





//EXPORTS
export {
    //utilities
    createFile, createDPF,
    createWord, createListOfPDF,
    fileSizeFormater, getExt,
    MAX_SIZE_WORD,
    shrinkWord, getRandomInt,
    //mime
    audioSelector, applicationSelector,
    checkIsCode, extensionSelector, fontSelector,
    getURLFileIco, imageSelector, mimeSelector,
    textSelector, videoSelector,
    //readers
    readAsArrayBuffer,
    readAsBinaryString,
    readAsDataURL,
    readAsText,
    //resize
    resizeImage,
    //validation
    UPLOADSTATUS
};
export type {
    CustomValidateFileResponse,
    FileValidated,
    FileValidator
};
export { createListOfMultiTypeFile, createSyntheticFile, makeSynthticFileValidate };
//VALIDATION
export { fileListvalidator, FileIdGenerator, customValidateFile, separateAccept, validateAccept, validateFile }
//PARSE
export {fileListToFileValidateArray};