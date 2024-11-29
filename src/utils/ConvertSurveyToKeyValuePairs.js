export const convertSurveyToKeyValuePairs = (convertedSurvey) => {
  const keyValuePairs = {};

  // Iterate through each section
  convertedSurvey.sections.forEach((section) => {
    // Iterate through each field in the section
    section.fields.forEach((field) => {
      // Check if the field has a response
      if (field.hasOwnProperty("response")) {
        // Use the field's label as the key and response as the value
        keyValuePairs[field.label] = field.response;
      }

      // Special handling for radio, checkbox, and select types
      // Check if options exist and have an is_selected property
      if (field.options) {
        const selectedOption = field.options.find(
          (option) => option.is_selected
        );
        if (selectedOption) {
          keyValuePairs[field.label] = selectedOption.label;
        }
      }
    });
  });

  return keyValuePairs;
};
