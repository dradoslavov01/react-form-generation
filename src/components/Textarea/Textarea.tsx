import React from 'react';
import { TextareaProps } from 'types';
import './Textarea.css';

const Textarea: React.FC<TextareaProps> = ({
  value,
  onChange,
  rows,
  placeholder,
  required,
}) => {
  return (
    <textarea
      className='textarea'
      value={value || ''}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      required={required}
    />
  );
};

export default Textarea;
