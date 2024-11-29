import { Box, Container } from "@mui/material";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import DynamicForm from "../components/DynamicForm";
import { SelectField } from "../components/FormFields";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosConfig";
import { convertSurveyConfig } from "../utils/ConvertSurveyConfig";
import { patientDetailConfig } from "../config/patientDetailConfig";
import { transformResponses } from "../utils/transformResponses";

const FillSurvey = () => {
  const [patient, setPatient] = useState("");
  const [dataConfig, setDataConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [patientField, setPatientField] = useState({
    name: "patient",
    placeholder: "--Select Patient--",
    options: [],
  });

  const { department_id, survey_title } = useParams();

  const handleChange = (field, value) => {
    setPatient(value);
  };

  const fetchSurvey = async () => {
    try {
      const response = await axiosInstance.get(
        `/account/get_survey_by_department/?department_id=${department_id}&survey_title=${survey_title}`
      );
      let config = convertSurveyConfig(response.data?.[0]);
      console.log(config, response.data?.[0]);
      setDataConfig(config);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError("Failed to fetch survey data.");
      setLoading(false);
    }
  };

  const fetchPatientRecords = async () => {
    try {
      const response = await axiosInstance.get("/account/get_patient/");
      let options = response.data.map((patient) => ({
        ...patient,
        value: patient.id,
        label: patient.patient_name,
      }));
      setPatientField((prev) => ({
        ...prev,
        options,
      }));
    } catch (error) {
      console.error("Error fetching patient records:", error);
    }
  };

  const patientSubmit = async (data) => {
    try {
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const surveySubmit = async (data) => {
    try {
      let res = transformResponses(dataConfig, data);
      console.log(res);
      await axiosInstance.post(`/account/submit_survey_response/`, {
        patient_id: patient,
        department_id: department_id,
        survey_title: survey_title,
        responses: res,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPatientRecords();
    fetchSurvey();
  }, [department_id]); // Only fetch survey data once on mount or when department_id changes

  return (
    <section className="nav-space">
      <Header title={dataConfig?.title || "Fill Survey"} />
      <Container maxWidth="md">
        <SelectField
          field={patientField}
          value={patient}
          onChange={handleChange}
        />
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {dataConfig && patient && (
          <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 4 }}>
            <DynamicForm
              config={patientDetailConfig}
              data={patientField?.options?.find((p) => p.id === patient) || {}}
              formSubmit={patientSubmit}
            />
            <DynamicForm config={dataConfig} formSubmit={surveySubmit} />
          </Box>
        )}
      </Container>
    </section>
  );
};

export { FillSurvey };
