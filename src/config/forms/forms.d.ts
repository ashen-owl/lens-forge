export type RxValuesFormField = {
  name: string;
  id: string;
  options: string[];
  disabledFor?: DisabledItem[];
  default: string[];
};

export type FormsItem = {
  type: string;
  id: string;
  label?: string;
  redirectTo?: string;
  options?: string[];
  fields?: RxValuesFormField[];
};
