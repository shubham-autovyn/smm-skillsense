import React, { useEffect } from 'react';
import sorting from '../../../../assets/icons/SortIcon.svg';
import download from '../../../../assets/svg/download-btn.svg';
import imgSrc from '../../../../assets/svg/Mask group (1).svg';
import { default as Swap } from '../../../../assets/svg/swap.svg';
import Time from '../../../../assets/svg/time.svg';

import {
  TableBoxDetails,
  TableDropFirstDetails,
  TableDropSecondDetail,
  TableIdLevel,
  TableImg,
  TableNames,
  TagTrainee,
} from './StationWiseDataTable.styles';

import { Box, Tooltip } from '@mui/material';
import { useState } from 'react';
import formatDateTime from '../../../../utils/formatTimeWithAmPm';
import {} from './StationWiseDataTable.css';

// const data = [
//   {
//     stations: "A",
//     stationCode: "7RA",
//     stationName: "Break Pipe Fitment",
//     dateData: [
//       {
//         date: "01/10/2023",
//         name: "Sidharth Saini",
//         details: "728292 | A0 | L3",
//         time: "3:08 PM",
//       },
//       {
//         date: "01/10/2023",
//         name: "Sidharth Saini",
//         details: "728292 | A0 | L3",
//         time: "3:08 PM",
//         type: "trainee",
//       },
//       {
//         date: "02/10/2023",
//         name: "Sidharth Saini",
//         details: "728292 | A0 | L3",
//         time: "3:08 PM",
//       },
//       {
//         date: "02/10/2023",
//         name: "Sidharth Saini",
//         details: "728292 | A0 | L3",
//         time: "3:08 PM",
//         type: "trainee",
//       },
//       {
//         date: "03/10/2023",
//         name: "Sidharth Saini",
//         details: "728292 | A0 | L3",
//         time: "3:08 PM",
//       },
//       {
//         date: "03/10/2023",
//         name: "Sidharth Saini",
//         details: "728292 | A0 | L3",
//         time: "3:08 PM",
//         type: "trainee",
//       },
//       {
//         date: "04/10/2023",
//         name: "Sidharth Saini",
//         details: "728292 | A0 | L3",
//         time: "3:08 PM",
//       },
//       {
//         date: "04/10/2023",
//         name: "Sidharth Saini",
//         details: "728292 | A0 | L3",
//         time: "3:08 PM",
//         type: "trainee",
//       },
//       {
//         date: "05/10/2023",
//         name: "Sidharth Saini",
//         details: "728292 | A0 | L3",
//         time: "3:08 PM",
//       },
//       {
//         date: "05/10/2023",
//         name: "Sidharth Saini",
//         details: "728292 | A0 | L3",
//         time: "3:08 PM",
//         type: "trainee",
//       },
//     ],
//   },
//   {
//     stations: "AR",
//     stationCode: "7RB",
//     stationName: "TMC Fitment",
//     dateData: [
//       {
//         date: "01/10/2023",
//         name: "Sidharth Patel",
//         details: "728292 | A0 | L3",
//         time: "3:08 PM",
//         swap: "true",
//       },
//       {
//         date: "02/10/2023",
//         name: "Sidharth Patel",
//         details: "728292 | A0 | L3",
//         time: "3:08 PM",
//       },
//       {
//         date: "03/10/2023",
//         name: "Sidharth Patel",
//         details: "728292 | A0 | L3",
//         time: "3:08 PM",
//       },
//       {
//         date: "04/10/2023",
//         name: "Sidharth Patel",
//         details: "728292 | A0 | L3",
//         time: "3:08 PM",
//       },
//       {
//         date: "05/10/2023",
//         name: "Sidharth Patel",
//         details: "728292 | A0 | L3",
//         time: "3:08 PM",
//       },
//     ],
//   },
//   {
//     stations: "A",
//     stationCode: "7L",
//     stationName: "Vacum Pipe Fitment",
//     dateData: [
//       {
//         date: "01/10/2023",
//         name: "Sidharth Patel",
//         details: "728292 | A0 | L3",
//         time: "3:08 PM",
//         swap: "true",
//       },
//       {
//         date: "02/10/2023",
//         name: "Sidharth Patel",
//         details: "728292 | A0 | L3",
//         time: "3:08 PM",
//       },
//       {
//         date: "03/10/2023",
//         name: "Sidharth Patel",
//         details: "728292 | A0 | L3",
//         time: "3:08 PM",
//       },
//       {
//         date: "04/10/2023",
//         name: "Sidharth Patel",
//         details: "728292 | A0 | L3",
//         time: "3:08 PM",
//       },
//       {
//         date: "05/10/2023",
//         name: "Sidharth Patel",
//         details: "728292 | A0 | L3",
//         time: "3:08 PM",
//       },
//     ],
//   },
//   {
//     stations: "",
//     stationCode: "8RA",
//     stationName: "Sunvisor Fitment",
//     dateData: [
//       {
//         date: "01/10/2023",
//         name: "Sidharth Patel",
//         details: "728292 | A0 | L3",
//         time: "3:08 PM",
//       },
//       {
//         date: "02/10/2023",
//         name: "Sidharth Patel",
//         details: "728292 | A0 | L3",
//         time: "3:08 PM",
//       },
//       {
//         date: "03/10/2023",
//         name: "Sidharth Patel",
//         details: "728292 | A0 | L3",
//         time: "3:08 PM",
//       },
//       {
//         date: "04/10/2023",
//         name: "Sidharth Patel",
//         details: "728292 | A0 | L3",
//         time: "3:08 PM",
//       },
//       {
//         date: "05/10/2023",
//         name: "Sidharth Patel",
//         details: "728292 | A0 | L3",
//         time: "3:08 PM",
//       },
//     ],
//   },
//   {
//     stations: "A",
//     stationCode: "8RB",
//     stationName: "Eeco Flair NutTorque",
//     dateData: [
//       {
//         date: "01/10/2023",
//         name: "Sidharth Patel",
//         details: "728292 | A0 | L3",
//         time: "3:08 PM",
//         swap: "true",
//       },
//       {
//         date: "01/10/2023",
//         name: "Sidharth Patel",
//         details: "728292 | A0 | L3",
//         time: "3:08 PM",
//       },
//       {
//         date: "02/10/2023",
//         name: "Sidharth Patel",
//         details: "728292 | A0 | L3",
//         time: "3:08 PM",
//       },
//       {
//         date: "03/10/2023",
//         name: "Sidharth Patel",
//         details: "728292 | A0 | L3",
//         time: "3:08 PM",
//       },
//       {
//         date: "04/10/2023",
//         name: "Sidharth Patel",
//         details: "728292 | A0 | L3",
//         time: "3:08 PM",
//       },
//       {
//         date: "05/10/2023",
//         name: "Sidharth Patel",
//         details: "728292 | A0 | L3",
//         time: "3:08 PM",
//       },
//     ],
//   },
//   {
//     stations: "A",
//     stationCode: "8RB",
//     stationName: "Eeco Flair NutTorque",
//     dateData: [
//       {
//         date: "01/10/2023",
//         name: "Sidharth Patel",
//         details: "728292 | A0 | L3",
//         time: "3:08 PM",
//       },
//       {
//         date: "01/10/2023",
//         name: "Sidharth Patel",
//         details: "728292 | A0 | L3",
//         time: "3:08 PM",
//       },
//       {
//         date: "02/10/2023",
//         name: "Sidharth Patel",
//         details: "728292 | A0 | L3",
//         time: "3:08 PM",
//       },
//       {
//         date: "03/10/2023",
//         name: "Sidharth Patel",
//         details: "728292 | A0 | L3",
//         time: "3:08 PM",
//       },
//       {
//         date: "04/10/2023",
//         name: "Sidharth Patel",
//         details: "728292 | A0 | L3",
//         time: "3:08 PM",
//       },
//       {
//         date: "05/10/2023",
//         name: "Sidharth Patel",
//         details: "728292 | A0 | L3",
//         time: "3:08 PM",
//       },
//     ],
//   },
//   {
//     stations: "A",
//     stationCode: "8RB",
//     stationName: "Eeco Flair NutTorque",
//     dateData: [
//       {
//         date: "01/11/2023",
//         name: "Sidharth Patel",
//         details: "728292 | A0 | L3",
//         time: "3:08 PM",
//       },
//       {
//         date: "01/11/2023",
//         name: "Sidharth Patel",
//         details: "728292 | A0 | L3",
//         time: "3:08 PM",
//       },
//       {
//         date: "02/12/2023",
//         name: "Sidharth Patel",
//         details: "728292 | A0 | L3",
//         time: "3:08 PM",
//       },
//       {
//         date: "03/12/2023",
//         name: "Sidharth Patel",
//         details: "728292 | A0 | L3",
//         time: "3:08 PM",
//       },
//       {
//         date: "04/10/2024",
//         name: "Sidharth Patel",
//         details: "728292 | A0 | L3",
//         time: "3:08 PM",
//       },
//       {
//         date: "05/10/2024",
//         name: "Sidharth Patel",
//         details: "728292 | A0 | L3",
//         time: "3:08 PM",
//       },
//     ],
//   },
//   {
//     stations: "A",
//     stationCode: "8RB",
//     stationName: "Eeco Flair NutTorque",
//     dateData: [
//       {
//         date: "01/10/2023",
//         name: "Sidharth Patel",
//         details: "728292 | A0 | L3",
//         time: "3:08 PM",
//         swap: "true",
//       },
//       {
//         date: "01/10/2023",
//         name: "Sidharth Patel",
//         details: "728292 | A0 | L3",
//         time: "3:08 PM",
//         swap: "true",
//       },
//       {
//         date: "02/10/2023",
//         name: "Sidharth Patel",
//         details: "728292 | A0 | L3",
//         time: "3:08 PM",
//       },
//       {
//         date: "03/10/2023",
//         name: "Sidharth Patel",
//         details: "728292 | A0 | L3",
//         time: "3:08 PM",
//       },
//       {
//         date: "04/10/2023",
//         name: "Sidharth Patel",
//         details: "728292 | A0 | L3",
//         time: "3:08 PM",
//       },
//       {
//         date: "05/10/2023",
//         name: "Sidharth Patel",
//         details: "728292 | A0 | L3",
//         time: "3:08 PM",
//       },
//     ],
//   },
// ];
const StationWiseDataTable = ({ dataStationWise, loading, filterSelected }) => {
  const [tableData, setTableData] = useState([]);
  const [isAscending, setIsAscending] = useState(true);
  const header = [];

  // const [stationWiseData, setStationWiseData] = useState([]);

  useEffect(() => {
    // setStationWiseData(dataStationWise);
    setTableData(dataStationWise);
  }, [dataStationWise]);

  tableData?.forEach((item) => {
    item?.dateData?.forEach((date) => {
      if (!header.includes(date.date)) {
        header.push(date.date);
      }
    });
  });

  const handleSwapRows = () => {
    const sortedData = [...tableData].sort((a, b) => {
      const valueA = a.someStringColumn?.toLowerCase() || '';
      const valueB = b.someStringColumn?.toLowerCase() || '';

      return isAscending
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    });

    setTableData(sortedData);
    setIsAscending(!isAscending);
  };

  // data.forEach((item) => {
  //   item.dateData.forEach((date) => {
  //     if (!header.includes(date.date)) {
  //       header.push(date.date);
  //     }
  //   });
  // });

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '14px',
          fontWeight: 'bold',
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
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          {/* <span>01 Oct 2023 - 30 Oct 2023, 3:15 PM-12 AM</span>{' '} */}
          <span>
            <img src={download} alt="" style={{ cursor: 'pointer' }} />
          </span>
        </div>
      </div>
      <div className="tableContainer">
        <table className="tableData">
          <thead>
            <tr>
              <th>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span>Process Station ({dataStationWise?.length || 0}) </span>

                  <span>
                    <img
                      src={sorting}
                      onClick={handleSwapRows}
                      style={{
                        cursor: 'pointer',
                        width: '10px',
                        height: '10px',
                        color: '#ddd',
                      }}
                      alt="sort icon"
                    />
                  </span>
                </div>
              </th>
              {header.map((date) => (
                <th key={date}>{formatDateTime(date, 'date')}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData?.map((item, stationIndex) => (
              <tr key={stationIndex}>
                <td>
                  <span
                    style={{
                      border: '1px solid black',
                      borderRadius: '100%',
                      width: '40px',
                      height: '15px',
                      textAlign: 'center',
                      padding: '0px 7px',
                      marginRight: '10px',
                      backgroundColor:
                        item?.stations === '' ? '#7a7c7e' : 'transparent',
                    }}
                  >
                    {item?.stations}
                  </span>
                  <span style={{ fontWeight: 'bold', color: '#66696b' }}>
                    {item?.stationName}
                  </span>
                  {' | '}
                  {item?.description}
                </td>

                {header.map((date, dateIndex) => {
                  const matchingData = item?.dateData?.filter(
                    (entry) => entry.date === date
                  );

                  return (
                    <td key={dateIndex}>
                      {matchingData.map((dataItem, entryIndex) => (
                        <div
                          style={{
                            display: 'flex',
                            gap: '5px',
                            alignItems: 'center',
                          }}
                        >
                          <span>
                            <div
                              key={entryIndex}
                              style={{ marginBottom: '10px' }}
                            >
                              <TableDropFirstDetails>
                                <div style={{ position: 'relative' }}>
                                  <TableImg src={imgSrc} alt="icon" />
                                  {dataItem.type ? (
                                    <TagTrainee>Trainee</TagTrainee>
                                  ) : null}
                                </div>
                                <TableBoxDetails>
                                  <Tooltip
                                    title={dataItem.name}
                                    arrow
                                    componentsProps={{
                                      tooltip: {
                                        sx: {
                                          maxWidth: '300px',
                                          fontSize: '12px',
                                          padding: '8px',
                                        },
                                      },
                                    }}
                                  >
                                    <TableNames>{dataItem.name}</TableNames>
                                  </Tooltip>

                                  <TableIdLevel variant="h4">
                                    <Box sx={{ display: 'flex' }}>
                                      <TableIdLevel variant="h4">
                                        {dataItem?.operator_staff_id || 'N/A'} |
                                      </TableIdLevel>
                                      <TableIdLevel variant="h4">
                                        {dataItem?.operatorcurrentlevel ||
                                          'N/A'}{' '}
                                        |
                                      </TableIdLevel>
                                      <TableIdLevel variant="h4">
                                        {dataItem?.operatorlevel || 'N/A'}
                                      </TableIdLevel>
                                    </Box>
                                  </TableIdLevel>
                                  <TableIdLevel variant="h4">
                                    <img src={Time} alt="" />
                                    {dataItem.time}
                                  </TableIdLevel>
                                </TableBoxDetails>
                              </TableDropFirstDetails>
                            </div>
                          </span>
                          <div>
                            {dataItem.swap ? (
                              <div
                                style={{
                                  display: 'flex',
                                  gap: '5px',
                                  alignItems: 'center',
                                  marginBottom: '10px',
                                }}
                              >
                                {' '}
                                <div>
                                  <img src={Swap} alt="Swap" />
                                </div>
                                <div>
                                  <TableDropSecondDetail>
                                    <div>
                                      <TableImg src={imgSrc} alt="icon" />
                                      {dataItem.type ? (
                                        <TagTrainee>Trainee</TagTrainee>
                                      ) : null}
                                    </div>
                                    <TableBoxDetails>
                                      <Tooltip title={dataItem.newname} arrow>
                                        <TableNames>
                                          {dataItem.newname}
                                        </TableNames>
                                      </Tooltip>
                                      <TableIdLevel variant="h4">
                                        <Box sx={{ display: 'flex' }}>
                                          <TableIdLevel variant="h4">
                                            {dataItem?.newoperator_staff_id ||
                                              'N/A'}{' '}
                                            |
                                          </TableIdLevel>
                                          <TableIdLevel variant="h4">
                                            {dataItem?.newoperatorcurrentlevel ||
                                              'N/A'}{' '}
                                            |
                                          </TableIdLevel>
                                          <TableIdLevel variant="h4">
                                            {dataItem?.newoperatorlevel ||
                                              'N/A'}
                                          </TableIdLevel>
                                        </Box>
                                      </TableIdLevel>
                                      <TableIdLevel variant="h4">
                                        <img src={Time} alt="" />
                                        {dataItem.time}
                                      </TableIdLevel>
                                    </TableBoxDetails>
                                  </TableDropSecondDetail>
                                </div>
                              </div>
                            ) : (
                              loading
                            )}
                          </div>
                        </div>
                      ))}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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

export default StationWiseDataTable;
