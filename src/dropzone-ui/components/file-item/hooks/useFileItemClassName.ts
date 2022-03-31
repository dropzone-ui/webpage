import * as React from "react";

const useFileItemClassName = (resultOnTooltip: boolean): string => {
    const [classNameCreated, setClassNameCreated] = React.useState<string>("");

    React.useEffect(() => {
        let baseClassName: string = "file-item-full-container-container";
        if (resultOnTooltip) {
            baseClassName += " dz-ui-tooltip";
        }
        setClassNameCreated(baseClassName);
    }, [resultOnTooltip]);
    return classNameCreated;
}
export default useFileItemClassName;