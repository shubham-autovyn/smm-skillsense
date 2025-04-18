import { Box, Typography } from "@mui/material";

const InfoChip = ({ label, number, bgcolor, color }) => {
  return (
    <Box
      sx={{
        bgcolor: bgcolor || "#ACB0BA",
        height: "70px",
        width: "160px",
        borderRadius: "8px",
        paddingTop: "0.8rem",
        paddingBottom: "0.8rem",
        paddingLeft: "1.6rem",
        marginRight: "1.6rem",
      }}
    >
      <Typography variant="h4">{label}</Typography>
      <Typography sx={{ color: color || "inherit" }} variant="h1">
        {number}
      </Typography>
    </Box>
  );
};
export default InfoChip;
