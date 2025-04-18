import { IconButton } from "@mui/material";
import { MarutiBlue500 } from "../../Utilities/colors";
import RefreshIcon from "../assets/icons/RefreshIcon.svg";

const RefreshButton = ({ handleRefresh }) => {
  return (
    <IconButton
      sx={{
        p: 0,
        m: 0,
        mr: "1rem",
        height: "3.1rem",
        width: "3.1rem",
        borderRadius: "0.4rem",
        border: 1,
        borderColor: MarutiBlue500,
        "& .MuiTouchRipple-root": { borderRadius: "0.4rem" },
        "& .MuiTouchRipple-child": { borderRadius: "inherit" },
        "& .MuiButtonBase-root:hover": {
          bgcolor: "transparent",
        },
      }}
      onClick={handleRefresh}
      color="neutral"
      variant="outlined"
    >
      <img
        alt="refresh"
        src={RefreshIcon}
        style={{
          cursor: "pointer",
          height: "1.6rem",
          width: "1.6rem",
          borderRadius: 0,
        }}
      />
    </IconButton>
  );
};

export default RefreshButton;
