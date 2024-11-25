import React, { useState } from "react";
import "./pages.css";
import Header from "../components/Header";

import { Select, MenuItem, FormControl, Button, Link } from "@mui/material";
import { CirclePlus } from "lucide-react";
import SurveyCard from "../components/SurveyCard";
// import { useEffect } from "react";

const Home = () => {
  const surveyData = [
    {
      id: 1,
      title: "Customer Satisfaction Survey",
      status: "Active",
      date: "2024-03-20",
      responses: "145",
    },
    {
      id: 2,
      title: "Employee Feedback Survey",
      status: "Inactive",
      date: "2024-02-15",
      responses: "98",
    },
    {
      id: 3,
      title: "Product Review Survey",
      status: "Active",
      date: "2024-03-10",
      responses: "200",
    },
  ];
  const [department, setDepartment] = useState("");
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     window.location.href = "/login";
  //   }
  // }, []);

  const handleChange = (event) => {
    setDepartment(event.target.value);
  };

  return (
    <section className="nav-space">
      <Header title="Feedback Survey List" />
      <div className="container">
        <div className="row">
          <div className="col-6">
            <FormControl fullWidth>
              <Select
                labelId="simple-dropdown-label"
                id="simple-dropdown"
                value={department}
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
                  },
                }}
              >
                <MenuItem value="" disabled>
                  --Select Department--
                </MenuItem>
                <MenuItem value="Option1">Option 1</MenuItem>
                <MenuItem value="Option2">Option 2</MenuItem>
                <MenuItem value="Option3">Option 3</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="col-6">
            <Link href="/create-survey" underline="none">
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                sx={{ height: "55px" }}
              >
                <CirclePlus size={20} className="me-2" />
                Add New Survey Form
              </Button>
            </Link>
          </div>
        </div>

        <div className="survey-list">
          {surveyData.map((survey) => (
            <SurveyCard
              key={survey.id}
              id={survey.id}
              title={survey.title}
              status={survey.status}
              date={survey.date}
              responses={survey.responses}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export { Home };
