import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../../utils/Buttons/SecondaryButton/SecondaryButton";
import Toggle from "../../../components/Toggle/ToggleButton";
import { fetchNewRefresherTrainingTopic } from "../../../redux/Actions/ClassroomAction";
import {
  getTrainingTopicList,
  getTrainingTopicListLoading,
} from "../../../redux/Reducers/SMMClassroomReducer";
import { getShop } from "../../../redux/Reducers/SMMShopReducer";
import {
  RenderDatePicker,
  RenderLabel,
  RenderMultiSelectDropdown,
  RenderSingleDropdown,
} from "../components/FilterComponents";
import MultiCheckboxCount from "./components/MultiCheckboxSelectCount";
import { TypeTertiary } from "../../../utils/colors";
const TRAINING_TYPE = ["Refresher", "New joinee", "Department change"];

const TestTemplateFilters = ({
  handleFilteredData,
  handleTrainingType,
  trainingType,
  handleResetClick,
  updateFilterCount,
}) => {
  const [selectedEvaluation, setSelectedEvaluation] =
    useState("Pre & Post-Test");
  const [filledBy, setFilledBy] = useState("Trainer");
  const [attendeeLevel, setAttendeeLevel] = useState("");
  const [trainingTopics, setTrainingTopics] = useState([]);
  const [selectedTestNames, setSelectedTestNames] = useState([]);
  const [selectedControlNumber, setSelectedControlNumber] = useState("");
  const [selectedRevisionNumber, setSelectedRevisionNumber] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [passingScore, setPassingScore] = useState("");
  const dispatch = useDispatch();
  const shop = useSelector(getShop);
  const topicData = useSelector(getTrainingTopicList);

  const handleReset = () => {
    handleTrainingType("Refresher");
    setSelectedEvaluation("Pre & Post-Test");
    setFilledBy("Trainer");
    setAttendeeLevel("");
    setTrainingTopics([]);
    setSelectedTestNames([]);
    setSelectedControlNumber("");
    setSelectedRevisionNumber("");
    setFilteredData([]);
    setSelectedMonths([]);
    setPassingScore("");
    handleResetClick(true);
    updateFilterCount(0);
  };
  useEffect(() => {
    if (trainingType) {
      const payload = {
        shop_id: shop?.id?.toString(),
        training_type: trainingType,
      };
      dispatch(fetchNewRefresherTrainingTopic(payload));
    }
  }, [trainingType, shop]);

  const checkApplyDisabled = () => {
    if (trainingType === "") {
      return true;
    }
    return false;
  };

  const handleApplyClick = () => {
    let count = 3;
    if (Array.isArray(topicData?.topicsPlan)) {
      const filterTopicPlan = topicData?.topicsPlan?.filter((item) => {
        return (
          item?.filled_by === filledBy && //1.Filled by trainer/trainee
          item?.evaluation ===
            (selectedEvaluation === "Pre & Post-Test" //Pre+Post r
              ? "Pre+Post"
              : "Post") &&
          (attendeeLevel === ""
            ? true
            : attendeeLevel.toLowerCase() === item?.planType?.toLowerCase()) &&
          (passingScore === ""
            ? true
            : item?.passingScore * 100 === passingScore) &&
          (trainingTopics?.length === 0
            ? true
            : trainingTopics.includes(item)) &&
          (selectedTestNames?.length === 0
            ? true
            : selectedTestNames.includes(item?.testName)) &&
          (selectedControlNumber === ""
            ? true
            : item?.controlNo === selectedControlNumber) &&
          (selectedRevisionNumber === ""
            ? true
            : item?.revision_no === selectedRevisionNumber) &&
          (selectedMonths?.length === 0
            ? true
            : item.plannedMonths.some((mnth) => selectedMonths.includes(mnth)))
        );
      });
      setFilteredData(filterTopicPlan);
      handleFilteredData(filterTopicPlan);
    }
    handleResetClick(false);

    if (attendeeLevel !== "") {
      ++count;
    }
    if (passingScore !== "") {
      ++count;
    }
    if (trainingTopics?.length !== 0) {
      ++count;
    }
    if (selectedTestNames?.length !== 0) {
      ++count;
    }
    if (selectedTestNames?.length !== 0) {
      ++count;
    }
    if (selectedControlNumber !== "") {
      ++count;
    }
    if (selectedRevisionNumber !== "") {
      ++count;
    }
    if (selectedMonths?.length !== 0) {
      ++count;
    }
    updateFilterCount(count);
  };

  const getUniqueArray = (arr) => {
    return arr?.filter((item, index) => arr?.indexOf(item) === index);
  };
  const handleTrainingTypeChange = (event) => {
    handleTrainingType(event.target.value); //Setting the training type
    //
    setSelectedEvaluation("Pre & Post-Test");
    setFilledBy("Trainer");
    setAttendeeLevel("");
    setTrainingTopics([]);
    setSelectedTestNames([]);
    setSelectedControlNumber("");
    setSelectedRevisionNumber("");
    setFilteredData([]);
    setSelectedMonths([]);
    setPassingScore("");
    handleResetClick(true);
    updateFilterCount(0);
  };
  useEffect(() => {
    setSelectedTestNames(
      getUniqueArray(trainingTopics.map((item) => item?.testName))
    );
    setSelectedControlNumber("");
    setSelectedRevisionNumber("");
  }, [trainingTopics]);
  return (
    <Box>
      {/* Filter line 1 */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <RenderSingleDropdown
          label={"Training Type:"}
          selectedOptions={trainingType}
          data={TRAINING_TYPE}
          handleChange={handleTrainingTypeChange}
        />
        <Box sx={{ width: "20%" }}>
          <Box sx={{ width: "100%" }}>
            <Typography
              variant="subtitle2"
              sx={{ mb: 1, color: false ? TypeTertiary : "Grey.main" }}
            >
              Training Topic
            </Typography>
            <MultiCheckboxCount
              handleChange={(evt) => {
                setTrainingTopics(evt.target.value);
              }}
              data={topicData?.topicsPlan}
              selected={trainingTopics}
              placeholder={"Select"}
            />
          </Box>
        </Box>
        <RenderMultiSelectDropdown
          label={"Training Test Name"}
          data={getUniqueArray(trainingTopics.map((item) => item?.testName))}
          selectedOptions={selectedTestNames}
          disabled={trainingTopics?.length === 0}
          handleChange={(event) => {
            const { value } = event.target;
            setSelectedTestNames(
              typeof value === "string" ? value.split(",") : value
            );
            setSelectedRevisionNumber("");
            setSelectedControlNumber("");
          }}
        />
        <RenderSingleDropdown
          label={"Control Number"}
          data={
            selectedTestNames?.length === 0
              ? getUniqueArray(trainingTopics.map((item) => item?.controlNo))
              : getUniqueArray(
                  trainingTopics
                    .filter((item) =>
                      selectedTestNames.includes(item?.testName)
                    )
                    .map((item) => item?.controlNo)
                )
          }
          disabled={trainingTopics?.length === 0}
          selectedOptions={selectedControlNumber}
          handleChange={(event) =>
            setSelectedControlNumber(event?.target?.value || "")
          }
          handleClear={() => setSelectedControlNumber("")}
          isClearable={true}
        />
        <RenderSingleDropdown
          label={"Revision Number"}
          data={
            selectedTestNames?.length === 0
              ? getUniqueArray(trainingTopics.map((item) => item?.revision_no))
              : getUniqueArray(
                  trainingTopics
                    .filter((item) =>
                      selectedTestNames.includes(item?.testName)
                    )
                    .map((item) => item?.revision_no)
                )
          }
          disabled={trainingTopics?.length === 0}
          selectedOptions={selectedRevisionNumber}
          handleChange={(event) =>
            setSelectedRevisionNumber(event?.target?.value || "")
          }
          handleClear={() => setSelectedRevisionNumber("")}
          isClearable={true}
        />
      </Box>
      {/* Filter line 2 */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
        <RenderSingleDropdown
          label={"Applicable Attendee Levels"}
          data={
            trainingType === "Refresher"
              ? ["All", "Operator", "Supervisor"]
              : ["Operator"]
          }
          selectedOptions={attendeeLevel}
          handleChange={(event) => setAttendeeLevel(event?.target?.value)}
          handleClear={() => setAttendeeLevel("")}
          isClearable={true}
        />
        <Box sx={{ width: "20%" }}>
          <RenderLabel label={"Evaluation:"} />
          <Toggle
            selected={selectedEvaluation}
            labels={["Pre & Post-Test", "Only Post-Test"]}
            onChange={(val) => setSelectedEvaluation(val)}
            showCount={false}
          />
        </Box>
        <Box sx={{ width: "20%" }} />
        <Box sx={{ width: "20%" }} />
        <Box sx={{ width: "20%" }} />
      </Box>
      {/* Filter line 3 */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
        <Box sx={{ width: "20%" }}>
          <RenderLabel label={"Filled by"} />
          <Toggle
            selected={filledBy}
            labels={["Trainer", "Trainee"]}
            onChange={(val) => setFilledBy(val)}
            showCount={false}
          />
        </Box>
        <RenderSingleDropdown
          label={"Passing Threshold"}
          data={getUniqueArray(
            topicData?.topicsPlan?.map((item) =>
              Math.trunc(item?.passingScore * 100)
            )
          )}
          selectedOptions={passingScore}
          handleChange={(event) => setPassingScore(event?.target?.value || "")}
          handleClear={() => setPassingScore("")}
          isClearable={true}
          unitValue={"%"}
        />
        <RenderMultiSelectDropdown
          label={"Planned Months"}
          data={
            trainingType === "Refresher"
              ? [
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                  "Jan",
                  "Feb",
                  "Mar",
                ]
              : ["Adhoc"]
          }
          selectedOptions={
            trainingType === "Refresher" ? selectedMonths : ["Adhoc"]
          }
          handleChange={(event) => {
            const { value } = event.target;
            setSelectedMonths(
              typeof value === "string" ? value.split(",") : value
            );
          }}
        />
        <Box sx={{ width: "20%" }} />
        <Box sx={{ width: "20%" }} />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2, pb: 0 }}>
        <Box>
          <SecondaryButton disabled={false} type="button" onClick={handleReset}>
            Remove All
          </SecondaryButton>
        </Box>
        <Box>
          <PrimaryButton
            onClick={handleApplyClick}
            disabled={checkApplyDisabled()}
            sx={{ ml: 2 }}
          >
            Apply Filters
          </PrimaryButton>
        </Box>
      </Box>
    </Box>
  );
};
export default TestTemplateFilters;
