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
     * Updates(replaces) the duiFile list on preparing stage and returns the new array
     * @param duiFileId the id to access the right list
     * @param localFiles the list of duiFiles
     * @returns a list of DuiFileInstance
     */
    public static setFileListMapPreparing(
        duiFileId: number,
        localFiles: DuiFileType[],
        validateFiles: boolean
    ): DuiFileInstance[] | undefined {
        if (!(typeof duiFileId === "number")) return undefined;
        try {
            DuiFileManager.setFileList(duiFileId, [
                ...localFiles.map(
                    (f: DuiFileType) => {
                        if (f.uploadStatus !== UPLOADSTATUS.success) {
                            if (validateFiles) {
                                if (f.valid)
                                    return new DuiFileInstance({ ...f, uploadStatus: UPLOADSTATUS.preparing })

                            } else
                                return new DuiFileInstance({ ...f, uploadStatus: UPLOADSTATUS.preparing })
                        }
                        return new DuiFileInstance(f);
                    }
                ),
            ]);
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