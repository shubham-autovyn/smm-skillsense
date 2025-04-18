import { Box, Typography } from "@mui/material";
import { TypePrimary } from "../../utils/colors";
import NoBatch from "../../assets/images/NoBatch.png";
const NoTrainingBatch = () => {
  return (
    <Box sx={{ height: "55vh" }}>
      <Box sx={{ textAlign: "center", mt: "2rem" }}>
        <img
          src={NoBatch}
          alt={"department"}
          style={{
            height: "250px",
            width: "250px",
            borderRadius: "125px",
          }}
        />
      </Box>
      <Typography
        sx={{
          fontWeight: 700,
          textAlign: "center",
          mt: "1rem",
          color: TypePrimary,
        }}
      >
        Training not defined in the master file!
      </Typography>
      <Typography
        variant="body1"
        sx={{ textAlign: "center", py: "1.5rem", color: TypePrimary }}
      >
        To initiate a new batch, please add this training and its corresponding
        topics to the master.
      </Typography>
    </Box>
  );
};
export default NoTrainingBatch;
