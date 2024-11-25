import React from "react";
import { FormControl, FormLabel, Select, MenuItem } from "@mui/material";

export const SelectField = ({ field, value, onChange }) => (
  <FormControl fullWidth>
    <FormLabel sx={{ fontSize: "14px" }}>{field.label}</FormLabel>
    <Select
      value={value || ""}
      onChange={(e) => onChange(field.name, e.target.value)}
      sx={{
        mt: 1,
        "& .MuiOutlinedInput-notchedOutline": {
          borderRadius: "10px", // Customize border radius here
        },
        "& .MuiInputLabel-root": {
          fontSize: "14px", // Customize font size here
        },
      }}
    >
      {field.options.map((option) => (
        <MenuItem
          key={option.value}
          value={option.value}
          sx={{ fontSize: "14px" }}
        >
          {option.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);
