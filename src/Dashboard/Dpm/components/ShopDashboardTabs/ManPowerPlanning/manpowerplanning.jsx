import {
  Backdrop,
  Box,
  CircularProgress,
  IconButton,
  Typography,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { ApexChart } from './Chart/chart';

import DownloadIcon from '../../../../../assets/svg/DawnloadIcon.svg';
import fullScreen from '../../../../../assets/svg/full-screen.svg';
import back from '../../../../../assets/svg/goback.svg';
import next from '../../../../../assets/svg/next-arrow.svg';
import refresh from '../../../../../assets/svg/refresh.svg';

import dayjs from 'dayjs';
import FilterYearMonthDay from '../../../../../components/FilterYearMonthDay/filterYearMonthDay';
import * as shopReducer from '../../../../../redux/Reducers/SMMShopReducer';
import { generateTableExcel } from '../../../../../utils/tableDownload';
import useManpowerPlanningGraph from '../../../hooks/manpowerPlanningGraph';
import useManpowerPlanningTable from '../../../hooks/manpowerPlanningTable';
import useTableDownload from '../../../hooks/tableDownload';
import DpmManpowerTabular from './DpmManpowerTabularTable/tabular';

const DpmManpowerPlanning = () => {
  const shop = useSelector(shopReducer.getShop);
  const [isGraphVisible, setIsGraphVisible] = useState(true);
  const [currentGraphData, setCurrentGraphData] = useState(0);
  const itemsPerGraphData = 7;
  const graphContainerRef = useRef(null);
  const [filteredData, setFilteredData] = useState([]);
  const [dataGraph, setDataGraph] = useState([]);
  const {
    dataTable: dataTable,
    fetchData: fetchDataTable,
    loading: tableLoader,
  } = useManpowerPlanningTable();
  const { fetchData: fetchDataGraph, loading: graphLoader } =
    useManpowerPlanningGraph();

  const { dataTableDownload, fetchTableDownload, loading } = useTableDownload();

  useEffect(() => {
    if (shop.id) {
      apiFetch();
    }
  }, [shop.id, fetchDataGraph]);

  const [dayWiseBtn, setDayWiseBtn] = useState('');

  const createPayload = (
    selectedFromDate,
    selectedToDate,
    dayWiseBtn,
    shopId
  ) => ({
    startDate: dayjs(selectedFromDate).format('DD-MM-YYYY'),
    endDate: dayjs(selectedToDate).format('DD-MM-YYYY'),
    shopId,
    datePeriod: dayWiseBtn,
  });

  const apiFetch = async ({
    selectedFromDate,
    selectedToDate,
    dayWiseBtn,
  } = {}) => {
    if (!selectedFromDate || !selectedToDate || !dayWiseBtn || !shop.id) {
      return;
    }

    setDayWiseBtn(dayWiseBtn);
    const payload = createPayload(
      selectedFromDate,
      selectedToDate,
      dayWiseBtn,
      shop.id
    );
    setFilteredData([selectedFromDate, selectedToDate, dayWiseBtn]);
    try {
      const response = await fetchDataGraph(payload);
      if (response?.data?.responseCode === 200) {
        setDataGraph(response?.data);
      }
      await fetchDataTable(payload);
      setCurrentGraphData(0);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCollapse = () => {
    setIsGraphVisible((prevState) => !prevState);
  };

  const startIndex = currentGraphData * itemsPerGraphData;
  const endIndex = startIndex + itemsPerGraphData;
  let currentItems = dataGraph?.response?.slice(startIndex, endIndex) || [];
  currentItems = currentItems.map((item) => {
    return {
      ...item,
      absenteesim:
        (item?.absenteesim || 0) +
        ((item?.basicRequirement || 0) -
          ((item?.attrition || 0) + (item?.absenteesim || 0))),
      basicRequirement:
        (item?.basicRequirement || 0) -
        ((item?.attrition || 0) + (item?.absenteesim || 0)),
    };
  });

  const roundedBaseRequirement = currentItems?.map((item) => {
    return Math.floor(item.basicRequirement / 100) * 100;
  });

  let minYValue =
    roundedBaseRequirement?.length && Math.min(...roundedBaseRequirement);

  const handleNext = () => {
    if (endIndex < dataGraph?.response?.length) {
      setCurrentGraphData((prevPage) => prevPage + 1);
    }
  };
  const handlePrevious = () => {
    if (startIndex > 0) {
      setCurrentGraphData((prevPage) => prevPage - 1);
    }
  };

  const handleRefresh = () => {
    apiFetch({
      selectedFromDate: filteredData[0],
      selectedToDate: filteredData[1],
      dayWiseBtn: dayWiseBtn,
    });
  };

  const handleFullScreen = () => {
    if (graphContainerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        graphContainerRef.current.requestFullscreen();
      }
    }
  };

  const onFullScreenChange = () => {
    if (document.fullscreenElement === graphContainerRef.current) {
      graphContainerRef.current.style.backgroundColor = 'white';
    } else {
      graphContainerRef.current.style.backgroundColor = '';
    }
  };

  React.useEffect(() => {
    document.addEventListener('fullscreenchange', onFullScreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', onFullScreenChange);
    };
  }, []);

  const handleTableDownload = async () => {
    try {
      const payload = createPayload(
        filteredData[0],
        filteredData[1],
        dayWiseBtn,
        shop.id
      );
      const responseData = await fetchTableDownload(payload);
      if (responseData.data.responseCode === 200) {
        const excelData = responseData.data.response.response;
        generateTableExcel(excelData, 'ManpowerPlanning-DPM.xlsx');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  console.log(graphLoader, tableLoader);

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={tableLoader || graphLoader || loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        sx={{
          backgroundColor: 'white',
          padding: '0 16px 16px',
          marginTop: '10px',
        }}
      >
        <FilterYearMonthDay filterData={apiFetch}></FilterYearMonthDay>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginTop: '20px',
          }}
        >
          <Typography
            variant="body1"
            sx={{ fontWeight: 600, fontSize: '14px', color: '#343536' }}
          >
            Graphical View
          </Typography>
        </Box>
        <Box
          ref={graphContainerRef}
          sx={{
            border: '1px solid #e5e6e6',
            padding: '14px',
            margin: '10px',
            borderRadius: '10px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h4">{shop.shop_name} Manpower</Typography>

            <Box sx={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <img
                src={back}
                alt="Previous"
                style={{
                  cursor: startIndex > 0 ? 'pointer' : 'not-allowed',
                  opacity: startIndex > 0 ? 1 : 0.5,
                }}
                onClick={handlePrevious}
              />
              <img
                src={next}
                alt="Next"
                style={{
                  cursor:
                    endIndex < dataGraph?.response?.length
                      ? 'pointer'
                      : 'not-allowed',
                  opacity: endIndex < dataGraph?.response?.length ? 1 : 0.5,
                }}
                onClick={handleNext}
                disabled={endIndex >= dataGraph?.response?.length}
              />
              <img
                src={fullScreen}
                alt="Full Screen"
                onClick={handleFullScreen}
                style={{ cursor: 'pointer' }}
              />
              <img
                src={refresh}
                alt="Refresh"
                onClick={handleRefresh}
                style={{ cursor: 'pointer' }}
              />
            </Box>
          </Box>
          <ApexChart
            currentItems={currentItems}
            minYValue={minYValue}
          ></ApexChart>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            margin: '20px 25px 0px',
          }}
        >
          <Typography variant="h4">Tabular View</Typography>
          <IconButton
            color="primary"
            onClick={handleTableDownload}
            sx={{ marginLeft: 'auto' }}
          >
            <img src={DownloadIcon} alt="icon" />
          </IconButton>
        </Box>
        <Box sx={{ margin: '0px 25px 25px 25px ', border: '1px solid #ccc' }}>
          {dataTable?.response?.particulars?.length > 0 &&
          dataTable?.response?.tableData[0] ? (
            <DpmManpowerTabular
              tableData={dataTable?.response}
              dayWiseBtn={dayWiseBtn}
            ></DpmManpowerTabular>
          ) : (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '200px',
                color: '#666',
                fontSize: '16px',
                fontWeight: '500',
              }}
            >
              Data not found
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default DpmManpowerPlanning;
