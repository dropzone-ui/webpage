import * as React from "react";
import { Localization } from "../../../../localization/localization";
import { UPLOADSTATUS } from "../../../../utils";
import DuiFileInstance, { DuiFile } from "../../../../utils/dropzone-ui-types/DuiFile";
import { DuiFileManager } from "../../../../utils/dropzone-ui-types/DuiFileManager";
import { validateDuiFileList } from "../../../../utils/file-validation/validation.methods";
import { DuiFileValidatorProps } from "../../../../utils/file-validation/validation.types";
import { CustomValidateFileResponse } from "../utils/validation.utils";
/**
 * Effect for keeping track of changes
 * update files when value changes
 * also upldates the number of valid files
 * When isUploading is true, only update when value and arrOfDuiFiles
 * have same lenght. Also, only updates the uploadStatus attribute
 * from "preparing", to undefined when OnCancel() method is called in 
 * FileItem component
 * @param duiFileId the asociated duiFileId for the corresponding array of DuiFiles in case of multiple dropzones
 * @param value the current value of the list of Files from props
 * @param isUploading 
 * @returns the local list of Files
 */
const useDropzoneFileListUpdater = (
    duiFileId: number | undefined,
    value: DuiFile[],
    isUploading: boolean,
    maxFileSize?: number,
    accept?: string,
    maxFiles?: number,
    validator?: ((f: File) => CustomValidateFileResponse),
    localization?: Localization,
    validateFiles?: boolean
): [DuiFile[], number, React.Dispatch<React.SetStateAction<DuiFile[]>>] => {
    //state for managing the files locally
    const [localFiles, setLocalFiles] = React.useState<DuiFile[]>([]);
    // the current number of valid files
    const [numberOfValidFiles, setNumberOfValidFiles] = React.useState<number>(0);
    React.useEffect(() => {
        let arrOfDuiFiles: DuiFileInstance[] | undefined =
            DuiFileManager.getFileListMap(duiFileId);

        //console.table(value);
        if (!isUploading) {
            setLocalFiles(value);
        } else {
            if (arrOfDuiFiles) {
                if (arrOfDuiFiles.length !== value.length || value.length === 0) {
                    return;
                }
                for (let i = 0; i < arrOfDuiFiles.length; i++) {
                    if (
                        (value[i].uploadStatus === undefined) &&
                        (arrOfDuiFiles[i].uploadStatus === UPLOADSTATUS.preparing)
                    ) {
                        console.log("useDropzoneFileListUpdater onCancel i", i);
                        arrOfDuiFiles[i].uploadStatus = undefined;
                    }
                }
            }
        }
    }, [duiFileId, value, isUploading]);
    React.useEffect(() => {
        const localValidator: DuiFileValidatorProps = { maxFileSize, accept };
        const validatedDuiFileList: DuiFile[] = validateDuiFileList(
            localFiles,
            maxFiles ? maxFiles - numberOfValidFiles : Infinity,
            localValidator,
            validator,
            maxFiles,
            localization
        );

        setLocalFiles(validatedDuiFileList);
    }, [maxFileSize, accept, maxFiles, localization]);

    React.useEffect(() => {
        if (validateFiles) {
            setNumberOfValidFiles(localFiles.filter((x) => x.valid).length);
        } else {
            setNumberOfValidFiles(localFiles.length);
        }
    }, [localFiles, validateFiles]);
    return [localFiles, numberOfValidFiles, setLocalFiles];
}
export default useDropzoneFileListUpdater;