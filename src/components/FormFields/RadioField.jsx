import React from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
 
export const RadioField = ({ field, value, onChange }) => (
  <FormControl>
    <FormLabel>{field.label}</FormLabel>
    <RadioGroup
      value={value || ''}
      onChange={(e) => onChange(field.name, e.target.value)}
      row
    >
      {field.options.map((option) => (
        <FormControlLabel
          key={option.value}
          value={option.value}
          control={<Radio />}
          label={option.label}
        />
      ))}
    </RadioGroup>
  </FormControl>
);