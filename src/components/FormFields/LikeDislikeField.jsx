import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { likeDislikeOptions } from "../../constants/likeDislikeOptions";

export const LikeDislikeField = ({ field, value, onChange }) => (
  <Box>
    {/* Question */}
    <Typography component="legend" variant="h6" gutterBottom>
      {field.label}
    </Typography>

    {/* Like and Dislike Options */}
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 4, // Spacing between icons
        mt: 2,
      }}
    >
      {likeDislikeOptions.map((option) => (
        <IconButton
          key={option.value}
          onClick={() => onChange(field.name, option.value)}
          sx={{
            color: value === option.value ? option.color : "#64748b",
            "&:hover": { color: option.color },
            transition: "color 0.2s",
          }}
        >
          {option.icon}
        </IconButton>
      ))}
    </Box>
  </Box>
);
