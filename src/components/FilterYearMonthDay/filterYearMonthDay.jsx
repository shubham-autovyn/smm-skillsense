import { Box, Button, Menu } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import filter from "../../assets/svg/Frame 90.svg";

import * as shopReducer from "../../redux/Reducers/SMMShopReducer";
import CustomDatePicker from "../DatePicker/DatePicker";
import TreeFilter from "../TreeFilter/treeFilter";
import "./filterYearMonthDay.css";
import {
  CustomSwitch,
  ManPowerBoxTop,
  MonthBtn,
  TypographyText,
} from "./filterYearMonthDay.style";

const monthData = ["1M", "3M", "7M", "1Y"];
const weeklyData = ["daily", "weekly", "monthly"];
const FilterYearMonthDay = ({ filterData }) => {
  const plant = useSelector(shopReducer.getPlant);
  const shop = useSelector(shopReducer.getShop);
  const [checked, setChecked] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const filterOpen = Boolean(anchorEl);
  const [minDate, setMinDate] = useState(null);
  const [maxDate, setMaxDate] = useState(null);
  const [minToDate, setMinToDate] = useState(null);
  const [maxToDate, setMaxToDate] = useState(null);
  const [selectedFromDate, setSelectedFromDate] = useState(null);
  const [selectedToDate, setSelectedToDate] = useState(null);
  const [activeRange, setActiveRange] = useState(null);
  const [dayWiseBtn, setDayWiseBtn] = useState("daily");

  const monthSelect = monthData.filter((value) => value === activeRange);

  const weeklySelect = weeklyData.filter((value) => {
    return value === dayWiseBtn;
  });

  useEffect(() => {
    handleRangeClick("1M");
  }, [plant.id || shop.id]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseFilter = () => {
    setAnchorEl(null);
  };
  const handleChange = (event) => {
    setChecked(event.target.checked);
    setActiveRange(null);
    setSelectedFromDate(null);
    setSelectedToDate(null);
  };

  useEffect(() => {
    handleRangeClick("1M");
  }, [checked]);

  const handleRangeClick = (range) => {
    setActiveRange(range);
    const now = new Date();
    let startDate;
    let maxDate;

    if (!checked) {
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
    } else {
      switch (range) {
        case "1M":
          startDate = new Date(now);
          startDate.setDate(now.getDate() - 1);
          maxDate = new Date(now);
          maxDate.setMonth(now.getMonth() + 1);
          maxDate.setDate(maxDate.getDate() + 1);
          break;

        case "3M":
          startDate = now;
          startDate.setDate(now.getDate() - 1);
          maxDate = new Date(now);
          maxDate.setMonth(maxDate.getMonth() + 3);
          maxDate.setDate(maxDate.getDate() + 2);

          break;
        case "7M":
          startDate = now;
          startDate.setDate(now.getDate() - 1);
          maxDate = new Date(now);
          maxDate.setMonth(maxDate.getMonth() + 7);
          maxDate.setDate(maxDate.getDate() + 2);

          break;
        case "1Y":
          startDate = now;
          startDate.setDate(now.getDate() - 1);
          maxDate = new Date(now);
          maxDate.setFullYear(maxDate.getFullYear() + 1);
          maxDate.setDate(maxDate.getDate() + 2);
          break;
        default:
          startDate = null;
          maxDate = null;
      }
    }

    setMaxDate(maxDate);
    setMinDate(startDate);
    setMaxToDate(maxDate);
    setMinToDate(startDate);
    setSelectedFromDate(startDate);
    setSelectedToDate(maxDate);
    setActiveRange(range);
  };

  const handleDayWiseClick = (data) => {
    setDayWiseBtn(data);
  };
  useEffect(() => {
    if (selectedFromDate) {
      setMinToDate(selectedFromDate);
    }
  }, [selectedFromDate]);
  useEffect(() => {
    // Run whenever these dependencies change
    if (filterData) {
      filterData({ selectedFromDate, selectedToDate, dayWiseBtn });
    }
  }, [selectedFromDate, selectedToDate, dayWiseBtn]);

  return (
    <>
      <ManPowerBoxTop>
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Box
            sx={{
              display: "flex",
              gap: "4px",
              alignItems: "center",
            }}
          >
            <TypographyText>Past</TypographyText>
            <CustomSwitch
              checked={checked}
              onChange={handleChange}
              color="primary"
            />
            <TypographyText>Future</TypographyText>
            {monthData.map((range) => (
              <MonthBtn
                key={range}
                style={{
                  backgroundColor: monthSelect.includes(range)
                    ? "#cfd2d9"
                    : "initial",
                  cursor: "pointer",
                }}
                onClick={() => handleRangeClick(range)}
              >
                {range}
              </MonthBtn>
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "4px",
              padding: "0 8px",
              // borderRight: "1px solid #7D8087",
              borderLeft: "1px solid #7D8087",
            }}
          >
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
          {/* <Box sx={{ paddingLeft: "8px", display: "flex", gap: "4px" }}>
            <TypographyText>Dates:</TypographyText>
            <MonthBtn>All</MonthBtn>
            <TextBtn>Only Surplus</TextBtn>
            <TextBtn>Only Gap</TextBtn>
          </Box> */}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <Box sx={{ padding: "0 10px", borderRight: "1px solid #7D8087" }}>
            {weeklyData.map((dayWise) => (
              <MonthBtn
                key={dayWise}
                style={{
                  backgroundColor: weeklySelect.includes(dayWise)
                    ? "#cfd2d9"
                    : "initial",
                  cursor: "pointer",
                }}
                onClick={() => handleDayWiseClick(dayWise)}
              >
                {dayWise}
              </MonthBtn>
            ))}
          </Box>
          <div sx={{ position: "relative" }}>
            <Button
              id="filter-btn"
              aria-controls={filterOpen ? "filter-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={filterOpen ? "true" : undefined}
              onClick={handleClick}
            >
              <img src={filter} alt="Filter-icon" />
            </Button>
            <Menu
              id="filter-menu"
              anchorEl={anchorEl}
              open={filterOpen}
              onClose={handleCloseFilter}
              className="custom-filter-menu"
              MenuListProps={{
                "aria-labelledby": "filter-btn",
              }}
            >
              <TreeFilter
                onClose={handleCloseFilter}
                showParametersTab={true}
              ></TreeFilter>
            </Menu>
          </div>
        </Box>
      </ManPowerBoxTop>
    </>
  );
};

export default FilterYearMonthDay;
