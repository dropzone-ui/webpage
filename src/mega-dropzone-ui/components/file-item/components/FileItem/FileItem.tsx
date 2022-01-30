import * as React from "react";
import ImagePreview from "../../../../previews/ImagePreview/ImagePreview";
import { FileItemProps } from "./FileItemProps";

const FileItem:React.FC<FileItemProps> = (props:FileItemProps) =>{
    return(
        <div>
        <ImagePreview/>
        <ImagePreview/>
        </div> 
    )
}
export default FileItem;