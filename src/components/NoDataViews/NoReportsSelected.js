import { Box, Typography } from "@mui/material";
import NoBatch from "../../assets/images/NoBatch.png";
import { TypePrimary, TypeSecondary } from "../../utils/colors";
const NoReportsSelected = () => {
  return (
    <Box
      sx={{
        height: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ textAlign: "center", mt: "2rem" }}>
        <img
          src={NoBatch}
          alt={"department"}
          style={{
            height: "200px",
            width: "200px",
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
        Select Report & Filters
      </Typography>
      <Typography
        variant="body1"
        sx={{
          textAlign: "center",
          py: "1.5rem",
          color: TypeSecondary,
          display: "flex",
          justifyContent: "center",
          maxWidth: "28%",
        }}
      >
        Nothing to see here… yet. To get started, choose a report type and apply
        relevant filters.
      </Typography>
    </Box>
  );
};
export default NoReportsSelected;
