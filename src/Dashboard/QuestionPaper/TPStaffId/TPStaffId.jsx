import { Box, TextField } from "@mui/material";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton";
import frame from "./../../../assets/svg/Frame 427319312.svg";
import { MainBox } from "./TPStaffId.style";

export const TPStaffId = ({ handleVerify }) => {
  const [searchParams] = useSearchParams();
  const [staffId, setStaffId] = useState("");
  const [error, setError] = useState(false);
  const verifyData = (value) => {
    if (staffId === searchParams.get("staffId")) {
      handleVerify(value);
      setError(false);
    } else {
      setError(true);
    }
  };
  return (
    <MainBox>
      {/* Card Container */}
      <div>
        <Box
          sx={{
            backgroundColor: "#FFFFFF",
            height: "100%",
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

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              width: "100%",
              gap: "8px",
            }}
          >
            <p
              style={{
                color: "#7A7C7E",
                margin: "5px 0",
                fontSize: "12px",
                fontWeight: "600",
                lineHeight: "16px",
                letterSpacing: "-0.025em",
              }}
            >
              Enter your Staff ID
            </p>
            <Box
              sx={{
                width: "100%",
                borderRadius: "4px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                marginTop: error ? "10px" : "0px",
              }}
            >
              <TextField
                placeholder="E.g.: 4637292"
                fullWidth
                variant="outlined"
                size="small"
                value={staffId}
                onChange={(e) => {
                  const onlyNumbers = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                  setStaffId(onlyNumbers);
                }}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                error={error}
                helperText={
                  error ? (
                    <span style={{ fontSize: "14px" }}>
                      Invalid Staff ID, please try again.
                    </span>
                  ) : (
                    ""
                  )
                }
              />
            </Box>
          </Box>

          <PrimaryButton
            bgColor="none"
            style={{
              width: "100%",
              justifyContent: "center",
              fontSize: "15px",
              fontWeight: "500",
            }}
            onClick={() => verifyData(true)}
          >
            <p
              style={{
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "16px",
                letterSpacing: "-0.025em",
                fontFamily: "Roboto",
              }}
            >
              Verify
            </p>
          </PrimaryButton>
        </Box>
      </div>
    </MainBox>
  );
};
