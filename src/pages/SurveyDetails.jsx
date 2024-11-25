import { FormControl, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import Header from "../components/Header";
import DynamicForm from "../components/DynamicForm";
import { patientDetailConfig } from "../config/patientDetailConfig";

const SurveyDetails = () => {
  const [patient, setPatient] = useState("");

  const handleChange = (event) => {
    setPatient(event.target.value);
  };
  return (
    <section className="nav-space">
      <Header title="Survey Details" />
      <div className="container">
        <FormControl fullWidth>
          <Select
            labelId="simple-dropdown-label"
            id="simple-dropdown"
            value={patient}
            onChange={handleChange}
            displayEmpty
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderRadius: "10px",
              },
              "& .MuiInputLabel-root": {
                fontSize: "14px",
              },
              "& .MuiSelect-select": {
                textAlign: "center",
                backgroundColor: "#fff",
              },
            }}
          >
            <MenuItem value="" disabled>
              --Select Patient--
            </MenuItem>
            <MenuItem value="Option1">Patient 1</MenuItem>
            <MenuItem value="Option2">Patient 2</MenuItem>
            <MenuItem value="Option3">Patient 3</MenuItem>
          </Select>
        </FormControl>
      </div>
      <DynamicForm config={patientDetailConfig} />
    </section>
  );
};

export { SurveyDetails };
