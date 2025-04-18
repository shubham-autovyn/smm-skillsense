import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Backdrop,
  Box,
  CircularProgress,
  DialogTitle,
  IconButton,
  Tooltip,
  tooltipClasses,
  Typography,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
// import DialogBox from './DialogBox';
import CloseIcon from '@mui/icons-material/Close';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import SecondaryButton from '../../../../../../Utilities/Buttons/SecondaryButton/SecondaryButton.js';
import nextArrow from '../../../../../assets/svg/scroll-next.svg';
import { DataGridTable } from '../../../../../components/Data-table/dataTable.styles.js';
import DialogBox from '../../../../../components/Dialog/CustomDialogCard.js';
import PrimaryButton from '../../../../../components/PrimaryButton/PrimaryButton.js';
import SnackBar from '../../../../../components/Snackbar/Snackbar.js';
import TooltipComponent from '../../../../../components/ToolTip/ToolTip.js';
import { getSupervisorAccessData } from '../../../../../redux/Reducers/SMMRoleAccessReducer.js';
import calculateDaysUntil from '../../../../../utils/calculateDaysUntil.js';
import getInitialName from '../../../../../utils/getInitailName.js';
import useDailyDeployment from '../../../hooks/dailyDeployment.js';
import useFetchAllOperators from '../../../hooks/fetchAllOperators.js';
import useFetchNewJoinees from '../../../hooks/fetchNewJoinees.js';
import useFetchStationName from '../../../hooks/fetchStationName.js';
import AssignButton from './AssignButton.js';
import TooltipBox from './components/tooltipBox/tooltipBox.js';
import TooltipNewBox from './components/TooltipNewBox/TooltipNewBox.js';
import ConfirmDeploy from './DeploymentPopUp/ConfirmDeploymentSetUp/ConfirmDeploy.js';
import DynamicNumberSvg from './DynamicNumber.js';
import {
  ButtonGrp,
  ConfirmBox,
  InputBox,
  LabourBox,
  MainContainer,
  MainHeading,
  NewjoineeInnerBox1,
  NewjoineeInnerBoxButton1,
  NewjoineeInnerBoxButton2,
  NewjoneeBox,
  ProcessIcons,
  ProcessP,
  ProcessSpan1,
  ProcessSpan2,
  ProcessStations,
  RelieversBox,
  SBMain,
  SearchBox,
  SecondHeading,
  TabContainer,
  TableBoxDeatils,
  TableDropFirstDetails,
  TableDropInnerBox,
  TableIdLevel,
  // TableDropSecondDetails,
  // TableDropSecondName,
  TableManagement,
  TableNames,
  TraineeBox,
  TraineeP,
} from './SetUpDeployment.style.js';
import SetUpNewJoinees from './SetUpNewJoinees.js';

