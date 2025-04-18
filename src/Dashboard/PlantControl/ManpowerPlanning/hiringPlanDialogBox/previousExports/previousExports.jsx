import { useEffect, useState } from "react";

import {
  Backdrop,
  Box,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";

import Download from "../../../../../assets/svg/fi-rr-download.svg";

import CustomButton from "../../../../../components/Button/SecondaryButtonWithIcon";
import CustomDatePicker from "../../../../../components/DatePicker/DatePicker";
import * as shopReducer from "../../../../../redux/Reducers/SMMShopReducer";
import usePreviousHiring from "../../../hooks/getExportPreviousHiring";

import dayjs from "dayjs";
import { DataGridTable } from "../../../../../components/Data-table/dataTable.styles";
import {
  CustomDatePickers,
  MainBox,
  MonthBtn,
  TableBox,
} from "./previousExports.styles";

import {} from "./previousExports.css";

const PreviousExports = () => {
  const plant = useSelector(shopReducer.getPlant);
  const [totalCount, setTotalCount] = useState(0);
  const [minDate, setMinDate] = useState(null);
  const [maxDate, setMaxDate] = useState(null);
  const [minToDate, setMinToDate] = useState(null);
  const [maxToDate, setMaxToDate] = useState(null);
  const [selectedFromDate, setSelectedFromDate] = useState(null);
  const [selectedToDate, setSelectedToDate] = useState(null);
  const [checked, setChecked] = useState(true);

  const [activeRange, setActiveRange] = useState(null);
  const monthData = ["1M", "3M", "7M", "1Y"];
  const monthSelect = monthData.filter((value) => value === activeRange);

  const { dataPreviousHiring, fetchPreviousHiring, loading } =
    usePreviousHiring();

  const applyButton = () => {
    gePreviousHiringtData();
  };

  useEffect(() => {
    handleRangeClick("1M");
  }, [plant.id]);

  const gePreviousHiringtData = async () => {
    try {
      const payload = {
        plantId: plant.id,
        start_date: dayjs(selectedFromDate).format("DD-MM-YYYY"),
        end_date: dayjs(selectedToDate).format("DD-MM-YYYY"),
      };
      const responseData = await fetchPreviousHiring(payload);
      setTotalCount(responseData?.response?.length || 0);
    } catch (error) {}
  };

  const rows = dataPreviousHiring?.response?.map((row) => ({
    ...row,
    id: crypto.randomUUID(),
    planingHorizon: `${row.start_date} - ${row.end_date}`,
  }));
  const columns = [
    {
      field: "staff_id",
      headerName: "Staff ID",
      flex: 1,
      resizable: false,
      sortable: false,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "exported_by",
      headerName: "Exported by",
      flex: 1,
      resizable: false,
      sortable: false,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "exported_on",
      headerName: "Exported On",
      flex: 1,
      resizable: false,
      sortable: false,
      headerClassName: "super-app-theme--header",
      editable: false,
    },
    {
      field: "planingHorizon",
      headerName: "Planing Horizon",
      flex: 1,
      resizable: false,
      sortable: false,
      headerClassName: "super-app-theme--header",
      editable: false,
    },
    {
      field: "file_url",
      headerName: "Download",
      flex: 1,
      resizable: false,
      sortable: false,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <IconButton aria-label="download">
          <a
            href={params?.formattedValue}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={Download}
              alt="Download"
              style={{ width: "20px", height: "20px" }}
            />
          </a>
        </IconButton>
      ),
    },
  ];

  useEffect(() => {
    handleRangeClick("1M");
  }, []);

  const handleRangeClick = (range) => {
    setSelectedFromDate(null);
    setSelectedToDate(null);
    setActiveRange(range);
    const now = new Date();
    let startDate;
    let maxDate;
    switch (range) {
      case "1M":
        startDate = new Date(now);
        startDate.setMonth(now.getMonth() - 1);
        maxDate = new Date(now);
        startDate.setDate(now.getDate() - 1);

        break;
      case "3M":
        startDate = new Date(now);
        startDate.setMonth(startDate.getMonth() - 3);
        maxDate = new Date(now);
        startDate.setDate(now.getDate() - 1);
        break;
      case "7M":
        startDate = new Date(now);
        startDate.setMonth(startDate.getMonth() - 7);
        maxDate = new Date(now);
        startDate.setDate(now.getDate() - 1);
        break;
      case "1Y":
        startDate = new Date(now);
        startDate.setFullYear(startDate.getFullYear() - 1);
        maxDate = new Date(now);
        startDate.setDate(maxDate.getDate() - 1);
        break;
      default:
        startDate = null;
        maxDate = null;
    }

    setMaxDate(maxDate);
    setMinDate(startDate);
    setMaxToDate(maxDate);
    setMinToDate(startDate);
    setSelectedFromDate(startDate);
    setSelectedToDate(maxDate);
    setActiveRange(range);
  };

  return (
    <>
      <MainBox>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h4">Filter:</Typography>
          {monthData.map((range) => (
            <MonthBtn
              key={range}
              style={{
                backgroundColor: monthSelect.includes(range)
                  ? "#cfd2d9"
                  : "initial",
              }}
              onClick={() => handleRangeClick(range)}
            >
              {range}
            </MonthBtn>
          ))}
        </Box>

        <CustomDatePickers>
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <CustomDatePicker
              type="month"
              label={"From"}
              value={selectedFromDate}
              minDate={minDate}
              maxDate={maxDate}
              handleChange={(newDate) => setSelectedFromDate(newDate)}
              disabled={!monthData.includes(activeRange)}
            ></CustomDatePicker>
            <CustomDatePicker
              type="month"
              label={"To"}
              value={selectedToDate}
              minDate={minToDate}
              maxDate={maxToDate}
              handleChange={(newDate) => setSelectedToDate(newDate)}
            ></CustomDatePicker>
          </Box>
        </CustomDatePickers>

        <CustomButton bgColor="none" onClick={applyButton}>
          Apply
        </CustomButton>
      </MainBox>
      <Box>
        <Typography variant="h4" style={{ margin: "15px 0px" }}>
          Total {rows?.length || 0}
        </Typography>
      </Box>
      <TableBox>
        <DataGridTable columns={columns} rows={rows} disableColumnMenu />
      </TableBox>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default PreviousExports;
