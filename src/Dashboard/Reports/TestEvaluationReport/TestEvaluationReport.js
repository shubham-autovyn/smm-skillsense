import {
  Box,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import _ from "lodash";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as XLSX from "xlsx";
import { MarutiBlue500 } from "../../../utils/colors";
import ColumnSelector from "../../../components/ColumnSelector/ColumnSelector";
import DownloadContainer from "../../../components/DownloadContainer";
import NoReportsSelected from "../../../components/NoDataViews/NoReportsSelected";
import {
  setReportColumns,
  setStaffDetailsData,
} from "../../../redux/ActionCreator/ReportActionCreator";
import {
  fetchStaffDetailsData,
  updateCombinedReportData,
} from "../../../redux/Actions/ReportActions";
import {
  getReportColumns,
  getReportDataCombined,
  getStaffDetailsData,
  getStaffDetailsLoading,
} from "../../../redux/Reducers/SMMReportReducer";
import { getShop } from "../../../redux/Reducers/SMMShopReducer";
import { fetchStaffDetails } from "../../../Repository/ReportRepository";
import { getFormattedEpocDateTime } from "../../../utils/helperFunctions";
import useStyles from "../../styles";
import { columns } from "../components/ReportTable/constants";
import ReportHeader from "../components/ReportTable/ReportHeader";
import ReportTableData from "../components/ReportTable/ReportTableData";
import ReportFilters from "./ReportFilters";

const TestEvaluationReport = ({
  showFilters,
  selectedReportType,
  updateFilterCount,
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [filteredData, setFilteredData] = useState([]);
  const [isAscending, setIsAscending] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [filters, setFilters] = useState({});

  const shop = useSelector(getShop);
  const selectedColumns = useSelector(getReportColumns);
  const staffDetailsLoading = useSelector(getStaffDetailsLoading);
  const staffDetailsData = useSelector(getStaffDetailsData);
  const combinedReportData = useSelector(getReportDataCombined);

  useEffect(() => {
    if (Array.isArray(staffDetailsData?.staffDetails)) {
      setFilteredData(staffDetailsData?.staffDetails);
      dispatch(
        updateCombinedReportData([
          ...combinedReportData,
          ...staffDetailsData?.staffDetails,
        ])
      );
      let payload = {
        shop_id: shop?.id,
        ...filters,
        is_pagination_disabled: "false",
      };
      payload.start_key = staffDetailsData?.lastKey;
      if (
        combinedReportData.length < (page + 1) * rowsPerPage &&
        staffDetailsData.lastKey
      ) {
        dispatch(fetchStaffDetailsData(payload));
      }
    }
  }, [staffDetailsData]);

  useEffect(() => {
    if (combinedReportData !== undefined && combinedReportData?.length) {
      //Sorting the data on initially fetched next/prev page
      setFilteredData(
        combinedReportData.slice(page * rowsPerPage, (page + 1) * rowsPerPage)
      );
    }
  }, [combinedReportData]);

  useEffect(() => {
    return () => {
      dispatch(updateCombinedReportData([]));
      dispatch(setStaffDetailsData({}));
    };
  }, []);

  const handleApplyFilters = (data) => {
    const payload = {
      ...data,
      shop_id: shop?.id?.toString(),
      is_pagination_disabled: "false",
    };
    setFilters(data);
    setPage(0);
    dispatch(updateCombinedReportData([]));
    dispatch(fetchStaffDetailsData(payload));
    updateFilterCount && updateFilterCount(data);
    if (data?.evaluation && data.evaluation === "Post") {
      if (selectedColumns?.includes("pre_test_result")) {
        handleColumnChange("pre_test_result");
      }
    } else {
      if (!selectedColumns?.includes("pre_test_result")) {
        handleColumnChange("pre_test_result");
      }
    }
  };

  const handleColumnChange = (item) => {
    let list = [];
    if (selectedColumns && selectedColumns.includes(item)) {
      list = selectedColumns.filter((x) => x !== item);
    } else {
      list = _.cloneDeep(selectedColumns) || [];
      list.push(item);
    }
    let res = Object.keys(columns)?.filter((x) => list.includes(x));
    dispatch(setReportColumns([...res]));
  };

  //Pagination: Handle Page Change
  const handleChangePage = (event, newPage) => {
    //0 to n
    const isForwardPage = Boolean(newPage > page); // Check if it's a forward page change
    setPage(newPage);
    if (shop && shop.hasOwnProperty("id")) {
      const payload = {
        shop_id: shop?.id,
        is_pagination_disabled: "false",
        ...filters, //Adding filters to pagination payload
      };
      //If data available but not fetched for next page
      if (
        isForwardPage &&
        combinedReportData.length < (newPage + 1) * rowsPerPage &&
        staffDetailsData?.lastKey !== null
      ) {
        payload.start_key = staffDetailsData?.lastKey;
        dispatch(fetchStaffDetailsData(payload));
      }
      //If data not available for the next page.
      if (
        isForwardPage &&
        combinedReportData.length < (newPage + 1) * rowsPerPage &&
        staffDetailsData?.lastKey === null
      ) {
        setFilteredData(
          combinedReportData.slice(
            newPage * rowsPerPage,
            (newPage + 1) * rowsPerPage
          )
        );
      }
      //If data available already fetched for the next page
      if (
        isForwardPage &&
        combinedReportData.length >= (newPage + 1) * rowsPerPage
      ) {
        setFilteredData(
          combinedReportData.slice(
            newPage * rowsPerPage,
            (newPage + 1) * rowsPerPage
          )
        );
      }
      //For previous page
      if (!isForwardPage) {
        setFilteredData(
          combinedReportData.slice(
            newPage * rowsPerPage,
            (newPage + 1) * rowsPerPage
          )
        );
      }
    }
  };

  //Pagination: Rows Per Page Change
  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset the page to 0 when changing rows per page
  };

  const handleSortClick = (type) => {
    switch (type) {
      case "training_type":
      case "training_topic_name":
      case "training_test_name":
      case "evaluation":
      case "control_no":
      case "revision":
      case "pre_test_result":
      case "post_test_result":
      case "post_attempts":
      case "staff_id":
      case "staff_name":
      case "staff_level":
      case "trainer_id":
      case "trainer_name":
      case "station":
      case "area":
      case "line":
      case "group":
      case "shop":
      case "plant":
        setFilteredData(
          filteredData?.sort((a, b) =>
            !isAscending
              ? b[type].localeCompare(a[type])
              : a[type].localeCompare(b[type])
          )
        );
        setIsAscending(!isAscending);
        break;
      case "training_time":
        setFilteredData(
          filteredData?.sort((a, b) =>
            !isAscending
              ? parseInt(a[type]) - parseInt(b[type])
              : parseInt(b[type]) - parseInt(a[type])
          )
        );
        setIsAscending(!isAscending);
        break;
    }
  };

  const downloadExcel = () => {
    if (filteredData && filteredData.length) {
      const payload = {
        shop_id: shop?.id,
        ...filters, //Adding filters to pagination payload
        is_pagination_disabled: "true",
      };
      fetchStaffDetails(payload)
        .then((res) => {
          const data = res?.data?.response?.staffDetails;
          if (data && Array.isArray(data)) {
            const parsedData = data?.map((item) => {
              const obj = {};
              obj[columns["training_type"].name] = item?.training_type;
              obj[columns["training_topic_name"].name] =
                item?.training_topic_name;
              obj[columns["training_test_name"].name] =
                item?.training_test_name;
              obj[columns["evaluation"].name] = item?.evaluation;
              obj[columns["control_no"].name] = item?.control_no;
              obj[columns["revision"].name] = item?.revision;
              obj[columns["pre_test_result"].name] = item?.pre_test_result;
              obj[columns["post_test_result"].name] = item?.post_test_result;
              obj[columns["post_attempts"].name] = item?.post_attempts;
              obj[columns["training_time"].name] = getFormattedEpocDateTime(
                item?.training_time
              );
              obj[columns["staff_id"].name] = item?.staff_id;
              obj[columns["staff_name"].name] = item?.staff_name;
              obj[columns["staff_level"].name] = item?.staff_level;
              obj[columns["trainer_id"].name] = item?.trainer_id;
              obj[columns["trainer_name"].name] = item?.trainer_name;
              obj[columns["station"].name] = item?.station;
              obj[columns["area"].name] = item?.area;
              obj[columns["line"].name] = item?.line;
              obj[columns["group"].name] = item?.group;
              obj[columns["shop"].name] = item?.shop;
              obj[columns["plant"].name] = item?.plant;
              return obj;
            });
            const worksheet = XLSX.utils.json_to_sheet(parsedData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            XLSX.writeFile(
              workbook,
              `Training_test_report_${dayjs(new Date()).format(
                "DDMMYY_hhmmss"
              )}.xlsx`
            );
          }
        })
        .catch((ex) => {});
    }
  };

  const handleTest = (data, type, testStatus) => {
    const testId = Date.now().toString(36);
    const topicData = {
      shop_id: shop?.id?.toString(),
      staff_id: data.staff_id,
      training_id: data?.training_id,
      test_type: type, //type is pre or post
      masterTopicId: data?.masterTopicId,
      FilledBy: data?.topicFilledBy === "Trainee" ? "Trainee" : "Trainer",
      staffName: data.staff_name,
      trainingType: data?.training_type,
      trainerId: data.trainer_id,
      trainerName: data.trainer_name,
      area: data.area,
      group: data.group,
      line: data.line,
    };
    sessionStorage.setItem(testId, JSON.stringify(topicData));
    if (data?.topicFilledBy === "Trainer" && testStatus) {
      let evaluationUrl = `/SMM/TrainerFill?test=${[testId]}`;
      window.open(evaluationUrl, "_blank");
    } else {
      let testUrl = `/SMM/TestView?test=${[testId]}`;
      window.open(testUrl, "_blank");
    }
  };

  const RenderSelectedFilter = (selectedReport) => {
    switch (selectedReport) {
      case "Classroom Training Test Evaluations":
        return (
          <ReportFilters
            handleApplyFilters={handleApplyFilters}
            updateRemovedFilters={() => updateFilterCount({})}
          />
        );
      default:
        return <Box>FILTER NOT IMPLEMENTED</Box>;
    }
  };
  return (
    <Fragment>
      <Box>
        {showFilters && (
          <Paper sx={{ mb: 1.6, p: 1.6, minHeight: "200px" }}>
            {RenderSelectedFilter(selectedReportType)}
          </Paper>
        )}
        <Paper sx={{ mb: 1.6, p: 1.6 }}>
          {staffDetailsLoading ? (
            <Skeleton
              className={`${classes["details-table-dimensions"]}`}
              animation="wave"
              variant="rectangular"
            />
          ) : filteredData?.length ? (
            <>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box sx={{ width: "98%" }}>
                  <DownloadContainer
                    totalCount={staffDetailsData?.count?.toString() || ""}
                    handleDownload={downloadExcel}
                  />
                </Box>
                <Box sx={{ width: "10rem" }}>
                  <ColumnSelector
                    onChange={handleColumnChange}
                    selectedColumns={selectedColumns}
                    columns={columns}
                  />
                </Box>
              </Box>
              <TableContainer
                className={`${classes["details-table-dimensions"]}`}
                component={Paper}
              >
                <Table stickyHeader>
                  <ReportHeader
                    handleSortClick={handleSortClick}
                    selectedColumns={selectedColumns}
                  />
                  <TableBody>
                    {filteredData?.map((reportData, index) => (
                      <ReportTableData
                        key={index}
                        reportData={reportData}
                        columns={columns}
                        selectedColumns={selectedColumns}
                        handleTest={(type, status) =>
                          handleTest(reportData, type, status)
                        }
                      />
                    ))}
                  </TableBody>
                </Table>
                {filteredData.length !== 0 && (
                  <div className={classes.paginationContainer}>
                    <TablePagination
                      rowsPerPageOptions={[]} // Set available rows per page options
                      component="div"
                      count={staffDetailsData?.count || 0}
                      rowsPerPage={rowsPerPage || ""}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </div>
                )}
              </TableContainer>
            </>
          ) : Object.keys(filters).filter((v) => filters[v]).length &&
            !filteredData?.length ? (
            <Box
              className={`${classes["details-table-dimensions"]}`}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h4"
                sx={{ color: MarutiBlue500, fontWeight: "500" }}
              >
                No record found
              </Typography>
            </Box>
          ) : (
            <NoReportsSelected />
          )}
        </Paper>
      </Box>
    </Fragment>
  );
};
export default TestEvaluationReport;
