// import { useNavigate } from 'react-router-dom'
// import { GridColDef, GridRenderCellParams, GridTreeNodeWithRender } from '@mui/x-data-grid'

// import DataTable from '../../../../../components/Data-table/data-table'

import React from "react";
import {
  BoxHeader,
  BoxSubText,
  BoxText,
  MainContainer,
  PendingHeading,
} from "./pendingAreas.style";

const PendingAreas = () => {
  const rows = [
    {
      id: 1,
      pendingSince: "1 day",
      trainingStart: "14/08/23, 09:00",
      trainingEnd: "15/08/23, 17:00",
      attendees: 40,
      attendeeType: "Operator",
      action: "Allocate to Areas",
    },
    {
      id: 2,
      pendingSince: "3 days",
      trainingStart: "14/08/23, 09:00",
      trainingEnd: "15/08/23, 17:00",
      attendees: 40,
      attendeeType: "Operator",
      action: "Submit Allocation",
    },
  ];
  // const navigate = useNavigate()

  // const columns = [
  //   { field: 'pendingSince', headerName: 'Pending Since', type: 'string', flex: 1 },
  //   { field: 'trainingStart', headerName: 'Training Start Date & Time', type: 'string', flex: 2 },
  //   { field: 'trainingEnd', headerName: 'Training End Date & Time', type: 'string', flex: 2 },
  //   { field: 'attendees', headerName: 'No. of Attendees', type: 'string', flex: 1 },
  //   { field: 'attendeeType', headerName: 'Attendee Type', type: 'string', flex: 1 },
  //   {
  //     field: 'action',
  //     headerName: 'Action',
  //     type: 'string',
  //     flex: 1,
  //     renderCell: (params: GridRenderCellParams<GridTreeNodeWithRender>) => {
  //       if (params.value !== undefined && typeof params.value === 'string') {
  //         return (
  //           <button
  //             style={{
  //               color: '#171C8F',
  //               textDecoration: 'none',
  //               backgroundColor: 'transparent',
  //               border: 'none',
  //               padding: 0,
  //               cursor: 'pointer',
  //             }}
  //             onClick={() => {
  //               navigate('/attendees-areas')
  //             }}
  //           >
  //             {params.value}
  //           </button>
  //         )
  //       } else {
  //         return null
  //       }
  //     },
  //   },
  // ]
  return (
    <>
      <BoxHeader>
        <BoxText>Basic Requirement</BoxText>
        <BoxSubText> &gt; Batches Pending for Allocation to Areas</BoxSubText>
      </BoxHeader>
      <PendingHeading>Batches Pending for Allocation to Areas</PendingHeading>
      <MainContainer>
        {/* <DataTable rows={rows} columns={columns} /> */}
      </MainContainer>
    </>
  );
};

export default PendingAreas;
