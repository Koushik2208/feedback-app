import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Stack,
  Divider,
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
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          align="center"
          sx={{ mb: 4 }}
        >
          {config.title}
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            {config.sections.map((section, sectionIndex) => (
              <Box key={sectionIndex}>
                {/* {sectionIndex > 0 && <Divider sx={{ my: 4 }} />} */}
                <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                  {section.title}
                </Typography>
                <Stack spacing={3}>
                  {section.fields.map((field, fieldIndex) => (
                    <FormField
                      key={fieldIndex}
                      field={field}
                      value={formData[field.name]}
                      onChange={handleFieldChange}
                    />
                  ))}
                </Stack>
              </Box>
            ))}

            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                mt: 4,
                py: 1.5,
                backgroundColor: "#451a03",
                "&:hover": {
                  backgroundColor: "#451a0380",
                },
              }}
            >
              Submit Feedback
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default DynamicForm;
