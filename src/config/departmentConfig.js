export const departmentConfig = {
  buttonTitle: "Add Department",
  sections: [
    {
      description: "Enter department details",
      insideDialog: true,
      fields: [
        {
          type: "text",
          name: "name",
          label: "Department Name",
          labelOnTop: true,
          required: true,
        },
        {
          type: "textarea",
          name: "description",
          label: "Description",
          required: true,
        },
        {
          type: "text",
          name: "department_head",
          label: "Department Head",
          labelOnTop: true,
        },
        {
          type: "text",
          name: "capacity",
          label: "Capacity",
          width: "50%",
        },
        {
          type: "text",
          name: "floor",
          label: "Floor",
          width: "50%",
        },
      ],
    },
  ],
};
