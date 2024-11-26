import React, { useState, useEffect } from "react";
import "./pages.css";
import Header from "../components/Header";

import { Button, Link, Container, Grid2 } from "@mui/material";
import { CirclePlus } from "lucide-react";
import SurveyCard from "../components/SurveyCard";
import { SelectField } from "../components/FormFields";
import axiosInstance from "../utils/axiosConfig";

const Home = () => {
  const role = localStorage.getItem("role");
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
  const [surveys, setSurveys] = useState([]);
  const [departmentField, setDepartmentField] = useState({
    name: "department",
    placeholder: "--Select Department--",
    options: [],
  });

  const handleSelectChange = (field, value) => {
    setDepartment(value);
  };

  const fetchDepartments = async () => {
    try {
      if (departmentField.options.length > 0) return;
      const response = await axiosInstance.get(`/account/department/`);
      const options = response.data.results.map((d) => ({
        value: d.id,
        label: d.name,
      }));
      setDepartmentField((prev) => ({
        ...prev,
        options,
      }));
    } catch (error) {
      console.error("Error fetching departments:", error.message);
    }
  };

  const fetchSurveys = async () => {
    try {
      const response = await axiosInstance.get(
        `/account/get_survey_by_department/?department_id=${department}`
      );
      console.log("surveys", response.data);
      setSurveys(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDepartments();
    fetchSurveys();
  }, [department]);

  return (
    <section className="nav-space">
      <Header title="Feedback Survey List" />
      <Container maxWidth="md">
        {role === "Admin" && (
          <Grid2 container spacing={2} alignItems="center">
            <Grid2 item xs={12} sm={6} sx={{ flexGrow: 1 }}>
              <SelectField
                field={departmentField}
                value={department}
                onChange={handleSelectChange}
              />
            </Grid2>
            <Grid2 item xs={12} sm={6} sx={{ flexGrow: 1 }}>
              <Link href="/create-survey" underline="none">
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  sx={{ height: "55px" }}
                >
                  <CirclePlus size={20} style={{ marginRight: 8 }} />
                  Add New Survey Form
                </Button>
              </Link>
            </Grid2>
          </Grid2>
        )}
        <div className="survey-list">
          {surveys.length > 0 &&
            surveys.map((survey) => (
              <SurveyCard
                key={survey.department_id}
                id={survey.department_id}
                title={survey.survey_title}
                status={"Active"}
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
