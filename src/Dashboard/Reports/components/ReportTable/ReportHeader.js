import { Box, IconButton, TableCell, TableHead, TableRow } from "@mui/material";
import SortIcon from "../../../../assets/icons/SortIcon.svg";
import useStyles from "../../../styles";
import { columns } from "./constants";

const ReportHeader = ({
  selectedColumns,
  handleSortClick,
  columnsData = columns,
}) => {
  const classes = useStyles();

  const RenderHeaderCell = ({ reportData, item }) => {
    return reportData ? (
      <TableCell>
        <div className={classes.columnHeader}>
          {reportData?.name}
          {!reportData?.isHideSorting && (
            <IconButton sx={{ p: 0 }} onClick={() => handleSortClick(item)}>
              <img src={SortIcon} alt="Sort" />
            </IconButton>
          )}
        </div>
      </TableCell>
    ) : null;
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
        {selectedColumns &&
          selectedColumns?.map((item, index) => (
            <RenderHeaderCell
              key={index.toString()}
              reportData={columnsData[item]}
              item={item}
            />
          ))}
      </TableRow>
    </TableHead>
  );
};

export default ReportHeader;
