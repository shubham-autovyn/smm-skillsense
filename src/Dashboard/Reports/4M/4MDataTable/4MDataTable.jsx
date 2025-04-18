import React, { useEffect, useState } from 'react';
import sorting from '../../../../assets/icons/SortIcon.svg';
import { default as Image } from '../../../../assets/images/en-1.png';
import imag2 from '../../../../assets/images/en-2.png';

import download from '../../../../assets/svg/download-btn.svg';
import { default as Swap } from '../../../../assets/svg/swap.svg';
import { default as Time } from '../../../../assets/svg/time.svg';

import { Box, Typography } from '@mui/material';
import { DataGridTable } from '../../../../components/Data-table/dataTable.styles';
import { downloadExcelFile } from '../../../../utils/downloadExcel';
import {
  default as formatDateTime,
  default as formatTimeWithAmPm,
} from '../../../../utils/formatTimeWithAmPm';
import {
  TableBoxDetails,
  TableDropFirstDetails,
  TableDropSecondDetail,
  TableIdLevel,
  TableImg,
  TableNames,
} from './4MDataTable.styles';

// const rows = [
//   {
//     id: 1,
//     date: "31/03/2023",
//     shift: "A",
//     stationMachine: {
//       stationMachines: "A",
//       stationMachineCode: "7RA",
//       stationMachineName: "Break Pipe Fitment",
//     },
//     deploymentChange: {
//       from: {
//         name: "Siddharth Patel",
//         details: "728292 | A0 | L3",
//         time: "3:08 PM",
//       },
//       to: {
//         name: "Harish Pandey",
//         details: "728292 | A0 | L3",
//         time: "3:08 PM",
//       },
//     },
//     checkpoint: "Vacuum pipe sub-assembly",
//     validTill: "31/03/2023",
//   },
//   {
//     id: 2,
//     date: "03/04/2023",
//     shift: "A",
//     stationMachine: {
//       stationMachines: "A",
//       stationMachineCode: "7RA",
//       stationMachineName: "Break Pipe Fitment",
//     },
//     deploymentChange: {
//       from: {
//         name: "Rajiv Varma",
//         details: "728292 | A0 | L3",
//         time: "3:08 PM",
//       },
//       to: {
//         name: "Suresh Makhotra",
//         details: "728292 | A0 | L3",
//         time: "3:08 PM",
//       },
//     },
//     checkpoint: "Vacuum pipe S/A",
//     validTill: "03/04/2023",
//   },
//   {
//     id: 3,
//     date: "03/04/2023",
//     shift: "A",
//     stationMachine: {
//       stationMachines: "",
//       stationMachineCode: "7RA",
//       stationMachineName: "Break Pipe Fitment",
//     },
//     deploymentChange: {
//       from: {
//         name: "Rohit Singh",
//         details: "728292 | A0 | L3",
//         time: "3:08 PM",
//       },
//       to: {
//         name: "Mahesh Tiwari",
//         details: "728292 | A0 | L3",
//         time: "3:08 PM",
//       },
//     },
//     checkpoint: "LH Set Clamp Fitment",
//     validTill: "03/04/2023",
//   },
//   {
//     id: 4,
//     date: "04/04/2023",
//     shift: "A",
//     stationMachine: {
//       stationMachines: "",
//       stationMachineCode: "",
//       stationMachineName: "",
//     },
//     deploymentChange: "No Change",
//     checkpoint: "--",
//     validTill: "04/04/2023",
//   },
//   {
//     id: 5,
//     date: "05/04/2023",
//     shift: "A",
//     stationMachine: {
//       stationMachines: "",
//       stationMachineCode: "",
//       stationMachineName: "",
//     },
//     deploymentChange: "No Change",
//     checkpoint: "--",
//     validTill: "05/04/2023",
//   },
//   {
//     id: 6,
//     date: "05/04/2023",
//     shift: "A",
//     stationMachine: {
//       stationMachines: "",
//       stationMachineCode: "",
//       stationMachineName: "",
//     },
//     deploymentChange: "No Change",
//     checkpoint: "--",
//     validTill: "05/04/2023",
//   },
//   {
//     id: 7,
//     date: "05/04/2023",
//     shift: "A",
//     stationMachine: {
//       stationMachines: "",
//       stationMachineCode: "",
//       stationMachineName: "",
//     },
//     deploymentChange: "No Change",
//     checkpoint: "--",
//     validTill: "05/04/2023",
//   },
//   {
//     id: 8,
//     date: "05/04/2023",
//     shift: "A",
//     stationMachine: {
//       stationMachines: "",
//       stationMachineCode: "",
//       stationMachineName: "",
//     },
//     deploymentChange: "No Change",
//     checkpoint: "--",
//     validTill: "05/04/2023",
//   },
//   {
//     id: 9,
//     date: "05/04/2023",
//     shift: "A",
//     stationMachine: {
//       stationMachines: "",
//       stationMachineCode: "",
//       stationMachineName: "",
//     },
//     deploymentChange: "No Change",
//     checkpoint: "--",
//     validTill: "05/04/2023",
//   },
// ];

