import SearchIcon from '@mui/icons-material/Search';
import {
  Backdrop,
  CircularProgress,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';

import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Select from '../../../../../utils/Select/Select';

import sorting from '../../../../../assets/icons/SortIcon.svg';

import { Button, Menu } from '@mui/material';
import { MarutiBlue500 } from '../../../../../utils/colors';
import filterImg from '../../../../../assets/svg/Frame 90.svg';
import { DataGridTable } from '../../../../../components/Data-table/dataTable.styles';
import CustomDatePicker from '../../../../../components/DatePicker/DatePicker';
import TreeFilter from '../../../../../components/TreeFilter/treeFilter';
import * as shopReducer from '../../../../../redux/Reducers/SMMShopReducer';
import getInitialName from '../../../../../utils/getInitailName';
import useFetchSurplusOperator from '../../../hooks/fetchSurplusOperator';
import useManpowerSurplusGraph from '../../../hooks/surplusGraph';
import VEHGraphManpower from './stackchart/stackchart';
import StackChartCard from './stackchart/stackchartcard';
import {} from './surplus.css';
import {
  ChartBox,
  DateContainer,
  MonthBtn,
  ResetBtn,
  SurplusBoxMain,
  SurplusBoxTop,
  TopLeftBox,
  TopRightBox,
  TypographyText,
} from './surplus.style';

const monthData = ['1M', '3M', '6M', '1Y'];
const weeklyData = ['daily', 'weekly', 'monthly'];
const Dates = ['All', 'Only Surplus', 'Only Gap'];
const SurplusManpower = () => {
  const [searchValue, setSearchValue] = useState('');
  const [minDate, setMinDate] = useState(null);
  const [maxDate, setMaxDate] = useState(null);
  const [minToDate, setMinToDate] = useState(null);
  const [maxToDate, setMaxToDate] = useState(null);
  const [selectedFromDate, setSelectedFromDate] = useState(null);
  const [selectedToDate, setSelectedToDate] = useState(null);
  const [activeRange, setActiveRange] = useState(null);
  const [surplusOperatorDate, setSurplusOperatorDate] = useState('');
  const [showSurplusOperatorTable, setShowSurplusOperatorTable] =
    useState(false);
  const [filter, setFilter] = useState('All');
  const [filteredData, setFilteredData] = useState([]);
  const [isAscending, setIsAscending] = useState(true);
  const [surplusGraphData, setSurplusGraphData] = useState([]);

  const {
    dataGraph: graphData,
    fetchData: fetchDataGraph,
    loading: graphLoader,
  } = useManpowerSurplusGraph();

  const {
    surplusOperator: surplusOperator,
    fetchData: fetchSurplusOperator,
    loading: operatorLoader,
  } = useFetchSurplusOperator();

  const surplusOperatorTableData = surplusOperator?.map((res, index) => {
    return { ...res, id: index + 1 };
  });
  const shop = useSelector(shopReducer.getShop);
  const [dayWiseBtn, setDayWiseBtn] = useState('daily');
  const [datesBtn, setDatesBtn] = useState('All');
  const isInitialMount = useRef(true);
  const fetchDataDebounced = useRef(null);
  const debounceTimeout = useRef(null);

  const monthSelect = monthData.filter((value) => value === activeRange);

  const resetFilters = () => {
    setSearchValue('');
    setFilterTableData(surplusOperatorTableData);
    setType('All');
    setSubCast('All');
    setGroup('All');
    setLine('All');
    setArea('All');
    setSearchKey((prev) => prev + 1);
  };

  const weeklySelect = weeklyData.filter((value) => {
    return value === dayWiseBtn;
  });

  const DatesSelect = Dates.filter((value) => value === datesBtn);

  const [anchorEl, setAnchorEl] = useState(null);
  const filterOpen = Boolean(anchorEl);
  const [options, setOptions] = useState(
    surplusOperator?.map((d) => d.operatorName) || []
  );
  const [type, setType] = useState('All');
  const [subCast, setSubCast] = useState('All');
  const [group, setGroup] = useState('All');
  const [line, setLine] = useState('All');
  const [area, setArea] = useState('All');
  const [searchKey, setSearchKey] = useState(0);
  const [operators, setOperators] = useState([]);
  const [filterTableData, setFilterTableData] = useState([]);
  const [inisaldata, setInisalData] = useState(null);
  const [treeFilter, setTreeFilter] = useState(null);
  const operatorLength = filterTableData?.length;

  const getMonthDays = (month) => {
    const months = month / 30;
    const day = month % 30;
    return `${Math.trunc(months)} Months ${Math.trunc(day)} Days`;
  };

  const columns = [
    {
      field: 'operator',
      headerName: `Operator (${operatorLength || 0})`,
      width: 150,
      flex: 2.5,
      resizable: false,
      sortable: false,
      fontWeight: '700',
      headerClassName: 'super-app-theme--header fontWeight',
      renderCell: (params) => (
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
          }}
        >
          <div>
            {params?.row?.staffProfile ? (
              <img
                src={params?.row?.staffProfile}
                alt={params?.row?.operatorName}
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '100%',
                }}
              />
            ) : (
              <div
                style={{
                  width: '35px',
                  height: '35px',
                  borderRadius: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  backgroundColor: 'rgb(226 225 225)',
                  color: '#555',
                  overflow: 'hidden',
                }}
              >
                {getInitialName(params?.row?.operatorName)}
              </div>
            )}
          </div>

          <div>
            <p>{params?.row?.operatorName}</p>
          </div>
        </div>
      ),
    },
    {
      field: 'noOfSurplusDays',
      headerName: 'No. of Surplus Days',
      width: 100,
      flex: 2,
      resizable: false,
      sortable: false,
      headerClassName: 'super-app-theme--header',
      renderHeader: () => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            cursor: 'default',
          }}
        >
          <Typography
            sx={{ fontSize: '12px', fontSize: '12px', fontWeight: 'bold' }}
          >
            No. of Surplus Days
          </Typography>
          <img
            src={sorting}
            alt="sort icon"
            width={10}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              handleSortClick('noOfSurplusDays');
            }}
          />
        </Box>
      ),
    },
    {
      field: 'relievingIn',
      headerName: 'Relieving In',
      width: 150,
      flex: 2.5,
      resizable: false,
      sortable: false,
      headerClassName: 'super-app-theme--header',
      renderHeader: () => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            cursor: 'default',
          }}
        >
          <Typography
            sx={{ fontSize: '12px', fontSize: '12px', fontWeight: 'bold' }}
          >
            Relieving In
          </Typography>
          <img
            src={sorting}
            alt="sort icon"
            width={10}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              handleSortClick('relievingIn');
            }}
          />
        </Box>
      ),
      renderCell: (params) => (
        <span>{getMonthDays(params?.row?.relievingIn || 0)} </span>
      ),
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 130,
      flex: 1.5,
      resizable: false,
      sortable: false,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'subCategory',
      headerName: 'Sub-Category',
      width: 150,
      flex: 1.5,
      resizable: false,
      sortable: false,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'group',
      headerName: 'Group',
      width: 100,
      flex: 1,
      resizable: false,
      sortable: false,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'line',
      headerName: 'Line',
      width: 100,
      flex: 1,
      resizable: false,
      sortable: false,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'area',
      headerName: 'Area',
      width: 100,
      flex: 1,
      resizable: false,
      sortable: false,
      headerClassName: 'super-app-theme--header',
    },
  ];

  useEffect(() => {
    const updateTreeFilterData = () => {
      try {
        const storedData = JSON.parse(localStorage.getItem('treeFilterPara'));
        if (storedData) {
          // storedData.selectedNodes.shift();
          setTreeFilter(storedData?.selectedNodes);
        }
      } catch (error) {
        console.error('Failed to parse treeFilterPara:', error);
      }
    };

    updateTreeFilterData();

    const handleStorageChange = (event) => {
      if (event.key === 'treeFilterPara' || event.type === 'treeFilterPara') {
        updateTreeFilterData();
      }
    };

    window.addEventListener('treeFilterPara', handleStorageChange);

    return () => {
      window.removeEventListener('treeFilterPara', handleStorageChange);
      localStorage.removeItem('treeFilterPara');
    };
  }, []);

  useEffect(() => {
    handleRangeClick('1M');
  }, []);

  // useEffect(() => {

  //   const optionData = surplusOperatorTableData?.map((res) => ({
  //     name: res.operatorName,
  //     id: res.staffId,
  //   }));

  //   setOptions(optionData);
  // }, [surplusOperatorTableData, options.length]);

  const memoizedFilters = useMemo(() => {
    const typeSet = new Set();
    const subCastSet = new Set();
    const groupSet = new Set();
    const lineSet = new Set();
    const areaSet = new Set();

    surplusOperatorTableData?.forEach((item) => {
      typeSet.add(item.type);
      subCastSet.add(item.subCategory);
      groupSet.add(item.group);
      lineSet.add(item.line);
      areaSet.add(item.area);
    });

    return {
      type: [...typeSet],
      subCast: [...subCastSet],
      group: [...groupSet],
      line: [...lineSet],
      area: [...areaSet],
    };
  }, [surplusOperatorTableData]);

  const handleRangeClick = (range) => {
    setSelectedFromDate(null);
    setSelectedToDate(null);
    setActiveRange(range);
    setShowSurplusOperatorTable(false);

    const now = new Date();
    let startDate;
    let maxDate;

    switch (range) {
      case '1M':
        startDate = new Date(now);
        startDate.setMonth(now.getMonth() - 1);
        maxDate = new Date(now);
        startDate.setDate(now.getDate() - 1);
        break;
      case '3M':
        startDate = new Date(now);
        startDate.setMonth(startDate.getMonth() - 3);
        maxDate = new Date(now);
        startDate.setDate(now.getDate() - 1);
        break;
      case '6M':
        startDate = new Date(now);
        startDate.setMonth(startDate.getMonth() - 7);
        maxDate = new Date(now);
        startDate.setDate(now.getDate() - 1);
        break;
      case '1Y':
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

  const handleDayWiseClick = (data) => {
    setDayWiseBtn(data);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  useEffect(() => {
    if (selectedFromDate) {
      setMinToDate(selectedFromDate);
    }
  }, [selectedFromDate]);

  const handleCloseFilter = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (selectedFromDate && selectedToDate) {
      clearTimeout(fetchDataDebounced.current);
      fetchDataDebounced.current = setTimeout(() => {
        fetchData();
      }, 300);
    }
  }, [selectedFromDate, selectedToDate, dayWiseBtn, shop.id, treeFilter]);

  const fetchData = async () => {
    try {
      const basicPayload = {
        startDate: dayjs(selectedFromDate).format('DD-MM-YYYY'),
        endDate: dayjs(selectedToDate).format('DD-MM-YYYY'),
        plantId: '',
        shopId: shop.id,
        type: treeFilter?.[1] || '',
        subCategory: treeFilter?.[2] || '',
        group: treeFilter?.[3] || '',
        line: treeFilter?.[4] || '',
        area: treeFilter?.[5] || '',
        datePeriod: dayWiseBtn,
      };
      await fetchDataGraph(basicPayload);
    } catch (err) {
      console.error('Error fetching basic requirements:', err);
    }
  };

  const getSurplusOperator = async (x) => {
    setShowSurplusOperatorTable(true);
    const date = dayjs(x, 'YYYY-MM-DD').format('DD/MM/YYYY');
    setSurplusOperatorDate(date);

    const payload = {
      date: dayjs(x).format('DD-MM-YYYY'),
      shop_id: shop?.id,
    };
    const surplusTableData = await fetchSurplusOperator(payload);

    if (surplusTableData?.data?.response?.responseCode === 200) {
      const data = surplusTableData?.data?.response?.responseCode;
    }
  };

  const handleChange = (event) => {
    const { value, name } = event.target;

    switch (name) {
      case 'type':
        setType(value);
        break;
      case 'subCast':
        setSubCast(value);
        break;
      case 'group':
        setGroup(value);
        break;
      case 'line':
        setLine(value);
        break;
      case 'area':
        setArea(value);
        break;
      default:
        break;
    }
  };

  // const resetFilters = () => {
  //   setSearchValue("");
  //   setType(null);
  //   setSubCast(null);
  //   setGroup(null);
  //   setLine(null);
  //   setArea(null);
  //   setSearchKey((prev) => prev + 1);
  // };

  // const handleSearchChange = (newValue) => {
  //   if (newValue?.length != null) {
  //     setSearchValue(newValue);
  //     setOptions((prev) => prev.filter((d) => d.id !== newValue.id));
  //   } else {
  //     setSearchValue("");
  //   }
  // };

  // const handleSearch = (value) => {
  //   setSearchValue(value);
  //   const filteredData = fetchDataGraph?.response?.operators?.filter(
  //     (val) =>
  //       val?.staffId?.includes(value) ||
  //       val?.name?.toLowerCase()?.includes(value?.toLowerCase())
  //   );
  //   setOperators(filteredData);
  // };

  // const handleInputChange = (newValue) => {
  //   clearTimeout(timeOut);

  //   timeOut = setTimeout(() => {
  //     if (!newValue) {
  //       setFilterTableData(surplusOperatorTableData);
  //       return;
  //     }

  //     setFilterTableData((prevData) => {
  //       const filteredData = prevData?.filter((val) => {
  //         const operatorName = val?.operatorName?.toLowerCase();
  //         if (!operatorName) return false;

  //         return operatorName.includes(newValue?.toLowerCase());
  //       });
  //       console.log(filteredData, "filteredData");
  //       return filteredData;
  //     });
  //   }, 1000);
  // };

  const handleInputChange = (newValue) => {
    // Clear the previous timeout
    clearTimeout(debounceTimeout.current);

    // Set a new timeout
    debounceTimeout.current = setTimeout(() => {
      if (!newValue) {
        setFilterTableData(surplusOperatorTableData);
        return;
      }

      const filteredData = surplusOperatorTableData?.filter((val) => {
        const operatorName = val?.operatorName?.toLowerCase();
        if (!operatorName) return false;

        return operatorName.includes(newValue?.toLowerCase());
      });
      setFilterTableData(filteredData);
    }, 1000);
  };

  useEffect(() => {
    const filteredData = surplusOperatorTableData?.filter((item) => {
      return (
        (type === 'All' || item.type === type) &&
        (subCast === 'All' || item.subCategory === subCast) &&
        (group === 'All' || item.group === group) &&
        (line === 'All' || item.line === line) &&
        (area === 'All' || item.area === area)
      );
    });
    setInisalData(filteredData);
    setFilterTableData(filteredData);
  }, [area, group, line, subCast, surplusOperator, surplusOperator, type]);

  const handleSortClick = (type) => {
    if (!filterTableData || filterTableData.length === 0) return;

    const sortedData = [...filterTableData].sort((a, b) => {
      const valueA = a[type];
      const valueB = b[type];

      // Function to parse "Months - Days" format
      const parseMonthDay = (value) => {
        const match = value?.match(/(-?\d+)\s*Months\s*(-?\d+)\s*Days/);
        if (match) {
          const months = parseInt(match[1], 10);
          const days = parseInt(match[2], 10);
          return months * 30 + days; // Convert to total days
        }
        return isNaN(value) ? 0 : Number(value);
      };

      // Handle "Months - Days" format
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        if (valueA.includes('Months') && valueA.includes('Days')) {
          const totalDaysA = parseMonthDay(valueA);
          const totalDaysB = parseMonthDay(valueB);
          return isAscending
            ? totalDaysA - totalDaysB
            : totalDaysB - totalDaysA;
        }
        return isAscending
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
      // Handle date sorting
      else if (!isNaN(new Date(valueA)) && !isNaN(new Date(valueB))) {
        return isAscending
          ? new Date(valueA) - new Date(valueB)
          : new Date(valueB) - new Date(valueA);
      }
      // Handle numeric values
      else if (!isNaN(valueA) && !isNaN(valueB)) {
        return isAscending ? valueA - valueB : valueB - valueA;
      }
      return 0;
    });

    setFilterTableData(sortedData); // Update sorted data in state
    setIsAscending(!isAscending); // Toggle sorting order
  };

  useEffect(() => {
    function adjustData(data) {
      return data?.map((item) => {
        return {
          ...item,
          gap: item?.gap >= 0 ? 0 : item?.gap,
          surplus: item?.surplus >= 0 ? item?.surplus : 0,
        };
      });
    }
    if (dayWiseBtn !== 'daily') {
      const data = graphData?.response?.map((item) => {
        return {
          ...item,
          date: ` ${item.date[0]} - ${item.date[1]}`,
        };
      });
      setSurplusGraphData(adjustData(data));
    } else {
      setSurplusGraphData(adjustData(graphData?.response));
    }
  }, [graphData]);

  useEffect(() => {
    if (dayWiseBtn !== 'daily') {
      setShowSurplusOperatorTable(false);
    }
  }, [dayWiseBtn]);

  const compiledData = [
    ...new Map(
      [...(filterTableData || []), ...(filteredData || [])].map((item) => [
        item.id,
        item,
      ])
    ).values(),
  ];

  return (
    <div className="surplus-manpower">
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={operatorLoader || graphLoader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <SurplusBoxMain>
        <SurplusBoxTop>
          <TopLeftBox>
            <TypographyText>Past:</TypographyText>
            {monthData.map((range) => (
              <MonthBtn
                key={range}
                style={{
                  backgroundColor: monthSelect.includes(range)
                    ? '#cfd2d9'
                    : 'initial',
                  cursor: 'pointer',
                }}
                onClick={() => handleRangeClick(range)}
              >
                {range}
              </MonthBtn>
            ))}
            <DateContainer>
              <CustomDatePicker
                type="month"
                label={'From'}
                value={selectedFromDate}
                minDate={minDate}
                maxDate={maxDate}
                handleChange={(newDate) => {
                  setSelectedFromDate(newDate);
                  setShowSurplusOperatorTable(false);
                }}
                disabled={!['1M', '3M', '6M', '1Y'].includes(activeRange)}
              ></CustomDatePicker>
              <CustomDatePicker
                type="month"
                label={'To'}
                value={selectedToDate}
                minDate={minToDate}
                maxDate={maxToDate}
                handleChange={(newDate) => {
                  setSelectedToDate(newDate);
                  setShowSurplusOperatorTable(false);
                }}
              ></CustomDatePicker>
            </DateContainer>
            <TypographyText>Dates:</TypographyText>

            {Dates.map((date) => (
              <MonthBtn
                key={date}
                active={filter === date}
                onClick={() => setFilter(date)}
              >
                {date}
              </MonthBtn>
            ))}
          </TopLeftBox>
          <TopRightBox>
            <Box sx={{ padding: '0px 10px', borderRight: '1px solid #7D8087' }}>
              {weeklyData.map((dayWise) => (
                <MonthBtn
                  key={dayWise}
                  style={{
                    backgroundColor: weeklySelect.includes(dayWise)
                      ? '#cfd2d9'
                      : 'initial',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleDayWiseClick(dayWise)}
                >
                  {dayWise}
                </MonthBtn>
              ))}
            </Box>
            <div sx={{ position: 'relative' }}>
              <Button
                id="filter-btn"
                aria-controls={filterOpen ? 'filter-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={filterOpen ? 'true' : undefined}
                onClick={handleClick}
              >
                <img src={filterImg} alt="Filter-icon" />
              </Button>
              <Menu
                id="filter-menu"
                anchorEl={anchorEl}
                open={filterOpen}
                onClose={handleCloseFilter}
                className="custom-filter-menu"
                MenuListProps={{
                  'aria-labelledby': 'filter-btn',
                }}
              >
                <TreeFilter
                  onClose={handleCloseFilter}
                  showParametersTab={false}
                ></TreeFilter>
              </Menu>
            </div>
          </TopRightBox>
        </SurplusBoxTop>
        <ChartBox>
          <VEHGraphManpower
            graphData={surplusGraphData || []}
            getSurplusOperator={getSurplusOperator}
            filter={filter}
            dayWiseBtn={dayWiseBtn}
          ></VEHGraphManpower>
        </ChartBox>
        {showSurplusOperatorTable ? (
          <>
            <Box>
              <Typography
                variant="h3"
                sx={{ fontWeight: 'bold', color: '#343536' }}
              >
                Surplus Operators for {surplusOperatorDate}
              </Typography>
              <Box
                display="flex"
                alignItems="center"
                gap={2}
                padding={1}
                backgroundColor="#F4F5F8"
                marginTop="10px"
                borderRadius="5px"
              >
                <Typography variant="h3" color={'#66696B'}>
                  Filter:
                </Typography>

                <Box sx={{ minWidth: '208px' }}>
                  <TextField
                    // label="Search by Name, Staff ID"
                    placeholder="Search by Name, Staff ID"
                    value={searchValue}
                    onChange={(e) => {
                      setSearchValue(e?.target?.value);
                      handleInputChange(e?.target?.value);
                    }}
                    size="small"
                    variant="outlined"
                    sx={{
                      '& .MuiInputBase-root': {
                        height: '27px',
                      },
                      '& .MuiInputBase-input': {
                        // height: "27px",
                        padding: '8px 0px !important',
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <SearchIcon
                            sx={{
                              fontSize: 15, // Adjust the size
                              color: MarutiBlue500, // Replace with your blue color
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                    fullWidth // Optional: for a full-width input
                  />
                </Box>
                <Box sx={{ minWidth: '10rem' }}>
                  <Select
                    label="Type"
                    name="type"
                    value={type}
                    onChange={handleChange}
                  >
                    <MenuItem value="All">All</MenuItem>
                    {memoizedFilters?.type.map((option, idx) => {
                      if (option !== null && option) {
                        return (
                          <MenuItem key={idx} value={option}>
                            {option}
                          </MenuItem>
                        );
                      }
                    })}
                  </Select>
                </Box>
                <Box sx={{ minWidth: '10rem' }}>
                  <Select
                    label="Sub-Cast"
                    name="subCast"
                    value={subCast}
                    onChange={handleChange}
                  >
                    <MenuItem value="All">All</MenuItem>
                    {memoizedFilters?.subCast?.map((option, idx) => {
                      if (option !== null && option) {
                        return (
                          <MenuItem key={idx} value={option}>
                            {option}
                          </MenuItem>
                        );
                      }
                    })}
                  </Select>
                </Box>
                <Box sx={{ minWidth: '10rem' }}>
                  <Select
                    label="Group"
                    value={group}
                    name="group"
                    onChange={handleChange}
                  >
                    <MenuItem value="All">All</MenuItem>
                    {memoizedFilters?.group?.map((option, idx) => {
                      if (option !== null && option) {
                        return (
                          <MenuItem key={idx} value={option}>
                            {option}
                          </MenuItem>
                        );
                      }
                    })}
                  </Select>
                </Box>
                <Box sx={{ minWidth: '10rem' }}>
                  <Select
                    label="Line"
                    name="line"
                    value={line}
                    onChange={handleChange}
                  >
                    <MenuItem value="All">All</MenuItem>
                    {memoizedFilters?.line?.map((option, idx) => {
                      if (option !== null && option) {
                        return (
                          <MenuItem key={idx} value={option}>
                            {option}
                          </MenuItem>
                        );
                      }
                    })}
                  </Select>
                </Box>
                <Box sx={{ minWidth: '10rem' }}>
                  <Select
                    label="Area"
                    name="area"
                    value={area}
                    onChange={handleChange}
                  >
                    <MenuItem value="All">All</MenuItem>
                    {memoizedFilters?.area?.map((option, idx) => {
                      if (option !== null && option) {
                        return (
                          <MenuItem key={idx} value={option}>
                            {option}
                          </MenuItem>
                        );
                      }
                    })}
                  </Select>
                </Box>
                <ResetBtn onClick={resetFilters}>Reset</ResetBtn>
              </Box>
            </Box>
            <Box sx={{ maxHeight: '400px', overflow: 'auto' }}>
              <DataGridTable
                columns={columns}
                rows={compiledData}
                disableColumnMenu
                disableColumnSorting
                pagination={false}
              />
            </Box>
          </>
        ) : (
          <StackChartCard />
        )}
      </SurplusBoxMain>
    </div>
  );
};

export default SurplusManpower;
