import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  MarutiBlue500,
  TypeSecondary,
  TypeTertiary,
} from "../../../../../../../Utilities/colors";
import CheckFilledGreen from "../../../../../../assets/icons/CheckFilledGreen.svg";
import useStyles from "../../../../../styles";

const TrainingTopics = ({
  batchData,
  selectedTrainingId,
  handleTrainingClick,
  totalNoOfDays,
}) => {
  const [filterBatch, setFilterBatch] = useState([]);
  const classes = useStyles();
  const daysArr = Array.from(Array(totalNoOfDays || 1).keys());

  useEffect(() => {
    if (batchData) {
      const arr = [];
      daysArr.map((day) => {
        const validDay = day + 1;
        arr.push(
          batchData.filter((batch) => batch.topicSequenceDay === validDay)
        );
        return day;
      });
      setFilterBatch(arr);
    }
  }, [batchData]);

  return (
    <Box
      sx={{
        width: "20%",
        borderRadius: "8px",
        border: "1px solid var(--Grey-20, #E6E9F0)",
        overflow: "scroll !important",
      }}
      className={`${classes["repository-table-dimensions"]}`}
    >
      <ul style={{ listStyleType: "none", padding: 0, paddingTop: "2rem" }}>
        {filterBatch?.map((batch, index) => {
          return (
            <Box key={`${index}`}>
              <Typography
                variant="body1"
                sx={{
                  color: TypeTertiary,
                  padding: "0 0.6rem 0.6rem 1rem",
                }}
              >
                {`Day ${index + 1}`}
              </Typography>
              {batch?.map((item, index) => {
                const isSelected = selectedTrainingId === item?.trainingId;
                return (
                  <li
                    key={index}
                    onClick={() => handleTrainingClick(item?.trainingId,item?.filledBy)}
                    style={{
                      cursor: "pointer",
                      backgroundColor: isSelected ? "#E6E9F0" : "white",
                      display: "flex",
                      alignItems: "center",
                      padding: "0.6rem 0.6rem 0.6rem 1rem",
                      marginBottom: "0.4rem",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        color: isSelected ? MarutiBlue500 : TypeSecondary,
                        fontWeight: isSelected ? "600" : "500",
                      }}
                    >
                      {item?.trainingTopicName || ""}
                    </Typography>
                    {item?.topicStatus === "COMPLETED" && (
                      <img
                        src={CheckFilledGreen}
                        alt="Check"
                        style={{ height: "16px", width: "16px" }}
                      />
                    )}
                  </li>
                );
              })}
            </Box>
          );
        })}
      </ul>
    </Box>
  );
};
export default TrainingTopics;
