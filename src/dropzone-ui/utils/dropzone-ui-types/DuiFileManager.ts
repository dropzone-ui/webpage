import { UPLOADSTATUS } from "../file-validation/validation.types";
import DuiFileInstance, { DuiFileType } from "./DuiFile";

export declare type FileListMap = {
    [id: number]: DuiFileInstance[] | undefined;
}
export class DuiFileManager {
    private static nextId: number = 0;
    private static fileLists: FileListMap = {};
    /**
     * Increases the id counter and returns the next id available.
     * @returns the next integer id available
     */
    public static getNextId(): number {
        DuiFileManager.nextId++;
        return DuiFileManager.nextId;
    }
    /**
     * Updates a dui file list given an id
     * @param id id of the fileList
     * @param duiFiles list of DuiFiles forinitializing the array
     * @returns the id of the fileList
     */
    public static setFileList(id: number | undefined, duiFiles: DuiFileInstance[]): number {
        if (!id) {
            return 0;
        } else {
            DuiFileManager.fileLists[id] = [...duiFiles];
            return id;
        }

    }
    /**
     * Generates a new ID
     * @returns the next Id asociated with a DuiFIle list
     */
    public static createFileListMap(): number {
        const nextId: number = DuiFileManager.getNextId();
        DuiFileManager.fileLists[nextId] = [];
        return nextId;
    }

    /**
         * Generates a new ID
         * @returns the next Id asociated with a DuiFIle list
         */
    public static removeFileListMap(id?: number): number {
        if (!id) {
            return 0;
        } else {
            try {
                DuiFileManager.fileLists[id] = undefined;
                return id;
            } catch (error) {
                console.error("Error on remove", error);
                return 0;
            }
        }
    }
    /**
     * 
     * @param id 
     * @returns 
     */
    public static getFileListMap(id?: number): DuiFileInstance[] | undefined {
        if (typeof id === "number") {
            try {
                return DuiFileManager.fileLists[id];
            } catch (error) {
                console.error("Error on get List", error);
                return undefined;
            }
        } else {
            return undefined;
        }
    }
    /**
     * Updates(replaces) the duiFile list on preparing stage and returns the new array.
     * Removes the non valid files if cleanOnUpload is true and validateFiles is also true
     * Then sets on preparing stage all files according to the following creiteria:
     * If theuploadStatus is diferent than "sucess" AND
     * then, update the files on preparing stage. Otherwise keep the duiFile props.
     * Finally, updates the duiFileInstance list on DuiFileManager.
     * @param duiFileId the id to access the right list
     * @param localFiles the list of duiFiles
     * @param validateFiles flag that indicates that validation is active or o¿not
     * @param cleanOnUpload flag to determine whther to clena the list oof non valid files or not
     * @returns a list of DuiFileInstance
     */
    public static setFileListMapPreparing(
        duiFileId: number,
        localFiles: DuiFileType[],
        validateFiles: boolean,
        cleanOnUpload: boolean
    ): DuiFileInstance[] | undefined {
        if (!(typeof duiFileId === "number")) return undefined;
        try {
            let resultDuiList: DuiFileInstance[] = [];
            //remove non valids if cleanOnUpload is true and validateFiles is also true
            if (validateFiles && cleanOnUpload) {
                for (let i = 0; i < localFiles.length; i++) {
                    const duiFile: DuiFileType = localFiles[i];
                    const { valid } = duiFile;
                    if (valid) {
                        resultDuiList.push(new DuiFileInstance(duiFile));
                    }

                }
            }
            //sets on preparing stage all files according to the following creiteria:
            // If theuploadStatus is diferent than "sucess" AND
            // If validateFiles is true and the file is true OR validateFiles is false
            // then update the files on preparing stage. Otherwise keep the duiFile props.
            for (let i = 0; i < resultDuiList.length; i++) {
                const duiFile: DuiFileType = localFiles[i];
                const { valid, uploadStatus } = duiFile;
                if (uploadStatus !== UPLOADSTATUS.success && (validateFiles && valid || !validateFiles))
                    resultDuiList[i].uploadStatus = UPLOADSTATUS.preparing;
            }
            DuiFileManager.setFileList(duiFileId, resultDuiList);
            return DuiFileManager.fileLists[duiFileId];
        } catch (error) {
            console.error("Error on get List", error);
            return undefined;
        }

    }
    /**
     * 
     * @param duiFileId 
     * @param index 
     * @param incommingDuiFile 
     * @returns 
     */
    /* public static updateFileListMapPreparingById(
        duiFileId: number,
        index: number,
        incommingDuiFile: DuiFileInstance
    ): DuiFileInstance[] | undefined {
        if (!(typeof duiFileId === "number") || !(typeof index === "number") || index > 0) return undefined;
        const duiFileList: DuiFileInstance[] | undefined = DuiFileManager.fileLists[duiFileId];

        if (!(duiFileList && duiFileList.length > 0)) return undefined;
        duiFileList[index]=
        try {
            DuiFileManager.setFileList(duiFileId, [
                ...localFiles.map(
                    (x) =>
                        new DuiFileInstance({ ...x, uploadStatus: UPLOADSTATUS.preparing })
                ),
            ]);
            return DuiFileManager.fileLists[duiFileId];
        } catch (error) {
            console.error("Error on get List", error);
            return undefined;
        }

    } */
}