import React from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
} from "@mui/material";

export const RadioField = ({ field, value, onChange, disabled }) => (
  <FormControl sx={{ width: "100%" }}>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column", // Always stack label and options vertically
        alignItems: "flex-start",
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: "100%",
          boxSizing: "border-box",
          paddingBottom: 1,
        }}
      >
        <FormLabel sx={{ fontSize: "14px", fontWeight: "bold" }}>
          {field.label}
        </FormLabel>
      </Box>
      <Box
        sx={{
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <RadioGroup
          value={value || ""}
          onChange={(e) => onChange(field.name, e.target.value)}
          sx={{
            display: "flex",
            flexWrap: "wrap", // Allow wrapping for desktop
            flexDirection: {
              xs: "column", // Stack options vertically on small screens
              sm: "row", // Arrange options in a row on larger screens
            },
            gap: 1, // Add spacing between options
          }}
        >
          {field.options.map((option) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={<Radio />}
              label={option.label}
              disabled={disabled}
              sx={{
                flex: "1 1 auto", // Allow items to grow and wrap properly
                margin: 0, // Reset default margin for consistent spacing
              }}
            />
          ))}
        </RadioGroup>
      </Box>
    </Box>
  </FormControl>
);
