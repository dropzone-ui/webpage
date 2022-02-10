import { FileValidated } from "../../../mega-dropzone-ui/utils/file-validation/validation.types";

export interface UploadPromiseAxiosResponse {
    serverResponse: FileDuiResponse;
    uploadedFile: FileValidated;
}
export interface FileDuiResponse {
    id: number | string | undefined;
    serverResponse: DropzoneUIResponse | {};
}
export interface DropzoneUIResponse {
    status: boolean;
    message: string;
    payload: any;
}
