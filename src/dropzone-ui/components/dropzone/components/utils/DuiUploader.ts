import { FileValidated } from "../../../../utils";
/**
 * @deprecated
 */
export default class DuiUploader {
    static counter = 0;
    static nextCounter = () => {
        DuiUploader.counter++;
        return DuiUploader.counter;
    }
    constructor() {
        console.log("creating uploader...", DuiUploader.nextCounter());
    }
    get files(): FileValidated[] {
        return this.files;
    }
    set files(_files: FileValidated[]) {
        this.files = _files;
    }

}