export interface DayFieldModel {
  type: string;
  placeholder: string;
  required: boolean;
}

export interface DayModel {
  day: DayFieldModel;
  month: DayFieldModel;
  year: DayFieldModel;
}

