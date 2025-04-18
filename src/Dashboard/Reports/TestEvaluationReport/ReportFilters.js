import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "../../../utils/Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../../utils/Buttons/PrimaryButton/PrimaryButton";
import Alert from "../../../components/CustomSnackbar/SnackBar";
import Toggle from "../../../components/Toggle/ToggleButton";
import { fetchReportFilterData } from "../../../redux/Actions/ReportActions";
import {
  getReportFilterData,
  getStaffDetailsLoading,
} from "../../../redux/Reducers/SMMReportReducer";
import { getShop } from "../../../redux/Reducers/SMMShopReducer";
import { compareDates, getMonthDiff } from "../../../utils/helperFunctions";
import {
  RenderDatePicker,
  RenderLabel,
  RenderMultiSelectDropdown,
  RenderSearchDropdown,
  RenderSingleDropdown,
} from "../components/FilterComponents";

const TRAINING_TYPE = ["Refresher", "New joinee", "Department change"];
const NO_OF_ATTEMPTS = ["1", "more than 1"];

const ReportFilters = ({ handleApplyFilters, updateRemovedFilters }) => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(new Date());
  const [trainingType, setTrainingType] = useState("Refresher");
  const [testResult, setTestResult] = useState("Both");
  const [selectedEvaluation, setSelectedEvaluation] =
    useState("Pre & Post Test");
  const [trainingTopics, setTrainingTopics] = useState([]);
  const [selectedTrainingTopics, setSelectedTrainingTopics] = useState([]);
  const [selectedTestNames, setSelectedTestNames] = useState([]);
  const [selectedControlNumber, setSelectedControlNumber] = useState("");
  const [selectedRevisionNumber, setSelectedRevisionNumber] = useState("");
  const [reportFilterData, setReportFilterData] = useState({});
  const [selectedAttendees, setSelectedAttendees] = useState([]);
  const [selectedTrainers, setSelectedTrainers] = useState([]);
  const [selectedNoOfAttemps, setSelectedNoOfAttemps] = useState("");
  const [showErrorInfo, setShowErrorInfo] = useState(false);
  const staffDetailsLoading = useSelector(getStaffDetailsLoading);

  const dispatch = useDispatch();
  const shop = useSelector(getShop);
  const reportFilterResponse = useSelector(getReportFilterData);

  useEffect(() => {
    if (reportFilterResponse && reportFilterResponse?.reportFilters) {
      setReportFilterData(reportFilterResponse?.reportFilters);
      setTrainingTopics(Object.keys(reportFilterResponse?.reportFilters));
    }
  }, [reportFilterResponse]);

  useEffect(() => {
    let currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() - 3);
    setFromDate(currentDate);
  }, []);

  useEffect(() => {
    if (trainingType && toDate && fromDate) {
      const payload = {
        shop_id: shop?.id?.toString(),
        training_type: trainingType,
        start_date: getDateTime(fromDate),
        end_date: getDateTime(toDate),
      };
      dispatch(fetchReportFilterData(payload));
    }
  }, [trainingType, fromDate, toDate]);

  useEffect(() => {
    setSelectedTestNames(
      getUniqueArray(getTopicDependentData("trainingTestNames") || [])
    );
    setSelectedControlNumber("");
    setSelectedRevisionNumber("");
  }, [selectedTrainingTopics]);

  const getUniqueArray = (arr) => {
    return arr?.filter((item, index) => arr?.indexOf(item) === index);
  };

  const getTopicDependentData = (key) => {
    let arr = [];
    if (selectedTrainingTopics?.length) {
      selectedTrainingTopics?.map((topic) => {
        arr.push(reportFilterData?.[topic]);
        return topic;
      });
      const checkArr = arr?.map((item) => {
        return item?.[key];
      });
      return checkArr;
    }
    return [];
  };

  const handleSelectTopics = (event) => {
    const { value } = event.target;
    setSelectedTrainingTopics(
      typeof value === "string" ? value.split(",") : value
    );
    setSelectedControlNumber("");
    setSelectedRevisionNumber("");
  };

  const handleAttendeeSelection = (data) => {
    setSelectedAttendees(data);
  };

  const handleTrainerSelection = (data) => {
    setSelectedTrainers(data);
  };

  const getDateTime = (date) => {
    var d = new Date(date).getTime();
    return parseInt(d / 1000);
  };

  const onApplyFilters = () => {
    const staffIds = selectedAttendees?.map((staff) => staff.value?.toString());
    const trainerIds = selectedTrainers?.map((trainer) =>
      trainer.value?.toString()
    );
    const data = {
      training_type: trainingType,
      training_date_from: getDateTime(fromDate),
      training_date_to: getDateTime(toDate),
      staff_ids: staffIds?.toString(),
      trainer_id: trainerIds?.toString(),
      topic_names: selectedTrainingTopics?.toString(),
      training_test_name: selectedTestNames?.toString(),
      control_no: selectedControlNumber,
      revision: selectedRevisionNumber,
      pass_or_fail: testResult === "Both" ? "" : testResult,
      no_of_attempts: selectedNoOfAttemps,
      evaluation:
        selectedEvaluation === "Only Post-Test" ? "Post" : "Pre%2BPost",
    };
    handleApplyFilters(data);
  };

  const handleRemoveFilters = () => {
    let currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() - 3);
    setFromDate(currentDate);
    setToDate(new Date());
    setTrainingType("Refresher");
    setTestResult("Both");
    setSelectedEvaluation("Pre & Post Test");
    setSelectedTrainingTopics([]);
    setSelectedTestNames([]);
    setSelectedControlNumber("");
    setSelectedRevisionNumber("");
    setSelectedAttendees([]);
    setSelectedTrainers([]);
    setSelectedNoOfAttemps("");
    updateRemovedFilters();
  };

  const updateFromDate = (evt) => {
    let selectedDate = new Date(evt);
    if (getMonthDiff(evt, toDate) > 12) {
      selectedDate.setMonth(selectedDate.getMonth() + 12);
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
    if (getMonthDiff(fromDate, evt) > 12) {
      selectedDate.setMonth(selectedDate.getMonth() - 12);
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
          label={"Training Type:"}
          selectedOptions={trainingType}
          data={TRAINING_TYPE}
          handleChange={(event) => {
            setTrainingType(event.target.value);
            setSelectedTrainingTopics([]);
            setSelectedTestNames([]);
            setSelectedControlNumber("");
            setSelectedRevisionNumber("");
          }}
        />
        <RenderMultiSelectDropdown
          label={"Training Topic"}
          data={trainingTopics}
          selectedOptions={selectedTrainingTopics}
          handleChange={handleSelectTopics}
        />
        <RenderMultiSelectDropdown
          label={"Training Test Name"}
          data={getTopicDependentData("trainingTestNames")}
          selectedOptions={selectedTestNames}
          handleChange={(event) => {
            const { value } = event.target;
            setSelectedTestNames(
              typeof value === "string" ? value.split(",") : value
            );
          }}
          disabled={!selectedTrainingTopics?.length}
        />
        <RenderSingleDropdown
          label={"Control Number"}
          data={getTopicDependentData("controlNumber")}
          selectedOptions={selectedControlNumber}
          handleChange={(event) =>
            setSelectedControlNumber(event?.target?.value || "")
          }
          handleClear={() => setSelectedControlNumber("")}
          disabled={!selectedTrainingTopics?.length}
          isClearable={true}
        />
        <RenderSingleDropdown
          label={"Revision Number"}
          data={getTopicDependentData("revisionNumber")}
          selectedOptions={selectedRevisionNumber}
          handleChange={(event) =>
            setSelectedRevisionNumber(event?.target?.value || "")
          }
          handleClear={() => setSelectedRevisionNumber("")}
          disabled={!selectedTrainingTopics?.length}
          isClearable={true}
        />
      </Box>
      {/* Filter line 2 */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
        <RenderDatePicker
          fromDate={fromDate}
          toDate={toDate}
          isTestEvaluation={false}
          updateFromDate={updateFromDate}
          updateToDate={updateToDate}
        />
        <RenderSingleDropdown
          label={"No. of Attempts"}
          data={NO_OF_ATTEMPTS}
          selectedOptions={selectedNoOfAttemps}
          handleChange={(event) =>
            setSelectedNoOfAttemps(event?.target?.value || "")
          }
          handleClear={() => setSelectedNoOfAttemps("")}
          isClearable={true}
        />
        <Box sx={{ width: "20%" }}>
          <RenderLabel label={"Post Test Result:"} />
          <Toggle
            selected={testResult}
            labels={["Both", "Pass", "Fail"]}
            onChange={(val) => setTestResult(val)}
            showCount={false}
          />
        </Box>
        <Box sx={{ width: "20%" }}>
          <RenderLabel label={"Evaluation:"} />
          <Toggle
            selected={selectedEvaluation}
            labels={["Pre & Post Test", "Only Post-Test"]}
            onChange={(val) => setSelectedEvaluation(val)}
            showCount={false}
          />
        </Box>
      </Box>
      {/* Filter line 3 */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
        <RenderSearchDropdown
          label={"Attendee"}
          handleStaffSelection={handleAttendeeSelection}
          selectedData={selectedAttendees}
        />
        <RenderSearchDropdown
          label={"Trainer"}
          userType={"Trainer"}
          handleStaffSelection={handleTrainerSelection}
          selectedData={selectedTrainers}
        />
        <Box sx={{ width: "20%" }} />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2, pb: 0 }}>
        <Box>
          <SecondaryButton
            disabled={false}
            type="button"
            onClick={handleRemoveFilters}
          >
            Remove All
          </SecondaryButton>
        </Box>
        <Box>
          <PrimaryButton
            onClick={onApplyFilters}
            disabled={!trainingType || staffDetailsLoading}
            sx={{ ml: 2 }}
          >
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
export default ReportFilters;
