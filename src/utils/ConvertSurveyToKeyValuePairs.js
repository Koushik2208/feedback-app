export const convertSurveyToKeyValuePairs = (convertedSurvey) => {
  const keyValuePairs = {};

  // Iterate through each section
  convertedSurvey.sections.forEach((section) => {
    // Iterate through each field in the section
    section.fields.forEach((field) => {
      // Check if the field has a response
      if (field.hasOwnProperty("response")) {
        keyValuePairs[field.label] = field.response;
      }

      // Special handling for radio, checkbox, and select types
      if (field.options) {
        if (field.type === "checkbox") {
          // Collect all selected options for checkboxes
          const selectedOptions = field.options
            .filter((option) => option.is_selected)
            .map((option) => option.label);
          keyValuePairs[field.label] = selectedOptions;
        } else {
          // Handle single selection types like radio and select
          const selectedOption = field.options.find(
            (option) => option.is_selected
          );
          if (selectedOption) {
            keyValuePairs[field.label] = selectedOption.label;
          }
        }
      }
    });
  });

  return keyValuePairs;
};
