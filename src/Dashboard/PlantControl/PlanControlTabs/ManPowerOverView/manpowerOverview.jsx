import {
  Backdrop,
  CircularProgress,
  LinearProgress,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import fullScreen from '../../../../assets/svg/full-screen.svg';
import back from '../../../../assets/svg/goback.svg';
import next from '../../../../assets/svg/next-arrow.svg';

import FlexBox from '../../../../components/FlexBox';
import BarChart from './DatewiseChart/DatewiseChart';
import { ManpowerBox, ManpowerBoxTwo } from './manpower.style';
import './manpoweroverview.css';
import WaterfallChart from './WaterfallChart/waterfallchart';
// import CustomDatePicker from "../DatePicker/DatePicker";
import CustomDatePicker from '../../../../components/DatePicker/DatePicker';
import * as shopReducer from '../../../../redux/Reducers/SMMShopReducer';
import useFetchManpowerRequirementByDate from '../../hooks/manpowerRequirementGraph';
import useFetchPlannedVsActualJoining from '../../hooks/plannedvsActual';

dayjs.extend(utc);

const ManpowerOverview = () => {
  const shop = useSelector(shopReducer.getShop);
  const plant = useSelector(shopReducer.getPlant);
  const [currentGraphData, setCurrentGraphData] = useState(1);
  const itemsMpPerGraphData = 5;
  const chartContainerRef = useRef(null);

  const {
    data: plannedvsActual,
    fetchPlannedVsActualJoining: PlannedVsActualJoining,
    loading: plannedVsActualLoader,
  } = useFetchPlannedVsActualJoining();

  const {
    dataGraph: dataGraph,
    fetchManpowerReqDateWise: ManpowerReqDateWise,
    loading: dateWiseLoader,
  } = useFetchManpowerRequirementByDate();

  const { Planned, Actual, dateWiseData } = plannedvsActual ?? {};

  const percentage = (Actual / Planned) * 100 || 0;
  const [anchorEl, setAnchorEl] = useState(null);
  const [overallJoiningFilterDate, setOverallJoiningFilterDate] = useState(
    new Date()
  );
  const [filterFromDate, setFilterFromDate] = useState(new Date());
  const [filterToDate, setFilterToDate] = useState(
    dayjs(new Date()).add(1, 'year').toDate()
  );
  const [datesReadyForApiCall, setDatesReadyForApiCall] = useState(false);

  const [plannedActualGraphData, setPlannedActualGraphData] = useState([]);
  const filterOpen = Boolean(anchorEl);

  const handleFromDateChange = (date) => {
    setFilterFromDate(date);
    if (dayjs(date).isAfter(dayjs(filterToDate))) {
      setFilterToDate(date);
    }
  };

  const handleToDateChange = (date) => {
    if (dayjs(date).isBefore(dayjs(filterFromDate))) {
      return;
    }
    setFilterToDate(date);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseFilter = () => {
    setAnchorEl(null);
  };
  const getDate = (event) => {
    setOverallJoiningFilterDate(event);
  };
  // const fetchWaterfallGraphData = async () => {};

  const handleDatePickerCloseForFilters = () => {
    if (filterFromDate && filterToDate) {
      setDatesReadyForApiCall(true);
    }
  };
  useEffect(() => {
    fetchDatewiseGraphData();
  }, [plant]);

  useEffect(() => {
    if (datesReadyForApiCall) {
      fetchDatewiseGraphData();
      setDatesReadyForApiCall(false);
    }
  }, [datesReadyForApiCall]);

  const fetchDatewiseGraphData = async () => {
    if (plant?.id) {
      const startDate = dayjs(filterFromDate).utc().format('MM-YYYY');
      const endDate = dayjs(filterToDate).utc().format('MM-YYYY');
      const manpowerReqPayload = {
        plantId: plant?.id,
        startDate: startDate,
        endDate: endDate,
      };
      await ManpowerReqDateWise(manpowerReqPayload);
    }
  };

  useEffect(() => {
    setPlannedActualGraphData(plannedvsActual?.dateWiseData || []);
  }, [plannedvsActual]);

  useEffect(() => {
    if (plannedvsActual?.dateWiseData) {
      setPlannedActualGraphData(plannedvsActual.dateWiseData);
    } else {
      setPlannedActualGraphData([]);
    }
  }, [plannedvsActual]);

  useEffect(() => {
    handleDatePickerClose();
  }, [shop?.plant_id]);

  const handleDatePickerClose = async (selectedDate) => {
    if (plant?.id && selectedDate) {
      const date = dayjs(selectedDate).utc().format('MM-YYYY');
      const planvsActualPayload = {
        period: date,
        plantId: plant.id,
      };

      await PlannedVsActualJoining(planvsActualPayload);
    }
  };

  useEffect(() => {
    if (overallJoiningFilterDate && plant?.id) {
      const formattedDate = dayjs(overallJoiningFilterDate)
        .utc()
        .format('MM-YYYY');
      const planvsActualPayload = {
        period: formattedDate,
        plantId: plant.id,
      };

      PlannedVsActualJoining(planvsActualPayload);
    }
  }, [overallJoiningFilterDate, plant?.id]);

  const startIndex = (currentGraphData - 1) * itemsMpPerGraphData;
  const endIndex = startIndex + itemsMpPerGraphData;
  const totalPages = Math.ceil(
    (dataGraph?.response?.length || 0) / itemsMpPerGraphData
  );
  const chartData =
    dataGraph
      ?.map((item) => {
        return {
          ...item,
          gap: item?.availableManpower - item?.basicRequirements,
        };
      })
      ?.slice(startIndex, endIndex) || [];

  const handleNext = () => {
    if (endIndex < dataGraph?.length) {
      setCurrentGraphData((prevPage) => prevPage + 1);
    }
  };
  const handlePrevious = () => {
    if (startIndex > 0) {
      setCurrentGraphData((prevPage) => prevPage - 1);
    }
  };

  const handleFullScreen = () => {
    if (chartContainerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        chartContainerRef?.current?.requestFullscreen();
      }
    }
  };

  return (
    <>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={plannedVsActualLoader || dateWiseLoader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <ManpowerBox>
        <Box className="top-container">
          <p className="top-title">Monthwise Manpower Requirement</p>
          <div className="date-filter">
            <div className="date-picker">
              <CustomDatePicker
                type="months"
                label="From"
                months={['month', 'year']}
                dateFormate={'MMM yyyy'}
                maxDate={dayjs().endOf('year').toDate()}
                value={filterFromDate}
                handleChange={handleFromDateChange}
                onClose={handleDatePickerCloseForFilters}
                width="241px !important"
              ></CustomDatePicker>
              <CustomDatePicker
                type="months"
                label="To"
                months={['month', 'year']}
                dateFormate={'MMM yyyy'}
                value={filterToDate}
                minDate={dayjs(filterFromDate).startOf('month').toDate()}
                maxDate={dayjs().add(1, 'year').endOf('year').toDate()}
                handleChange={handleToDateChange}
                onClose={handleDatePickerCloseForFilters}
                width="230px !important"
              ></CustomDatePicker>
            </div>

            {/* <div sx={{ position: "relative" }}>
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
                <TreeFilter onClose={handleCloseFilter}></TreeFilter>
              </Menu>
            </div> */}
          </div>
        </Box>
        <div
          className="manpower-chart-custom"
          ref={chartContainerRef}
          style={{ backgroundColor: 'white' }}
        >
          <Box
            sx={{
              margin: '10px',
              padding: '14px',
              display: 'flex',
              justifyContent: 'space-between',
              borderRadius: '10px',
              overflow: 'visible',
            }}
          >
            <p className="chart-title">{plant.plant_name} Manpower</p>
            <div className="chart-icons">
              <img
                src={back}
                alt="back"
                style={{
                  cursor: startIndex > 0 ? 'pointer' : 'not-allowed',
                  opacity: startIndex > 0 ? 1 : 0.5,
                }}
                onClick={handlePrevious}
              />
              <img
                src={next}
                alt="next"
                style={{
                  cursor:
                    endIndex < dataGraph?.length ? 'pointer' : 'not-allowed',
                  opacity: endIndex < dataGraph?.length ? 1 : 0.5,
                }}
                onClick={handleNext}
              />
              <img
                src={fullScreen}
                alt="Full Screen"
                onClick={handleFullScreen}
                style={{ cursor: 'pointer' }}
              />
            </div>
          </Box>
          <WaterfallChart
            // className="waterfall-chart-custom"
            chartData={chartData}
          ></WaterfallChart>
        </div>
      </ManpowerBox>
      <ManpowerBoxTwo>
        <Box className="top-container">
          <p className="top-title">Overall and Datewise Joining Fulfilment</p>
          <Box maxWidth={300}>
            <CustomDatePicker
              type="months"
              label="Month"
              months={['month']}
              value={overallJoiningFilterDate}
              handleChange={getDate}
              dateFormate="MMMM"
              width="230px !important"
              onClose={() => handleDatePickerClose(overallJoiningFilterDate)}
            ></CustomDatePicker>
          </Box>
        </Box>
        <FlexBox>
          <Box sx={{ padding: '22px 24px', height: '344px' }}>
            <p className="chart-title">Overall Joinings</p>
            <Box className="overall-joining" mt={2}>
              <Box display="flex" gap={'150px'} mb={2}>
                <Box>
                  <Typography variant="h4" color="#343536">
                    Planned
                  </Typography>
                  <Typography
                    variant="h2"
                    color="#a5c3ff"
                    sx={{ fontSize: '4rem', marginTop: '15px' }}
                  >
                    {Planned || 0}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h4" color="#343536">
                    Actual
                  </Typography>
                  <Typography
                    variant="h2"
                    color="#30c030"
                    sx={{ fontSize: '4rem', marginTop: '15px' }}
                  >
                    {Actual || 0}
                  </Typography>
                </Box>
              </Box>

              <Typography variant="subtitle2" color="#343536" mb={1} mt={10}>
                Joining Fulfilment Till Date
              </Typography>

              <Box display="flex" alignItems="center">
                <LinearProgress
                  variant="determinate"
                  value={percentage || 0}
                  sx={{
                    width: '100%',
                    height: '10px',
                    borderRadius: '5px',
                    fontSize: '13px',
                    mr: 1,
                    backgroundColor: '#E6E9F0',
                    '& .MuiLinearProgress-bar ': {
                      backgroundColor: '#30C030',
                    },
                  }}
                />
                <Typography
                  variant="body2"
                  color="#343536"
                  sx={{ fontSize: '13px', fontWeight: 600 }}
                >
                  {Math.round(percentage)}%
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              padding: '22px 24px',
              width: '50%',
            }}
          >
            <div>
              <p className="dateWiseChart-title">
                Datewise Planned vs Actual Joinings
              </p>
            </div>
            <div
              style={{
                height: '100%',
                marginTop: '16px',
              }}
            >
              {plannedActualGraphData?.length ? (
                <BarChart graphData={plannedActualGraphData || []}></BarChart>
              ) : (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '12px',
                    height: '100%',
                  }}
                >
                  No Record To Show
                </Box>
              )}
            </div>
          </Box>
        </FlexBox>
      </ManpowerBoxTwo>
    </>
  );
};

export default ManpowerOverview;
