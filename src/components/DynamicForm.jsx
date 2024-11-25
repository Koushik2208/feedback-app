import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Stack,
} from "@mui/material";
import FormField from "./FormField";
import { formConfig as defaultConfig } from "../config/formConfig";

const DynamicForm = ({ config = defaultConfig }) => {
  const [formData, setFormData] = useState({});

  const handleFieldChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your feedback!");
  };

  return (
    <>
      {config.title && (
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          align="center"
          backgroundColor="#7C3996"
          color="white"
          sx={{ py: 4 }}
        >
          {config.title}
        </Typography>
      )}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            {config.sections.map((section, sectionIndex) => (
              <Box key={sectionIndex}>
                <Paper elevation={1} sx={{ p: 4, borderRadius: "20px" }}>
                  <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                    {section.title}
                  </Typography>
                  <Stack spacing={3}>
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "12px", // Adjust the gap between fields if needed
                        flexDirection: {
                          xs: "column",
                          sm: "row",
                        },
                      }}
                    >
                      {section.fields.map((field, fieldIndex) => (
                        <Box
                          key={fieldIndex}
                          sx={{
                            flex: {
                              xs: "1 1 100%", // Full width on extra-small screens
                              sm: field.width === "50%" ? "1" : "1 1 100%", // Adjust for medium and larger screens
                            },
                            maxWidth: {
                              xs: "100%", // Full width on extra-small screens
                              sm: field.width === "50%" ? "50%" : "100%", // Adjust for medium and larger screens
                            },
                            minWidth: {
                              xs: "100%", // Full width on extra-small screens
                              sm: field.width === "50%" ? "45%" : "100%", // Adjust for medium and larger screens
                            },
                            boxSizing: "border-box", // Include padding/border in width calculations
                          }}
                        >
                          <FormField
                            field={field}
                            value={formData[field.name]}
                            onChange={handleFieldChange}
                          />
                        </Box>
                      ))}
                    </Box>
                  </Stack>
                </Paper>
              </Box>
            ))}

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
              Submit Feedback
            </Button>
          </Stack>
        </form>
      </Container>
    </>
  );
};

export default DynamicForm;
