import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Backdrop,
  Box,
  CircularProgress,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import * as shopReducer from '../../../redux/Reducers/SMMShopReducer';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import {
  default as DialogContentImage,
  default as DialogContentText,
} from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import SecondaryButton from '../../../utils/Buttons/SecondaryButton/SecondaryButton';
import ImageIcon from '../../../assets/svg/fi-rr-angle-small-down.svg';
import RefreshIcon from '../../../assets/svg/Frame 89.svg';
import IconGroup from '../../../assets/svg/frameGroup.svg';
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';
import { downloadExcelFile } from '../../../utils/downloadExcel';
import getInitialName from '../../../utils/getInitailName';
import useDeploymentDetails from '../hooks/fetchDeploymentDetails';
import useFetchNewJoinees from '../hooks/fetchNewJoinees';
import {
  AccordionMainBox,
  AdditionalOperatorsInfo,
  AdditionalOperatorsTotal,
  AdditionalOperatorsTotalSpan,
  AssignedP,
  AssignedSpan,
  AttendanceTitle,
  Btn1RefIcon,
  Btn2,
  Btn2P,
  ButtonAbsent,
  ButtonBoxAttendance,
  ButtonPersent,
  ButtonSectionAttendance,
  CardName,
  FirstHeading,
  FirstHeadingP,
  FirstHeadingSpan,
  LabourBox,
  LabourBoxMain,
  MainContainer,
  NavigateButtonBox,
  OperatorCard,
  OperatorId,
  OperatorName,
  OpsInfo,
  ProcessStation,
  RelieverOperatorCard,
  SecHeadGrpBtn,
  SecondHeading,
  SecondHeadingIng,
  SurplusInfo,
  SurplusP,
  SurplusSpan,
  TableBoxes,
  TableFirstBox,
  TableFirstCard,
  TableMain,
  TagTrainee,
  TooltipRelivingDate,
  TooltipRelivingTotalDates,
  WorkerCardData,
  WorkersCard,
} from './Deployment.style';

