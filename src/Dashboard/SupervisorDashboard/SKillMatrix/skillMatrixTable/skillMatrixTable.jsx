import SearchIcon from '@mui/icons-material/Search';
import {
  Backdrop,
  Box,
  CircularProgress,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import { MarutiBlue500 } from '../../../../../Utilities/colors';
import sorting from '../../../../assets/icons/SortIcon.svg';
import CheckBox from '../../../../assets/svg/Checkbox.svg';
import download from '../../../../assets/svg/download-btn.svg';
import { TreeFilterSearch } from '../../../../components/TreeFilter/treeFilter.style';
import useFetchSkillMatrix from '../../hooks/fetchSkillMatrix';
import { FlexBoxMatrix, SkillMatrixBox } from '../SkillMatrix.style';
import SkillBoxComponent from './skillBox/skillBox';
import SkillTableFooter from './skillBox/skillTableFooter';
import './skillMatrixTable.css';
import {
  HeaderText,
  MaruSpanSkill,
  NonMaruSpanSkill,
  StationsText,
} from './skillMatrixTable.style';

SkillBoxComponent.propTypes = {
  isPlanned: PropTypes.bool.isRequired,
  skillLevel: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  staffId: PropTypes.number.isRequired,
  tooltip: PropTypes.array.isRequired,
};

const SkillMatrixTable = ({ handleTotalCount }) => {
  const [operators, setOperators] = useState([]);
  const [stationsData, setStationsData] = useState([]);
  const [sortDirection, setSortDirection] = useState('asc');
  const { skillData, fetchSkillMatrix, loading } = useFetchSkillMatrix();
  const [numbers, setNumbers] = useState([]);
  const [supervisorId, setSupervisorId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [filteredOperators, setFilteredOperators] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchReadyOperators, setSearchReadyOperators] = useState([]);

  const secondDiv = 'secondDiv';

  const fetchMatrixData = async () => {
    try {
      const params = `supervisorId=${supervisorId}`;
      const responseData = await fetchSkillMatrix(params);
      if (responseData?.data?.responseCode === 200) {
        const operatorData = responseData?.data?.response?.operators;
        setOperators(responseData?.data?.response?.operators);
        setStationsData(responseData?.data?.response?.stationsData);
        setFilteredOperators(operatorData);
        handleTotalCount([
          operatorData?.length,
          responseData?.data?.response?.lastUpdated,
        ]);
      }
    } catch (error) {
      console.error('Error fetching skill matrix:', error);
    }
  };

  useEffect(() => {
    setSupervisorId(localStorage.getItem('supervisorId'));
    if (supervisorId) {
      fetchMatrixData();
    }
  }, [supervisorId]);

  // Pre-process data for searching
  useEffect(() => {
    if (operators.length) {
      setSearchReadyOperators(
        operators.map((op) => ({
          ...op,
          searchName: op.name.toLowerCase(),
          searchId: op.staffId.toString().toLowerCase(),
        }))
      );
    }
  }, [operators]);

  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        if (!value) {
          setFilteredOperators(operators);
          return;
        }

        const lowerValue = value.toLowerCase();
        const filterData = searchReadyOperators
          .filter(
            (op) =>
              op.searchName.includes(lowerValue) ||
              op.searchId.includes(lowerValue)
          )
          .map((op) => {
            const { searchName, searchId, ...rest } = op;
            return rest;
          });

        setFilteredOperators(filterData);
      }, 200),
    [operators, searchReadyOperators]
  );

  const handleSearch = (value) => {
    setSearchValue(value);
    debouncedSearch(value);
  };

  // Clean up debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleSortClick = (column) => {
    if (!operators || operators.length === 0) return;

    const sortedOperators = [...operators].sort((a, b) => {
      if (column === 'staffName') {
        return sortDirection === 'asc'
          ? a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
          : b.name.localeCompare(a.name, undefined, { sensitivity: 'base' });
      }

      if (column === 'staffId' || column === 'skill') {
        return sortDirection === 'asc'
          ? Number(a[column] || 0) - Number(b[column] || 0)
          : Number(b[column] || 0) - Number(a[column] || 0);
      }

      return 0;
    });

    setOperators(sortedOperators);
    const sortedNumbers = sortedOperators.map(
      (operator) => operator.skill || 0
    );
    setNumbers(sortedNumbers);
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  const handleDownload = async () => {
    setIsLoading(true);
    const secondDiv = document.getElementById('secondDiv');
    const firstDiv = document.getElementById('firstDiv');

    if (!firstDiv || !secondDiv) {
      console.error('One or both divs not found');
      setIsLoading(false);
      return;
    }

    try {
      const firstCanvas = await html2canvas(firstDiv, { scale: 2 });
      const firstImgData = firstCanvas.toDataURL('image/png');

      const secondCanvas = await html2canvas(secondDiv, { scale: 2 });
      const secondImgData = secondCanvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 297;
      let yOffset = 0;

      const firstImgHeight =
        (firstCanvas.height * imgWidth) / firstCanvas.width;
      pdf.addImage(firstImgData, 'PNG', 0, yOffset, imgWidth, firstImgHeight);
      yOffset += firstImgHeight;

      const secondImgHeight =
        (secondCanvas.height * imgWidth) / secondCanvas.width;
      if (yOffset + secondImgHeight > pageHeight) {
        pdf.addPage();
        yOffset = 0;
      }
      pdf.addImage(secondImgData, 'PNG', 0, yOffset, imgWidth, secondImgHeight);

      pdf.save('skillMatrix.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const maxIndex = Math.max(
    ...filteredOperators.map((item) => item.stationWiseData.length)
  );

  const result = Array.from(
    { length: maxIndex },
    (_, index) =>
      filteredOperators.filter(
        (item) =>
          item.stationWiseData[index] &&
          (item.stationWiseData[index].current_level === 3 ||
            item.stationWiseData[index].current_level === 4)
      ).length
  );
  console.log(operators);

  return (
    <>
      <SkillMatrixBox>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            fontSize: '18px',
            fontWeight: 600,
          }}
        >
          <FlexBoxMatrix>Total {operators.length || 0}</FlexBoxMatrix>

          <TreeFilterSearch>
            <Box sx={{ pl: '1.6rem', minWidth: '208px' }}>
              <TextField
                placeholder="Search by Name, Staff ID"
                value={searchValue}
                onChange={(e) => handleSearch(e?.target?.value)}
                size="small"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon
                        sx={{
                          fontSize: 25,
                          color: MarutiBlue500,
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
                fullWidth
              />
            </Box>
            <div style={{ cursor: 'pointer' }} onClick={handleDownload}>
              <img src={download} alt="icon" />
            </div>
          </TreeFilterSearch>
        </div>
        <FlexBoxMatrix></FlexBoxMatrix>
      </SkillMatrixBox>
      <Box className="skill-matrix-table">
        <TableContainer
          component={Paper}
          style={{ padding: '0 10px 10px 10px' }}
        >
          <Backdrop
            sx={(theme) => ({
              color: '#fff',
              zIndex: theme.zIndex.drawer + 1,
            })}
            open={loading || isLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <Table
            id="firstDiv"
            className="table-custom"
            sx={{ border: '1px solid #E6E9F0' }}
          >
            <TableHead>
              <TableRow>
                <TableCell colSpan={3} />
                <TableCell colSpan={stationsData?.length} align="center">
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box sx={{ display: 'flex', gap: '10px' }}>
                      <Typography
                        variant="h3"
                        sx={{
                          color: 'black',
                          fontSize: '13px',
                          fontWeight: '600',
                        }}
                      >
                        Process Stations:
                      </Typography>{' '}
                      <Typography
                        variant="h3"
                        sx={{
                          display: 'flex',
                          gap: '2px',
                          fontSize: '13px',
                        }}
                      >
                        <Box
                          sx={{
                            height: '1rem',
                            width: '1rem',
                            backgroundColor: '#F1BE42',
                            borderRadius: '50%',
                            marginTop: '5px',
                          }}
                        ></Box>{' '}
                        Approval Required
                      </Typography>{' '}
                      <Typography
                        variant="h3"
                        sx={{
                          display: 'flex',
                          gap: '2px',
                          fontSize: '13px',
                        }}
                      >
                        <Box
                          sx={{
                            height: '1rem',
                            width: '1rem',
                            backgroundColor: '#30C030',
                            borderRadius: '50%',
                            marginTop: '5px',
                          }}
                        ></Box>{' '}
                        Achieved
                      </Typography>{' '}
                      <Typography
                        variant="h3"
                        sx={{
                          display: 'flex',
                          gap: '2px',
                          fontSize: '13px',
                        }}
                      >
                        <Box
                          sx={{
                            height: '1rem',
                            width: '1rem',
                            backgroundColor: 'rgb(165, 195, 255)',
                            borderRadius: '50%',
                            marginTop: '5px',
                          }}
                        ></Box>{' '}
                        Planned
                      </Typography>{' '}
                    </Box>
                    <Box>
                      <Typography
                        variant="h3"
                        sx={{ display: 'flex', gap: '5px' }}
                      >
                        <p
                          style={{
                            color: 'black',
                            fontSize: '13px',
                            fontWeight: '600',
                          }}
                        >
                          Total Available Skill:{' '}
                        </p>{' '}
                        {stationsData?.length * 4} (No. of Stations*4)
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell colSpan={3} style={{ padding: '12px' }} />
                {stationsData?.map((station, index) => (
                  <TableCell key={index} align="center">
                    {station.maruAAr ? (
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          width: '100%',
                          padding: '8px, 0px',
                        }}
                      >
                        <MaruSpanSkill>{station.maruAAr}</MaruSpanSkill>
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          width: '100%',
                          padding: '5px 0px',
                        }}
                      >
                        <NonMaruSpanSkill />
                      </Box>
                    )}
                  </TableCell>
                ))}
              </TableRow>

              <TableRow style={{ verticalAlign: 'baseline' }}>
                <TableCell style={{ borderBottom: 'none' }}>
                  <Typography
                    style={{
                      width: '40px',
                      display: 'flex',
                      gap: '5px',
                      fontSize: '12px',
                    }}
                    variant="h5"
                  >
                    {' '}
                    S.No.{' '}
                    <img
                      src={sorting}
                      style={{
                        cursor: 'pointer',
                        width: '10px',
                      }}
                      onClick={() => handleSortClick('staffId')}
                      alt=""
                    />
                  </Typography>
                </TableCell>
                <TableCell style={{ borderBottom: 'none' }}>
                  <Typography
                    variant="h5"
                    style={{
                      width: '100px',
                      display: 'flex',
                      gap: '5px',
                      fontSize: '12px',
                    }}
                  >
                    {' '}
                    Operator{' '}
                    <img
                      src={sorting}
                      style={{
                        cursor: 'pointer',
                        width: '10px',
                      }}
                      onClick={() => handleSortClick('staffName')}
                      alt=""
                    />
                  </Typography>
                </TableCell>
                <TableCell style={{ width: '40px', borderBottom: 'none' }}>
                  {' '}
                  <Typography
                    variant="h5"
                    style={{
                      width: '100px',
                      display: 'flex',
                      gap: '5px',
                      fontSize: '12px',
                    }}
                  >
                    {' '}
                    % Skill Available till last month
                    <img
                      src={sorting}
                      style={{
                        cursor: 'pointer',
                        width: '10px',
                      }}
                      onClick={() => handleSortClick('skill')}
                      alt=""
                    />
                  </Typography>
                </TableCell>
                {stationsData?.map((station, index) => (
                  <TableCell key={index}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        gap: '5px',
                        padding: '8px 2px',
                      }}
                    >
                      <HeaderText sx={{ fontSize: '13px !important' }}>
                        {station.station_name}
                      </HeaderText>
                      <StationsText sx={{ fontSize: '10px !important' }}>
                        {station.stationDescription}
                      </StationsText>
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell
                  style={{
                    borderLeft: '1px solid #E6E9F0',
                    borderRight: '1px solid #E6E9F0',
                  }}
                ></TableCell>
                <TableCell
                  style={{
                    borderLeft: '1px solid #E6E9F0',
                    borderRight: '1px solid #E6E9F0',
                  }}
                ></TableCell>
                <TableCell
                  style={{
                    borderLeft: '1px solid #E6E9F0',
                    borderRight: '1px solid #E6E9F0',
                  }}
                ></TableCell>
                {result?.map((value, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      border: '1px solid #E6E9F0',
                      textAlign: 'center',
                    }}
                  >
                    <span
                      style={{
                        display: 'flex',
                        gap: '5px',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <img src={CheckBox} alt="img" />
                      <p
                        style={{
                          fontSize: '14px',
                          color: '#000000',
                        }}
                      >
                        {value}
                      </p>
                    </span>
                  </TableCell>
                ))}
              </TableRow>
              {filteredOperators?.map((op, index) => (
                <TableRow key={op.id}>
                  <TableCell sx={{ fontSize: '14px !important' }}>
                    {index + 1}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: '1px solid #E6E9F0',
                      whiteSpace: 'nowrap',
                      fontSize: '13px !important',
                      fontWeight: '400',
                      letterSpacing: '-0.025em',
                      lineHeight: '1.43 !important',
                    }}
                  >
                    {op.name}
                    <div
                      style={{ color: '#9EA1A7' }}
                    >{`(${op.staffId} | ${op.level})`}</div>
                  </TableCell>
                  <TableCell sx={{ fontSize: '14px !important' }}>
                    {`${op?.percentageSkill || 0} %`}
                  </TableCell>
                  {op.stationWiseData.map((skillLevel, i) => {
                    const id = crypto.randomUUID();

                    return (
                      <TableCell
                        key={i}
                        sx={{
                          padding: '0 !important',
                          borderBottom: '0',
                        }}
                      >
                        <SkillBoxComponent
                          stationData={{
                            stationName: skillLevel?.station_name,
                            stationDescription: skillLevel?.stationDescription,
                          }}
                          skillLevel={skillLevel.current_level}
                          isPlanned={skillLevel.isPlanned}
                          tooltip={skillLevel?.tooltipData}
                          index={id}
                          staffId={op?.staffId}
                          fetchMatrixData={fetchMatrixData}
                        />
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <SkillTableFooter secondDiv={secondDiv}></SkillTableFooter>
      </Box>
    </>
  );
};

export default SkillMatrixTable;