const FourMDataTable = ({ data4M, filterSelected }) => {
  const [dataFourM, setDataFourM] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isAscending, setIsAscending] = useState(true);

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
          <Typography
            sx={{ fontSize: '12px', fontSize: '12px', fontWeight: 'bold' }}
          >
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
      renderCell: (params) => {
        // Format the date using the formatDateTime function
        const formattedDate = formatDateTime(params.value, 'date');
        return <span>{formattedDate}</span>;
      },
    },
    {
      field: 'shift',
      headerName: 'Shift',
      flex: 0.5,
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
      field: 'stationMachine',
      headerName: 'Station/Machine',
      flex: 2,
      renderCell: (params) => {
        const { maru_a_ar, stationdescription, stationname } =
          params.row.stationMachine || {}; // Accessing nested properties safely

        if (!maru_a_ar && !stationdescription && !stationname) {
          return null;
        }

        return (
          <div>
            <div>
              {maru_a_ar && (
                <span
                  style={{
                    border: '1px solid black',
                    borderRadius: '100%',
                    width: '40px',
                    height: '15px',
                    textAlign: 'center',
                    padding: '0px 7px',
                    marginRight: '10px',
                  }}
                >
                  {maru_a_ar}
                </span>
              )}
              {stationname && <span> {stationname} |</span>}{' '}
              {stationdescription && <span>{stationdescription}</span>}
            </div>
          </div>
        );
      },
    },
    {
      field: 'deploymentChange',
      headerName: 'Change in Deployment',
      flex: 3,
      renderCell: (params) => {
        if (params.value === 'No Change') return <span>No Change</span>;
        const { from, to } = params.value || {};
        return (
          <div
            style={{
              display: 'flex',
              gap: '5px',
              alignItems: 'center',
            }}
          >
            <span style={{ flex: '1 1 auto', maxWidth: '200px' }}>
              <div>
                <TableDropFirstDetails>
                  <TableImg src={Image} alt="icon" />
                  <TableBoxDetails>
                    <TableNames variant="h4">
                      {from?.oldempname || 'N/A'}
                    </TableNames>
                    <Box display="flex" gap="5px">
                      <TableIdLevel variant="h4">
                        {from?.oldemployeestaffid || 'N/A'} |
                      </TableIdLevel>
                      <TableIdLevel variant="h4">
                        {from?.oldempdesignation || 'N/A'} |
                      </TableIdLevel>
                      <TableIdLevel variant="h4">
                        {from?.oldemplevel || 'N/A'}
                      </TableIdLevel>
                    </Box>
                    <TableIdLevel variant="h4">
                      <img src={Time} alt="" />{' '}
                      {from?.oldchangetime
                        ? formatTimeWithAmPm(from.oldchangetime)
                        : 'N/A'}
                    </TableIdLevel>
                  </TableBoxDetails>
                </TableDropFirstDetails>
              </div>
            </span>
            <span>
              <img src={Swap} alt="Swap" />
            </span>
            <span style={{ flex: '1 1 auto', maxWidth: '200px' }}>
              <div>
                <TableDropSecondDetail>
                  <TableImg src={imag2} alt="icon" />
                  <TableBoxDetails>
                    <TableNames variant="h4">
                      {to?.newempname || 'N/A'}
                    </TableNames>
                    <Box sx={{ display: 'flex', gap: '5px' }}>
                      <TableIdLevel variant="h4">
                        {to?.newemployeestaffid || 'N/A'} |
                      </TableIdLevel>
                      <TableIdLevel variant="h4">
                        {to?.newempdesignation || 'N/A'} |
                      </TableIdLevel>
                      <TableIdLevel variant="h4">
                        {to?.newemplevel || 'N/A'}
                      </TableIdLevel>
                    </Box>
                    <TableIdLevel variant="h4">
                      <img src={Time} alt="" />{' '}
                      {to?.newchangtime
                        ? formatTimeWithAmPm(to.newchangtime)
                        : 'N/A'}
                    </TableIdLevel>
                  </TableBoxDetails>
                </TableDropSecondDetail>
              </div>
            </span>
          </div>
        );
      },
    },
    {
      field: 'specialcheckpointduringinspection',
      headerName: 'Special Checkpoint During Inspection',
      flex: 2,
    },
    {
      field: 'validtill',
      headerName: 'Valid Till',
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
            Valid Till
          </Typography>
          <img
            src={sorting}
            alt="sort icon"
            width={10}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              handleSortClick('validtill');
            }}
          />
        </Box>
      ),
      renderCell: (params) => {
        const formattedDate = params.value
          ? formatDateTime(params.value, 'date')
          : 'N/A';
        return <span>{formattedDate}</span>;
      },
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
    if (data4M?.response) {
      const updatedData = data4M.response.map((item, index) => ({
        ...item,
        id: item.staffid || index,
      }));
      setDataFourM(updatedData);
      setFilteredData(updatedData); // Initialize filtered data with all records
    }
  }, [data4M]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12; // Convert 24-hour to 12-hour format

    return `${day}-${month}-${year}  ${hours}:${minutes} ${period}`;
  };
  const handalDownload = async () => {
    const headerMapping = {
      date: 'Date',
      shift: 'Shift',
      stationMachine: 'Station/Machine',
      deploymentChange: 'Change in Deployment',
      specialcheckpointduringinspection: 'Special Checkpoint During Inspection',
      validtill: 'Valid Till',
    };
    let data = filteredData.length > 0 ? filteredData : dataFourM;
    const modifyData = data.map((item) => {
      return {
        date: formatDate(item.date),
        shift: item.shift,
        stationMachine: `${item.stationMachine.maru_a_ar || 'N/A'}  | ${
          item.stationMachine.stationname || 'N/A'
        } | ${item.stationMachine.stationdescription || 'N/A'}`,
        deploymentChange: `${
          item.deploymentChange.from.oldempname || 'N/A'
        } | ${item.deploymentChange.from.oldemployeestaffid || 'N/A'} | ${
          item.deploymentChange.from.oldemplevel || 'N/A'
        } | ${
          item.deploymentChange.from.oldempdesignation || 'N/A'
        } | ${formatDate(item?.deploymentChange?.from?.oldchangetime)} ⇄ ${
          item.deploymentChange.to.newempname || 'N/A'
        } | ${item.deploymentChange.to.newemployeestaffid || 'N/A'} | ${
          item.deploymentChange.to.newemplevel || 'N/A'
        } | ${
          item.deploymentChange.to.newempdesignation || 'N/A'
        } | ${formatDate(item?.deploymentChange?.to?.newchangtime)}`,
        specialcheckpointduringinspection:
          item.specialcheckpointduringinspection,
        validtill: item.validtill || 'N/A',
      };
    });
    downloadExcelFile(modifyData, headerMapping, 'exal.xlsx');
  };
  return (
    <div style={{ height: 600, width: '100%' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '14px',
          fontWeight: 'bold',
          padding: '10px 10px',
          backgroundColor: '#ffffff',
          borderRadius: '10px 10px 0 0',
        }}
      >
        <div>
          {[
            filterSelected?.location?.label,
            filterSelected?.plant?.label,
            filterSelected?.shop?.label,
            filterSelected?.line?.label
              ? `Line ${filterSelected.line.label}`
              : null,
            filterSelected?.area?.label,
            filterSelected?.group?.label
              ? `Group ${filterSelected.group.label}`
              : null,
            filterSelected?.shift?.label
              ? `Shift ${filterSelected.shift.label}`
              : null,
          ]
            .filter(Boolean)
            .join(' > ')}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          {/* <span>01 Oct 2023 - 30 Oct 2023, 3:15 PM-12 AM</span>{' '} */}
          <span>
            <button onClick={handalDownload} style={{ cursor: 'pointer' }}>
              {' '}
              <img src={download} alt="" />
            </button>
          </span>
        </div>
      </div>
      <DataGridTable
        disableColumnMenu
        disableAutosize
        disableColumnSorting
        rows={filteredData.length > 0 ? filteredData : dataFourM}
        columns={columns}
        rowHeight={70}
        disableSelectionOnClick
        hideFooter
        sx={{
          '& .MuiDataGrid-columnHeaders': {
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

      <div
        style={{
          display: 'flex',
          gap: '20px',
          padding: '10px 0px',
          fontSize: '12px',
        }}
      >
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <p style={{ fontWeight: 'bold' }}>Legend: </p>
          <p>
            <span
              style={{
                borderRadius: '100%',
                width: '10px',
                height: '10px',
                backgroundColor: '#58a55c',
                display: 'inline-block',
              }}
            ></span>{' '}
            <span>Present</span>
          </p>

          <p>
            <span
              style={{
                borderRadius: '100%',
                width: '10px',
                height: '10px',
                backgroundColor: '#d83b01',
                display: 'inline-block',
              }}
            ></span>{' '}
            <span>Absent</span>
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <p style={{ fontWeight: 'bold' }}>Change in Deployment: </p>
          <p>Deployed at Station</p>
          <p>
            <img src={Swap} alt="" />
          </p>
          <p>Removed from Station</p>
        </div>
      </div>
    </div>
  );
};
export default FourMDataTable;
