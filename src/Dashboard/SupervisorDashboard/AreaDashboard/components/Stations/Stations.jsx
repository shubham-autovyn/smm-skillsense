import { Backdrop, Box, CircularProgress, styled } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import ChartIcon from '../../../../../assets/icons/ChartIcon.svg';

import { variables } from '../../../../../styles/theme';
import {
  MaruSpanSkill,
  NonMaruSpanSkill,
} from '../../../SKillMatrix/skillMatrixTable/skillMatrixTable.style';

import FilterDialogBox from './FilterDialogBox/FilterDialogBox';

import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import SecondaryButton from '../../../../../utils/Buttons/SecondaryButton/SecondaryButton';
import TooltipComponent from '../../../../../components/ToolTip/ToolTip';
import getInitialName from '../../../../../utils/getInitailName';
import { stationDownloadExcelFile } from '../../../../../utils/stationDownload';
import useStation from '../../../hooks/station';
import {
  CustomTooltipStyle,
  DownloadTableButton,
  FooterSecondaryText,
  FooterText,
  Header,
  InputBox,
  LabourCard,
  LabourNameText,
  LabourText,
  LevelFour,
  LevelThree,
  NameCard,
  Para,
  SearchBox,
  StationsText,
  StyledDataGrid,
  TraineeCard,
  TraineeNameCard,
  WorkBox,
} from './Stations.styles';
import DialogBoxOperators from './dailogBoxOperators';

