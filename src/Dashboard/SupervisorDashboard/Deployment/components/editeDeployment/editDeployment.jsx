import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Backdrop,
  Box,
  CircularProgress,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SixDot from "../../../../../assets/svg/six-dot.svg";
import * as shopReducer from "../../../../../redux/Reducers/SMMShopReducer";

import BackIcon from "../../../../../assets/icons/BackIcon.svg";

import SecondaryButton from "../../../../../../Utilities/Buttons/SecondaryButton/SecondaryButton";
import PrimaryButton from "../../../../../components/PrimaryButton/PrimaryButton";
import getInitialName from "../../../../../utils/getInitailName";
import useDeploymentDetails from "../../../hooks/fetchDeploymentDetails";
import useEditDeployment from "../../../hooks/getEditDeployment";
import useSwipeEditDeployment from "../../../hooks/swipeEditDeployment";
import { NavigateHeading } from "../SetUpDeployment/SetUpDeployment.style";
import SwipeDialog from "./components/swipeDialog/swipeDialog";
import {
  AdditionalCardBox,
  AdditionalOperatorsInfo,
  AdditionalOperatorsTotal,
  AdditionalOperatorsTotalSpan,
  AssignedP,
  AssignedSpan,
  ButtonGroup,
  CardBox,
  CardName,
  FirstHeading,
  FirstHeadingP,
  FirstHeadingSpan,
  LabourBox,
  MainContainer,
  MainSection,
  OperatorId,
  OperatorName,
  OpsInfo,
  ProcessStation,
  RelieverCardBox,
  SurplusInfo,
  SurplusP,
  SurplusSpan,
  TableBoxes,
  TableFirstBox,
  TableFirstCard,
  TableMain,
  TagTrainee,
  TopHeading,
  WorkerCardData,
  WorkersCard,
} from "./editDeployment.styles";

