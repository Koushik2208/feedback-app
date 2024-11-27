import React, { useState, useEffect } from "react";
import "./pages.css";
import Header from "../components/Header";

import { Button, Link, Container, Grid2 } from "@mui/material";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import { CirclePlus, X } from "lucide-react";
import SurveyCard from "../components/SurveyCard";
import { SelectField } from "../components/FormFields";
import axiosInstance from "../utils/axiosConfig";
import { departmentConfig } from "../config/departmentConfig";
import DynamicForm from "../components/DynamicForm";

const Home = () => {
  const role = localStorage.getItem("role");

  const [department, setDepartment] = useState("");
  const [surveys, setSurveys] = useState([]);
  const [open, setOpen] = useState(false);
  const [departmentField, setDepartmentField] = useState({
    name: "department",
    placeholder: "--Select Department--",
    options: [],
  });

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  const handleSelectChange = (field, value) => {
    setDepartment(value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const formSubmit = async (data) => {
    try {
      await axiosInstance.post(`/account/department/`, data);
      setOpen(false);
      fetchDepartments();
    } catch (error) {
      console.log("error : ", error);
    }
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
          <Grid2 container spacing={2} alignItems="center" sx={{ mb: 2 }}>
            <Grid2 item xs={12} sm={6} sx={{ flexGrow: 1 }}>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                sx={{ height: "55px" }}
                onClick={handleClickOpen}
              >
                <CirclePlus size={20} style={{ marginRight: 8 }} />
                Add New Department
              </Button>
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
        <SelectField
          field={departmentField}
          value={department}
          onChange={handleSelectChange}
        />
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
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Add New Department
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <X />
        </IconButton>
        <DialogContent dividers>
          <DynamicForm config={departmentConfig} formSubmit={formSubmit} />
        </DialogContent>
      </BootstrapDialog>
    </section>
  );
};

export { Home };
