import {
  Box,
  IconButton,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPermissions } from "../../../../../../../redux/Selectors/Permission.selector";
import TransparentButton from "../../../../../../Utilities/Buttons/TransparentButton/TransparentButton";
import { MarutiBlue500 } from "../../../../../../Utilities/colors";
import RefreshIcon from "../../../../../assets/icons/RefreshIcon.svg";
import SortIcon from "../../../../../assets/icons/SortIcon.svg";
import {
  setAlertMessage,
  setIsAlert,
} from "../../../../../redux/ActionCreator/AlertActionCreator";
import { setLoading } from "../../../../../redux/ActionCreator/MasterActionCreator";
import { fetchRoleMasterFiles } from "../../../../../redux/Actions/DepartmentMasterAction";
import {
  getMasterFiles,
  getMasterFilesStatus,
} from "../../../../../redux/Reducers/SMMDepartmentMasterReducer";
import { getShop } from "../../../../../redux/Reducers/SMMShopReducer";
import useStyles from "../../../../styles";
import RoleMasterData from "./components/RoleMasterData";
import UploadFile from "./components/UploadFile";

const RoleMaster = (props) => {
  const [openUpload, setOpenUpload] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [isAscending, setIsAscending] = useState(true);
  const [refreshDisabled, setRefreshDisabled] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const shop = useSelector(getShop);
  const files = useSelector(getMasterFiles);
  const loading = useSelector(getMasterFilesStatus);
  const roles = useSelector(selectPermissions)?.ROLES || {};
  const permissions = roles["Smart Man Power"] || {};
  const drmShops = permissions?.SMM_DPM?.ALLOWED_SHOP_IDS || [];

  useEffect(() => {
    if (shop?.id) {
      if (drmShops?.includes(String(shop?.id))) {
        fetchMastersApi();
      } else {
        dispatch(setLoading(true));
        dispatch(setIsAlert(true));
        dispatch(setAlertMessage("You don't have master access to this shop"));
      }
    }
  }, [shop.id]);

  useEffect(() => {
    setFilteredData(files);
  }, [files]);

  const fetchMastersApi = () => {
    const payload = {
      shop_id: shop?.id,
    };
    dispatch(fetchRoleMasterFiles(payload));
  };

  const toggleOpenUpload = () => {
    setOpenUpload(!openUpload);
  };

  const onUpload = () => {};

  const handleRefreshClick = () => {
    setRefreshDisabled(true);
    setTimeout(() => {
      setRefreshDisabled(false);
    }, 15000);
    fetchMastersApi();
  };
  const handleSortClick = (type) => {
    switch (type) {
      case "version":
        setFilteredData(
          filteredData?.sort((a, b) =>
            isAscending
              ? parseInt(a[type]) - parseInt(b[type])
              : parseInt(b[type]) - parseInt(a[type])
          )
        );
        setIsAscending(!isAscending);
        break;
      case "uploaderId":
        setFilteredData(
          filteredData?.sort((a, b) =>
            isAscending
              ? b[type].localeCompare(a[type])
              : a[type].localeCompare(b[type])
          )
        );
        setIsAscending(!isAscending);
        break;
      case "status":
      case "fileName":
        setFilteredData(
          filteredData?.sort((a, b) =>
            !isAscending
              ? b[type].localeCompare(a[type])
              : a[type].localeCompare(b[type])
          )
        );
        setIsAscending(!isAscending);
        break;
      case "uploadedOn":
        setFilteredData(
          filteredData?.sort((a, b) =>
            isAscending
              ? dateFormat(a[type]) - dateFormat(b[type])
              : dateFormat(b[type]) - dateFormat(a[type])
          )
        );
        setIsAscending(!isAscending);
        break;
    }
  };

  const dateFormat = (date) => {
    const data = date.split("-");
    return new Date(`${data[1]}-${data[0]}-${data[2]}`);
  };

  const getTableHeader = () => (
    <TableHead>
      <TableRow>
        <TableCell>
          <div className={classes.columnHeader}>
            Version
            <IconButton
              sx={{ p: 0 }}
              onClick={() => handleSortClick("version")}
            >
              <img src={SortIcon} alt="Sort" style={{ width: "10px" }} />
            </IconButton>
          </div>
        </TableCell>
        <TableCell>
          <div className={classes.columnHeader}>
            Master File
            <IconButton
              sx={{ p: 0 }}
              onClick={() => handleSortClick("fileName")}
            >
              <img src={SortIcon} alt="Sort" style={{ width: "10px" }} />
            </IconButton>
          </div>
        </TableCell>
        <TableCell>
          <div className={classes.columnHeader}>
            Uploaded by
            <IconButton
              sx={{ p: 0 }}
              onClick={() => handleSortClick("uploaderId")}
            >
              <img src={SortIcon} alt="Sort" style={{ width: "10px" }} />
            </IconButton>
          </div>
        </TableCell>
        <TableCell>
          <div className={classes.columnHeader}>
            Uploaded on
            <IconButton
              sx={{ p: 0 }}
              onClick={() => handleSortClick("uploadedOn")}
            >
              <img src={SortIcon} alt="Sort" style={{ width: "10px" }} />
            </IconButton>
          </div>
        </TableCell>
        <TableCell>
          <div className={classes.columnHeader}>
            Status
            <IconButton sx={{ p: 0 }} onClick={() => handleSortClick("status")}>
              <img src={SortIcon} alt="Sort" style={{ width: "10px" }} />
            </IconButton>
          </div>
        </TableCell>
        <TableCell>
          <div className={classes.columnHeader}>Download</div>
        </TableCell>
      </TableRow>
    </TableHead>
  );

  return (
    <Fragment>
      <Box sx={{ mb: 1, mr: 1 }}>
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              borderRadius: "8px",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ pt: "1rem" }}>
              <Typography variant="darkTitle">
                Total {filteredData?.length || ""}
              </Typography>
            </Box>
            <Box
              style={{ display: "flex", position: "relative", gap: "1.2rem" }}
            >
              <IconButton
                sx={{
                  p: 0,
                  m: 0,
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
                onClick={handleRefreshClick}
                color="neutral"
                variant="outlined"
                disabled={refreshDisabled}
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
              <TransparentButton onClick={toggleOpenUpload}>
                Upload
              </TransparentButton>
            </Box>
          </Box>
          {loading ? (
            <Skeleton
              className={`${classes["master-table"]} ${classes["master-table-dimensions"]}`}
              animation="wave"
              variant="rectangular"
            />
          ) : (
            <Box>
              <TableContainer
                className={`${classes["master-table"]} ${classes["master-table-dimensions"]}`}
                component={Paper}
              >
                <Table stickyHeader>
                  {getTableHeader()}
                  <TableBody>
                    {filteredData?.map((row, index) => (
                      <RoleMasterData key={index} row={row} />
                    ))}
                  </TableBody>
                </Table>
                {filteredData?.length === 0 && !loading && (
                  <Box className={classes["loader-container"]} sx={{ mt: 2 }}>
                    <Typography style={{ color: MarutiBlue500 }}>
                      No record found
                    </Typography>
                  </Box>
                )}
              </TableContainer>
            </Box>
          )}
        </Box>
      </Box>

      {openUpload && (
        <UploadFile
          open={openUpload}
          onUpload={onUpload}
          handleClose={toggleOpenUpload}
        />
      )}
    </Fragment>
  );
};
export default RoleMaster;
