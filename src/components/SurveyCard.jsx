import React, { useState } from "react";
import {
  Card,
  Typography,
  Chip,
  IconButton,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import { Clock, Users, MoreHorizontal } from "lucide-react";

const SurveyCard = ({ id, title, status, date, responses }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    // Handle edit action here
    console.log("Edit clicked");
    setAnchorEl(null); // Close menu after action
  };

  const handleView = () => {
    // Handle view action here
    window.location.href = `/survey-details/${id}`;
    setAnchorEl(null); // Close menu after action
  };

  return (
    <Card
      sx={{
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        padding: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box>
        {/* Title */}
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>

        {/* Date and Responses */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginTop: "8px",
          }}
        >
          {/* Modify Date */}
          {/* <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              color: "#6c757d",
            }}
          >
            <Clock size={16} />
            <Typography variant="body2">Modify {date}</Typography>
          </Box> */}

          {/* Responses */}
          {/* <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              color: "#6c757d",
            }}
          >
            <Users size={16} />
            <Typography variant="body2">{responses} Responses</Typography>
          </Box> */}
        </Box>
      </Box>

      {/* Status and Actions */}
      <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {/* Status Chip */}
        <Chip
          label={status}
          sx={{
            backgroundColor: status === "Active" ? "#d4edda" : "#f8d7da",
            color: status === "Active" ? "#155724" : "#721c24",
            fontWeight: "bold",
            fontSize: "12px",
          }}
        />
        {/* More Options */}
        <IconButton onClick={handleMenuClick}>
          <MoreHorizontal size={20} />
        </IconButton>
        {/* Menu with options */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleView}>View</MenuItem>
          <MenuItem onClick={handleEdit}>Edit</MenuItem>
        </Menu>
      </Box>
    </Card>
  );
};

export default SurveyCard;
