import { createDPF as createPDF, createWord, createListOfMultiTypeFile, createSyntheticFile, makeSynthticFileValidate } from "./utils";
//import { makeSynthticFileValidate } from "./components/dropzone/components/utils/validation.utils";

import { DropzoneLocalizerSelector, DropzoneLocalizer, DropzoneItalian, DropzoneFrench, DropzoneEnglish, DropzoneSpanish, DropzonePortuguese, DropzoneRussian, DropzoneSimplifiedChinese, DropzoneTraditionalChinese, FileItemLocalizerSelector, FileItemLocalizer, FileItemItalian, FileItemFrench, FileItemEnglish, FileItemSpanish, FileItemPortuguese, FileItemRussian, FileItemSimplifiedChinese, FileItemTraditionalChinese, ValidateErrorLocalizerSelector, ValidateErrorLocalizer, ValidateErrorItalian, ValidateErrorFrench, ValidateErrorEnglish, ValidateErrorSpanish, ValidateErrorPortuguese, ValidateErrorRussian, ValidateErrorSimplifiedChinese, ValidateErrorTraditionalChinese } from "./localization";

import { UploadPromiseAxiosResponse as UploadPromiseAxiosResponseType, FileDuiResponse as FileDuiResponseType, DropzoneUIResponse as DropzoneUIResponseType } from "./components/dropzone/components/utils/dropzone-ui.upload.utils";
import { FileItemProps } from "./components/file-item/components/FileItem/FileItemProps";


/* import {
    FileValidated as FileValidatedType,
    UPLOADSTATUS
} from "./components/dropzone/components/utils/validation.utils"; */
import { UPLOADSTATUS, FileValidated } from "./utils";
export type UploadPromiseAxiosResponse = UploadPromiseAxiosResponseType;
export type FileDuiResponse = FileDuiResponseType;
export type DropzoneUIResponse = DropzoneUIResponseType;
export { UPLOADSTATUS };
export type { FileValidated };
//export type FileValidated = FileValidatedType;

export { createPDF, createWord, createListOfMultiTypeFile, createSyntheticFile, makeSynthticFileValidate };
export { DropzoneLocalizerSelector, DropzoneLocalizer, DropzoneItalian, DropzoneFrench, DropzoneEnglish, DropzoneSpanish, DropzonePortuguese, DropzoneRussian, DropzoneSimplifiedChinese, DropzoneTraditionalChinese, FileItemLocalizerSelector, FileItemLocalizer, FileItemItalian, FileItemFrench, FileItemEnglish, FileItemSpanish, FileItemPortuguese, FileItemRussian, FileItemSimplifiedChinese, FileItemTraditionalChinese, ValidateErrorLocalizerSelector, ValidateErrorItalian, ValidateErrorLocalizer, ValidateErrorFrench, ValidateErrorEnglish, ValidateErrorSpanish, ValidateErrorPortuguese, ValidateErrorRussian, ValidateErrorSimplifiedChinese, ValidateErrorTraditionalChinese, }

export { default as Dropzone } from "./components/dropzone/components/Dropzone/Dropzone";
export * from "./components/dropzone/components/Dropzone/Dropzone";

export { default as DropzoneLabel } from "./components/dropzone/components/DropzoneLabel/DropzoneLabel";
export * from "./components/dropzone/components/DropzoneLabel/DropzoneLabel";

export { default as FileItem } from "./components/file-item/components/FileItem/FileItem";
export * from "./components/file-item/components/FileItem/FileItem";
export type {FileItemProps};
export { default as FileItemImage } from "./components/file-item/components/FileItemImage/FileItemImage";
export * from "./components/file-item/components/FileItemImage/FileItemImage";

export { default as FileItemContainer } from "./components/file-item/components/FileItemContainer/FileItemContainer";
export * from "./components/file-item/components/FileItemContainer/FileItemContainer";

export { default as FullScreenPreview } from "./components/image-preview/FullScreenPreview";
export * from "./components/image-preview/FullScreenPreview";

export { default as VideoPreview } from "./components/video-preview/VideoPreview";
export * from "./components/video-preview/VideoPreview";

export { default as InputButton } from "./components/input-button/InputButton";
export * from "./components/input-button/InputButton";

export { uploadPromiseXHR } from "./utils/file-upload/dropzone-ui-upload.utils";