const Stations = (basicDateData) => {
  const { dataStation, fetchStation, loading } = useStation();
  const [open, setOpen] = useState(false);
  const [stationData, setStationData] = useState([]);
  const [boxData, setBoxData] = useState(null);
  const [anchorElLevel3, setAnchorElLevel3] = useState(null);
  const [anchorElLevel4, setAnchorElLevel4] = useState(null);
  const [supervisorId, setSupervisorId] = useState(
    localStorage.getItem('supervisorId') || ''
  );
  const [offsetTittle, setOffsetTittle] = useState(null);
  const [absenteeismData, setAbsenteeismData] = useState([]);
  const [filterStationData, setFilterStationData] = useState([]);
  const [fetchStationsData, setFetchStationsData] = useState([]);
  const [tooltipOperatorDataL3, setTooltipOperatorDataL3] = useState([]);
  const [tooltipOperatorDataL4, setTooltipOperatorDataL4] = useState([]);
  const [randomId, setRandomId] = useState(null);
  const [disable, setDisable] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleTooltipOpenLevel3 = (event, station, value) => {
    setTooltipOperatorDataL3(value.images);
    setOffsetTittle(station);
    setAnchorElLevel3(anchorElLevel3 ? null : event.currentTarget);
    setAnchorElLevel4(null);
    setRandomId(value.randomId);
    setDisable(true);
  };

  const handleTooltipOpenLevel4 = (event, station, value) => {
    setTooltipOperatorDataL4(value.images);
    setOffsetTittle(station);
    setAnchorElLevel4(anchorElLevel4 ? null : event.currentTarget);
    setAnchorElLevel3(null);
    setRandomId(value.randomId);
    setDisable(true);
  };

  const handleTooltipCloseLevel3 = () => {
    setAnchorElLevel3(null);
    setTooltipOperatorDataL3(null);
    setOffsetTittle(null);
    setRandomId(null);
    setDisable(false);
  };
  const handleTooltipCloseLevel4 = () => {
    setAnchorElLevel4(null);
    setTooltipOperatorDataL4(null);
    setOffsetTittle(null);
    setRandomId(null);
    setDisable(false);
  };

  const CustomTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      fontSize: '10px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '5px',
      backgroundColor: 'white',
    },
    [`& .${tooltipClasses.arrow}`]: {
      color: 'white',
    },
    [`& .${tooltipClasses.arrow}::before`]: {
      border: '1px solid #ccc',
      backgroundColor: '#ccc',
    },
  }));
  const SurplusCustomTooltip = styled(({ className, ...props }) => (
    <Tooltip
      {...props}
      arrow
      placement="right"
      classes={{ popper: className }}
    />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      fontSize: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      padding: '5px',
      backgroundColor: 'white',
      maxHeight: '250px', // Set a fixed height
      overflowY: 'auto',
    },
    [`& .${tooltipClasses.arrow}`]: {
      color: '#ccc', // Ensure arrow matches the tooltip
    },
    [`& .${tooltipClasses.arrow}::before`]: {
      content: '""',
      display: 'block',
      border: '1px solid #ccc',
      backgroundColor: 'white', // Match tooltip background
    },
  }));

  const transformStationData = (stations) =>
    stations?.map((val, index) => ({
      id: index + 1,
      station: {
        name: `${val?.stationName}, ${val?.stationDescription}`,
        maruAAr: val?.maru_a_ar,
      },
      deployedOperator: val?.deployed_operator || [],
      level3Operators: {
        images: val?.level3Operators || [],
        randomId: crypto.randomUUID(),
      },
      level4Operators: {
        images: val?.level4Operators || [],
        randomId: crypto.randomUUID(),
      },
      lastMonth: 'Line',
    })) || [];

  const handleStationFilter = (value) => {
    if (!value) {
      setStationData(transformStationData(filterStationData));
      return;
    }
    const searchValue = value.toLowerCase();
    const filteredStations = transformStationData(filterStationData).filter(
      (val) => val?.station?.name.toLowerCase().includes(searchValue)
    );
    setStationData(filteredStations);
  };

  const handleOperatorFilter = (value) => {
    if (!value) {
      setStationData(transformStationData(filterStationData));
      return;
    }
    const searchValue = value.toLowerCase();
    const filteredOperators = transformStationData(filterStationData).filter(
      (val) =>
        val.deployedOperator.some(
          (item) =>
            item?.staffName?.toLowerCase().includes(searchValue) ||
            item?.staffId?.toLowerCase().includes(searchValue)
        )
    );
    setStationData(filteredOperators);
  };

  const fetchStationApi = useCallback(async () => {
    try {
      const basicDate = moment(basicDateData.basicData, 'DD MMM YYYY').format(
        'DD-MM-YYYY' || ''
      );

      const params = `supervisorId=${supervisorId}&startDate=${basicDate}`;
      const stationTableData = await fetchStation(params);

      const stationsData = stationTableData?.response || {};
      const stationList = stationsData.stations || [];

      setFetchStationsData(stationTableData?.response);

      setBoxData({
        workStations: stationsData.workStations || 0,
        relieverCover: stationsData.relieverCover || 0,
        absenteeismCover: stationsData.absenteeismCover || 0,
        totalStations: stationsData.totalStations || 0,
        surplusStations: stationsData.surplusCount || 0,
        totalAvailable: stationsData.totalAvailable || 0,
      });

      const filteredStations = stationList.filter(
        (item) =>
          item.stationName !== 'Reliever' && item.stationName !== 'Absenteeism'
      );

      setFilterStationData(filteredStations);

      setAbsenteeismData(
        stationList.filter(
          (item) =>
            item.stationName === 'Reliever' ||
            item.stationName === 'Absenteeism'
        )
      );

      setStationData(transformStationData(filteredStations));
    } catch (error) {
      console.error('Error fetching station data:', error);
      setStationData([]);
    }
  }, [supervisorId, fetchStation, basicDateData.basicData]);

  useEffect(() => {
    fetchStationApi();
  }, [basicDateData.basicData]);

  const columns = [
    {
      field: 'station',
      headerName: 'Stations',
      minWidth: 300,
      flex: 1,
      resizable: false,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '4px',
            gap: '5px',
          }}
        >
          {params?.value?.maruAAr ? (
            <MaruSpanSkill>{params?.value?.maruAAr}</MaruSpanSkill>
          ) : (
            <NonMaruSpanSkill />
          )}

          <StationsText>{params?.value?.name}</StationsText>
        </div>
      ),
    },
    {
      field: 'deployedOperator',
      headerName: 'Deployed Operator',
      minWidth: 230,
      flex: 1,
      resizable: false,
      sortable: true,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => {
        const operators = params.value.filter(
          (item) => item.isTrainee === false
        );
        const operatorsFalse = params.value.filter(
          (item) => item.isTrainee === true
        );
        const operator = operators.length > 0 ? operators[0] : null;
        const operatorFalse =
          operatorsFalse.length > 0 ? operatorsFalse[0] : null;

        return (
          <>
            <LabourCard>
              <div style={{ position: 'relative', height: '40px' }}>
                {operator?.staffProfile ? (
                  <img
                    src={operator.staffProfile}
                    alt={operator.name}
                    style={{
                      width: '46px',
                      height: '40px',
                      borderRadius: '100%',
                      position: 'relative',
                    }}
                  />
                ) : (
                  <NameCard>
                    {getInitialName(operator?.staffName || 'N/A')}
                  </NameCard>
                )}
              </div>
              <div style={{ height: '100%', marginTop: '4px' }}>
                <CustomTooltip
                  title={
                    <span style={{ color: '#343536' }}>
                      {operator?.staffName || ''}
                    </span>
                  }
                  arrow
                >
                  <LabourNameText>
                    {operator?.staffName || 'Unknown'}
                  </LabourNameText>
                </CustomTooltip>
                <LabourText>
                  {`${operator?.staffId} | ${operator?.category} | ${operator?.level}` ||
                    'N/A'}
                </LabourText>
              </div>
            </LabourCard>
            {operatorFalse && (
              <TraineeCard>
                <div
                  style={{
                    position: 'relative',
                    height: '40px',
                  }}
                >
                  {operatorFalse?.staffProfile ? (
                    <img
                      src={operatorFalse.staffProfile}
                      alt={operatorFalse.name}
                      style={{
                        width: '46px',
                        height: '40px',
                        borderRadius: '100%',
                        position: 'relative',
                      }}
                    />
                  ) : (
                    <TraineeNameCard>
                      {getInitialName(operatorFalse?.staffName || 'N/A')}
                    </TraineeNameCard>
                  )}
                </div>
                <div
                  style={{
                    height: '13px',
                    width: '13px',
                    borderRadius: '100%',
                    backgroundColor: 'black',
                    color: '#fff',
                    position: 'absolute',
                    marginLeft: '176px',
                    marginTop: '-4px',
                    fontSize: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    lineHeight: '1',
                  }}
                >
                  T
                </div>
                <div style={{ height: '100%', marginTop: '4px' }}>
                  <CustomTooltip
                    title={
                      <span style={{ color: '#343536' }}>
                        {operatorFalse?.staffName || ''}
                      </span>
                    }
                    arrow
                  >
                    <LabourNameText>
                      {operatorFalse?.staffName || 'Unknown'}
                    </LabourNameText>
                  </CustomTooltip>
                  <LabourText>
                    {`${operatorFalse?.staffId} | ${operatorFalse?.category} | ${operatorFalse?.level}` ||
                      'N/A'}
                  </LabourText>
                </div>
              </TraineeCard>
            )}
          </>
        );
      },
    },
    {
      field: 'level3Operators',
      headerName: 'Level 3 Operators',
      minWidth: 250,
      flex: 1,
      resizable: false,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => {
        const images = params.value?.images?.map((res) => res?.staffName) || [];

        const visibleImages = images.slice(0, 4);
        const remainingCount = images.length - 4;
        const openLevel3 = Boolean(anchorElLevel3);

        return (
          <LevelThree>
            <ul>
              {params.value?.images?.slice(0, 4)?.map((image, index) => (
                <li key={index}>
                  <CustomTooltip
                    title={
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          gap: '5px',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <div>
                          {image?.staffProfile ? (
                            <img
                              src={image.staffProfile}
                              alt="operator"
                              style={{
                                cursor: 'pointer',
                              }}
                            />
                          ) : (
                            <NameCard>
                              {getInitialName(image?.staffName)}
                            </NameCard>
                          )}
                        </div>
                        <div>
                          <span
                            style={{
                              color: '#343536',
                            }}
                          >
                            {image?.staffName}
                          </span>
                          <br />
                          <span
                            style={{
                              color: '#9d9d9d',
                            }}
                          >
                            {image?.staffId} | {image?.category}
                          </span>
                        </div>
                      </div>
                    }
                    arrow
                  >
                    {image?.staffProfile ? (
                      <img
                        src={image.staffProfile}
                        alt="operator"
                        style={{
                          cursor: 'pointer',
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          cursor: 'pointer',
                        }}
                      >
                        <NameCard>{getInitialName(image?.staffName)}</NameCard>
                      </div>
                    )}
                  </CustomTooltip>
                </li>
              ))}

              {remainingCount > 0 && (
                <li
                  onClick={(event) =>
                    handleTooltipOpenLevel3(
                      event,
                      params?.row?.station,
                      params?.value
                    )
                  }
                  style={{
                    marginLeft: '10px',
                    cursor: 'pointer',
                  }}
                >
                  <span
                    style={{
                      color: variables.primaryColor,
                    }}
                  >
                    +{remainingCount} more
                  </span>
                </li>
              )}
            </ul>

            <TooltipComponent
              anchorEl={anchorElLevel3}
              title={
                <DialogBoxOperators
                  offsetTittle={offsetTittle}
                  operatorData={tooltipOperatorDataL3}
                  onClose={handleTooltipCloseLevel3}
                />
              }
              open={randomId === params?.value?.randomId}
              position="right"
              width="285px"
            />
          </LevelThree>
        );
      },
    },
    {
      field: 'level4Operators',
      headerName: 'Level 4 Operators',
      minWidth: 250,
      flex: 1,
      resizable: false,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => {
        const images = params.value?.images?.map((res) => res?.staffName) || [];
        const remainingCount = images.length - 4;
        return (
          <LevelFour>
            <ul>
              {params.value?.images?.slice(0, 4)?.map((image, index) => (
                <li key={index}>
                  <CustomTooltip
                    title={
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          gap: '5px',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <div>
                          {image?.staffProfile ? (
                            <img
                              src={image.staffProfile}
                              alt="operator"
                              style={{
                                cursor: 'pointer',
                              }}
                            />
                          ) : (
                            <NameCard>
                              {getInitialName(image?.staffName)}
                            </NameCard>
                          )}
                        </div>
                        <div>
                          <span
                            style={{
                              color: '#343536',
                            }}
                          >
                            {image?.staffName}
                          </span>
                          <br />
                          <span
                            style={{
                              color: '#9d9d9d',
                            }}
                          >
                            {image?.staffId} | {image?.category}
                          </span>
                        </div>
                      </div>
                    }
                    arrow
                  >
                    {image?.staffProfile ? (
                      <img
                        src={image.staffProfile}
                        alt="operator"
                        style={{
                          cursor: 'pointer',
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          cursor: 'pointer',
                        }}
                      >
                        <NameCard>{getInitialName(image?.staffName)}</NameCard>
                      </div>
                    )}
                  </CustomTooltip>
                </li>
              ))}
              {remainingCount > 0 && (
                <li
                  onClick={(event) =>
                    handleTooltipOpenLevel4(
                      event,
                      params?.row?.station,
                      params?.value
                    )
                  }
                  style={{
                    marginLeft: '10px',
                    cursor: 'pointer',
                  }}
                >
                  <span
                    style={{
                      color: variables.primaryColor,
                    }}
                  >
                    +{remainingCount} more
                  </span>
                </li>
              )}
            </ul>

            <TooltipComponent
              anchorEl={anchorElLevel4}
              title={
                <DialogBoxOperators
                  offsetTittle={offsetTittle}
                  operatorData={tooltipOperatorDataL4}
                  onClose={handleTooltipCloseLevel4}
                />
              }
              open={randomId === params?.value?.randomId}
              position="left"
              width="285px"
            />
          </LevelFour>
        );
      },
    },
  ];

  const handleDownload = () => {
    const headerMapping = {
      stationName: 'Station Name',
      stationDescription: 'Station description',
      maruAAR: 'Maru A/AR',
      deployedOperator: 'Deployed operator',
      level3: 'Level 3 operator',
      level4: 'Level 4 operator',
    };
    const excelData = fetchStationsData.stations;
    const formattedExcelData = excelData.map((item) => {
      const firstNonTrainee = item.deployed_operator.find(
        (op) => !op.isTrainee
      );
      const firstTrainee = item.deployed_operator.find((op) => op.isTrainee);
      return {
        stationName: item?.stationName,
        stationDescription: item?.stationDescription,
        maruAAR: item?.maru_a_ar,
        deployedOperator: [
          firstNonTrainee
            ? `${firstNonTrainee?.staffId || ''} | ${
                firstNonTrainee?.staffName || ''
              } | ${firstNonTrainee?.level || ''}`
            : '',
          firstTrainee
            ? `${firstTrainee?.staffId} | ${firstTrainee?.staffName} | ${firstTrainee?.level}`
            : '',
        ].filter(Boolean),
        level3:
          item?.level3Operators?.map(
            (operator) =>
              `${operator?.staffId || ''} | ${operator?.staffName || ''} | ${
                operator?.level || ''
              }`
          ) || '',
        level4:
          item?.level4Operators?.map(
            (operator) =>
              `${operator?.staffId || ''} | ${operator?.staffName || ''} | ${
                operator?.level || ''
              }`
          ) || '',
      };
    });
    stationDownloadExcelFile(
      // firstHeading,
      null,
      formattedExcelData,
      headerMapping,
      'Station.xlsx'
    );
  };

  return (
    <Box
      style={{
        pointerEvents: disable === true ? 'none ' : 'auto',
        opacity: disable ? 0.5 : 1,
        cursor: disable ? 'not-allowed ' : 'pointer',
      }}
    >
      <Box sx={{ display: 'flex', gap: '10px' }}>
        <WorkBox>
          <Header>Work Stations</Header>
          <Para>{boxData?.workStations || 0}</Para>
        </WorkBox>
        <WorkBox>
          <Header>Relievers</Header>
          <Para>{boxData?.relieverCover || 0}</Para>
        </WorkBox>
        <WorkBox>
          <Header>Absenteeism Cover</Header>
          <Para>{boxData?.absenteeismCover || 0}</Para>
        </WorkBox>

        <Box
          sx={{
            width: '0px',
            height: '68px',
            border: '1px solid #E6E9F0',
            margin: '0 20px 0 20px',
          }}
        ></Box>

        <WorkBox>
          <Header>Total Operators</Header>
          <Para>{boxData?.totalStations || 0}</Para>
        </WorkBox>
        <WorkBox style={{ cursor: 'pointer' }}>
          <SurplusCustomTooltip
            title={
              <>
                <h2 style={{ color: '#343536', padding: '4px' }}>
                  Surplus Operators
                </h2>
                {dataStation?.response?.surplus?.map((image, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '8px',
                      padding: '4px',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      {image?.staffProfile ? (
                        <img
                          src={image.staffProfile}
                          alt="operator"
                          style={{
                            cursor: 'pointer',
                          }}
                        />
                      ) : (
                        <NameCard>{getInitialName(image?.staffName)}</NameCard>
                      )}
                    </div>
                    <div>
                      <span
                        style={{
                          color: '#343536',
                        }}
                      >
                        {image?.staffName}
                      </span>
                      <br />
                      <span
                        style={{
                          color: '#9d9d9d',
                        }}
                      >
                        {image?.staffId} | {image?.category}
                      </span>
                    </div>
                  </div>
                ))}
              </>
            }
            arrow
          >
            <Header>Surplus Operators</Header>
            <Para>{boxData?.surplusStations || 0}</Para>
          </SurplusCustomTooltip>
        </WorkBox>
        <WorkBox>
          <Header>Total Available</Header>
          <Para>{boxData?.totalAvailable || 0}</Para>
        </WorkBox>
      </Box>
      <SearchBox>
        <Box>
          <InputBox
            placeholder="Filter Station"
            height="32px"
            style={{ marginRight: '10px' }}
            onChange={(e) => handleStationFilter(e?.target?.value)}
          ></InputBox>

          <InputBox
            placeholder="Filter Operator by Staff ID, Name"
            height="32px"
            width="300px"
            onChange={(e) => handleOperatorFilter(e?.target?.value)}
          ></InputBox>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <DownloadTableButton
            onClick={handleClickOpen}
            variant="outlined"
            sx={{ marginRight: '10px' }}
          >
            <img
              style={{
                height: '3.6rem',
                width: '3.6rem',
                cursor: 'pointer',
              }}
              src={ChartIcon}
              alt="chart icon"
            />
          </DownloadTableButton>
          <SecondaryButton onClick={handleDownload}>
            Download 4M-Man
          </SecondaryButton>
        </Box>
      </SearchBox>
      <Box>
        <StyledDataGrid
          columns={columns}
          rows={stationData}
          disableColumnMenu
          disableColumnSorting
          disableVirtualization
          hideFooter
        />
      </Box>
      <Box
        sx={{
          marginTop: '10px',
          padding: '8px',
          backgroundColor: '#DADCE0',
          borderRadius: '8px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <FooterText>Relievers & Absenteeism Cover</FooterText>
          <LevelThree>
            <ul>
              {absenteeismData &&
                absenteeismData?.map((item) => {
                  const operator = item.deployed_operator?.[0];
                  return (
                    <li key={item.stationName}>
                      <CustomTooltip
                        title={
                          <CustomTooltipStyle>
                            <div>
                              {operator?.staffProfile ? (
                                <img
                                  src={operator.staffProfile}
                                  alt="operator"
                                  style={{
                                    cursor: 'pointer',
                                  }}
                                />
                              ) : (
                                <NameCard>
                                  {getInitialName(operator?.staffName)}
                                </NameCard>
                              )}
                            </div>
                            <div>
                              <span
                                style={{
                                  color: '#343536',
                                }}
                              >
                                {operator?.staffName}
                              </span>
                              <br />
                              <span
                                style={{
                                  color: '#9d9d9d',
                                }}
                              >
                                {operator?.staffId}
                              </span>
                            </div>
                          </CustomTooltipStyle>
                        }
                        arrow
                      >
                        {operator?.staffProfile ? (
                          <img
                            src={operator.staffProfile}
                            alt="operator"
                            style={{
                              cursor: 'pointer',
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              cursor: 'pointer',
                            }}
                          >
                            <NameCard>
                              {getInitialName(operator?.staffName)}
                            </NameCard>
                          </div>
                        )}
                      </CustomTooltip>
                    </li>
                  );
                })}
            </ul>
          </LevelThree>
          <FooterSecondaryText>
            {absenteeismData?.length}/
            {(boxData?.relieverCover || 0) + (boxData?.absenteeismCover || 0)}
            operators planned
          </FooterSecondaryText>
        </Box>
      </Box>
      {open && (
        <FilterDialogBox
          open={open}
          onClose={handleClose}
          title="Station Wise L3 and L4 Operator Count"
        />
      )}
      <Backdrop
        sx={(theme) => ({
          color: '#fff',
          zIndex: theme.zIndex.drawer + 1,
        })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default Stations;
