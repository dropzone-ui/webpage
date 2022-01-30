import { OverridableComponentProps } from "../../base/OverridableComponentProps";

export interface FullScreenProps extends OverridableComponentProps{
    /**
      * boolean value. Whether to open the preview or not
      */
     open?: boolean;
     /**
     * handler for on Close operation
     */
    onClose?: Function;

}