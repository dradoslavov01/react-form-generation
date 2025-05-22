import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { DropdownFieldProps } from 'types';

const DropdownField: React.FC<DropdownFieldProps> = ({
  name,
  label,
  options,
  onChange,
  value,
  required,
}) => {
  return (
    <FormControl fullWidth margin='normal' key={name}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value || ''}
        onChange={(e) => onChange(name, e.target.value)}
        label={label}
        required={required}
      >
        {options?.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DropdownField;
