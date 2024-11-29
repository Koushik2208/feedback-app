import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";

const DynamicTabs = ({ tabs, value, onChange }) => {
  const [currentValue, setCurrentValue] = useState(value || 0);

  const handleChange = (event, newValue) => {
    setCurrentValue(newValue);
    onChange(newValue);
  };

  return (
    <Box>
      <Tabs
        value={currentValue}
        onChange={handleChange}
        variant="fullWidth"
        centered
        sx={{
          ".MuiTabs-indicator": {
            height: "3px",
            borderRadius: "3px",
          },
          ".MuiTab-root": {
            textTransform: "capitalize",
            fontSize: 18,
            fontWeight: 400,
            minHeight: 48,
            "&.Mui-selected": {
              fontWeight: 600,
            },
          },
          mb: 4,
        }}
      >
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab.label} />
        ))}
      </Tabs>
      {tabs.map((tab, index) => (
        <Box key={index} hidden={currentValue !== index}>
          {tab.content}
        </Box>
      ))}
    </Box>
  );
};

export default DynamicTabs;
