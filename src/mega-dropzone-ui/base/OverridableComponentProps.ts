/**
 * Base props to override in all components
 * and take advantage of
 * merging props characteristic
 */
 export declare type OverridableComponentProps ={
    /**
     * the react node children
     */
    children?: React.ReactNode | string;
    /**
     * the in-line style object
     */
    style?: React.CSSProperties;
    /**
     * the color theme
     * in somecases is the background-color
     * in others is the text-color
     */
    color?: string;
    /**
     * the text color
     */
    textColor?: string;
    /**
     * a classname to override the css styles
     * in .css or .sass file instead of using
     * in-line styles
     */
    className?: string;
}