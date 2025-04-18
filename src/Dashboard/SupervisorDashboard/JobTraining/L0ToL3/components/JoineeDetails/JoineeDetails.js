import { Box, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CustomAccordion from "../../../../../../components/Accordion/CustomAccordion";
import CustomStepper from "../../../../../../components/Stepper/CustomStepper";
import StaffDetailsCard from "./StaffDetailsCard";
import L1ToL2Training from "./TrainingSteps/L1ToL2Training";
import L2ToL3Training from "./TrainingSteps/L2ToL3Training/L2ToL3Training";
import MaruAAR from "../../../../../../assets/icons/MaruAAR.svg";
import NonMaru from "../../../../../../assets/icons/NonMaru.svg";
import MaruAR from "../../../../../../assets/icons/MaruAR.svg";
import MaruA from "../../../../../../assets/icons/MaruA.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOjtTestData,
  saveOjtTestData,
  removeSaveOjtTestData,
} from "../../../../../../redux/Actions/JobTrainingAction";
import {
  getOjtTestData,
  getOjtTestDataLoading,
  getOjtTestSubmitDataLoading,
  getOjtTestSubmitData,
} from "../../../../../../redux/Reducers/SMMJobTrainingReducer";
import useStyles from "../../../../../styles";
import { getShop } from "../../../../../../redux/Reducers/SMMShopReducer";
import { Grey10 } from "../../../../../../../Utilities/colors";
import SecondaryButton from "../../../../../../../Utilities/Buttons/SecondaryButton/SecondaryButton";
import { getUser } from "../../../../../../../../services/Authorization/AuthorizationService";
import { setNavigateNextTrainingData } from "../../../../../../redux/ActionCreator/JobTrainingActionCreator";
const JoineeDetails = ({
  joineeData,
  selectedStaffRow,
  handleStartTraining,
  operatorType,
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [prevCurrentLevel, setPrevCurrentLevel] = useState(0);
  const testData = useSelector(getOjtTestData);
  const testDataLoading = useSelector(getOjtTestDataLoading);
  const submitDataLoading = useSelector(getOjtTestSubmitDataLoading);
  const submitData = useSelector(getOjtTestSubmitData);
  const [activeStep, setActiveStep] = useState(0);
  const shop = useSelector(getShop);
  useEffect(() => {
    if (testData[0]?.currentLevel !== undefined) {
      setPrevCurrentLevel(testData[0]?.currentLevel);
    } else if (activeStep === 0) {
      setPrevCurrentLevel(0);
    }
  }, [testData]);
  useEffect(() => {
    if (activeStep === 0) {
      fetchTestData();
    } else {
      setActiveStep(0);
    }
    //  console.log("Selected Staff Row",selectedStaffRow);
  }, [selectedStaffRow]);
  useEffect(() => {
    dispatch(setNavigateNextTrainingData({}));
    if (!testDataLoading) {
      fetchTestData();
    }
    // console.log("Active Step");
  }, [activeStep]);

  useEffect(() => {
    if (shop?.id && submitData?.message === "Success") {
      removeSaveOjtTestData({});
      fetchTestData();
    }
  }, [submitData]);
  const fetchTestData = () => {
    if (shop?.id) {
      const payload = {
        shop_id: shop?.id,
        staff_id: selectedStaffRow?.staffID,
        level: activeStep === 0 ? "L1" : activeStep === 1 ? "L2" : "L3",
        station_name: selectedStaffRow?.stationName,
        ojt_training_id: selectedStaffRow?.ID,
      };
      dispatch(fetchOjtTestData(payload));
    }
  };
  const handleSubmitTest = (data, level, fileNamePath = {}) => {
    if (shop?.id) {
      var cred = getUser()?.username.split("\\");
      if (cred) {
        let userId;

        if (cred.length === 1) {
          userId = cred[0];
        } else {
          userId = cred[0] + "%5C" + cred[1];
        }
        const payload = {
          levelType: level,
          testResponse: Object.values(data)?.map((item) => {
            return {
              Question: item?.question,
              OK: item?.radioInput === "OK" ? true : undefined,
              NA: item?.radioInput === "NA" ? true : undefined,
              NG: item?.radioInput === "NG" ? true : undefined,
              "Observation remarks": item?.onbservation,
            };
          }),
          filePath: fileNamePath?.filePath,
          fileName: fileNamePath?.fileName,
          testID:
            Object.keys(testData).length !== 0
              ? testData[0]?.testID
              : undefined,
          OJTTrainingID: selectedStaffRow?.ID,
          userID: userId,
          shopName: shop?.shop_name,
        };
        dispatch(saveOjtTestData(payload));
      }
    }
  };
  const handleNext = (level) => {
    if (activeStep < 2) {
      setActiveStep((prev) => prev + 1);
    }
  };
  const handlePrev = () => {
    setActiveStep((prev) => prev - 1);
  };
  const getMaruIcon = (maruType) => {
    switch (maruType) {
      case "A":
        return <img src={MaruA} alt="Maru A" width={18} height={16} />;
      case "A/AR":
        return <img src={MaruAAR} alt="Maru A/AR" width={18} height={16} />;
      case "AR":
        return <img src={MaruAR} alt="Maru AR" width={18} height={16} />;
      default:
        return <img src={NonMaru} alt="Non Maru" width={18} height={16} />;
    }
  };
  const getStepTitle = (step, currentLevel) => {
    switch (step) {
      case 0:
        return currentLevel === 0 ? "In Progress" : "Completed";
      case 1:
        return currentLevel === 0
          ? "Not Started"
          : currentLevel >= 2
          ? "Completed"
          : "In Progress";
      case 2:
        return currentLevel <= 1
          ? "Not Started"
          : currentLevel === 3
          ? "OJT Completion Pending"
          : "In Progress";
      default:
        return "Not Started";
    }
  };
  const steps = [
    {
      title: "L0 - L1",
      subtitle: getStepTitle(0, prevCurrentLevel),
    },
    {
      title: "L1 - L2",
      subtitle: getStepTitle(1, prevCurrentLevel),
    },
    {
      title: "L2 - L3",
      subtitle: getStepTitle(2, prevCurrentLevel),
    },
  ];

  const RenderSteps = ({ step }) => {
    switch (step) {
      case 0:
        return (
          <L1ToL2Training
            handleNext={handleNext}
            testData={testData}
            handleSubmitTest={handleSubmitTest}
            level="L1"
            isMaru={undefined}
            selectedStaffRow={selectedStaffRow}
          />
        );
      case 1:
        return (
          <L1ToL2Training
            handlePrev={handlePrev}
            handleNext={handleNext}
            testData={testData}
            handleSubmitTest={handleSubmitTest}
            level="L2"
            isMaru={selectedStaffRow?.maru}
            selectedStaffRow={selectedStaffRow}
          />
        );
      case 2:
        return (
          <L2ToL3Training
            handlePrev={handlePrev}
            handleNext={handleNext}
            testData={testData}
            handleSubmitTest={handleSubmitTest}
            level="L3"
            isMaru={selectedStaffRow?.maru}
            selectedStaffRow={selectedStaffRow}
          />
        );
      default:
        return null;
    }
  };
  const allStaff = [
    ...(joineeData?.newJoinee?.map((item) => ({
      staffName: item.staffName,
      staffID: item.staffID,
      processStation: (
        <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {getMaruIcon(item?.maru)}
          {item?.stationName ? `${item.stationName} | ` : ""}
          {item?.description || ""}
        </Box>
      ),
      currentLevel: item?.currentLevel,
      startDate: item?.startDate,
      ExhaustedDay: item?.ExhaustedDay,
      plannedDays: item?.plannedDays,
    })) || []),
    ...(joineeData?.existingOperator?.map((item) => ({
      staffName: item.staffName,
      staffID: item.staffID,
      processStation: (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {getMaruIcon(item?.maru)}
          {item?.stationName ? `${item.stationName} | ` : ""}
          {item?.description || ""}
        </Box>
      ),
      currentLevel: item.currentLevel,
      startDate: item.startDate,
      ExhaustedDay: item.ExhaustedDay,
      plannedDays: item.plannedDays,
    })) || []),
  ];
  const selectedStaff = allStaff.find(
    (staff) => staff.staffID === selectedStaffRow?.staffID
  );
  return (
    <>
      {selectedStaff && selectedStaffRow?.trainingStatus === "CREATED" ? (
        <Box
          sx={{
            width: "80%",
            borderRadius: "8px",
            border: "1px solid var(--Grey-20, #E6E9F0)",
            ml: 2,
            mt: 2,
          }}
        >
          <Box
            sx={{
              p: "0.8rem",
              height: "12%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              top: 0,
              background: Grey10,
            }}
          >
            <Typography variant="h4">
              {selectedStaff
                ? `${selectedStaff.staffName} | ${selectedStaff.staffID}`
                : "Staff Details"}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "50%",
                height: "50%",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                ml: 18,
              }}
            >
              <Box sx={{ mb: 1, ml: 11 }}>
                <Typography variant="h4">No Process Station Mapped</Typography>
              </Box>
              <Box sx={{ mb: 1 }}>
                <Typography variant="body1">
                  {" "}
                  To start OJT, select a process station on which you want to
                  provide training.
                </Typography>
              </Box>
              <Box sx={{ width: "200px", ml: 8 }}>
                <SecondaryButton type="button" onClick={handleStartTraining}>
                  {" "}
                  Map Station to Start Training
                </SecondaryButton>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            overflowY: "scroll",
            width: "80%",
            p: 2,
            paddingTop: "0px !important",
            height: "calc(100%) !important",
          }}
          className={` ${classes["master-table"]} ${classes["ojt-container-table-dimensions"]}`}
        >
          <Box>
            <CustomAccordion
              titleComponent={
                <Typography variant="h4">
                  {selectedStaff
                    ? `${selectedStaff.staffName} | ${selectedStaff.staffID}`
                    : "Staff Details"}
                </Typography>
              }
            >
              <StaffDetailsCard
                selectedStaff={selectedStaff}
                processStation={selectedStaff?.processStation}
                currentLevel={prevCurrentLevel}
                startDate={selectedStaff?.startDate}
                ExhaustedDay={selectedStaff?.ExhaustedDay}
                plannedDays={selectedStaff?.plannedDays}
              />
            </CustomAccordion>
          </Box>
          <Box>
            <CustomStepper
              steps={steps}
              activeStep={activeStep}
              disableLastStep={false}
            />
          </Box>

          <Box>
            {testDataLoading ? (
              <Skeleton
                className={`${classes["master-table"]}  ${classes["delivery-table-info-dimensions"]}`}
                animation="wave"
                variant="rectangular"
              />
            ) : (
              <Box
                sx={{ overflowY: "scroll", marginTop: "1rem !important" }}
                className={`${classes["master-table"]}  ${classes["ojt-table-dimensions"]}`}
              >
                <RenderSteps step={activeStep} />
              </Box>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};
export default JoineeDetails;
