import { Box, Paper } from "@mui/material";
import TestTemplateDetails from "./TestTemplateDetails/TestTemplateDetails";
import TestTemplateFilters from "./TestTemplateFilters";
import { useState } from "react";

const TestTemplateReport = ({ showFilters, updateFilterCount }) => {
  const [filteredData, setFilteredData] = useState("");
  const [trainingType, setTrainingType] = useState("Refresher");
  const [isReset, setIsReset] = useState(true);
  const handleFilteredData = (data) => {
    setFilteredData(data);
  };
  return (
    <Box>
      {showFilters && (
        <Paper sx={{ mb: 1.6, p: 1.6 }}>
          <TestTemplateFilters
            updateFilterCount={updateFilterCount}
            handleFilteredData={handleFilteredData}
            handleTrainingType={(type) => setTrainingType(type)}
            trainingType={trainingType}
            handleResetClick={(val) => setIsReset(val)}
          />
        </Paper>
      )}

      <Paper sx={{ mb: 1.6, p: 1.6 }}>
        <TestTemplateDetails
          isReset={isReset}
          trainingType={trainingType}
          detailsData={filteredData}
        />
      </Paper>
    </Box>
  );
};
export default TestTemplateReport;
