/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { MarutiBlue500, TypePrimary } from "../../../../utils/colors";
import SortIcon from "../../../../assets/icons/SortIcon.svg";
import NoReportsSelected from "../../../../components/NoDataViews/NoReportsSelected";
import useStyles from "../../../styles";
import TableData from "./TestTemplateData";
const monthsMap = {
  apr: 0,
  may: 1,
  jun: 2,
  jul: 3,
  aug: 4,
  sep: 5,
  oct: 6,
  nov: 7,
  dec: 8,
  jan: 9,
  feb: 10,
  mar: 11,
  adhoc: 12,
};
const DetailsTable = ({ detailsData, trainingType, isReset }) => {
  const classes = useStyles();
  const [isAscending, setIsAscending] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    if (Array.isArray(detailsData)) {
      setFilteredData(detailsData);
    }
  }, [detailsData]);
  const handleSortClick = (type) => {
    switch (type) {
      case "plannedMonths":
        setFilteredData(
          filteredData?.sort((a, b) =>
            !isAscending
              ? monthsMap[a.plannedMonths[0].toLowerCase()] -
                monthsMap[b.plannedMonths[0].toLowerCase()]
              : monthsMap[b.plannedMonths[0].toLowerCase()] -
                monthsMap[a.plannedMonths[0].toLowerCase()]
          )
        );
        setIsAscending(!isAscending);
        break;
      case "filled_by":
      case "evaluation":
      case "planType":
      case "controlNo":
      case "testName":
      case "topicName":
        setFilteredData(
          filteredData?.sort((a, b) =>
            !isAscending
              ? b[type].localeCompare(a[type])
              : a[type].localeCompare(b[type])
          )
        );
        setIsAscending(!isAscending);
        break;
      case "revision_no":
      case "passingScore":
      case "uploaded_at":
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
              <RenderLabel label="Training Type" />
              <IconButton
                sx={{ p: 0 }}
                onClick={() => handleSortClick("trainingType")}
              >
                <img src={SortIcon} alt="Sort" />
              </IconButton>
            </div>
          </TableCell>
          <TableCell>
            <div className={classes.columnHeader}>
              <RenderLabel label="Training Topic" />
              <IconButton
                sx={{ p: 0 }}
                onClick={() => handleSortClick("topicName")}
              >
                <img src={SortIcon} alt="Sort" />
              </IconButton>
            </div>
          </TableCell>
          <TableCell>
            <div className={classes.columnHeader}>
              <RenderLabel label="Training Test Name" />
              <IconButton
                sx={{ p: 0 }}
                onClick={() => handleSortClick("testName")}
              >
                <img src={SortIcon} alt="Sort" />
              </IconButton>
            </div>
          </TableCell>
          <TableCell>
            <div className={classes.columnHeader}>
              <RenderLabel label="Control No." />
              <IconButton
                sx={{ p: 0 }}
                onClick={() => handleSortClick("controlNo")}
              >
                <img src={SortIcon} alt="Sort" />
              </IconButton>
            </div>
          </TableCell>
          <TableCell>
            <div className={classes.columnHeader}>
              <RenderLabel label="Revision No." />
              <IconButton
                sx={{ p: 0 }}
                onClick={() => handleSortClick("revision_no")}
              >
                <img src={SortIcon} alt="Sort" />
              </IconButton>
            </div>
          </TableCell>
          <TableCell>
            <div className={classes.columnHeader}>
              <RenderLabel label="Applicable Attendee Level" />
              <IconButton
                sx={{ p: 0 }}
                onClick={() => handleSortClick("planType")}
              >
                <img src={SortIcon} alt="Sort" />
              </IconButton>
            </div>
          </TableCell>

          <TableCell>
            <div className={classes.columnHeader}>
              <RenderLabel label="Evaluation" />
              <IconButton
                sx={{ p: 0 }}
                onClick={() => handleSortClick("evaluation")}
              >
                <img src={SortIcon} alt="Sort" />
              </IconButton>
            </div>
          </TableCell>
          <TableCell>
            <div className={classes.columnHeader}>
              <RenderLabel label="Filled by" />
              <IconButton
                sx={{ p: 0 }}
                onClick={() => handleSortClick("filled_by")}
              >
                <img src={SortIcon} alt="Sort" />
              </IconButton>
            </div>
          </TableCell>
          <TableCell>
            <div className={classes.columnHeader}>
              <RenderLabel label="Passing Threshold" />
              <IconButton
                sx={{ p: 0 }}
                onClick={() => handleSortClick("passingScore")}
              >
                <img src={SortIcon} alt="Sort" />
              </IconButton>
            </div>
          </TableCell>
          <TableCell>
            <div className={classes.columnHeader}>
              <RenderLabel label="Creation Date & Time" />
              <IconButton
                sx={{ p: 0 }}
                onClick={() => handleSortClick("uploaded_at")}
              >
                <img src={SortIcon} alt="Sort" />
              </IconButton>
            </div>
          </TableCell>
          <TableCell>
            <div className={classes.columnHeader}>
              <RenderLabel label="Planned Months" />
              <IconButton
                sx={{ p: 0 }}
                onClick={() => handleSortClick("plannedMonths")}
              >
                <img src={SortIcon} alt="Sort" />
              </IconButton>
            </div>
          </TableCell>
        </TableRow>
      </TableHead>
    );
  };

  return (
    <Fragment>
      <Box>
        {isReset ? (
          <NoReportsSelected />
        ) : (
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
            </Box>

            <TableContainer
              className={`${classes["master-table"]} ${classes["details-table-dimensions"]}`}
              component={Paper}
            >
              <Table stickyHeader aria-label="sticky table">
                {getTableHeaders()}
                <TableBody className={classes["master-table-body"]}>
                  {filteredData?.map((row, index) => (
                    <TableData
                      trainingType={trainingType}
                      key={index}
                      tableData={row}
                    />
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
          </Box>
        )}
      </Box>
    </Fragment>
  );
};
export default DetailsTable;
