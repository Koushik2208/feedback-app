import React from "react";
import { Box, FormLabel, TextField as MuiTextField } from "@mui/material";

export const TextField = ({ field, value, onChange, disabled }) => (
  <Box>
    {field.labelOnTop && (
      <FormLabel sx={{ fontSize: "14px", fontWeight: "bold", mb: 2 }}>
        {field.label}{" "}
        {field.required && <span style={{ color: "red" }}>*</span>}
      </FormLabel>
    )}
    <MuiTextField
      type={field.type}
      label={field.labelOnTop ? "" : field.label}
      value={value || ""}
      onChange={(e) => onChange(field.name, e.target.value)}
      required={field.required}
      fullWidth
      disabled={disabled}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "10px", // Customize border radius here
        },
        "& .MuiInputLabel-root": {
          fontSize: "14px", // Customize font size here
        },
      }}
    />
  </Box>
);
