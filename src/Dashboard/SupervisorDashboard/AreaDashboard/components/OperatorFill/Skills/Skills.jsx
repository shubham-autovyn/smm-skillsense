import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";

import React, { useEffect, useState } from "react";
import download from "../../../../../../assets/svg/download-btn.svg";
import useFetchAreaDashboardSkill from "../../../../hooks/fetchAreaDashboardSkill";
import {} from "./Skills.css";

const Skill = ({ staffId }) => {
  const { areaDashboardSkill, fetchAreaDashboardSkill, loading } =
    useFetchAreaDashboardSkill();
  const [skills, setSkill] = useState([]);
  const [rowLabels, setRowLabels] = useState([]);
  const supervisorId = localStorage.getItem("supervisorId");
  useEffect(() => {
    const fetchSkillData = async () => {
      try {
        // const staffId = 228141;
        const params = `staffId=${staffId}&supervisorId=${supervisorId}`;
        const responseData = await fetchAreaDashboardSkill(params);

        if (responseData?.data?.responseCode === 200) {
          const modifiedData = responseData?.data?.response?.map((res) => {
            const obj = {
              station: res.maruAAr || "",
              code: res?.stationName || "",
              name: res?.stationDescription || "",
              data: {
                "Skill Level": res?.currentSkillLevel || "",
                "Retraining Due Date": res?.retaining_due_date || "",
                "Last Deployment Date; Shift": `${res?.last_deployment_date}; A`,
                "No. of Operators Skilled at this Station":
                  res?.operator_skilled_at_station || "",
                "LO - L3 Date Range": `${res["l3"]?.start_date} - ${res["l3"]?.end_date} (19)`,
                "L4 Date": res["l4"]?.start_date || "",
                "WIS/MOS Form": download,
                // "WIS/MOS Form Link": res?.wis_mos_form,
                "New Operator Training Method Sheet": download,
                // "New Operator Training Method Sheet":
                //   res?.operator_trainee_sheet,
                "L4 Test": res?.l4_test ? res?.l4_test : "",
                "Skill Evaluation & Approval Sheet": download,
                // "Skill Evaluation & Approval Sheet":
                //   res?.skill_evaluation_sheet,
              },
            };
            return obj;
          });
          const labelRows = Object.keys(modifiedData[0].data);
          setRowLabels(labelRows);
          setSkill(modifiedData);
        }
      } catch (error) {
        console.log("error", error);
        setSkill([]);
      }
    };
    fetchSkillData();
  }, [staffId]);

  return (
    <>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        sx={{
          overflowX: "auto",
          whiteSpace: "nowrap",
        }}
      >
        <table className="skillTable">
          <thead>
            <tr>
              <th>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                  mt={1}
                  mb={1}
                >
                  <Typography variant="h6" fontWeight="bolder" fontSize={12}>
                    Overall Skill Availability ({skills?.length} Stations)
                  </Typography>
                  <Box position="relative" display="inline-flex" mr={2}>
                    <CircularProgress
                      variant="determinate"
                      value={78.5}
                      size={70}
                      thickness={10}
                      color="success"
                    />
                    <Box
                      top={0}
                      left={0}
                      bottom={0}
                      right={0}
                      position="absolute"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Typography
                        variant="subtitle1"
                        component="div"
                        fontWeight="bold"
                        fontSize={13}
                      >
                        78.5%
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </th>
              {skills?.map((station) => (
                <th key={station.code}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <span
                      style={{
                        border: "1px solid black",
                        borderRadius: "100%",
                        width: "28px",
                        height: "19px",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "9px",
                        display: "flex",
                      }}
                    >
                      {station.station || "-"}
                    </span>
                    <span>{station.code}</span>{" "}
                    <span style={{ textTransform: "capitalize" }}>
                      {station.name}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rowLabels.map((label) => (
              <tr key={label}>
                <th>{label}</th>
                {skills?.map((station) => (
                  <td key={station.code}>
                    {label === "Skill Level" ? (
                      <span
                        style={{
                          backgroundColor: "#30c030",
                          color: "#fff",
                          padding: "5px 10px",
                          borderRadius: "6px",
                        }}
                      >
                        {station.data[label]}
                      </span>
                    ) : label === "L4 Test" && station.data[label] ? (
                      <span
                        style={{
                          backgroundColor: "#dff6dd",
                          color: "green",
                          padding: "2px 6px",
                          borderRadius: "6px",
                          fontSize: "12px",
                        }}
                      >
                        {station.data[label]}
                        <OpenInNewOutlinedIcon
                          sx={{
                            fontSize: "14px",
                            marginLeft: "5px",
                            cursor: "pointer",
                          }}
                        />
                      </span>
                    ) : typeof station.data[label] === "string" &&
                      station.data[label].endsWith(".svg") ? (
                      <img
                        src={station.data[label]}
                        alt={label}
                        style={{
                          width: "20px",
                          height: "20px",
                          cursor: "pointer",
                        }}
                      />
                    ) : (
                      station.data[label]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </>
  );
};

export default Skill;
