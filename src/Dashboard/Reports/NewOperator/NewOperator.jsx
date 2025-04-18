import { Backdrop, Box, CircularProgress, Paper } from '@mui/material';
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PrimaryButton from '../../../utils/Buttons/PrimaryButton/PrimaryButton';
import SecondaryButton from '../../../utils/Buttons/SecondaryButton/SecondaryButton';
import NoReportsSelected from '../../../components/NoDataViews/NoReportsSelected';
import SnackBar from '../../../components/Snackbar/Snackbar';
import * as shopReducer from '../../../redux/Reducers/SMMShopReducer';
import useFilters from '../../SupervisorDashboard/hooks/fetchFilters';
import {
  RenderDatePicker,
  RenderSearchDropdown,
  RenderSingleDropdown,
} from '../components/FilterComponents';
import useNewOperatorAllocation from '../hooks/newOperatorAllocation';
import './NewOperator.css';
import { FilterItem } from './NewOperator.styles';
import NewOperatorDataTable from './NewOperatorDataTable/NewOperatorDataTable';

const TabPanel = ({ value, index, children }) => {
  return value === index ? <Box>{children}</Box> : null;
};

const NewOperator = ({ showFilters, setShowFilters, handleApplyFilters }) => {
  const [data, setData] = useState(0);
  const { dataNewOperator, fetchNewOperator, loading } =
    useNewOperatorAllocation();

  const [fromDate, setFromDate] = useState(dayjs().startOf('month').toDate());
  const [toDate, setToDate] = useState(new Date());
  const site = useSelector(shopReducer.getSite);
  const { getFilters, loading: loadingFilters } = useFilters();
  const [filters, setFilters] = useState();
  const [location, setLocation] = useState([]);
  const [plantOptions, setPlantOptions] = useState([]);
  const [shopOptions, setShopOptions] = useState([]);
  const [groupOptions, setGroupOptions] = useState([]);
  const [areaOptions, setAreaOptions] = useState([]);
  const [operatorOptions, setOperatorOptions] = useState([]);
  const [lineOptions, setLineOptions] = useState([]);
  const [responseCode, setResponseCode] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [shiftOptions, setShiftOptions] = useState([
    { label: 'A', value: 'A' },
    { label: 'B', value: 'B' },
    { label: 'C', value: 'C' },
  ]);
  const [filterSelected, setFilterSelected] = useState({
    location: null,
    plant: null,
    shop: null,
    group: null,
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

  const applyFilters = async () => {
    const payload = {
      location: filterSelected?.location?.value,
      plant: filterSelected?.plant?.value,
      shop: filterSelected?.shop?.value,
      group: filterSelected?.group?.value,
      line: filterSelected?.line?.value,
      area: filterSelected?.area?.value,
      fromdate: formattedFromDate,
      todate: formattedToDate,
      operator: filterSelected?.operator?.length
        ? filterSelected.operator[0].value
        : null,
    };
    try {
      const response = await fetchNewOperator(payload);
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
  // const handleFromDateChange = (date) => {
  //   setFilterFromDate(date);
  //   if (dayjs(date).isAfter(dayjs(filterToDate))) {
  //     setFilterToDate(date);
  //   }
  // };
  const handleFilterChange = (key, value) => {
    setFilterSelected((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
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
      month: null,
      fromdate: null,
      todate: null,
      operator: null,
      station: null,
    });
    setData(0);
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
        <Box className="new-operator">
          <Paper>
            <FilterItem>
              <div style={{ display: 'flex', gap: '10px', width: '57%' }}>
                <RenderSingleDropdown
                  data={location}
                  subLabel={''}
                  selectedOptions={filterSelected.location}
                  handleChange={(event) =>
                    handleFilterChange('location', event.target.value)
                  }
                  label="Location"
                  width="100%"
                ></RenderSingleDropdown>

                <RenderSingleDropdown
                  data={plantOptions}
                  selectedOptions={filterSelected.plant}
                  handleChange={(event) =>
                    handleFilterChange('plant', event.target.value)
                  }
                  subLabel={''}
                  label="Plant"
                  width="100%"
                ></RenderSingleDropdown>

                <RenderSingleDropdown
                  data={shopOptions}
                  selectedOptions={filterSelected.shop}
                  handleChange={(event) =>
                    handleFilterChange('shop', event.target.value)
                  }
                  subLabel={''}
                  label="Shop"
                  width="100%"
                ></RenderSingleDropdown>
              </div>
              <div style={{ display: 'flex', gap: '10px', width: '43%' }}>
                <RenderSingleDropdown
                  data={groupOptions}
                  selectedOptions={filterSelected.group}
                  handleChange={(event) =>
                    handleFilterChange('group', event.target.value)
                  }
                  subLabel={''}
                  label="Group"
                  width="100%"
                ></RenderSingleDropdown>

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
              </div>
            </FilterItem>
            <FilterItem>
              <div style={{ width: '57%' }}>
                <div style={{ width: '100%', display: 'flex', gap: '10px' }}>
                  <div style={{ width: '34%' }}>
                    <RenderSingleDropdown
                      data={areaOptions}
                      selectedOptions={filterSelected.area}
                      handleChange={(event) =>
                        handleFilterChange('area', event.target.value)
                      }
                      subLabel={''}
                      label="Area:"
                      width="100%"
                    ></RenderSingleDropdown>
                  </div>
                  <div style={{ width: '66%' }}>
                    <RenderDatePicker
                      fromDate={fromDate}
                      toDate={toDate}
                      updateFromDate={setFromDate}
                      updateToDate={setToDate}
                      label="Allocation Date:"
                      width="100%"
                    ></RenderDatePicker>
                  </div>
                </div>
              </div>

              <div style={{ width: '43%' }}>
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
              </div>
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
        {!showFilters && data === 1 && (
          <NewOperatorDataTable dataNewOperator={dataNewOperator} />
        )}
      </Box>
      <Box sx={{ width: '100%' }}>
        <SnackBar
          showSuccessAlert={showSuccessAlert}
          alertMessage={alertMessage}
          responseCode={responseCode}
          handleClose={() => setShowSuccessAlert(false)}
        />
      </Box>
    </>
  );
};

export default NewOperator;
