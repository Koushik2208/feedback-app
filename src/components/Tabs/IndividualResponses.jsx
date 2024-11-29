import { useEffect, useState } from "react";
import { SelectField } from "../FormFields";
import axiosInstance from "../../utils/axiosConfig";

const IndividualResponses = () => {
  const [patient, setPatient] = useState("");

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
      const response = await axiosInstance.get("/account/patient_records/");
      let options = response.data.results.map((patient) => ({
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
  useEffect(() => {
    fetchPatientRecords();
  }, []);
  return (
    <div>
      <SelectField
        field={patientField}
        value={patient}
        onChange={handleChange}
      />
    </div>
  );
};

export default IndividualResponses;
