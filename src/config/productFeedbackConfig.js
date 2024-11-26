export const productFeedbackConfig = {
  sections: [
    {
      title: "Product Feedback",
      fields: [
        {
          type: "rating",
          name: "satisfaction",
          label: "Overall Satisfaction",
          max: 5,
        },
        {
          type: "emotion",
          name: "emotion",
          label: "How do you feel about our service?",
        },
        {
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
        },
      ],
    },
  ],
};
