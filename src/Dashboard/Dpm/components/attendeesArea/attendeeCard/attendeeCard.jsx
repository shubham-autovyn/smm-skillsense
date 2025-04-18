import { Box, Typography } from "@mui/material";
import { useDrag } from "react-dnd";

import {
  CardAllocation,
  ImageAllocation,
  ImageName,
} from "../attendeesArea.styles";

const ItemTypes = {
  ATTENDEE: "attendee",
};
const AttendeeCard = ({ item }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.ATTENDEE,
    item: { id: item.id, type: ItemTypes.ATTENDEE },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <CardAllocation
      ref={drag}
      style={{ cursor: "move", opacity: isDragging ? 0.5 : 1 }}
    >
      <ImageAllocation>
        <ImageName>{item.imageName}</ImageName>
      </ImageAllocation>
      <Box>
        <Typography style={{ margin: "0", color: "#343536" }}>
          {item.name}
        </Typography>
        <Typography style={{ margin: "0", color: "#66696B" }}>
          {item.id} | {item.skillLevel}
        </Typography>
      </Box>
    </CardAllocation>
  );
};

export default AttendeeCard;
