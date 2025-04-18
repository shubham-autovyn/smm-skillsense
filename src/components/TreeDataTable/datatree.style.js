import { Menu, styled as muiStyled, Table, TableCell } from "@mui/material";
import styled from "styled-components";

export const MenuView = muiStyled(Menu)({
  "& .MuiMenu-paper": {
    boxShadow: "0px 2px 2px -2px rgba(0, 0, 0, 0.13)",
    borderRadius: "8px",
    border: "1px solid #cfd2d9",
    overflow: "visible",
    left: "861px !important",

    "&::before": {
      content: '""',
      position: "absolute",
      top: "87px",
      left: "-31px",
      width: "30px",
      height: "30px",
      backgroundColor: "#808080",
      clipPath: "polygon(100% 19%, 42% 54%, 100% 84%)",
    },
    "&::-webkit-scrollbar": {
      width: "0px",
    },
  },
});

export const StyledTableCell = styled(TableCell)`
  padding: 8px;
  padding-left: ${({ depth }) =>
    depth > 0 ? `${depth * 20}px` : "8px"} !important;
`;
export const TableBox = styled(Table)({
  border: "1px solid #cfd2d9",
  borderRadius: "8px",
  width: "100%",
  borderCollapse: "collapse",

  "& tr": {
    // "& th, & td": {
    //   textAlign: "end",
    // },
    "& th": {
      border: "1px solid #cfd2d9",
      fontSize: "14px",
      fontWeight: 600,
      textAlign: "end",
      padding: "8px",
    },
    "& td": {
      fontSize: "14px !important",
      border: "1px solid #cfd2d9",
    },
  },

  "& thead tr th:nth-child(1), & tbody tr td:nth-child(1)": {
    // textAlign: "start",
    "& button ": {
      marginRight: "6px",
    },
  },

  "& .stations": {
    color: "#30c030",
  },

  "& .change.positive": {
    color: "#30c030",
    paddingRight: "10px",
  },

  "& .change.negative": {
    color: "#d83b01",
    paddingRight: "10px",
  },

  button: {
    border: "none",
    background: "none",
  },

  ".iconImg": {
    position: "relative",
    bottom: "6px",
  },

  ".noChange": {
    textDecoration: "underline",
    color: "#66696b",
    paddingRight: "10px",
  },
});
