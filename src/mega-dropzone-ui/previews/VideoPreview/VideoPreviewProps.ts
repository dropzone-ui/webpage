import { OverridableComponentProps } from "../../base/OverridableComponentProps";

export interface  VideoPreviewProps extends OverridableComponentProps {
    /**
     * video source in string format or File object
     * FileItemComponent returns this value in onWatch handler
     */
     videoSrc: File | string;
     /**
      * boolean value. Whether to play automatically the video or not.
      */
     autoplay?: boolean;
     /**
      * boolean value. Whether to display the controls in the video player or not.
      */
     controls?: boolean;
}