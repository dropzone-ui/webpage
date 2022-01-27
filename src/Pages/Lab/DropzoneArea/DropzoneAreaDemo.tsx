import * as React from "react";
/* import { Dropzone, DropzoneArea } from "../../../mega-dropzone-ui/components/dropzone";
import { FileValidated } from "../../../mega-dropzone-ui/utils/file-validation/validation.types";
import { makeFileList } from "../makeFilelList"; */

const DropzoneAreaDemo = (props: any) => {
  /* const [filesValidated, setFilesValidated] = React.useState<FileValidated[]>([]);
  const handleChange = async(fileValidatedList: FileValidated[]) => {
    setFilesValidated(fileValidatedList);
    const myFileArray: File[] = fileValidatedList.map(
      (f: FileValidated) => f.file
    );
    //let otherFiles: FileList = new FileList();
    //makeFileList(myFileArray)
    let myFileList: FileList = await makeFileList(myFileArray);
    console.log("FileList from Array of Files", myFileList); 
  }; */
  // .... more code

  return (
    <div>
      {/* <DropzoneArea value={filesValidated} onChange={handleChange}>
        Drag'drop files
      </DropzoneArea>
      <Dropzone>
        Dropzone
      </Dropzone>
      <ul>
        {filesValidated.map((f: FileValidated) => (
          <li key={f.id}>{`${f.file.name} - ${f.valid}`}</li>
        ))}
      </ul> */}
    </div>
  );
};
export default DropzoneAreaDemo;
