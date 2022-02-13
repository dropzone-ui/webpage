import { createPDF } from "@dropzone-ui/react";
import { UPLOADSTATUS } from "../../dropzone-ui";

export const listOfPDF = [
  {
    id: 4,
    valid: true,
    file: createPDF(),
    uploadStatus: UPLOADSTATUS.success,
    uploadMessage: "dropzone-ui <3",
  },
  {
    id: 1,
    valid: false,
    file: createPDF(),
    uploadStatus: undefined,
    errors: ["pdf not allowed", "file is too big"],
  },
  { id: 2, valid: true, file: createPDF(), uploadStatus: undefined },
  {
    id: 3,
    valid: true,
    file: createPDF(),
    uploadStatus: UPLOADSTATUS.uploading,
  },
  {
    id: 5,
    valid: true,
    file: createPDF(),
    uploadStatus: UPLOADSTATUS.error,
    uploadMessage: "there was an error on the server",
  },
];
