import CloseIcon from "@mui/icons-material/Close";
import { Box, Typography } from "@mui/material";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { MarutiWhite } from "../../../../../Utilities/colors";

const DraggableItem = ({ item, index, isCloseRequired, handleCloseClick }) => {
  const nameProfile = item?.name;

  const getNameInitials = () => {
    const regex = /(Mr|MR|Ms|Miss|Mrs|Dr|Sir)(\.?)\s/;
    var match = regex.exec(nameProfile || ""),
      fullName = "";
    match !== null
      ? (fullName = nameProfile.replace(match[0], ""))
      : (fullName = nameProfile);

    const nameInitials = fullName
      ?.split(" ")
      .map((n) => n[0])
      .join("");

    return nameInitials;
  };

  return (
    <Draggable key={item.staffId} draggableId={item.staffId} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              userSelect: "none",
              padding: "2px",
              margin: "4px 0 8px 0",
              minHeight: "40px",
              borderRadius: "25px",
              borderColor: "#97999B",
              borderStyle: "dashed",
              borderWidth: "1px",
              display: "flex",
              gap: "1rem",
              backgroundColor: snapshot.isDragging ? "#F4F5F8" : "white",
              color: "black",
              ...provided.draggableProps.style,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                pr: 1,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    background: "#9C9ECA",
                    borderRadius: "50%",
                    width: "36px",
                    height: "36px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="h4" color={MarutiWhite}>
                    {getNameInitials() || ""}
                  </Typography>
                </Box>
                <Box sx={{ pl: 1, display: "flex", flexDirection: "column" }}>
                  <Typography variant="h7">{item?.name}</Typography>
                  <Typography variant="subtitle3" fontWeight={"normal"}>
                    {`${item?.staffId} | ${item?.level}`}
                  </Typography>
                </Box>
              </Box>
              {isCloseRequired ? (
                <CloseIcon
                  style={{ cursor: "pointer" }}
                  aria-label="close"
                  onClick={() => {
                    handleCloseClick(item);
                  }}
                />
              ) : null}
            </Box>
          </div>
        );
      }}
    </Draggable>
  );
};

export default DraggableItem;
