import { Backdrop, Box, CircularProgress } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../../../../Utilities/Buttons/PrimaryButton/PrimaryButton";
import CustomButton from "../../../../components/Button/SecondaryButtonWithIcon";
import SnackBar from "../../../../components/Snackbar/Snackbar";
import { variables } from "../../../../styles/theme";
import useFetchAllocationPlanDetails from "../../hooks/fetchAllocationPlanDetails";
import useFetchSaveAllocationPlan from "../../hooks/saveAllocationPlan";
import {
  BoxContainer,
  BoxHeader,
  BoxHeading,
  BoxSubText,
  BoxText,
  StepBox,
  StepBoxOne,
  StepBoxTwo,
  StepBoxWrapper,
  StepSubText,
  StepSubText2,
  StepText,
  StepText2,
  TableContainer,
  TableHeading,
} from "./addjoiningplan2.style";
import NewJoinerTable from "./DataTable/newJoinerTable";

const AddJoiningPlanStepTwo = () => {
  const navigate = useNavigate();

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [responseCode, setResponseCode] = useState(null);
  const [buttonDisable, setButtonDisable] = useState(null);

  const {
    dataGraph: allocationData,
    fetchAllocationPlanDetails: fetchAllocationPlanDetail,
  } = useFetchAllocationPlanDetails();

  const {
    dataGraph: saveAllocationData,
    fetchSaveAllocationPlan: fetchSaveAllocationPlanDetail,
  } = useFetchSaveAllocationPlan();

  const [saveAllocationPayload, setSaveAllocationPayload] = useState();

  useEffect(() => {
    setSaveAllocationPayload({
      response: allocationData,
    });
  }, [allocationData]);

  const fetchAllocationPlanDetails = useCallback(async () => {
    setLoading(true);
    try {
      const allocationParams = "plantId=7";
      await fetchAllocationPlanDetail(allocationParams);
    } catch (err) {
      console.error("Error fetching basic requirements:", err);
    } finally {
      setLoading(false);
    }
  }, [fetchAllocationPlanDetail]);

  useEffect(() => {
    fetchAllocationPlanDetails();
  }, []);

  const fetchSaveAllocationPlan = async () => {
    setLoading(true);
    try {
      if (saveAllocationPayload !== null) {
        const responseData = await fetchSaveAllocationPlanDetail(
          saveAllocationPayload
        );
        if (responseData?.data?.responseCode === 200) {
          setAlertMessage(responseData?.data?.message);
          setResponseCode(responseData?.data?.responseCode);
          window.open(responseData?.data?.response.sheetUrl, "_blank");
          setTimeout(() => {
            navigate(-2);
          }, 3000);
        } else {
          setAlertMessage(responseData?.data?.message);
          setResponseCode(responseData?.data?.responseCode);
        }
        setShowSuccessAlert(true);
      }
    } catch (err) {
      console.error("Error fetching saveAllocationPlan:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    const [day, month, year] = date.split("-");
    const formattedDate = `${month}-${day}-${year}`;
    return new Date(formattedDate);
  };

  const updateDataWithExpanded = (data) => {
    if (!data) return [];
    return data.map((node) => ({
      ...node,
      data: node.data.sort(
        (a, b) => formatDate(b.date).getTime() - formatDate(a.date).getTime()
      ),
      children: node.children ? updateDataWithExpanded(node.children) : null,
      nodeId: crypto.randomUUID(),
    }));
  };

  const updatedTableData = useMemo(
    () => updateDataWithExpanded(allocationData),
    [allocationData]
  );

  const handleDataChange = (updatedData) => {
    const payload = {
      response: updatedData,
    };
    setSaveAllocationPayload(payload);
  };
  return (
    <>
      <BoxContainer>
        <BoxHeader>
          <BoxText>Manpower Planning</BoxText>
          <BoxSubText>
            {"/"} {""}Add Joining Plan
          </BoxSubText>
        </BoxHeader>
        <BoxHeading>Add Joining Plan</BoxHeading>
        <StepBox>
          <StepBoxWrapper>
            <StepBoxOne>
              <StepText2>Step 1</StepText2>
              <StepSubText2>Add Onboarding Schedule</StepSubText2>
            </StepBoxOne>
          </StepBoxWrapper>

          <StepBoxTwo>
            <StepText>Step 2</StepText>
            <StepSubText>
              Allocate New Joinee Numbers to Departments
            </StepSubText>
          </StepBoxTwo>
        </StepBox>
        <TableContainer>
          <TableHeading>
            Step 2 - Recommended Allocation of New Joinee Numbers to Departments
          </TableHeading>
          <NewJoinerTable
            allocationData={updatedTableData}
            onDataChange={handleDataChange}
            setButtonDisable={setButtonDisable}
          ></NewJoinerTable>
        </TableContainer>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          marginTop={"10px"}
        >
          <CustomButton
            textColor={variables.primaryColor}
            onClick={() => navigate(-1)}
            sx={{
              border: "none",
              outline: "none",
              backgroundColor: "#f4f5f8",
              "&:hover": { backgroundColor: "#f4f5f8", border: " none" },
            }}
          >
            Cancel
          </CustomButton>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <CustomButton
              bordercolor={variables.primaryColor}
              bgColor="none"
              textColor={variables.primaryColor}
              onClick={() => navigate(-1)}
            >
              Previous
            </CustomButton>
            <PrimaryButton
              disabled={buttonDisable}
              onClick={fetchSaveAllocationPlan}
            >
              Submit Joining Plan
            </PrimaryButton>
          </div>
        </Box>
        <SnackBar
          handleClose={() => setShowSuccessAlert(false)}
          showSuccessAlert={showSuccessAlert}
          responseCode={responseCode}
          alertMessage={alertMessage}
        />
        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </BoxContainer>
    </>
  );
};
export default AddJoiningPlanStepTwo;
