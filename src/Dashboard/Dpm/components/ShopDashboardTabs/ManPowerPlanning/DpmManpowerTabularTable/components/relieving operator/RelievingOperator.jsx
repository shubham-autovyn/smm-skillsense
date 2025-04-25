import CloseIcon from '@mui/icons-material/Close';
import {
  Backdrop,
  Box,
  CircularProgress,
  DialogContent,
  IconButton,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as shopReducer from '../../../../../../../../redux/Reducers/SMMShopReducer';
import {
  DateTabs,
  DialogBox,
  FilterBox,
  StyledDataGridReliver,
} from './RelievingOperator.style';

import sorting from '../../../../../../../../assets/icons/SortIcon.svg';

import SecondaryButton from '../../../../../../../../utils/Buttons/SecondaryButton/SecondaryButton';
import DownloadIcon from '../../../../../../../../assets/svg/DawnloadIcon.svg';
import Select from '../../../../../../../../components/Select/Select';
import { downloadExcelFile } from '../../../../../../../../utils/downloadExcel';
import useRelivingOperators from '../../../../../../../PlantControl/hooks/relivingopertaors';

const DPMRelievingOperator = ({
  open,
  handleClose,
  data,
  date,
  selectedDate,
  totalCount,
  rilievingPayload,
  dayDate,
  operatorName,
}) => {
  const {
    data: relivingOperatorsData,
    fetchData,
    loading: graphLoader,
  } = useRelivingOperators();

  const [activeTab, setActiveTab] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const [isAscending, setIsAscending] = useState(true);
  const [tabs, setTabs] = useState([]);
  const [topFilterData, setTopfilterData] = useState(null);
  const [newRilievingPayload, setNewrilievingPayload] = useState(null);
  const [currentRole, setCurrentRole] = useState(null);
  const plant = useSelector(shopReducer.getPlant);
  const selectedLocation = useSelector(shopReducer.getLocation);
  const [location, setLocation] = useState(null);

  const [payload, setPayload] = useState({
    location: location?.id,
    plant: rilievingPayload?.plant,
    shop: rilievingPayload?.shop,
    area: rilievingPayload?.area,
    group: rilievingPayload?.group_name,
    line: rilievingPayload?.line,
    type: rilievingPayload?.type,
  });

  const columns = [
    {
      field: 'staff_id',
      headerName: 'Staff ID',
      flex: 1.2,
      sortable: false,
      renderHeader: () => (
        <Box
          sx={{
            display: 'flex',

            alignItems: 'center',

            gap: '5px',

            cursor: 'default',
          }}
        >
          <Typography sx={{ fontWeight: 'bold' }}>Staff ID</Typography>

          <img
            src={sorting}
            alt="sort icon"
            width={10}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              handleSortClick('staff_id');
            }}
          />
        </Box>
      ),
    },

    {
      field: 'name',
      headerName: 'Name',
      flex: 1.5,
      sortable: false,
      renderHeader: () => (
        <Box
          sx={{
            display: 'flex',

            alignItems: 'center',

            gap: '5px',

            cursor: 'default',
          }}
        >
          <Typography sx={{ fontWeight: 'bold' }}>Name</Typography>

          <img
            src={sorting}
            alt="sort icon"
            width={10}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              handleSortClick('name');
            }}
          />
        </Box>
      ),
    },

    {
      field: 'group_name',
      headerName: 'Category',
      flex: 1.3,
      sortable: false,
      renderHeader: () => (
        <Box
          sx={{
            display: 'flex',

            alignItems: 'center',

            gap: '5px',

            cursor: 'default',
          }}
        >
          <Typography sx={{ fontWeight: 'bold' }}>Category</Typography>

          <img
            src={sorting}
            alt="sort icon"
            width={10}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              handleSortClick('group_name');
            }}
          />
        </Box>
      ),
    },

    {
      field: 'station_name',
      headerName: 'Station',
      flex: 1.5,
      sortable: false,
      renderHeader: () => (
        <Box
          sx={{
            display: 'flex',

            alignItems: 'center',

            gap: '5px',

            cursor: 'default',
          }}
        >
          <Typography sx={{ fontWeight: 'bold' }}>Station</Typography>

          <img
            src={sorting}
            alt="sort icon"
            width={10}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              handleSortClick('station_name');
            }}
          />
        </Box>
      ),
    },

    {
      field: 'area_name',
      headerName: 'Area',
      flex: 1.5,
      sortable: false,
      renderHeader: () => (
        <Box
          sx={{
            display: 'flex',

            alignItems: 'center',

            gap: '5px',

            cursor: 'default',
          }}
        >
          <Typography sx={{ fontWeight: 'bold' }}>Area</Typography>

          <img
            src={sorting}
            alt="sort icon"
            width={10}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              handleSortClick('area_name');
            }}
          />
        </Box>
      ),
    },

    {
      field: 'line_name',
      headerName: 'Line',
      flex: 1,
      sortable: false,
      renderHeader: () => (
        <Box
          sx={{
            display: 'flex',

            alignItems: 'center',

            gap: '5px',

            cursor: 'default',
          }}
        >
          <Typography sx={{ fontWeight: 'bold' }}>Line</Typography>

          <img
            src={sorting}
            alt="sort icon"
            width={10}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              handleSortClick('line_name');
            }}
          />
        </Box>
      ),
    },
    {
      field: 'group_name',
      headerName: 'Group',
      flex: 1,
      sortable: false,
      renderHeader: () => (
        <Box
          sx={{
            display: 'flex',

            alignItems: 'center',

            gap: '5px',

            cursor: 'default',
          }}
        >
          <Typography sx={{ fontWeight: 'bold' }}>Group</Typography>

          <img
            src={sorting}
            alt="sort icon"
            width={10}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              handleSortClick('line_name');
            }}
          />
        </Box>
      ),
    },

    {
      field: 'shop_name',
      headerName: 'Shop',
      flex: 1,
      sortable: false,
      renderHeader: () => (
        <Box
          sx={{
            display: 'flex',

            alignItems: 'center',

            gap: '5px',

            cursor: 'default',
          }}
        >
          <Typography sx={{ fontWeight: 'bold' }}>Shop</Typography>

          <img
            src={sorting}
            alt="sort icon"
            width={10}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              handleSortClick('shop_name');
            }}
          />
        </Box>
      ),
    },

    {
      field: 'plant_name',
      headerName: 'Plant',
      flex: 1,
      sortable: false,
      renderHeader: () => (
        <Box
          sx={{
            display: 'flex',

            alignItems: 'center',

            gap: '5px',

            cursor: 'default',
          }}
        >
          <Typography sx={{ fontWeight: 'bold' }}>Plant</Typography>

          <img
            src={sorting}
            alt="sort icon"
            width={10}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              handleSortClick('plant_name');
            }}
          />
        </Box>
      ),
    },

    {
      field: 'type',
      headerName: 'Type',
      flex: 1,
      sortable: false,
      renderHeader: () => (
        <Box
          sx={{
            display: 'flex',

            alignItems: 'center',

            gap: '5px',

            cursor: 'default',
          }}
        >
          <Typography sx={{ fontWeight: 'bold' }}>Type</Typography>

          <img
            src={sorting}
            alt="sort icon"
            width={10}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              handleSortClick('type');
            }}
          />
        </Box>
      ),
    },
  ];

  useEffect(() => {
    setLocation(selectedLocation);
  }, [selectedLocation]);

  useEffect(() => {
    setFilteredData(data);
    setTopfilterData(filterData(data));
    setCurrentRole(localStorage.getItem('role'));
  }, [data]);

  useEffect(() => {
    if (rilievingPayload) {
      setNewrilievingPayload(rilievingPayload);
    }
  }, [rilievingPayload]);

  useEffect(() => {
    setTabs(
      date
        .map((item, idx) =>
          totalCount[idx] !== 0 && totalCount[idx] !== '-'
            ? { date: item, total: totalCount[idx] }
            : null
        )
        .filter(Boolean)
    );
  }, [date, totalCount]);

  useEffect(() => {
    const index = tabs.findIndex((item) => item.date === selectedDate);
    setActiveTab(index);
  }, [selectedDate, tabs]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formatDateDaily = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB').replace(/\//g, '-');
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    const date = tabs[newValue]?.date;

    let [startDate, lastDate] = date.split(' - ');
    startDate = formatDate(startDate);
    lastDate = formatDate(lastDate);

    setNewrilievingPayload((prev) => ({
      ...prev,
      end_date: dayDate === 'daily' ? formatDateDaily(date) : lastDate,
      start_date: dayDate === 'daily' ? formatDateDaily(date) : startDate,
    }));
  };

  useEffect(() => {
    if (newRilievingPayload) {
      RelivingOperator(newRilievingPayload);
    }
  }, [newRilievingPayload, activeTab]);
  const RelivingOperator = async (payload) => {
    const response = await fetchData(payload);
    if (response?.data?.responseCode === 200) {
      setFilteredData(response?.data?.response);
      setTopfilterData(filterData(response?.data?.response));
    }
  };
  const filterData = (data) => {
    const result = {
      plant: [rilievingPayload?.plant],
      shop: [rilievingPayload?.shop],
      area_name: [rilievingPayload?.area],
      group_name: [rilievingPayload?.group_name],
      line_name: [rilievingPayload?.line],
      station_name: [rilievingPayload?.station_name],
      type: [rilievingPayload?.type],
    };

    // if (rilievingPayload) {
    //   result.plant.push(rilievingPayload.plant);
    //   result.shop.push(rilievingPayload.shop);
    //   result.area_name.push(rilievingPayload.area_name);
    //   result.group_name.push(rilievingPayload.group_name);
    //   result.line_name.push(rilievingPayload.line_name);
    //   result.station_name.push(rilievingPayload.station_name);
    // }

    data?.forEach((item) => {
      if (item.plant_name !== null && !result.plant.includes(item.plant_name))
        result.plant.push(item.plant_name);
      if (item.shop_name !== null && !result.shop.includes(item.shop_name))
        result.shop.push(item.shop_name);
      if (item.area_name !== null && !result.area_name.includes(item.area_name))
        result.area_name.push(item.area_name);
      if (
        item.group_name !== null &&
        !result.group_name.includes(item.group_name)
      )
        result.group_name.push(item.group_name);
      if (item.line_name !== null && !result.line_name.includes(item.line_name))
        result.line_name.push(item.line_name);
      if (
        item.station_name !== null &&
        !result.station_name.includes(item.station_name)
      )
        result.station_name.push(item.station_name);
      if (item.type !== null && !result.type.includes(item.type))
        result.type.push(item.type);
    });

    return result;
  };

  const handleChange = (key, newValue) => {
    const validKeys = ['plant', 'shop', 'area', 'group', 'line'];
    if (validKeys.includes(key)) {
      setPayload((prev) => ({
        ...prev,
        [key]: newValue,
      }));
    }
  };

  const handleApplyFilter = () => {
    setNewrilievingPayload((prev) => ({
      ...prev,
      area: payload?.area !== 'All' ? payload?.area : null,
      line: payload?.line !== 'All' ? payload?.line : null,
      shop: payload?.shop !== 'All' ? payload?.shop : null,
      group_name: payload?.group !== 'All' ? payload?.group : null,
      plant: payload?.plant !== 'All' ? payload?.plant : null,
    }));
  };

  const handalDownload = () => {
    const headerMapping = {
      staff_id: 'Staff Id',
      name: 'Employee Name',
      level: 'Level',
      station_name: 'Station Name',
      area_name: 'Area Name',
      line_name: 'Line Number',
      group_name: 'Group Name',
      shop_name: 'Shop Name',
      plant_name: 'Plant Name',
      type: 'Type',
    };

    downloadExcelFile(
      null,
      filteredData,
      headerMapping,
      `${operatorName}.xlsx`
    );
  };

  const handleSortClick = (type) => {
    const sortedData = [...filteredData].sort((a, b) => {
      const valueA = a[type];

      const valueB = b[type];

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        // Handle alphabetic sorting

        return isAscending
          ? valueA.localeCompare(valueB) // Ascending
          : valueB.localeCompare(valueA); // Descending
      } else if (!isNaN(new Date(valueA)) && !isNaN(new Date(valueB))) {
        // Handle date sorting

        const dateA = new Date(valueA);

        const dateB = new Date(valueB);

        return isAscending ? dateA - dateB : dateB - dateA;
      } else if (typeof valueA === 'number' && typeof valueB === 'number') {
        // Handle numeric sorting

        return isAscending ? valueA - valueB : valueB - valueA;
      }

      return 0; // Default case for unhandled data types
    });

    setFilteredData(sortedData);

    setIsAscending(!isAscending); // Toggle sorting order
  };

  return (
    <>
      <DialogBox open={open}>
        <Backdrop
          sx={(theme) => ({
            color: '#fff',
            zIndex: theme.zIndex.drawer + 1,
          })}
          open={graphLoader}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mb: '10px',
          }}
        >
          <Typography variant="h4" style={{ textTransform: 'capitalize' }}>
            {operatorName} Operators
          </Typography>
          <CloseIcon
            style={{ cursor: 'pointer' }}
            aria-label="close"
            onClick={handleClose}
          />
        </Box>
        <DialogContent>
          <FilterBox>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box>
                <Typography variant="h5">Filter: </Typography>
              </Box>
              <Box sx={{ maxWidth: '300px' }}>
                <Select
                  label="Location"
                  value={location?.location_name}
                  onChange={null}
                  options={[location?.location_name]}
                ></Select>
              </Box>
              <Box sx={{ minWidth: '100px' }}>
                <Select
                  label="Plant"
                  value={
                    currentRole === 'Dpm' ? plant?.plant_name : payload?.plant
                  }
                  options={
                    currentRole === 'Dpm'
                      ? plant
                        ? [plant.plant_name]
                        : []
                      : topFilterData?.plant || []
                  }
                  onChange={(event) =>
                    handleChange('plant', event.target.value)
                  }
                />
              </Box>
              <Box>
                <Select
                  label="Shop"
                  value={payload?.shop}
                  options={topFilterData?.shop}
                  onChange={(event) => handleChange('shop', event.target.value)}
                />{' '}
              </Box>
              <Box>
                <Select
                  label="Group"
                  value={payload?.group}
                  options={topFilterData?.group_name}
                  onChange={(event) =>
                    handleChange('group', event.target.value)
                  }
                />{' '}
              </Box>
              <Box>
                <Select
                  label="Line"
                  value={payload?.line}
                  options={topFilterData?.line_name}
                  onChange={(event) => handleChange('line', event.target.value)}
                />{' '}
              </Box>
              <Box>
                <Select
                  label="Area"
                  value={payload?.area}
                  options={topFilterData?.area_name}
                  onChange={(event) => handleChange('area', event.target.value)}
                />{' '}
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: '10px',
              }}
            >
              <Box>
                <SecondaryButton onClick={handleApplyFilter}>
                  Apply
                </SecondaryButton>
              </Box>
            </Box>
          </FilterBox>

          <DateTabs>
            <Box
              sx={{
                flexGrow: 1,
              }}
            >
              <Tabs
                variant="scrollable"
                scrollButtons="auto"
                value={activeTab}
                onChange={handleTabChange}
              >
                {tabs?.map((tab, index) => (
                  <Tab
                    sx={{
                      marginRight: '5px',
                      padding: '20px 15px',
                      backgroundColor: '#f4f5f8',
                      borderRadius: '5px 5px 0 0',
                    }}
                    key={index}
                    label={
                      <Box
                        sx={{
                          cursor: 'pointer',
                        }}
                      >
                        <Typography sx={{ fontSize: '10px' }}>
                          {tab.date}
                        </Typography>
                        <Typography sx={{ fontSize: '10px' }}>
                          Total: {tab.total}
                        </Typography>
                      </Box>
                    }
                  />
                ))}
              </Tabs>
            </Box>
          </DateTabs>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '15px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <Box
                sx={{
                  borderRight: '1px solid',
                  padding: '0 10px',
                }}
              >
                <Typography variant="h5">{tabs[activeTab]?.date} </Typography>
              </Box>
              <Box>
                <Typography variant="h5">
                  Total {tabs[activeTab]?.total} {operatorName}
                </Typography>
              </Box>
            </Box>
            <IconButton
              disabled={filteredData?.length === 0}
              onClick={handalDownload}
              color="primary"
              sx={{ marginLeft: 'auto', cursor: 'pointer' }}
            >
              <img src={DownloadIcon} color="red" alt="icon" width={25} />
            </IconButton>
          </Box>

          <Box sx={{ width: '100%' }}>
            <StyledDataGridReliver
              columns={columns}
              disableColumnMenu
              disableAutosize
              disableColumnResize
              rows={filteredData || []}
              getRowId={(row) => row.staff_id}
              hideFooter
              rowHeight={35}
              columnHeaderHeight={40}
            />
          </Box>
        </DialogContent>
      </DialogBox>
    </>
  );
};

export default DPMRelievingOperator;
