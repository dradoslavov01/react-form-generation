import React from 'react';
import { TextField } from '@mui/material';
import {
  Textarea,
  DropdownField,
  CheckboxField,
  RadioButtonField,
} from 'components';
import { DynamicFormFieldProps } from 'types';

const DynamicFormField: React.FC<DynamicFormFieldProps> = ({
  field,
  value,
  visible,
  onChange,
}) => {
  if (!visible) return null;

  switch (field.type) {
    case 'Text':
      return (
        <TextField
          fullWidth
          key={field.name}
          label={field.label}
          value={value || ''}
          onChange={(e) => onChange(field.name, e.target.value)}
          margin='normal'
          required={field.required}
        />
      );
    case 'Textarea':
      return (
        <Textarea
          value={value}
          onChange={(e) => onChange(field.name, e.target.value)}
          rows={4}
          placeholder={field.label}
          required={field.required}
        />
      );
    case 'Dropdown':
      return (
        <DropdownField
          name={field.name}
          label={field.label}
          options={field.options || []}
          value={value}
          onChange={(name, value) => onChange(name, value)}
          required={field.required}
        />
      );
    case 'Checkbox':
      return (
        <CheckboxField
          name={field.name}
          label={field.label}
          value={value}
          onChange={(name, value) => onChange(name, value)}
          required={field.required}
        />
      );
    case 'Radio button':
      return (
        <RadioButtonField
          value={value}
          name={field.name}
          label={field.label}
          options={field.options || []}
          onChange={(name, value) => onChange(name, value)}
        />
      );
    default:
      return null;
  }
};

export default DynamicFormField;
