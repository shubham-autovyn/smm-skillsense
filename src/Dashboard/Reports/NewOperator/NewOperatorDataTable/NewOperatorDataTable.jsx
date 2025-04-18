import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import sorting from '../../../../assets/icons/SortIcon.svg';
import download from '../../../../assets/svg/download-btn.svg';
import { DataGridTable } from '../../../../components/Data-table/dataTable.styles';
import SelectBox from '../../../../components/Select/SingleSelect';
import {} from './NewOperatorDataTable.css';

const NewOperatorDataTable = ({ dataNewOperator }) => {
  const [operatorData, setOperatorData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isAscending, setIsAscending] = useState(true);

  const columns = [
    {
      field: 'staffid',
      headerName: 'Staff ID',
      flex: 1,
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
            Staff ID
          </Typography>
          <img
            src={sorting}
            alt="sort icon"
            width={10}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              handleSortClick('staffid');
            }}
          />
        </Box>
      ),
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1.5,
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
            Name
          </Typography>
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
      field: 'allocationdateandtime',
      headerName: 'Allocation Date & Time',
      flex: 1.5,
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
            Allocation Date & Time
          </Typography>
          <img
            src={sorting}
            alt="sort icon"
            width={10}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              handleSortClick('allocationdateandtime');
            }}
          />
        </Box>
      ),
    },
    {
      field: 'level',
      headerName: 'Level',
      flex: 1,
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
            Level
          </Typography>
          <img
            src={sorting}
            alt="sort icon"
            width={10}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              handleSortClick('level');
            }}
          />
        </Box>
      ),
    },
    {
      field: 'area',
      headerName: 'Area',
      flex: 1,
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
            Area
          </Typography>
          <img
            src={sorting}
            alt="sort icon"
            width={10}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              handleSortClick('area');
            }}
          />
        </Box>
      ),
    },
    {
      field: 'line',
      headerName: 'Line',
      flex: 1,
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
            Line
          </Typography>
          <img
            src={sorting}
            alt="sort icon"
            width={10}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              handleSortClick('line');
            }}
          />
        </Box>
      ),
    },
    {
      field: 'group',
      headerName: 'Group',
      flex: 1,
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
            Group
          </Typography>
          <img
            src={sorting}
            alt="sort icon"
            width={10}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              handleSortClick('group');
            }}
          />
        </Box>
      ),
    },
    {
      field: 'shop',
      headerName: 'Shop',
      flex: 1,
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
            Shop
          </Typography>
          <img
            src={sorting}
            alt="sort icon"
            width={10}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              handleSortClick('shop');
            }}
          />
        </Box>
      ),
    },
    {
      field: 'plant',
      headerName: 'Plant',
      flex: 1,
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
            Plant
          </Typography>
          <img
            src={sorting}
            alt="sort icon"
            width={10}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              handleSortClick('plant');
            }}
          />
        </Box>
      ),
    },
  ];

  const handleSortClick = (type) => {
    setFilteredData((prevData) => {
      const sortedData = [...prevData].sort((a, b) => {
        const valueA = a[type];
        const valueB = b[type];

        if (typeof valueA === 'string' && typeof valueB === 'string') {
          return isAscending
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
        } else if (!isNaN(new Date(valueA)) && !isNaN(new Date(valueB))) {
          return isAscending
            ? new Date(valueA) - new Date(valueB)
            : new Date(valueB) - new Date(valueA);
        } else if (typeof valueA === 'number' && typeof valueB === 'number') {
          return isAscending ? valueA - valueB : valueB - valueA;
        }
        return 0;
      });

      return sortedData;
    });

    setIsAscending(!isAscending);
  };
  useEffect(() => {
    if (dataNewOperator?.response) {
      const updatedData = dataNewOperator.response.map((item, index) => ({
        ...item,
        id: item.staffid || index,
      }));
      setOperatorData(updatedData);
      setFilteredData(updatedData);
    }
  }, [dataNewOperator]);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '14px',
          padding: '10px 10px',
        }}
      >
        <div>Total {operatorData?.length}</div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <span>
            <img src={download} alt="" style={{ cursor: 'pointer' }} />
          </span>
          <span className="select-box">
            <SelectBox label="Column" borderColor="#171c8f"></SelectBox>
          </span>
        </div>
      </div>
      <DataGridTable
        disableColumnMenu
        disableAutosize
        disableColumnSorting
        rows={filteredData.length > 0 ? filteredData : operatorData}
        columns={columns}
        getRowId={(row) => row.staffid}
        disableSelectionOnClick
        hideFooter
        sx={{
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f4f4f4',
            fontWeight: 'bold',
            fontSize: '12px',
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 'bold',
          },
          '& .MuiDataGrid-cell': {
            fontSize: '12px',
            backgroundColor: '#fff',
          },
        }}
      />
    </div>
  );
};

export default NewOperatorDataTable;
