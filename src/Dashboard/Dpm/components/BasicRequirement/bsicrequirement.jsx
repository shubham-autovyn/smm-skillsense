import { Backdrop, Box, Button, Radio } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import circle from '../../../../assets/svg/circle.svg';
import download from '../../../../assets/svg/download-btn.svg';
import Check from '../../../../assets/svg/fi-rr-check.svg';
import Cross from '../../../../assets/svg/fi-rr-cross-small.svg';

import moment from 'moment';
import { useDispatch } from 'react-redux';
import Download from '../../../../components/Download/Download';
import DataTreeTable from '../../../../components/TreeDataTable/datatree';
import { fetchAreaMasterFiles } from '../../../../redux/Actions/DepartmentMasterAction';
import { getMasterFiles } from '../../../../redux/Reducers/SMMDepartmentMasterReducer';
import * as shopReducer from '../../../../redux/Reducers/SMMShopReducer';
import convertDate from '../../../../utils/convertDate';
import getCurrentDateMinusDays from '../../../../utils/getCurrentDateMinusDays';
import RearrangeData from '../../../../utils/rearrangeData';
import useBasicRequirement from '../../hooks/basicRequirement';
import useBasicRequirementSecond from '../../hooks/basicRequirementSecond';
import useFetchBatchesPendingAllocation from '../../hooks/batchesAllocationPending';
import useCalendar from '../../hooks/calendarApi';
import useFetchAllocationNewJoinee from '../../hooks/fetchAllocationNewJoinee';
import './basicrequirement.css';
import {
  BasicRequirementBox,
  BasicRequirementBoxRightSubText,
  BasicRequirementBoxRightText,
  BasicRequirementBoxRightTop,
  BasicRequirementContainer,
  BasicRequirementLeftBox,
  BasicRequirementSubContainer,
  BasicRequirementSubText,
  BasicRequirementText,
  CurrentActiveText,
  DataTable,
  NormalText,
  SnackBarContainer,
  TopText,
  UnderLinkText,
} from './basicrequirement.style';

const tableHeader = [
  'Department Structure',
  'No. of Stations',
  'Change in Stations (vs Previous Req.)',
];

