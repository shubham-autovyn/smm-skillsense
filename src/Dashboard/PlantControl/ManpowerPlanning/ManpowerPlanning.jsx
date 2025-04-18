import {
  Backdrop,
  Box,
  CircularProgress,
  IconButton,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import DownloadIcon from '../../../assets/svg/DawnloadIcon.svg';

import HiringDialog from './hiringPlanDialogBox/hiringDialog';
import { MainContainer, TopBox } from './ManpowerPlanning.style';
import ManpowerTabular from './manpowerTabularView/manpowerTabular';
import { PlantManpowerChart } from './mapowerPlanningChart';

import { useNavigate } from 'react-router-dom';
import * as shopReducer from '../../../redux/Reducers/SMMShopReducer';

import SecondaryButton from '../../../utils/Buttons/SecondaryButton/SecondaryButton';

import fullScreen from '../../../assets/svg/full-screen.svg';
import back from '../../../assets/svg/goback.svg';
import next from '../../../assets/svg/next-arrow.svg';
import refresh from '../../../assets/svg/refresh.svg';

import FilterYearMonthDay from '../../../components/FilterYearMonthDay/filterYearMonthDay';
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';
import SnackBar from '../../../components/Snackbar/Snackbar';
import LocationName from '../../../utils/locationName';
import { generateTableExcel } from '../../../utils/tableDownload';
import useTableDownload from '../../Dpm/hooks/tableDownload';
import usePlantManpowerGraph from '../hooks/manpowerPlanningGraph';
import usePlantControlTable from '../hooks/manpowerTable';

const ManpowerPlanning = () => {
  const plant = useSelector(shopReducer.getPlant);
  const location = useSelector(shopReducer.getLocation);
  const shop = useSelector(shopReducer.getShop);
  const [open, setOpen] = useState(false);
  const [currentGraphData, setCurrentGraphData] = useState(0);
  const itemsPerVehGraphData = 7;
  const graphContainerRef = useRef(null);
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [dataGraph, setDataGraph] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const { dataTableDownload, fetchTableDownload, loading } = useTableDownload();
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterDateData, setFilterDateData] = useState([]);

  const {
    plantDataTable: plantDataTable,
    fetchPlantData: fetchPlantDataTable,
    loading: tableLoading,
  } = usePlantControlTable();
  const { fetchData: fetchDataGraph, loading: graphLoader } =
    usePlantManpowerGraph();

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    TableApi();
  }, [plant.id, fetchDataGraph]);

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

  const TableApi = async ({
    selectedFromDate,
    selectedToDate,
    dayWiseBtn,
  } = {}) => {
    if (selectedFromDate && selectedToDate && dayWiseBtn && plant.id) {
      setDayWiseBtn(dayWiseBtn);
      setFilterDateData([selectedFromDate, selectedToDate, dayWiseBtn]);

      try {
        const tablePayload = {
          plantId: plant.id,
          startDate: dayjs(selectedFromDate).format('DD-MM-YYYY'),
          endDate: dayjs(selectedToDate).format('DD-MM-YYYY'),
          datePeriod: dayWiseBtn,
        };
        const graphPayload = {
          startDate: dayjs(selectedFromDate).format('DD-MM-YYYY'),
          endDate: dayjs(selectedToDate).format('DD-MM-YYYY'),
          plantId: plant.id,
          datePeriod: dayWiseBtn,
        };

        const response = await fetchDataGraph(graphPayload);

        if (response?.data?.responseCode === 200) {
          setDataGraph(response?.data);
        }
        const responseData = await fetchPlantDataTable(tablePayload);

        if (responseData.data.responseCode === 200) {
          setTableData(responseData?.data?.response);
        }
        setCurrentGraphData(0);
      } catch (error) {
        console.log(Error);
      }
    } else {
    }
  };

  const startIndex = currentGraphData * itemsPerVehGraphData;
  const endIndex = startIndex + itemsPerVehGraphData;
  let dataVehGraph = dataGraph?.response?.slice(startIndex, endIndex) || [];
  dataVehGraph = dataVehGraph.map((item) => {
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

  const roundedBaseRequirement = dataVehGraph?.map((item) => {
    return Math.floor(item?.basicRequirement / 100) * 100;
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
    TableApi({
      selectedFromDate: filterDateData[0],
      selectedToDate: filterDateData[1],
      dayWiseBtn: dayWiseBtn,
    });
  };
  const handleFullScreen = () => {
    if (graphContainerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        graphContainerRef?.current?.requestFullscreen();
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
        filterDateData[0],
        filterDateData[1],
        dayWiseBtn,
        shop.id
      );
      const responseData = await fetchTableDownload(payload);
      if (responseData?.data?.responseCode === 200) {
        const excelData = responseData.data.response.response;
        generateTableExcel(excelData, 'ManpowerPlanning-Plant-Control.xlsx');
      } else {
        setAlertMessage(responseData?.data?.message || 'An error occurred');
        setShowSuccessAlert(true);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const filterDataByShopName = (data, shopName) => {
    return {
      ...data,
      tableData: data?.tableData?.map((category) => ({
        ...category,
        // child: category?.child?.filter((shop) => shop.category === shopName),
        category: LocationName(category?.category),
      })),
      // ?.filter((category) => category.child.length > 0),
    };
  };

  useEffect(() => {
    if (shop === 'All') {
      setFilteredData(tableData);
    } else {
      setFilteredData(filterDataByShopName(tableData));
    }
  }, [shop, tableData]);

  return (
    <>
      <Backdrop
        sx={(theme) => ({
          color: '#fff',
          zIndex: theme.zIndex.drawer + 1,
        })}
        open={tableLoading || graphLoader || loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <MainContainer>
        <TopBox>
          <Typography
            variant="h3"
            sx={{ fontWeight: 'bold', color: '#343536' }}
          >
            Manpower Planning
          </Typography>
          <Box sx={{ display: 'flex', gap: '10px' }}>
            <Box>
              <PrimaryButton onClick={handleClickOpen}>
                Export Hiring Plan
              </PrimaryButton>
            </Box>
            <Box>
              <SecondaryButton
                onClick={() => navigate('/SMM/add-joining-plan')}
              >
                Add Joining Plan
              </SecondaryButton>
            </Box>
            <HiringDialog open={open} onClose={handleClose} />
          </Box>
        </TopBox>
        <Box sx={{ padding: '0px 25px' }}>
          <FilterYearMonthDay filterData={TableApi}></FilterYearMonthDay>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            margin: '25px',
          }}
        >
          <Typography
            variant="h3"
            sx={{ fontWeight: 'bold', color: '#343536' }}
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
              margin: '12px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <p className="chart-title">
              {LocationName(location.location_name)} Manpower
            </p>
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
                alt="refresh"
                onClick={handleRefresh}
                style={{ cursor: 'pointer' }}
              />
            </div>
          </Box>
          <PlantManpowerChart
            dataVehGraph={dataVehGraph}
            minYValue={minYValue}
          ></PlantManpowerChart>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            margin: '25px 25px 0px',
          }}
        >
          <Typography variant="body1">Tabular View</Typography>
          <IconButton
            color="primary"
            onClick={handleTableDownload}
            sx={{ marginLeft: 'auto' }}
          >
            <img src={DownloadIcon} alt="icon" />
          </IconButton>
        </Box>
        <Box
          sx={{
            margin: '0px 25px 25px 25px ',
            border: '1px solid #ccc',
          }}
        >
          {filteredData?.tableData?.length > 0 &&
          filteredData?.particulars?.length > 0 ? (
            <ManpowerTabular
              tableData={filteredData}
              dayWiseBtn={dayWiseBtn}
            ></ManpowerTabular>
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
      </MainContainer>
      <SnackBar
        showSuccessAlert={showSuccessAlert}
        alertMessage={alertMessage}
        responseCode={dataTableDownload?.responseCode}
        handleClose={() => setShowSuccessAlert(false)}
      />
    </>
  );
};

export default ManpowerPlanning;
