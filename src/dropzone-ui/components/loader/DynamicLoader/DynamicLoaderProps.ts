import { IconProps } from "../../../icons/IconProps/IconProps";
import { LoaderProps } from "../LoaderProps";

export interface DynamicLoaderProps extends IconProps, LoaderProps{
    percentage?:number;
    hidePerncentage?:boolean;
}