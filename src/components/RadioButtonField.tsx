import React from 'react';
import {
  FormControl,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { RadioButtonFieldProps } from 'types';

const RadioButtonField: React.FC<RadioButtonFieldProps> = ({
  value,
  name,
  label,
  options,
  onChange,
}) => {
  return (
    <FormControl component='fieldset' margin='normal' key={name}>
      <Typography variant='subtitle1'>{label}</Typography>
      <RadioGroup
        row
        value={value || ''}
        onChange={(e) => onChange(name, e.target.value)}
      >
        {options?.map((option) => (
          <FormControlLabel
            key={option}
            value={option}
            control={<Radio />}
            label={option}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioButtonField;
