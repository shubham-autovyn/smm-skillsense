import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  TableBody,
  TableContainer,
  TableHead,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AlertGreen from "../../../../../assets/svg/alertGreen.svg";
import collapsed from "../../../../../assets/svg/expand.svg";
import expanded from "../../../../../assets/svg/expanded.svg";
import Alert from "../../../../../assets/svg/fi-rr-exclamation.svg";

import EditableCell from "../../../../../components/EditeTableCell/editTableCell";
import {
  Cell,
  Row,
  SubmitPopContent,
  SubmitPopHeading,
  TableBox,
} from "./newJoinerTable.style";

const getAllUniqueHeaders = (nodes) => {
  const dates = new Set();

  const collectDates = (node) => {
    node.data?.forEach((dataItem) => dates.add(dataItem.date));
    node.children?.forEach((child) => collectDates(child));
  };

  nodes?.forEach((node) => collectDates(node));
  return Array.from(dates).sort();
};

const calculateTotalChild = (data, date) => {
  let sum = 0;
  data.forEach((node) => {
    node.children.forEach((child) => {
      child.data.forEach((item, i) => {
        if (item.date === date) {
          sum += item.newJoiners;
        }
      });
    });
  });
  return sum;
};

const calculateTotalParent = (data, date) => {
  let sum = 0;
  data.forEach((node) => {
    node.data.forEach((item, i) => {
      if (item.date === date) {
        sum += item.newJoiners;
      }
    });
  });
  return sum;
};

