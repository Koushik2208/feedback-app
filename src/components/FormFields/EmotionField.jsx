import React from "react";
import { Box, Typography } from "@mui/material";
import { emotions } from "../../constants/emotions";

export const EmotionField = ({ field, value, onChange, disabled }) => (
  <Box>
    <Typography component="legend">{field.label}</Typography>
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
        gap: 2,
        mt: 2,
      }}
    >
      {emotions.map((emotion) => (
        <Box
          key={emotion.value}
          onClick={() => !disabled && onChange(field.name, emotion.value)}
          sx={{
            cursor: disabled ? "not-allowed" : "pointer",
            p: 2,
            borderRadius: 2,
            transition: "all 0.2s",
            backgroundColor: "transparent",
            opacity: disabled ? 0.5 : 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
            color: value === emotion.value ? emotion.color : "#64748b", // Selected state text color
            "&:hover": {
              color: !disabled && emotion.color, // Hover color
              "& .MuiTypography-root": {
                color: emotion.color, // Hover effect for the label
              },
            },
          }}
        >
          <Box>{emotion.icon}</Box>
          <Typography
            className="MuiTypography-root"
            sx={{
              fontWeight: 400,
              color: value === emotion.value ? emotion.color : "#64748b", // Selected state label color
            }}
          >
            {emotion.label}
          </Typography>
        </Box>
      ))}
    </Box>
  </Box>
);
