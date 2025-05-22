import React from 'react';
import {
  Checkbox as MUICheckbox,
  FormGroup,
  FormControlLabel,
} from '@mui/material';
import { CheckboxProps } from 'types';

const CheckboxField: React.FC<CheckboxProps> = ({
  name,
  label,
  value,
  onChange,
  required,
}) => {
  return (
    <FormGroup key={name}>
      <FormControlLabel
        control={
          <MUICheckbox
            checked={value}
            onChange={(e) => onChange(name, e.target.checked)}
            required={required}
          />
        }
        label={label}
      />
    </FormGroup>
  );
};

export default CheckboxField;