const NewJoinerTable = ({ allocationData, onDataChange, setButtonDisable }) => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (Array.isArray(allocationData)) {
      setData(allocationData);
    }
  }, [allocationData]);

  const dates = getAllUniqueHeaders(allocationData);

  const handleClose = () => {
    setOpen(false);
  };

  const recursiveUpdate = (node, callback) => {
    const updatedNode = callback(node);
    if (node.children) {
      return {
        ...updatedNode,
        children: node.children.map((child) =>
          recursiveUpdate(child, callback)
        ),
      };
    }
    return updatedNode;
  };

  const toggleNode = (nodeId) => {
    setData((prevData) =>
      prevData.map((node) =>
        recursiveUpdate(node, (n) =>
          n.nodeId === nodeId ? { ...n, expanded: !n.expanded } : n
        )
      )
    );
  };

  const checkTotalJoiners = (date, nodeId, parentNodeId, value) => {
    let maxValue = 0;
    let sum = 0;
    let nodes = data.filter((node) => node.nodeId === parentNodeId);
    let dates = nodes[0].data.filter((node) => node.date === date);
    maxValue = dates[0].newJoiners;
    nodes[0].children.forEach((node) => {
      node.data.forEach((item, i) => {
        if (item.date === date && node.nodeId !== nodeId) {
          sum += item.newJoiners;
        }
      });
    });
    return [sum + value, maxValue];
  };

  const handleEdit = (
    nodeId,
    field,
    value,
    index,
    date,
    nodes,
    parentNodeId
  ) => {
    try {
      const sum = checkTotalJoiners(date, nodeId, parentNodeId, value);
      if (sum[0] <= sum[1]) {
        const updatedData = data.map((node) =>
          updateCellRecursive(node, nodeId, field, parseInt(value), date)
        );

        setData(updatedData);

        onDataChange(updatedData);
      } else {
        setOpen(true);
        setData([...data]);
      }
    } catch (error) {
      console.error("Validation failed:", error.message);
    }
  };
  const updateCellRecursive = (node, nodeId, field, value, date) => {
    if (node.nodeId === nodeId) {
      return {
        ...node,
        data: node.data.map((item, i) =>
          item.date === date ? { ...item, [field]: value } : item
        ),
      };
    }
    if (node.children) {
      return {
        ...node,
        children: node.children.map((child) =>
          updateCellRecursive(child, nodeId, field, value, date)
        ),
      };
    }

    return node;
  };

  const renderTreeRows = (nodes, depth = 0, parentNodeId = 0) => {
    return nodes.map((node) => (
      <React.Fragment key={node.nodeId}>
        <Row>
          <Cell
            depth={depth}
            style={{
              color: "#343536",
              fontWeight: node.expanded ? "700" : "400",
              display: "flex",
              alignItems: "center",
            }}
          >
            {node.children && (
              <button
                onClick={() => toggleNode(node.nodeId)}
                style={{ marginRight: "10px" }}
              >
                <img src={node.expanded ? expanded : collapsed} alt="Toggle" />
              </button>
            )}
            {node.name}
          </Cell>

          {dates.map((date, index) => {
            const dataItem =
              node.data?.find((item) => item.date === date) || {};

            return (
              <React.Fragment key={date}>
                <Cell
                  style={{
                    fontWeight: node.expanded ? "700" : "400",
                    color: "#343536",
                  }}
                >
                  {dataItem.cumulativeGap || 0}
                </Cell>
                <Cell
                  style={{
                    backgroundColor: node.children ? "#fff" : "#f4f5f8",
                    fontWeight: node.expanded ? "700" : "400",
                    color: "#343536",
                  }}
                >
                  {node.children ? (
                    dataItem.newJoiners || 0
                  ) : (
                    <EditableCell
                      style={{
                        fontWeight: node.expanded ? "700" : "400",
                        color: "#343536",
                        backgroundColor: node.expanded ? "#fff" : "#f4f5f8",
                      }}
                      value={dataItem.newJoiners || 0}
                      onSave={(newValue) =>
                        handleEdit(
                          node.nodeId,
                          "newJoiners",
                          newValue,
                          index,
                          date,
                          nodes,
                          parentNodeId
                        )
                      }
                    />
                  )}
                </Cell>
              </React.Fragment>
            );
          })}
        </Row>
        {node.expanded &&
          node.children &&
          renderTreeRows(node.children, depth + 1, node.nodeId)}
      </React.Fragment>
    ));
  };
  const redCount = dates.filter((date) => {
    const totalChild = calculateTotalChild(data, date);
    const totalParent = calculateTotalParent(data, date);
    return totalChild !== totalParent; // This means color is red
  }).length;
  setButtonDisable(redCount === 0 ? false : true);

  return (
    <>
      <TableContainer>
        <TableBox aria-label="simple table">
          <TableHead>
            <Row>
              <Cell></Cell>
              {dates.map((date, index) => (
                <React.Fragment key={index}>
                  <Cell>{date}</Cell>
                  <Cell></Cell>
                </React.Fragment>
              ))}
            </Row>
            <Row>
              <Cell>Hierarchy</Cell>
              {dates.map((date, index) => (
                <React.Fragment key={index}>
                  <Cell>Cumulative Gap</Cell>
                  <Cell
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      border: "none",
                    }}
                  >
                    New Joiners
                    {(() => {
                      const totalChild = calculateTotalChild(data, date);
                      const totalParent = calculateTotalParent(data, date);
                      const pendingJoiners = totalParent - totalChild;
                      const totalSumColor =
                        totalChild === totalParent ? "black" : "red";
                      const alertIcon =
                        totalChild === totalParent ? AlertGreen : Alert;

                      return (
                        <React.Fragment key={index}>
                          ({" "}
                          <span
                            style={{
                              color: totalSumColor,
                            }}
                          >
                            {totalChild}
                          </span>
                          {" / "}
                          <span style={{ color: "black" }}>{totalParent}</span>)
                          <Tooltip
                            title={
                              <span
                                style={{ fontSize: "12px", fontWeight: "500" }}
                              >
                                {pendingJoiners !== 0
                                  ? `${pendingJoiners} new joiners are pending to be allocated`
                                  : "All joiners are allocated"}
                              </span>
                            }
                            arrow
                          >
                            <img src={alertIcon} alt="icon" />
                          </Tooltip>
                        </React.Fragment>
                      );
                    })()}
                  </Cell>
                </React.Fragment>
              ))}
            </Row>
          </TableHead>

          <TableBody>{data.length > 0 && renderTreeRows(data, 0)}</TableBody>
        </TableBox>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="xs">
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <SubmitPopHeading>Confirm Allocation</SubmitPopHeading>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          <SubmitPopContent>
            No extra joiners are allowed. Please confirm the allocation.
          </SubmitPopContent>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewJoinerTable;
