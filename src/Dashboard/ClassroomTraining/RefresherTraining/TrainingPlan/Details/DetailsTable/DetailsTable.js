/* eslint-disable react-hooks/exhaustive-deps */
import {
  Avatar,
  Box,
  IconButton,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import {
  Grey30,
  MarutiWhite,
  TypePrimary,
  MarutiBlue500,
} from "../../../../../../utils/colors";
import DownloadIcon from "../../../../../../assets/icons/downloadIcon.svg";
import SortIcon from "../../../../../../assets/icons/SortIcon.svg";
import { SMMTheme } from "../../../../../../Theme/theme";
import useStyles from "../../../../../styles";
import TableData from "./TableData";
import { useState, useEffect, Fragment } from "react";
import * as XLSX from "xlsx";
import { getEpochToDDMMYY } from "../../../../../../utils/helperFunctions";
import dayjs from "dayjs";
import CommonDownload from "../../../../../../components/Download/CommonDownload";
const DetailsTable = (props) => {
  const classes = useStyles();
  const [isAscending, setIsAscending] = useState(true);
  const detailsData = props?.data;
  const [filteredData, setFilteredData] = useState([]);
  const [openDownload, setOpenDownload] = useState(false);
  useEffect(() => {
    if (Array.isArray(detailsData)) {
      if (props?.staffId !== null) {
        let filterdDetails = detailsData.filter(
          (item) => item.staffId === props.staffId
        );
        setFilteredData(filterdDetails);
      } else {
        setFilteredData(detailsData);
      }
    }
  }, [detailsData]);
  const handleSortClick = (type) => {
    switch (type) {
      case "staffName":
      case "level":
      case "preTestStatus":
      case "postTestStatus":
      case "group":
      case "line":
      case "area":
        setFilteredData(
          filteredData?.sort((a, b) =>
            !isAscending
              ? b[type].localeCompare(a[type])
              : a[type].localeCompare(b[type])
          )
        );
        setIsAscending(!isAscending);
        break;
      case "staffId":
      case "trainingDate":
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

  const RenderLabel = ({ label }) => {
    return <Typography variant="h5">{label}</Typography>;
  };

  // Function for table heading
  const getTableHeaders = () => {
    return (
      <TableHead>
        <TableRow>
          <TableCell>
            <div className={classes.columnHeader}>
              <RenderLabel label="Staff ID" />
              <IconButton
                sx={{ p: 0 }}
                onClick={() => handleSortClick("staffId")}
              >
                <img src={SortIcon} alt="Sort" />
              </IconButton>
            </div>
          </TableCell>
          <TableCell>
            <div className={classes.columnHeader}>
              <RenderLabel label="Name" />
              <IconButton
                sx={{ p: 0 }}
                onClick={() => handleSortClick("staffName")}
              >
                <img src={SortIcon} alt="Sort" />
              </IconButton>
            </div>
          </TableCell>
          <TableCell>
            <div className={classes.columnHeader}>
              <RenderLabel label="Level" />
              <IconButton
                sx={{ p: 0 }}
                onClick={() => handleSortClick("level")}
              >
                <img src={SortIcon} alt="Sort" />
              </IconButton>
            </div>
          </TableCell>
          <TableCell>
            <div className={classes.columnHeader}>
              <RenderLabel label="Training date" />
              <IconButton
                sx={{ p: 0 }}
                onClick={() => handleSortClick("trainingDate")}
              >
                <img src={SortIcon} alt="Sort" />
              </IconButton>
            </div>
          </TableCell>
          {props?.preTestAssigned && (
            <TableCell>
              <div className={classes.columnHeader}>
                <RenderLabel label="Pre test" />
                <IconButton
                  sx={{ p: 0 }}
                  onClick={() => handleSortClick("preTestStatus")}
                >
                  <img src={SortIcon} alt="Sort" />
                </IconButton>
              </div>
            </TableCell>
          )}
          <TableCell>
            <div className={classes.columnHeader}>
              <RenderLabel label="Post test" />
              <IconButton
                sx={{ p: 0 }}
                onClick={() => handleSortClick("postTestStatus")}
              >
                <img src={SortIcon} alt="Sort" />
              </IconButton>
            </div>
          </TableCell>
          <TableCell>
            <div className={classes.columnHeader}>
              <RenderLabel label="Group" />
              <IconButton
                sx={{ p: 0 }}
                onClick={() => handleSortClick("group")}
              >
                <img src={SortIcon} alt="Sort" />
              </IconButton>
            </div>
          </TableCell>
          <TableCell>
            <div className={classes.columnHeader}>
              <RenderLabel label="Line" />
              <IconButton sx={{ p: 0 }} onClick={() => handleSortClick("line")}>
                <img src={SortIcon} alt="Sort" />
              </IconButton>
            </div>
          </TableCell>
          <TableCell>
            <div className={classes.columnHeader}>
              <RenderLabel label="Area" />
              <IconButton sx={{ p: 0 }} onClick={() => handleSortClick("area")}>
                <img src={SortIcon} alt="Sort" />
              </IconButton>
            </div>
          </TableCell>
        </TableRow>
      </TableHead>
    );
  };
  const downloadExcel = (data) => {
    const parsedData = data.map((item) => {
      let obj = {
        "Training topic": props?.topicName,
        "Staff Id": item?.staffId,
        Name: item?.staffName,
        Level: item?.level,
        "Training date": getEpochToDDMMYY(item?.trainingDate),
        "Post Test": item?.postTestStatus,
        "Post Test Attempts": item?.postTestAttempt,
        Group: item?.group,
        Line: item?.line,
        Area: item?.area,
      };
      if (props?.preTestAssigned) {
        obj["Pre Test"] = item?.preTestStatus;
      }
      return obj;
    });
    const worksheet = XLSX.utils.json_to_sheet(parsedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(
      workbook,
      `Attendee_Details_${dayjs(new Date()).format("DDMMYY_HHmmss")}.xlsx`
    );
    setOpenDownload(true);
  };
  return (
    <ThemeProvider theme={SMMTheme}>
      <Fragment>
        <Box>
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" color={TypePrimary}>
              Total {filteredData?.length}
            </Typography>
            <Avatar
              sx={{
                bgcolor: MarutiWhite,
                height: "3.2rem",
                width: "3.2rem",
                borderRadius: 1,
                border: 1,
                borderColor: Grey30,
              }}
              variant="rounded"
              sizes="small"
              onClick={() => {
                downloadExcel(filteredData);
              }}
            >
              <img
                alt="download"
                src={DownloadIcon}
                style={{
                  cursor: "pointer",
                  height: "1.602rem",
                  width: "1.6rem",
                }}
              />
            </Avatar>
          </Box>
          {props.loading ? (
            <Skeleton
              className={classes["details-table-dimensions"]}
              animation="wave"
              variant="rectangular"
            />
          ) : (
            <TableContainer
              className={`${classes["master-table"]} ${classes["details-table-dimensions"]}`}
              component={Paper}
            >
              <Table stickyHeader aria-label="sticky table">
                {getTableHeaders()}
                <TableBody className={classes["master-table-body"]}>
                  {filteredData?.map((row, index) => (
                    <TableData  isPreTestAssigned={props?.preTestAssigned} key={index} tableData={row} />
                  ))}
                </TableBody>
              </Table>
              {filteredData?.length === 0 && (
                <Box
                  className={classes["loader-container"]}
                  sx={{ mt: 1, mb: 1 }}
                >
                  <Typography style={{ color: MarutiBlue500 }}>
                    No record found
                  </Typography>
                </Box>
              )}
            </TableContainer>
          )}
        </Box>
        {openDownload && (
          <CommonDownload
            open={openDownload}
            handleClose={() => setOpenDownload(false)}
          />
        )}
      </Fragment>
    </ThemeProvider>
  );
};
export default DetailsTable;
