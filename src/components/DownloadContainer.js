import { Avatar, Box, Typography } from "@mui/material";
import { MarutiBlue500, MarutiWhite } from "../utils/colors";
import DownloadIcon from "../assets/icons/downloadIcon.svg";

const DownloadContainer = ({ totalCount, handleDownload }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="darkTitle">Total {totalCount || ""}</Typography>
      <Avatar
        sx={{
          bgcolor: MarutiWhite,
          height: "3.2rem",
          width: "3.2rem",
          border: 1,
          borderColor: MarutiBlue500,
        }}
        variant="rounded"
        sizes="small"
        onClick={handleDownload}
      >
        <img
          alt="download"
          src={DownloadIcon}
          style={{
            cursor: "pointer",
            height: "1.602rem",
            width: "1.6rem",
          }}
        />
      </Avatar>
    </Box>
  );
};

export default DownloadContainer;
