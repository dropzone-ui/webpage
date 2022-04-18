import { DynamicSheet, DynamiCSS } from "@dynamicss/dynamicss";
import { asureColor, colourNameToHex, hexColorToRGB } from "@dropzone-ui/core";
import * as React from "react";
import { DropzoneProps } from "../Dropzone/DropzoneProps";

/**
 * 
 * @param color The color theme
 * @param backgroundColor the background Color
 * @param minHeight the min heigth for dropzone container
 * @param offset 
 * @param isDragging 
 * @param clickable 
 * @param className 
 * @returns a valid classnname for the component
 */
const useDropzoneNeoClassName = (
    color: string | undefined,
    backgroundColor: string | undefined,
    minHeight: string | undefined,
    offset: number,
    isDragging: boolean,
    clickable: boolean,
    className?: string
): string => {
    const [idStyles, setIdStyles] = React.useState<string>("");
    const [styleInjected, setStyleInjected] = React.useState<boolean>(false);
    const [classNameCreated, setClassNameCreated] = React.useState<string>("");

    React.useEffect(() => {
        const handleInserStyle = (
            color: DropzoneProps["color"],
            backgroundColor: string | undefined,
            //maxHeight: string | undefined,
            minHeight: string | undefined,
            offset: number,
            isDragging: boolean,
            clickable: boolean,
            // disableRipple: boolean
            className?: string
        ) => {
            console.log("called handleInserStyle");
            let finalClassName: string = "dropzone-ui-root";
            let styleSheet: DynamicSheet = {
                id: "dropzone-ui-styles",
                sheetRules: [
                    {
                        className: `dropzone-ui-extra`,
                        rules: {
                            outline: `1px dashed ${hexColorToRGB(
                                asureColor(colourNameToHex(color)),
                                1
                            )}`,
                            backgroundColor: backgroundColor,
                            // maxHeight: maxHeight,
                            //minHeight: `calc(${minHeight} + 50px)`
                            minHeight: `calc(${minHeight} + ${offset}px)`,
                            //justifyContent: (offset === 0 || offset === 50) ? "center" : "flex-start",
                        },
                    },
                    {
                        className: `dui-container-drag`,
                        rules: {
                            outline: "none",
                        },
                    }
                ],
            };
            let idStyle: string = "";
            if (!styleInjected) {
                idStyle = DynamiCSS.insertStyleSheet(styleSheet);
                setIdStyles(idStyle);
                if (idStyle !== "")
                    setStyleInjected(true);

            } else {
                //already a stylesheet associated
                DynamiCSS.editStyleSheet(idStyles, styleSheet.sheetRules || []);
            } 
            finalClassName += ` dropzone-ui-extra`;
            if (isDragging) {
                finalClassName += " dui-container-drag";
            }
            if (clickable) {
                finalClassName += " clickable";
            }
            if (className) {
                finalClassName += ` ${className}`;
            }
            setClassNameCreated(finalClassName);
        };


        handleInserStyle(color, backgroundColor, minHeight, offset, isDragging, clickable, className
            // disableRipple
        );
        /*   return () => {
              removeStyle();
          } */
        // eslint-disable-next-line
    }, [color, backgroundColor, minHeight, offset, isDragging, clickable, className
        //disableRipple

    ]);

    return classNameCreated;
}
export default useDropzoneNeoClassName;