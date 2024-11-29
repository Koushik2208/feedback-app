import React, { useEffect, useState } from "react";
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
  CheckSquare,
  Type,
  SquareMenu,
  Layers,
  Star,
  Smile,
  Ruler,
  CircleDot,
} from "lucide-react";
import { SelectField } from "../components/FormFields";
import Header from "../components/Header";

import axiosInstance from "../utils/axiosConfig";

import "./pages.css";

const CreateSurvey = () => {
  const [surveyTitle, setSurveyTitle] = useState("");
  const [surveyDescription, setSurveyDescription] = useState("");
  const [departmentId, setDepartmentId] = useState(null);
  const [departmentField, setDepartmentField] = useState({
    name: "department",
    placeholder: "--Select Department--",
    options: [],
  });
  const [sections, setSections] = useState([
    {
      id: 1,
      section_title: "Section 1",
      questions_and_options: [
        {
          id: 1,
          question_type: "Radio Button",
          question_text: "",
          options: [{ option_text: "" }, { option_text: "" }],
          required: false,
        },
      ],
    },
  ]);

  const questionTypes = [
    { value: "Short Answer", label: "Short Answer", icon: <Type /> },
    { value: "Dropdown", label: "Dropdown", icon: <SquareMenu /> },
    { value: "Radio Button", label: "Radio Button", icon: <CircleDot /> },
    { value: "Check Boxes", label: "Check Boxes", icon: <CheckSquare /> },
    { value: "Star Rating", label: "Star Rating", icon: <Star /> },
    { value: "Emoji Rating", label: "Emoji Rating", icon: <Smile /> },
    { value: "Scale Rating", label: "Scale Rating", icon: <Ruler /> },
  ];

  const addSection = () => {
    setSections((prev) => [
      ...prev,
      {
        id: Date.now(),
        section_title: `Section ${prev.length + 1}`,
        questions_and_options: [
          {
            id: Date.now() + 1,
            question_type: "Short Answer",
            question_text: "",
            options: [],
            required: false,
          },
        ],
      },
    ]);
  };

  const addQuestion = (sectionId) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              questions_and_options: [
                ...section.questions_and_options,
                {
                  id: Date.now(),
                  question_type: "Short Answer",
                  question_text: "",
                  options: [],
                  required: false,
                },
              ],
            }
          : section
      )
    );
  };

  const handleSectionTitleChange = (sectionId, title) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? { ...section, section_title: title }
          : section
      )
    );
  };

  const handleQuestionChange = (sectionId, questionId, field, value) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              questions_and_options: section.questions_and_options.map((q) =>
                q.id === questionId ? { ...q, [field]: value } : q
              ),
            }
          : section
      )
    );
  };

  const addOption = (sectionId, questionId) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              questions_and_options: section.questions_and_options.map((q) =>
                q.id === questionId
                  ? { ...q, options: [...q.options, { option_text: "" }] }
                  : q
              ),
            }
          : section
      )
    );
  };

  const handleOptionChange = (sectionId, questionId, index, value) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              questions_and_options: section.questions_and_options.map((q) =>
                q.id === questionId
                  ? {
                      ...q,
                      options: q.options.map((o, i) =>
                        i === index ? { option_text: value } : o
                      ),
                    }
                  : q
              ),
            }
          : section
      )
    );
  };

  const deleteOption = (sectionId, questionId, index) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              questions_and_options: section.questions_and_options.map((q) =>
                q.id === questionId
                  ? {
                      ...q,
                      options: q.options.filter((_, i) => i !== index),
                    }
                  : q
              ),
            }
          : section
      )
    );
  };

  const deleteQuestion = (sectionId, questionId) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              questions_and_options: section.questions_and_options.filter(
                (q) => q.id !== questionId
              ),
            }
          : section
      )
    );
  };

  const deleteSection = (sectionId) => {
    setSections((prev) => prev.filter((section) => section.id !== sectionId));
  };

  const handleDepartmentChange = (field, value) => {
    setDepartmentId(value);
  };

  const validateSurveyData = (surveyData) => {
    const errors = [];

    // Check if survey title and description are empty
    if (!surveyData.survey_title.trim())
      errors.push("Survey title is required.");
    if (!surveyData.survey_description.trim())
      errors.push("Survey description is required.");
    if (!surveyData.department_id) errors.push("Department is required.");

    // Check sections and questions
    surveyData.sections.forEach((section, sectionIndex) => {
      if (!section.section_title.trim()) {
        errors.push(`Section ${sectionIndex + 1} title is required.`);
      }

      section.questions_and_options.forEach((question, questionIndex) => {
        if (!question.question_text.trim()) {
          errors.push(
            `Question ${questionIndex + 1} in Section ${
              sectionIndex + 1
            } is missing text.`
          );
        }

        // Check options for questions with choices
        if (
          ["Radio Button", "Check Boxes", "Dropdown"].includes(
            question.question_type
          )
        ) {
          question.options.forEach((option, optionIndex) => {
            if (!option.option_text.trim()) {
              errors.push(
                `Option ${optionIndex + 1} for Question ${
                  questionIndex + 1
                } in Section ${sectionIndex + 1} is empty.`
              );
            }
          });
        }
      });
    });

    return errors;
  };

  const handleSave = async () => {
    try {
      // Construct the survey JSON in the specified format
      const surveyData = {
        department_id: departmentId,
        survey_title: surveyTitle,
        survey_description: surveyDescription,
        sections: sections.map((section) => ({
          section_title: section.section_title,
          questions_and_options: section.questions_and_options.map((q) => ({
            id: q.id,
            question_type: q.question_type,
            question_text: q.question_text,
            options: q.options,
            required: q.required,
          })),
        })),
      };

      console.log(JSON.stringify(surveyData, null, 2));
      const validationErrors = validateSurveyData(surveyData);
      if (validationErrors.length > 0) {
        console.log("Validation Errors:", validationErrors);
        alert(
          "Please fix the following errors:\n" + validationErrors.join("\n")
        );
        return;
      } else {
        await axiosInstance.post(`/account/create_survey/`, surveyData);
        window.location.href = "/";
      }
      // Here you would typically send this to your backend
      // axios.post('/api/surveys', surveyData)
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDepartments = async () => {
    try {
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
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <section className="nav-space">
      <Header title={"Create Survey"} />
      <Container maxWidth="md" fullWidth>
        <div className="responsive-grid">
          <TextField
            placeholder="Survey Title"
            fullWidth
            value={surveyTitle}
            onChange={(e) => setSurveyTitle(e.target.value)}
            sx={{ borderRadius: "10px", backgroundColor: "#fff" }}
          />
          <SelectField
            field={departmentField}
            value={departmentId}
            onChange={handleDepartmentChange}
          />
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
          <TextField
            multiline
            rows={4}
            fullWidth
            placeholder="Survey Description"
            value={surveyDescription}
            onChange={(e) => setSurveyDescription(e.target.value)}
            variant="outlined"
          />
        </Paper>

        {sections.map((section, sectionIndex) => (
          <Paper
            key={section.id}
            elevation={1}
            sx={{
              p: 3,
              marginBottom: "40px",
              border: "1px solid #e0e0e0",
              backgroundColor: "#f9f9f9",
            }}
          >
            {/* Section Title */}
            <Box display="flex" alignItems="center" mb={3}>
              <Layers style={{ marginRight: 10 }} />
              <TextField
                fullWidth
                value={section.section_title}
                onChange={(e) =>
                  handleSectionTitleChange(section.id, e.target.value)
                }
                placeholder={`Section ${sectionIndex + 1} Title`}
                variant="standard"
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                }}
              />
              {sections.length > 1 && (
                <IconButton onClick={() => deleteSection(section.id)}>
                  <Trash2 />
                </IconButton>
              )}
            </Box>

            {section.questions_and_options.map((q) => (
              <Paper
                key={q.id}
                elevation={1}
                sx={{
                  p: 2,
                  marginBottom: "20px",
                  backgroundColor: "#fff",
                }}
              >
                {/* Question Type Selector */}
                <Box display="flex" alignItems="center" mb={2}>
                  <Select
                    value={q.question_type}
                    onChange={(e) =>
                      handleQuestionChange(
                        section.id,
                        q.id,
                        "question_type",
                        e.target.value
                      )
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

                  <IconButton onClick={() => deleteQuestion(section.id, q.id)}>
                    <Trash2 />
                  </IconButton>
                </Box>

                {/* Question Text */}
                <TextField
                  fullWidth
                  placeholder="Question text"
                  value={q.question_text}
                  onChange={(e) =>
                    handleQuestionChange(
                      section.id,
                      q.id,
                      "question_text",
                      e.target.value
                    )
                  }
                  sx={{ mb: 2 }}
                />

                {/* Options for Radio Button and Check Boxes */}
                {(q.question_type === "Radio Button" ||
                  q.question_type === "Check Boxes" ||
                  q.question_type === "Dropdown") && (
                  <Box>
                    {q.options.map((option, index) => (
                      <Box
                        key={index}
                        display="flex"
                        alignItems="center"
                        mb={1}
                      >
                        <Checkbox disabled sx={{ mr: 1 }} />
                        <TextField
                          fullWidth
                          value={option.option_text}
                          placeholder={`Option ${index + 1}`}
                          onChange={(e) =>
                            handleOptionChange(
                              section.id,
                              q.id,
                              index,
                              e.target.value
                            )
                          }
                          sx={{ mr: 1 }}
                        />
                        <IconButton
                          onClick={() => deleteOption(section.id, q.id, index)}
                        >
                          <Trash2 />
                        </IconButton>
                      </Box>
                    ))}
                    <Button
                      startIcon={<Plus />}
                      onClick={() => addOption(section.id, q.id)}
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
                      handleQuestionChange(
                        section.id,
                        q.id,
                        "required",
                        e.target.checked
                      )
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
              onClick={() => addQuestion(section.id)}
              sx={{
                backgroundColor: "#7C3996",
                "&:hover": { backgroundColor: "#7C399680" },
                marginBottom: "20px",
              }}
            >
              Add Question to Section
            </Button>
          </Paper>
        ))}

        <Button
          variant="contained"
          startIcon={<Plus />}
          onClick={addSection}
          sx={{
            backgroundColor: "#7C3996",
            "&:hover": { backgroundColor: "#7C399680" },
            marginBottom: "40px",
          }}
        >
          Add New Section
        </Button>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#7C3996",
            "&:hover": { backgroundColor: "#7C399680" },
            marginBottom: "40px",
          }}
          fullWidth
          onClick={handleSave}
        >
          Save Survey
        </Button>
      </Container>
    </section>
  );
};

export { CreateSurvey };
