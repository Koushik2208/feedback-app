import React from "react";
import { Box, Typography, Slider } from "@mui/material";

export const GradientScaleField = ({
  field, // Field object containing label, min, max, etc.
  value, // Current value of the scale
  onChange, // Function to handle value change
  disabled,
}) => {
  // Function to calculate thumb color
  const getThumbColor = (value) => {
    const range = field.max - field.min;
    const position = (value - field.min) / range; // Position between 0 and 1

    let red, green;

    if (position < 0.5) {
      // Transition from red to yellow (increasing green)
      red = 255;
      green = Math.round(position * 2 * 255);
    } else {
      // Transition from yellow to green (decreasing red)
      green = 255;
      red = Math.round((1 - position) * 2 * 255);
    }

    return `rgb(${red}, ${green}, 0)`;
  };

  return (
    <Box>
      {/* Label */}
      <Typography component="legend" gutterBottom>
        {field.label}
      </Typography>

      {/* Slider */}
      <Slider
        value={value || field.min}
        onChange={(_, newValue) => onChange(field.name, newValue)}
        min={field.min}
        max={field.max}
        marks={field.marks}
        valueLabelDisplay="auto"
        sx={{
          mx: "auto",
          mt: 2,
          // No background for the track
          "& .MuiSlider-track": {
            background: "none",
            border: "none",
          },
          // Gradient on the rail
          "& .MuiSlider-rail": {
            background: `linear-gradient(to right, red, yellow, green)`,
            height: 8,
            borderRadius: 4,
          },
          // Dynamic thumb styling
          "& .MuiSlider-thumb": {
            backgroundColor: value ? getThumbColor(value) : "rgb(255, 0, 0)",
            border: `2px solid ${getThumbColor(value)}`,
            width: 24,
            height: 24,
            transition: "background-color 0.3s ease, border-color 0.3s ease",
          },
        }}
        disabled={disabled}
      />
    </Box>
  );
};
