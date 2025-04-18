import CloseIcon from "@mui/icons-material/Close";
import {
  Backdrop,
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useLocation, useNavigate } from "react-router-dom";
import {} from "./attendeesArea.scss";

import CustomButton from "../../../../components/Button/SecondaryButtonWithIcon";
import SearchInput from "../../../../components/SearchBox/MasterSearch";
import AttendeeCard from "./attendeeCard/attendeeCard";

import SnackBar from "../../../../components/Snackbar/Snackbar";
import { variables } from "../../../../styles/theme";
import getCurrentDateMinusDays from "../../../../utils/getCurrentDateMinusDays";
import useFetchAreaAllocatedPlan from "../../hooks/fetchAreaAllocatedPlan";
import useFetchBatchById from "../../hooks/fetchBatchByid";
import useFetchStaffAllocationToArea from "../../hooks/staffAllocationToArea";
import RecommendedArea from "./attendeeCard/RecommendedBoxDropZone ";
import {
  AttendeesHeading,
  BoxHeader,
  BoxSubText,
  BoxText,
  ClearBtn,
  Container,
  Filter,
  FilterBox,
  HeadingAllocation,
  LeftContainer,
  MainContainer,
  Remaining,
  RightContainer,
  SubmitButton,
  SubmitPopButton,
  SubmitPopContent,
  SubmitPopHeading,
  TopBox,
} from "./attendeesArea.styles";

