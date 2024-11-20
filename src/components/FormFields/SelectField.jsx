import React from 'react';
import { FormControl, FormLabel, Select, MenuItem } from '@mui/material';
 
export const SelectField = ({ field, value, onChange }) => (
  <FormControl fullWidth>
    <FormLabel>{field.label}</FormLabel>
    <Select
      value={value || ''}
      onChange={(e) => onChange(field.name, e.target.value)}
      sx={{ mt: 1 }}
    >
      {field.options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);