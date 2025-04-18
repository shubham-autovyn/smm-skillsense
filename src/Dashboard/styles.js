import { makeStyles } from "@mui/styles";
import {
  Grey10,
  MarutiBlue500,
  MarutiWhite,
  Grey50,
} from "../../src/utils/colors";

const useStyles = makeStyles((theme) => ({
  "grid-cell": {
    height: "30px",
    border: "1px solid red",
  },
  "container-flex": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  "image-link": {
    cursor: "pointer",
  },
  link: {
    cursor: "pointer",
    color: MarutiBlue500,
    textDecoration: "underline",
    fontWeight: 700,
  },
  "outer-container": {
    padding: "2rem 7rem 2rem 7rem",
    maxHeight: "100vh !important",
    minHeight: "100%",
    minWidth: "90vw",
    position: "relative",
  },
  "loader-container": {
    width: "100%",
    marginTop: "1rem",
    justifyContent: "center",
    display: "flex",
  },
  "download-modal-container": {
    display: "flex",
    flex: 5,
    alignItems: "center",
    gap: "1rem",
    padding: "1rem",
    border: "1px solid #e6e9f0",
    borderRadius: "4px",
  },
  "download-modal-progress": {
    flex: 4,
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    padding: "1rem",
    height: "3.2rem",
    borderRadius: "0.4rem",
    backgroundColor: Grey10,
  },
  columnHeader: {
    display: "flex",
    alignItems: "center",
    gap: "2px",
    cursor: "pointer",
  },
  "master-table-body": {
    "& .MuiTableRow-root": {
      "&:last-child": {
        "& .MuiTableCell-root": { borderBottom: "0px" },
      },
    },
  },
  "master-table-dimensions": {
    marginTop: "2rem",
    height: "60vh",
    "@media(min-width: 1366px)": {
      height: "62vh",
    },
    "@media(min-width: 1920px)": {
      height: "68vh",
    },
    "@media(min-width: 2560px)": {
      height: "70vh",
    },
  },
  "master-table": {
    overflowY: "auto",
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
  "details-table-dimensions": {
    marginTop: "2rem",
    height: "45vh",
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
    "@media(min-width: 1366px)": {
      height: "47vh",
    },
    "@media(min-width: 1920px)": {
      height: "53vh",
    },
    "@media(min-width: 2560px)": {
      height: "55vh",
    },
  },
  "delivery-table-dimensions": {
    marginTop: "2rem",
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
    "@media(min-width: 1366px)": {
      height: "39vh",
    },
    "@media(min-width: 1920px)": {
      height: "46vh",
    },
    "@media(min-width: 2560px)": {
      height: "50vh",
    },
    "@media(min-width: 1280px)": {
      height: "32rem",
    },
  },
  "delivery-table-info-dimensions": {
    marginTop: "2rem",
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
    "@media(min-width: 1366px)": {
      height: "34vh",
    },
    "@media(min-width: 1920px)": {
      height: "41vh",
    },
    "@media(min-width: 2560px)": {
      height: "45vh",
    },
  },
  "repository-table-dimensions": {
    marginTop: "2rem",
    height: "51vh",
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
    "@media(min-width: 1366px)": {
      height: "54vh",
    },
    "@media(min-width: 1536px)": {
      height: "56vh",
    },
    "@media(min-width: 1920px)": {
      height: "59vh",
    },
    "@media(min-width: 2560px)": {
      height: "61vh",
    },
  },
  "batch-table-dimensions": {
    maxHeight: "50vh",
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
    "@media(min-width: 1366px)": {
      maxHeight: "53vh",
    },
    "@media(min-width: 1920px)": {
      maxHeight: "59vh",
    },
    "@media(min-width: 2560px)": {
      maxHeight: "61vh",
    },
  },
  "allocation-container-dimensions": {
    height: "48vh",
    "@media(min-width: 1280px)": {
      height: "44vh",
    },
    "@media(min-width: 1366px)": {
      height: "48vh",
    },
    "@media(min-width: 1920px)": {
      height: "52vh",
    },
    "@media(min-width: 2560px)": {
      height: "56vh",
    },
    scrollbarWidth: "thin",
    scrollbarColor: "#c4c4c4 #ffffff",
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
  "ojt-table-dimensions": {
    height: "43vh",
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
    "@media(min-width: 1366px)": {
      height: "45vh",
    },
    "@media(min-width: 1920px)": {
      height: "51vh",
    },
    "@media(min-width: 2560px)": {
      height: "58vh",
    },
  },
  "ojt-container-table-dimensions": {
    marginTop: "2rem",
    height: "63vh",
    "@media(min-width: 1366px)": {
      height: "65vh",
    },
    "@media(min-width: 1920px)": {
      height: "70vh",
    },
    "@media(min-width: 2560px)": {
      height: "73vh",
    },
  },
  columnHeader: {
    display: "flex",
    alignItems: "center", // Align items vertically
    gap: "5px", // Adjust the gap between the text and filter icon
    cursor: "pointer", // Add a cursor pointer to indicate interactivity
  },
}));

export default useStyles;
