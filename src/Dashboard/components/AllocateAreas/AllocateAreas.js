import {
  Box,
  Breadcrumbs,
  IconButton,
  Link,
  Paper,
  Skeleton,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import SecondaryButton from "../../../../Utilities/Buttons/SecondaryButton/SecondaryButton";
import BackIcon from "../../../assets/icons/BackIcon.svg";
import CustomSnackbar from "../../../components/CustomSnackbar/CustomSnackbar";
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton";
import { setStaffAreaAllocationData } from "../../../redux/ActionCreator/AllocationActionCreator";
import {
  fetchAllocationAreaDetail,
  fetchStaffAreaAllocation,
  fetchStaffDetailAllocation,
} from "../../../redux/Actions/AllocationAction";
import {
  getAllocationAreaDetailData,
  getAllocationAreaDetailLoading,
  getAllocationStaffDetailData,
  getAllocationStaffDetailLoading,
  getStaffAreaAllocationData,
  getStaffAreaAllocationLoading,
} from "../../../redux/Reducers/SMMAllocationReducer";
import { getPlant, getShop } from "../../../redux/Reducers/SMMShopReducer";
import { SMMTheme } from "../../../Theme/theme";
import useStyles from "../../styles";
import PendingAllocation from "./components/PendingAllocation";
import Alert from "../../../components/CustomSnackbar/SnackBar";

const ALLOCATION_COLUMN = {
  pendingAllocation: {
    name: "Pending Allocation",
    items: [],
    requirement: 5,
  },
};

const AllocateAreas = ({}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [areaDetailData, setAreaDetailData] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [showInfoBar, setShowInfoBar] = useState(false);
  const [allocationColumns, setAllocationColumns] = useState(ALLOCATION_COLUMN);
  const [tempAllocationColumns, setTempAllocationColumns] =
    useState(ALLOCATION_COLUMN);

  const shop = useSelector(getShop);
  const plant = useSelector(getPlant);
  const staffAllocationList = useSelector(getAllocationStaffDetailData);
  const allocationAreaList = useSelector(getAllocationAreaDetailData);
  const staffListLoading = useSelector(getAllocationStaffDetailLoading);
  const staffAreaListLoading = useSelector(getAllocationAreaDetailLoading);
  const staffAreaAllocationLoading = useSelector(getStaffAreaAllocationLoading);
  const staffAreaAllocationData = useSelector(getStaffAreaAllocationData);
  const { state } = useLocation();

  useEffect(() => {
    if (shop?.id !== undefined) {
      const payload = {
        shop_id: shop?.id,
        batch_id: state?.trainingBatchId,
      };
      dispatch(fetchStaffDetailAllocation(payload));
      dispatch(fetchAllocationAreaDetail(payload));
    }
  }, []);

  useEffect(() => {
    if (
      staffAreaAllocationData &&
      staffAreaAllocationData?.responseCode === "SMM200"
    ) {
      setShowInfoBar(true);
      setTimeout(() => {
        setShowInfoBar(false);
        navigate("/SMM");
        dispatch(setStaffAreaAllocationData({}));
      }, 3000);
    }
  }, [staffAreaAllocationData]);

  useEffect(() => {
    if (allocationAreaList !== undefined && Array.isArray(allocationAreaList)) {
      const onlineData = allocationAreaList?.filter((item) => item.isOnline);
      const offlineData = allocationAreaList?.filter((item) => !item.isOnline);
      const dataGroup = groupBy([...onlineData, ...offlineData], "groupName");

      let areaData = {};
      Object.keys(dataGroup).map((keyName, i) => {
        areaData = {
          ...areaData,
          [keyName]: {
            ...groupBy(dataGroup[keyName], "lineName"),
          },
        };
        return keyName;
      });

      let areaObj = {};
      let tempArr = [];
      Object.entries(areaData).map(([columnId, column]) => {
        Object.entries(areaData[columnId]).map(([columnIdArea, columnArea]) => {
          columnArea?.map((area) => {
            const statusText = area?.isOnline ? "Online" : "Offline";
            const allocationName = `${statusText} . Group ${columnId} . Line ${columnIdArea}.`;
            areaObj = {
              ...areaObj,
              [`${statusText}${columnId}${columnIdArea}${area?.areaName}`]: {
                groupName: columnId,
                lineName: columnIdArea,
                areaName: area?.areaName,
                isOnline: area?.isOnline,
                name: tempArr?.includes(allocationName) ? "" : allocationName,
                items: [],
              },
            };
            tempArr.push(allocationName);
            return area;
          });
          return null;
        });
      });

      setAreaDetailData(areaObj);
    }
  }, [allocationAreaList]);

  const groupBy = (arr, property) => {
    return arr.reduce(function (memo, x) {
      if (!memo[x[property]]) {
        memo[x[property]] = [];
      }
      memo[x[property]].push({ ...x, items: [] });
      return memo;
    }, {});
  };

  const updateAllocationColumn = (data, tempData) => {
    setAllocationColumns(data);
    if (selectedStaff && selectedStaff.value) {
      setTempAllocationColumns(tempData || data);
    } else {
      setTempAllocationColumns(data);
    }
  };

  const getAllocationButtonStatus = () => {
    if (staffAreaAllocationLoading) {
      return true;
    } else if (!allocationColumns?.["pendingAllocation"]?.items?.length) {
      return false;
    } else {
      return true;
    }
  };

  const handleAllocateToArea = () => {
    const allocations = [];
    Object.entries(allocationColumns).map(([columnId, column]) => {
      if (column?.items?.length) {
        const allocatedStaffs = column?.items?.map((staff) => {
          return {
            staff_id: staff?.staffId,
            name: staff?.name,
            level: staff?.level,
          };
        });
        const allocationObj = {
          group_name: column?.groupName,
          line_name: column?.lineName,
          area_name: column?.areaName,
          is_online: column?.isOnline,
          allocated_staffs: allocatedStaffs,
        };
        allocations.push(allocationObj);
      }
    });

    const payload = {
      plant_id: plant?.id,
      shop_id: shop?.id,
      training_batch_id: state?.trainingBatchId,
      allocations: allocations,
    };
    dispatch(fetchStaffAreaAllocation(payload));
  };

  const handleStaffSelection = (staff) => {
    setSelectedStaff(staff);
    const filterPendingStaff =
      tempAllocationColumns?.pendingAllocation?.items?.filter(
        (item) => item?.staffId === staff?.value
      );
    let recommendedObj = {};
    Object.entries(tempAllocationColumns).map(([columnId, column]) => {
      const filterItem = column?.items?.filter(
        (data) => data?.staffId === staff?.value
      );
      column = {
        ...column,
        items: filterItem,
      };
      recommendedObj = {
        ...recommendedObj,
        [columnId]: column,
      };
    });
    setAllocationColumns({
      ["pendingAllocation"]: {
        items: filterPendingStaff,
      },
      ...recommendedObj,
    });
  };

  const handleClearFilter = () => {
    setSelectedStaff(null);
    setAllocationColumns(tempAllocationColumns);
  };

  return (
    <ThemeProvider theme={SMMTheme}>
      <Fragment>
        <Box sx={{ p: "2rem 7rem 0rem 7rem" }}>
          <Box className={classes["container-flex"]} sx={{ minWidth: "90vw" }}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link color="Blue.main" href={"/SMM"}>
                Classroom Training
              </Link>
              <Link
                color="Blue.main"
                sx={{ cursor: "pointer" }}
                onClick={() => navigate("/SMM")}
              >
                {state?.trainingType === "New joinee"
                  ? "New Joinee Training"
                  : "Department Change"}
              </Link>
              <Typography color="Silver.dark">
                Allocate Attendees to Areas
              </Typography>
            </Breadcrumbs>
          </Box>
          <Box
            className={classes["container-flex"]}
            sx={{ width: "fit-content", gap: "1rem", my: 2 }}
          >
            <IconButton
              onClick={() => navigate("/SMM")}
              color="neutral"
              variant="outlined"
            >
              <img
                alt="refresh"
                src={BackIcon}
                style={{
                  cursor: "pointer",
                  height: "1.6rem",
                  width: "1.6rem",
                }}
              />
            </IconButton>
            <Typography variant="h2">Allocate Attendees to Areas</Typography>
          </Box>
          <Paper sx={{ my: 1, px: 1.6, pb: 1.6 }}>
            {staffListLoading ||
            staffAreaListLoading ||
            staffAreaAllocationLoading ? (
              <Skeleton
                className={`${classes["master-table-dimensions"]}`}
                animation="wave"
                variant="rectangular"
              />
            ) : (
              <PendingAllocation
                staffAllocationList={staffAllocationList}
                areaDetailData={areaDetailData}
                allocationColumns={allocationColumns}
                updateAllocationColumn={updateAllocationColumn}
                handleStaffSelection={handleStaffSelection}
                handleClearFilter={handleClearFilter}
                selectedStaff={selectedStaff}
                tempAllocationColumns={tempAllocationColumns}
              />
            )}
          </Paper>
          <Box sx={{ display: "flex", justifyContent: "flex-end", pt: 1 }}>
            <Box sx={{ display: "flex", gap: "1rem", width: "35rem" }}>
              <SecondaryButton onClick={() => navigate("/SMM")}>
                Cancel
              </SecondaryButton>
              <PrimaryButton
                disabled={getAllocationButtonStatus()}
                onClick={handleAllocateToArea}
              >
                Allocate to Areas
              </PrimaryButton>
            </Box>
          </Box>
          <Alert
            open={showInfoBar}
            handleClose={() => setShowInfoBar(false)}
            message="Trainees allocated successfully to the areas."
          />
        </Box>
      </Fragment>
    </ThemeProvider>
  );
};

export default AllocateAreas;
