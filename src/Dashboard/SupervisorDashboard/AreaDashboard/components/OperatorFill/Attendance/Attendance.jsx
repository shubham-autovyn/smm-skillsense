import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React, { useEffect, useMemo, useState } from 'react';
import FilterSelect from '../../../../../../components/FilterSelectInput/FilterSelectInput';
import { SelectBoxHead } from '../Deployment/Deployment.styles';
import {} from './Attendance.css';

import { DataGridTable } from '../../../../../../components/Data-table/dataTable.styles';

import sorting from '../../../../../../assets/icons/SortIcon.svg';
import CustomDatePicker from '../../../../../../components/DatePicker/DatePicker';
import { DataGridTableMainBox, SummaryMainBox } from './Attendance.styles';

const SummaryBox = styled(Box)(({ theme, color }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  color: color || theme.palette.text.primary,
}));

const rows = [
  {
    id: 1,
    date: '01/12/2023',
    shift: 'A',
    punchIn: '06:10:35',
    punchOut: '15:30:35',
  },
  {
    id: 2,
    date: '02/12/2023',
    shift: 'A',
    punchIn: '06:10:35',
    punchOut: '15:30:35',
  },
  {
    id: 3,
    date: '03/12/2023',
    shift: 'A',
    punchIn: '06:10:35',
    punchOut: '15:30:35',
  },
  {
    id: 4,
    date: '04/12/2023',
    shift: 'A',
    punchIn: '06:10:35',
    punchOut: '15:30:35',
  },
  {
    id: 5,
    date: '05/12/2023',
    shift: 'A',
    punchIn: 'Absent',
    punchOut: 'Absent',
  },
  {
    id: 6,
    date: '05/12/2023',
    shift: 'A',
    punchIn: 'Absent',
    punchOut: 'Absent',
  },
  {
    id: 7,
    date: '02/12/2023',
    shift: 'A',
    punchIn: '06:10:35',
    punchOut: '15:30:35',
  },
  {
    id: 8,
    date: '03/12/2023',
    shift: 'A',
    punchIn: '06:10:35',
    punchOut: '15:30:35',
  },
  {
    id: 9,
    date: '04/12/2023',
    shift: 'A',
    punchIn: '06:10:35',
    punchOut: '15:30:35',
  },
  {
    id: 10,
    date: '05/12/2023',
    shift: 'A',
    punchIn: 'Absent',
    punchOut: 'Absent',
  },
  {
    id: 11,
    date: '05/12/2023',
    shift: 'A',
    punchIn: 'Absent',
    punchOut: 'Absent',
  },
  {
    id: 12,
    date: '05/12/2023',
    shift: 'A',
    punchIn: 'Absent',
    punchOut: 'Absent',
  },
  {
    id: 13,
    date: '05/12/2023',
    shift: 'A',
    punchIn: 'Absent',
    punchOut: 'Absent',
  },
  {
    id: 14,
    date: '04/12/2023',
    shift: 'A',
    punchIn: '06:10:35',
    punchOut: '15:30:35',
  },
  {
    id: 15,
    date: '04/12/2023',
    shift: 'A',
    punchIn: '06:10:35',
    punchOut: '15:30:35',
  },
  {
    id: 16,
    date: '04/12/2023',
    shift: 'A',
    punchIn: '06:10:35',
    punchOut: '15:30:35',
  },
  {
    id: 17,
    date: '04/12/2023',
    shift: 'A',
    punchIn: '06:10:35',
    punchOut: '15:30:35',
  },
];

