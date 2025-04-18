import { Box, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import useStyles from "../../../styles";
import JoineeList from "./components/JoineeList/JoineeList";
import JoineeNames from "./components/JoineeNames/JoineeNames";
import JoineeDetails from "./components/JoineeDetails/JoineeDetails";
import StartTrainingModal from "./components/StartTrainingModal";
import { useDispatch, useSelector } from "react-redux";
import { getPlant, getShop } from "../../../../redux/Reducers/SMMShopReducer";
import {
  deleteTrainingApiAction,
  fetchAllAreaStationsData,
  fetchExistingOperatorsData,
  fetchTrainingDetailsData,
  saveStationDataApi,
} from "../../../../redux/Actions/JobTrainingAction";
import {
  getAreaStationsData,
  getAreaStationsDataLoading,
  getDeleteTrainingData,
  getExistingOperatorsData,
  getSaveStationData,
  getTrainingDetailsData,
  getTrainingDetailsLoading,
} from "../../../../redux/Reducers/SMMJobTrainingReducer";
import {
  setSaveStationDataAction,
  setTrainingDetailsLoading,
} from "../../../../redux/ActionCreator/JobTrainingActionCreator";
import { getSupervisorAccessData } from "../../../../redux/Reducers/SMMRoleAccessReducer";
import {
  setAlertMessage,
  setIsAlert,
} from "../../../../redux/ActionCreator/AlertActionCreator";
import Alert from "../../../../components/CustomSnackbar/SnackBar";
import { getCompleteTrainingData } from "../../../../redux/Reducers/SMMJobTrainingReducer";

const L0ToL3 = () => {
  const [selectedCategory, setSelectedCategory] = useState("New Joinees");
  const [selectedStaffRow, setSelectedStaffRow] = useState({});
  const [isOperatorModal, setOperatorModal] = useState(false);
  const [showInfoBar, setShowInfoBar] = useState(false);
  const [numberOfStations, setNumberOfStations] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const classes = useStyles();
  const dispatch = useDispatch();

  const shop = useSelector(getShop);
  const plant = useSelector(getPlant);
  const jobTrainingData = useSelector(getTrainingDetailsData);
  const loadingTrainingData = useSelector(getTrainingDetailsLoading);
  const areaStationData = useSelector(getAreaStationsData);
  const loadingAreaStations = useSelector(getAreaStationsDataLoading);
  const stationSubmit = useSelector(getSaveStationData);
  const supervisorAccessData = useSelector(getSupervisorAccessData);
  const deleteTraining = useSelector(getDeleteTrainingData);
  const existingOperatorData = useSelector(getExistingOperatorsData);
  const completeTrainingData = useSelector(getCompleteTrainingData);
  const [expandedCategory, setExpandedCategory] = useState("New Joinees");
  useEffect(() => {
    if (
      (shop?.id &&
        Object.keys(supervisorAccessData).length &&
        supervisorAccessData?.roleAccess[0]?.shop_id === shop?.id) ||
      deleteTraining
    ) {
      fetchTrainingData();
    } else {
      dispatch(setTrainingDetailsLoading(true));
      dispatch(setIsAlert(true));
      dispatch(
        setAlertMessage("You don't have required access in the role master")
      );
    }
  }, [shop, deleteTraining]);
  useEffect(() => {
    if (completeTrainingData?.message === "Success") {
      setSelectedCategory("New Joinees");
      setSelectedStaffRow({});
      fetchTrainingData();
    }
  }, [completeTrainingData]);

  useEffect(() => {
    if (
      isOperatorModal &&
      shop?.id &&
      Object.keys(supervisorAccessData).length &&
      supervisorAccessData?.roleAccess[0]?.shop_id === shop?.id
    ) {
      const payload = {
        shop_id: shop.id,
        group: supervisorAccessData?.roleAccess[0]?.group,
        area: supervisorAccessData?.roleAccess[0]?.area,
        line: supervisorAccessData?.roleAccess[0]?.line,
        type: "NOT_UNDER_TRAINING",
      };
      dispatch(fetchAllAreaStationsData(payload));
    }
  }, [isOperatorModal]);

  useEffect(() => {
    if (
      isOperatorModal &&
      selectedCategory !== "New Joinees" &&
      shop?.id &&
      Object.keys(supervisorAccessData).length &&
      supervisorAccessData?.roleAccess[0]?.shop_id === shop?.id
    ) {
      const payload = {
        shop_id: shop.id,
        group: supervisorAccessData?.roleAccess[0]?.group,
        area: supervisorAccessData?.roleAccess[0]?.area,
        line: supervisorAccessData?.roleAccess[0]?.line,
      };
      dispatch(fetchExistingOperatorsData(payload));
    }
  }, [isOperatorModal]);

  useEffect(() => {
    if (stationSubmit && stationSubmit.responseCode === "SMM200") {
      if (stationSubmit?.errors?.length) {
        const messageArr = stationSubmit?.errors
          ?.toString()
          ?.split(",")
          ?.join("\n");
        setErrorMessage(messageArr);
      }
      setShowInfoBar(true);
      setTimeout(() => {
        setShowInfoBar(false);
        setErrorMessage("");
        fetchTrainingData();
      }, 3000);
      dispatch(setSaveStationDataAction({}));
    }
  }, [stationSubmit]);

  useEffect(() => {
    if (jobTrainingData && selectedCategory === "New Joinees") {
      const data = jobTrainingData.newJoinee?.filter(
        (data) => data.staffID === selectedStaffRow?.staffID
      );

      if (data && data.length > 0) {
        setSelectedStaffRow(data[0]);
      }
    }
  }, [jobTrainingData, selectedCategory, selectedStaffRow]);

  const fetchTrainingData = () => {
    const payload = {
      shop_id: shop?.id,
      groupName: supervisorAccessData?.roleAccess[0]?.group,
      areaName: supervisorAccessData?.roleAccess[0]?.area,
      lineName: supervisorAccessData?.roleAccess[0]?.line,
    };
    dispatch(fetchTrainingDetailsData(payload));
  };

  const handleMapStationAndStartTraining = (selectedStations) => {
    if (
      shop?.id &&
      selectedStations.length > 0 &&
      Object.keys(supervisorAccessData).length &&
      supervisorAccessData?.roleAccess[0]?.shop_id === shop?.id
    ) {
      const payload = {
        shopID: shop.id,
        group: supervisorAccessData?.roleAccess[0]?.group,
        area: supervisorAccessData?.roleAccess[0]?.area,
        line: supervisorAccessData?.roleAccess[0]?.line,
        trainingLevel: "3",
        traineeType:
          selectedCategory === "New Joinees" ? "New joinee" : "Existing",
        stationStaff: selectedStations
          .filter((station) => station.staffID)
          .map((station) => ({
            staff_id: station.staffID,
            station: `${station.stationName}`,
          })),
      };
      dispatch(saveStationDataApi(payload));
      const numberOfSelectedStations = selectedStations.filter(
        (station) => station.staffID
      ).length;
      setNumberOfStations(numberOfSelectedStations);
    }
  };
  const handleCategorySelect = (name) => {
    setSelectedCategory(name);
    setSelectedStaffRow({});
    fetchTrainingData();
  };

  const handleStaffClick = (staffData) => {
    setSelectedStaffRow(staffData);
  };

  const getStaffData = (filterStatus = false) => {
    if (selectedCategory === "New Joinees") {
      if (filterStatus) {
        if (selectedStaffRow?.trainingStatus === "CREATED") {
          return jobTrainingData?.newJoinee?.filter(
            (data) => data.staffID === selectedStaffRow?.staffID
          );
        }
        return (
          jobTrainingData?.newJoinee?.filter(
            (data) => data.trainingStatus === "CREATED"
          ) || []
        );
      }
      return jobTrainingData?.newJoinee || [];
    } else if (selectedCategory === "Existing Operators Multi-Skilling") {
      return jobTrainingData?.existingOperator || [];
    }
    return [];
  };
  const handleStartTraining = () => {
    setOperatorModal(true);
  };
  const handleDeleteTraining = (data) => {
    const payload = {
      shop_id: shop?.id?.toString(),
      plant_id: plant?.id?.toString(),
      group_name: supervisorAccessData?.roleAccess[0]?.group,
      line_name: supervisorAccessData?.roleAccess[0]?.line,
      area_name: supervisorAccessData?.roleAccess[0]?.area,
      ojt_id: data?.ID,
      operation: selectedCategory === "New Joinees" ? "RESET" : "DELETE",
      staff_id: data?.staffID,
      station_name: data?.stationName,
    };
    dispatch(deleteTrainingApiAction(payload));
    dispatch(setIsAlert(true));
    dispatch(setAlertMessage("Training Cancelled successfully."));
  };
  return (
    <>
      {loadingTrainingData ? (
        <Skeleton
          className={`${classes["repository-table-dimensions"]}`}
          animation="wave"
          variant="rectangular"
        />
      ) : (
        <Box
          className={`${classes["ojt-container-table-dimensions"]}`}
          sx={{
            display: "flex",
            margin:"0px !important",
            padding: "0rem 0rem 0rem 0rem !important",
          }}
        >
          <JoineeNames
            joineeData={jobTrainingData}
            handleCategorySelect={handleCategorySelect}
            handleStaffClick={handleStaffClick}
            selectedStaffData={selectedStaffRow}
            expandedCategory={expandedCategory}
            setExpandedCategory={(val)=>setExpandedCategory(val)}
          />
          {selectedStaffRow?.staffID !== undefined ? (
            <JoineeDetails
              operatorType={selectedCategory}
              joineeData={jobTrainingData}
              selectedStaffRow={selectedStaffRow}
              handleStartTraining={handleStartTraining}
            />
          ) : (
            <JoineeList
              staffData={getStaffData()}
              selectedCategory={selectedCategory}
              handleStartTraining={handleStartTraining}
              handleCancelTraining={handleDeleteTraining}
            />
          )}
        </Box>
      )}
      <Alert
        open={showInfoBar}
        handleClose={() => setShowInfoBar(false)}
        message={
          errorMessage ||
          `Training started successfully for ${numberOfStations} operators.`
        }
        sx={{
          height: "auto",
          whiteSpace: "pre-line",
        }}
      />
      {isOperatorModal && (
        <StartTrainingModal
          isOpen={isOperatorModal}
          onClose={() => setOperatorModal(false)}
          staffData={getStaffData(true)}
          isMapStation={selectedCategory === "New Joinees"}
          stations={areaStationData?.stations || []}
          operators={
            existingOperatorData?.staffDetails?.map((details) => ({
              staffName: details.staffName,
              staffID: details.staffID,
            })) || []
          }
          onMapStationAndStartTraining={handleMapStationAndStartTraining}
        />
      )}
    </>
  );
};

export default L0ToL3;
