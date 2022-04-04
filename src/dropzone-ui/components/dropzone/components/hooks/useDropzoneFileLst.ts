import * as React from "react";
import { DuiFileManager } from "../../../../utils/dropzone-ui-types/DuiFile";

const useDropzoneFileListId = (

): number => {
    const [duiFileId, setDuiFileID] = React.useState<number | undefined>(
        undefined
    );
    React.useEffect(() => {
        if (!duiFileId) {
            const newId: number = DuiFileManager.createFileListMap();
            setDuiFileID(newId);
        }
        // eslint-disable-next-line
    }, [duiFileId]);

    return duiFileId || 0;
}
export default useDropzoneFileListId;