import { Method } from "./method"

export declare type DuiUploadConfig={
    url?: string;
    method?: Method,
    headers?: Record<string, string>,
    uploadLabel?: string
}