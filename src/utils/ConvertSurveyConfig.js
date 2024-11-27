export const convertSurveyConfig = (inputSurvey) => {
  // Map question types to form field types
  const typeMapping = {
    "Multiple Choice": "radio",
    Dropdown: "select",
    "Short Answer": "text",
    Paragraph: "textarea",
    "File Upload": "file",
    "Check Boxes": "checkbox",
    "Star Rating": "rating",
    "Emoji Rating": "emotion",
    "Scale Rating": "gradientScale",
    // Add more mappings as needed
  };

  // Convert the survey configuration
  const convertedConfig = {
    // title: inputSurvey.survey_title,
    sections: inputSurvey.sections.map((section) => ({
      title: section.section_title,
      fields: section.questions_and_options.map((question) => {
        // Determine the field type
        const questionType = question.question_type;

        const fieldType = typeMapping[questionType] || "text";

        // Create the base field configuration
        const fieldConfig = {
          type: fieldType,
          name: question.question_text,
          label: question.question_text,
        };

        // Add options for select, radio, and checkbox types
        if (
          [
            "select",
            "radio",
            "checkbox",
            "gradientScale",
            "emotion",
            "rating",
          ].includes(fieldType) &&
          question.options
        ) {
          fieldConfig.options = question.options.map((option) => ({
            label: option.option_text,
            value: option.option_text,
          }));
        }

        // Add special configurations for specific types
        switch (fieldType) {
          case "text":
            fieldConfig.labelOnTop = true;
            break;
          case "textarea":
            fieldConfig.rows = 4;
            break;
          case "select":
            fieldConfig.placeholder = "--Select an option--";
            break;
          case "rating":
            fieldConfig.max = 5;
            break;
          case "emotion":
            fieldConfig.max = 5;
            break;
          case "gradientScale":
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
