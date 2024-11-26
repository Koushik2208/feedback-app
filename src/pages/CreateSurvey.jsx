import React, { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  IconButton,
  Checkbox,
  Typography,
  Paper,
  Container,
} from "@mui/material";
import {
  Trash2,
  Plus,
  List,
  CheckSquare,
  Type,
  SquareMenu,
} from "lucide-react";
import {
  EmotionField,
  GradientScaleField,
  RatingField,
  SelectField,
  TextAreaField,
} from "../components/FormFields";
import Header from "../components/Header";

const CreateSurvey = () => {
  const [department, setDepartment] = useState("");
  const [questions, setQuestions] = useState([
    {
      id: 1,
      type: "Multiple Choice",
      text: "",
      options: ["Option 1", "Option 2"],
      required: false,
    },
  ]);

  const rating = {
    type: "rating",
    name: "satisfaction",
    label: "Overall Satisfaction",
    max: 5,
  };

  const emotion = {
    type: "emotion",
    name: "emotion",
    label: "How do you feel about our service?",
  };

  const gradient = {
    type: "gradientScale",
    label: "How likely are you to recommend our product?",
    name: "experience",
    min: 0,
    max: 10,
    marks: [
      { value: 0, label: "0" },
      { value: 5, label: "5" },
      { value: 10, label: "10" },
    ],
  };

  const selectField = {
    name: "department",
    placeholder: "--Select Department--",
    options: [
      { value: "Option1", label: "Option 1" },
      { value: "Option2", label: "Option 2" },
      { value: "Option3", label: "Option 3" },
    ],
  };

  const questionTypes = [
    { value: "Short Answer", label: "Short Answer", icon: <Type /> },
    { value: "Dropdown", label: "Dropdown", icon: <SquareMenu /> },
    { value: "Multiple Choice", label: "Multiple Choice", icon: <List /> },
    { value: "Check Boxes", label: "Check Boxes", icon: <CheckSquare /> },
  ];

  const handleChange = (field, value) => {
    setDepartment(value);
  };

  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: "Short Answer",
        text: "",
        options: [],
        required: false,
      },
    ]);
  };

  const handleQuestionChange = (id, field, value) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, [field]: value } : q))
    );
  };

  const addOption = (id) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, options: [...q.options, ""] } : q))
    );
  };

  const handleOptionChange = (id, index, value) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id
          ? {
              ...q,
              options: q.options.map((o, i) => (i === index ? value : o)),
            }
          : q
      )
    );
  };

  const deleteOption = (id, index) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id
          ? { ...q, options: q.options.filter((_, i) => i !== index) }
          : q
      )
    );
  };

  const deleteQuestion = (id) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  return (
    <section className="nav-space">
      <Header title={"Create Survey"} />
      <Container maxWidth="md">
        <div className="row" style={{ marginBottom: "25px" }}>
          <div className="col-md-6">
            <TextField
              placeholder="Untitled Survey"
              fullWidth
              sx={{ borderRadius: "10px", backgroundColor: "#fff" }}
            />
          </div>
          <div className="col-md-6">
            <SelectField
              field={selectField}
              value={department}
              onChange={handleChange}
            />
          </div>
        </div>
        <Paper
          elevation={1}
          sx={{
            p: 2,
            marginBottom: "40px",
            borderRadius: "10px",
            backgroundColor: "#fff",
          }}
        >
          <TextAreaField
            field={{ label: "Survey Description" }}
            value=""
            onChange={() => {}}
          />
        </Paper>
        <Box>
          {questions.map((q) => (
            <Paper key={q.id} elevation={1} sx={{ p: 2, marginBottom: "40px" }}>
              {/* Question Type Selector */}
              <Box display="flex" alignItems="center" mb={2}>
                <Select
                  value={q.type}
                  onChange={(e) =>
                    handleQuestionChange(q.id, "type", e.target.value)
                  }
                  displayEmpty
                  fullWidth
                  sx={{ flex: 1, mr: 2 }}
                >
                  {questionTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      <Box display="flex" alignItems="center">
                        {type.icon}
                        <Typography sx={{ ml: 1 }}>{type.label}</Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>

                <IconButton onClick={() => deleteQuestion(q.id)}>
                  <Trash2 />
                </IconButton>
              </Box>

              {/* Question Text */}
              <TextField
                fullWidth
                placeholder="Question text"
                value={q.text}
                onChange={(e) =>
                  handleQuestionChange(q.id, "text", e.target.value)
                }
                sx={{ mb: 2 }}
              />

              {/* Options for Multiple Choice and Check Boxes */}
              {(q.type === "Multiple Choice" ||
                q.type === "Check Boxes" ||
                q.type === "Dropdown") && (
                <Box>
                  {q.options.map((option, index) => (
                    <Box key={index} display="flex" alignItems="center" mb={1}>
                      <Checkbox disabled sx={{ mr: 1 }} />
                      <TextField
                        fullWidth
                        value={option}
                        placeholder={`Option ${index + 1}`}
                        onChange={(e) =>
                          handleOptionChange(q.id, index, e.target.value)
                        }
                        sx={{ mr: 1 }}
                      />
                      <IconButton onClick={() => deleteOption(q.id, index)}>
                        <Trash2 />
                      </IconButton>
                    </Box>
                  ))}
                  <Button
                    startIcon={<Plus />}
                    onClick={() => addOption(q.id)}
                    sx={{ mt: 1 }}
                  >
                    Add Option
                  </Button>
                </Box>
              )}

              {/* Required Toggle */}
              <Box display="flex" alignItems="center" mt={2}>
                <Checkbox
                  checked={q.required}
                  onChange={(e) =>
                    handleQuestionChange(q.id, "required", e.target.checked)
                  }
                  sx={{ mr: 1 }}
                />
                <Typography>Required</Typography>
              </Box>
            </Paper>
          ))}
          <Button
            variant="contained"
            startIcon={<Plus />}
            onClick={addQuestion}
            sx={{
              backgroundColor: "#7C3996",
              "&:hover": { backgroundColor: "#7C399680" },
              marginBottom: "40px",
            }}
          >
            Add Question
          </Button>
          <Paper
            elevation={1}
            sx={{
              p: 4,
              marginBottom: "40px",
              gap: "40px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <RatingField field={rating} />
            <EmotionField field={emotion} />
            <GradientScaleField field={gradient} />
          </Paper>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#7C3996",
              "&:hover": { backgroundColor: "#7C399680" },
              marginBottom: "40px",
            }}
            fullWidth
          >
            Save Survey
          </Button>
        </Box>
      </Container>
    </section>
  );
};

export { CreateSurvey };
