import React from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DynamicForm from "./components/DynamicForm";
import { Home, Login, CreateSurvey, SurveyDetails } from "./pages";
import Navbar from "./components/Navbar/Navbar";
import ProtectedRoute from "./utils/ProtectedRoute";

const theme = createTheme({
  palette: {
    primary: {
      main: "#7C3996",
    },
    background: {
      default: "#F3F4F6",
    },
  },
  typography: {
    fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "8px",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Navbar />}>
              <Route index element={<Home />} />
              <Route path="create-survey" element={<CreateSurvey />} />
              <Route
                path="survey-details/:department_id"
                element={<SurveyDetails />}
              />
              <Route path="dynamic-form" element={<DynamicForm />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
