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
  } from "../../../../../../utils/colors";
  import { styled } from "@mui/material/styles";

  
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 9,
    borderRadius: 5,
    width: "70%",
  
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: Grey20,
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: [5, 5],
      backgroundColor: StatusDone,
    },
  }));
  
  const StaffDetailsCard = ({
    selectedStaff = selectedStaff,
  }) => {
    const getLevelInfo = (currentLevel) => {
      switch (currentLevel) {
        case 0:
          return "L0 (No training)";
        case 1:
          return "L1 (Under training, cannot work)";
        case 2:
          return "L2 (Can work under supervision)";
        case 3:
          return "L3 (Can work independently)";
        default:
          return "-";
      }
    };
  
    return (
      <Box
        sx={{
          p: "1.6rem",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", gap: "2rem" }}>
          <Box
            sx={{
              display: "flex",
              gap: "2rem",
              flexDirection: "column",
              alignItems: "space-between",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="subtitle2" color={TypeSecondary} sx={{ height: "1.6rem" }}>
              Process Station
            </Typography>
            <Typography variant="subtitle2" color={TypeSecondary}>
              Current Skill Level
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: "2rem", flexDirection: "column", alignItems: "space-between" }}>
            <Typography>{selectedStaff.processStation || "-"}</Typography>
            <Typography>{getLevelInfo(selectedStaff.currentLevel)}</Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: "2rem" }}>
          <Box sx={{ display: "flex", gap: "2rem", flexDirection: "column" }}>
            <Typography variant="subtitle2" color={TypeSecondary}>
              Training Start Date
            </Typography>
            <Typography variant="subtitle2" color={TypeSecondary}>
              Exhausted/Min. Training Days
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: "2rem", flexDirection: "column" }}>
            <Typography>{selectedStaff.startDate || "-"}</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.4, minWidth: "30rem" }}>
              <BorderLinearProgress
                variant="determinate"
                value={
                  selectedStaff.ExhaustedDay > selectedStaff.plannedDays
                    ? (selectedStaff.plannedDays * 100) / selectedStaff.plannedDays
                    : (selectedStaff.ExhaustedDay * 100) / selectedStaff.plannedDays
                }
              />
              <Typography sx={{ color: "#343536", fontSize: "1.3rem" }}>
                {`${selectedStaff.ExhaustedDay}/${selectedStaff.plannedDays}`}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  };
  
  export default StaffDetailsCard;
  