import React, { useState } from "react";
import {
  TextField as MuiTextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Eye, EyeOff } from "lucide-react";

export const PasswordField = ({ field, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <MuiTextField
      type={showPassword ? "text" : "password"}
      label={field.label}
      value={value || ""}
      onChange={(e) => onChange(field.name, e.target.value)}
      required={field.required}
      fullWidth
      slotProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={togglePasswordVisibility} edge="end">
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: '10px', // Customize border radius here
        },
        "& .MuiInputLabel-root": {
        fontSize: "14px", // Customize font size here
      },
      }}
    />
  );
};
