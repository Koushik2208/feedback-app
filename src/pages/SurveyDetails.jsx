import { Box, Container } from "@mui/material";
import { useState } from "react";
import Header from "../components/Header";
import DynamicForm from "../components/DynamicForm";
import { patientDetailConfig } from "../config/patientDetailConfig";
import { SelectField } from "../components/FormFields";

const SurveyDetails = () => {
  const [patient, setPatient] = useState("");
  const field = {
    name: "patient",
    placeholder: "--Select Patient--",
    options: [
      { value: "Option1", label: "Option 1" },
      { value: "Option2", label: "Option 2" },
      { value: "Option3", label: "Option 3" },
    ],
  };

  const handleChange = (field, value) => {
    setPatient(value);
  };
  return (
    <section className="nav-space">
      <Header title="Survey Details" />
      <Container maxWidth="md">
        <SelectField field={field} value={patient} onChange={handleChange} />
        <Box sx={{ mt: 4 }}>
          <DynamicForm config={patientDetailConfig} />
        </Box>
      </Container>
    </section>
  );
};

export { SurveyDetails };
