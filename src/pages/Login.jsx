import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Stack,
  FormLabel,
} from "@mui/material";
import FormField from "../components/FormField";
import { loginConfig as defaultConfig } from "../config/loginConfig";
import axiosInstance from "../utils/axiosConfig";

const Login = ({ config = defaultConfig }) => {
  const [formData, setFormData] = useState({});

  const handleFieldChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axiosInstance.post(`account/api/login/`, formData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role?.role_name);
      window.location.href = "/";
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Paper elevation={1} sx={{ p: 4, borderRadius: "20px" }}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              {config.sections.map((section, sectionIndex) => (
                <Box key={sectionIndex}>
                  <Typography variant="h6" gutterBottom>
                    {section.title}
                  </Typography>
                  <FormLabel sx={{ mb: "40px", fontSize: "14px" }}>
                    {section.description}
                  </FormLabel>
                  <Stack spacing={3}>
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "25px", // Adjust the gap between fields if needed
                        flexDirection: "column",
                      }}
                    >
                      {section.fields.map((field, fieldIndex) => (
                        <Box key={fieldIndex}>
                          <FormField
                            field={field}
                            value={formData[field.name]}
                            onChange={handleFieldChange}
                          />
                        </Box>
                      ))}
                    </Box>
                  </Stack>
                </Box>
              ))}
              <Box
                textAlign="center"
                sx={{ textAlign: "end", mt: "10px !important" }}
              >
                <Typography
                  variant="body2"
                  color="primary"
                  sx={{ cursor: "pointer" }}
                >
                  Forgot Password?
                </Typography>
              </Box>
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{
                  mt: 4,
                  py: 1.5,
                  backgroundColor: "#7C3996",
                  "&:hover": {
                    backgroundColor: "#7C399680",
                  },
                }}
              >
                Sign In
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export { Login };
