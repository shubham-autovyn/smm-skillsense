import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";
import React, { useContext } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";
import { MarutiBlue500, TypeSecondary } from "../../utils/colors";
import RightArrowIcon from "../../assets/icons/RightArrowIcon.svg";
import useStyles from "../../Dashboard/styles";
import "./DateSelector.css";
const getFormattedEpocDate = (inputDate) => {
  if (Number.isInteger(inputDate)) {
    return dayjs(inputDate * 1000).format("DD/MM/YYYY"); //It automatically handles time zones
  }
  return "-";
};
const DateSelector = (props) => {
  const classes = useStyles();
  const data = props?.data;
  const handleClick =
    (item) =>
    ({ getItemById, scrollToItem }) => {
      props.handleSelect(item);
    };

  const RenderLeftArrow = () => {
    const { isFirstItemVisible, scrollPrev } = useContext(VisibilityContext);
    return isFirstItemVisible ? (
      <div></div>
    ) : (
      <div
        disabled={isFirstItemVisible}
        onClick={() => scrollPrev()}
        style={{ alignSelf: "center" }}
      >
        <img
          alt="leftArrow"
          src={RightArrowIcon}
          style={{
            cursor: "pointer",
            height: "2.5rem",
            width: "2.5rem",
            transform: `rotate(180deg)`,
          }}
        />
      </div>
    );
  };

  const RenderRightArrow = () => {
    const { isLastItemVisible, scrollNext } = useContext(VisibilityContext);
    return isLastItemVisible ? (
      <div></div>
    ) : (
      <div
        disabled={isLastItemVisible}
        onClick={() => scrollNext()}
        style={{ alignSelf: "center" }}
      >
        <img
          alt="rightArrow"
          src={RightArrowIcon}
          style={{
            cursor: "pointer",
            height: "2.5rem",
            width: "2.5rem",
          }}
        />
      </div>
    );
  };

  const Card = ({ item, onClick, selected }) => {
    const visibility = useContext(VisibilityContext);
    return (
      <div
        onClick={() => onClick(visibility)}
        className="date-container"
        style={{ borderBottomWidth: selected ? 2 : 0 }}
      >
        <Typography
          color={selected ? MarutiBlue500 : TypeSecondary}
          variant="h5"
          sx={{
            fontSize: "1.4rem",
            lineHeight: "1.6rem",
            letterSpacing: "-0.025em",
            textAlign: "center",
            fontWeight: selected ? "bold" : "normal",
          }}
        >
          {getFormattedEpocDate(item.trainingDate - 19800)}
        </Typography>
        <Typography
          color={selected ? MarutiBlue500 : TypeSecondary}
          sx={{
            fontSize: "1.4rem",
            lineHeight: "1.6rem",
            letterSpacing: "-0.025em",
            textAlign: "center",
          }}
        >
          {`Total ${item.attendeesCount}`}
        </Typography>
      </div>
    );
  };

  return (
    <div style={{ marginTop: "2rem", padding: "0rem 2rem" }}>
      {data?.length > 0 ? (
        <ScrollMenu LeftArrow={RenderLeftArrow} RightArrow={RenderRightArrow}>
          {Array.isArray(data) &&
            data.map((item, index) => (
              <Card
                item={item}
                key={index}
                onClick={handleClick(item)}
                selected={props.isItemSelected(item)}
              />
            ))}
        </ScrollMenu>
      ) : (
        <Box className={classes["loader-container"]} sx={{ mt: 5, mb: 4 }}>
          <Typography
            variant="h6"
            style={{ color: MarutiBlue500 }}
          ></Typography>
        </Box>
      )}
    </div>
  );
};

export default DateSelector;
