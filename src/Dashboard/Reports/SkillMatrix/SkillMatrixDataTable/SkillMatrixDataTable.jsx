import { Box, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import sorting from '../../../../assets/icons/SortIcon.svg';
import download from '../../../../assets/svg/download-btn.svg';
import { DataGridTable } from '../../../../components/Data-table/dataTable.styles';
import formatDateTime from '../../../../utils/formatTimeWithAmPm';

import {} from './SkillMatrixDataTable.css';

// const tableData = [
//   {
//     id: 1,
//     revision: "1",
//     skillMatrix: "SkillMatrix-12052023_142735",
//     updatedBy: "Vikram Sharma",
//     updatedOn: "12-05-2023, 14:27:35",
//   },
//   {
//     id: 2,
//     revision: "2",
//     skillMatrix: "SkillMatrix-10052023_174523",
//     updatedBy: "Vikram Sharma",
//     updatedOn: "10-05-2023, 17:45:23",
//   },
//   {
//     id: 3,
//     revision: "3",
//     skillMatrix: "SkillMatrix-10052023_174523",
//     updatedBy: "Vikram Sharma",
//     updatedOn: "09-04-2023, 11:01:02",
//   },
//   {
//     id: 4,
//     revision: "4",
//     skillMatrix: "SkillMatrix-12052023_142735",
//     updatedBy: "Vikram Sharma",
//     updatedOn: "21-03-2023, 18:09:45",
//   },
//   {
//     id: 5,
//     revision: "5",
//     skillMatrix: "SkillMatrix-12052023_142735",
//     updatedBy: "Vikram Sharma",
//     updatedOn: "21-03-2023, 18:09:45",
//   },
//   {
//     id: 6,
//     revision: "6",
//     skillMatrix: "SkillMatrix-12052023_142735",
//     updatedBy: "Vikram Sharma",
//     updatedOn: "21-03-2023, 18:09:45",
//   },
//   {
//     id: 7,
//     revision: "7",
//     skillMatrix: "SkillMatrix-12052023_142735",
//     updatedBy: "Vikram Sharma",
//     updatedOn: "21-03-2023, 18:09:45",
//   },
//   {
//     id: 8,
//     revision: "8",
//     skillMatrix: "SkillMatrix-12052023_142735",
//     updatedBy: "Vikram Sharma",
//     updatedOn: "21-03-2023, 18:09:45",
//   },
// ];

const SkillMatrixDataTable = ({ dataSkillMatrix, filterSelected }) => {
  const [skillMatrixData, setSkillMatrixData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isAscending, setIsAscending] = useState(true);

  const columns = [
    {
      field: 'revisionno',
      headerName: 'Revision Nos. in Oct 2023',
      flex: 1,
      sortable: true,
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
            Revision Nos. in Oct 2023
          </Typography>
          <img
            src={sorting}
            alt="sort icon"
            width={10}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              handleSortClick('revisionno');
            }}
          />
        </Box>
      ),
    },
    {
      field: 'skillmatrixandtranningplan',
      headerName: 'Skill Matrix & Training Plan',
      flex: 2,
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
            Skill Matrix & Training Plan
          </Typography>
          <img
            src={sorting}
            alt="sort icon"
            width={10}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              handleSortClick('skillmatrixandtranningplan');
            }}
          />
        </Box>
      ),
    },
    {
      field: 'updateby',
      headerName: 'Updated by',
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
            Updated by
          </Typography>
          <img
            src={sorting}
            alt="sort icon"
            width={10}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              handleSortClick('updateby');
            }}
          />
        </Box>
      ),
    },
    {
      field: 'uploadon',
      headerName: 'Updated on',
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
            Updated on
          </Typography>
          <img
            src={sorting}
            alt="sort icon"
            width={10}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              handleSortClick('uploadon');
            }}
          />
        </Box>
      ),
      renderCell: (params) => {
        const formattedDate = formatDateTime(params.value, 'date');
        return <span>{formattedDate}</span>;
      },
    },
    {
      field: 'download',
      headerName: 'Download',
      flex: 0.5,
      renderCell: () => (
        <IconButton>
          <img
            src={download}
            alt="Download"
            style={{ width: '20px', height: '20px' }}
          />
        </IconButton>
      ),
      sortable: false,
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
    if (dataSkillMatrix?.response) {
      const updatedData = dataSkillMatrix.response.map((item, index) => ({
        ...item,
        id: item.staffid || index,
      }));
      setSkillMatrixData(updatedData);
      setFilteredData(updatedData);
    }
  }, [dataSkillMatrix]);

  return (
    <>
      <div
        className="SkillMatrixDataTable"
        style={{ height: 400, width: '100%' }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '14px',
            padding: '10px 0px',
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
          {/* <div>Oct 2023, 3:15 PM-12 AM</div> */}
        </div>
        <DataGridTable
          rows={filteredData.length > 0 ? filteredData : skillMatrixData}
          columns={columns}
          disableAutosize
          disableColumnMenu
          disableColumnSorting
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
    </>
  );
};

export default SkillMatrixDataTable;
