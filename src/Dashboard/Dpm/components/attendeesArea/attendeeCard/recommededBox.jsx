import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Typography } from "@mui/material";
import { useDrop } from "react-dnd";
import Done from "../../../../../assets/svg/Done.svg";
import Exclamation from "../../../../../assets/svg/fi-rr-exclamation.svg";

import {
  CardAllocation,
  ImageAllocation,
  ImageName,
  RecommendedBoxContent,
  RecommendedCardBox,
  RecommendedCardContent,
  RecommendedBox as StyledRecommendedBox,
} from "../attendeesArea.styles";

const ItemTypes = {
  ATTENDEE: "attendee",
};

const NewRecommendedBox = ({
  child,
  recommendedData,
  onDrop,
  onRemove,
  id,
}) => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.ATTENDEE,
    drop: (item) => onDrop(item, child, id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const staffId = child?.staffIds?.[0];

  const recommendedItem = recommendedData.find((item) => item?.id === staffId);

  return (
    <StyledRecommendedBox
      ref={drop}
      style={{
        border: isOver ? "2px dashed #4CAF50" : "none",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <img
            src={
              child?.staffIds?.length === child?.newJoiners ? Done : Exclamation
            }
            alt="icon"
          />
          <RecommendedBoxContent
            sx={
              child?.staffIds?.length === child?.newJoiners
                ? { color: "#343536" }
                : { color: "#D83B01" }
            }
          >
            {child?.area} | {child?.staffIds?.length || 0}/{child?.newJoiners}{" "}
            added
          </RecommendedBoxContent>
        </span>
        <p
          style={
            child?.staffIds === undefined || child?.staffIds?.length === 0
              ? { display: "block", color: "#66696B", fontSize: "12px" }
              : { display: "none" }
          }
        >
          To add, drag & drop operator names
        </p>
      </div>

      <RecommendedCardBox>
        {recommendedItem &&
          recommendedData.map((item, index) => (
            <CardAllocation key={index}>
              <ImageAllocation>
                <ImageName>{item?.imageName}</ImageName>
              </ImageAllocation>
              <RecommendedCardContent>
                <Box>
                  <Typography style={{ margin: "0", color: "#343536" }}>
                    {item?.name}
                  </Typography>
                  <Typography style={{ margin: "0", color: "#66696B" }}>
                    {item?.id} | {item?.code}
                  </Typography>
                </Box>
                <IconButton onClick={() => onRemove(item.id)}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </RecommendedCardContent>
            </CardAllocation>
          ))}
      </RecommendedCardBox>
    </StyledRecommendedBox>
  );
};

export default NewRecommendedBox;
