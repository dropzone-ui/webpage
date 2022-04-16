import { OverridableComponentProps } from "@dropzone-ui/core";


export interface SkeletonProps extends OverridableComponentProps {
    /**
     * The animation.
     * If `false` the animation effect is disabled.
     * @default 'pulse'
     */
    animation?: 'pulse' | 'wave' | false;
    /**
     * The type of content that will be rendered.
     * @default 'rectangular'
     */
    variant?: 'rectangular' | 'circular';
    /**
     * Width of the skeleton.
     */
    width?: number | string;
    /**
      * Height of the skeleton.
      */
    height?: number | string;

}


export const SkeletonDefaultProps: SkeletonPropsType = {
    animation: "pulse",
    variant: "rectangular",
    width: "133px",
    height: "133px"
}
export declare type SkeletonPropsType = SkeletonProps;