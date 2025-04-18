import { Box, List, ListItemText, Typography } from "@mui/material";
import useStyles from "../../styles";

const NoAttendees = () => {
  const classes = useStyles();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
      className={`${classes["details-table-dimensions"]}`}
    >
      <Box>
        <Typography sx={{ fontWeight: 700, textAlign: "center" }}>
          No Attendees Selected
        </Typography>
        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ textAlign: "left" }}>
            <List Typography="body2">
              <ListItemText primary="Step 1: Show the attendance QR code to attendees for scanning." />
              <ListItemText primary="Step 2: Attendees scan the code, provide their Staff ID and Name, and then submit." />
              <ListItemText primary="Step 3: Validate the presence of all attendee names within the generated list." />
            </List>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default NoAttendees;
