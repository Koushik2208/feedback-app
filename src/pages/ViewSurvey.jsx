import { useState } from "react";
import Header from "../components/Header";
import DynamicTabs from "../components/Tabs/DynamicTabs";
import { Container } from "@mui/material";
import IndividualResponses from "../components/Tabs/IndividualResponses";

const ViewSurvey = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const tabs = [
    {
      label: "Individual",
      content: <IndividualResponses />,
    },
    {
      label: "Question",
      content: <div>Content for Tab 2</div>,
    },
    {
      label: "Summary",
      content: <div>Content for Tab 3</div>,
    },
  ];

  const handleTabChange = (newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <section className="nav-space">
      <Header title={"Survey Form"} />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <DynamicTabs
          tabs={tabs}
          value={selectedTab}
          onChange={handleTabChange}
        />
      </Container>
    </section>
  );
};

export { ViewSurvey };
