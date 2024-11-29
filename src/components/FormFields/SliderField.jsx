import React from "react";
import { Box, Typography, Slider } from "@mui/material";

export const SliderField = ({ field, value, onChange, disabled }) => (
  <Box>
    <Typography component="legend">{field.label}</Typography>
    <Slider
      value={value || 0}
      onChange={(_, newValue) => onChange(field.name, newValue)}
      min={field.min}
      max={field.max}
      marks={field.marks}
      valueLabelDisplay="auto"
      sx={{ maxWidth: 500, mx: "auto", mt: 2 }}
      disabled={disabled}
    />
  </Box>
);
