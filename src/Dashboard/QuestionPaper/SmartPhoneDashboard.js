import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { MobileSMMTheme } from "../../../SMMSmartphone/Theme/theme";
import { McqTest } from "./McqTest/McqTest";
import MobileHeader from "./MobileHeader";
import { StaffDetails } from "./StaffDetails/StaffDetails";
import { TPStaffId } from "./TPStaffId/TPStaffId";
import ThankYouTextMsg from "./ThankYouMsg/ThankYouTextMsg";
const SmartPhoneDashboard = ({ handleMobileScreen }) => {
  const [verified, setVerified] = useState(false);
  const [startTest, setStartTest] = useState(false);
  const [testSubmitted, setTestSubmitted] = useState(false);
  useEffect(() => {
    handleMobileScreen();
  }, []);

  const handleVerify = (value) => {
    setVerified(value);
  };
  const handleStartTest = (value) => {
    setStartTest(value);
  };

  const handleSubmit = (value) => {
    setTestSubmitted(value);
  };
  const handleBackClick = () => {
    setVerified(false);
  };
  const getHeight = () => {
    if (verified) {
      return "100% !important";
    } else if (!testSubmitted) {
      return "fit-content !important";
    }
    return "100vh !important";
  };
  return (
    <ThemeProvider theme={MobileSMMTheme}>
      <Box
        sx={{
          height: "fit-content !important",
          width: "100%",
          zIndex: 2000,
          position: "absolute",
          top: 0,
          background: "#E6E9F0",
        }}
      >
        <MobileHeader
          showBackButton={verified && !startTest}
          handleBackButton={handleBackClick}
        />
        {verified ? (
          startTest ? (
            testSubmitted ? (
              <ThankYouTextMsg />
            ) : (
              <McqTest handleSubmit={handleSubmit} />
            )
          ) : (
            <StaffDetails handleStartTest={handleStartTest} />
          )
        ) : (
          <TPStaffId handleVerify={handleVerify} />
        )}
      </Box>
    </ThemeProvider>
  );
};
export default SmartPhoneDashboard;
