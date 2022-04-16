import * as React from "react";
import { FileItemProps } from "../components/FileItem/FileItemProps";

const useFileItemNeoClassName = (resultOnTooltip: boolean, elevation:FileItemProps["elevation"]): string => {
    const [classNameCreated, setClassNameCreated] = React.useState<string>("");

    React.useEffect(() => {
        let baseClassName: string = "file-item-full-container-container";
        if (resultOnTooltip) {
            baseClassName += " dz-ui-tooltip";
        }
        if(elevation && [1,2,3,4,"1","2","3","4"].includes(elevation)){
            baseClassName += ` dz-ui-paper-elevation-${elevation}`;
        }
        setClassNameCreated(baseClassName);
    }, [resultOnTooltip]);
    return classNameCreated;
}
export default useFileItemNeoClassName;