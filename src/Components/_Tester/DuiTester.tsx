import * as React from "react";
import { Dropzone, FileItem } from "../../dropzone-ui";

const DuiTester:React.FC<any> = (props:any) =>{
    return(
        <div>
        <Dropzone>
            <FileItem></FileItem>
        </Dropzone>
        </div>
    )
}
export default DuiTester;