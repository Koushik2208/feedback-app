export const loginConfig = {
  sections: [
    {
      title: "Survey Admin Login",
      description: "Enter your credentials to access the feedback dashboard",
      fields: [
        {
          type: "email",
          name: "email",
          label: "Email Address",
          required: true,
        },
        {
          type: "password",
          name: "password",
          label: "Password",
          required: true,
        },
      ],
    },
  ],
};
