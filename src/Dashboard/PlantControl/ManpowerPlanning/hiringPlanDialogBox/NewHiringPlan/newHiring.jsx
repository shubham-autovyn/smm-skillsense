import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  Backdrop,
  Box,
  CircularProgress,
  IconButton,
  Typography,
} from '@mui/material';
import { GridCellModes } from '@mui/x-data-grid';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../../../../components/Button/SecondaryButtonWithIcon';
import { DataGridTable } from '../../../../../components/Data-table/dataTable.styles';
import CustomDatePicker from '../../../../../components/DatePicker/DatePicker';
import * as shopReducer from '../../../../../redux/Reducers/SMMShopReducer';
import { variables } from '../../../../../styles/theme';
import useGetStaffId from '../../../../Quality Incharge/hooks/getStaffId';
import useExportNewHiring from '../../../hooks/getExportNewHiring';
import useSubmitExportNewHiring from '../../../hooks/submitExportNewHiring';
import './newHiring.css';
import {
  MonthBtn,
  SecondHiringBox,
  TableBox,
  TopHiringBox,
} from './newHiring.styles';

const NewHiringPlan = ({ onClose }) => {
  const navigate = useNavigate();
  const plant = useSelector(shopReducer.getPlant);
  const [minDate, setMinDate] = useState(null);
  const [maxDate, setMaxDate] = useState(null);
  const [minToDate, setMinToDate] = useState(null);
  const [maxToDate, setMaxToDate] = useState(null);
  const [selectedFromDate, setSelectedFromDate] = useState(null);
  const [selectedToDate, setSelectedToDate] = useState(null);
  const [activeRange, setActiveRange] = useState(null);
  const { dataExportNew, fetchExportData, loading } = useExportNewHiring();
  const {
    dataSubmitExport,
    fetchSubmitExport,
    loading: submitLoading,
  } = useSubmitExportNewHiring();
  const [rows, setRows] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const monthData = ['1M', '3M', '7M', '1Y'];
  const monthSelect = monthData.filter((value) => value === activeRange);
  const dayjs = require('dayjs');
  const staffId = localStorage.getItem('staffId');
  const { dataStaffID, fetchStaffID, loading: stafIdLoading } = useGetStaffId();
  const [cellModesModel, setCellModesModel] = useState({});

  useEffect(() => {
    if (dataExportNew?.response) {
      setRows(
        dataExportNew.response.map((row) => {
          const [day, month, year] = row.tentativeJoiningDate
            .split('-')
            .map(Number);
          const joiningDate = new Date(year, month - 1, day);

          const currentDate = new Date();

          const differenceInMilliseconds =
            joiningDate.getTime() - currentDate.getTime();

          const differenceInDays = Math.ceil(
            differenceInMilliseconds / (1000 * 60 * 60 * 24)
          );

          return {
            ...row,
            joiningDate: {
              joiningDate: row.tentativeJoiningDate,
              days: `${differenceInDays} Days`,
            },
            noOfJoinees: '',
            category: '',
          };
        })
      );
    }
  }, [dataExportNew]);

  useEffect(() => {
    handleRangeClick('1M');
    const staffId = 545228;
    fetchStaffID(staffId);
  }, []);

  const handleRangeClick = (range) => {
    setSelectedFromDate(null);
    setSelectedToDate(null);
    setActiveRange(range);
    const now = new Date();
    let startDate;
    let maxDate;
    switch (range) {
      case '1M':
        startDate = new Date(now);
        maxDate = new Date(now);
        maxDate.setMonth(now.getMonth() + 1);
        maxDate.setDate(maxDate.getDate() + 1);
        break;

      case '3M':
        startDate = now;
        maxDate = new Date(now);
        maxDate.setMonth(maxDate.getMonth() + 3);
        maxDate.setDate(maxDate.getDate() + 1);

        break;
      case '7M':
        startDate = now;
        maxDate = new Date(now);
        maxDate.setMonth(maxDate.getMonth() + 7);
        maxDate.setDate(maxDate.getDate() + 1);

        break;
      case '1Y':
        startDate = now;
        maxDate = new Date(now);
        maxDate.setFullYear(maxDate.getFullYear() + 1);
        maxDate.setDate(maxDate.getDate() + 1);
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

  const fetchExportHiringData = async () => {
    if (selectedFromDate && selectedToDate) {
      try {
        const payload = {
          startDate: dayjs(selectedFromDate).format('DD-MM-YYYY'),
          endDate: dayjs(selectedToDate).format('DD-MM-YYYY'),
          plantId: plant.id,
        };
        await fetchExportData(payload);
      } catch (error) {
        console.log(error);
      }
    } else {
    }
  };

  const handleApplyClick = () => {
    fetchExportHiringData();
  };
  const totalCummulativeGap = rows.reduce(
    (sum, row) => sum + row.cummulativeGap,
    0
  );

  const totalNoOfJoinees = rows.reduce((sum, row) => sum + row.noOfJoinees, 0);

  const handleDeleteRow = (id) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  const columns = [
    {
      field: 'joiningDate',
      flex: 1,
      headerName: 'Recommended Joining Date',
      resizable: false,
      align: 'left',
      height: '12px',
      sortable: false,
      headerAlign: 'center',
      cellClassName: 'black-cell head',
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => {
        const isLessThanEight = parseInt(params.value.days, 10) >= 26;
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {params.value.joiningDate}
            <button
              style={{
                marginRight: 10,
                fontSize: '11px',
                padding: '3px',
                marginLeft: '20px',
                border: isLessThanEight ? '1px solid green' : '1px solid  red',
                color: isLessThanEight ? 'green' : 'red',
                borderRadius: '5px',
                backgroundColor: 'white',
              }}
            >
              {params.value.days}{' '}
            </button>
          </div>
        );
      },
    },
    {
      field: 'cummulativeGap',
      headerName: 'Cumulative Gap',
      resizable: false,
      flex: 1,
      align: 'left',
      headerAlign: 'center',
      sortable: false,
      headerClassName: 'super-app-theme--header',

      renderCell: (params) => (
        <div>
          <span style={{ color: params.value ? 'red' : undefined }}>
            {Math.abs(params.value)}
          </span>
        </div>
      ),
    },
    {
      field: 'noOfJoinees',
      headerName: `No. of Joinees ${totalNoOfJoinees} / ${Math.abs(
        totalCummulativeGap
      )}`,
      flex: 1,
      // renderCell: (params) => (
      //   <div style={{ width: "50%" }}>{params.value}</div> // Custom width handling
      // ),
      resizable: false,
      sortable: false,
      editable: true,
      align: 'left',
      headerAlign: 'center',
      type: 'number',
      fontSizes: '20px',
      headerClassName: 'super-app-theme--header',
      cellClassName: 'black-cell joiners-cell editable-cell',
      renderEditCell: (params) => (
        <input
          type="text"
          value={params.value || ''}
          autoFocus // Auto-focus the input when clicked
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*$/.test(value)) {
              // Only allow numbers
              params.api.setEditCellValue({
                id: params.id,
                field: params.field,
                value,
              });
            }
          }}
          style={{
            width: '100%',
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontSize: '14px',
          }}
        />
      ),
    },
    {
      field: 'category',
      headerName: 'Category',
      flex: 1,
      sortable: false,
      resizable: false,
      align: 'left',
      headerAlign: 'center',
      headerClassName: 'super-app-theme--header',
      editable: true,
      cellClassName: 'black-cell editable-cell',
    },
    {
      field: 'type',
      headerName: 'Delete',
      sortable: false,
      flex: 1,
      resizable: false,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <IconButton
          aria-label="delete"
          onClick={() => handleDeleteRow(params.row.id)} // Pass the row ID to delete
        >
          <DeleteIcon style={{ width: '20px', height: '20px' }} />
        </IconButton>
      ),
    },
  ];
  const handleProcessRowUpdate = (newRow) => {
    const isValidNumber = /^\d*$/.test(newRow.noOfJoinees);
    if (!isValidNumber) {
      return { ...newRow, noOfJoinees: '' };
    }
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === newRow.id
          ? {
              ...row,
              noOfJoinees: newRow.noOfJoinees || row.noOfJoinees,
              ...newRow,
            }
          : row
      )
    );
    return newRow;
  };

  const resetData = () => {
    setRows((prevRows) =>
      prevRows.map((row) => ({
        ...row,
        noOfJoinees: '',
        category: '',
      }))
    );
  };

  const exportData = async () => {
    try {
      const payload = {
        staffId: staffId || '',
        exportedBy: dataStaffID.response.name,
        startDate: moment(selectedFromDate).format('DD-MM-YYYY'),
        endDate: moment(selectedToDate).format('DD-MM-YYYY'),
        records: rows,
      };
      const submitResponse = await fetchSubmitExport(payload, plant.id);
      if (submitResponse?.response?.url) {
        window.open(submitResponse?.response?.url, '_blank');
        setDialogOpen(false);
      }
    } catch (error) {}
  };
  const handleCellClick = React.useCallback((params, event) => {
    if (!params.isEditable) {
      return;
    }

    // Ignore portal
    if (
      event.target.nodeType === 1 &&
      !event.currentTarget.contains(event.target)
    ) {
      return;
    }

    setCellModesModel((prevModel) => {
      return {
        // Revert the mode of the other cells from other rows
        ...Object.keys(prevModel).reduce(
          (acc, id) => ({
            ...acc,
            [id]: Object.keys(prevModel[id]).reduce(
              (acc2, field) => ({
                ...acc2,
                [field]: { mode: GridCellModes.View },
              }),
              {}
            ),
          }),
          {}
        ),
        [params.id]: {
          // Revert the mode of other cells in the same row
          ...Object.keys(prevModel[params.id] || {}).reduce(
            (acc, field) => ({ ...acc, [field]: { mode: GridCellModes.View } }),
            {}
          ),
          [params.field]: { mode: GridCellModes.Edit },
        },
      };
    });
  }, []);

  const handleCellModesModelChange = React.useCallback((newModel) => {
    setCellModesModel(newModel);
  }, []);
  return (
    <>
      <TopHiringBox>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Typography variant="h4">Planning Horizon:</Typography>

          {monthData.map((range) => (
            <MonthBtn
              key={range}
              style={{
                backgroundColor: monthSelect.includes(range)
                  ? '#cfd2d9'
                  : 'initial',
              }}
              onClick={() => handleRangeClick(range)}
            >
              {range}
            </MonthBtn>
          ))}
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: '4px',
            padding: '0 8px',
            // borderRight: "1px solid #7D8087",
            borderLeft: '1px solid #7D8087',
          }}
        >
          <CustomDatePicker
            type="month"
            label={'From'}
            value={selectedFromDate}
            minDate={minDate}
            maxDate={maxDate}
            handleChange={(newDate) => setSelectedFromDate(newDate)}
            disabled={!['1M', '3M', '7M', '1Y'].includes(activeRange)}
          ></CustomDatePicker>
          <CustomDatePicker
            type="month"
            label={'To'}
            value={selectedToDate}
            minDate={minToDate}
            maxDate={maxToDate}
            handleChange={(newDate) => setSelectedToDate(newDate)}
          ></CustomDatePicker>
        </Box>
        <Box>
          <CustomButton
            bordercolor={variables.primaryColor}
            bgColor="none"
            textColor={variables.primaryColor}
            onClick={handleApplyClick}
          >
            Apply
          </CustomButton>
        </Box>
      </TopHiringBox>
      <SecondHiringBox>
        <Typography variant="h5" style={{ margin: '0px', fontWeight: '500' }}>
          Veh-G total gap for selected duration:
        </Typography>

        <Typography variant="h2" style={{ margin: '0px' }}>
          {Math.abs(totalCummulativeGap)}
        </Typography>
      </SecondHiringBox>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '10px 0px 10px',
          marginRight: '10px',
        }}
      >
        <Typography
          variant="h3"
          style={{ margin: '0px', color: '#343536', fontWeight: '600' }}
        >
          Recommended Hiring Plan
        </Typography>
        <CustomButton
          // bordercolor="none"
          textColor={variables.primaryColor}
          onClick={resetData}
          sx={{
            border: 'none !important',
            borderColor: 'none',
            '&:hover': { backgroundColor: '#fff' },
          }}
        >
          Reset
        </CustomButton>
      </Box>
      <TableBox
        sx={{
          display: 'flex',
          height: '40vh',
          justifyContent: 'left',
        }}
      >
        <DataGridTable
          columns={columns}
          rows={rows}
          paginationMode={'server'}
          pagination={false}
          rowCount={undefined}
          onPageChange={undefined}
          rowHeight={'21px'}
          onPageSizeChange={undefined}
          disableColumnMenu
          processRowUpdate={handleProcessRowUpdate}
          editMode="row"
          cellModesModel={cellModesModel}
          onCellModesModelChange={handleCellModesModelChange}
          onCellClick={handleCellClick}
        />
      </TableBox>
      {/* <Box sx={{ marginTop: "20px" }}>
        <CustomButton
          bordercolor={variables.primaryColor}
          bgColor="none"
          textColor={variables.primaryColor}
        >
          + Add Row
        </CustomButton>
      </Box> */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '20px',
          alignItems: 'center',
          gap: '20px',
          marginRight: '10px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <button
            style={{
              border: '1px solid black',
              borderRadius: '5px',
              backgroundColor: 'transparent',
              fontSize: '10px',
              padding: '3px 5px',
            }}
          >
            N days
          </button>
          <Typography style={{ margin: '0px 15px', display: 'inline-block' }}>
            Days remaining till recommended joining date
            <br /> (excluding 27 overlapping working days)
          </Typography>
        </Box>
        <Box>
          <CustomButton
            bordercolor={variables.primaryColor}
            bgColor="none"
            textColor={variables.primaryColor}
            onClick={onClose}
          >
            Cancel
          </CustomButton>
          <CustomButton
            style={{
              marginLeft: '10px',
              backgroundColor: '#171c8f',
              color: '#fff',
            }}
            onClick={exportData}
          >
            Export
          </CustomButton>
        </Box>
      </Box>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={loading || submitLoading || stafIdLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default NewHiringPlan;