const BasicRequirement = () => {
  const shop = useSelector(shopReducer.getShop);
  const [isDivVisible, setIsDivVisible] = useState(false);
  const [isDivVisible2, setIsDivVisible2] = useState(false);
  const [open, setOpen] = useState(false);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [effectiveDate, setEffectiveDate] = useState(null);
  const [openDownload, setOpenDownload] = useState(false);
  const [fileToDownload, setFileToDownload] = useState(null);
  const [currentStatus, setCurrentStatus] = useState('Present');
  const [activeIndex, setActiveIndex] = useState(0);
  const [tooltipFunction, setTooltipFunction] = useState(null);

  const files = useSelector(getMasterFiles);
  const dispatch = useDispatch();

  const toggleDownload = () => {
    setOpenDownload(!openDownload);
  };

  const { dataGraph: basicTableData, fetchData: fetchDataBasic } =
    useBasicRequirement();

  const {
    dataGraph: basicDateData = [],
    fetchBasicRequirementData: fetchDateDataBasic,
  } = useBasicRequirementSecond();

  const {
    dataGraph: newJoineeTableData,
    fetchNewJoineeData: fetchDataNewJoinee,
  } = useFetchAllocationNewJoinee();

  const {
    dataGraph: pendingAllocationBatchesData,
    fetchData: fetchPendingAllocation,
  } = useFetchBatchesPendingAllocation();

  const { dataCalendar: dataCalendar } = useCalendar();

  const disabledDates = dataCalendar?.map((item) =>
    moment(item.date).format('DD-MM-YYYY')
  );
  useEffect(() => {
    const shouldShowSnackBar = localStorage.getItem('showSnackBar');

    if (shouldShowSnackBar === 'true') {
      setShowSnackBar(true);

      const timer = setTimeout(() => {
        setShowSnackBar(false);
        localStorage.removeItem('showSnackBar');
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, []);
  useEffect(() => {
    if (newJoineeTableData?.data?.length > 0) {
      setIsDivVisible(true);
    }
  }, [newJoineeTableData]);

  useEffect(() => {
    if (pendingAllocationBatchesData?.pending_batch_details.length > 0) {
      setIsDivVisible2(true);
    }
  }, [pendingAllocationBatchesData]);

  useEffect(() => {
    setActiveIndex(0);
    if (shop.id) {
      fetchBasicRequirementData();
      fetchNewJoineeData();
      const payload = {
        shop_id: shop?.id,
      };
      dispatch(fetchAreaMasterFiles(payload));
    }
  }, [shop.id]);

  useEffect(() => {
    if (effectiveDate && shop.id) {
      fetchDataBasicTable();
    }
  }, [effectiveDate]);

  useEffect(() => {
    setCurrentStatus('Present');
  }, [shop.id]);

  const fetchBasicRequirementData = async () => {
    setOpen(true);
    try {
      const basicParams = `shop_id=${shop.id}`;

      const responseData = await fetchDateDataBasic(basicParams);

      if (responseData?.data?.responseCode === 200 || 'SMM200') {
        if (
          responseData?.data?.response &&
          Array.isArray(responseData?.data?.response) &&
          responseData?.data?.response.length > 0
        ) {
          setEffectiveDate(responseData?.data?.response[0]?.effectiveDate);
        }
      }

      setOpen(false);
    } catch (err) {
      console.error('Error fetching basic requirements:', err);
    }
  };

  const fetchDataBasicTable = async () => {
    setOpen(true);
    try {
      const basicPayload = {
        shopId: shop.id,
        startDate: effectiveDate,
      };
      await fetchDataBasic(basicPayload);

      setOpen(false);
    } catch (err) {
      console.error('Error fetching basic requirements:', err);
    }
  };

  const fetchNewJoineeData = async () => {
    setOpen(true);
    try {
      const newJoineePayload = {
        date: getCurrentDateMinusDays(4, disabledDates),
        // date: '27-03-2025',
        shopId: shop?.id,
      };
      await fetchDataNewJoinee(newJoineePayload);
      setOpen(false);
    } catch (err) {
      console.error('Error fetching basic requirements:', err);
    }
  };
  const navigate = useNavigate();
  const handleNavigationJoinee = () => {
    navigate('/SMM/NewJoineeAllocated', {
      state: { date: getCurrentDateMinusDays(4, disabledDates) },
    });
  };
  const handleNavigationPending = () => {
    navigate('/SMM/PendingAreas', {
      state: { shop_id: shop.id },
    });
  };

  const updateDataWithExpanded = (data) => {
    if (!Array.isArray(data)) return [];
    return data?.map((node) => ({
      ...node,
      randomId: crypto.randomUUID(),
      expanded: node.children?.length > 0,
      children: node.children ? updateDataWithExpanded(node.children) : [],
    }));
  };
  const reArrangeData = RearrangeData(basicTableData);

  const updatedTableData = updateDataWithExpanded(reArrangeData);

  const isDataAvailable =
    basicTableData?.length > 0 && basicDateData?.length > 0;

  useEffect(() => {
    if (!shop?.id) {
      console.warn('Shop ID is not available, skipping fetch.');
      return;
    }
    try {
      const basicParams = `shop_id=${shop.id}&training_type=New joinee&date=${
        getCurrentDateMinusDays(6, disabledDates)
        // '27-03-2025'
      }`;
      fetchPendingAllocation(basicParams);
    } catch (err) {
      console.error('Error fetching pending allocation:', err);
    }
  }, [fetchPendingAllocation, shop.id]);

  const hendalDownload = () => {
    if (files.length > 0) {
      files.map((item) => {
        const date = new Date(item.effectiveDate * 1000);

        const formattedDate = `${String(date.getDate()).padStart(
          2,
          '0'
        )}-${String(date.getMonth() + 1).padStart(
          2,
          '0'
        )}-${date.getFullYear()}`;

        if (effectiveDate === formattedDate && item.status === 'Success') {
          toggleDownload();
          setFileToDownload(item.filePath);
        }
      });
    }
  };

  const selectLogs = (index, currentEffectiveDate, currentStatus) => {
    setEffectiveDate(currentEffectiveDate);
    setActiveIndex(index);
    setCurrentStatus(currentStatus);
  };

  return (
    <>
      <BasicRequirementBox>
        {isDivVisible && (
          <TopText>
            <strong>Allocate New Joinee Numbers to Areas:</strong>{' '}
            {newJoineeTableData?.totalJoineeCount || 0} Operators who have
            finished their MSTA training are awaiting assignment to specific
            areas.{' '}
            <UnderLinkText onClick={handleNavigationJoinee}>
              Proceed with Allocation &gt;
            </UnderLinkText>
          </TopText>
        )}
        {isDivVisible2 && (
          <TopText>
            <strong>Allocate 2-day Training Attendees to Areas:</strong>{' '}
            {pendingAllocationBatchesData?.pending_batch_details.length || 0}{' '}
            Operators who have finished their two-day classroom training are
            awaiting assignment to specific areas.{' '}
            <UnderLinkText onClick={handleNavigationPending}>
              Proceed with Allocation &gt;
            </UnderLinkText>
          </TopText>
        )}
        {showSnackBar && (
          <SnackBarContainer>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <img src={Check} alt="check" />
              <p>Allocation submitted successfully!</p>
            </div>
            <img
              src={Cross}
              alt="cross-icon"
              style={{ cursor: 'pointer' }}
              onClick={() => setShowSnackBar(false)}
            />
          </SnackBarContainer>
        )}

        <BasicRequirementContainer>
          <BasicRequirementText>
            {shop.shop_name} Basic Requirement
          </BasicRequirementText>
          <Button onClick={hendalDownload}>
            <img src={download} alt="icon" />
          </Button>
        </BasicRequirementContainer>
        <BasicRequirementSubContainer>
          <BasicRequirementLeftBox>
            <BasicRequirementSubText>Currently Active</BasicRequirementSubText>
            {/* Current Active Line */}
            <Box
              className={`list ${activeIndex === 0 ? 'currentActiveBox' : ''}`}
              style={{
                backgroundColor: activeIndex === 0 ? ' #e8e8f4' : 'transparent',
                borderRadius: '8px',
                border: '1px solid #ced0d4',
                display: 'flex',
                cursor: 'pointer',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '14px 12px',
                margin: '10px 0',
              }}
              onClick={() => {
                let index = 0;
                selectLogs(index, basicDateData?.[0]?.effectiveDate, 'Present');
              }}
            >
              <NormalText>
                {convertDate(basicDateData?.[0]?.effectiveDate)} - Present
              </NormalText>
              <Radio
                checked={activeIndex === 0}
                sx={{
                  color: '#66696B',
                  width: '14px',
                  height: '14px',
                  padding: '0px',
                  marginLeft: '30px',
                  '& .MuiSvgIcon-root': {
                    fontSize: '14px',
                  },
                  '&.Mui-checked': {
                    color: '#171C8F',
                    marginLeft: '30px',
                  },
                }}
              />
              <CurrentActiveText>
                {basicDateData?.[0]?.basicRequirement} |{' '}
                {basicDateData?.[0]?.dailyProductionVolumePerGroup}
              </CurrentActiveText>
            </Box>

            <BasicRequirementSubText>Past</BasicRequirementSubText>
            {basicDateData?.map((item, index) => {
              if (index === 0) return null; // Skip the first line, as it is "Currently Active"

              const isActive = index === activeIndex;
              const currentEffectiveDate = convertDate(item.effectiveDate);
              const previousEffectiveDate =
                index > 0
                  ? (() => {
                      const dateStr = basicDateData[index - 1].effectiveDate;
                      const [day, month, year] = dateStr.split('-');
                      const formattedDate = new Date(year, month - 1, day);

                      if (!isNaN(formattedDate.getTime())) {
                        const previousDate = new Date(
                          formattedDate.getTime() - 86400000
                        );
                        return convertDate(
                          `${previousDate
                            .getDate()
                            .toString()
                            .padStart(2, '0')}-${(previousDate.getMonth() + 1)
                            .toString()
                            .padStart(2, '0')}-${previousDate.getFullYear()}`
                        );
                      }
                      return null;
                    })()
                  : null;

              return (
                <Box
                  key={index}
                  onClick={() =>
                    selectLogs(index, item.effectiveDate, previousEffectiveDate)
                  } // Update the active index when clicked
                  className={`list ${
                    (isActive ? 'currentActiveBox' : '',
                    index === 0 ? 'top-after' : '',
                    index === basicDateData.length - 1 ? 'bottom-before' : '')
                  }`}
                  style={{
                    backgroundColor: isActive ? ' #e8e8f4' : 'transparent',
                    borderRadius: '8px',
                    border: '1px solid #ced0d4',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '14px 12px',
                    margin: '10px 0',
                    cursor: 'pointer',
                    position: 'relative', // For the vertical line
                  }}
                >
                  {/* Content */}
                  <NormalText>
                    {previousEffectiveDate
                      ? `${currentEffectiveDate} - ${previousEffectiveDate}`
                      : `${currentEffectiveDate} - Present`}
                  </NormalText>

                  <span
                    className="circle first-child"
                    style={{
                      border: isActive ? '1.4px solid #171C8F' : 'transparent',
                      display: 'flex', // Flexbox for centering the inner span
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: '50%', // Makes the parent span a circle
                      width: isActive ? '13px' : '13px', // Ensure width and height are always defined
                      height: isActive ? '13px' : '13px',
                    }}
                  >
                    <span
                      style={{
                        width: isActive ? '5px' : '12px', // Adjust size based on `isActive`
                        height: isActive ? '5px' : '12px',
                        borderRadius: '50%', // Inner span as a circle
                        border: isActive ? 'none' : '1.4px solid #7a7d7f', // Show border when not active
                        backgroundColor: isActive ? '#171C8F' : 'transparent', // Fill color when active
                      }}
                    ></span>
                  </span>

                  <CurrentActiveText>
                    {item?.basicRequirement} |{' '}
                    {item?.dailyProductionVolumePerGroup}
                  </CurrentActiveText>
                </Box>
              );
            })}
          </BasicRequirementLeftBox>

          {/* Right Panel */}
          <div style={{ width: '100%' }}>
            <BasicRequirementBoxRightTop>
              <div style={{ textAlign: 'center' }}>
                <BasicRequirementBoxRightText>
                  Basic Requirement
                </BasicRequirementBoxRightText>
                <BasicRequirementBoxRightSubText>
                  {basicDateData?.[activeIndex]?.basicRequirement || '-'}
                </BasicRequirementBoxRightSubText>
              </div>
              <div style={{ textAlign: 'center' }}>
                <BasicRequirementBoxRightText>
                  Daily Production Volume Per Group
                </BasicRequirementBoxRightText>
                <BasicRequirementBoxRightSubText>
                  {basicDateData?.[activeIndex]
                    ?.dailyProductionVolumePerGroup || '-'}
                </BasicRequirementBoxRightSubText>
              </div>
              <div style={{ textAlign: 'center' }}>
                <BasicRequirementBoxRightText>
                  Effective Date
                </BasicRequirementBoxRightText>
                <BasicRequirementBoxRightSubText>
                  {convertDate(basicDateData?.[activeIndex]?.effectiveDate)} -
                  {currentStatus}
                </BasicRequirementBoxRightSubText>
              </div>
            </BasicRequirementBoxRightTop>
            {!isDataAvailable && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '300px',
                  textAlign: 'center',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#888',
                }}
              >
                Data not found
              </div>
            )}
            {isDataAvailable && (
              <DataTable>
                <div
                  style={{
                    overflowY: 'auto',
                    maxHeight: '400px',
                  }}
                  onScroll={(e) => {
                    if (e.target.scrollTop) {
                      tooltipFunction();
                    }
                  }}
                >
                  <DataTreeTable
                    tableData={updatedTableData}
                    headerName={tableHeader}
                    designCell={true}
                    setTooltipFunction={setTooltipFunction}
                  ></DataTreeTable>
                </div>
              </DataTable>
            )}
          </div>
        </BasicRequirementSubContainer>
      </BasicRequirementBox>
      <Backdrop
        sx={(theme) => ({
          color: '#fff',
          zIndex: theme.zIndex.drawer + 1,
        })}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <div className="basicFooter">
        <p style={{ fontWeight: 'bold' }}>Legend : </p>
        <p>Effective Date Range</p>
        <p>
          <img src={circle} alt="" />
        </p>
        <p>Basic Req. | Daily Production Volume per Group</p>
      </div>
      {fileToDownload && openDownload && (
        <Download
          file={fileToDownload}
          open={openDownload}
          handleClose={toggleDownload}
        />
      )}
    </>
  );
};

export default BasicRequirement;
