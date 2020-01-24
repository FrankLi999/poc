import { ClsConfig } from "../formio-form-control.model";
import { FormioFileControlModelConfig, FormioFileControlModel } from "../formio-file-control.model";
import { serializable } from "../../decorator/serializable.decorator";
import { Utils } from "../../utils/core.utils";

export const FORMIO_FORM_CONTROL_TYPE_FILE_UPLOAD = "FILE_UPLOAD";

export interface FormioFileUploadModelConfig extends FormioFileControlModelConfig {

    accept?: string[];
    autoUpload?: boolean;
    maxSize?: number;
    minSize?: number;
    removeUrl?: string;
    showFileList?: boolean;
    url?: string;
}

export class FormioFileUploadModel extends FormioFileControlModel {

    @serializable() accept: string[] | null;
    @serializable() autoUpload: boolean;
    @serializable() maxSize: number | null;
    @serializable() minSize: number | null;
    @serializable() removeUrl: string | null;
    @serializable() showFileList: boolean;
    @serializable() url: string | null;

    @serializable() readonly type: string = FORMIO_FORM_CONTROL_TYPE_FILE_UPLOAD;

    constructor(config: FormioFileUploadModelConfig, cls?: ClsConfig) {

        super(config, cls);

        this.accept = Array.isArray(config.accept) ? config.accept : null;
        this.autoUpload = Utils.isBoolean(config.autoUpload) ? config.autoUpload : true;
        this.maxSize = Utils.isNumber(config.maxSize) ? config.maxSize : null;
        this.minSize = Utils.isNumber(config.minSize) ? config.minSize : null;
        this.removeUrl = config.removeUrl || null;
        this.showFileList = Utils.isBoolean(config.showFileList) ? config.showFileList : true;
        this.url = config.url || null;
    }
}