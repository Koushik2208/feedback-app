export const convertSurveyConfig = (inputSurvey) => {
  // Map question types to form field types
  const typeMapping = {
    "Multiple Choice": "radio",
    Dropdown: "select",
    "Short Answer": "text",
    Paragraph: "textarea",
    "File Upload": "file",
    Checkbox: "checkbox",
    "Star Rating": "rating",
    "Emoji Rating": "emotion",
    "Scale Rating": "slider",
    // Add more mappings as needed
  };

  // Convert the survey configuration
  const convertedConfig = {
    // title: inputSurvey.survey_title,
    sections: inputSurvey.sections.map((section) => ({
      title: section.section_title,
      fields: section.questions_and_options.map((question) => {
        // Determine the field type
        const questionType =
          question.options && question.options.length > 0
            ? question.options[0].question_type
            : "Short Answer";

        const fieldType = typeMapping[questionType] || "text";

        // Create the base field configuration
        const fieldConfig = {
          type: fieldType,
          name: question.question_text.toLowerCase().replace(/\s+/g, "_"),
          label: question.question_text,
        };

        // Add options for select, radio, and checkbox types
        if (
          ["select", "radio", "checkbox"].includes(fieldType) &&
          question.options
        ) {
          fieldConfig.options = question.options.map((option) => ({
            label: option.option_text,
            value: option.option_text.toLowerCase().replace(/\s+/g, "_"),
          }));
        }

        // Add special configurations for specific types
        switch (fieldType) {
          case "textarea":
            fieldConfig.rows = 4;
            break;
          case "Star Rating":
            fieldConfig.max = 5;
            break;
          case "Emoji Rating":
            fieldConfig.max = 5;
            break;
          case "Scale Rating":
            fieldConfig.min = 0;
            fieldConfig.max = 10;
            fieldConfig.marks = [
              { value: 0, label: "0" },
              { value: 5, label: "5" },
              { value: 10, label: "10" },
            ];
            break;
          case "file":
            fieldConfig.type = "file";
            break;
          default:
            break;
        }

        return fieldConfig;
      }),
    })),
  };

  return convertedConfig;
};