const Deployment = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = React.useState(false);
  const plant = useSelector(shopReducer.getPlant);
  const shop = useSelector(shopReducer.getShop);
  const [open, setOpen] = useState(false);
  const [newJoinees, setNewJoinees] = useState([]);
  const [filter, setFilter] = useState('all'); // Add a state for the filter

  const { dataDeploymentDetails, fetchDeploymentDetails, loading } =
    useDeploymentDetails();
  const { dataNewJoinees, fetchNewJoinees } = useFetchNewJoinees();
  const supervisorHierarchy = JSON.parse(localStorage.getItem('dataHierarchy'));

  const formatDate = (date) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };

  const currentDate = formatDate(new Date());
  const supervisorId = localStorage.getItem('supervisorId');
  let shiftTiming = '';

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

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };
  const getAbsentAndPresentCounts = (deploymentData) => {
    return deploymentData?.reduce(
      (counts, section) => {
        section?.cards?.forEach((card) => {
          if (card.absent) {
            counts.absent += 1;
          } else {
            counts.present += 1;
          }
        });
        return counts;
      },
      { absent: 0, present: 0 }
    );
  };

  useEffect(() => {
    getDeploymentDetails();
    getNewJoinees();
  }, []);

  useEffect(() => {
    if (dataNewJoinees?.message === 'Success') {
      setNewJoinees(dataNewJoinees?.response);
    }
  }, [dataNewJoinees]);

  // const getDeploymentDetails = async () => {
  //   await fetchDeploymentDetails(`supervisorId=${165719}`);
  // };

  const getDeploymentDetails = async () => {
    try {
      const response = await fetchDeploymentDetails(
        `supervisorId=${supervisorId}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  const getNewJoinees = async () => {
    try {
      const response = await fetchNewJoinees(`supervisorId=${supervisorId}`);
      return response;
    } catch (error) {
      console.error('Error fetching new joinees:', error);
      throw error;
    }
  };

  const data = dataDeploymentDetails?.response;
  const counts = getAbsentAndPresentCounts(data?.totalStation);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const filteredStations = data?.totalStation
    ?.map((section) => {
      const filteredCards =
        filter === 'all'
          ? section.cards
          : section.cards.filter((card) =>
              filter === 'present' ? !card.absent : card.absent
            );

      // Return only stations with matching cards
      return filteredCards.length > 0
        ? { ...section, cards: filteredCards }
        : null;
    })
    .filter(Boolean); // Remove null stations (stations with no matching cards)

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter); // Update the filter state
  };

  const handleRefrace = () => {
    getDeploymentDetails();
  };
  const handleDownload = () => {
    const headerMapping = {
      stationName: 'Station Name',
      stationDescription: 'Station description',
      maruAAR: 'Maru A/AR',
      operator: 'Operator details',
      trainee: 'Trainee detail',
    };
    const excelData = [...data.totalStation, ...data.absRelStations];

    const formattedExcelData = excelData.map((item) => {
      const nonTrainees = item?.cards?.filter((card) => !card.isTrainee);
      const trainees = item?.cards?.filter((card) => card.isTrainee);

      return {
        stationName: item.stationName,
        stationDescription: item.stationDescription,
        maruAAR: item.maruAAR,
        operator:
          nonTrainees?.length > 0
            ? `${nonTrainees[0].staffName || 'none'} | ${
                nonTrainees[0].staffId || 'none'
              } | ${nonTrainees[0].staffLevel || 'none'}`
            : 'none',
        trainee:
          trainees?.length > 0
            ? `${trainees[0].staffName || 'none'} | ${
                trainees[0].staffId || 'none'
              } | ${trainees[0].staffLevel || 'none'}`
            : 'none',
      };
    });

    const firstHeading = [
      `Total station: ${data?.totalStation?.length || ''}`,
      `Present: ${counts?.present}`,
      `Absent: ${counts?.absent}`,
    ];
    downloadExcelFile(
      firstHeading,
      formattedExcelData,
      headerMapping,
      'Deployment.xlsx'
    );
  };

  return (
    <>
      <MainContainer>
        <FirstHeading>
          <FirstHeadingP>
            Line-{supervisorHierarchy?.line} -{supervisorHierarchy?.shopName} -
            Shift-{supervisorHierarchy?.group}
            <FirstHeadingSpan>
              {currentDate}, {shiftTiming}
            </FirstHeadingSpan>
          </FirstHeadingP>

          {/* DialogBox */}
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            sx={{
              margin: 'auto',
              width: '330px',
            }}
          >
            <DialogTitle
              id="alert-dialog-title"
              sx={{ fontSize: '13px', fontWeight: '600' }}
            >
              {'Assign New Joinees to Stations'}
            </DialogTitle>
            <DialogContent>
              <DialogContentText
                id="alert-dialog-description"
                sx={{ fontWeight: '500', fontSize: '12px', lineHeight: '15px' }}
              >
                There are {(newJoinees?.length).toString().padStart(2, '0')} new
                joinees in your area. Assign them to stations to begin their on
                the job training for L0 to L3 level.
              </DialogContentText>
              <DialogContentImage id="alert-dialog-description">
                <img src={IconGroup} alt="IconGroup" />
              </DialogContentImage>
            </DialogContent>
            <hr />
            <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
              <div>
                <PrimaryButton
                  onClick={() =>
                    // navigate("/SMM/SetUpDeployment-PopUp", {
                    //   state: { shopId: shop.id, plantId: plant.id },
                    // })
                    navigate('/SMM/SetUpDeployment', {
                      state: { shopId: shop.id, plantId: plant.id },
                    })
                  }
                >
                  Start Assignment
                </PrimaryButton>
              </div>
            </DialogActions>
          </Dialog>

          <NavigateButtonBox>
            <Box>
              <SecondaryButton
                bgColor="none"
                padding="8px 20px"
                onClick={() =>
                  newJoinees?.length > 0
                    ? handleClickOpen()
                    : navigate('/SMM/SetUpDeployment', {
                        state: { shopId: shop.id, plantId: plant.id },
                      })
                }
              >
                Set up daily deployment
              </SecondaryButton>
            </Box>
            <Box>
              <PrimaryButton
                onClick={() =>
                  navigate('/SMM/EditDeployment', {
                    state: { shopId: shop.id, plantId: plant.id },
                  })
                }
              >
                Edit Today's Deployment
              </PrimaryButton>
            </Box>
          </NavigateButtonBox>
        </FirstHeading>

        <SecondHeading>
          {/* <div style={{ display: "flex", gap: "5px", fontSize: "12px" }}>
            <p>Total Stations:</p>
            <p>15</p>
            <p>Operators:</p>
          </div> */}
          <ButtonSectionAttendance>
            <AttendanceTitle>
              <p style={{ fontWeight: 'bold' }}>Total Stations:</p>
              <p style={{ fontWeight: 'bold' }}>
                {data?.totalStation?.length || ''}
              </p>
              {'|'}
              <p style={{ fontWeight: 'bold' }}>Operators:</p>
            </AttendanceTitle>
            <ButtonBoxAttendance>
              <ButtonPersent onClick={() => handleFilterChange('present')}>
                {counts?.present} Present
              </ButtonPersent>
              <ButtonAbsent onClick={() => handleFilterChange('absent')}>
                {counts?.absent} Absent
              </ButtonAbsent>
            </ButtonBoxAttendance>
          </ButtonSectionAttendance>

          <SecHeadGrpBtn>
            <Btn1RefIcon onClick={handleRefrace}>
              <SecondHeadingIng
                src={RefreshIcon}
                alt="icon"
                className="icon-img"
              />
            </Btn1RefIcon>
            <Btn2 onClick={handleDownload}>
              <Btn2P>Download</Btn2P>
              <img src={ImageIcon || 'icon.jpg'} alt="icon" />
            </Btn2>
          </SecHeadGrpBtn>
        </SecondHeading>

        <TableMain className="container">
          <TableBoxes>
            <Box className="box-wrapper-firstRow">
              <TableFirstBox className="table-first-box">
                {filteredStations?.map((section, sectionIndex) => (
                  <TableFirstCard key={sectionIndex}>
                    <WorkerCardData>
                      <WorkersCard
                        style={{
                          backgroundColor: section?.maruAAR
                            ? 'none'
                            : '#7a7c7e',
                        }}
                      >
                        {section?.maruAAR}
                      </WorkersCard>
                      <ProcessStation className="process-station">
                        {section?.stationName} | {section?.stationDescription}
                      </ProcessStation>
                    </WorkerCardData>

                    {section?.cards
                      ?.filter((card) => !card.isTrainee)
                      ?.map((card, cardIndex) => (
                        <Tooltip
                          title={
                            <Typography
                              variant="h6"
                              sx={{ fontWeight: 400, fontSize: '9px' }}
                            >
                              Reliving Date:{' '}
                              <TooltipRelivingDate>
                                01/04/2023
                              </TooltipRelivingDate>
                              <TooltipRelivingTotalDates>
                                12 Months, 18 Days
                              </TooltipRelivingTotalDates>
                            </Typography>
                          }
                          arrow
                          componentsProps={{
                            tooltip: {
                              sx: {
                                bgcolor: 'white',
                                color: 'black',
                                border: '1px solid #CFD2D9',
                                boxShadow: 1,
                                padding: '6px 5px',
                              },
                            },
                            arrow: {
                              sx: {
                                marginLeft: '-48px',
                                color: 'white',
                                fontSize: '12px',
                              },
                            },
                            popper: {
                              modifiers: [
                                {
                                  name: 'offset',
                                  options: {
                                    offset: [0, 2], // [horizontal offset, vertical offset]
                                  },
                                },
                              ],
                            },
                          }}
                        >
                          <OperatorCard
                            className="operator-card"
                            key={cardIndex}
                            sx={{
                              backgroundColor: card.absent
                                ? '#efd9cc'
                                : '#dff6dd',
                              border: card.absent
                                ? '1px solid #d83b01'
                                : '1px solid #30c030',
                            }}
                          >
                            <CardName style={{ background: '#58a55c' }}>
                              {getInitialName(card?.staffName)}
                            </CardName>

                            <Box className="operator-details">
                              <OperatorName className="operator-name">
                                {card?.staffName}
                              </OperatorName>
                              <OperatorId className="operator-id">
                                {card?.staffId} | {card?.staffLevel}
                              </OperatorId>
                            </Box>
                            {card?.isTrainee && (
                              <TagTrainee className="tag trainee">
                                Trainee
                              </TagTrainee>
                            )}
                          </OperatorCard>
                        </Tooltip>
                      ))}
                    {section?.cards
                      ?.filter((card) => card.isTrainee)
                      ?.map((card, cardIndex) => (
                        <Tooltip
                          title={
                            <Typography
                              variant="h6"
                              sx={{ fontWeight: 400, fontSize: '9px' }}
                            >
                              Reliving Date:{' '}
                              <TooltipRelivingDate>
                                01/04/2023
                              </TooltipRelivingDate>
                              <TooltipRelivingTotalDates>
                                12 Months, 18 Days
                              </TooltipRelivingTotalDates>
                            </Typography>
                          }
                          arrow
                          componentsProps={{
                            tooltip: {
                              sx: {
                                bgcolor: 'white',
                                color: 'black',
                                border: '1px solid #CFD2D9',
                                boxShadow: 1,
                                padding: '6px 5px',
                              },
                            },
                            arrow: {
                              sx: {
                                marginLeft: '-48px',
                                color: 'white',
                                fontSize: '12px',
                              },
                            },
                            popper: {
                              modifiers: [
                                {
                                  name: 'offset',
                                  options: {
                                    offset: [0, 2], // [horizontal offset, vertical offset]
                                  },
                                },
                              ],
                            },
                          }}
                        >
                          <OperatorCard
                            className="operator-card"
                            key={cardIndex}
                            sx={{
                              backgroundColor: card.absent
                                ? '#efd9cc'
                                : '#dff6dd',
                              border: card.absent
                                ? '1px solid #d83b01'
                                : '1px solid #30c030',
                            }}
                          >
                            <CardName style={{ background: '#58a55c' }}>
                              {getInitialName(card?.staffName)}
                            </CardName>

                            <Box className="operator-details">
                              <OperatorName className="operator-name">
                                {card?.staffName}
                              </OperatorName>
                              <OperatorId className="operator-id">
                                {card?.staffId} | {card?.staffLevel}
                              </OperatorId>
                            </Box>
                            {card?.isTrainee && (
                              <TagTrainee className="tag trainee">
                                Trainee
                              </TagTrainee>
                            )}
                          </OperatorCard>
                        </Tooltip>
                      ))}
                  </TableFirstCard>
                ))}
              </TableFirstBox>
              {/* <hr style={{ marginTop: "20px", width: "100%" }} /> */}
            </Box>
          </TableBoxes>
          <AccordionMainBox>
            <Accordion
              expanded={expanded}
              onChange={handleExpansion}
              sx={{
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
                  '&.Mui-expanded': {
                    minHeight: 'unset',
                  },
                }}
              >
                <Typography variant="h4">
                  Relievers & Absenteeism Cover{' '}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                style={{
                  backgroundColor: '#F4F5F8',
                  overflowY: 'auto',
                  maxHeight: '150px',
                  scrollbarWidth: 'thin',
                }}
              >
                <AssignedP>
                  Assigned:{' '}
                  <AssignedSpan>
                    {data?.absRelStations?.length || '0'}
                  </AssignedSpan>
                </AssignedP>
                <LabourBoxMain>
                  <div>
                    <LabourBox>
                      <OpsInfo className="operator-info">
                        {data?.absRelStations?.map((card, index) => (
                          <Tooltip
                            title={
                              <Typography
                                variant="h6"
                                sx={{ fontWeight: 400, fontSize: '9px' }}
                              >
                                Reliving Date:{' '}
                                <TooltipRelivingDate>
                                  01/04/2023
                                </TooltipRelivingDate>
                                <TooltipRelivingTotalDates>
                                  12 Months, 18 Days
                                </TooltipRelivingTotalDates>
                              </Typography>
                            }
                            arrow
                            componentsProps={{
                              tooltip: {
                                sx: {
                                  bgcolor: 'white',
                                  color: 'black',
                                  border: '1px solid #CFD2D9',
                                  boxShadow: 1,
                                  padding: '6px 5px',
                                },
                              },
                              arrow: {
                                sx: {
                                  marginLeft: '-48px',
                                  color: 'white',
                                  fontSize: '12px',
                                },
                              },
                              popper: {
                                modifiers: [
                                  {
                                    name: 'offset',
                                    options: {
                                      offset: [0, 2], // [horizontal offset, vertical offset]
                                    },
                                  },
                                ],
                              },
                            }}
                          >
                            <OperatorCard
                              className="operator-card"
                              key={index}
                              sx={{
                                backgroundColor: card.absent
                                  ? '#efd9cc'
                                  : '#dff6dd',
                                border: card.absent
                                  ? '1px solid #d83b01'
                                  : '1px solid #30c030',
                              }}
                            >
                              {/* <CardImg
                            src={card?.image}
                            alt="operator"
                            className="operator-image"
                          /> */}

                              {/* {card?.image ? (
                            <CardImg
                              src={card?.image}
                              alt="operator"
                              className="operator-image"
                            />
                          ) : (
                            <CardName>
                              {card?.staffName
                                .replace(
                                  /^(Mr\.?|Mrs\.?|Ms\.?|Dr\.?|Prof\.?)\s+/i,
                                  ""
                                )
                                .slice(0, 2)
                                .toUpperCase()}
                            </CardName>
                          )} */}
                              <CardName style={{ background: '#58a55c' }}>
                                {getInitialName(card?.cards[0].staffName)}
                              </CardName>

                              <Box className="operator-details">
                                <OperatorName className="operator-name">
                                  {card?.cards[0].staffName}
                                </OperatorName>
                                <OperatorId className="operator-id">
                                  {card?.cards[0].staffId} |{' '}
                                  {card?.cards[0].staffLevel}
                                </OperatorId>
                              </Box>
                              {card?.cards[0].isTrainee && (
                                <TagTrainee className="tag trainee">
                                  Trainee
                                </TagTrainee>
                              )}
                            </OperatorCard>
                          </Tooltip>
                        ))}
                      </OpsInfo>
                    </LabourBox>
                  </div>
                  <div>
                    <SurplusP className="surplus">
                      Surplus:{' '}
                      <SurplusSpan>
                        {data?.surplusOperators?.length || '0'}
                      </SurplusSpan>
                    </SurplusP>
                    <LabourBox>
                      <SurplusInfo className="surplus-info">
                        {data?.surplusOperators?.map((card, index) => (
                          <Tooltip
                            title={
                              <Typography
                                variant="h6"
                                sx={{ fontWeight: 400, fontSize: '9px' }}
                              >
                                Reliving Date:{' '}
                                <TooltipRelivingDate>
                                  01/04/2023
                                </TooltipRelivingDate>
                                <TooltipRelivingTotalDates>
                                  12 Months, 18 Days
                                </TooltipRelivingTotalDates>
                              </Typography>
                            }
                            arrow
                            componentsProps={{
                              tooltip: {
                                sx: {
                                  bgcolor: 'white',
                                  color: 'black',
                                  border: '1px solid #CFD2D9',
                                  boxShadow: 1,
                                  padding: '6px 5px',
                                },
                              },
                              arrow: {
                                sx: {
                                  marginLeft: '-48px',
                                  color: 'white',
                                  fontSize: '12px',
                                },
                              },
                              popper: {
                                modifiers: [
                                  {
                                    name: 'offset',
                                    options: {
                                      offset: [0, 2], // [horizontal offset, vertical offset]
                                    },
                                  },
                                ],
                              },
                            }}
                          >
                            <RelieverOperatorCard
                              className="operator-card"
                              key={index}
                              sx={{
                                backgroundColor: card?.absent
                                  ? '#efd9cc'
                                  : '#dff6dd',
                                border: card?.absent
                                  ? '1px solid #d83b01'
                                  : '1px solid #30c030',
                              }}
                            >
                              <CardName style={{ background: '#58a55c' }}>
                                {getInitialName(card.staffName)}
                              </CardName>

                              <Box className="operator-details">
                                <OperatorName className="operator-name">
                                  {card.staffName}
                                </OperatorName>
                                <OperatorId className="operator-id">
                                  {card.staffId} | {card.staffLevel}
                                </OperatorId>
                              </Box>
                              {card.isTrainee && (
                                <TagTrainee className="tag trainee">
                                  Trainee
                                </TagTrainee>
                              )}
                            </RelieverOperatorCard>
                          </Tooltip>
                        ))}
                      </SurplusInfo>
                    </LabourBox>
                  </div>
                </LabourBoxMain>
              </AccordionDetails>
            </Accordion>
            <Accordion
              style={{
                backgroundColor: '#CFD2D9',
                minHeight: '40px',
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                style={{
                  backgroundColor: '#CFD2D9',
                  minHeight: '50px',
                  '&.Mui-expanded': {
                    minHeight: 'unset',
                  },
                }}
              >
                <Typography variant="h4">Additional Operators </Typography>
              </AccordionSummary>
              <AccordionDetails
                style={{
                  backgroundColor: '#F4F5F8',
                  overflowY: 'auto',
                  maxHeight: '40vh',
                  scrollbarWidth: 'thin',
                }}
              >
                <AdditionalOperatorsTotal className="surplus">
                  Total:{' '}
                  <AdditionalOperatorsTotalSpan>
                    {data?.additionalOperators?.length || '0'}
                  </AdditionalOperatorsTotalSpan>
                </AdditionalOperatorsTotal>
                <AdditionalOperatorsInfo className="operator-info">
                  {data?.additionalOperators?.map((card, index) => (
                    <Tooltip
                      title={
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 400, fontSize: '9px' }}
                        >
                          Reliving Date:{' '}
                          <TooltipRelivingDate>01/04/2023</TooltipRelivingDate>
                          <TooltipRelivingTotalDates>
                            12 Months, 18 Days
                          </TooltipRelivingTotalDates>
                        </Typography>
                      }
                      arrow
                      componentsProps={{
                        tooltip: {
                          sx: {
                            bgcolor: 'white',
                            color: 'black',
                            border: '1px solid #CFD2D9',
                            boxShadow: 1,
                            padding: '6px 5px',
                          },
                        },
                        arrow: {
                          sx: {
                            marginLeft: '-48px',
                            color: 'white',
                            fontSize: '12px',
                          },
                        },
                        popper: {
                          modifiers: [
                            {
                              name: 'offset',
                              options: {
                                offset: [0, 2], // [horizontal offset, vertical offset]
                              },
                            },
                          ],
                        },
                      }}
                    >
                      <OperatorCard
                        className="additional-operator-card"
                        key={index}
                        sx={{
                          backgroundColor: card.absent ? '#efd9cc' : '#dff6dd',
                          border: card.absent
                            ? '1px solid #d83b01'
                            : '1px solid #30c030',
                        }}
                      >
                        <CardName style={{ background: '#58a55c' }}>
                          {card?.staffName
                            .replace(
                              /^(Mr\.?|Mrs\.?|Ms\.?|Dr\.?|Prof\.?)\s+/i,
                              ''
                            )
                            .slice(0, 2)
                            .toUpperCase()}
                        </CardName>

                        <Box className="operator-details">
                          <OperatorName className="operator-name">
                            {card?.staffName}
                          </OperatorName>
                          <OperatorId className="operator-id">
                            {card?.staffId} | {card?.staffLevel}
                          </OperatorId>
                        </Box>
                        {card?.isTrainee && (
                          <TagTrainee className="tag trainee">
                            Trainee
                          </TagTrainee>
                        )}
                      </OperatorCard>
                    </Tooltip>
                  ))}
                </AdditionalOperatorsInfo>
              </AccordionDetails>
            </Accordion>
          </AccordionMainBox>
        </TableMain>
      </MainContainer>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default Deployment;
