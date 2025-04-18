import { Box, TableCell, TableRow, Typography } from "@mui/material";
import { Fragment } from "react";
import { MarutiBlue500, MarutiWhite } from "../../../../utils/colors";
import EvaluationResult from "../../../../components/TestEvaluation/EvaluationResult";
import { getFormattedEpocDateTime } from "../../../../utils/helperFunctions";
import MaruAAR from "../../../../assets/icons/MaruAAR.svg";
import NonMaru from "../../../../assets/icons/NonMaru.svg";
import MaruAR from "../../../../assets/icons/MaruAR.svg";
import MaruA from "../../../../assets/icons/MaruA.svg";
import { useSelector } from "react-redux";
import { getPlant, getShop } from "../../../../redux/Reducers/SMMShopReducer";

const getMaruIcon = (maruType) => {
  switch (maruType) {
    case "A":
      return MaruA;
    case "A/AR":
      return MaruAAR;
    case "AR":
      return MaruAR;
    default:
      return NonMaru;
  }
};

const ReportTableData = ({
  reportData,
  columns = {},
  selectedColumns = [],
  handleTest = () => {},
  handleViewDetails = () => {},
}) => {
  const plant = useSelector(getPlant);
  const shop = useSelector(getShop);

  const getResult = (status) => {
    switch (status) {
      case "Pass":
        return "passed";
      case "Fail":
        return "failed";
      default:
        return "NA";
    }
  };

  const TableCellData = ({ column = {}, item = "" }) => {
    switch (column?.value) {
      case "pre_test_result":
        return (
          <EvaluationResult
            result={getResult(item)}
            handleTest={() => handleTest("pre", getResult(item))}
          />
        );
      case "post_test_result":
        return (
          <EvaluationResult
            result={getResult(item)}
            handleTest={() => handleTest("post", getResult(item))}
          />
        );
      case "training_time":
        return getFormattedEpocDateTime(item);
      case "view_details":
        return (
          <Box sx={{ cursor: "pointer" }} onClick={handleViewDetails}>
            <Typography sx={{ color: MarutiBlue500 }}>View Details</Typography>
          </Box>
        );
      case "station_name":
        const maruIcon = getMaruIcon(reportData?.station_type);
        return (
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <img src={maruIcon} alt="Maru icon" width={18} height={16} />
            {`${item} | ${reportData?.description}`}
          </Box>
        );

      case "station_type":
        return item === "NA" ? item : `Maru ${item}`;
      case "plant_name":
        return plant?.plant_name || "";
      case "shop_name":
        return shop?.shop_name || "";
      default:
        return item;
    }
  };
  return (
    <Fragment>
      <TableRow>
        {selectedColumns?.map((item, index) => (
          <TableCell
            key={index.toString()}
            sx={{
              position: "sticky",
              wordWrap: "break-word",
              overflowWrap: "anywhere",
              zIndex: "inherit",
              backgroundColor: MarutiWhite,
              width: `${columns[item]?.width}vw`,
              minWidth: `${columns[item]?.width}vw`,
              maxWidth: `${columns[item]?.width}vw`,
            }}
          >
            <TableCellData
              key={index?.toString()}
              item={reportData[item]}
              column={columns[item]}
            />
          </TableCell>
        ))}
      </TableRow>
    </Fragment>
  );
};
export default ReportTableData;
