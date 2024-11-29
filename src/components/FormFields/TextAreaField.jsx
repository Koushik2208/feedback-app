import React from "react";
import { Box, TextField, FormLabel } from "@mui/material";

export const TextAreaField = ({ field, value, onChange, disabled }) => (
  <Box>
    <FormLabel sx={{ fontSize: "14px" }}>{field.label}</FormLabel>
    {/* Text Area */}
    <TextField
      value={value || ""}
      onChange={(e) => onChange(field.name, e.target.value)}
      //   label={field.label}
      multiline
      rows={4} // Adjust the height of the text area
      variant="outlined"
      fullWidth
      disabled={disabled}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "10px", // Customize border radius here
        },
      }}
    />
  </Box>
);
