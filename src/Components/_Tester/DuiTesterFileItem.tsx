import { FileValidated } from "@dropzone-ui/react";
import * as React from "react";
import { FileItem, FileItemContainer } from "../../dropzone-ui";
import { FileItemProps } from "../../dropzone-ui/components/file-item/components/FileItem/FileItemProps";
import IconList from "../Dui_IconsList/IconList";
import { listOfPDF } from "./listOfPDFfiles";
import { listOfWord } from "./listOfWordFiles";

const DuiTesterFileItem: React.FC<any> = (props: any) => {
  const handleDelete = (id: string | number | undefined) => {
    alert("deleted " + id);
  };
  const handleAbort = (id: string | number | undefined) => {
    alert("aborted " + id);
  };
  const [mProgress, setMyProgres] = React.useState(10);
  React.useEffect(() => {
      
    if (mProgress < 100) {
      setTimeout(() => {
        setMyProgres(mProgress + 15);
      }, 800);
    }
    console.log(mProgress);
  }, [mProgress]);
  return (
    <>
     <FileItemContainer view="grid" disableScroll>
      {listOfWord.map((f:FileItemProps, index:number) => (
        <FileItem
          {...f}
          key={f.id}
          onDelete={handleDelete}
          //alwaysActive
          //elevation={2}
          //localization={"ZH-cn"}
          resultOnTooltip
          
          progress={mProgress}
          onAbort={handleAbort}
          info
        />
      ))}
      {listOfPDF.map((f, index) => (
        <FileItem
          {...f}
          key={f.id}
          onDelete={handleDelete}
          //alwaysActive
          //elevation={2}
          //localization={"ZH-cn"}

          resultOnTooltip
          info
        />
      ))}
    </FileItemContainer>
    <IconList/>
    </>
   
  );
};
export default DuiTesterFileItem;
