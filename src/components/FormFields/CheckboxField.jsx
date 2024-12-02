import React from "react";
import {
  FormControl,
  FormLabel,
  Box,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

export const CheckboxField = ({ field, value, onChange, disabled }) => (
  <FormControl>
    <FormLabel>{field.label}</FormLabel>
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, ml: 2 }}>
      {field.options.map((option) => (
        <FormControlLabel
          key={option.value}
          control={
            <Checkbox
              checked={(value || []).includes(option.value)}
              onChange={() => {
                const newValue = value || [];
                const newChecked = newValue.includes(option.value)
                  ? newValue.filter((v) => v !== option.value)
                  : [...newValue, option.value];
                onChange(field.name, newChecked);
              }}
            />
          }
          label={option.label}
          disabled={disabled}
        />
      ))}
    </Box>
  </FormControl>
);
