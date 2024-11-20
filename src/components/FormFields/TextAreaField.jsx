import React from "react";
import { Box, Typography, TextField, FormLabel } from "@mui/material";

export const TextAreaField = ({ field, value, onChange }) => (
  <Box>
    <FormLabel>{field.label}</FormLabel>
    {/* Text Area */}
    <TextField
      value={value || ''}
      onChange={(e) => onChange(field.name, e.target.value)}
    //   label={field.label}
      multiline
      rows={4} // Adjust the height of the text area
      variant="outlined"
      fullWidth
    />
  </Box>
);
