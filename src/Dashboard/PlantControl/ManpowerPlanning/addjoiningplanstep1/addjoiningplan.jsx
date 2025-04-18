import { Backdrop, Box, CircularProgress } from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../../../../Utilities/Buttons/PrimaryButton/PrimaryButton";
import Draft from "../../../../assets/svg/fi-rr-trash.svg";
import CustomButton from "../../../../components/Button/SecondaryButtonWithIcon";
import CommonInput from "../../../../components/CommonInput/CommonInput";
import CustomDatePicker from "../../../../components/DatePicker/DatePicker";
import SnackBar from "../../../../components/Snackbar/Snackbar";
import { variables } from "../../../../styles/theme";
import useCalendar from "../../../Dpm/hooks/calendarApi";
import useAddJoiningPlan from "../../hooks/addJoiningPlan";
import useDeleteJoiningPlan from "../../hooks/deleteJoiningPlan";
import useGetAddJoiningPlan from "../../hooks/getAddJoiningPlan";
import "./addjoiningplan.scss";
import {
  BoxContainer,
  BoxHeader,
  BoxHeading,
  BoxSubText,
  BoxText,
  DataGridTable,
  StepBox,
  StepBoxOne,
  StepBoxTwo,
  StepBoxWrapper,
  StepSubText,
  StepSubText2,
  StepText,
  StepText2,
  TableBox,
  TableContainer,
  TableHeading,
} from "./addjoiningplan.style";