const AttendeesArea = () => {
  const [open, setOpen] = useState(false);
  const [newJoinerData, setNewJoinerdata] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const trainingBatchId = location.state?.trainingBatchId;
  const shopId = location.state?.shopId;

  const {
    dataBatch: allBatchData,
    fetchData: fetchDataBatch,
    loading: batchDataLoader,
  } = useFetchBatchById();

  const {
    data: newJoineeData,
    fetchData: fetchDataNewJoinee,
    loading: allocatedplanLoader,
  } = useFetchAreaAllocatedPlan();

  const {
    data: staffAllocationToAreaData,
    fetchStaffAllocation: fetchstaffAllocationToArea,
    loading: submitLoader,
  } = useFetchStaffAllocationToArea();

  useEffect(() => {
    if (!trainingBatchId) {
      console.error("Training Batch ID is missing");
      return;
    }

    const fetchData = async () => {
      try {
        const batchParams = `batch_id=${trainingBatchId}`;
        await fetchDataBatch(batchParams);
      } catch (err) {
        console.error("Error fetching batch data:", err);
      }
    };
    fetchData();
  }, [trainingBatchId, allBatchData]);

  useEffect(() => {
    fetchNewJoineeData();
  }, [newJoineeData]);

  const fetchNewJoineeData = async () => {
    try {
      const newJoineePayload = {
        shopId: 40,
        date: "13-01-2025",
      };

      await fetchDataNewJoinee(newJoineePayload);
    } catch (err) {
      console.error("Error fetching basic requirements:", err);
    }
  };

  const fetchStaffAllocation = async () => {
    setOpen(false);
    const payload = {
      shopId: shopId,
      dateOfAllocation: getCurrentDateMinusDays(4),
      data: newJoinerData,
    };
    if (!newJoinerData) {
      setShowSuccessAlert(true);
      setAlertMessage("Please select new joiner");
    }
    try {
      const response = await fetchstaffAllocationToArea(payload);
      if (response?.data?.responseCode === 200) {
        setShowSuccessAlert(true);
        localStorage.setItem("showSnackBar", "true");
        navigate("/SMM?tabName=BASIC+REQUIREMENTS");
      } else {
        setShowSuccessAlert(true);
        setAlertMessage(response?.data?.message || "An error occurred");
      }
    } catch (err) {
      console.error("Error fetching batch data:", err);
    }
  };

  const [recommendedData, setRecommendedData] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const extractImageName = (staffName) => {
    if (!staffName) return "";
    const filteredWords = staffName
      .split(" ")
      .filter(
        (word) => !["MR.", "MRS.", "MS.", "DR."].includes(word.toUpperCase())
      );
    const initials = filteredWords
      .slice(0, 2)
      .map((word) => word[0])
      .join("");

    return initials.toUpperCase();
  };

  useEffect(() => {
    if (allBatchData?.traineeList) {
      const allocationData = allBatchData?.traineeList.map((item) => ({
        name: item.staffName,
        id: item.staffId,
        skillLevel: item.attendeeLevel,
        imageName: extractImageName(item.staffName),
      }));

      setData(allocationData);
    }
  }, [allBatchData]);

  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState([""]);
  const [inputValue, setInputValue] = useState("");
  const [clearInput, setClearInput] = useState(false);

  const handleSearchChange = (newValue) => {
    setSearchValue(newValue);
  };

  const handleClear = () => {
    setSearchValue(null);
    setInputValue("");
    setClearInput(true);
    setTimeout(() => setClearInput(false), 0);
  };
  const handleInputChange = (newValue) => {
    setInputValue(newValue);
  };
  const addRandomId = (obj) => {
    if (Array.isArray(obj)) {
      return obj.map((item) => addRandomId(item));
    } else if (typeof obj === "object" && obj !== null) {
      const updatedObj = { ...obj };
      if (updatedObj.name || updatedObj.area) {
        updatedObj.randomId = crypto.randomUUID();
      }
      if (updatedObj.children) {
        updatedObj.children = addRandomId(updatedObj.children);
      }
      if (updatedObj.areaChildren) {
        updatedObj.areaChildren = addRandomId(updatedObj.areaChildren);
      }
      return updatedObj;
    }
    return obj;
  };

  useEffect(() => {
    if (newJoineeData?.data) {
      setNewJoinerdata(addRandomId(newJoineeData.data));
    }
  }, [newJoineeData]);

  const newUpdatedResponse = (obj, newId, newChild) => {
    if (Array.isArray(obj)) {
      return obj.map((item) => newUpdatedResponse(item, newId, newChild));
    } else if (typeof obj === "object" && obj !== null) {
      const updatedObj = { ...obj };

      if (updatedObj.children) {
        updatedObj.children = newUpdatedResponse(
          updatedObj.children,
          newId,
          newChild
        );
      }
      if (updatedObj.areaChildren) {
        updatedObj.areaChildren = newUpdatedResponse(
          updatedObj.areaChildren,
          newId,
          newChild
        );
      }

      if (updatedObj?.randomId === newChild?.randomId) {
        updatedObj.staffIds = [...(updatedObj.staffIds || []), newId];
      }
      return updatedObj;
    }
    return obj;
  };
  const handleDrop = (item, child, id) => {
    setNewJoinerdata(newUpdatedResponse(newJoinerData, item?.id, child));

    const droppedItem = data.find((d) => d.id === item.id);
    if (droppedItem) {
      setRecommendedData((prev) => [...prev, droppedItem]);
      setData((prev) => prev.filter((d) => d.id !== item.id));
    }
  };

  const removeStaffId = (data, staffId) => {
    if (Array.isArray(data)) {
      return data.map((item) => removeStaffId(item, staffId));
    } else if (typeof data === "object" && data !== null) {
      const updatedObj = { ...data };
      if (updatedObj.staffIds && updatedObj.staffIds.includes(staffId)) {
        updatedObj.staffIds = updatedObj.staffIds.filter(
          (id) => staffId !== id
        );
      }
      if (updatedObj.children) {
        updatedObj.children = removeStaffId(updatedObj.children, staffId);
      }
      if (updatedObj.areaChildren) {
        updatedObj.areaChildren = removeStaffId(
          updatedObj.areaChildren,
          staffId
        );
      }
      return updatedObj;
    }
    return data;
  };
  const handleRemoveRecommended = (id) => {
    const removedItem = recommendedData.find((item) => item.id === id);
    if (removedItem) {
      setData((prev) => [...prev, removedItem]);
      setRecommendedData((prev) => prev.filter((item) => item.id !== id));
      const updatedNewJoineeData = removeStaffId(newJoinerData, id);

      setNewJoinerdata(updatedNewJoineeData);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  // useEffect(() => {
  //   setAlertMessage(
  //     staffAllocationToAreaData?.response === "success"
  //       ? "Attendees Allocated Successfully"
  //       : "Attendees Allocation Failed"
  //   );
  // }, [staffAllocationToAreaData]);

  return (
    <DndProvider backend={HTML5Backend}>
      <>
        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={batchDataLoader || allocatedplanLoader || submitLoader}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <BoxHeader>
          <BoxText>Basic Requirement</BoxText>
          <BoxText>&gt; Batches Pending for Allocation to Areas</BoxText>
          <BoxSubText> &gt; Allocate Attendees to Areas</BoxSubText>
        </BoxHeader>
        <AttendeesHeading variant="h2">
          Allocate Attendees to Areas
        </AttendeesHeading>
        <MainContainer>
          <TopBox>
            <Filter>Filter:</Filter>
            <FilterBox>
              <SearchInput
                placeholder="Search Staff ID, Name"
                value={searchValue}
                disableSuggestions={true}
                onChange={handleSearchChange}
                onInputChange={handleInputChange}
                clearInput={clearInput}
              />
            </FilterBox>
            <Box sx={{ paddingLeft: "10px" }}>
              <ClearBtn onClick={handleClear}>Clear</ClearBtn>
            </Box>
          </TopBox>
          <Container>
            <LeftContainer>
              <HeadingAllocation variant="h3">
                Pending Allocation
              </HeadingAllocation>
              <Remaining>
                <Box>
                  <Typography
                    variant="h4"
                    style={{ margin: "0", display: "inline-block" }}
                  >
                    {data && data.length}/
                    {data && data.length + recommendedData.length}
                  </Typography>
                  <Typography
                    variant="h5"
                    style={{
                      margin: "0",
                      display: "inline-block",
                      paddingLeft: "5px",
                    }}
                  >
                    remaining to be allocated
                  </Typography>
                </Box>
                {data
                  ?.filter((item) => {
                    const search = (inputValue || "").toLowerCase();
                    return (
                      search === "" ||
                      item.name.toLowerCase().includes(search) ||
                      String(item.id).toLowerCase().includes(search)
                    );
                  })
                  .map((item, index) => (
                    <AttendeeCard key={index} item={item} />
                  ))}
              </Remaining>
            </LeftContainer>
            <RightContainer>
              <HeadingAllocation variant="h3">
                Recommended Allocation
              </HeadingAllocation>

              <div
                className="recommendedAllocation"
                style={{
                  height: "297px",
                  overflowY: "auto",
                }}
              >
                {newJoinerData &&
                  newJoinerData.map((data, index) => (
                    <RecommendedArea
                      key={index}
                      recommendedData={recommendedData}
                      newJoineeData={data}
                      onDrop={handleDrop}
                      onRemove={handleRemoveRecommended}
                    />
                  ))}
              </div>
            </RightContainer>
          </Container>
        </MainContainer>
        <SubmitButton>
          <CustomButton
            bordercolor={variables.primaryColor}
            bgColor={variables.bgColor}
            textColor={variables.primaryColor}
            onClick={handleBack}
          >
            Cancel
          </CustomButton>
          <CustomButton
            onClick={() => {
              if (recommendedData?.length <= 0) {
                setAlertMessage(
                  "No allocations to submit. Please allocate first."
                );
                setShowSuccessAlert(true);
                return;
              }
              handleClickOpen();
            }}
            backgroundColor="#171C8F"
            textColor="#fff"
          >
            Allocate to Areas
          </CustomButton>
        </SubmitButton>

        <Dialog open={open} onClose={handleClose} maxWidth="xs">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0px 0 10px 0",
            }}
          >
            <SubmitPopHeading>Confirm Allocation</SubmitPopHeading>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "row", padding: "0px 0px" }}
          >
            <DialogContent sx={{ padding: "20px 20px" }}>
              <SubmitPopContent>
                Once submitted, this allocation is permanent and cannot be
                changed. Are you sure you wish to proceed?
              </SubmitPopContent>
            </DialogContent>
          </Box>
          <SubmitPopButton>
            <CustomButton
              bordercolor={variables.primaryColor}
              bgColor={variables.bgColor}
              textColor={variables.primaryColor}
              onClick={handleClose}
            >
              Cancel
            </CustomButton>
            <CustomButton
              backgroundColor="#171C8F"
              textColor="#fff"
              onClick={fetchStaffAllocation}
            >
              Submit Allocation
            </CustomButton>
          </SubmitPopButton>
        </Dialog>
      </>
      <SnackBar
        handleClose={() => setShowSuccessAlert(false)}
        showSuccessAlert={showSuccessAlert}
        responseCode={staffAllocationToAreaData?.responseCode}
        alertMessage={alertMessage}
      />
    </DndProvider>
  );
};

export default AttendeesArea;
