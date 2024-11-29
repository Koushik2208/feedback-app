import { useEffect, useState } from "react";
import { SelectField } from "../FormFields";
import axiosInstance from "../../utils/axiosConfig";
import DynamicForm from "../DynamicForm";
import { Box } from "@mui/material";
import { convertSurveyConfig } from "../../utils/ConvertSurveyConfig";
import { convertSurveyToKeyValuePairs } from "../../utils/ConvertSurveyToKeyValuePairs";

const IndividualResponses = () => {
  const [patient, setPatient] = useState("");
  const [config, setConfig] = useState(null);
  const [data, setData] = useState(null);

  const [patientField, setPatientField] = useState({
    name: "patient",
    placeholder: "--Select Patient--",
    options: [],
  });
  const handleChange = (field, value) => {
    setPatient(value);
  };
  const fetchPatientRecords = async () => {
    try {
      if (patientField.options.length > 0) return;
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

  const fetchPatientResponse = async () => {
    try {
      if (!patient) return;
      const response = await axiosInstance.get(
        `/account/get_survey_response_by_patient/?patient_id=${patient}`
      );
      let config = await convertSurveyConfig(response.data);
      let kv = await convertSurveyToKeyValuePairs(config);
      config.noSubmit = true;
      config.disableForm = true;
      setData(kv);
      console.log(config, kv);
      setConfig(config);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPatientRecords();
    fetchPatientResponse();
  }, [patient]);
  return (
    <div>
      <Box sx={{ mb: 4 }}>
        <SelectField
          field={patientField}
          value={patient}
          onChange={handleChange}
        />
      </Box>
      {config && <DynamicForm config={config} data={data} />}
    </div>
  );
};

export default IndividualResponses;
