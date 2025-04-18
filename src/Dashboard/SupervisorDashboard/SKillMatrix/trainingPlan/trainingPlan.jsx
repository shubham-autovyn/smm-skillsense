import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChangeHistoryOutlinedIcon from '@mui/icons-material/ChangeHistoryOutlined';
import {
  Backdrop,
  Box,
  CircularProgress,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../../../../components/PrimaryButton/PrimaryButton';
import useFetchMultiSkill from '../../hooks/fetchMultiSkill';

import sorting from '../../../../assets/icons/SortIcon.svg';

import {
  BlueBall,
  DateHeaderText,
  DateHeaderTextSpan,
  FlexAlignBox,
  FlexBetweenBox,
  FlexBox,
  FlexData,
  FooterDetailPara,
  FooterPara,
  GreenBall,
  HeaderText,
  LastApproval,
  MainContainer,
  MainHeading,
  SubContainer,
  SubContainer2,
  TableBg,
  TableCells,
  TableCellsStyle,
  TableCellsStyle2,
  TableData,
  TableDataNo,
  TableFooterNumBox,
  YellowBall,
} from './trainingPlan.styles';

// SkillBox component to display individual skill levels in each month
const SkillBox = ({ label, isPlannedMonth, isActual, isSameMonth }) => {
  const backgroundColor = isActual
    ? '#30C030' // Green for actuals when achieved
    : isPlannedMonth && !isSameMonth
    ? '#ffffff' // White for planned if not achieved in the planned month
    : 'transparent'; // Transparent if no planned or actual

  return (
    <TableData>
      <TableDataNo
        sx={{
          backgroundColor,
          width: '100%',
          minWidth: '33px',
          height: '100%',
          minHeight: '29px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {label || ''}
      </TableDataNo>
    </TableData>
  );
};

SkillBox.propTypes = {
  label: PropTypes.string,
  isPlannedMonth: PropTypes.bool.isRequired,
  isActual: PropTypes.bool.isRequired,
  isSameMonth: PropTypes.bool.isRequired,
};

// Main TrainingPlan component
const TrainingPlan = () => {
  const [sortDirection, setSortDirection] = useState('asc');
  const [sortedData, setSortedData] = useState([]);

  const stationsData = [
    { id: 1, station: 'Apr', isMaru: true },
    { id: 2, station: 'May', isMaru: true },
    { id: 3, station: 'Jun', isMaru: true },
    { id: 4, station: 'Jul', isMaru: true },
    { id: 5, station: 'Aug', isMaru: true },
    { id: 6, station: 'Sep', isMaru: true },
    { id: 7, station: 'Oct', isMaru: true },
    { id: 8, station: 'Nov', isMaru: true },
    { id: 9, station: 'Dec', isMaru: true },
    { id: 10, station: 'Jan', isMaru: true },
    { id: 11, station: 'Feb', isMaru: true },
    { id: 12, station: 'March', isMaru: true },
  ];

  const {
    dataMultiSkill: dataMultiSkill,
    fetchMultiSkill: fetchMultiSkill,
    loading: loading,
  } = useFetchMultiSkill();
  const [supervisorId, setSupervisorId] = useState('');

  useEffect(() => {
    setSupervisorId(localStorage.getItem('supervisorId'));
    if (supervisorId) {
      fetchMultiSkillTranning();
    }
  }, [supervisorId]);

  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  const fetchMultiSkillTranning = async () => {
    try {
      const params = `supervisorId=${supervisorId}`;
      const responseData = await fetchMultiSkill(params);
      if (responseData.data.responseCode === 200) {
        setSortedData(responseData?.data?.response || []);
      }
    } catch (error) {}
  };

  // Handle sorting when clicking on the sorting icon
  const handleSortClick = (column) => {
    const sorted = [...(dataMultiSkill?.response || [])];
    console.log(dataMultiSkill, 'dataMultiSkill');

    sorted.sort((a, b) => {
      if (column === 'staffName') {
        return sortDirection === 'asc'
          ? a.staffName.localeCompare(b.staffName)
          : b.staffName.localeCompare(a.staffName);
      }
      if (column === 'skill') {
        return sortDirection === 'asc' ? a.skill - b.skill : b.skill - a.skill;
      }
      return 0;
    });

    setSortedData(sorted);
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  return (
    <MainContainer>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <SubContainer>
        <Box>
          <ArrowBackIcon
            onClick={handleBackClick}
            sx={{ cursor: 'pointer', fontSize: '23px' }}
          />
          <MainHeading>Multi-Skilling Training Plan</MainHeading>
        </Box>
        <Box style={{ display: 'flex', alignItems: 'center' }}>
          <LastApproval>Last approval on: 07/07/23; 15:39:54</LastApproval>
          <div>
            <PrimaryButton>Send For Approval</PrimaryButton>
          </div>
        </Box>
      </SubContainer>

      <SubContainer2>
        <TableBg>
          <TableHead>
            <TableRow
              sx={{
                verticalAlign: 'baseline',
              }}
            >
              <TableCells sx={{ textAlign: 'center' }}>
                <div style={{ margin: '0px 10px' }}>
                  S.No.{' '}
                  <img
                    src={sorting}
                    style={{ cursor: 'pointer', width: '10px' }}
                    onClick={() => handleSortClick('staffName')}
                    alt=""
                  />
                </div>
              </TableCells>
              <TableCells sx={{ textAlign: 'center' }}>
                Operator{' '}
                <img
                  src={sorting}
                  style={{ cursor: 'pointer', width: '10px' }}
                  onClick={() => handleSortClick('staffName')}
                  alt=""
                />
              </TableCells>
              <TableCells sx={{ textAlign: 'center' }}>
                <div style={{ margin: '0px 10px' }}>
                  % Skill Available <br /> till last month{' '}
                  <img
                    src={sorting}
                    style={{ cursor: 'pointer', width: '10px' }}
                    onClick={() => handleSortClick('skill')}
                    alt=""
                  />
                </div>
              </TableCells>
              <TableCells sx={{ textAlign: 'center' }}>Training</TableCells>
              <TableCells sx={{ padding: '0' }} colSpan={stationsData.length}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      lineHeight: '1rem',
                      border: '1px solid #E6E9F0',
                    }}
                  >
                    <DateHeaderText>Station No./Skill Level</DateHeaderText>
                    <DateHeaderText>
                      Total Available Skill:
                      <DateHeaderTextSpan>
                        {dataMultiSkill?.response?.length * 4 || ''} (No. of
                        Stations * 4)
                      </DateHeaderTextSpan>
                    </DateHeaderText>
                  </Box>
                  <Box sx={{ display: 'flex' }}>
                    <TableRow sx={{ width: '100%' }}>
                      {stationsData.map((station, index) => (
                        <TableCell
                          style={
                            station.station
                              ? {
                                  width: 'calc(100% / 12)',
                                  display: 'inline-block',
                                  borderRight:
                                    '1px solid rgba(224, 224, 224, 1)',
                                  borderBottom: '0px',
                                }
                              : {}
                          }
                          key={index}
                          className="table-cell-custom "
                        >
                          <Box style={{ padding: '8px 12px' }}>
                            <HeaderText>{station.station}</HeaderText>
                          </Box>
                        </TableCell>
                      ))}
                    </TableRow>
                  </Box>
                </Box>
              </TableCells>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.length ? (
              sortedData.map((op, index) => (
                <TableRow key={op.id} sx={{ width: '100%' }}>
                  <TableCells sx={{ width: '100%', textAlign: 'center' }}>
                    {index + 1}
                  </TableCells>
                  <TableCells
                    sx={{
                      whiteSpace: 'nowrap',
                      padding: '6px',
                      textAlign: 'center',
                      width: '100%',
                    }}
                  >
                    {op.staffName}
                    <Box
                      sx={{
                        color: '#9EA1A7',
                        padding: '5px',
                        textAlign: 'center',
                      }}
                    >{`${op.staffId} | ${op.type || ''}`}</Box>
                  </TableCells>
                  <TableCells style={{ textAlign: 'center' }}>
                    {op.percentageSkill || 0}
                  </TableCells>
                  <TableCells
                    sx={{
                      padding: '0px',
                      lineHeight: '1.87',
                      fontWeight: '400',
                    }}
                  >
                    <TableCellsStyle key={index}>
                      <div>Plan</div>
                    </TableCellsStyle>
                    <TableCellsStyle2 key={index}>
                      <div>Actual</div>
                    </TableCellsStyle2>
                  </TableCells>

                  {stationsData.map((station, i) => {
                    const planned = op.stations.find(
                      (s) => s.planned?.plannedMonth === station.station
                    )?.planned;
                    const actual = op.stations.find(
                      (s) => s.actual?.plannedMonth === station.station
                    )?.actual;

                    const isSameMonth =
                      !!planned &&
                      !!actual &&
                      planned.plannedMonth === actual.plannedMonth;

                    return (
                      <TableCells
                        key={i}
                        sx={{
                          padding: '0',
                          borderBottom: '0',
                          border: 'none !important',
                        }}
                      >
                        <SkillBox
                          label={
                            planned
                              ? `${planned.stationName}/${planned.plannedLevel}`
                              : null
                          }
                          isPlannedMonth={!!planned}
                          isActual={false}
                          isSameMonth={isSameMonth ?? false}
                        />

                        <SkillBox
                          label={
                            actual
                              ? `${actual.stationName}/${actual.plannedLevel}`
                              : null
                          }
                          isPlannedMonth={false}
                          isActual={!!actual}
                          isSameMonth={isSameMonth ?? false}
                        />
                      </TableCells>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={stationsData.length + 4}
                  sx={{ textAlign: 'center', padding: '20px' }}
                >
                  <Typography sx={{ padding: '80px 0px' }} variant="h3">
                    Data Not Found
                  </Typography>

                  <FlexBetweenBox>
                    <Box>K002-1</Box>
                    <FlexAlignBox>
                      <FlexBox>
                        <FooterPara>Document Classification : </FooterPara>
                        <FooterDetailPara>
                          Secret [ ] Confidential [ ] <b> Internal [*] </b>{' '}
                          Public [ ]
                        </FooterDetailPara>
                      </FlexBox>
                      <FooterPara>
                        User department shall ensure the classification based on
                        Information Security policy of MSIL
                      </FooterPara>
                    </FlexAlignBox>
                    <Box sx={{ position: 'relative' }}>
                      <ChangeHistoryOutlinedIcon sx={{ fontSize: '38px' }} />
                      <TableFooterNumBox>
                        <Typography varent="h3">4</Typography>
                      </TableFooterNumBox>
                    </Box>
                  </FlexBetweenBox>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </TableBg>
      </SubContainer2>
      <FlexData>
        <Typography varent="h3.strong">Legend : </Typography>
        <Typography varent="h3">
          <YellowBall></YellowBall>
          Approval Required
        </Typography>
        <Typography varent="h3">
          <BlueBall></BlueBall>
          Planned & Approved
        </Typography>
        <Typography varent="h3">
          <GreenBall></GreenBall>
          Achieved
        </Typography>
      </FlexData>
    </MainContainer>
  );
};

export default TrainingPlan;
