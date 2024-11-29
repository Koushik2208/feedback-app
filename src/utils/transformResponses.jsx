export const transformResponses = (firstJson, secondJson) => {
  // Type mapping object inside the function
  const typeMapping = {
    radio: "Radio Button",
    select: "Dropdown",
    text: "Short Answer",
    textarea: "Paragraph",
    file: "File Upload",
    checkbox: "Check Boxes",
    rating: "Star Rating",
    emotion: "Emoji Rating",
    gradientScale: "Scale Rating",
    // Add more mappings as needed
  };

  const result = [];

  // Loop through each section in the first JSON
  firstJson.sections.forEach((section) => {
    section.fields.forEach((field) => {
      const originalType = field.type;
      const questionType = typeMapping[originalType] || originalType; // Map type or fallback to original
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
