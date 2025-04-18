import { Box } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "../../../utils/Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../../utils/Buttons/SecondaryButton/SecondaryButton";
import Alert from "../../../components/CustomSnackbar/SnackBar";
import {
  fetchDPMPlantAreaDetail,
  fetchSupervisorStaffStation,
} from "../../../redux/Actions/ReportActions";
import {
  getDPMPlantAreaDetailData,
  getSupervisorStaffStationData,
  getSupervisorStaffStationLoading,
} from "../../../redux/Reducers/SMMReportReducer";
import {
  getLocation,
  getPlant,
  getGroup,
  getLine,
  getArea,
  getShop,
} from "../../../redux/Reducers/SMMShopReducer";
import { compareDates, getMonthDiff } from "../../../utils/helperFunctions";
import {
  RenderDatePicker,
  RenderMultiSelectDropdown,
  RenderMultiSelectStaffDropdown,
  RenderSingleDropdown,
} from "../components/FilterComponents";

const STATION_TYPE = ["Maru A", "Maru AR", "Maru A/AR", "NA"];
const TYPES_OF_OJT = ["New joinee", "Existing"];

const L0toL3ReportFilters = ({
  handleApplyFilters,
  updateRemovedFilters,
  isDepartmentHead,
}) => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(new Date());
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [selectedShop, setSelectedShop] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedLine, setSelectedLine] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedTypesOfOJT, setSelectedTypesOfOJT] = useState([]);
  const [selectedStationType, setSelectedStationType] = useState([]);
  const [selectedOperator, setSelectedOperator] = useState([]);
  const [selectedStation, setSelectedStation] = useState([]);
  const [showErrorInfo, setShowErrorInfo] = useState(false);

  const staffStationLoading = useSelector(getSupervisorStaffStationLoading);
  const staffStationResponse = useSelector(getSupervisorStaffStationData);
  const plantAreaDetailResponse = useSelector(getDPMPlantAreaDetailData);
  const location = useSelector(getLocation);
  const plant = useSelector(getPlant);
  const shop = useSelector(getShop);
  const group = useSelector(getGroup);
  const line = useSelector(getLine);
  const area = useSelector(getArea);

  const dispatch = useDispatch();

  useEffect(() => {
    setDefaultFromDate();
  }, []);

  useEffect(() => {
    if (plant && !selectedPlant) {
      setSelectedPlant({
        label: plant?.plant_name,
        value: plant?.id,
      });
    }
    if (shop && !selectedShop) {
      setSelectedShop({
        label: shop?.shop_name,
        value: shop?.id,
      });
    }

    if (isDepartmentHead && plantAreaDetailResponse?.length) {
      setDefaultAreaData();
    } else {
      if (!selectedGroup) {
        setSelectedGroup(group);
        setSelectedLine(line);
        setSelectedArea(area);
      }
    }
  }, [
    plant,
    shop,
    group,
    line,
    area,
    isDepartmentHead,
    plantAreaDetailResponse,
  ]);

  useEffect(() => {
    if (
      selectedShop &&
      selectedPlant &&
      selectedGroup &&
      selectedLine &&
      selectedArea &&
      toDate &&
      fromDate
    ) {
      const payload = {
        shop_id: selectedShop?.value,
        plant_id: selectedPlant?.value,
        group_name: selectedGroup,
        line_name: selectedLine,
        area_name: selectedArea,
        station_type:
          selectedStationType?.map((item) => item.replace("Maru ", "")) || [],
        ojt_type: selectedTypesOfOJT,
        start_date: getDateTime(fromDate),
        end_date: getDateTime(toDate),
      };
      dispatch(fetchSupervisorStaffStation(payload));
    }
  }, [
    selectedShop,
    selectedPlant,
    selectedGroup,
    selectedLine,
    selectedArea,
    toDate,
    fromDate,
    selectedStationType,
    selectedTypesOfOJT,
  ]);

  useEffect(() => {
    if (selectedPlant && toDate && fromDate && isDepartmentHead) {
      const payload = {
        plant_id: selectedPlant?.value,
        start_date: getDateTime(fromDate, "DD-MM-YYYY"),
        end_date: getDateTime(toDate, "DD-MM-YYYY"),
      };
      dispatch(fetchDPMPlantAreaDetail(payload));
    }
  }, [selectedPlant, toDate, fromDate, isDepartmentHead]);

  const setDefaultAreaData = () => {
    if (isDepartmentHead) {
      const groupData = getListData("group");
      const lineData = getListData("line");
      const areaData = getListData("area");
      if (groupData?.[0] && lineData?.[0] && areaData?.[0]) {
        setSelectedGroup(groupData?.[0] || "");
        setSelectedLine(lineData?.[0] || "");
        setSelectedArea(areaData?.[0] || "");
      }
    }
  };

  const setDefaultFromDate = () => {
    let currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() - 6);
    setFromDate(currentDate);
  };

  const handleOperatorSelection = (data) => {
    setSelectedOperator(data);
  };

  const handleStationSelection = (data) => {
    setSelectedStation(data);
  };

  const getDateTime = (date, format = "YYYY-MM-DD") => {
    return dayjs(new Date(date)).format(format);
  };

  const onApplyFilters = () => {
    const data = {
      plant_id: selectedPlant?.value,
      shop_id: selectedShop?.value,
      group_name: selectedGroup,
      line_name: selectedLine,
      area_name: selectedArea,
      start_date: getDateTime(fromDate),
      end_date: getDateTime(toDate),
      staff_ids: selectedOperator
        ?.map((item) => item.value?.toString())
        ?.toString(),
      stations: selectedStation,
      ojt_type: selectedTypesOfOJT,
      station_type:
        selectedStationType?.map((item) => item.replace("Maru ", "")) || [],
    };
    handleApplyFilters(data);
  };

  const handleRemoveFilters = () => {
    setSelectedTypesOfOJT([]);
    setSelectedStationType([]);
    setSelectedOperator([]);
    setSelectedStation([]);
    setDefaultAreaData();
    setDefaultFromDate();
    setToDate(new Date());
    updateRemovedFilters();
  };

  const getPlants = () => {
    return location?.plants?.map((item) => {
      return {
        label: item?.plant_name,
        value: item?.id,
      };
    });
  };

  const getShops = () => {
    if (isDepartmentHead && plantAreaDetailResponse?.length) {
      const data = plantAreaDetailResponse?.map((item) => {
        return {
          label: item?.shop_name,
          value: item?.shop_id,
        };
      });
      return data;
    }
    return plant?.shops?.map((item) => {
      return {
        label: item?.shop_name,
        value: item?.id,
      };
    });
  };

  const getStaffData = () => {
    return staffStationResponse?.staffs?.map((item) => {
      return {
        label: `${item?.staff_name} | ${item.staff_id}`,
        value: item?.staff_id,
      };
    });
  };

  const getListData = (key) => {
    let arr = [];
    if (plantAreaDetailResponse && plantAreaDetailResponse?.length) {
      const data = plantAreaDetailResponse?.filter(
        (item) => item.shop_id === selectedShop?.value
      );
      if (data && data?.length) {
        data[0].area_mapping?.map((area) => {
          arr.push(area?.[key]);
          return area;
        });
      }
    }
    return Array.from(new Set(arr)) || [];
  };

  const updateFromDate = (evt) => {
    let selectedDate = new Date(evt);
    if (getMonthDiff(evt, toDate) > 6) {
      selectedDate.setMonth(selectedDate.getMonth() + 6);
      setToDate(selectedDate);
    } else {
      if (compareDates(toDate, evt)) {
        setToDate(new Date());
      }
    }
    setFromDate(evt);
  };

  const updateToDate = (evt) => {
    let selectedDate = new Date(evt);
    if (getMonthDiff(fromDate, evt) > 6) {
      selectedDate.setMonth(selectedDate.getMonth() - 6);
      setFromDate(selectedDate);
    }
    if (compareDates(fromDate, evt)) {
      setToDate(evt);
    } else {
      setShowErrorInfo(true);
      setTimeout(() => {
        setShowErrorInfo(false);
      }, 1000);
    }
  };

  return (
    <Box>
      {/* Filter line 1 */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <RenderSingleDropdown
          label={"Plant"}
          selectedOptions={selectedPlant}
          data={getPlants() || []}
          handleChange={(event) => {
            setSelectedPlant(event.target.value);
          }}
        />
        <RenderSingleDropdown
          label={"Shop"}
          selectedOptions={selectedShop}
          data={getShops() || []}
          handleChange={(event) => {
            setSelectedShop(event.target.value);
          }}
        />
        <RenderSingleDropdown
          label={"Group"}
          data={isDepartmentHead ? getListData("group") : [group]}
          selectedOptions={selectedGroup}
          handleChange={(event) => {
            setSelectedGroup(event.target.value);
          }}
        />
        <RenderSingleDropdown
          label={"Line"}
          data={isDepartmentHead ? getListData("line") : [line]}
          selectedOptions={selectedLine}
          handleChange={(event) => {
            setSelectedLine(event.target.value);
            setSelectedArea("");
          }}
        />
        <RenderSingleDropdown
          label={"Area"}
          data={isDepartmentHead ? getListData("area") : [area]}
          selectedOptions={selectedArea}
          handleChange={(event) => setSelectedArea(event.target.value)}
        />
      </Box>
      {/* Filter line 2 */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
        <RenderMultiSelectDropdown
          label={"Types of OJT"}
          data={TYPES_OF_OJT}
          selectedOptions={selectedTypesOfOJT}
          handleChange={(event) => setSelectedTypesOfOJT(event.target.value)}
        />
        <RenderMultiSelectDropdown
          label={"Station Type"}
          data={STATION_TYPE}
          selectedOptions={selectedStationType}
          handleChange={(event) => setSelectedStationType(event.target.value)}
        />
        <RenderDatePicker
          fromDate={fromDate}
          toDate={toDate}
          label={"Training End Date Range"}
          isTestEvaluation={false}
          updateFromDate={updateFromDate}
          updateToDate={updateToDate}
        />
        <Box sx={{ width: "20%" }} />
      </Box>
      {/* Filter line 3 */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
        <RenderMultiSelectStaffDropdown
          label={"Staff Name"}
          data={getStaffData() || []}
          selectedOptions={selectedOperator}
          handleChange={handleOperatorSelection}
        />
        <RenderMultiSelectDropdown
          label={"Station"}
          width={"40%"}
          data={staffStationResponse?.stations || []}
          selectedOptions={selectedStation}
          handleChange={(event) => handleStationSelection(event.target.value)}
        />
        <Box sx={{ width: "20%" }} />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2, pb: 0 }}>
        <Box>
          <SecondaryButton type="button" onClick={handleRemoveFilters}>
            Remove All
          </SecondaryButton>
        </Box>
        <Box>
          <PrimaryButton onClick={onApplyFilters} sx={{ ml: 2 }}>
            Apply Filters
          </PrimaryButton>
        </Box>
      </Box>
      <Alert
        open={showErrorInfo}
        handleClose={() => setShowErrorInfo(false)}
        message={"Please select valid date range."}
      />
    </Box>
  );
};
export default L0toL3ReportFilters;