const SetUpDeployment = ({ stations }) => {
  const [expanded, setExpanded] = useState(false);
  const { dataAllOperators, fetchAllOperators } = useFetchAllOperators();
  const { dataStationName, fetchStationName, loading } = useFetchStationName();
  const { dataDeployment, fetchDeployment } = useDailyDeployment();
  const { dataNewJoinees, fetchNewJoinees } = useFetchNewJoinees();
  const [openDialog, setOpenDialog] = useState(false);
  const location = useLocation();
  const [newJoineees, setNewJoinees] = useState([]);
  const supervisorHierarchy = JSON.parse(localStorage.getItem('dataHierarchy'));

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeRow, setActiveRow] = useState(null);
  const [activeField, setActiveField] = useState(null);
  const [newAnchorEl, setNewAnchorEl] = useState(null);
  const [dataAllOperator, setDataAllOperator] = useState([]);
  const [payload, setPayload] = useState(null);
  const applyPayload = [];
  const [openTooltipId, setOpenTooltipId] = useState(null);
  const [openSecondTooltipId, setOpenSecondTooltipId] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);
  const [responseCode, setResponseCode] = useState(null);
  const [deploymentData, setDeploymentData] = useState(null);
  const [disable, setDisable] = useState(false);
  // const [filteredStations, setFilteredStations] = useState(stationsData || []);
  let shiftTiming = '';
  const [filteredStations, setFilteredStations] = useState([]);
  const supervisorId = localStorage.getItem('supervisorId');
  switch (supervisorHierarchy?.group) {
    case 'A':
      shiftTiming = '6:30 AM-3:15 PM';
      break;
    case 'B':
      shiftTiming = '3:15 PM-12:00 AM';
      break;
    case 'C':
      shiftTiming = '12:15 AM-6:15 AM';
      break;
    default:
      shiftTiming = '';
      break;
  }
  const [inputValue, setInputValue] = useState(null);
  const shopsForSmmSupervisor = useSelector(getSupervisorAccessData);

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  useEffect(() => {
    deploymentAPi();
    AllOperators();
  }, []);

  useEffect(() => {
    setFilteredStations(dataAllOperator);
  }, [dataAllOperator]);

  useEffect(() => {
    getNewJoinees();
  }, []);

  useEffect(() => {
    setNewJoinees(dataNewJoinees?.response);
  }, [dataNewJoinees]);

  const getNewJoinees = async () => {
    try {
      const response = await fetchNewJoinees(`supervisorId=${supervisorId}`);
      return response;
    } catch (error) {
      console.error('Error fetching new joinees:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (dataAllOperators?.response) {
      setDataAllOperator(dataAllOperators?.response?.allOperators);
    }
  }, [dataAllOperators]);

  const deploymentAPi = async () => {
    await fetchStationName(`areaSupervisorId=${supervisorId}`);
  };

  const AllOperators = async () => {
    await fetchAllOperators(`supervisorId=${supervisorId}`);
  };

  const handleApply = () => {
    setOpenDialog(true);

    rows.forEach((rowData) => {
      if (
        rowData.mainOperator.value.length > 0 ||
        rowData.trainee.value.length > 0
      ) {
        const payload = {
          ...rowData.stations,
          traineeStaffId:
            rowData?.trainee.value[0]?.staff_id ||
            rowData?.trainee.value[0]?.staffId ||
            ' ',
          operatorStaffId:
            rowData?.mainOperator.value[0]?.staff_id ||
            rowData?.mainOperator.value[0]?.staffId ||
            rowData?.stations?.deployedStaff?.staffId ||
            ' ',
        };
        delete payload.deployedStaff;
        applyPayload.push(payload);
        return setPayload(applyPayload);
      }
    });
    if (relieversAbsenteeism) {
      relieversAbsenteeism.relieversAbsenteeism.forEach((relieverData) => {
        if (
          relieverData.stations.stationName === 'Reliever' &&
          relieverData.assignData
        ) {
          const payload = {
            ...relieverData.stations,
            relieverStaffId:
              relieverData?.assignData?.staff_id ||
              relieverData?.stations?.deployedStaff?.staffId,
          };
          delete payload.deployedStaff;
          applyPayload.push(payload);
          return setPayload(applyPayload);
        }
        if (
          relieverData.stations.stationName === 'Absenteeism' &&
          relieverData.assignData
        ) {
          const payload = {
            ...relieverData.stations,
            absenteeismStaffId:
              relieverData?.assignData?.staff_id ||
              relieverData?.stations?.deployedStaff?.staffId,
          };
          delete payload.deployedStaff;
          applyPayload.push(payload);
          return setPayload(applyPayload);
        }
      });
    }
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleClickOpenMenu = (index, event) => {
    setNewAnchorEl(event.currentTarget);
    setDisable(true);
    if (openSecondTooltipId === index) {
      setOpenSecondTooltipId(null);
    } else {
      setOpenSecondTooltipId(index);
    }
  };

  const handleCloseMenu = () => {
    setOpenSecondTooltipId(null);
    setDisable(false);
    setNewAnchorEl(null);
    setFilteredStations(dataAllOperator);
  };

  const handleOpenTooltip = (event, id, field) => {
    setAnchorEl(event.currentTarget);
    setDisable(true);
    if (openTooltipId === id) {
      setOpenTooltipId(null);
    } else {
      setOpenTooltipId(id);
      setFilteredStations(dataAllOperator);
    }

    setActiveRow(id);
    setActiveField(field);
  };

  const handleCloseTooltip = () => {
    setOpenTooltipId(null);
    setActiveRow(null);
    setAnchorEl(null);
    setDisable(false);
    setFilteredStations(dataAllOperator);
  };

  const searchOption = (data) => {
    if (data?.length > 0) {
      const options = data?.map((item) => ({
        name: item?.staffName || item?.name || item?.staff_name,
        id: item?.staffId || item?.staff_id,
      }));
      return options;
    }
  };

  const handleFilterChange = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    if (!searchQuery) {
      setFilteredStations(dataAllOperator);
    } else {
      const filteredData = dataAllOperator?.filter((operator) =>
        operator.name.toLowerCase().includes(searchQuery)
      );
      setFilteredStations(filteredData || []);
    }
  };

  const handleSearchClick = async () => {
    if (inputValue !== null) {
      await fetchAllOperators(
        `operator=${inputValue}&supervisorId=${supervisorId}`
      );
    }
  };

  const handleInputChange = async (newValue) => {
    setInputValue(newValue.toUpperCase());
  };

  useEffect(() => {
    setDeploymentData(dataDeployment);
  }, [dataDeployment]);

  useEffect(() => {
    if (deploymentData) {
      setAlertMessage(
        deploymentData?.response?.message || 'Deployment successful.'
      );
      setResponseCode(deploymentData?.responseCode || 200);

      setShowSuccessAlert(true);

      const id = setTimeout(() => setShowSuccessAlert(false), 50);
      setTimeoutId(id);
    }
  }, [deploymentData]);

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);
  const applyDeployment = async () => {
    const payloadData = {
      records: payload,
    };

    payloadData.records.forEach((record) => {
      delete record.traineeStaff;
    });

    try {
      await fetchDeployment(payloadData, supervisorId);
    } catch (error) {
      console.error('Deployment failed', error);
      setAlertMessage(
        dataDeployment?.message || 'An unexpected error occurred.'
      );
      setShowSuccessAlert(true);
    } finally {
      handleCloseDialog();
      navigate(-1);
    }
  };

  function updateData(data) {
    return data?.map((value) => {
      return {
        stations: value,
        id: crypto.randomUUID(),
      };
    });
  }

  const [rows, setRows] = useState(null);
  const [relieversAbsenteeism, setRelieversAbsenteeism] = useState(null);

  useEffect(() => {
    const updatedStationData = updateData(dataStationName?.response);
    let relieversAbsenteeism = [];
    updatedStationData?.forEach((station) => {
      if (station?.stations?.stationName?.toLowerCase() === 'reliever') {
        relieversAbsenteeism.push(station);
      }
      if (station?.stations?.stationName?.toLowerCase() === 'absenteeism') {
        relieversAbsenteeism.push(station);
      }
    });

    const filteredRowsData = updatedStationData
      ?.filter(
        (item) =>
          item?.stations?.stationName?.toLowerCase() !== 'reliever' &&
          item?.stations?.stationName?.toLowerCase() !== 'absenteeism'
      )
      .map((item) => ({
        ...item,
        mainOperator: { id: crypto.randomUUID(), value: [] },
        trainee: { id: crypto.randomUUID(), value: [] },
      }));

    setRelieversAbsenteeism({ relieversAbsenteeism });
    setRows(filteredRowsData);
  }, [dataStationName?.response]);

  const treineeAssignData = (id, field, paramsId, traineeDetail) => {
    setRows((prevRows) =>
      prevRows.map((item) =>
        item?.trainee?.id === paramsId
          ? {
              ...item,
              [field]: {
                ...item[field],
                value: [...(item[field]?.value || []), traineeDetail],
              },
            }
          : item
      )
    );

    setNewJoinees((prevData) =>
      prevData?.filter((item) => item?.staffId !== id)
    );
  };

  let relieversAbsenteeismCount =
    relieversAbsenteeism?.relieversAbsenteeism?.filter(
      (item) =>
        item?.assignData ||
        (item?.stations?.deployedStaff &&
          Object.keys(item?.stations?.deployedStaff).length > 0)
    ).length;

  const options = searchOption(dataAllOperator);

  const CustomTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      fontSize: '10px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '5px',
      backgroundColor: 'white',
      color: '#656668',
    },
    [`& .${tooltipClasses.arrow}`]: {
      color: 'white',
    },
    [`& .${tooltipClasses.arrow}::before`]: {
      border: '1px solid #ccc',
      backgroundColor: '#ccc',
    },
  }));

  const renderAssignButton = (params, fieldId, field) => {
    return (
      <div>
        <AssignButton
          params={params}
          field={field}
          fieldId={fieldId}
          onDrop={acceptCard}
          handleOpenTooltip={handleOpenTooltip}
        />

        {
          <TooltipComponent
            anchorEl={anchorEl}
            title={
              <>
                <SBMain className="Search_box-main">
                  <SearchBox>
                    <InputBox
                      type="text"
                      placeholder="Filter By Station Name"
                      onChange={handleFilterChange}
                    />
                  </SearchBox>
                </SBMain>
                <TooltipBox
                  onClose={handleCloseTooltip}
                  data={
                    filteredStations.length > 0 || inputValue === null
                      ? filteredStations.filter(
                          (item) =>
                            !['Absenteeism', 'Reliever'].includes(
                              item.station_name
                            )
                        )
                      : []
                  }
                  id={params.id}
                  field={field}
                  setRows={setRows}
                  setDataAllOperator={setDataAllOperator}
                />
              </>
            }
            position="right"
            open={openTooltipId === fieldId}
          />
        }
      </div>
    );
  };

  const acceptCard = (item, slotId) => {
    newJoineees?.forEach((newJoinee) => {
      if (newJoinee?.staffId === item?.id) {
        treineeAssignData(item?.id, 'trainee', slotId, newJoinee);
      }
    });
  };
  const columns = [
    {
      field: 'stationName',
      headerName: `Process Stations (${rows?.length || ''})`,
      width: 100,
      flex: 2,
      sortable: true,
      headerClassName: 'super-app-theme--header',
      renderCell: (prams) => {
        return (
          <Box>
            <ProcessStations>
              <ProcessIcons className="ProcessIcons">
                {/* <ProcessP variant="h4">{rows.icon}</ProcessP> */}
                <ProcessP>{prams?.row?.stations?.maruAAr}</ProcessP>
              </ProcessIcons>
              <ProcessSpan1>{prams?.row?.stations?.stationName}</ProcessSpan1>
              <ProcessSpan2>
                {prams?.row?.stations?.stationDescription}
              </ProcessSpan2>
            </ProcessStations>
          </Box>
        );
      },
    },
    {
      field: 'mainOperator',
      headerName: 'Main Operator (Mandatory)',
      width: 100,
      flex: 2,
      display: 'flex',
      sortable: true,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) =>
        (params.row.mainOperator || {}).value?.length > 0 ? (
          <TableDropFirstDetails>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                fontSize: '16px',
                backgroundColor: '#9C9ECA',
                color: '#fff',
                fontWeight: '700',
              }}
            >
              {getInitialName(params?.row?.mainOperator?.value[0]?.name)}
            </div>
            {/* <TableImg src={Image} alt="icon" /> */}
            <TableBoxDeatils>
              <TableNames variant="h4">
                {params?.row?.mainOperator?.value[0]?.name}
              </TableNames>
              <TableIdLevel variant="h4">
                {' '}
                {params?.row?.mainOperator?.value[0]?.staff_id} |{' '}
                {params?.row?.mainOperator?.value[0]?.sub_category} |{' '}
                {params?.row?.mainOperator?.value[0]?.level}
              </TableIdLevel>
            </TableBoxDeatils>
          </TableDropFirstDetails>
        ) : params.row?.stations?.deployedStaff &&
          Object.keys(params.row?.stations?.deployedStaff).length > 0 ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <TableDropFirstDetails>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  fontSize: '16px',
                  backgroundColor: '#9C9ECA',
                  color: '#fff',
                  fontWeight: '700',
                }}
              >
                {getInitialName(params.row?.stations?.deployedStaff?.staffName)}
              </div>
              {/* <TableImg src={Image} alt="icon" /> */}
              <TableBoxDeatils>
                <CustomTooltip
                  title={params.row?.stations?.deployedStaff?.staffName}
                  arrow
                >
                  <TableNames variant="h4">
                    {params.row?.stations?.deployedStaff?.staffName}
                  </TableNames>
                </CustomTooltip>
                <TableIdLevel variant="h4">
                  {' '}
                  {params.row?.stations?.deployedStaff?.staffId} |{' '}
                  {String(
                    params.row?.stations?.deployedStaff?.skillLevel
                  ).padStart(2, '0')}{' '}
                  | {params.row?.stations?.deployedStaff?.staffLevel}
                </TableIdLevel>
              </TableBoxDeatils>
            </TableDropFirstDetails>
            {params.row?.stations?.deployedStaff?.relievingDate !== '' &&
              Math.abs(
                calculateDaysUntil(
                  params.row?.stations?.deployedStaff?.relievingDate
                )
              ) <= 26 && (
                <DynamicNumberSvg
                  number={Math.abs(
                    calculateDaysUntil(
                      params.row?.stations?.deployedStaff?.relievingDate
                    )
                  )}
                />
              )}
          </div>
        ) : (
          renderAssignButton(
            params,
            params?.row?.mainOperator?.id,
            'mainOperator'
          )
        ),
    },

    {
      field: 'trainee',
      headerName: 'Trainee L0 - L3(Optional)',
      width: 150,
      flex: 2,
      display: 'flex',
      sortable: true,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) =>
        (params.row.trainee || {}).value?.length > 0 ? (
          <TableDropFirstDetails>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                fontSize: '16px',
                backgroundColor: '#9C9ECA',
                color: '#fff',
                fontWeight: '700',
              }}
            >
              {getInitialName(
                params?.row?.trainee?.value[0]?.name ||
                  params?.row?.trainee?.value[0]?.staffName
              )}
            </div>
            {/* <TableImg src={Image} alt="icon" /> */}
            <TableBoxDeatils>
              <CustomTooltip title={params?.row?.trainee?.value[0]?.name} arrow>
                <TableNames variant="h4">
                  {params?.row?.trainee?.value[0]?.name ||
                    params?.row?.trainee?.value[0]?.staffName}
                </TableNames>
              </CustomTooltip>
              <TableIdLevel variant="h4">
                {' '}
                {params?.row?.trainee?.value[0]?.staff_id ||
                  params?.row?.trainee?.value[0]?.staffId}{' '}
                |{' '}
                {params?.row?.trainee?.value[0]?.sub_category ||
                  params?.row?.trainee?.value[0]?.skillLevel}{' '}
                |{' '}
                {params?.row?.trainee?.value[0]?.level ||
                  params?.row?.trainee?.value[0]?.staffLevel}
              </TableIdLevel>
            </TableBoxDeatils>
          </TableDropFirstDetails>
        ) : params.row?.stations?.traineeStaff &&
          Object.keys(params.row?.stations?.traineeStaff).length > 0 ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <TableDropFirstDetails>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  fontSize: '16px',
                  backgroundColor: '#9C9ECA',
                  color: '#fff',
                  fontWeight: '700',
                }}
              >
                {getInitialName(params.row?.stations?.traineeStaff?.staffName)}
              </div>
              {/* <TableImg src={Image} alt="icon" /> */}
              <TableBoxDeatils>
                <TableNames variant="h4">
                  {params.row?.stations?.traineeStaff?.staffName}
                </TableNames>
                <TableIdLevel variant="h4">
                  {' '}
                  {params.row?.stations?.traineeStaff?.staffId} |{' '}
                  {String(
                    params.row?.stations?.traineeStaff?.skillLevel
                  ).padStart(2, '0')}{' '}
                  | {params.row?.stations?.traineeStaff?.staffLevel}
                </TableIdLevel>
              </TableBoxDeatils>
            </TableDropFirstDetails>
            {params.row?.stations?.deployedStaff?.relievingDate !== '' &&
              Math.abs(
                calculateDaysUntil(
                  params.row?.stations?.deployedStaff?.relievingDate
                )
              ) <= 26 && (
                <DynamicNumberSvg
                  number={Math.abs(
                    calculateDaysUntil(
                      params.row?.stations?.deployedStaff?.relievingDate
                    )
                  )}
                />
              )}
          </div>
        ) : (
          renderAssignButton(params, params?.row?.trainee?.id, 'trainee')
        ),
    },
  ];

  const handleBack = () => {
    navigate(-1);
  };

  const scrollRef = useRef(null);
  let currentScrollLeft = 0;
  const handleScrollNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 400,
        behavior: 'smooth',
      });
      currentScrollLeft = scrollRef.current.scrollLeft;
    }
  };

  const handleScrollBack = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <MainContainer
        style={{
          pointerEvents: disable === true ? 'none ' : 'auto',
          opacity: disable ? 0.5 : 1,
          cursor: disable ? 'not-allowed ' : 'pointer',
        }}
      >
        <Box style={{ height: '90vh' }}>
          <Box>
            <MainHeading>
              {`Set Up Daily Deployment For Line ${supervisorHierarchy?.line} > ${supervisorHierarchy?.shopName} > Shift-${supervisorHierarchy?.group} > ${shiftTiming} `}
            </MainHeading>
          </Box>
          <Box>
            <SecondHeading>
              Once saved, this deployment setting will take effect immediately
              and will be used every day.
            </SecondHeading>
          </Box>
          {newJoineees && newJoineees?.length > 0 && (
            <NewjoneeBox>
              <div>
                <div style={{ marginBottom: '10px' }}>
                  <span>
                    {(newJoineees?.length).toString().padStart(2, '0')} New
                    Joinees
                  </span>{' '}
                  <span
                    style={{
                      border: '1px solid black',
                      height: '12px',
                      display: 'inline-block',
                    }}
                  ></span>
                  <span style={{ marginLeft: '5px' }}>
                    {' '}
                    Drag and drop in Trainees column to start their On the Job
                    Training
                  </span>
                </div>
                <NewjoineeInnerBox1 ref={scrollRef}>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <NewjoineeInnerBoxButton1 onClick={handleScrollBack}>
                      {' '}
                      <img
                        src={nextArrow}
                        alt="icon"
                        style={{ transform: 'rotate(180deg)' }}
                      />
                    </NewjoineeInnerBoxButton1>
                    {newJoineees?.map((item, index) => (
                      <SetUpNewJoinees newJoineeData={item} idx={index} />
                    ))}
                  </div>

                  <NewjoineeInnerBoxButton2 onClick={handleScrollNext}>
                    {' '}
                    <img src={nextArrow} alt="icon" />
                  </NewjoineeInnerBoxButton2>
                </NewjoineeInnerBox1>
              </div>
            </NewjoneeBox>
          )}

          <TabContainer>
            <TableManagement>
              <DataGridTable
                columns={columns}
                rows={rows}
                pagination={false}
                rowHeight={90}
                disableColumnSorting
                disableColumnResize
                disableColumnMenu
              />
            </TableManagement>

            <Box sx={{ width: '20%', overflow: 'hidden' }}>
              <Accordion
                expanded={expanded}
                onChange={handleExpansion}
                style={{
                  backgroundColor: '#CFD2D9',
                  minHeight: '40px',
                  borderRadius: '8px',
                  marginBottom: '10px',
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  style={{
                    backgroundColor: '#CFD2D9',
                    minHeight: '50px',
                  }}
                  sx={{
                    '&.Mui-expanded': {
                      minHeight: 'unset',
                    },
                  }}
                >
                  <Typography variant="h4">
                    Relievers & Absenteeism Cover (
                    {relieversAbsenteeism?.relieversAbsenteeism?.length || 0})
                  </Typography>
                </AccordionSummary>

                <AccordionDetails
                  style={{
                    backgroundColor: '#f4f5f8',
                    overflowY: 'auto',
                    maxHeight: '62vh',
                  }}
                >
                  <RelieversBox>
                    <div>
                      <LabourBox sx={{ flexDirection: 'column' }}>
                        {relieversAbsenteeism?.relieversAbsenteeism?.map(
                          (field, index) => (
                            <div key={`station-${index}`}>
                              {field?.assignData ? (
                                <TableDropFirstDetails>
                                  <TableDropInnerBox>
                                    {getInitialName(field?.assignData?.name)}
                                  </TableDropInnerBox>
                                  <TableBoxDeatils>
                                    <TableNames variant="h4">
                                      {field?.assignData?.name}
                                    </TableNames>
                                    <TableIdLevel variant="h4">
                                      {' '}
                                      {field?.assignData?.staff_id} |{' '}
                                      {field?.assignData?.sub_category} |{' '}
                                      {field?.assignData?.level}
                                    </TableIdLevel>
                                  </TableBoxDeatils>
                                </TableDropFirstDetails>
                              ) : field?.stations?.deployedStaff ? (
                                <TableDropFirstDetails>
                                  <TableDropInnerBox>
                                    {getInitialName(
                                      field?.stations?.deployedStaff?.staffName
                                    )}
                                  </TableDropInnerBox>
                                  <TableBoxDeatils>
                                    <CustomTooltip
                                      title={
                                        field?.stations?.deployedStaff
                                          ?.staffName
                                      }
                                      arrow
                                    >
                                      <TableNames variant="h4">
                                        {
                                          field?.stations?.deployedStaff
                                            ?.staffName
                                        }
                                      </TableNames>
                                    </CustomTooltip>
                                    <TableIdLevel variant="h4">
                                      {field?.stations?.deployedStaff?.staffId}{' '}
                                      |{' '}
                                      {String(
                                        field?.stations?.deployedStaff
                                          ?.skillLevel
                                      ).padStart(2, '0')}{' '}
                                      |{' '}
                                      {
                                        field?.stations?.deployedStaff
                                          ?.staffLevel
                                      }
                                    </TableIdLevel>
                                  </TableBoxDeatils>
                                </TableDropFirstDetails>
                              ) : (
                                <div>
                                  <button
                                    style={{ backgroundColor: 'transparent' }}
                                    id={`basic-button-${index}`}
                                    aria-controls={
                                      openSecondTooltipId === index
                                        ? 'basic-menu'
                                        : undefined
                                    }
                                    aria-haspopup="true"
                                    aria-expanded={
                                      openSecondTooltipId === index
                                        ? 'true'
                                        : undefined
                                    }
                                    onClick={(event) =>
                                      handleClickOpenMenu(index, event)
                                    }
                                  >
                                    <TraineeBox headerClassName="trainee">
                                      <TraineeP>+ Assign</TraineeP>
                                    </TraineeBox>
                                  </button>

                                  {openSecondTooltipId === index && (
                                    <TooltipComponent
                                      anchorEl={newAnchorEl}
                                      id={`basic-menu-${index}`}
                                      title={
                                        <>
                                          <SBMain className="Search_box-main">
                                            <SearchBox>
                                              <InputBox
                                                type="text"
                                                placeholder="Filter By Station Name"
                                                onChange={handleFilterChange}
                                                onInputChange={
                                                  handleInputChange
                                                }
                                                onSearchClick={
                                                  handleSearchClick
                                                }
                                                autoComplete="off"
                                                spellCheck={false}
                                              />
                                            </SearchBox>
                                          </SBMain>
                                          <TooltipNewBox
                                            onClose={handleCloseMenu}
                                            data={dataAllOperator}
                                            id={field.id}
                                            field={field}
                                            dataAllOperator={dataAllOperator}
                                            setRelieversAbsenteeism={
                                              setRelieversAbsenteeism
                                            }
                                            setDataAllOperator={
                                              setDataAllOperator
                                            }
                                            relieversAbsenteeism={
                                              relieversAbsenteeism
                                            }
                                          />
                                        </>
                                      }
                                      position="left"
                                      open={true}
                                    />
                                  )}
                                </div>
                              )}
                            </div>
                          )
                        )}
                      </LabourBox>
                    </div>
                    <div></div>
                  </RelieversBox>
                </AccordionDetails>
              </Accordion>
            </Box>
          </TabContainer>
          <ButtonGrp>
            <Box>
              <SecondaryButton
                bgColor="none"
                padding="0px 20px"
                onClick={handleBack}
                // width="28px"
                // onClick={onClose}
              >
                Cancel
              </SecondaryButton>
            </Box>
            <Box>
              <PrimaryButton onClick={handleApply}>Apply Setting</PrimaryButton>
            </Box>
          </ButtonGrp>
        </Box>
      </MainContainer>

      <DialogBox open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle
          style={{
            color: '#343536',
            fontSize: '16px',
            fontWeight: '600',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 14px',
          }}
        >
          Confirm Deployment Set Up
          <IconButton
            sx={{ p: 0 }}
            aria-label="close"
            onClick={handleCloseDialog}
          >
            <CloseIcon sx={{ width: '16PX', height: '16px' }} />
          </IconButton>
        </DialogTitle>
        <ConfirmBox>
          <ConfirmDeploy
            payload={payload}
            onCancel={handleCloseDialog}
            applyDeployment={applyDeployment}
          />
        </ConfirmBox>
      </DialogBox>
      <SnackBar
        showSuccessAlert={showSuccessAlert}
        responseCode={responseCode}
        alertMessage={alertMessage}
      />
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </DndProvider>
  );
};

export default SetUpDeployment;
