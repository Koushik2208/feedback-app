export const patientDetailConfig = {
  noSubmit: true,
  sections: [
    {
      title: "Patient Information",
      description: "Details of patient being surveyed",
      fields: [
        {
          type: "text",
          name: "patient_name",
          label: "Patient Name",
          width: "50%",
          required: true,
        },
        {
          type: "text",
          name: "umr_no",
          label: "UMR No",
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
        {
          type: "text",
          name: "mobile_no",
          label: "Mobile No",
          width: "50%",
          required: true,
        },
        {
          type: "text",
          name: "address",
          label: "Address",
          width: "50%",
          required: true,
        },
      ],
    },
  ],
};
