import { Tooltip } from "@mui/material";
import { useDrag } from "react-dnd";
import getInitialName from "../../../../../utils/getInitailName";
import {
  TableBoxDeatils,
  TableDropFirstDetails,
  TableIdLevel,
  TableNames,
} from "./SetUpDeployment.style";

const ItemTypes = {
  ATTENDEE: "attendee",
};
const SetUpNewJoinees = ({ newJoineeData, idx }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.ATTENDEE,
    item: { id: newJoineeData.staffId, type: ItemTypes.ATTENDEE },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  return (
    <>
      <TableDropFirstDetails
        ref={drag}
        key={idx}
        style={{ opacity: isDragging ? 0.5 : 1, cursor: "move" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            fontSize: "16px",
            backgroundColor: "#9C9ECA",
            color: "#fff",
            fontWeight: "700",
          }}
        >
          {getInitialName(newJoineeData?.staffName)}
        </div>
        {/* <TableImg src={newJoineeData.image} alt="icon" /> */}
        <TableBoxDeatils>
          <Tooltip title={newJoineeData.staffName} arrow>
            <TableNames variant="h4">{newJoineeData.staffName}</TableNames>
          </Tooltip>
          <TableIdLevel variant="h4">{`${newJoineeData.staffId} | ${
            newJoineeData?.skillLevel || "-"
          } | ${newJoineeData.staffLevel}`}</TableIdLevel>
        </TableBoxDeatils>
      </TableDropFirstDetails>
    </>
  );
};

export default SetUpNewJoinees;
