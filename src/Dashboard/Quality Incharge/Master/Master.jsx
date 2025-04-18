import { Fragment, useEffect, useState } from "react";

import {
  Alert,
  Backdrop,
  Box,
  CircularProgress,
  IconButton,
  Paper,
  Snackbar,
  Typography,
} from "@mui/material";
import TransparentButton from "../../../utils/Buttons/TransparentButton/TransparentButton";
import { MarutiBlue500 } from "../../../utils/colors";
import RefreshIcon from "../../../assets/icons/RefreshIcon.svg";
import sorting from "../../../assets/icons/SortIcon.svg";
import Download from "../../../assets/svg/download.svg";

import { DataGridTable } from "../../../components/Data-table/dataTable.styles";
import useGetStaffId from "../hooks/getStaffId";
import useGetTestMasterFile from "../hooks/getTestMasterFile";
import useTestMasterFileUpload from "../hooks/testMasterFileUpload";
import UploadFile from "./UploadFile/UploadFile";
const QCTestMaster = (props) => {
  const [openUpload, setOpenUpload] = useState(false);
  const [severity, setSeverity] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState("Select a file for upload");
  const [file, setFile] = useState(null);

  const { fetchFileUpload, loading: fileLoading } = useTestMasterFileUpload();
  const {
    dataTestMasterFile,
    fetchTestMasterFile,
    loading: tableLoading,
  } = useGetTestMasterFile();
  const { dataStaffID, fetchStaffID, loading: stafIdLoading } = useGetStaffId();

  const UpdatedBy = dataStaffID?.response?.name;

  const [filteredData, setFilteredData] = useState([]);
  const [isAscending, setIsAscending] = useState(true);

  useEffect(() => {
    fetchTableData();
  }, []);

  const fetchTableData = () => {
    const qualityInchargeId = 545228;
    fetchStaffID(qualityInchargeId);
    fetchTestMasterFile(qualityInchargeId);
  };

  const toggleOpenUpload = () => {
    setOpenUpload(!openUpload);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setFile(file);
    }
  };

  const handleUpload = async () => {
    try {
      let qceId = localStorage.getItem("staffId");
      const payload = { file };
      setOpenUpload(false);
      const qualityInchargeId = "545228";
      // const qualityInchargeId = qceId;
      const responseData = await fetchFileUpload(payload, qualityInchargeId);
      setFileName("Select a file for upload");

      if (
        responseData?.data?.responseCode === 200 ||
        responseData?.data?.responseCode === "SMM200"
      ) {
        setMessage(responseData?.data?.response?.status);
        setSeverity("success");
        setOpenAlert(true);
      } else {
        setMessage(responseData?.data.message);
        setSeverity("error");
        setOpenAlert(true);
      }
      fetchTableData();
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  useEffect(() => {
    if (dataTestMasterFile?.response) {
      const rows = dataTestMasterFile.response.map((row) => ({
        ...row,
        id: crypto.randomUUID(),
        updatedOn: new Date(row.updatedOn).toLocaleString("en-GB"),
        UpdatedBy: UpdatedBy,
      }));
      setFilteredData(rows);
    }
  }, [dataTestMasterFile, UpdatedBy]);

  const columns = [
    {
      field: "version",
      headerName: "Version",
      flex: 0.5,
      resizable: false,
      sortable: true,
      headerClassName: "super-app-theme--header",
      renderHeader: () => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            cursor: "default",
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>Version</Typography>
          <img
            src={sorting}
            alt="sort icon"
            width={10}
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleSortClick("version");
            }}
          />
        </Box>
      ),
    },
    {
      field: "fileName",
      headerName: "Master File",
      flex: 1,
      resizable: false,
      sortable: true,
      headerClassName: "super-app-theme--header",
      renderHeader: () => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            cursor: "default",
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>FileName</Typography>
          <img
            src={sorting}
            alt="sort icon"
            width={10}
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleSortClick("fileName");
            }}
          />
        </Box>
      ),
    },
    {
      field: "UpdatedBy",
      headerName: "Updated by",
      flex: 0.8,
      resizable: false,
      sortable: true,
      headerClassName: "super-app-theme--header",
      editable: false,
      renderHeader: () => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            cursor: "default",
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>Updated By</Typography>
          <img
            src={sorting}
            alt="sort icon"
            width={10}
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleSortClick("UpdatedBy");
            }}
          />
        </Box>
      ),
    },
    {
      field: "updatedOn",
      headerName: "Updated On",
      width: 310,
      resizable: false,
      sortable: true,
      headerClassName: "super-app-theme--header",
      editable: false,
      renderHeader: () => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            cursor: "default",
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>Updated On</Typography>
          <img
            src={sorting}
            alt="sort icon"
            width={10}
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleSortClick("updatedOn");
            }}
          />
        </Box>
      ),
    },
    {
      field: "fileStatus",
      headerName: "Status",
      flex: 0.5,
      resizable: false,
      sortable: true,
      headerClassName: "super-app-theme--header",
      editable: false,
      renderHeader: () => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            cursor: "default",
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>Status</Typography>
          <img
            src={sorting}
            alt="sort icon"
            width={10}
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleSortClick("fileStatus");
            }}
          />
        </Box>
      ),
      renderCell: (params) => {
        let fileStatusColor = "";
        switch (params?.value) {
          case "Success":
            fileStatusColor = "green";
            break;
          case "Uploading":
            fileStatusColor = "yellow";
            break;
          case "Failed":
            fileStatusColor = "red";
            break;
          default:
            fileStatusColor = "gray";
        }
        return (
          <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Box
              sx={{
                width: "10px",
                height: "10px",
                backgroundColor: fileStatusColor,
              }}
            />
            <span>{params?.value}</span>
          </Box>
        );
      },
    },
    {
      field: "testUrl",
      headerName: "Download",
      flex: 0.5,
      resizable: false,
      sortable: false,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <IconButton aria-label="download">
          <a
            href={params?.formattedValue}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={Download}
              alt="Download"
              style={{ width: "20px", height: "20px" }}
            />
          </a>
        </IconButton>
      ),
    },
  ];

  const handleSortClick = (type) => {
    const sortedData = [...filteredData].sort((a, b) => {
      const valueA = a[type];
      const valueB = b[type];
      if (typeof valueA === "string" && typeof valueB === "string") {
        // Handle alphabetic sorting
        return isAscending
          ? valueA.localeCompare(valueB) // Ascending
          : valueB.localeCompare(valueA); // Descending
      } else if (!isNaN(new Date(valueA)) && !isNaN(new Date(valueB))) {
        // Handle date sorting
        const dateA = new Date(valueA);
        const dateB = new Date(valueB);
        return isAscending ? dateA - dateB : dateB - dateA;
      } else if (typeof valueA === "number" && typeof valueB === "number") {
        // Handle numeric sorting
        return isAscending ? valueA - valueB : valueB - valueA;
      }
      return 0; // Default case for unhandled data types
    });

    setFilteredData(sortedData);
    setIsAscending(!isAscending); // Toggle sorting order
  };

  return (
    <Fragment>
      <Paper sx={{ mb: 2, p: 1.6 }}>
        <Box sx={{ mb: 1 }}>
          <Box sx={{ width: "100%" }}>
            <Box
              sx={{
                pb: "1rem",
                display: "flex",
                borderRadius: "8px",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h4">L3 to L4 Test Master File</Typography>
              <Box style={{ display: "flex", position: "relative" }}>
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
                  color="neutral"
                  variant="outlined"
                >
                  <img
                    onClick={() => fetchTableData()}
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

            <Typography variant="darkTitle">
              Total {filteredData?.length}
            </Typography>
            <Box
              sx={{
                border: "1px solid #e6e9f0",
                borderRadius: "8px",
                marginTop: "10px",
              }}
            >
              <DataGridTable
                columns={columns}
                rows={filteredData}
                rowHeight={40}
                disableColumnMenu
                disableColumnSorting
                sx={{
                  overflowY: "scroll",
                  overflow: "hidden",
                  scrollbarWidth: "none",
                  "& .MuiDataGrid-filler": {
                    height: "25px !important",
                  },
                  "& .css-r4hms9 ": {
                    display: "none", // Hides scrollbar in WebKit browsers
                  },
                }}
              />
            </Box>
          </Box>
        </Box>
      </Paper>
      {openUpload && (
        <UploadFile
          open={openUpload}
          setOpenUpload={setOpenUpload}
          // onUpload={onUpload}
          handleUpload={handleUpload}
          handleClose={toggleOpenUpload}
          handleFileChange={handleFileChange}
          fileName={fileName}
          setFileName={setFileName}
        />
      )}
      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={() => setOpenAlert(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          sx={{ fontSize: "12px" }}
          onClose={() => setOpenAlert(false)}
          severity={severity}
        >
          {message}
        </Alert>
      </Snackbar>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={tableLoading || stafIdLoading || fileLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Fragment>
  );
};
export default QCTestMaster;
