export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export interface BlocksConfig {
  default: boolean;
  text: boolean;
  link: boolean;
  image: boolean;
  // LAYOUT
  container: boolean;
  row: boolean;
  column: boolean;
  column_break: boolean;
  media_object: boolean;
  // COMPONENTS
  alert: boolean;
  tabs: boolean;
  badge: boolean;
  button: boolean;
  button_group: boolean;
  button_toolbar: boolean;
  card: boolean;
  card_container: boolean;
  collapse: boolean;
  dropdown: boolean;
  video: boolean;
  // TYPOGRAPHY
  header: boolean;
  paragraph: boolean;
  // BASIC
  list: boolean;
  // FORMS
  form: boolean;
  input: boolean;
  form_group_input: boolean;
  input_group: boolean;
  textarea: boolean;
  select: boolean;
  label: boolean;
  checkbox: boolean;
  radio: boolean;
}

export interface LabelsConfig {
  // LAYOUT
  container: string;
  row: string;
  column: string;
  column_break: string;
  media_object: string;

  // COMPONENTS
  alert: string;
  tabs: string;
  tab: string;
  tabPane: string;
  badge: string;
  button: string;
  button_group: string;
  button_toolbar: string;
  card: string;
  card_container: string;
  collapse: string;
  dropdown: string;
  dropdown_menu: string;
  dropdown_item: string;

  // MEDIA
  image: string;
  video: string;

  // TYPOGRAPHY
  text: string;

  // BASIC
  header: string;
  paragraph: string;
  link: string;
  list: string;

  // FORMS
  form: string;
  input: string;
  file_input: string;
  form_group_input: string;
  input_group: string;
  textarea: string;
  select: string;
  select_option: string;
  option: string;
  label: string;
  checkbox: string;
  radio: string;
  trait_method: string;
  trait_enctype: string;
  trait_multiple: string;
  trait_action: string;
  trait_state: string;
  trait_id: string;
  trait_for: string;
  trait_name: string;
  trait_placeholder: string;
  trait_value: string;
  trait_required: string;
  trait_type: string;
  trait_options: string;
  trait_checked: string;
  type_text: string;
  type_email: string;
  type_password: string;
  type_number: string;
  type_date: string;
  type_hidden: string;
  type_submit: string;
  type_reset: string;
  type_button: string;
}

export interface BlockCategoriesConfig {
  layout: boolean;
  media: boolean;
  components: boolean;
  typography: boolean;
  basic: boolean;
  forms: boolean;
}

export interface PluginConfig {
  blocks: BlocksConfig;

  labels: LabelsConfig;

  blockCategories: BlockCategoriesConfig;

  optionsStringSeparator: string;

  gridDevices: boolean;
  gridDevicesPanel: boolean;

  classNavigation: string;
  classTabPanes: string;
  classTabPane: string;
  classTab: string;

  formPredefinedActions: { value: string; name: string }[];
}

export type PartialPluginConfig = DeepPartial<PluginConfig>;

// setup the traits types

export interface FormFieldTraitValue {
  name: string;
  label: string;
  type?: string;
  changeProp?: number;
}

export type FormFieldTrait = {
  id: Omit<FormFieldTraitValue, "type" | "changeProp">;
  for: Omit<FormFieldTraitValue, "type" | "changeProp">;
  name: Omit<FormFieldTraitValue, "type" | "changeProp">;
  placeholder: Omit<FormFieldTraitValue, "type" | "changeProp">;
  value: Omit<FormFieldTraitValue, "type" | "changeProp">;
  required: Required<Omit<FormFieldTraitValue, "changeProp">>;
  checked: Required<FormFieldTraitValue>;
};
