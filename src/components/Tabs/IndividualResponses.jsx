import { useEffect, useState } from "react";
import { SelectField } from "../FormFields";
import axiosInstance from "../../utils/axiosConfig";
import DynamicForm from "../DynamicForm";
import { Box } from "@mui/material";
import { convertSurveyConfig } from "../../utils/ConvertSurveyConfig";
import { convertSurveyToKeyValuePairs } from "../../utils/ConvertSurveyToKeyValuePairs";
import { useParams } from "react-router-dom";

const IndividualResponses = () => {
  const [patient, setPatient] = useState("");
  const [config, setConfig] = useState(null);
  const [data, setData] = useState(null);
  const [disableAfterTimeout, setDisableAfterTimeout] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { survey_title } = useParams();

  const [patientField, setPatientField] = useState({
    name: "patient",
    placeholder: "--Select Patient--",
    options: [],
  });

  const handleChange = (field, value) => {
    // Reset states when patient changes
    setPatient(value);
    setConfig(null);
    setData(null);
    setDisableAfterTimeout(false);
  };

  const fetchPatientRecords = async () => {
    try {
      if (patientField.options.length > 0) return;
      const response = await axiosInstance.get(
        `/account/get_patient/?survey_title=${survey_title}`
      );
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

  const fetchPatientResponse = async () => {
    // If no patient is selected, exit early
    if (patient === "") return;

    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        `/account/get_survey_response_by_patient/?patient_id=${patient}`
      );

      let config = await convertSurveyConfig(response.data);
      let kv = await convertSurveyToKeyValuePairs(config);

      // Modify config to disable submit and prevent re-submission
      config.noSubmit = true;

      // Update states with new data
      setData(kv);
      setConfig(config);

      // Reset disable state and set timeout to disable form
      setDisableAfterTimeout(false);
      setTimeout(() => {
        setDisableAfterTimeout(true);
      }, 1000); // Disable after 5 seconds
    } catch (error) {
      console.error("Error fetching patient response:", error);
      // Reset config and data if fetch fails
      setConfig(null);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPatientRecords();
  }, []); // Only run once on component mount

  useEffect(() => {
    // Fetch patient response whenever patient changes
    if (patient) {
      fetchPatientResponse();
    }
  }, [patient]); // Depend only on patient

  return (
    <div>
      <Box sx={{ mb: 4 }}>
        <SelectField
          field={patientField}
          value={patient}
          onChange={handleChange}
        />
      </Box>
      {isLoading ? (
        <div>Loading...</div>
      ) : config && data ? (
        <DynamicForm
          key={patient} // Force re-render on patient change
          config={{
            ...config,
            disableForm: disableAfterTimeout,
          }}
          data={data}
        />
      ) : patient && !isLoading ? (
        <div>No survey response found for this patient.</div>
      ) : null}
    </div>
  );
};

export default IndividualResponses;
