import { Box, Container } from "@mui/material";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import DynamicForm from "../components/DynamicForm";
import { SelectField } from "../components/FormFields";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosConfig";
import { convertSurveyConfig } from "../utils/ConvertSurveyConfig";

const SurveyDetails = () => {
  const [patient, setPatient] = useState("");
  const [survey, setSurvey] = useState([]);
  const [dataConfig, setDataConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [patientField, setPatientField] = useState({
    name: "patient",
    placeholder: "--Select Patient--",
    options: [],
  });

  const { department_id } = useParams();

  const handleChange = (field, value) => {
    setPatient(value);
  };

  const fetchSurvey = async () => {
    try {
      const response = await axiosInstance.get(
        `/account/get_survey_by_department/?department_id=${department_id}`
      );
      console.log("surveys", response.data?.[0]);
      setSurvey(response.data?.[0]);
      let config = await convertSurveyConfig(response.data?.[0]);
      console.log("dataConfig", config);
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
      const response = await axiosInstance.get("/account/patient_records/");
      let options = response.data.results.map((patient) => ({
        value: patient.id,
        label: patient.patient_name,
      }));
      setPatientField((prev) => ({
        ...prev,
        options,
      }));
      // Handle the patient records data here
    } catch (error) {
      console.error("Error fetching patient records:", error);
      // Handle error accordingly
    }
  };

  useEffect(() => {
    fetchPatientRecords();
    fetchSurvey();
  }, [department_id]); // Only fetch survey data once on mount or when department_id changes

  return (
    <section className="nav-space">
      <Header title={dataConfig?.title || "Survey Details"} />
      <Container maxWidth="md">
        <SelectField
          field={patientField}
          value={patient}
          onChange={handleChange}
        />
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <Box sx={{ mt: 4 }}>
          {dataConfig ? (
            <DynamicForm config={dataConfig} />
          ) : (
            <p>No survey data available</p>
          )}
        </Box>
      </Container>
    </section>
  );
};

export { SurveyDetails };
