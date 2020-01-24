export interface ValidationModel {
  required?: boolean; // orig
  pattern?: string;
  maxLength?: string;
  minLength?: string,
  custom?: string | Array<FormioValidationModel>; 
  customPrivate?: boolean;
}

export interface FormioValidationModel {
  name: string;
  args: any
}