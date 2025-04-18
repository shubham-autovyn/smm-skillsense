import { Backdrop, Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as shopReducer from "../../../../redux/Reducers/SMMShopReducer";
import useStyles from "../../../styles";
import useGetL0ToL3User from "../../hooks/getL0ToL3User";
import JoineeDetailsNew from "./components/JoineeDetails/JoineeDetailsNew";
import JoineeList from "./components/JoineeList/joineeList";
import JoineeNames from "./components/JoineeNames/JoineeName";

const L0ToL3New = () => {
  const [selectedCategory, setSelectedCategory] = useState("New Joinees");
  const [selectedStaffRow, setSelectedStaffRow] = useState({});
  const [isOperatorModal, setOperatorModal] = useState(false);
  const [showInfoBar, setShowInfoBar] = useState(false);
  const [numberOfStations, setNumberOfStations] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [expandedCategory, setExpandedCategory] = useState("New Joinees");

  const classes = useStyles();

  const shop = useSelector(shopReducer.getShop);
  const plant = useSelector(shopReducer.getPlant);
  const dataHierarchy = JSON.parse(localStorage.getItem("dataHierarchy"));

  const {
    fetchL0ToL3,
    dataL0ToL3,
    loading: loadingL0ToL3,
  } = useGetL0ToL3User();

  useEffect(() => {
    const fetchL0ToL3Data = async () => {
      await fetchL0ToL3(
        `shopID=${dataHierarchy.shopId}&groupName=${dataHierarchy?.group}&lineName=${dataHierarchy?.line}&areaName=${dataHierarchy?.area}`
      );
    };

    if (shop.id) {
      fetchL0ToL3Data();
    }
  }, [shop.id, fetchL0ToL3]);

  // Dummy data replacing API calls
  const dummyShop = { id: 1, name: "Shop A" };
  const dummyPlant = { id: 1, name: "Plant A" };
  const dummySupervisorAccessData = {
    roleAccess: [
      {
        shop_id: 1,
        group: "Group A",
        area: "Area A",
        line: "Line A",
      },
    ],
  };
  // const dataL0ToL3 = {
  //   response: {
  //     newJoinee: [
  //       {
  //         ID: 127,
  //         shopId: 40,
  //         staffID: "658178",
  //         areaName: "FINAL",
  //         trainingStatus: "Started",
  //         startDate: "30/03/2024",
  //         staffName: "MR. YASH",
  //         isTrainingOngoing: true,
  //         plannedMonth: "Feb",
  //         ExhaustedDay: 11,
  //         plannedDays: 19,
  //         stationName: "10L",
  //         description: "LT STRUT MTG.",
  //         currentLevel: 0,
  //         plannedLevel: 2,
  //         groupName: "A",
  //         lineName: "1",
  //         maru: "A",
  //       },
  //     ],
  //     existingOperator: [
  //       {
  //         ID: 127,
  //         shopId: 40,
  //         staffID: "653221",
  //         areaName: "FINAL",
  //         trainingStatus: "Started",
  //         startDate: "30/06/2024",
  //         staffName: "MR. YASH RAOooo",
  //         isTrainingOngoing: true,
  //         plannedMonth: "Feb",
  //         ExhaustedDay: 4,
  //         plannedDays: 19,
  //         stationName: "10L",
  //         description: "LT STRUT MTG.",
  //         currentLevel: 2,
  //         plannedLevel: 2,
  //         groupName: "A",
  //         lineName: "1",
  //         maru: null,
  //       },
  //     ],
  //   },
  // };

  const dummyAreaStationData = {
    stations: [{ stationName: "Station 1" }, { stationName: "Station 2" }],
  };

  const handleMapStationAndStartTraining = (selectedStations) => {
    if (selectedStations.length > 0) {
      setNumberOfStations(selectedStations.length);
    }
  };

  const handleCategorySelect = (name) => {
    setSelectedCategory(name);
    setSelectedStaffRow({});
  };

  const handleStaffClick = (staffData) => {
    setSelectedStaffRow(staffData);
  };

  const getStaffData = (filterStatus = false) => {
    if (!dataL0ToL3 || !dataL0ToL3?.response) {
      return [];
    }

    if (selectedCategory === "New Joinees") {
      if (filterStatus) {
        return dataL0ToL3?.response.newJoinee.filter(
          (data) => data.trainingStatus === "STARTED"
        );
      }
      return dataL0ToL3?.response.newJoinee;
    } else if (selectedCategory === "Existing Operators Multi-Skilling") {
      return dataL0ToL3?.response.existingOperator;
    }

    return [];
  };

  const handleStartTraining = () => {
    setOperatorModal(true);
  };

  const handleDeleteTraining = (data) => {
    setShowInfoBar(true);
    setTimeout(() => setShowInfoBar(false), 3000);
  };

  return (
    <>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loadingL0ToL3}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        className={`${classes["ojt-container-table-dimensions"]}`}
        sx={{
          display: "flex",
          margin: "0px !important",
          padding: "0rem 0rem 0rem 0rem !important",
        }}
      >
        <JoineeNames
          joineeData={dataL0ToL3?.response}
          handleCategorySelect={handleCategorySelect}
          handleStaffClick={handleStaffClick}
          selectedStaffData={selectedStaffRow}
          expandedCategory={expandedCategory}
          setExpandedCategory={(val) => setExpandedCategory(val)}
        />
        {selectedStaffRow?.staffID !== undefined ? (
          <JoineeDetailsNew
            operatorType={selectedCategory}
            joineeData={dataL0ToL3?.response}
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
      {/* <Alert
        open={showInfoBar}
        handleClose={() => setShowInfoBar(false)}
        message={
          errorMessage ||
          `Training started successfully for ${numberOfStations} operators.`
        }
        sx={{ height: "auto", whiteSpace: "pre-line" }}
      />
      {isOperatorModal && (
        <StartTrainingModal
          isOpen={isOperatorModal}
          onClose={() => setOperatorModal(false)}
          staffData={getStaffData(true)}
          isMapStation={selectedCategory === "New Joinees"}
          stations={dummyAreaStationData.stations}
          operators={dummyJobTrainingData.existingOperator.map((details) => ({
            staffName: details.staffName,
            staffID: details.staffID,
          }))}
          onMapStationAndStartTraining={handleMapStationAndStartTraining}
        />
      )} */}
    </>
  );
};

export default L0ToL3New;
