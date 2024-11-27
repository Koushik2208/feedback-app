import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Paper, Stack } from "@mui/material";
import FormField from "./FormField";
import { formConfig as defaultConfig } from "../config/formConfig";

const DynamicForm = ({ config = defaultConfig, formSubmit, data = {} }) => {
  const [formData, setFormData] = useState(data);

  const handleFieldChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    formSubmit(formData);
  };

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

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
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          {config.sections.map((section, sectionIndex) => (
            <Box key={sectionIndex}>
              <Paper
                elevation={section.insideDialog ? 0 : 1}
                sx={{
                  p: section.insideDialog ? 0 : 4,
                  borderRadius: section.insideDialog ? "0px" : "20px",
                }}
              >
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

          {!config.noSubmit && (
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
              {config.buttonTitle || "Submit Feedback"}
            </Button>
          )}
        </Stack>
      </form>
    </>
  );
};

export default DynamicForm;
