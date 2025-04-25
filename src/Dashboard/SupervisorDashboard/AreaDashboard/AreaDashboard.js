import SearchIcon from '@mui/icons-material/Search';
import {
  Backdrop,
  Box,
  CircularProgress,
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { MarutiBlue500 } from '../../../utils/colors';
import CustomSwitch from '../../../components/Switch/CustomSwitch';
import CustomToggleButton from '../../../utils/Toggle/CustomToggleButton/CustomToggleButton';
import Lines from '../../../assets/icons/Lines.svg';
import User from '../../../assets/icons/User.svg';
import ProfileCard from '../../../components/Card/ProfileCard';
import SingleSelect from '../../../components/Select/SingleSelect';
import { SMMTheme } from '../../../Theme/theme';
import convertDate from '../../../utils/convertDate';
import useBasicRequirementSecond from '../../Dpm/hooks/basicRequirementSecond';
import useFetchAreaOperators from '../hooks/fetchAreaOperator';
import useFetchSupervisorHierarchy from '../hooks/fetchSupervisorHierarchy';
import OperatorFill from './components/OperatorFill/OperatorFill';
import Stations from './components/Stations/Stations';
import OperatorLineIcon from './LineIcon';
import OperatorUserIcon from './UserIcon';

const LineIcon = () => (
  <img
    style={{ height: '1.7rem', width: '1.7rem', marginRight: '1rem' }}
    src={Lines}
    alt="User icon"
  />
);
const UserIcon = () => (
  <img
    style={{ height: '1.7rem', width: '1.7rem', marginRight: '1rem' }}
    src={User}
    alt="User icon"
  />
);

const AreaDashboard = (props) => {
  const [activeView, setActiveView] = useState('Operators');
  const [showFirstDiv, setShowFirstDiv] = useState(true);
  const [activeOperator, setActiveOperator] = useState(0);
  const [inActiveOperator, setInActiveOperator] = useState(0);
  const [operators, setOperators] = useState([]);
  const [isCustomSwitchChecked, setIsCustomSwitchChecked] = useState(false);
  const [searchValue, setSearchValue] = useState();
  const [operatorFillData, setOperatorFillData] = useState();
  const [selectedDate, setSelectedDate] = useState(null);
  const [supervisorId, setSupervisorId] = useState('');

  const {
    dataAreaOperators: dataAllOperators,
    fetchAreaOperators: fetchAllOperators,
    loading,
  } = useFetchAreaOperators();
  const {
    dataHierarchy,
    fetchHierarchy,
    loading: hierarchyLoading,
  } = useFetchSupervisorHierarchy();

  const {
    dataGraph: basicDateData,
    fetchBasicRequirementData: fetchDateDataBasic,
    loading: basicLoading,
  } = useBasicRequirementSecond();

  useEffect(() => {
    setSupervisorId(localStorage.getItem('supervisorId'));
    if (supervisorId) {
      getHierarchy();
    }
  }, [supervisorId]);

  const toggleDiv = (item) => {
    setOperatorFillData(item);
    setShowFirstDiv(!showFirstDiv);
  };
  const handleActiveView = (val) => {
    if (val !== null) {
      setActiveView(val);
    }
  };

  const handleSearch = (value) => {
    setSearchValue(value);
    const filteredData = dataAllOperators?.response[0]?.operators?.filter(
      (val) =>
        val?.staffId?.includes(value) ||
        val?.name?.toLowerCase()?.includes(value?.toLowerCase())
    );
    setOperators(filteredData);
  };

  const handleCustomSwitch = () => {
    setIsCustomSwitchChecked(!isCustomSwitchChecked);
  };

  const fetchBasicRequirementData = async () => {
    try {
      const shopId = JSON.parse(localStorage.getItem('dataHierarchy'))?.shopId;
      await fetchDateDataBasic(`shop_id=${shopId}`);
    } catch (err) {
      console.error('Error fetching basic requirements:', err);
    }
  };

  useEffect(() => {}, []);

  useEffect(() => {
    if (basicDateData?.length) {
      setSelectedDate(convertDate(basicDateData[0].effectiveDate));
    }
  }, [basicDateData]);

  const handleSelectChange = (event) => {
    const value = event?.target?.value;
    if (value !== undefined) {
      setSelectedDate(value);
    } else {
      console.error('No value found in the event object');
    }
  };
  const fetchOperator = useCallback(() => {
    if (!supervisorId) return;
    const type = isCustomSwitchChecked ? 'inactive' : 'active';
    const params = `supervisorId=${supervisorId}&type=${type}`;
    fetchAllOperators(params);
  }, [isCustomSwitchChecked, supervisorId]);

  useEffect(() => {
    fetchOperator();
  }, [fetchOperator, selectedDate]);

  const getHierarchy = async () => {
    const params = `supervisorId=${supervisorId}`;

    const responseData = await fetchHierarchy(params);

    if (responseData?.data?.responseCode === 200) {
      window.localStorage.setItem(
        'dataHierarchy',
        JSON.stringify(responseData?.data?.response || {})
      );
      fetchBasicRequirementData();
    }
  };

  useEffect(() => {
    if (dataAllOperators?.responseCode === 200) {
      setOperators(dataAllOperators?.response[0]?.operators);
    }
    setActiveOperator(
      dataAllOperators?.response ? dataAllOperators?.response[0]?.active : 0
    );
    setInActiveOperator(
      dataAllOperators?.response ? dataAllOperators?.response[0]?.inactive : 0
    );
    return setShowFirstDiv(true);
  }, [dataAllOperators, isCustomSwitchChecked]);

  return (
    <ThemeProvider theme={SMMTheme}>
      <Fragment>
        <Paper sx={{ my: 1, p: 1.6 }}>
          <Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '1.6rem',
              }}
            >
              <Box>
                <Box sx={{ display: 'flex' }}>
                  <Typography variant="body1" sx={{ padding: '1rem' }}>
                    View:
                  </Typography>
                  <CustomToggleButton
                    selected={activeView}
                    labelsWithIcon={true}
                    labels={[
                      {
                        icon:
                          activeView === 'Operators' ? (
                            <OperatorUserIcon fill="White" />
                          ) : (
                            <OperatorUserIcon fill="black" />
                          ),
                        label: 'Operators',
                      },
                      {
                        icon:
                          activeView === 'Stations' ? (
                            <OperatorLineIcon fill="white" />
                          ) : (
                            <OperatorLineIcon fill="black" />
                          ),
                        label: 'Stations',
                      },
                    ]}
                    onChange={handleActiveView}
                  >
                    <UserIcon />
                  </CustomToggleButton>
                </Box>
              </Box>
              {activeView === 'Operators' ? (
                <Box sx={{ display: 'flex' }}>
                  <CustomSwitch
                    checked={isCustomSwitchChecked}
                    handleChange={() => handleCustomSwitch()}
                    leftLabel={`Active (${activeOperator})`}
                    rightLabel={`Inactive (${inActiveOperator})`}
                  />
                  <Box sx={{ pl: '1.6rem', minWidth: '208px' }}>
                    <TextField
                      placeholder="Search by Name, Staff ID"
                      value={searchValue}
                      onChange={(e) => handleSearch(e?.target?.value)}
                      size="small"
                      variant="outlined"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <SearchIcon
                              sx={{
                                fontSize: 25,
                                color: MarutiBlue500,
                              }}
                            />
                          </InputAdornment>
                        ),
                      }}
                      fullWidth
                    />
                  </Box>
                </Box>
              ) : (
                <Box sx={{ maxWidth: '300px' }}>
                  <SingleSelect
                    label="Basic Requirement"
                    value={selectedDate}
                    onChange={handleSelectChange}
                  >
                    {basicDateData?.map((dateItem, index) => {
                      const currentEffectiveDate = convertDate(
                        dateItem.effectiveDate
                      );
                      const previousEffectiveDate =
                        index > 0
                          ? (() => {
                              const dateStr =
                                basicDateData[index - 1].effectiveDate;
                              const [day, month, year] = dateStr.split('-');
                              const formattedDate = new Date(
                                year,
                                month - 1,
                                day
                              );

                              if (!isNaN(formattedDate.getTime())) {
                                // Subtract 1 day (86400000 milliseconds)
                                const previousDate = new Date(
                                  formattedDate.getTime() - 86400000
                                );
                                const formattedPreviousDateStr = `${previousDate
                                  .getDate()
                                  .toString()
                                  .padStart(2, '0')}-${(
                                  previousDate.getMonth() + 1
                                )
                                  .toString()
                                  .padStart(
                                    2,
                                    '0'
                                  )}-${previousDate.getFullYear()}`;

                                return convertDate(formattedPreviousDateStr);
                              }
                              return null;
                            })()
                          : null;

                      return (
                        <MenuItem key={index} value={currentEffectiveDate}>
                          {previousEffectiveDate
                            ? `${currentEffectiveDate} - ${previousEffectiveDate}`
                            : `${currentEffectiveDate} - Present`}
                        </MenuItem>
                      );
                    })}
                  </SingleSelect>
                </Box>
              )}
            </Box>
          </Box>
          {activeView === 'Operators' ? (
            showFirstDiv ? (
              <Grid
                container
                spacing={2}
                sx={{ padding: '2px' }}
                justifyContent="center"
              >
                {operators?.length && !loading ? (
                  operators?.map((item, index) => (
                    <Grid item key={index}>
                      <Box onClick={() => toggleDiv(item)}>
                        <ProfileCard data={item} />
                      </Box>
                    </Grid>
                  ))
                ) : (
                  <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ minHeight: '10vh', fontSize: '15px' }}
                  >
                    <Box>No Rows</Box>
                  </Grid>
                )}
              </Grid>
            ) : (
              <OperatorFill
                operatorData={operatorFillData}
                users={operators}
                toggleDiv={toggleDiv}
              />
            )
          ) : (
            <Stations basicData={selectedDate} />
          )}

          <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={loading || basicLoading || hierarchyLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Paper>
      </Fragment>
    </ThemeProvider>
  );
};

export default AreaDashboard;
