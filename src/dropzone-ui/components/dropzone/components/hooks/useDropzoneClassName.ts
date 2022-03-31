import { DynamicSheet, DynamiCSS } from "@dynamicss/dynamicss";
import { asureColor, colourNameToHex, hexColorToRGB } from "@dropzone-ui/core";
import { useEffect, useState } from "react";
import { DropzoneProps } from "../Dropzone/DropzoneProps";

/**
 * 
 * @param color The color theme
 * @param backgroundColor the background Color
 * @param maxHeight the max heigth for dropzone container
 * @param minHeight the min heigth for dropzone container
 * @returns a valid classnname for the component
 */
const useDropzoneClassName = (
    color: string | undefined,
    backgroundColor: string | undefined,
    maxHeight: string | undefined,
    minHeight: string | undefined,
    offset: number,
    isDragging: boolean,
    clickable: boolean,
    disableRipple: boolean
    , className?: string
): string => {
    const [idStyles, setIdStyles] = useState<string>("");
    const [styleInjected, setStyleInjected] = useState<boolean>(false);
    const [classNameCreated, setClassNameCreated] = useState<string>("");

    useEffect(() => {

        const handleInserStyle = (
            color: DropzoneProps["color"],
            backgroundColor: string | undefined,
            maxHeight: string | undefined,
            minHeight: string | undefined,
            offset: number,
            isDragging: boolean,
            clickable: boolean,
            // disableRipple: boolean
            className?: string
        ) => {
            let finalClassName: string = "dropzone-ui";
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
                            maxHeight: maxHeight,
                            //minHeight: `calc(${minHeight} + 50px)`
                            minHeight: `calc(${minHeight} + ${offset}px)`,
                            //justifyContent: (offset === 0 || offset === 50) ? "center" : "flex-start",
                        },
                    },
                    {
                        className: `drag`,
                        rules: {
                            outline: `2px dashed ${hexColorToRGB(
                                asureColor(colourNameToHex(color)),
                                1
                            )}`,
                            backgroundColor: hexColorToRGB(
                                asureColor(colourNameToHex(color)),
                                0.085
                            ),
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
                if (idStyle !== "") {
                    setStyleInjected(true);
                }
            } else {
                //already a stylesheet associated

                DynamiCSS.editStyleSheet(idStyles, styleSheet.sheetRules || []);
            } finalClassName += ` dropzone-ui-extra`;
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


        handleInserStyle(color, backgroundColor, maxHeight, minHeight, offset, isDragging, clickable, className
            // disableRipple
        );
        /*   return () => {
              removeStyle();
          } */
        // eslint-disable-next-line
    }, [color, backgroundColor, maxHeight, minHeight, offset, isDragging, clickable, className
        //disableRipple

    ]);

    return classNameCreated;
}
export default useDropzoneClassName;