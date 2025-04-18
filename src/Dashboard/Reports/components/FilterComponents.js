import {
  Box,
  IconButton,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { TypeTertiary } from "../../../utils/colors";
import SortIcon from "../../../assets/icons/SortIcon.svg";
import FilterDatePicker from "../../../components/DatePicker/FilterDatePicker";
import MultiCheckboxSelectCount from "../../../components/Select/MultiCheckboxSelectCount";
import MultiSelectStaffDropdown from "../../../components/Select/MultiSelectStaffDropdown";
import SingleSelectDropdown from "../../../components/Select/SingleSelectDropdown";
import useStyles from "../../styles";
import SearchAttendeeTrainer from "./SearchAttendeeTrainer";

export const RenderLabel = ({ label, disabled }) => {
  return (
    <Typography
      variant="subtitle2"
      sx={{ mb: 1, color: disabled ? TypeTertiary : "Grey.main" }}
    >
      {label}
    </Typography>
  );
};

export const RenderSingleDropdown = ({
  label,
  data,
  selectedOptions,
  handleChange,
  disabled,
  isClearable,
  handleClear,
  unitValue = "",
  width = "20%",
}) => {
  return (
    <Box sx={{ width: width }}>
      <Box sx={{ width: "100%" }}>
        <RenderLabel label={label} disabled={disabled} />
        <SingleSelectDropdown
          selected={selectedOptions}
          handleChange={handleChange}
          handleClear={handleClear}
          data={data}
          disabled={disabled}
          isClearable={isClearable}
          unitValue={unitValue}
        />
      </Box>
    </Box>
  );
};

export const RenderMultiSelectStaffDropdown = ({
  label,
  data,
  selectedOptions,
  handleChange,
  disabled,
}) => {
  return (
    <Box sx={{ width: "40%" }}>
      <Box sx={{ width: "100%" }}>
        <RenderLabel label={label} disabled={disabled} />
        <MultiSelectStaffDropdown
          options={data}
          selectedOptions={selectedOptions}
          handleChange={handleChange}
          disabled={disabled}
        />
      </Box>
    </Box>
  );
};

export const RenderMultiSelectDropdown = ({
  label,
  data,
  selectedOptions,
  handleChange,
  disabled,
  width = "20%",
}) => {
  return (
    <Box sx={{ width: width }}>
      <Box sx={{ width: "100%" }}>
        <RenderLabel label={label} disabled={disabled} />
        <MultiCheckboxSelectCount
          handleChange={handleChange}
          data={data}
          selected={selectedOptions}
          placeholder={"Select"}
          disabled={disabled}
          limitTags={1}
          sx={{ minWidth: "50px" }}
        />
      </Box>
    </Box>
  );
};

export const RenderSearchDropdown = ({
  label,
  options,
  userType,
  handleStaffSelection,
  selectedData,
  width = "40%",
}) => {
  return (
    <Box sx={{ width: width }}>
      <Box sx={{ width: "100%" }}>
        <RenderLabel label={label} />
        <SearchAttendeeTrainer
          operatorOptions={options} // Pass the operator options
          handleStaffSelection={handleStaffSelection} // Handle change
          selectedData={selectedData} // Selected value
        />
      </Box>
    </Box>
  );
};

export const RenderDatePicker = ({
  fromDate,
  toDate,
  updateFromDate,
  updateToDate,
  filters = {},
  label = "Training Date Range",
  hideTime = true,
  width = "41%",
}) => {
  const minDate = new Date(
    new Date().setFullYear(new Date().getFullYear() - 1)
  );
  const maxDate = new Date();

  return (
    <Box sx={{ width: width }}>
      <Box sx={{ width: "100%" }}>
        <RenderLabel label={label} />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <FilterDatePicker
            value={fromDate}
            handleChange={(evt) => updateFromDate(evt)}
            dateFormat={hideTime ? "dd/MM/yyyy" : "dd/MM/yyyy hh:mm aa"}
            minDate={minDate}
            maxDate={toDate || maxDate}
          />
          <Box sx={{ px: 1, pt: 1 }}>
            <RenderLabel label={"-"} />
          </Box>
          <FilterDatePicker
            value={toDate}
            handleChange={(evt) => updateToDate(evt)}
            dateFormat={hideTime ? "dd/MM/yyyy" : "dd/MM/yyyy hh:mm aa"}
            minDate={fromDate || minDate}
            maxDate={maxDate}
          />
        </Box>
      </Box>
    </Box>
  );
};

export const ReportTableHeader = ({ handleSortClick }) => {
  const classes = useStyles();

  const RenderHeaderCell = ({ label, sortKey, visible = true }) => {
    if (visible) {
      return (
        <TableCell>
          <div className={classes.columnHeader}>
            {label}
            <IconButton sx={{ p: 0 }} onClick={() => handleSortClick(sortKey)}>
              <img src={SortIcon} alt="Sort" />
            </IconButton>
          </div>
        </TableCell>
      );
    }
    return null;
  };

  return (
    <TableHead
      sx={{
        position: "sticky",
        top: 0,
        backgroundColor: "white",
        zIndex: 999,
      }}
    >
      <TableRow>
        <RenderHeaderCell label={"Training Type"} sortKey={"trainingType"} />
        <RenderHeaderCell label={"Training Topic"} sortKey={"trainingTopic"} />
        <RenderHeaderCell
          label={"Training Test Name"}
          sortKey={"trainingTestName"}
        />
        <RenderHeaderCell label={"Evaluation"} sortKey={"evaluation"} />
        <RenderHeaderCell label={"Control No."} sortKey={"controlNo"} />
        <RenderHeaderCell label={"Revision No."} sortKey={"revisionNo"} />
        <RenderHeaderCell
          label={"Applicable Attendee Level"}
          sortKey={"attendeeLevel"}
        />
        <RenderHeaderCell label={"Filled by"} sortKey={"filledBy"} />
        <RenderHeaderCell
          label={"Passing Threshold"}
          sortKey={"passingThreshold"}
        />
        <RenderHeaderCell
          label={"Creation Date & Time"}
          sortKey={"creationDateTime"}
        />
        <RenderHeaderCell label={"Planned Months"} sortKey={"plannedMonths"} />
      </TableRow>
    </TableHead>
  );
};
