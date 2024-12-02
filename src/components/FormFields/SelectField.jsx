import React from "react";
import { FormControl, FormLabel, Select, MenuItem } from "@mui/material";

export const SelectField = ({ field, value, onChange, disabled }) => (
  <FormControl fullWidth>
    {field.label && (
      <FormLabel
        sx={{ fontSize: "14px", mb: 2, fontWeight: "bold", color: "#0009" }}
      >
        {field.label}
      </FormLabel>
    )}
    <Select
      value={value || ""}
      onChange={(e) => onChange(field.name, e.target.value)}
      sx={{
        "& .MuiOutlinedInput-notchedOutline": {
          borderRadius: "10px", // Customize border radius here
        },
        "& .MuiInputLabel-root": {
          fontSize: "14px", // Customize font size here
        },
        "& .MuiSelect-select": {
          backgroundColor: "white", // Set the background color to white
          textAlign: "center",
        },
      }}
      displayEmpty
      disabled={disabled}
    >
      <MenuItem value="" disabled sx={{ fontSize: "14px" }}>
        {field.placeholder}
      </MenuItem>
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
