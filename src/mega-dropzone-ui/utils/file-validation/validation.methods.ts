import { ValidateErrorLocalizerSelector } from "../../localization";
import { FunctionLabel, Localization, LocalLabels } from "../../localization/localization";
import { getExt } from "../file-utilities/utilities";
import { listOfErrors } from "./validation.fakeerrros";
import { CustomValidateFileResponse, FileValidated, FileValidator, UPLOADSTATUS } from "./validation.types";

/**
 * Separate the accept string array into an array of strings separated by commas
 * @param accept the string accept array
 * @returns an array of strings in wich every item
 */
export const separateAccept = (accept: string | undefined): string[] => {
    if (!accept || accept.length === 0) {
        return [];
    }
    const commaSeparatedAccpet: string[] = accept.split(",").map((acceptItem) => acceptItem.trim());
    return commaSeparatedAccpet;
}
/**
 * Checks whether a file is valid or not given an array of file extentions and mime types
 * e.g. accept =  [".doc", ".docx", ".xml", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
 * @param accept the array of strings accept items
 * @param file a File object to be evaluated
 * @returns true if the mime type file is included in the accept param
 */
export const validateAccept = (accept: string[], file: File): boolean => {
    let valid: boolean = false;
    const { name, type } = file;
    //Array(5) [ ".doc", ".docx", ".xml", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ]
    for (let i = 0; i < accept.length; i++) {
        const acceptItem: string = accept[i];
        //check is not empty
        if (acceptItem.length !== 0) {
            //check extention
            if (acceptItem.charAt(0) === ".") {
                if (acceptItem.includes(getExt(name))) {
                    return true;
                }
            }
            //check mime
            // header/tail  => image/png  ;  image/* ; audio
            if (type && type.length > 0 && acceptItem.includes("/") && type.includes("/")) {
                let headerMime = acceptItem.split("/")[0];
                let tailMime = acceptItem.split("/")[1];

                let headerMimeFile = type.split("/")[0];
                let tailMimeFile = type.split("/")[1];

                if (headerMime === headerMimeFile) {
                    //    image/*
                    if (tailMime === "*") {
                        return true;
                    } else if (tailMime === tailMimeFile) {
                        return true;
                    }
                }
            }
        }
    }
    return valid;
}
/**
 * Function that validate whether  afile is valid or not
 * according to the Filevalidator properties
 * @param file a File object to be evaluated
 * @param validator the validator object 
 * @returns a FileValidated object
 */
export const validateFile = (
    file: File,
    validator: FileValidator,
    localErrors: LocalLabels
): FileValidated => {

    const idGenerated = FileIdGenerator.getNextId();
    let errors: string[] = [];

    const { maxFileSize, accept } = validator;

    //check file size
    if (maxFileSize && file.size > maxFileSize) {
        const maxFileSizeErrorMessenger: FunctionLabel = localErrors.maxSizeError as FunctionLabel;
        errors.push(maxFileSizeErrorMessenger(maxFileSize));
    }

    //check file type
    // const allowedTypes = accept.filter((type) => (file.type === type))
    if (accept && !validateAccept(separateAccept(accept), file)) {
        errors.push(localErrors.acceptError as string);
    }


    const fileResult: FileValidated = {
        id: idGenerated,
        file: file,
        valid: errors.length === 0,
        errors: errors
    };
    // logic here
    return fileResult;
};

/**
 * Function that validates a file
 * according to the Filevalidator properties
 * @param file 
 * @param validator 
 * @returns a CustomValidateFileResponse objectthaat contains 2 fields: list of errors and boolean value "valid"
 */
export const customValidateFile = (
    file: File,
    validator: (f: File) => CustomValidateFileResponse
): FileValidated => {
    const id = FileIdGenerator.getNextId();
    const { valid, errors } = validator(file);
    let fileResult: FileValidated = {
        id,
        file,
        valid,
        errors
    };
    // logic here
    return fileResult;
};

/**
 * An id generator for FileItems
 */
export abstract class FileIdGenerator {
    static nextId = 0;
    /**
     * Increases the id counter and returns the next id available.
     * @returns the next integer id available
     */
    static getNextId(): number {
        FileIdGenerator.nextId++;
        return FileIdGenerator.nextId;
    }
}


/**
 * 
 * @param preValidatedFiles FileList 
 * @param remainingValids The number of remaining valid files
 * @param localValidator 
 * @param validator 
 * @param maxFiles 
 * @param localization 
 * @returns 
 */
export const fileListvalidator = (
    preValidatedFiles: FileList,
    remainingValids: number,
    localValidator: FileValidator,
    validator: ((f: File) => CustomValidateFileResponse) | undefined,
    maxFiles?: number,
    localization?: Localization
): FileValidated[] => {
    const output: FileValidated[] = [];
    //set a countdown when there is a limit on files
    let countdown: number = remainingValids;
    // get localized labels
    const ValidationErrorLocalizer: LocalLabels =
        ValidateErrorLocalizerSelector(localization);
    //Iterate the File list
    for (let i = 0, f: File; (f = preValidatedFiles[i]); i++) {
        // Validate the file list with
        let validatedFile: FileValidated = validator ? customValidateFile(f, validator) : validateFile(f, localValidator, ValidationErrorLocalizer);
        if (validatedFile.valid) {
            //not valid due to file count limit
            const valid = countdown > 0;
            validatedFile.valid = valid;
            //add error about amount
            if (!valid) {
                const maxFileErrorMessenger: FunctionLabel = ValidationErrorLocalizer.maxFileCount as FunctionLabel;
                validatedFile.errors = validatedFile.errors
                    ? [...validatedFile.errors, maxFileErrorMessenger(maxFiles || Infinity)]
                    : [maxFileErrorMessenger(maxFiles || Infinity)];
            }
            countdown--;
        }
        output.push(validatedFile);
    }
    return output;
};