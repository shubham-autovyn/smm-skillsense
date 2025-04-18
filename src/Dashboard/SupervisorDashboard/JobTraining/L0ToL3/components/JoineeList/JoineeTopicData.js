import {
  Box,
  LinearProgress,
  linearProgressClasses,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Fragment, useState } from "react";
import {
  Grey20,
  Grey30,
  MarutiBlue500,
  StatusDone,
} from "../../../../../../../Utilities/colors";
import ConfirmationDialog from "../../../../../../components/ConfirmationDialog";
import MaruAAR from "../../../../../../assets/icons/MaruAAR.svg";
import NonMaru from "../../../../../../assets/icons/NonMaru.svg";
import MaruAR from "../../../../../../assets/icons/MaruAR.svg";
import MaruA from "../../../../../../assets/icons/MaruA.svg";

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

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 9,
  borderRadius: 5,
  width: "70%",

  //Empty Background Color
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: Grey20,
  },
  //Filled Background Color
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: [5, 5],
    backgroundColor: StatusDone,
  },
}));

const JoineeTableData = ({
  joineeData = {},
  isNewJoinee,
  handleCancelTraining,
}) => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
    
  };
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  // const getStatus = (variant) => {
  //   switch (variant) {
  //     case "Success":
  //       return {
  //         color: "#58A55C",
  //         label: "Success",
  //       };
  //     case "Rejected":
  //       return {
  //         color: "#D83B01",
  //         label: "Rejected",
  //       };
  //     case "Pending":
  //       return {
  //         color: "#F1BE42",
  //         label: "Pending",
  //       };
  //     default:
  //       return {};
  //   }
  // };

  const getTrainingLevel = (currentLevel) => {
    if (joineeData?.trainingStatus === "CREATED") {
      return "-";
    } else if (joineeData?.trainingStatus === "STARTED") {
      switch (currentLevel) {
        case 0:
          return "L0 - L1";
        case 1:
          return "L1 - L2";
        case 2:
          return "L2 - L3";
        case 3:
          return "L3 Completed";
        default:
          return "";
      }
    } else {
      return "L3 Completed";
    }
  };

  const processStation = () => {
    const maruIcon = getMaruIcon(joineeData?.maru);
    if (joineeData?.trainingStatus === "CREATED") {
      return "-";
    } else {
      return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <img src={maruIcon} alt="Maru icon" width={18} height={16} />
          {`${joineeData?.stationName} | ${joineeData?.description}`}
        </Box>
      );
    }
  };
  const renderCancelTraining = () => {
    if (!isNewJoinee) {
      return "Delete";
    }
    switch (joineeData?.trainingStatus) {
      case "CREATED":
        return "-";
      case "COMPLETED":
        return <Typography sx={{ color: Grey30 }}>Cancel Training</Typography>;
      case "STARTED":
        return (
          <Typography sx={{ color: MarutiBlue500 }}>Cancel Training</Typography>
        );
      default:
        return null;
    }
  };

  return (
    <Fragment>
      <TableRow>
        <TableCell>{joineeData?.staffID}</TableCell>
        <TableCell>{joineeData?.staffName}</TableCell>
        <TableCell>{processStation()}</TableCell>
        <TableCell>{getTrainingLevel(joineeData?.currentLevel)}</TableCell>
        <TableCell>{joineeData?.startDate || "-"}</TableCell>
        <TableCell>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
            <BorderLinearProgress
              variant="determinate"
              value={
                (joineeData?.ExhaustedDay > joineeData?.plannedDays
                  ? joineeData?.plannedDays * 100
                  : joineeData?.ExhaustedDay * 100) / joineeData?.plannedDays
              }
            />
            <Typography
              sx={{ color: "#343536", fontSize: "1.3rem" }}
            >{`${joineeData.ExhaustedDay}/${joineeData.plannedDays}`}</Typography>
          </Box>
        </TableCell>
        <TableCell
          sx={{
            cursor:
              joineeData?.trainingStatus === "STARTED" ? "pointer" : "default",
          }}
          onClick={() => {
            if (joineeData?.trainingStatus === "STARTED") {
              handleOpenDialog();
            }
          }}
        >
          {renderCancelTraining()}
        </TableCell>
      </TableRow>
      {isDialogOpen && (
        <ConfirmationDialog
          openConfirm={isDialogOpen}
          handleChoice={() => {
            handleCancelTraining();
            handleCloseDialog();
          }}
          handleClose={handleCloseDialog}
          headerText={isNewJoinee ? "Cancel Training" : "Delete Operator"}
          confirmButtonText={
            isNewJoinee ? "Cancel Training" : "Delete Operator"
          }
          highlightedText={"permanently delete"}
          infoText={
            isNewJoinee
              ? "Cancelling this training will permanently remove the training progress made by this operator for the specified process station. Are you sure you want to proceed with cancelling this training?"
              : "Deleting this operator will permanently remove the operator and their training progress made against the selected process station. Are you sure you want to proceed with deleting this operator?"
          }
        />
      )}
    </Fragment>
  );
};
export default JoineeTableData;
