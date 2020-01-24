import {
    FORMIO_FORM_CONTROL_TYPE_FILE_UPLOAD,
    FormioFileUploadModel
} from "./formio-file-upload.model";

describe("FormioFileUploadModel test suite", () => {

    let model: FormioFileUploadModel,
        config: any = {
            id: "upload"
        };

    beforeEach(() => model = new FormioFileUploadModel(config));

    it("should initialize correctly", () => {

        expect(model.autoUpload).toBe(true);
        expect(model.disabled).toBe(false);
        expect(model.id).toEqual(config.id);
        expect(model.label).toBeNull();
        expect(model.multiple).toBe(false);
        expect(model.name).toEqual(model.id);
        expect(model.removeUrl).toBeNull();
        expect(model.showFileList).toBe(true);
        expect(model.type).toEqual(FORMIO_FORM_CONTROL_TYPE_FILE_UPLOAD);
        expect(model.url).toBeNull();
        expect(model.value).toBeNull();
    });

    it("should serialize correctly", () => {

        let json = JSON.parse(JSON.stringify(model));

        expect(json.id).toEqual(model.id);
        expect(json.type).toEqual(FORMIO_FORM_CONTROL_TYPE_FILE_UPLOAD);
        expect(json.value).toBeNull();
    });
});