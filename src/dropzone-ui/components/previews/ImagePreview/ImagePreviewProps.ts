import { OverridableComponentProps } from "@dropzone-ui/core";


export interface ImagePreviewProps extends OverridableComponentProps {
    /**
     * Image source in string format (URL) or File Object (Will be read as URL)
     */
    src?: File | string;
    /**
     * Specifies an alternate text for the image, if the image for some reason cannot be displayed
     */
    alt?: string;
    /**
     * Height of the image preview. 
     * @default '100%'
     */
    height?: string;
    /**
     * Width of the image preview. 
     * @default '100%'
     */
    width?: string;
}
export const ImagePreviewDefaultProps: ImagePreviewProps = {
/*     width: "100%",
    height: "100%", */
    alt: "image-preview",
    className: "dui-image-preview"
}