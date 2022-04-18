import { asureColor, colourNameToHex, darkerColor, hexColorToRGB } from "@dropzone-ui/core";
import { DynamicSheet, DynamicSheetRule } from "@dynamicss/dynamicss";

export default class InputButtonStyleManager {
    static nextButtonClassNameNumber = 0;
    /**
     * Increases the count and retrieves the next number
     * @returns the next static number in styles
     */
    static getNextId(): number {
        InputButtonStyleManager.nextButtonClassNameNumber++;
        console.log("Id called " + InputButtonStyleManager.nextButtonClassNameNumber);
        return InputButtonStyleManager.nextButtonClassNameNumber;
    }
    /**
     * 
     * @param idClassName 
     * @param variant 
     * @param disabled 
     * @param color 
     * @param textColor 
     * @returns 
     */
    static makeDynamicStyle = (
        idClassName: number, 
        variant?: string,
        disabled?: boolean,
        color?: string,
        textColor?: string,
        //nextClassName?: number
    ): DynamicSheet => {
        //([{ variant, disabled, color, textColor, nextClassName }]);
        let styleSheet: DynamicSheet = {
            id: `dui-button-styles-${idClassName}`,
           // id: `dui-button-styles`,
            sheetRules: [{
                className: `dui-button.${variant}-${idClassName}`,
                //className: `dui-button.${variant}`,
                rules: {},
            },
            {
                className: `dui-button-root.${variant}-${idClassName}`,
               // className: `dui-button-root.${variant}`,
                rules: {},
            },],
        };
        let sheetRules: DynamicSheetRule[] = styleSheet.sheetRules as DynamicSheetRule[];

        if (!disabled) {
            switch (variant) {
                case "contained":   
                    sheetRules[0].rules = {
                        color: asureColor(colourNameToHex(textColor)),
                        backgroundColor: hexColorToRGB(
                            asureColor(colourNameToHex(color)),
                            1
                        ),
                        //textDecoration: text && ["uppercase", "capitalize", "lowercase", "none"].includes(text) ? text : "uppercase"
                    };
                    sheetRules[1].rules = {
                        ":hover": {
                            backgroundColor: darkerColor(
                                hexColorToRGB(
                                    asureColor(colourNameToHex(color)),
                                    1
                                )
                            ),
                        },
                    };
                    break;
                case "outlined":
                    sheetRules[0].rules = {
                        border: `1px solid ${hexColorToRGB(
                            asureColor(colourNameToHex(color)),
                            0.5
                        )}`,
                        color: asureColor(colourNameToHex(color)),
                        backgroundColor: "transparent",
                    };
                    sheetRules[1].rules = {
                        ":hover": {
                            border: `1px solid ${hexColorToRGB(
                                asureColor(colourNameToHex(color)),
                                1
                            )}`,
                            backgroundColor: hexColorToRGB(
                                asureColor(colourNameToHex(color)),
                                0.085
                            ),
                        },
                    };
                    break;
                case "text":
                    sheetRules[0].rules = {
                        color: asureColor(colourNameToHex(color)),
                        backgroundColor: "transparent",
                    };
                    sheetRules[1].rules = {
                        ":hover": {
                            backgroundColor: hexColorToRGB(
                                asureColor(colourNameToHex(color)),
                                0.085
                            ),
                        },
                    };
                    break;
            }
        }
        styleSheet.sheetRules = sheetRules;
        return styleSheet;
    }
}