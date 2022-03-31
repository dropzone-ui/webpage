import DuiFile from "./DuiFile";
export declare type FileListMap = {
    [id: number]: DuiFile[] | undefined;
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
     * 
     * @param id id of the fileList
     * @param duiFiles list of DuiFiles forinitializing the array
     * @returns the id of the fileList
     */
    public static setFileList(id: number | undefined, duiFiles: DuiFile[]): number {
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
    public static getFileListMap(id?: number): DuiFile[] | undefined {
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
}