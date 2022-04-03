import { OverridableComponentProps } from "@dropzone-ui/core";
import { FileValidated } from "../../../../utils";

export default interface DropzoneNeoProps extends OverridableComponentProps{
    backgroundColor?: any;
    disableScroll?: boolean;
    header?: boolean;
    footer?: boolean;
    minHeight?: string;
    maxHeight?: string;
    clickable?: boolean;
    disableRipple?: boolean;
    //max file size per file
    maxFileSize?: number;
    //max amount of files
    maxFiles?: number;
    //mimetypes accepted
    accept?: string;
    //disable the ripple effect
    validation?: boolean;

    onDragEnter?: (evt: React.DragEvent<HTMLDivElement>) => void;
    onDragLeave?: (evt: React.DragEvent<HTMLDivElement>) => void;
    colorOnDrag?: string;
    //FILES
    onChange?: (files: FileValidated[]) => void;
    value?: FileValidated[];
}