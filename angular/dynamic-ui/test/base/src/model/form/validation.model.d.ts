export interface ValidationModel {
    required?: boolean;
    pattern?: string;
    maxLength?: string;
    minLength?: string;
    custom?: string | Array<Validation>;
    customPrivate?: boolean;
}
export interface Validation {
    name: string;
    args: any;
}
