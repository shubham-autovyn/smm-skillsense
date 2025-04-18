import { Box, Typography } from "@mui/material";
import React, { useEffect, useState, Fragment } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TertiaryButton from "../../../../../Utilities/Buttons/TertiaryButton/TertiaryButton";
import {
  Grey10,
  Grey20,
  TypePrimary,
  TypeSecondary,
} from "../../../../../Utilities/colors";
import DraggableItem from "./DraggableItem";
import Success from "../../../../assets/icons/Done.svg";
import ExclamationRed from "../../../../assets/icons/ExclamationRed.svg";
import useStyles from "../../../styles";
import CustomSnackbar from "../../../../components/CustomSnackbar/CustomSnackbar";
import StaffAllocationSearch from "../../StaffAllocationSearch";

const PendingAllocation = ({
  staffAllocationList,
  areaDetailData,
  allocationColumns,
  updateAllocationColumn,
  handleStaffSelection,
  handleClearFilter,
  selectedStaff,
  tempAllocationColumns,
}) => {
  const [openSnakbar, setOpenSnackbar] = useState("false");

  const classes = useStyles();

  useEffect(() => {
    let data = {};
    if (staffAllocationList && staffAllocationList.staff_details?.length) {
      data = {
        ...allocationColumns,
        ["pendingAllocation"]: {
          items: staffAllocationList.staff_details,
        },
      };
    }

    if (areaDetailData) {
      data = {
        ...data,
        ...areaDetailData,
      };
      updateAllocationColumn(data);
    }
  }, [staffAllocationList, areaDetailData]);

  //CALLBACK
  const onDragEnd = (result, columns, setColumns) => {
    let tempColumns = {};
    let tempColumnsCopy = {};
    if (!result.destination) return; //When destination is null
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const destColumn = columns[destination.droppableId];
      if (destColumn?.items?.length === destColumn?.requirement) {
        setOpenSnackbar(true);
      } else {
        tempColumns = fetchDiffSourceDestinationData(
          columns,
          source,
          destination
        );
        tempColumnsCopy = fetchDiffSourceDestinationData(
          tempAllocationColumns,
          source,
          destination
        );
        setColumns(tempColumns, tempColumnsCopy);
      }
    } else {
      tempColumns = fetchSameSourceDestinationData(
        columns,
        source,
        destination
      );
      tempColumnsCopy = fetchSameSourceDestinationData(
        tempAllocationColumns,
        source,
        destination
      );
      setColumns(tempColumns, tempColumnsCopy);
    }
  };

  const fetchDiffSourceDestinationData = (columnData, source, destination) => {
    const sourceColumn = columnData[source.droppableId];
    const destColumn = columnData[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    return {
      ...columnData,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    };
  };

  const fetchSameSourceDestinationData = (columnData, source, destination) => {
    const column = columnData[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    return {
      ...columnData,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    };
  };

  const handleRemoveClick = (sourceId, val, sourceIndex) => {
    let tempColumns = fetchRemovedData(
      sourceId,
      sourceIndex,
      allocationColumns
    );
    let tempColumnsCopy = fetchRemovedData(
      sourceId,
      sourceIndex,
      tempAllocationColumns
    );
    updateAllocationColumn(tempColumns, tempColumnsCopy);
  };

  const fetchRemovedData = (sourceId, sourceIndex, columnData) => {
    const sourceColumn = columnData?.[sourceId];
    const destColumn = columnData["pendingAllocation"];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems?.splice(sourceIndex, 1);
    destItems?.splice(destItems.length, 0, removed);
    return {
      ...columnData,
      [sourceId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      ["pendingAllocation"]: {
        ...destColumn,
        items: destItems,
      },
    };
  };
  // const checkAllocation = (column) => { //TODO:UNCOMMENT
  //   return column?.items?.length === column?.requirement;
  // };
  // const handleClose = () => {
  //   setOpenSnackbar(false);
  // };

  const RenderAreaDroppable = ({ columnId, areaColumn, idxArea }) => {
    return (
      <Droppable
        // isDropDisabled={checkAllocation(column)}
        droppableId={columnId}
        key={idxArea}
      >
        {(provided, snapshot) => {
          return (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                background: snapshot.isDraggingOver ? Grey20 : Grey10,
                padding: 4,
                flexDirection: "row",
                gap: 4,
                flexWrap: "wrap",
                overflow: "auto",
                marginTop: 8,
              }}
            >
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    p: "1rem",
                  }}
                >
                  {/* <img
                    style={{
                      height: "1.6rem",
                      width: "1.6rem",
                    }}
                    alt="MSIL Logo"
                    src={false ? Success : ExclamationRed}
                  /> */}

                  <Typography variant="subtitle3" color={TypePrimary}>
                    {areaColumn?.areaName || ""}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: "1rem",
                    flexWrap: "wrap",
                  }}
                >
                  {areaColumn?.items?.map((item, index) => {
                    return (
                      <Box sx={{ minWidth: "220px" }} key={`${index}`}>
                        <DraggableItem
                          key={index}
                          item={item}
                          index={index}
                          isCloseRequired
                          handleCloseClick={() =>
                            handleRemoveClick(columnId, item, index)
                          }
                        />
                      </Box>
                    );
                  })}
                </Box>
              </Box>
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
      className={`${classes["master-table"]} ${classes["master-table-dimensions"]}`}
    >
      <Box
        sx={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          backgroundColor: Grey10,
          p: 1,
        }}
      >
        <Typography variant="h5" color={TypeSecondary}>
          Filters:
        </Typography>
        <Box sx={{ pl: "1rem", minWidth: "50%" }}>
          <StaffAllocationSearch
            handleStaffSelection={handleStaffSelection}
            allocationStaffData={staffAllocationList?.staff_details || []}
            selectedData={selectedStaff}
            handleClearFilter={() => {
              setTimeout(() => {
                handleClearFilter();
              }, 100);
            }}
            placeholder="Search Staff ID, Name"
          />
        </Box>
        <Box>
          <TertiaryButton onClick={handleClearFilter}>Clear</TertiaryButton>
        </Box>
      </Box>
      <Box sx={{ display: "flex", height: "100%" }}>
        <DragDropContext
          onDragEnd={(result) =>
            onDragEnd(result, allocationColumns, updateAllocationColumn)
          }
        >
          <Box>
            <Typography variant="h4" sx={{ pb: "1.6rem" }}>
              Pending Allocation
            </Typography>
            <Box
              sx={{ overflowY: "scroll !important" }}
              className={`${classes["allocation-container-dimensions"]}`}
            >
              <Droppable
                droppableId={"pendingAllocation"}
                key={"pendingAllocation"}
              >
                {(provided, snapshot) => {
                  return (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        background: snapshot.isDraggingOver ? Grey20 : "white",
                        border: "1px solid #E6E9F0",
                        borderRadius: "8px 0px 0px 8px",
                        padding: 4,
                        paddingTop: "8px",
                        width: 250,
                        height: "100%",
                      }}
                    >
                      <Typography
                        variant="subtitle3"
                        color={TypePrimary}
                        sx={{ p: 1 }}
                      >
                        {`${
                          allocationColumns?.pendingAllocation?.items?.length
                        }/${
                          staffAllocationList?.staff_details?.length || ""
                        } remaining to be allocated`}
                      </Typography>
                      {allocationColumns?.pendingAllocation?.items.map(
                        (item, index) => {
                          return (
                            <DraggableItem
                              key={`${index}`}
                              item={item}
                              index={index}
                            />
                          );
                        }
                      )}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </Box>
          </Box>
          <div style={{ width: "100%" }}>
            <Box sx={{ height: "100%" }}>
              <Box>
                <Typography variant="h4" sx={{ pb: "1.6rem" }}>
                  Recommended Allocation
                </Typography>
              </Box>
              <Box
                sx={{
                  border: "1px solid #E6E9F0",
                  borderLeft: "none",
                  borderRadius: "0px 8px 8px 0px",
                  overflowY: "scroll !important",
                }}
                className={`${classes["allocation-container-dimensions"]}`}
              >
                {Object.entries(allocationColumns).map(
                  ([columnId, column], index) => {
                    if (columnId === "pendingAllocation") {
                      return null;
                    }
                    return (
                      <Box style={{ margin: 8 }} key={`${index}`}>
                        {column?.name && <h2>{column?.name}</h2>}
                        <RenderAreaDroppable
                          columnId={columnId}
                          areaColumn={column}
                          idxArea={columnId}
                          key={columnId}
                        />
                      </Box>
                    );
                  }
                )}
              </Box>
            </Box>
          </div>
        </DragDropContext>
      </Box>
      {/* 
      //TODO:UNCOMMENT AFTER LIMIT FUNCTIONALITY IMPLEMENTAION
      <CustomSnackbar
        open={openSnakbar}
        handleClose={handleClose}
        message="This area has reached its maximum limit of operators. Please drag and drop into an area which has not yet reached its limit"
      /> 
      */}
    </Box>
  );
};

export default PendingAllocation;
