import { Backdrop, Box, CircularProgress, Paper } from '@mui/material';
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import PrimaryButton from '../../../utils/Buttons/PrimaryButton/PrimaryButton'
import SecondaryButton from '../../../utils/Buttons/SecondaryButton/SecondaryButton';
import CustomDatePicker from '../../../components/DatePicker/DatePicker';
import NoReportsSelected from '../../../components/NoDataViews/NoReportsSelected';
import * as shopReducer from '../../../redux/Reducers/SMMShopReducer';
import { FilterItem } from '../NewOperator/NewOperator.styles';

import {
  RenderDatePicker,
  RenderSearchDropdown,
  RenderSingleDropdown,
} from '../components/FilterComponents';
import useStationWiseReports from '../hooks/stationWiseReports';
import StationWiseDataTable from './StationWiseDataTable/StationWiseDataTable';

import { useSelector } from 'react-redux';
import SnackBar from '../../../components/Snackbar/Snackbar';
import useFilters from '../../SupervisorDashboard/hooks/fetchFilters';
import {} from './StationWise.css';

const TabPanel = ({ value, index, children }) => {
  return value === index ? <Box>{children}</Box> : null;
};

const StationWise = ({ handleApplyFilters, showFilters, setShowFilters }) => {
  const site = useSelector(shopReducer.getSite);

  const [data, setData] = useState(0);
  const { dataStationWise, fetchStationWise, loading } =
    useStationWiseReports();

  const { getFilters, dataFilters, loading: loadingFilters } = useFilters();
  const [fromDate, setFromDate] = useState(dayjs().startOf('month').toDate());
  const [toDate, setToDate] = useState(new Date()); // Today's date
  const [filters, setFilters] = useState();
  const [location, setLocation] = useState([]);
  const [plantOptions, setPlantOptions] = useState([]);
  const [shopOptions, setShopOptions] = useState([]);
  const [groupOptions, setGroupOptions] = useState([]);
  const [areaOptions, setAreaOptions] = useState([]);
  const [lineOptions, setLineOptions] = useState([]);
  const [responseCode, setResponseCode] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [operatorOptions, setOperatorOptions] = useState([]);
  const [stationOptions, setStationOptions] = useState([]);
  const [shiftOptions, setShiftOptions] = useState([
    { label: 'A', value: 'A' },
    { label: 'B', value: 'B' },
    { label: 'C', value: 'C' },
  ]);
  // const [filterFromDate, setFilterFromDate] = useState(new Date());
  const [filterFromDate, setFilterFromDate] = useState(
    dayjs().startOf('month').toDate()
  );

  const [filterSelected, setFilterSelected] = useState({
    location: null,
    plant: null,
    shop: null,
    group: null,
    shift: null,
    line: null,
    area: null,
    month: null,
    fromdate: null,
    todate: null,
    operator: null,
    station: null,
  });

  const fetchFilterData = useCallback(async () => {
    if (!filterSelected?.location?.value) return;

    try {
      const response = await getFilters({
        locationid: filterSelected?.location?.value,
      });
      setFilters(response);
    } catch (error) {
      console.error('Error fetching filters:', error);
    }
  }, [getFilters, filterSelected.location?.value]);

  useEffect(() => {
    fetchFilterData();
  }, [fetchFilterData]);

  useEffect(() => {
    if (site) {
      setLocation(
        site?.locations?.map((item) => {
          return {
            label: item.location_name,
            value: item.id,
          };
        })
      );
    }
  }, [site]);

  useEffect(() => {
    if (!filters?.data?.response) return;

    const uniqueOptions = (key, labelKey) =>
      Array.from(
        new Map(
          filters?.data?.response.map((item) => [
            item[key],
            { label: item[labelKey], value: item[key] },
          ])
        ).values()
      );

    setPlantOptions(uniqueOptions('plant_id', 'plant_name'));
    setShopOptions(uniqueOptions('shop_id', 'shop_name'));

    const uniqueSetOptions = (key) => {
      return Array.from(
        new Set(filters?.data?.response.map((item) => item[key]))
      )
        .filter((val) => typeof val === 'string' || typeof val === 'number')
        .map((val) => ({
          label: String(val),
          value: val,
        }));
    };

    setGroupOptions(uniqueSetOptions('group_name'));
    setAreaOptions(uniqueSetOptions('area_name'));
    setLineOptions(uniqueSetOptions('line_name'));
    setOperatorOptions(uniqueSetOptions('name'));
    setStationOptions(uniqueSetOptions('station_name'));
    // setLineOptions(
    //   uniqueSetOptions("line_name").map((line) => ({
    //     label: `Line ${line.label}`, // Ensure it's correctly formatted
    //     value: line.value,
    //   }))
    // );
  }, [filters]);

  const formattedFromDate = fromDate
    ? dayjs(fromDate).format('DD-MM-YYYY')
    : null;
  const formattedToDate = toDate ? dayjs(toDate).format('DD-MM-YYYY') : null;
  const formattedMonth = filterFromDate
    ? dayjs(filterFromDate).format('MMM-YYYY')
    : null;

  // const applyFilters = () => {
  //   const payload = {
  //     location: filterSelected?.location?.value,
  //     plant: filterSelected?.plant?.value,
  //     shop: filterSelected?.shop?.value,
  //     group: filterSelected?.group?.value,
  //     shift: filterSelected?.shift?.value,
  //     line: filterSelected?.line?.value,
  //     area: filterSelected?.area?.value,
  //     month: formattedMonth,
  //     fromdate: formattedFromDate,
  //     todate: formattedToDate,
  //     operator: filterSelected?.operator?.length
  //       ? filterSelected.operator[0].value
  //       : null,
  //     station: filterSelected?.station?.length
  //       ? filterSelected.station[0].value
  //       : null,
  //   };
  //   fetchStationWise(payload).then(() => {
  //     setData(1);
  //   });
  //   if (handleApplyFilters) {
  //     handleApplyFilters();
  //   }
  // };
  const applyFilters = async () => {
    const payload = {
      location: filterSelected?.location?.value,
      plant: filterSelected?.plant?.value,
      shop: filterSelected?.shop?.value,
      group: filterSelected?.group?.value,
      shift: filterSelected?.shift?.value,
      line: filterSelected?.line?.value,
      area: filterSelected?.area?.value,
      month: formattedMonth,
      fromdate: formattedFromDate,
      todate: formattedToDate,
      operator: filterSelected?.operator?.length
        ? filterSelected.operator[0].value
        : null,
      station: filterSelected?.station?.value || null,
    };

    try {
      const response = await fetchStationWise(payload);
      if (response.data?.responseCode === 200) {
        setData(1);
        handleApplyFilters();
      } else {
        setResponseCode(response.data?.responseCode);
        setAlertMessage(response.data?.message);
        setShowSuccessAlert(true);
        setShowFilters(true);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setData(0);
    }
  };

  const handleFromDateChange = (date) => {
    setFilterFromDate(date);

    const selectedMonth = dayjs(date);
    const currentMonth = dayjs();

    if (selectedMonth.isSame(currentMonth, 'month')) {
      // If the selected month is the current month
      setFromDate(selectedMonth.startOf('month').toDate());
      setToDate(new Date()); // Today's date
    } else {
      // If the selected month is a past month
      setFromDate(selectedMonth.startOf('month').toDate());
      setToDate(selectedMonth.endOf('month').toDate());
    }
  };

  const handleRemoveFilters = () => {
    setFilterSelected({
      location: null,
      plant: null,
      shop: null,
      group: null,
      shift: null,
      line: null,
      area: null,
      operator: null,
      station: null,
    });

    // setFromDate(null);
    // setToDate(null);
    setData(0);
  };

  const handleFilterChange = (key, value) => {
    setFilterSelected((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  return (
    <>
      <Backdrop
        sx={(theme) => ({
          color: '#fff',
          zIndex: theme.zIndex.drawer + 1,
        })}
        open={loadingFilters || loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {showFilters && (
        <Box mb={2} className="station-wise">
          <Paper>
            <FilterItem>
              <div
                style={{
                  width: '35%',
                  display: 'flex',
                  gap: '10px',
                }}
              >
                <RenderSingleDropdown
                  data={location}
                  subLabel={''}
                  selectedOptions={filterSelected?.location}
                  handleChange={(event) =>
                    handleFilterChange('location', event.target.value)
                  }
                  label="Location"
                  width="100%"
                ></RenderSingleDropdown>
                <RenderSingleDropdown
                  data={plantOptions}
                  selectedOptions={filterSelected?.plant}
                  handleChange={(event) =>
                    handleFilterChange('plant', event.target.value)
                  }
                  subLabel={''}
                  label="Plant"
                  width="100%"
                ></RenderSingleDropdown>
              </div>
              <div style={{ width: '65%', display: 'flex', gap: '10px' }}>
                <RenderSingleDropdown
                  data={shopOptions}
                  selectedOptions={filterSelected?.shop}
                  handleChange={(event) =>
                    handleFilterChange('shop', event.target.value)
                  }
                  subLabel={''}
                  label="Shop"
                  width="100%"
                ></RenderSingleDropdown>
                <RenderSingleDropdown
                  data={groupOptions}
                  selectedOptions={filterSelected?.group}
                  handleChange={(event) =>
                    handleFilterChange('group', event.target.value)
                  }
                  subLabel={''}
                  label="Group"
                  width="100%"
                ></RenderSingleDropdown>

                <RenderSingleDropdown
                  data={shiftOptions}
                  selectedOptions={filterSelected?.shift}
                  handleChange={(event) =>
                    handleFilterChange('shift', event.target.value)
                  }
                  subLabel={''}
                  label="Shift:"
                  width="100%"
                ></RenderSingleDropdown>
              </div>
            </FilterItem>
            <FilterItem>
              <div style={{ display: 'flex', gap: '10px', width: '35%' }}>
                <RenderSingleDropdown
                  data={lineOptions}
                  selectedOptions={filterSelected.line}
                  handleChange={(event) =>
                    handleFilterChange('line', event.target.value)
                  }
                  subLabel={''}
                  label="Line:"
                  width="100%"
                ></RenderSingleDropdown>
                <RenderSingleDropdown
                  data={areaOptions}
                  selectedOptions={filterSelected?.area}
                  handleChange={(event) =>
                    handleFilterChange('area', event.target.value)
                  }
                  subLabel={''}
                  label="Area:"
                  width="100%"
                ></RenderSingleDropdown>
              </div>

              <div style={{ width: '65%', display: 'flex', gap: '10px' }}>
                <div style={{ width: '32.5%' }}>
                  <label
                    htmlFor="Month"
                    style={{
                      fontSize: '10px',
                      fontWeight: '600',
                      color: '#66696b',
                      marginBottom: '4px',
                      display: 'block',
                    }}
                  >
                    Month
                  </label>
                  <CustomDatePicker
                    type="months"
                    label="Month"
                    months={['month', 'year']}
                    dateFormate={'MMM yyyy'}
                    maxDate={dayjs().endOf('year').toDate()}
                    value={filterFromDate}
                    handleChange={handleFromDateChange}
                    hideLabel={true}
                    // onClose={handleDatePickerCloseForFilters}
                  ></CustomDatePicker>
                </div>
                <div style={{ width: '67%' }}>
                  <RenderDatePicker
                    fromDate={fromDate}
                    toDate={toDate}
                    updateFromDate={setFromDate}
                    updateToDate={setToDate}
                    label="Training Date Range"
                    width="100%"
                  ></RenderDatePicker>
                </div>
              </div>
            </FilterItem>
            <FilterItem>
              <RenderSearchDropdown
                options={operatorOptions}
                selectedData={filterSelected?.operator} // Pass selected operator
                handleStaffSelection={(value) =>
                  handleFilterChange('operator', value)
                } // Handle selection change
                subLabel={''}
                label="Operator"
                width="34.4%"
              />
              <RenderSingleDropdown
                data={stationOptions}
                selectedOptions={filterSelected?.station}
                handleChange={(event) =>
                  handleFilterChange('station', event.target.value)
                }
                subLabel={''}
                label="Station"
                width="42.3%"
              ></RenderSingleDropdown>
            </FilterItem>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 4 }}>
              <Box>
                <SecondaryButton
                  disabled={false}
                  type="button"
                  onClick={handleRemoveFilters}
                >
                  Remove All
                </SecondaryButton>
              </Box>
              <Box>
                <PrimaryButton sx={{ ml: 2 }} onClick={applyFilters}>
                  Apply Filters
                </PrimaryButton>
              </Box>
            </Box>
          </Paper>
          <Paper sx={{ mt: 2 }}>{data === 0 && <NoReportsSelected />}</Paper>
        </Box>
      )}

      <Box>
        {/* <TabPanel value={data} index={1}> */}
        {/* <div style={{ maxHeight: "600px", width: "100%", overflow: "auto" }}> */}
        {!showFilters && data === 1 && (
          <StationWiseDataTable
            dataStationWise={[dataStationWise?.response]}
            filterSelected={filterSelected}
          />
        )}

        <Box sx={{ width: '100%' }}>
          <SnackBar
            showSuccessAlert={showSuccessAlert}
            alertMessage={alertMessage}
            responseCode={responseCode}
            handleClose={() => setShowSuccessAlert(false)}
          />
        </Box>
      </Box>
    </>
  );
};

export default StationWise;
