import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  Box,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import DownloadDisabledIcon from "../../../../../../assets/icons/downloadGreyIcon.svg";
import DownloadIcon from "../../../../../../assets/icons/downloadIcon.svg";
import Download from "../../../../../../components/Download/Download";
import CustomPopoverDialog from "../../../../../../components/PopoverDialog";
import useStyles from "../../../../../styles";
import Delete from "../../../../../../assets/icons/Delete.svg";
import DeleteDisabledIcon from "../../../../../../assets/icons/DeleteDisabledIcon.svg";
import { getEpochToDDMMYY } from "../../../../../../utils/helperFunctions";
import ConfirmationDialog from "../../../../../../components/ConfirmationDialog";
import dayjs from "dayjs";
const AreaMasterData = ({row, handleDeleteRow}) => {
  const classes = useStyles();
  const [openDownload, setOpenDownload] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openConfirmAlert, setOpenConfirmAlert] = useState(false);
  const [currentDate, setCurrentDate] = useState('');

useEffect(() => {
  const today = new Date();
  const formattedDate = dayjs(today).format("MM/DD/YYYY");
  setCurrentDate(formattedDate);
}, []);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const toggleConfirmAlert = () => {
    setOpenConfirmAlert(!openConfirmAlert);
  };

  const toggleDownload = () => {
    setOpenDownload(!openDownload);
  };
  const handlepopperClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopperClose = () => {
    setAnchorEl(null);
  };
 const handleDelete = () => {
handleDeleteRow(row);
toggleConfirmAlert();
}
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
  const formatDashes = (dateString) => {
    return dateString.replace(/\//g, '-');
  };
  const compareDates = () => {
    const currentDateWithoutTime = new Date(currentDate);
    currentDateWithoutTime.setHours(0, 0, 0, 0);
  
    const effectiveDateWithoutTime = new Date(row.effectiveDate * 1000);
    effectiveDateWithoutTime.setHours(0, 0, 0, 0); 
  
    return currentDateWithoutTime.getTime() < effectiveDateWithoutTime.getTime();
  };

  const RenderDeleteIcon = () => {
    const isDisabled = !(row.status === 'Success' && compareDates());
    return (
      <IconButton
        sx={{ p: 0, m: 0 }}
        disabled={isDisabled}
        onClick={toggleConfirmAlert}
      >
        <img
          src={isDisabled ? DeleteDisabledIcon : Delete}
          alt="Delete"
          style={{
            cursor: "pointer",
            height: "14px",
            width: "14px",
          }}
        />
      </IconButton>
    );
  };

  const getFormattedDate = (inputDate) => {
    if (Number.isInteger(inputDate)) {
      const date = new Date(inputDate * 1000);
      date.setHours(6, 20, 0, 0); 
      return dayjs(date).format("DD/MM/YYYY HH:mm"); 
    }
    return "-";
  };
  
  return (
    <Fragment>
      <TableRow>
        <TableCell>{row?.version}</TableCell>
        <TableCell>{row.fileName}</TableCell>
        <TableCell>{row.uploaderId}</TableCell>
        <TableCell>{row.uploadedOn}</TableCell>
        <TableCell>{formatDashes(getFormattedDate(row.effectiveDate))}</TableCell>
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
        <TableCell>
          <RenderDeleteIcon />
        </TableCell>
      </TableRow>
      {openDownload && (
        <Download
          file={row.filePath}
          open={openDownload}
          handleClose={toggleDownload}
        />
      )}
      {openConfirmAlert && (
        <ConfirmationDialog
          openConfirm={openConfirmAlert}
          handleChoice={handleDelete}
          handleClose={toggleConfirmAlert}
          headerText={" Delete Master File"}
          confirmButtonText={"Delete"}
          infoText={`Are you sure you want to delete the master file ${row.fileName}?`}
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
export default AreaMasterData;
