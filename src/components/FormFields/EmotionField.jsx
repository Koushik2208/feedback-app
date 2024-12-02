import React from "react";
import { Box, Typography } from "@mui/material";
import { emotions } from "../../constants/emotions";

export const EmotionField = ({ field, value, onChange, disabled = false }) => (
  <Box>
    <Typography
      component="legend"
      sx={{ fontSize: "14px", fontWeight: "bold", color: "#0009" }}
    >
      {field.label}
    </Typography>
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
          onClick={() =>
            !disabled && onChange(field.name, JSON.stringify(emotion.value))
          }
          sx={{
            cursor: disabled ? "not-allowed" : "pointer",
            p: 2,
            borderRadius: 2,
            transition: "all 0.2s",
            backgroundColor: "transparent",
            opacity:
              disabled && value !== JSON.stringify(emotion.value) ? 0.5 : 1, // Grayed out if disabled and not selected
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
            color:
              value === JSON.stringify(emotion.value)
                ? emotion.color
                : "#64748b", // Default or selected state color
            "&:hover": {
              color: !disabled ? emotion.color : undefined, // Hover effect only if not disabled
              "& .emotion-icon": {
                color: !disabled ? emotion.color : undefined, // Change icon color on hover
              },
              "& .emotion-label": {
                color: !disabled ? emotion.color : undefined, // Change label color on hover
              },
            },
          }}
        >
          <Box
            className="emotion-icon"
            sx={{
              transition: "color 0.2s",
              color:
                value === JSON.stringify(emotion.value)
                  ? emotion.color
                  : "#64748b",
            }}
          >
            {emotion.icon}
          </Box>
          <Typography
            className="emotion-label"
            sx={{
              fontWeight: 400,
              transition: "color 0.2s",
              color:
                value === JSON.stringify(emotion.value)
                  ? emotion.color
                  : "#64748b", // Default or selected state color
            }}
          >
            {emotion.label}
          </Typography>
        </Box>
      ))}
    </Box>
  </Box>
);
