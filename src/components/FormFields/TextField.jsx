import React from 'react';
import { TextField as MuiTextField } from '@mui/material';
 
export const TextField = ({ field, value, onChange }) => (
  <MuiTextField
    type={field.type}
    label={field.label}
    value={value || ''}
    onChange={(e) => onChange(field.name, e.target.value)}
    required={field.required}
    fullWidth
  />
);