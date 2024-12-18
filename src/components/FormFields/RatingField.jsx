import React from "react";
import { Box, Typography, Rating } from "@mui/material";
import { Star } from "lucide-react";

export const RatingField = ({ field, value, onChange, disabled }) => (
  <Box>
    <Typography
      component="legend"
      sx={{ fontSize: "14px", fontWeight: "bold", color: "#0009", mb: 2 }}
    >
      {field.label}
    </Typography>
    <Rating
      value={value || 0}
      onChange={(_, newValue) => onChange(field.name, newValue)}
      max={field.max || 5}
      sx={{ "& .MuiRating-icon": { marginRight: 2 } }}
      icon={<Star style={{ width: 32, height: 32, fill: "#facc15" }} />}
      emptyIcon={<Star style={{ width: 32, height: 32 }} />}
      disabled={disabled}
    />
  </Box>
);
