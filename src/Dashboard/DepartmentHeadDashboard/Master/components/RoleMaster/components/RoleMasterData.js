import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  Box,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { Fragment, useState } from "react";
import DownloadDisabledIcon from "../../../../../../assets/icons/downloadGreyIcon.svg";
import DownloadIcon from "../../../../../../assets/icons/downloadIcon.svg";
import Download from "../../../../../../components/Download/Download";
import CustomPopoverDialog from "../../../../../../components/PopoverDialog";
import useStyles from "../../../../../styles";

const RoleMasterData = ({ row }) => {
  const [openDownload, setOpenDownload] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const classes = useStyles();

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const toggleDownload = () => {
    setOpenDownload(!openDownload);
  };

  const handlepopperClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopperClose = () => {
    setAnchorEl(null);
  };

  const getStatus = (variant) => {
    switch (variant) {
      case "Success":
        return {
          color: "#58A55C",
          label: "Success",
        };
      case "Failed":
        return {
          color: "#D83B01",
          label: "Failed",
        };
      case "Uploading":
        return {
          color: "#F1BE42",
          label: "Uploading...",
        };
      default:
        return {};
    }
  };

  const RenderDownloadIcon = () => {
    const isDisabled = row.status === "Uploading";
    return (
      <IconButton
        sx={{ p: 0, m: 0 }}
        disabled={isDisabled}
        onClick={toggleDownload}
      >
        <img
          src={isDisabled ? DownloadDisabledIcon : DownloadIcon}
          alt="Download"
          style={{
            cursor: "pointer",
            height: "14px",
            width: "14px",
          }}
        />
      </IconButton>
    );
  };

  return (
    <Fragment>
      <TableRow>
        <TableCell>{row?.version}</TableCell>
        <TableCell>{row.fileName}</TableCell>
        <TableCell>{row.uploaderId}</TableCell>
        <TableCell>{row.uploadedOn}</TableCell>
        <TableCell>
          <Box
            className={classes["container-flex"]}
            sx={{ alignItems: "center", gap: "0.8rem", width: "fit-content" }}
          >
            <Box
              sx={{
                backgroundColor: getStatus(row.status)?.color,
                height: "7px",
                width: "7px",
              }}
            />
            <Typography sx={{ whiteSpace: "nowrap" }}>
              {getStatus(row.status)?.label}
            </Typography>
            {row.status === "Failed" && (
              <InfoOutlinedIcon
                fontSize="medium"
                color="Blue"
                onClick={handlepopperClick}
                sx={{ cursor: "pointer" }}
              />
            )}
          </Box>
        </TableCell>
        <TableCell>
          <RenderDownloadIcon />
        </TableCell>
      </TableRow>
      {openDownload && (
        <Download
          file={row.filePath}
          open={openDownload}
          handleClose={toggleDownload}
        />
      )}
      <CustomPopoverDialog
        id={id}
        open={open}
        handleClose={handlePopperClose}
        anchorEl={anchorEl}
        message={row?.errorMessages}
      />
    </Fragment>
  );
};
export default RoleMasterData;