const AddJoiningPlan = () => {
  const navigate = useNavigate();

  const {
    dataJoining,
    fetchData,
    loading: dataLoader,
  } = useGetAddJoiningPlan();
  const {
    dataDeleteJoining,
    fetchDeleteData,
    loading: deleteLoader,
  } = useDeleteJoiningPlan();
  const {
    dataAddJoining,
    fetchAddData,
    loading: addLoader,
  } = useAddJoiningPlan();
  const { dataCalendar, fetchCalendar } = useCalendar();

  const [selectedDate, setSelectedDate] = useState("");
  const [noOfJoiners, setNoOfJoiners] = useState("");
  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarData, setSnackbarData] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);

  useEffect(() => {
    getJoiningPlan();
    fetchCalendar();
  }, []);

  const getJoiningPlan = async () => {
    try {
      await fetchData("plantId=7");
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      console.error("Valid ID not found");
      return;
    }
    try {
      const responseData = await fetchDeleteData(`id=${id}`);

      if (responseData?.data?.responseCode === 200) {
        getJoiningPlan();
        setSnackbarData(responseData?.data?.responseCode);
        setAlertMessage(responseData?.data?.response);
      } else {
        setSnackbarData(responseData?.data?.responseCode);
        setAlertMessage(
          responseData?.data?.response || responseData?.data?.message
        );
      }

      setSnackbarOpen(true);
    } catch (err) {
      console.error("Error deleting data:", err);
    }
  };

  const handleJoinersChange = (event) => {
    const value = event.target.value.replace(/[^0-9]/g, "");
    setNoOfJoiners(value);
  };

  const handleSubmit = async () => {
    if (selectedDate && noOfJoiners) {
      const payload = {
        tentativeJoiningDate: dayjs(selectedDate).format("YYYY-MM-DD"),
        noOfJoiners,
        plantId: 7,
      };
      try {
        const responseData = await fetchAddData(payload);

        getJoiningPlan();
        setSnackbarOpen(true);
        if (responseData.data.responseCode === 200) {
          setSnackbarData(responseData?.data?.responseCode);
          setAlertMessage(responseData?.data?.response);
        } else {
          setSnackbarData(responseData?.data?.responseCode);
          setAlertMessage(
            responseData?.data?.response || responseData?.data?.message
          );
        }
      } catch (error) {
        console.error("Error submitting data:", error);
      }

      setIsBoxVisible(false);
      setNoOfJoiners("");
      setSelectedDate("");
    }
  };

  const columns = [
    {
      field: "tentative_joining_date",
      headerName: "Select Tentative Joining Date",
      type: "string",
      flex: 2,
      filterable: false,
      sortable: false,
      cellClassName: "custom-bg-color",
    },
    {
      field: "noOfJoiners",
      headerName: "Enter No. of New Joiners",
      type: "string",
      flex: 2,
      filterable: false,
      sortable: false,
      cellClassName: "custom-bg-color",
    },
    {
      field: "delete",
      headerName: "Delete",
      type: "string",
      flex: 1,
      filterable: false,
      sortable: false,
      renderCell: (params) => (
        <button
          style={{ background: "none", cursor: "pointer" }}
          onClick={() => handleDelete(params.id)}
        >
          <img src={Draft} alt="Delete Icon" />
        </button>
      ),
    },
  ];

  const rows = Array.isArray(dataJoining?.response) ? dataJoining.response : [];

  const handleCancel = () => {
    navigate(-1);
  };

  const disabledDates = dataCalendar?.map((item) => dayjs(item.date).toDate());
  return (
    <>
      <BoxContainer>
        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={dataLoader || deleteLoader || addLoader}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <BoxHeader>
          <BoxText>Manpower Planning</BoxText>
          <BoxSubText>
            {">"} {""}Add Joining Plan
          </BoxSubText>
        </BoxHeader>
        <BoxHeading>Add Joining Plan</BoxHeading>

        <StepBox>
          <StepBoxOne>
            <StepText>Step 1</StepText>
            <StepSubText>Add Onboarding Schedule</StepSubText>
          </StepBoxOne>
          <StepBoxWrapper>
            <StepBoxTwo>
              <StepText2>Step 2</StepText2>
              <StepSubText2>
                Allocate New Joinee Numbers to Departments
              </StepSubText2>
            </StepBoxTwo>
          </StepBoxWrapper>
        </StepBox>

        <TableContainer>
          <TableHeading>Step 1 - Add Onboarding Schedule</TableHeading>
          <TableBox>
            {rows[0] ? (
              <DataGridTable
                fullWidth
                disableColumnMenu
                AutoSizeColumnsMode={false}
                disableSelectionOnClick
                columns={columns}
                rowSelection={false}
                rows={rows}
                hideFooter
                rowHeight={40}
                components={{
                  NoRowsOverlay: () => null,
                }}
              />
            ) : null}

            {isBoxVisible && (
              <Box
                sx={{
                  paddingX: "10px",
                  paddingBottom: "15px",
                  paddingTop: "5px",
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15%",
                }}
              >
                <Box sx={{ width: "25%" }}>
                  <CustomDatePicker
                    borderBgColor={"#c4c4c4 !important"}
                    type="month"
                    label="Joining Date"
                    value={selectedDate}
                    handleChange={(newDate) => setSelectedDate(newDate)}
                    minDate={dayjs().toDate()}
                    disabledDates={disabledDates}
                  />
                </Box>
                <Box sx={{ width: "23.33%" }}>
                  <CommonInput
                    placeholder=" Number of new Joiners"
                    name="search"
                    type="text"
                    value={noOfJoiners}
                    onChange={handleJoinersChange}
                    style={{
                      WebkitAppearance: "none",
                      appearance: "none",
                      margin: 0,
                    }}
                  />
                </Box>
                <Box sx={{ textAlign: "center" }}>
                  <PrimaryButton
                    disabled={!selectedDate || !noOfJoiners}
                    onClick={handleSubmit}
                  >
                    Submit
                  </PrimaryButton>
                </Box>
              </Box>
            )}
          </TableBox>

          <div style={{ marginTop: "10px" }}>
            <CustomButton
              bordercolor={variables.primaryColor}
              bgColor="none"
              textColor={variables.primaryColor}
              onClick={() => setIsBoxVisible(true)}
            >
              + Add Row
            </CustomButton>
          </div>
        </TableContainer>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginTop="10px"
        >
          <CustomButton
            textColor={variables.primaryColor}
            onClick={handleCancel}
            sx={{
              border: "none",
              outline: "none",
              backgroundColor: "#f4f5f8",
              "&:hover": { backgroundColor: "#f4f5f8", border: " none" },
            }}
          >
            Cancel
          </CustomButton>
          <PrimaryButton
            sx={{ width: "fit-content !important" }}
            onClick={() => navigate("/SMM/add-joining-plan-step2")}
          >
            Next
          </PrimaryButton>
        </Box>
      </BoxContainer>
      <SnackBar
        handleClose={() => setSnackbarOpen(false)}
        showSuccessAlert={snackbarOpen}
        responseCode={snackbarData}
        alertMessage={alertMessage}
      />
    </>
  );
};

export default AddJoiningPlan;
