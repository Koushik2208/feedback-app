export const formConfig = {
  title: "Dynamic Feedback Survey Form",
  sections: [
    {
      title: "Basic Information",
      fields: [
        {
          type: "text",
          name: "name",
          label: "Your Name",
          width: "50%",
          required: true,
        },
        {
          type: "email",
          name: "email",
          label: "Email Address",
          width: "50%",
          required: true,
        },
      ],
    },
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
          type: "emoji",
          name: "emoji",
          label: "How do you feel about our service?",
        },
        {
          type: "slider",
          name: "recommendation",
          label: "How likely are you to recommend us? (0-10)",
          min: 0,
          max: 10,
          marks: true,
        },
        {
          type: "gradientScale",
          label: "Rate Your Experience",
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
    {
      title: "Detailed Feedback",
      fields: [
        {
          type: "radio",
          name: "serviceQuality",
          label: "How would you rate our service quality?",
          options: [
            { label: "Excellent", value: "excellent" },
            { label: "Good", value: "good" },
            { label: "Fair", value: "fair" },
            { label: "Poor", value: "poor" },
          ],
        },
        {
          type: "checkbox",
          name: "improvements",
          label: "What areas need improvement?",
          options: [
            { label: "Customer Service", value: "customer_service" },
            { label: "Product Quality", value: "product_quality" },
            { label: "Website Experience", value: "website" },
            { label: "Pricing", value: "pricing" },
            { label: "Delivery", value: "delivery" },
          ],
        },
        {
          type: "select",
          name: "category",
          label: "Which category best describes your interaction?",
          options: [
            { label: "Product Purchase", value: "product" },
            { label: "Service Usage", value: "service" },
            { label: "Customer Support", value: "support" },
            { label: "Other", value: "other" },
          ],
        },
        {
          type:"likeDislike",
          name: "likeDislike",
          label: "Do you like our service?",
        },
        {
          type: "textarea",
          name: "comments",
          label: "Additional Comments",
          rows: 4,
        },
      ],
    },
  ],
};
