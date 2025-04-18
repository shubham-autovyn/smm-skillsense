import { Backdrop, Box, CircularProgress, MenuItem } from "@mui/material";

import React, { useEffect, useState } from "react";
import useOperatorDeployment from "../../../../hooks/operatorDeployment";

// import downlodIcon from "../../../../../../assets/svg/fi-rr-download.svg";

import Select from "../../../../../../../src/utils/Select/Select";
import CustomDatePicker from "../../../../../../components/DatePicker/DatePicker";
import "./Deployment.css";
import {
  DeployedBox,
  DeployedBoxData,
  SelectBoxHead,
} from "./Deployment.styles";

export default function Deployment({ staffId }) {
  const { dataDeployment, fetchOperatorDeployment, loading } =
    useOperatorDeployment();

  const [deploymentLogs, setDeploymentLogs] = useState();
  const [stations, setStations] = useState(["All"]);
  const [shift, setShift] = useState(["All"]);
  const [minDate, setMinDate] = useState(null);

  const [maxDate, setMaxDate] = useState(null);

  const [filters, setFilters] = useState({
    fromDate: new Date().toISOString().split("T")[0],
    toDate: new Date().toISOString().split("T")[0],
    site: "All",
    location: "All",
  });

  // useEffect(() => {
  //   const params = `staffId=${staffId}&fromDate=${filters.fromDate}&toDate=${
  //     filters.toDate
  //   }&stationName=${filters.site !== "All" ? filters.site : " "}&shift=${
  //     filters.location !== "All" ? filters.location : " "
  //   }`;

  //   fetchDeploymentLogs(params);
  // }, []);

  const fetchDeploymentLogs = async (params) => {
    try {
      await fetchOperatorDeployment(params);
    } catch (error) {
      setDeploymentLogs([]);
    } finally {
      if (Array.isArray(dataDeployment?.response)) {
        const filterStation = dataDeployment?.response?.map(
          (res) => res?.stationName
        );

        const uniqueStation = [
          "All",
          ...filterStation.filter(
            (value, index, self) => self.indexOf(value) === index
          ),
        ];

        const filterShift = dataDeployment?.response?.map(
          (res) => res?.groupName
        );
        const uniqueShifts = [
          "All",
          ...filterShift.filter(
            (value, index, self) => self.indexOf(value) === index
          ),
        ];

        setStations(uniqueStation);
        setShift(uniqueShifts);

        setDeploymentLogs(dataDeployment?.response);
      }
    }
  };

  // const tableData = [
  //   {
  //     dateRange: "Today 10 Dec 2023 - Present",
  //     actualDeployed: "A",
  //     actualDeployedCode: "7RA",
  //     actualDeployedName: "Break Pipe Fitment",
  //     plannedStation: "Same as deployed",
  //     shift: "A",
  //   },
  //   {
  //     dateRange: "10 Dec 2023 - 10 Dec 2023",
  //     actualDeployed: "AR",
  //     actualDeployedCode: "7RB",
  //     actualDeployedName: "TMC Fitment",
  //     plannedStation: "7RA|Break Pipe Fitment",
  //     shift: "A",
  //   },
  //   {
  //     dateRange: "05 Dec 2023-09 Dec 2023",
  //     actualDeployed: "A",
  //     actualDeployedCode: "7RA",
  //     actualDeployedName: "Break Pipe Fitment",
  //     plannedStation: "Same as deployed",
  //     shift: "A",
  //   },
  //   {
  //     dateRange: "20 Nov 2023 - 04 Dec 2023",
  //     actualDeployed: "A",
  //     actualDeployedCode: "8RB",
  //     actualDeployedName: "Eeco Flair Nut Torque",
  //     plannedStation: "Same as deployed",
  //     shift: "A",
  //   },
  //   {
  //     dateRange: "01 Sep 2023 - 19 Nov 2023",
  //     actualDeployed: "A",
  //     actualDeployedCode: "7RA",
  //     actualDeployedName: "Break Pipe Fitment",
  //     plannedStation: "Same as deployed",
  //     shift: "A",
  //   },
  //   {
  //     dateRange: "01 Sep 2023 - 19 Nov 2023",
  //     actualDeployed: "A",
  //     actualDeployedCode: "7RA",
  //     actualDeployedName: "Break Pipe Fitment",
  //     plannedStation: "Same as deployed",
  //     shift: "A",
  //   },
  //   {
  //     dateRange: "01 Sep 2023 - 19 Nov 2023",
  //     actualDeployed: "A",
  //     actualDeployedCode: "7RA",
  //     actualDeployedName: "Break Pipe Fitment",
  //     plannedStation: "Same as deployed",
  //     shift: "A",
  //   },
  //   {
  //     dateRange: "01 Sep 2023 - 19 Nov 2023",
  //     actualDeployed: "A",
  //     actualDeployedCode: "7RA",
  //     actualDeployedName: "Break Pipe Fitment",
  //     plannedStation: "Same as deployed",
  //     shift: "A",
  //   },
  //   {
  //     dateRange: "01 Sep 2023 - 19 Nov 2023",
  //     actualDeployed: "A",
  //     actualDeployedCode: "7RA",
  //     actualDeployedName: "Break Pipe Fitment",
  //     plannedStation: "Same as deployed",
  //     shift: "A",
  //   },
  //   {
  //     dateRange: "01 Sep 2023 - 19 Nov 2023",
  //     actualDeployed: "A",
  //     actualDeployedCode: "7RA",
  //     actualDeployedName: "Break Pipe Fitment",
  //     plannedStation: "Same as deployed",
  //     shift: "A",
  //   },
  //   {
  //     dateRange: "01 Sep 2023 - 19 Nov 2023",
  //     actualDeployed: "A",
  //     actualDeployedCode: "7RA",
  //     actualDeployedName: "Break Pipe Fitment",
  //     plannedStation: "Same as deployed",
  //     shift: "A",
  //   },
  // ];

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleFilterChange = (key, value) => {
    switch (key) {
      case "site":
        setFilters((prev) => ({
          ...prev,
          site: stations[value],
        }));
        break;

      case "location":
        setFilters((prev) => ({
          ...prev,
          location: shift[value],
        }));
        break;

      case "fromDate":
        const formattedFromDate = formatDate(value);

        setFilters((prev) => ({
          ...prev,

          fromDate: formattedFromDate,
        }));

        setMinDate(formattedFromDate);

        if (new Date(filters.toDate) < new Date(formattedFromDate)) {
          setFilters((prev) => ({ ...prev, toDate: null }));
        }

        break;

      case "toDate":
        const formattedToDate = formatDate(value);

        setFilters((prev) => ({
          ...prev,

          toDate: formattedToDate,
        }));

        break;

      default:
    }
  };
  const handleRowClick = (rowData) => {
    const params = `staffId=${staffId}&fromDate=${filters.fromDate}&toDate=${filters.toDate}&stationName=${rowData.stationName}&shift=${rowData.groupName}`;
    fetchDeploymentLogs(params);
  };

  useEffect(() => {
    const params = `staffId=${staffId}&fromDate=${filters.fromDate}&toDate=${
      filters.toDate
    }&stationName=${filters.site !== "All" ? filters.site : ""}&shift=${
      filters.location !== "All" ? filters.location : ""
    }`;

    fetchDeploymentLogs(params);
  }, [
    filters.fromDate,
    filters.toDate,
    filters.site,
    filters.location,
    staffId,
  ]);

  return (
    <>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <DeployedBox>
        <SelectBoxHead className="select-box">
          <Box
            sx={{
              width: "50%",
              display: "flex",
              gap: "10px",
            }}
          >
            <Box sx={{ width: "50%" }}>
              <CustomDatePicker
                type="month"
                label={"From"}
                value={filters.fromDate}
                maxDate={filters.toDate || maxDate}
                handleChange={(date) => handleFilterChange("fromDate", date)}
                // disabled={!monthData.includes(activeRange)}
              ></CustomDatePicker>
            </Box>
            <Box sx={{ width: "50%" }}>
              <CustomDatePicker
                type="month"
                label={"To"}
                value={filters.toDate}
                minDate={filters.fromDate || minDate}
                handleChange={(date) => handleFilterChange("toDate", date)}
                // disabled={!monthData.includes(activeRange)}
              ></CustomDatePicker>
            </Box>
          </Box>
          <Box
            sx={{
              width: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <Select
              label="Station"
              name="site"
              value={filters.site}
              onChange={(event) =>
                handleFilterChange("site", event.target.value)
              }
            >
              <MenuItem key={"All"} value="All">
                All
              </MenuItem>
            </Select>

            <Select
              label="Shift"
              name="location"
              // options={shift || []}
              value={filters.location}
              onChange={(event) =>
                handleFilterChange("location", event.target.value)
              }
            >
              <MenuItem key={"All"} value="All">
                All
              </MenuItem>
            </Select>
          </Box>
        </SelectBoxHead>

        <Box
          sx={{
            width: "100%",
          }}
        >
          <Box>
            <table className="DeploymentTable" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th style={{ width: "190px" }}></th>
                  <th></th>
                  <th>Actual Deployed Station</th>
                  <th>Planned Station</th>
                  <th style={{ textAlign: "center" }}>Shift</th>
                  <th>4M-Man</th>
                </tr>
              </thead>
            </table>
          </Box>
          <DeployedBoxData>
            <table
              className="DeploymentTable"
              style={{ width: "100%", height: "315px" }}
            >
              {deploymentLogs?.length ? (
                <tbody>
                  {deploymentLogs?.map((row, index) => (
                    <tr
                      key={index}
                      onClick={() => handleRowClick(row)}
                      style={{ cursor: "pointer" }}
                    >
                      <th style={{ width: "190px" }}>
                        {row.startDate || "-"} - {row.endDate || "Present"}
                      </th>
                      <th>
                        <span
                          style={{
                            borderRadius: "100%",
                            padding: "6px 6px",
                            display: "inline-block",
                            position: "relative",
                            backgroundColor: "#ccc",
                            zIndex: "9",
                          }}
                        >
                          <span
                            style={{
                              border: "1px solid #ccc",
                              height: "39px",
                              position: "absolute",
                            }}
                          ></span>
                        </span>
                      </th>
                      <td style={{ borderRadius: "10px 0 0 10px" }}>
                        <span
                          style={{
                            border: "1px solid black",
                            borderRadius: "100%",
                            minWidth: "31px",
                            height: "15px",
                            display: "inline-block",
                            textAlign: "center",
                          }}
                        >
                          {/* {row?.actualDeployed || "-"} */}
                          {row.maruAAr || "-"}
                        </span>
                        {/* {row?.station_name} */}
                        <span style={{ marginLeft: "10px" }}>
                          {row.stationName || "-"} {row.stationDescription}
                        </span>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {row.plannedStation || "-" ? row.plannedStation : ""}
                      </td>
                      <td>{row.groupName || "-"}</td>
                      {/* <td><img src={downlodIcon} alt="" /></td> */}
                      {/* <td style={{ textAlign: "center" }}>{row.icon || "-"}</td> */}
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody>
                  <tr className="no-data">
                    <td colSpan="100%" className="no-data-message">
                      No Rows
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </DeployedBoxData>
        </Box>
      </DeployedBox>
    </>
  );
}
