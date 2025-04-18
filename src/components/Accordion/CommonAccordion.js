
import { Box, Paper } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Minus from "../../assets/icons/Minus.svg";
import Plus from "../../assets/icons/Plus.svg";
import useStyles from "../../Dashboard/styles";
import { Grey10 } from "../../utils/colors";

const CommonAccordion = ({
  children,
  titleComponent,
  isActive,
  handleOptionClick,
  sx = {},
  borderColor = "#F4F5F8",
  maxSummaryHeight = "185px",
  onItemClick=()=>{},
  value=null
}) => {
  const classes = useStyles();
  const accordianRef = useRef(null);
  const triggerClick = () => {
    if (accordianRef.current) {
      accordianRef.current.click();
    }
  };

  useEffect(() => {
    if (value) {
      triggerClick();
    }
  }, [value]);
  return (
    <Box
      sx={{
        // height: "100%",
        border: `1px solid ${borderColor}`,
        ...sx,
      }}
    >
      <Box
        sx={{
          p: "0.6rem",
          display: "flex",
          alignItems: "center",
          position: "sticky",
          top: 0,
          background: isActive ? Grey10 : "white",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src={isActive ? Minus : Plus}
            height="20rem"
            width="20rem"
            className={classes["image-link"]}
            onClick={handleOptionClick}
          />
        </Box>
        <Box sx={{ display: "flex", pl: 1 }}>{titleComponent}</Box>
      </Box>
      <Box
        className={`${classes["master-table"]}`}
        component={Paper}
        sx={{
          // maxHeight: "85%",
          border: "none",
          borderRadius: 0,
        }}
      >
        {isActive && <Box ref={accordianRef} onClick={()=>{
          onItemClick()}} sx={{ maxHeight: maxSummaryHeight }}>{children}</Box>}
      </Box>
    </Box>
  );
};
export default CommonAccordion;