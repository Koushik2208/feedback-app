import React, { useState } from "react";
import "./pages.css";
import Header from "../components/Header";

import { Button, Link, Container } from "@mui/material";
import { CirclePlus } from "lucide-react";
import SurveyCard from "../components/SurveyCard";
import { SelectField } from "../components/FormFields";

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
  const selectField = {
    name: "department",
    placeholder: "--Select Department--",
    options: [
      { value: "Option1", label: "Option 1" },
      { value: "Option2", label: "Option 2" },
      { value: "Option3", label: "Option 3" },
    ],
  };
  const [department, setDepartment] = useState("");

  const handleSelectChange = (field, value) => {
    setDepartment(value);
  };

  return (
    <section className="nav-space">
      <Header title="Feedback Survey List" />
      <Container maxWidth="md">
        <div className="row">
          <div className="col-6">
            <SelectField
              field={selectField}
              value={department}
              onChange={handleSelectChange}
            />
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
      </Container>
    </section>
  );
};

export { Home };
