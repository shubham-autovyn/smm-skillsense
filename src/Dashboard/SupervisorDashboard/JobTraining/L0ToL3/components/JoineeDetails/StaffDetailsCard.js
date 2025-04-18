import {
  Box,
  Typography,
  LinearProgress,
  linearProgressClasses,
} from "@mui/material";
import {
  TypeSecondary,
  StatusDone,
  Grey20,
} from "../../../../../../../Utilities/colors";
import { styled } from "@mui/material/styles";
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
const StaffDetailsCard = ({
  selectedStaff,
  processStation,
  currentLevel,
  startDate,
  ExhaustedDay,
  plannedDays,
}) => {
  //console.log("Exhausted",ExhaustedDay,plannedDays)
  const getLevelInfo=(currentLevel)=>{
    switch(currentLevel){
      case 0: return "L0 (No training)";
      case 1: return "L1 (Under training, cannot work)";
      case 2: return "L2 (Can work under supervision)";
      case 3: return "L2 (Can work under supervision)";
      default:return "-";
    }
  }
  return (
    <Box
      sx={{
        p: "1.6rem",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", gap: "2rem"}}>
        <Box sx={{ display: "flex", gap: "2rem", flexDirection: "column" ,alignItems: "space-between",justifyContent:"space-between"}}>
          <Typography variant="subtitle2" color={TypeSecondary} sx={{height: "1.6rem"}}>
            Process Station
          </Typography>
          <Typography variant="subtitle2" color={TypeSecondary}>
            Current Skill Level
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: "2rem",flexDirection: "column" ,alignItems: "space-between"}}>
          <Typography>
            {processStation === `` ? "-" : processStation}
          </Typography>
          <Typography>{getLevelInfo(currentLevel)}</Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", gap: "2rem" }}>
        <Box sx={{ display: "flex", gap: "2rem", flexDirection: "column" }}>
          <Typography variant="subtitle2" color={TypeSecondary}>
            Training Start Date
          </Typography>
          <Typography variant="subtitle2" color={TypeSecondary}>
            Exhuasted/Min. Training Days
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: "2rem", flexDirection: "column" }}>
          <Typography>{startDate === null ? "-" : startDate}</Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.4,
              minWidth: "30rem",
            }}
          >
            <BorderLinearProgress
              variant="determinate"
              value={(ExhaustedDay>plannedDays?plannedDays*100:ExhaustedDay * 100) / plannedDays}
            />
            <Typography
              sx={{ color: "#343536", fontSize: "1.3rem" }}
            >{`${ExhaustedDay}/${plannedDays}`}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default StaffDetailsCard;
