import { Box, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { Grey10 } from "../../../src/utils/colors";
import Minus from "../../assets/icons/Minus.svg";
import Plus from "../../assets/icons/Plus.svg";
import useStyles from "../../Dashboard/styles";

const CustomAccordion = ({
  children,
  borderColor = "#F4F5F8",
  sx = {},
  expanded,
  titleComponent,
  onToggle,
  maxSummaryHeight = "200px",
}) => {
  const [isActive, setIsActive] = useState(expanded || false);
  const classes = useStyles();

  useEffect(() => {
    if (expanded !== undefined) {
      setIsActive(expanded);
    }
  }, [expanded]);

  const handleClick = () => {
    const newState = !isActive;
    setIsActive(newState);
    if (onToggle) {
      onToggle(newState);
    }
  };

  return (
    <Box
      sx={{
        border: `1px solid ${borderColor}`,
        borderRadius: "8px",
        marginBottom: "1.6rem",
        ...sx,
      }}
    >
      <Box
        sx={{
          p: "0.8rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: Grey10,
          borderRadius: isActive ? "8px 8px 0px 0px" : "8px",
        }}
      >
        <Box sx={{ display: "flex", gap: 1, width: "100%", pr: 2 }}>
          {titleComponent}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src={isActive ? Minus : Plus}
            alt="toggle"
            height="20rem"
            width="20rem"
            className={classes["image-link"]}
            onClick={handleClick}
          />
        </Box>
      </Box>
      {isActive && (
        <Box
          className={`${classes["master-table"]}`}
          component={Paper}
          sx={{
            borderTopLeftRadius: "0rem !important",
            height: "85%",
            border: "none",
          }}
        >
          <Box sx={{ maxHeight: maxSummaryHeight }}>{children}</Box>
        </Box>
      )}
    </Box>
  );
};

export default CustomAccordion;
