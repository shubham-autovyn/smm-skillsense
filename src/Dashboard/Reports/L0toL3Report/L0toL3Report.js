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
  setSupervisorStaffReportsData,
  setSupervisorReportColumns,
} from "../../../redux/ActionCreator/ReportActionCreator";
import { fetchSupervisorStaffReports } from "../../../redux/Actions/ReportActions";
import {
  getSupervisorStaffReportsLoading,
  getSupervisorReportColumns,
  getSupervisorStaffReportsData,
} from "../../../redux/Reducers/SMMReportReducer";
import { getPlant, getShop } from "../../../redux/Reducers/SMMShopReducer";
import { fetchSupervisorStaffReportsApi } from "../../../Repository/ReportRepository";
import useStyles from "../../styles";
import { columnsSupervisor } from "../components/ReportTable/constants";
import ReportHeader from "../components/ReportTable/ReportHeader";
import ReportTableData from "../components/ReportTable/ReportTableData";
import L0toL3ReportFilters from "./L0toL3ReportFilters";
import TrainingDetailsModal from "./TrainingDetailsModal/TrainingDetailsModal";

const L0toL3Report = ({ showFilters, updateFilterCount, isDepartmentHead }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [filteredData, setFilteredData] = useState([]);
  const [isAscending, setIsAscending] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [filters, setFilters] = useState({});
  const [isTrainingDetails, setTrainingDetails] = useState(false);
  const [trainingDetailsData, setTrainingDetailsData] = useState({});

  const plant = useSelector(getPlant);
  const shop = useSelector(getShop);
  const selectedColumns = useSelector(getSupervisorReportColumns);
  const staffDetailsLoading = useSelector(getSupervisorStaffReportsLoading);
  const staffDetailsData = useSelector(getSupervisorStaffReportsData);

  useEffect(() => {
    if (Array.isArray(staffDetailsData?.training_details)) {
      setFilteredData(staffDetailsData?.training_details);
    }
  }, [staffDetailsData]);

  useEffect(() => {
    return () => {
      dispatch(setSupervisorStaffReportsData({}));
    };
  }, []);

  const handleApplyFilters = (data) => {
    const payload = {
      ...data,
      offset: 0,
      no_of_records: rowsPerPage,
      pagination_allowed: "true",
    };
    setPage(0);
    setFilters(data);
    dispatch(fetchSupervisorStaffReports(payload));
    updateFilterCount && updateFilterCount(data);
  };

  const handleColumnChange = (item) => {
    let list = [];
    if (selectedColumns && selectedColumns.includes(item)) {
      list = selectedColumns.filter((x) => x !== item);
    } else {
      list = _.cloneDeep(selectedColumns) || [];
      list.push(item);
    }
    let res = Object.keys(columnsSupervisor)?.filter((x) => list.includes(x));
    dispatch(setSupervisorReportColumns([...res]));
  };

  //Pagination: Handle Page Change
  const handleChangePage = (event, newPage) => {
    //0 to n
    setPage(newPage);
    if (shop && shop.hasOwnProperty("id")) {
      const payload = {
        pagination_allowed: "true",
        ...filters, //Adding filters to pagination payload
      };
      //If data available but not fetched for next page
      payload.offset = newPage;
      payload.no_of_records = rowsPerPage;
      dispatch(fetchSupervisorStaffReports(payload));
    }
  };

  //Pagination: Rows Per Page Change
  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset the page to 0 when changing rows per page
  };

  const dateFormat = (date) => {
    const formattedDate = dayjs(date, "YYYY-MM-DD").format("MM-DD-YYYY");
    return new Date(formattedDate);
  };

  const handleSortClick = (type) => {
    switch (type) {
      case "staff_id":
      case "staff_name":
      case "station_name":
      case "station_type":
      case "ojt_type":
      case "area_name":
      case "line_name":
      case "shop_name":
      case "plant_name":
      case "group_name":
        setFilteredData(
          filteredData?.sort((a, b) =>
            !isAscending
              ? b[type].localeCompare(a[type])
              : a[type].localeCompare(b[type])
          )
        );
        setIsAscending(!isAscending);
        break;
      case "training_duration":
        setFilteredData(
          filteredData?.sort((a, b) =>
            !isAscending
              ? parseInt(a[type]) - parseInt(b[type])
              : parseInt(b[type]) - parseInt(a[type])
          )
        );
        setIsAscending(!isAscending);
        break;
      case "training_start_date":
      case "training_end_date":
        setFilteredData(
          filteredData?.sort((a, b) =>
            isAscending
              ? dateFormat(a[type]) - dateFormat(b[type])
              : dateFormat(b[type]) - dateFormat(a[type])
          )
        );
        setIsAscending(!isAscending);
        break;
    }
  };

  const downloadExcel = () => {
    if (filteredData && filteredData.length) {
      const payload = {
        ...filters, //Adding filters to pagination payload
        pagination_allowed: "false",
      };
      fetchSupervisorStaffReportsApi(payload)
        .then((res) => {
          const data = res?.data?.response?.training_details;
          if (data && Array.isArray(data)) {
            const parsedData = data?.map((item) => {
              const obj = {};
              obj[columnsSupervisor["staff_id"].name] = item?.staff_id;
              obj[columnsSupervisor["staff_name"].name] = item?.staff_name;
              obj[columnsSupervisor["station_name"].name] = item?.station_name;
              obj[columnsSupervisor["station_type"].name] = item?.station_type;
              obj[columnsSupervisor["ojt_type"].name] = item?.ojt_type;
              obj[columnsSupervisor["training_start_date"].name] =
                item?.training_start_date;
              obj[columnsSupervisor["training_end_date"].name] =
                item?.training_end_date;
              obj[columnsSupervisor["training_duration"].name] =
                item?.training_duration;
              obj[columnsSupervisor["plant_name"].name] = plant?.plant_name;
              obj[columnsSupervisor["shop_name"].name] = shop?.shop_name;
              obj[columnsSupervisor["group_name"].name] = item?.group_name;
              obj[columnsSupervisor["line_name"].name] = item?.line_name;
              obj[columnsSupervisor["area_name"].name] = item?.area_name;
              return obj;
            });
            const worksheet = XLSX.utils.json_to_sheet(parsedData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            XLSX.writeFile(
              workbook,
              `OJT_records_${dayjs(new Date()).format("DDMMYY_hhmmss")}.xlsx`
            );
          }
        })
        .catch((ex) => {});
    }
  };

  const handleViewDetails = (data) => {
    setTrainingDetailsData(data);
    setTrainingDetails(true);
  };

  return (
    <Fragment>
      <Box>
        {showFilters && (
          <Paper sx={{ mb: 1.6, p: 1.6, minHeight: "200px" }}>
            <L0toL3ReportFilters
              handleApplyFilters={handleApplyFilters}
              updateRemovedFilters={() => updateFilterCount({})}
              isDepartmentHead={isDepartmentHead}
            />
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
                    columns={columnsSupervisor}
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
                    columnsData={columnsSupervisor}
                  />
                  <TableBody>
                    {filteredData?.map((reportData, index) => (
                      <ReportTableData
                        key={index}
                        reportData={reportData}
                        columns={columnsSupervisor}
                        selectedColumns={selectedColumns}
                        handleViewDetails={() => handleViewDetails(reportData)}
                      />
                    ))}
                  </TableBody>
                </Table>
                {filteredData.length !== 0 &&
                parseInt(staffDetailsData?.total_records / rowsPerPage) ? (
                  <div className={classes.paginationContainer}>
                    <TablePagination
                      rowsPerPageOptions={[]} // Set available rows per page options
                      component="div"
                      count={
                        parseInt(
                          staffDetailsData?.total_records / rowsPerPage
                        ) || 0
                      }
                      rowsPerPage={rowsPerPage || ""}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </div>
                ) : null}
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
        <TrainingDetailsModal
          title={`L0 to L3 Training Details | ${trainingDetailsData?.staff_name} (${trainingDetailsData?.staff_id})`}
          open={isTrainingDetails}
          trainingDetailsData={trainingDetailsData}
          handleClose={() => {
            setTrainingDetails(false);
            setTrainingDetailsData({});
          }}
        />
      </Box>
    </Fragment>
  );
};
export default L0toL3Report;
