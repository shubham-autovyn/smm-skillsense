import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

const theme = createTheme({
  typography: {
    root: {
      fontFamily: "Roboto",
    },
    body1: {
      fontSize: "1.4rem",
      lineHeight: "1.6rem",
      letterSpacing: "-0.025em",
    },
  },
  components: {
    MuiPopover: {
      styleOverrides: {
        paper: {
          "&.MuiPaper-root": {
            maxWidth: "600px",
            scrollbarWidth: "thin",
            scrollbarColor: "#c4c4c4 #f4f5f8",
            "&::-webkit-scrollbar": {
              width: " 1.2rem",
              height: " 1.2rem",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#c4c4c4",
              "&:hover": {
                backgroundColor: "#97999B !important",
              },
              borderRadius: "2rem",
              border: "0.4rem solid #ffffff",
            },
          },
        },
      },
    },
  },
});

export default function CustomPopoverDialog(props) {
  return (
    <ThemeProvider theme={theme}>
      <Popover
        id={props.id}
        open={props.open}
        anchorEl={props.anchorEl}
        onClose={props.handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        disableRestoreFocus
      >
        {props.message &&
        props.message !== null &&
        props.message.length !== 0 ? (
          <Box
            sx={{
              p: 2,
            }}
          >
            <Typography sx={{ fontWeight: 700 }}>
              The upload failed because of the following reasons:
            </Typography>
            <List Typography="body1" sx={{ height: "40rem" }}>
              {props.message?.map((item, i) => (
                <ListItem key={i}>
                  <ListItemIcon sx={{ minWidth: "fit-content", mr: 1 }}>
                    <CircleIcon fontSize="small" color="Blue.main" />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Box>
        ) : (
          <Box sx={{ p: 2 }}>
            <Typography sx={{ fontWeight: 700 }}>
              The upload failed because of the following reasons:
            </Typography>
            <List Typography="body1" sx={{ height: "40rem" }}>
              <ListItem>
                <ListItemIcon sx={{ minWidth: "fit-content", mr: 1 }}>
                  <CircleIcon fontSize="small" color="Blue.main" />
                </ListItemIcon>
                <ListItemText primary="Unexpected error found which is not defined in internal checks. Please rectify the same and upload again." />
              </ListItem>
            </List>
          </Box>
        )}
      </Popover>
    </ThemeProvider>
  );
}
