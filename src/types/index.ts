interface Field {
  type: string;
  label: string;
  name: string;
  options?: string[];
  required: boolean;
  dependencies?: string[];
  visibleIf?: Record<string, any>;
  group?: string;
  autofillAPI?: {
    endpoint: string;
    inputs: string[];
  };
  children?: Field[];
}

export interface FormSchema {
  fields: Field[];
}

export interface DynamicFormFieldProps {
  field: Field;
  value: any;
  visible: boolean;
  onChange: (name: string, value: any) => void;
}

export interface TextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  placeholder?: string;
  required?: boolean;
}

export interface CheckboxProps {
  name: string;
  label: string;
  value: boolean;
  onChange: (name: string, value: boolean) => void;
  required?: boolean;
}

export interface DropdownFieldProps {
  name: string;
  label: string;
  options: string[];
  onChange: (name: string, value: string) => void;
  value: string;
  required?: boolean;
}

export interface JsonSchemaInputCardProps {
  jsonInput: string;
  setJsonInput: (value: string) => void;
}

export interface RadioButtonFieldProps {
  name: string;
  label: string;
  options: string[];
  onChange: (name: string, value: string) => void;
  value: string;
}


