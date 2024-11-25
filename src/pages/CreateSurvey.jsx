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
  FormControl,
} from "@mui/material";
import { Trash2, Plus, List, CheckSquare, Type } from "lucide-react";
import { TextAreaField } from "../components/FormFields";

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

  const questionTypes = [
    { value: "Short Answer", label: "Short Answer", icon: <Type /> },
    { value: "Multiple Choice", label: "Multiple Choice", icon: <List /> },
    { value: "Check Boxes", label: "Check Boxes", icon: <CheckSquare /> },
  ];

  const handleChange = (event) => {
    setDepartment(event.target.value);
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
      <div className="container">
        <div className="row" style={{ marginBottom: "25px" }}>
          <div className="col-md-6">
            <TextField
              placeholder="Untitled Survey"
              fullWidth
              sx={{ borderRadius: "10px", backgroundColor: "#fff" }}
            />
          </div>
          <div className="col-md-6">
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
                    backgroundColor: "#fff",
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
              {(q.type === "Multiple Choice" || q.type === "Check Boxes") && (
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
        </Box>
      </div>
    </section>
  );
};

export { CreateSurvey };
