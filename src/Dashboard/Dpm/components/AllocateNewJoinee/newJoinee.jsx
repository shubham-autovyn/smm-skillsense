import { useLocation, useNavigate } from 'react-router-dom';

import CloseIcon from '@mui/icons-material/Close';
import {
  Backdrop,
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  IconButton,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CustomButton from '../../../../components/Button/SecondaryButtonWithIcon';
import SnackBar from '../../../../components/Snackbar/Snackbar';
import DataTreeTable from '../../../../components/TreeDataTable/datatree';
import * as shopReducer from '../../../../redux/Reducers/SMMShopReducer';
import convertDate from '../../../../utils/convertDate';
import getCurrentDateMinusDays from '../../../../utils/getCurrentDateMinusDays';
import RearrangeData from '../../../../utils/rearrangeData';
import useFetchAllocationNewJoinee from '../../hooks/fetchAllocationNewJoinee';
import useFetchSaveAllocationNewJoinee from '../../hooks/saveAllocationNewJoinee';
import {
  ButtonBox,
  DataTable,
  NewJoineeBox,
  NewJoineeBoxHeader,
  NewJoineeBoxSubText,
  NewJoineeBoxText,
  NewJoineeContainer,
  NewJoineeHeader,
  NewJoineeSubText,
  NewJoineeSubText2,
  NewJoineeText,
  SubmitPopButton,
  SubmitPopContent,
  SubmitPopHeading,
  TableText,
} from './newJoinee.style';

const formatDate = (date) =>
  `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}/${date.getFullYear()}`;

const currentDate = formatDate(new Date());

const tableHeader = [
  'Department Structure',
  `Cumulative Gap (as on ${currentDate})`,
  'Allocated New Joiners',
];

const NewJoinee = () => {
  const [open, setOpen] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [responseCode, setResponseCode] = useState(null);
  const [saveNewjoinee, setSaveNewjoinee] = useState(null);
  const [reArrangeData, setReArrangeData] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);

  const location = useLocation();
  const date = location.state?.date;
  const {
    dataGraph: newJoineeTableData,
    loading: tableLoader,
    fetchNewJoineeData: fetchDataNewJoinee,
  } = useFetchAllocationNewJoinee();

  const [saveAllocationNewJoineePayload, setsaveAllocationNewJoineePayload] =
    useState(null);

  const {
    dataGraph: saveNewJoineeTableData,
    fetchSaveAllocationNewJoineeData: fetchSaveAllocationNewJoinee,
    loading: saveTableLoader,
  } = useFetchSaveAllocationNewJoinee();

  const shop = useSelector(shopReducer.getShop);
  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleShowButton = (boolean) => {
    setIsDisabled(boolean);
  };

  useEffect(() => {
    setsaveAllocationNewJoineePayload({
      date: getCurrentDateMinusDays(4),
      shopId: shop?.id,
      data: newJoineeTableData?.data,
    });
  }, [newJoineeTableData]);

  const updateDataWithExpanded = (data, depth = 0) => {
    if (Array.isArray(data)) {
      return data?.map((node) => ({
        ...node,
        randomId: crypto?.randomUUID(),
        expanded: node?.children?.length > 0,
        depth,
        children: node.children
          ? updateDataWithExpanded(node?.children, depth + 1)
          : [],
      }));
    } else {
      return [];
    }
  };

  useEffect(() => {
    const reArrangeDataNew = RearrangeData(newJoineeTableData?.data);

    const updatedTableData = updateDataWithExpanded(reArrangeDataNew);
    setReArrangeData(updatedTableData);
  }, [newJoineeTableData]);

  const fetchSaveAllocationNewJoineeData = async () => {
    try {
      const response = await fetchSaveAllocationNewJoinee(
        saveAllocationNewJoineePayload
      );
      if (response?.data?.responseCode === 200) {
        handleClose();
        localStorage.setItem('showSnackBar', 'true');
        navigate('/SMM?tabName=BASIC+REQUIREMENTS');
      } else {
        setShowSuccessAlert(true);
        setResponseCode(response?.data?.responseCode || 400);
        setAlertMessage(response?.data?.message || 'An error occurred');
        handleClose();
      }
    } catch (err) {
      setAlertMessage(err?.message || 'An error occurred');
      console.error('Error saving allocation data:', err);
    }
  };

  useEffect(() => {
    if (saveNewJoineeTableData) {
      setSaveNewjoinee(saveNewJoineeTableData);
    }
  }, [saveNewJoineeTableData]);

  const handleDataChange = (updatedData) => {
    const payload = {
      date: '27-03-2025',
      shopId: shop?.id,
      data: updatedData,
    };
    setsaveAllocationNewJoineePayload(payload);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={tableLoader || saveTableLoader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <NewJoineeContainer>
        <NewJoineeHeader>
          <NewJoineeText>Basic Requirement</NewJoineeText>
          <NewJoineeSubText>
            {' '}
            {'/'} Allocate New Joinee Numbers to Areas
          </NewJoineeSubText>
        </NewJoineeHeader>
        <NewJoineeSubText2>
          Allocate New Joinee Numbers to Areas
        </NewJoineeSubText2>
        <NewJoineeBox>
          <NewJoineeBoxHeader>
            <div>
              <NewJoineeBoxText>
                Total New Joinees to be Allocated
              </NewJoineeBoxText>
              {newJoineeTableData && (
                <NewJoineeBoxSubText>
                  {newJoineeTableData?.totalJoineeCount || 0}
                </NewJoineeBoxSubText>
              )}
            </div>
            <div>
              <NewJoineeBoxText>MSIL Joining Date</NewJoineeBoxText>
              <NewJoineeBoxSubText> {convertDate(date)} </NewJoineeBoxSubText>
            </div>
          </NewJoineeBoxHeader>
          <div>
            <TableText>Recommended Allocation</TableText>
          </div>
          {newJoineeTableData && newJoineeTableData?.data?.length > 0 ? (
            <DataTable>
              <DataTreeTable
                totalNewJoineeCount={newJoineeTableData?.totalJoineeCount}
                tableData={reArrangeData}
                headerName={tableHeader}
                designCell={false}
                onDataChange={handleDataChange}
                onUpdate={handleShowButton}
              ></DataTreeTable>
            </DataTable>
          ) : (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '200px', // Adjust height as necessary
                fontSize: '16px',
                fontWeight: '600',
              }}
            >
              <p>No Data Found</p>
            </div>
          )}
        </NewJoineeBox>
        <ButtonBox>
          <CustomButton onClick={handleBack}>Cancel</CustomButton>
          <CustomButton
            onClick={handleClickOpen}
            disabled={isDisabled}
            backgroundColor="#171C8F"
            textColor="#fff"
          >
            Submit Allocation
          </CustomButton>
        </ButtonBox>
      </NewJoineeContainer>
      <Dialog open={open} onClose={handleClose} maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0px',
          }}
        >
          <SubmitPopHeading>Confirm Allocation</SubmitPopHeading>
          <IconButton onClick={handleClose}>
            <CloseIcon sx={{ fontSize: '22px' }} />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            padding: '0px 0px',
          }}
        >
          <DialogContent sx={{ padding: '20px 20px' }}>
            <SubmitPopContent>
              Once submitted, this allocation is permanent and cannot be
              changed. Are you sure you wish to proceed?
            </SubmitPopContent>
          </DialogContent>
        </Box>
        <SubmitPopButton>
          <CustomButton onClick={handleClose}>Cancel</CustomButton>
          <CustomButton
            onClick={fetchSaveAllocationNewJoineeData}
            backgroundColor="#171C8F"
            textColor="#fff"
          >
            Submit Allocation
          </CustomButton>
        </SubmitPopButton>
      </Dialog>
      <SnackBar
        showSuccessAlert={showSuccessAlert}
        responseCode={responseCode}
        alertMessage={alertMessage}
        hideDuration={5000}
      />
    </>
  );
};
export default NewJoinee;