const EditDeployment = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const plant = useSelector(shopReducer.getPlant);
  const shop = useSelector(shopReducer.getShop);
  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState([]);
  const [section, setSection] = useState([]);
  const [newData, setNewData] = useState([]);
  const supervisorHierarchy = JSON.parse(localStorage.getItem("dataHierarchy"));
  const [severity, setSeverity] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState("");
  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };
  const supervisorId = localStorage.getItem("supervisorId");

  const { dataDeploymentDetails, fetchDeploymentDetails, loading } =
    useDeploymentDetails();
  const {
    dataSwipeDeployment,
    fetchSwipeDeployment,
    loading: swipeLoading,
  } = useSwipeEditDeployment();
  const {
    dataEditDeployment,
    fetchEditDeployment,
    loading: editLoading,
  } = useEditDeployment();

  const formatDate = (date) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  const currentDate = formatDate(new Date());
  let shiftTiming = "";

  switch (supervisorHierarchy?.group) {
    case "A":
      shiftTiming = "6:30 AM-3:15 PM";
      break;
    case "B":
      shiftTiming = "3:15 PM-12:00 AM";
      break;
    case "C":
      shiftTiming = "12:15 AM-6:15 AM";
      break;
    default:
      shiftTiming = "";
      break;
  }

  useEffect(() => {
    getDeploymentDetails();
  }, []);

  const getDeploymentDetails = async () => {
    try {
      await fetchDeploymentDetails(`supervisorId=${supervisorId}`);
    } catch (error) {
    } finally {
      if (dataDeploymentDetails?.message === "Success") {
        setOpenAlert(false);
      } else {
        setMessage("Something went wrong!");
        setSeverity("warning");
        setOpenAlert(true);
      }
    }
  };

  const [boxOneData, setBoxOneData] = useState([]);

  // const handleCloseDialog = () => setOpenDialog(false);
  const handleCloseDialog = () => {
    setSelected([]);
    setSection([]);
    setOpenDialog(false);
  };
  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (dataDeploymentDetails?.response) {
      setBoxOneData(dataDeploymentDetails.response);
      const processedData =
        dataDeploymentDetails?.response?.totalStation?.flatMap((station) =>
          station?.cards?.map((card) => card.staffId)
        ) || [];
      const processedOneData =
        dataDeploymentDetails?.response?.absRelStations?.flatMap((station) =>
          station?.cards?.map((card) => card.staffId)
        ) || [];
      const processedSurplus =
        dataDeploymentDetails?.response?.surplusOperators?.map(
          (card) => card.staffId
        ) || [];
      const processedAdditional =
        dataDeploymentDetails?.response?.additionalOperators?.map(
          (card) => card.staffId
        ) || [];

      setNewData([
        ...processedData,
        ...processedOneData,
        ...processedSurplus,
        ...processedAdditional,
      ]);
    }
  }, [dataDeploymentDetails]);

  useEffect(() => {
    if (newData.length > 0 && selected.length === 1) {
      const validIds = new Set([
        selected[0]?.staffId,
        ...(dataEditDeployment?.response?.map((item) => item.staffId) || []),
      ]);
      const filteredStaffIds = newData.filter((id) => validIds.has(id));

      setNewData(filteredStaffIds);
    }
    if (selected.length === 0) {
      setNewData([
        ...(dataDeploymentDetails?.response?.totalStation?.flatMap((station) =>
          station?.cards?.map((card) => card.staffId)
        ) || []),
        ...(dataDeploymentDetails?.response?.absRelStations?.flatMap(
          (station) => station?.cards?.map((card) => card.staffId)
        ) || []),
        ...(dataDeploymentDetails?.response?.surplusOperators?.map(
          (card) => card.staffId
        ) || []),
        ...(dataDeploymentDetails?.response?.additionalOperators?.map(
          (card) => card.staffId
        ) || []),
      ]);
    }
  }, [dataEditDeployment, selected]);

  const handleCardClick = async (section, card) => {
    if (selected.length === 0) {
      try {
        await fetchEditDeployment(
          `supervisorId=${supervisorId}&operatorId=${
            card?.staffId || ""
          }&operatorStation=${section?.stationName}`
        );
      } catch (error) {
        console.error("Error fetching edit deployment:", error);
      }
    }

    const isCardAlreadySelected = selected.some(
      (selectedCard) => selectedCard.staffId === card.staffId
    );

    if (!isCardAlreadySelected) {
      setSelected((prev) => [...prev, card]);
      setSection((prev) => [...prev, section]);
    }
    if (isCardAlreadySelected) {
      setSelected([]);
      setSection([]);
    }

    if (selected.length === 1) {
      setOpenDialog(true);
    }
  };

  const handleSwap = async () => {
    if (selected.length !== 2) {
      console.error("Swap requires exactly 2 selections");
      return;
    }

    const [first, second] = selected;

    const swipePayload = {
      plantId: plant.id,
      shopId: shop.id,
      groupName: supervisorHierarchy?.group || null,
      lineName: supervisorHierarchy?.line || null,
      areaName: supervisorHierarchy?.area || null,
      operatorId1: first.staffId,
      station1: section[0].stationName,
      stationDescription1: section[0].stationDescription,
      maruAAr1: section[0].maruAAR,
      operatorId2: second.staffId,
      station2: section[1].stationName,
      stationDescription2: section[1].stationDescription,
      maruAAr2: section[1].maruAAR,
    };

    if (selected[0]?.staffId !== selected[1]?.staffId) {
      try {
        await fetchSwipeDeployment(swipePayload);
        setSelected([]);
        setSection([]);
        setOpenDialog(false);
      } catch (error) {
        console.error("Swap failed:", error);
      } finally {
        getDeploymentDetails();
        if (dataSwipeDeployment?.message === "Success") {
          setMessage("Swipe Successfully ");
          setSeverity("success");
          setOpenAlert(true);
        } else {
          setMessage("Something went wrong!");
          setSeverity("warning");
          setOpenAlert(true);
        }
      }
    }
  };

  return (
    <>
      <Box sx={{ width: "100%", padding: "0 50px" }}>
        <NavigateHeading
          style={{
            marginLeft: "20px",
            marginTop: "10px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <img
            src={BackIcon}
            alt="icon"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(-1)}
          />
          <TopHeading>Edit Today's Deployment</TopHeading>
        </NavigateHeading>
        <MainContainer>
          <FirstHeading>
            <FirstHeadingP>
              Line-{supervisorHierarchy?.line} -{supervisorHierarchy?.shopName}{" "}
              - Shift-{supervisorHierarchy?.group}
              <FirstHeadingSpan>
                {" "}
                {currentDate}, {shiftTiming}
              </FirstHeadingSpan>
            </FirstHeadingP>
          </FirstHeading>
          <TableMain className="container">
            <TableBoxes>
              <Box className="box-wrapper-firstRow">
                <TableFirstBox>
                  {boxOneData?.totalStation?.map((section, sectionIndex) => (
                    <TableFirstCard
                      key={`totalStation-${sectionIndex}`}
                      style={{
                        borderLeft: section?.cards?.some(
                          (card) => card.staffId === selected[0]?.staffId
                        )
                          ? "3px solid #4549a5"
                          : "3px solid #ccc",
                      }}
                    >
                      <WorkerCardData>
                        <WorkersCard
                          style={{
                            backgroundColor: section?.maruAAR
                              ? "none"
                              : "#7a7c7e",
                          }}
                        >
                          {section.maruAAR}
                        </WorkersCard>
                        <ProcessStation className="process-station">
                          {section?.stationName} | {section?.stationDescription}
                        </ProcessStation>
                      </WorkerCardData>

                      {section?.cards
                        .sort((a, b) => a.isTrainee - b.isTrainee)
                        ?.map((card, cardIndex) => {
                          const isCardEnabled =
                            newData.includes(card.staffId) || "";

                          return (
                            <>
                              <MainSection>
                                <div>
                                  {!card.isTrainee && (
                                    <img src={SixDot} alt="SixDot" />
                                  )}
                                </div>
                                <CardBox
                                  key={cardIndex}
                                  onClick={() =>
                                    isCardEnabled &&
                                    handleCardClick(section, card, cardIndex)
                                  }
                                  sx={{
                                    transform:
                                      selected[0]?.staffId === card?.staffId
                                        ? "rotate(-5deg)"
                                        : "none",
                                    backgroundColor: card.absent
                                      ? "#efd9cc"
                                      : isCardEnabled
                                      ? "#dff6dd"
                                      : "#f0f0f0",
                                    border: card.absent
                                      ? "1px solid #d83b01"
                                      : isCardEnabled
                                      ? "1px dashed #ccc"
                                      : "1px solid #30c030",
                                    cursor: isCardEnabled
                                      ? "pointer"
                                      : "not-allowed",
                                    opacity: isCardEnabled ? 1 : 0.3,
                                    pointerEvents: isCardEnabled
                                      ? "auto"
                                      : "none",
                                  }}
                                >
                                  <CardName style={{ background: "#58a55c" }}>
                                    {getInitialName(card?.staffName)}
                                  </CardName>
                                  <Box className="operator-details">
                                    <OperatorName className="operator-name">
                                      {card?.staffName}
                                    </OperatorName>
                                    <OperatorId className="operator-id">
                                      {card?.staffId} | {card?.staffLevel}
                                    </OperatorId>
                                  </Box>
                                  {card?.isTrainee && (
                                    <TagTrainee className="tag trainee">
                                      Trainee
                                    </TagTrainee>
                                  )}
                                </CardBox>
                              </MainSection>
                              {!card.isTrainee && (
                                <p
                                  style={{
                                    fontSize: "7px",
                                    marginBottom: "7px",
                                    textAlign: "center",
                                  }}
                                >
                                  {selected.length > 0
                                    ? section?.cards?.some((card) =>
                                        newData.includes(card.staffId)
                                      )
                                      ? "Drag & drop here to swap"
                                      : "Cannot be swapped"
                                    : "Click to view swapping option"}
                                </p>
                              )}
                            </>
                          );
                        })}
                    </TableFirstCard>
                  ))}
                </TableFirstBox>
              </Box>
            </TableBoxes>
            <Box sx={{ width: "19%" }}>
              <Accordion
                expanded={expanded}
                onChange={handleExpansion}
                sx={{
                  backgroundColor: "#CFD2D9",
                  minHeight: "40px",
                  borderRadius: "8px",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{ backgroundColor: "#CFD2D9" }}
                >
                  <Typography variant="h4">
                    Relievers & Absenteeism Cover{" "}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  style={{
                    backgroundColor: "#F4F5F8",
                    height: "100%",
                    maxHeight: "30vh",
                    minHeight: "0vh",
                    overflow: "auto",
                  }}
                >
                  <AssignedP>
                    Assigned:{" "}
                    <AssignedSpan>
                      {boxOneData?.relievers?.assigned?.card?.length}
                    </AssignedSpan>
                  </AssignedP>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      flexDirection: "column",
                    }}
                  >
                    <div>
                      <LabourBox>
                        <OpsInfo className="operator-info">
                          {dataDeploymentDetails?.response?.absRelStations?.map(
                            (card, index) =>
                              card?.cards?.map((cardsData) => {
                                const isCardRelEnabled = newData.includes(
                                  cardsData?.staffId
                                );

                                return (
                                  <>
                                    <CardBox
                                      className="operator-card"
                                      key={index}
                                      onClick={() =>
                                        handleCardClick(card, cardsData, index)
                                      }
                                      sx={{
                                        transform:
                                          selected[0]?.staffId ===
                                          cardsData?.staffId
                                            ? "rotate(-5deg)"
                                            : "none",
                                        borderLeft: section?.cards?.some(
                                          (card) =>
                                            card.staffId ===
                                            selected[0]?.staffId
                                        )
                                          ? "3px solid #4549a5"
                                          : "3px solid #ccc",

                                        backgroundColor: cardsData.absent
                                          ? "#efd9cc"
                                          : isCardRelEnabled
                                          ? "#dff6dd"
                                          : "#f0f0f0",
                                        boxShadow:
                                          "5px 5px 10px #e8e8e8, -5px -5px 10px #e8e8e8",
                                        border: cardsData.absent
                                          ? "1px solid #d83b01"
                                          : isCardRelEnabled
                                          ? "1px dashed #ccc"
                                          : "1px solid #30c030",
                                        width: "100%",
                                        cursor: isCardRelEnabled
                                          ? "pointer"
                                          : "not-allowed",
                                        opacity: isCardRelEnabled ? 1 : 0.3,
                                        pointerEvents: isCardRelEnabled
                                          ? "auto"
                                          : "none",
                                      }}
                                    >
                                      <CardName
                                        style={{ background: "#58a55c" }}
                                      >
                                        {getInitialName(cardsData?.staffName)}
                                      </CardName>

                                      <Box className="operator-details">
                                        <OperatorName className="operator-name">
                                          {cardsData?.staffName}
                                        </OperatorName>
                                        <OperatorId className="operator-id">
                                          {cardsData?.staffId} |{" "}
                                          {cardsData?.staffLevel}
                                        </OperatorId>
                                      </Box>
                                      {cardsData?.isTrainee && (
                                        <TagTrainee className="tag trainee">
                                          Trainee
                                        </TagTrainee>
                                      )}
                                    </CardBox>
                                    {!cardsData.isTrainee && (
                                      <p
                                        style={{
                                          fontSize: "7px",
                                          marginBottom: "13px",
                                          textAlign: "center",
                                        }}
                                      >
                                        {selected.length > 0
                                          ? card?.cards?.some((card) =>
                                              newData.includes(card.staffId)
                                            )
                                            ? "Drag & drop here to swap"
                                            : "Cannot be swapped"
                                          : "Click to view swapping option"}
                                      </p>
                                    )}
                                  </>
                                );
                              })
                          )}
                        </OpsInfo>
                      </LabourBox>
                    </div>
                    <div>
                      <SurplusP className="surplus">
                        Surplus:{" "}
                        <SurplusSpan>
                          {boxOneData?.surplusOperators?.length || ""}
                        </SurplusSpan>
                      </SurplusP>
                      <LabourBox>
                        <SurplusInfo className="surplus-info">
                          {boxOneData?.surplusOperators?.map((card, index) => {
                            const isCardSurplusEnabled = newData.includes(
                              card?.staffId
                            );

                            return (
                              <>
                                <RelieverCardBox
                                  key={index}
                                  onClick={() =>
                                    isCardSurplusEnabled &&
                                    handleCardClick(section, card, index)
                                  }
                                  sx={{
                                    transform:
                                      selected[0]?.staffId === card?.staffId
                                        ? "rotate(-5deg)"
                                        : "none",
                                    backgroundColor: card.absent
                                      ? "#efd9cc"
                                      : isCardSurplusEnabled
                                      ? "#dff6dd"
                                      : "#f0f0f0",
                                    border: card.absent
                                      ? "1px solid #d83b01"
                                      : isCardSurplusEnabled
                                      ? "1px dashed #ccc"
                                      : "1px solid #30c030",
                                    cursor: isCardSurplusEnabled
                                      ? "pointer"
                                      : "not-allowed",
                                    opacity: isCardSurplusEnabled ? 1 : 0.3,
                                    pointerEvents: isCardSurplusEnabled
                                      ? "auto"
                                      : "none",
                                  }}
                                >
                                  <CardName style={{ background: "#58a55c" }}>
                                    {getInitialName(card?.staffName)}
                                  </CardName>
                                  <Box className="operator-details">
                                    <OperatorName className="operator-name">
                                      {card?.staffName}
                                    </OperatorName>
                                    <OperatorId className="operator-id">
                                      {card?.staffId} | {card?.staffLevel}
                                    </OperatorId>
                                  </Box>
                                  {card?.isTrainee && (
                                    <TagTrainee className="tag trainee">
                                      Trainee
                                    </TagTrainee>
                                  )}
                                </RelieverCardBox>
                                <p
                                  style={{
                                    fontSize: "7px",
                                    marginBottom: "0px",
                                    textAlign: "center",
                                  }}
                                >
                                  {selected.length > 0
                                    ? newData.includes(card.staffId)
                                      ? "Drag & drop here to swap"
                                      : "Cannot be swapped"
                                    : "Click to view swapping option"}
                                </p>
                              </>
                            );
                          })}
                        </SurplusInfo>
                      </LabourBox>
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>
              <Accordion
                style={{
                  backgroundColor: "#CFD2D9",
                  minHeight: "40px",
                  borderRadius: "8px",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  style={{ backgroundColor: "#CFD2D9" }}
                >
                  <Typography variant="h4">Additional Operators </Typography>
                </AccordionSummary>
                <AccordionDetails
                  style={{
                    backgroundColor: "#F4F5F8",
                    height: "100%",
                    maxHeight: "30vh",
                    minHeight: "0vh",
                    overflow: "auto",
                  }}
                >
                  <AdditionalOperatorsTotal className="surplus">
                    Total:{" "}
                    <AdditionalOperatorsTotalSpan>
                      {boxOneData?.additionalOperators?.length}
                    </AdditionalOperatorsTotalSpan>
                  </AdditionalOperatorsTotal>
                  <AdditionalOperatorsInfo className="operator-info">
                    {boxOneData?.additionalOperators?.map((card, index) => {
                      const isCardSurplusEnabled = newData.includes(
                        card?.staffId
                      );

                      return (
                        <>
                          <AdditionalCardBox
                            key={index}
                            onClick={() =>
                              isCardSurplusEnabled &&
                              handleCardClick(section, card, index)
                            }
                            sx={{
                              transform:
                                selected[0]?.staffId === card?.staffId
                                  ? "rotate(-5deg)"
                                  : "none",
                              backgroundColor: card.absent
                                ? "#efd9cc"
                                : isCardSurplusEnabled
                                ? "#dff6dd"
                                : "#f0f0f0",
                              border: card.absent
                                ? "1px solid #d83b01"
                                : isCardSurplusEnabled
                                ? "1px dashed #ccc"
                                : "1px solid #30c030",
                              cursor: isCardSurplusEnabled
                                ? "pointer"
                                : "not-allowed",
                              opacity: isCardSurplusEnabled ? 1 : 0.3,
                              pointerEvents: isCardSurplusEnabled
                                ? "auto"
                                : "none",
                            }}
                          >
                            {/* <CardImg
                    src={card.image}
                    alt="operator"
                    className="operator-image"
                  /> */}
                            <CardName style={{ background: "#58a55c" }}>
                              {getInitialName(card?.staffName)}
                            </CardName>
                            <Box className="operator-details">
                              <OperatorName className="operator-name">
                                {card?.staffName}
                              </OperatorName>
                              <OperatorId className="operator-id">
                                {card?.staffId} | {card?.staffLevel}
                              </OperatorId>
                            </Box>
                            {card?.isTrainee && (
                              <TagTrainee className="tag trainee">
                                Trainee
                              </TagTrainee>
                            )}
                          </AdditionalCardBox>
                          <p
                            style={{
                              fontSize: "7px",
                              marginBottom: "0px",
                              textAlign: "center",
                            }}
                          >
                            {selected.length > 0
                              ? newData.includes(card.staffId)
                                ? "Drag & drop here to swap"
                                : "Cannot be swapped"
                              : "Click to view swapping option"}
                          </p>
                        </>
                      );
                    })}
                  </AdditionalOperatorsInfo>
                </AccordionDetails>
              </Accordion>
            </Box>

            {selected.length === 2 && (
              <SwipeDialog
                openDialog={openDialog}
                handleCloseDialog={handleCloseDialog}
                section={section}
                selected={selected}
                handleSwap={handleSwap}
              ></SwipeDialog>
            )}
          </TableMain>
          <ButtonGroup>
            <Box>
              <SecondaryButton
                bgColor="none"
                padding="8px 20px"
                onClick={handleBack}
                // onClick={onClose}
              >
                Cancel
              </SecondaryButton>
            </Box>
            <Box>
              <PrimaryButton disabled>Save Changes</PrimaryButton>
            </Box>
          </ButtonGroup>
        </MainContainer>
        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={loading || editLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Snackbar
          open={openAlert}
          autoHideDuration={3000}
          onClose={() => setOpenAlert(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            sx={{ fontSize: "12px" }}
            onClose={() => setOpenAlert(false)}
            severity={severity}
          >
            {message}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default EditDeployment;
