import React from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
} from "@mui/material";

export const RadioField = ({ field, value, onChange }) => (
  <FormControl sx={{ width: "100%" }}>
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Box
        sx={{
          flex: { xs: "1 1 100%", sm: "1 1 50%" }, // Full width on small screens, 50% on larger screens
          maxWidth: { xs: "100%", sm: "50%" }, // Adjust maxWidth accordingly
          boxSizing: "border-box",
          padding: 1, // Optional padding for spacing
        }}
      >
        <FormLabel>{field.label}</FormLabel>
      </Box>
      <Box
        sx={{
          flex: { xs: "1 1 100%", sm: "1 1 50%" }, // Full width on small screens, 50% on larger screens
          maxWidth: { xs: "100%", sm: "50%" },
          boxSizing: "border-box",
          padding: 1, // Optional padding for spacing
        }}
      >
        <RadioGroup
          value={value || ""}
          onChange={(e) => onChange(field.name, e.target.value)}
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column", // Column direction on extra-small screens
              sm: "row", // Row direction on small screens and above
            },
          }}
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
      </Box>
    </Box>
  </FormControl>
);