export default function Attendance() {
  const totalWorkingDays = rows.length;
  const [filter, setFilter] = useState('All');
  const [filteredData, setFilteredData] = useState(rows);
  const [isAscending, setIsAscending] = useState(true);
  const [filteredRows, setFilteredRows] = useState(rows); // Final filtered rows

  const columns = [
    {
      field: 'date',
      headerName: 'Date',
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
          <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>
            Date
          </Typography>
          <img
            src={sorting}
            alt="sort icon"
            width={10}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              handleSortClick('date');
            }}
          />
        </Box>
      ),
    },
    {
      field: 'shift',
      headerName: 'Shift',
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
          <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>
            Shift
          </Typography>
          <img
            src={sorting}
            alt="sort icon"
            width={10}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              handleSortClick('shift');
            }}
          />
        </Box>
      ),
    },

    {
      field: 'punchIn',
      headerName: 'Punch In',
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
          <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>
            Punch In
          </Typography>
          <img
            src={sorting}
            alt="sort icon"
            width={10}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              handleSortClick('punchIn');
            }}
          />
        </Box>
      ),

      cellClassName: (params) =>
        params.value === 'Absent' ? 'absent-cell' : '',
    },

    {
      field: 'punchOut',
      headerName: 'Punch Out',
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
          <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>
            Punch Out
          </Typography>
          <img
            src={sorting}
            alt="sort icon"
            width={10}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              handleSortClick('punchOut');
            }}
          />
        </Box>
      ),
      renderCell: (params) => {
        if (
          params.row.punchIn === 'Absent' ||
          params.row.punchOut === 'Absent'
        ) {
          return '';
        }
        return params.value;
      },
    },
  ];

  const handlefilter = (selectedOption) => {
    setFilter(selectedOption.target.value);
  };

  // Recalculate filteredRows when `filteredData` or `filter` changes
  useEffect(() => {
    const rows = filteredData.filter((row) => {
      if (filter === '0' || filter === 'All') return true;
      if (filter === '1' || filter === 'Present')
        return row.punchIn !== 'Absent' && row.punchOut !== 'Absent';
      if (filter === '2' || filter === 'Absent')
        return row.punchIn === 'Absent' && row.punchOut === 'Absent';
      return true;
    });
    setFilteredRows(rows);
  }, [filter, filteredData]);

  const present = useMemo(() => {
    return rows.filter(
      (row) => row.punchIn !== 'Absent' && row.punchOut !== 'Absent'
    ).length;
  }, [rows]);

  const absent = useMemo(() => {
    return rows.filter(
      (row) => row.punchIn === 'Absent' || row.punchOut === 'Absent'
    ).length;
  }, [rows]);

  const [filters, setFilters] = useState({
    fromDate: new Date().toISOString().split('T')[0],
    toDate: new Date().toISOString().split('T')[0],
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSortClick = (type) => {
    const sortedData = [...filteredData].sort((a, b) => {
      const valueA = a[type];
      const valueB = b[type];

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return isAscending
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      } else if (!isNaN(new Date(valueA)) && !isNaN(new Date(valueB))) {
        const dateA = new Date(valueA);
        const dateB = new Date(valueB);
        return isAscending ? dateA - dateB : dateB - dateA;
      }
      return 0;
    });

    setFilteredData(sortedData); // Update sorted data
    setIsAscending(!isAscending); // Toggle sorting order
  };

  return (
    <>
      <Box sx={{ padding: '20px 40px 0px 40px' }}>
        <SelectBoxHead className="select-Box2">
          <Box sx={{ minWidth: '50%', display: 'flex', gap: '10px' }}>
            <CustomDatePicker
              label="From"
              value={filters.fromDate}
              handleChange={(date) => handleFilterChange('fromDate', date)}
              maxDate={filters.toDate}
            ></CustomDatePicker>
            <CustomDatePicker
              label="To"
              value={filters.toDate}
              handleChange={(date) => handleFilterChange('toDate', date)}
              minDate={filters.fromDate}
            ></CustomDatePicker>
          </Box>
          <Box sx={{ minWidth: '25%', display: 'flex', gap: '10px' }}>
            <FilterSelect
              label="Attendance:"
              name="site"
              options={['All', 'Present', 'Absent']}
              onChange={handlefilter}
            />
          </Box>
        </SelectBoxHead>
        <SummaryMainBox>
          <SummaryBox>
            <Typography variant="h3" sx={{ color: '#66696b' }}>
              Total Working Days
            </Typography>
            <Typography variant="h2" sx={{ color: '#000' }}>
              {totalWorkingDays}
            </Typography>
          </SummaryBox>
          <SummaryBox>
            <Typography variant="h3" sx={{ color: '#66696b' }}>
              Present
            </Typography>
            <Typography color="#4CAF50" variant="h2">
              {present}
            </Typography>
          </SummaryBox>
          <SummaryBox>
            <Typography variant="h3" sx={{ color: '#66696b' }}>
              Absent
            </Typography>
            <Typography color="#F44336" variant="h2">
              {absent}
            </Typography>
          </SummaryBox>
        </SummaryMainBox>

        <DataGridTableMainBox>
          <DataGridTable
            rows={filteredRows}
            columns={columns}
            disableColumnMenu
            disableSelectionOnClick
            disableColumnSorting
            disableColumnResize
            hideFooter
            columnHeaderHeight={30}
            rowHeight={30}
            getRowClassName={(params) =>
              params.row.punchIn === 'Absent' ||
              params.row.punchOut === 'Absent'
                ? 'absent-row'
                : ''
            }
            sx={{
              boxShadow: 'none',
              border: '1px solid #e0e0e0',
              borderRadius: 2,
              fontSize: '12px',
              '& .MuiDataGrid-cell': {
                color: '#7d8082',
              },
              '& .absent-row .MuiDataGrid-cell': {
                color: '#F44336',
              },
            }}
          />
        </DataGridTableMainBox>
      </Box>
    </>
  );
}
