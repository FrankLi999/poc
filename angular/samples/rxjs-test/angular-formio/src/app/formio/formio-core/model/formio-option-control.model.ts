import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/operator/map";
import { ClsConfig } from "./formio-form-control.model";
import {
  FormioFormValueControlModel,
  FormioFormValueControlModelConfig
} from "./formio-form-value-control.model";
import { serializable, serialize } from "../decorator/serializable.decorator";
import { Utils } from "../utils/core.utils";

export interface FormioFormOptionConfig<T> {

    disabled?: boolean;
    label?: string;
    value: T;
}

export class FormioFormOption<T> {

    @serializable() disabled: boolean;
    @serializable() label: string | null;
    @serializable() value: T;

    constructor(config: FormioFormOptionConfig<T>) {

        this.disabled = Utils.isBoolean(config.disabled) ? config.disabled : false;
        this.label = config.label || null;
        this.value = config.value;
    }

    get text() {
        return this.label;
    }

    set text(text: string) {
        this.label = text;
    }

    toJSON() {
        return serialize(this);
    }
}

export interface FormioOptionControlModelConfig<T> extends FormioFormValueControlModelConfig<T | T[]> {

    options?: FormioFormOptionConfig<T>[] | Observable<FormioFormOptionConfig<T>[]>;
}

export abstract class FormioOptionControlModel<T> extends FormioFormValueControlModel<T | T[]> {

    @serializable("options") _options: FormioFormOption<T>[] = [];
    options$: Observable<FormioFormOption<T>[]>;

    constructor(config: FormioOptionControlModelConfig<T>, cls?: ClsConfig) {

        super(config, cls);

        this.options = config.options;
    }

    private updateOptions$(): void {
        this.options$ = Observable.of(this.options);
    }

    set options(options: any) {

        if (Array.isArray(options)) {

            this._options = (options as FormioFormOptionConfig<T>[]).map(optionConfig => {
                return new FormioFormOption<T>(optionConfig);
            });

            this.updateOptions$();

        } else if (options instanceof Observable) {

            this.options$ = (options as Observable<FormioFormOptionConfig<T>[]>).map(optionsConfig => {

                let options = optionsConfig.map(optionConfig => new FormioFormOption<T>(optionConfig));
                this._options = options;

                return options;
            });

        } else {

            this.updateOptions$();
        }
    }

    get options(): any {
        return this._options;
    }

    add(optionConfig: FormioFormOptionConfig<T>): FormioFormOption<T> {
        return this.insert(this.options.length, optionConfig);
    }

    get(index: number): FormioFormOption<T> {
        return this.options[index];
    }

    insert(index: number, optionConfig: FormioFormOptionConfig<T>): FormioFormOption<T> {

        let option = new FormioFormOption(optionConfig);

        this.options.splice(index, 0, option);
        this.updateOptions$();

        return option;
    }

    remove(...indices: number[]): void {

        indices.forEach(index => this.options.splice(index, 1));
        this.updateOptions$();
    }

    abstract select(...indices: number[]): void;
}