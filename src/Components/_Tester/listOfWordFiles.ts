import { createWord } from "@dropzone-ui/react";
import { UPLOADSTATUS } from "../../dropzone-ui";
import { FileItemProps } from "../../dropzone-ui/components/file-item/components/FileItem/FileItemProps";
export const listOfWord: FileItemProps[] = [
  {
    id: 80,
    valid: false,
    file: createWord(),
    uploadStatus: undefined,
    errors: ["docx files are not allowed", "file is too big"],
  },
  {
    imageUrl: "https://depor.com/resizer/BbDv4ZUAXoXb8T5xE_zjEmnHuUE=/980x0/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/7PQKSZTCEFFTJIJJRC4WN2BCLI.jpg"
    , id: 82, valid: true, file: createWord(), uploadStatus: undefined
  },
  {
    id: 83,
    valid: true,
    file: createWord(),
    uploadStatus: UPLOADSTATUS.uploading,
    imageUrl: "https://depor.com/resizer/BbDv4ZUAXoXb8T5xE_zjEmnHuUE=/980x0/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/7PQKSZTCEFFTJIJJRC4WN2BCLI.jpg"

  },
  {
    id: 87,
    valid: true,
    file: createWord(),
    uploadStatus: UPLOADSTATUS.uploading,
    // imageUrl:"https://depor.com/resizer/BbDv4ZUAXoXb8T5xE_zjEmnHuUE=/980x0/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/7PQKSZTCEFFTJIJJRC4WN2BCLI.jpg"

  },
  {
    id: 84,
    valid: true,
    file: createWord(),
    uploadStatus: UPLOADSTATUS.success,
    uploadMessage: "dropzone-ui <3",
  },
  {
    id: 85,
    valid: true,
    file: createWord(),
    uploadStatus: UPLOADSTATUS.error,
    uploadMessage: "there was an error on the server",
  },
];
