import { Box } from "@mui/material";
import React from "react";
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton";
import frame from "./../../../assets/svg/Frame 427319312.svg";
import { MainBox } from "./StaffDetails.style";

export const StaffDetails = ({ handleStartTest }) => {
  const startTest = () => {
    handleStartTest(true);
  };
  return (
    <MainBox>
      {/* Card Container */}
      <div>
        <Box
          sx={{
            backgroundColor: "#FFFFFF",
            padding: "32px",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            gap: "32px",
            margin: "75px  20px  20px  20px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <img src={frame} alt="frame" style={{ marginBottom: "16px" }} />

            <p
              style={{
                fontSize: "16px",
                fontWeight: "600",
                lineHeight: "20px",
                letterSpacing: "-0.025em",
                textAlign: "center",
                width: "100%",
              }}
            >
              AS1 - Maru-A and Maru-AR & both Maru A/AR operator test paper
            </p>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  lineHeight: "16px",
                  letterSpacing: "-0.025em",
                  color: "#7A7C7E",
                }}
              >
                Staff ID:
              </span>
              <p
                style={{
                  fontSize: "14px",
                  lineHeight: "16px",
                  letterSpacing: "-0.025em",
                }}
              >
                546282
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "39px" }}>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  lineHeight: "16px",
                  letterSpacing: "-0.025em",
                  color: "#7A7C7E",
                }}
              >
                Name:
              </span>
              <p
                style={{
                  fontSize: "14px",
                  lineHeight: "16px",
                  letterSpacing: "-0.025em",
                }}
              >
                Ravi Gupta
              </p>
            </div>
          </div>{" "}
          <PrimaryButton
            bgColor="none"
            style={{
              width: "100%",
              justifyContent: "center",
              fontSize: "15px",
              fontWeight: "500",
            }}
            onClick={() => startTest(true)}
          >
            Start Test
          </PrimaryButton>
        </Box>
      </div>
    </MainBox>
  );
};
