import React from "react";
import { Box, Typography } from "@mui/material";
import { emotions } from "../../constants/emotions";

export const EmotionField = ({ field, value, onChange }) => (
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
          onClick={() => onChange(field.name, emotion.value)}
          sx={{
            cursor: "pointer",
            p: 2,
            borderRadius: 2,
            transition: "all 0.2s",
            backgroundColor: "transparent",
            "&:hover": {
              color: emotion.color, // Changes both emoji and text color on hover
              "& .MuiTypography-root": {
                // This targets the Typography component for the label text
                color: emotion.color, // Change the text color to match the hover effect
              },
            },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
            color: value === emotion.value ? emotion.color : "#64748b", // Text color for selected state
          }}
        >
          <Box>{emotion.icon}</Box>
          <Typography
            className="MuiTypography-root"
            sx={{
              fontWeight: 400,
              color: value === emotion.value ? emotion.color : "#64748b", // Text color for selected state
            }}
          >
            {emotion.label}
          </Typography>
        </Box>
      ))}
    </Box>
  </Box>
);
