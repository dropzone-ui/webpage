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
const useDropzoneLayerClassName = (
    color?: string,
    isDragging?: boolean,
    makeClassName?: boolean
): string => {
    const [idStyles, setIdStyles] = useState<string>("");
    const [styleInjected, setStyleInjected] = useState<boolean>(false);
    const [classNameCreated, setClassNameCreated] = useState<string>("");

    useEffect(() => {

        const handleInserStyle = (
            color: string,
            isDragging?: boolean
        ) => {
            let finalClassName: string = "";
            let styleSheet: DynamicSheet = {
                id: "dropzone-ui-styles-layer",
                sheetRules: [
                    {
                        className: `dropzone-ui-layer`,
                        rules: {
                            backgroundColor: hexColorToRGB(
                                asureColor(colourNameToHex(color)),
                                0.4
                            ),
                            position: "absolute",
                            left: 0,
                            top: 0,
                            width: "0%",
                            height: "0%",
                            zIndex: 20,
                        },
                    },
                    {
                        className: `dui-layer-drag`,
                        rules: {
                            width: "100%",
                            height: "100%",
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
            }
            finalClassName += `dropzone-ui-layer`;

            if (isDragging) {
                finalClassName += ` dui-layer-drag`;
            }
            setClassNameCreated(finalClassName);
        };
        console.log("=>", isDragging);
        if (makeClassName) {
            handleInserStyle(color as string, isDragging);
        }

        // eslint-disable-next-line
    }, [color, isDragging, makeClassName]);

    return classNameCreated;
}
export default useDropzoneLayerClassName;