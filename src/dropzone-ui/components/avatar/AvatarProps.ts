import * as React from "react";
import { OverridableComponentProps } from "../../utils/overridable-component/OverridableComponentProps";

export interface AvatarProps extends OverridableComponentProps {
    src?: string;
    /**
     * 
     */
    onDrop?: Function;
    onDelete?: Function;
    onClick?: Function;

    alt?: string;
    children?: React.ReactNode;
    varinat?: "circular" | "rounded" | "square";
}