import { DynamicSheet, DynamiCSS } from "@dynamicss/dynamicss";
import * as React from "react";
import InputButtonStyleManager from "../utils/InputButtonStyleManager";
const useInputButtonClassName = (
    variant?: "contained" | "text" | "outlined",
    disabled?: boolean,
    color?: string,
    textColor?: string,
    textDecoration?: "uppercase" | "capitalize" | "lowercase" | "none",
    className?: string,
    idClassName?: number
): [string, boolean] => {
    console.table({
        variant,
        disabled,
        color,
        textDecoration,
        textColor,
        className,
        idClassName
    });
    const [idStyles, setIdStyles] = React.useState<string>("");
    const [styleInjected, setStyleInjected] = React.useState<boolean>(false);
    const [classNameCreated, setClassNameCreated] = React.useState<string>("");
    //const [nextClassName, setNextClassName] = React.useState<number>(0);
    const removeStyle = () => {
        if (styleInjected) {
            DynamiCSS.removeStyleSheet(idStyles);
            setStyleInjected(false);
            setIdStyles("");
        }
    };

    React.useEffect(() => {
        return () => removeStyle();
        // eslint-disable-next-line
    }, [idStyles]);
    /*     React.useEffect(() => {
            if (nextClassName !== 0) {
                let finalClassName = `dui-button-root dui-button `;
                if (!disabled) {
                    finalClassName += `${variant} ${variant}-${nextClassName}`;
                } else {
                    finalClassName += `disabled`;
                }
                //classname to override styles in stylesheet
                if (className && className.length > 0) {
                    finalClassName += ` ${className}`;
                }
                //some text in className
                if (text) {
                    finalClassName += ` ${text}`;
                }
                setClassNameCreated(finalClassName);
            }
        }, [nextClassName, className]); */
    React.useEffect(() => {

        const handleInserStyle = (
            idClassName: number,
            variant?: "contained" | "text" | "outlined",
            disabled?: boolean,
            color?: string,
            textDecoration?: "uppercase" | "capitalize" | "lowercase" | "none",
            textColor?: string,

        ) => {
            let styleSheet: DynamicSheet;
            let idStyle: string = "";
            let nextClassNameVar: number = idClassName;

            if (//nextClassName === 0 && 
                !styleInjected) {
                
                styleSheet = InputButtonStyleManager.makeDynamicStyle(
                    nextClassNameVar,
                    variant,
                    disabled,
                    color,
                    textColor
                );
                idStyle = DynamiCSS.insertStyleSheet(styleSheet);
                //setNextClassName(nextClassNameVar);
                setIdStyles(idStyle);
                if (idStyle !== "")
                    setStyleInjected(true);
            } else {
                //already a stylesheet associated
             
                styleSheet = InputButtonStyleManager.makeDynamicStyle(
                    nextClassNameVar,
                    variant,
                    disabled,
                    color,
                    textColor
                );
                DynamiCSS.editStyleSheet(idStyles, styleSheet.sheetRules || []);
            }
            let finalClassName = `dui-button-root dui-button `;
            if (!disabled) {
                //finalClassName += `${variant} ${variant}-${nextClassName}`;
                finalClassName += `${variant} ${variant}-${idClassName}`;
            } else {
                finalClassName += `disabled`;
            }
            //classname to override styles in stylesheet
            if (className && className.length > 0) {
                finalClassName += ` ${className}`;
            }
            //some text in className
            if (textDecoration) {
                finalClassName += ` ${textDecoration}`;
            }
            setClassNameCreated(finalClassName);
        };

        if (idClassName)
            handleInserStyle(idClassName, variant, disabled, color, textDecoration, textColor);

        // eslint-disable-next-line
    }, [variant, disabled, color, textDecoration, textColor, className, idClassName]);

    return [classNameCreated, styleInjected];
}
export default useInputButtonClassName;