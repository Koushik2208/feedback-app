export const transformResponses = (firstJson, secondJson) => {
  const result = [];

  // Loop through each section in the first JSON
  firstJson.sections.forEach((section) => {
    section.fields.forEach((field) => {
      const questionType = field.type;
      const questionText = field.name;
      const response = secondJson[questionText]; // Match the response from the second JSON

      if (response !== undefined) {
        result.push({
          question_type: questionType,
          question_text: questionText,
          response: response,
        });
      }
    });
  });

  return result;
};
