import React, { useEffect, useState } from 'react';

import AlertGreen from '../../assets/svg/alertGreen.svg';
import downArrow from '../../assets/svg/dawnred.svg';
import collapsed from '../../assets/svg/expand.svg';
import expanded from '../../assets/svg/expanded.svg';
import Alert from '../../assets/svg/fi-rr-exclamation.svg';
import upArrow from '../../assets/svg/upgreen.svg';
import TooltipComponent from './../../components/ToolTip/ToolTip';
import BasicDialogBox from './basicDailogBox/basicDialogBox';
import './basicDataTree.css';

import {
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material';
import countNewJoiners from '../../utils/countNewJoiners';
import EditableCell from '../EditeTableCell/editTableCell';
import { StyledTableCell, TableBox } from './datatree.style';

const DataTreeTable = ({
  tableData,
  headerName,
  designCell,
  onDataChange = () => {},
  onUpdate = () => {},
  setTooltipFunction,
  totalNewJoineeCount,
}) => {
  const [data, setData] = useState(tableData);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openNodeId, setOpenNodeId] = useState(null);

  const [openTooltipId, setOpenTooltipId] = useState(null);
  const [newData, setNewData] = useState([]);

  const [totalCount, setTotalCount] = useState(0);
  const [preValue, setPreValue] = useState(null);

  useEffect(() => {
    updateCellNewjoiners();
  }, [data]);

  useEffect(() => {
    onDataChange(newData);
    setTotalCount(countNewJoiners(newData));
  }, [newData]);

  const updateNewJoiners = (node, isFirstLevel = false) => {
    if (!node.children || node.children.length === 0) {
      return { ...node, newJoiners: node.newJoiners || 0 };
    }

    const updatedChildren = node.children.map((child) =>
      updateNewJoiners(child)
    );

    const totalNewJoiners = updatedChildren.reduce(
      (sum, child) => sum + child.newJoiners,
      0
    );

    return isFirstLevel
      ? {
          ...node,
          children: updatedChildren,
          newJoiners: totalNewJoineeCount,
        }
      : {
          ...node,
          children: updatedChildren,
          newJoiners: totalNewJoiners,
        };
  };

  const updateCellNewjoiners = () => {
    setNewData(() => {
      return data.map((node) => updateNewJoiners(node, true));
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setAnchorEl(null);
      setOpenNodeId(null);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMouseLeave = () => {
    setOpenTooltipId(null);
  };
  useEffect(() => {
    setData(tableData);
  }, [tableData]);

  useEffect(() => {
    if (setTooltipFunction) {
      setTooltipFunction(() => handleClose);
      return () => setTooltipFunction(null);
    }
  }, [setTooltipFunction]);

  const handleClick = (event, nodeId, id) => {
    setAnchorEl(event.currentTarget);
    setOpenNodeId(id);
    if (openTooltipId === id) {
      setOpenTooltipId(null);
    } else {
      setOpenTooltipId(id);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenNodeId(null);
    setOpenTooltipId(null);
  };

  const toggleNode = (nodeId) => {
    setData((prevData) => {
      const toggleRecursive = (nodes) => {
        return nodes.map((node) => {
          if (node.randomId === nodeId || node.id === nodeId) {
            return { ...node, expanded: !node.expanded };
          } else if (node.children) {
            return {
              ...node,
              children: toggleRecursive(node.children),
            };
          }
          return node;
        });
      };
      return toggleRecursive(prevData);
    });
  };

  const handleEdit = (randomId, field, value, totalNewJoineeCount) => {
    const numericValue = Number(value) || 0;
    try {
      let updatedData = data.map((node) =>
        updateCellRecursive(node, randomId, field, numericValue)
      );

      let updatedDataWithNewJoiners = updatedData.map((node) =>
        updateNewJoiners(node, true)
      );

      const totalCount = countNewJoiners(updatedDataWithNewJoiners);

      onUpdate(totalCount !== totalNewJoineeCount); // Simplified boolean logic

      if (totalCount <= totalNewJoineeCount) {
        setData(updatedDataWithNewJoiners); // Ensure the right dataset is updated
      }
    } catch (error) {
      console.error('Validation failed:', error.message);
    }
  };

  const updateCellRecursive = (node, randomId, field, value) => {
    if (node.randomId === randomId) {
      return {
        ...node,
        [field]: value,
      };
    }
    if (node.children) {
      return {
        ...node,
        children: node.children.map((child) =>
          updateCellRecursive(child, randomId, field, value)
        ),
      };
    }

    return node;
  };
  const renderTreeRows = (nodes, depth = 0) => {
    return nodes.map((node, index) => {
      return (
        <React.Fragment key={node.randomId + index}>
          {designCell && (
            <TableRow className="designRow">
              <StyledTableCell depth={depth}>
                {node.children && node.children.length > 0 && (
                  <button
                    className="btn"
                    onClick={() => toggleNode(node.randomId)}
                  >
                    {node.expanded ? (
                      <img src={expanded} alt="Expand" />
                    ) : (
                      <img src={collapsed} alt="Collapse" />
                    )}
                  </button>
                )}
                {node.category ||
                  node.subCategory ||
                  node.group ||
                  node.line ||
                  node.area}
              </StyledTableCell>
              <StyledTableCell>
                {node.count !== undefined &&
                  node.changeInCount !== undefined &&
                  node.changeInCount !== 0 && (
                    <span
                      className={`change ${
                        node.changeInCount > 0 ? 'positive' : 'negative'
                      }`}
                    >
                      {node.changeInCount > 0 ? (
                        <>
                          <img
                            className="iconImg"
                            src={upArrow}
                            alt="Up arrow"
                          />
                          <button
                            style={{
                              marginLeft: '4px',
                              cursor: node.stations ? 'pointer' : 'default', // Dynamic cursor
                            }}
                            id={`button-${node.randomId}`}
                            aria-controls={
                              openTooltipId === node.randomId
                                ? 'basic-menu'
                                : undefined
                            }
                            aria-haspopup="true"
                            aria-expanded={
                              openTooltipId === node.randomId
                                ? 'true'
                                : undefined
                            }
                            onClick={(e) =>
                              handleClick(e, node.id + index, node.randomId)
                            }
                          >
                            {node.count}
                          </button>
                        </>
                      ) : (
                        <>
                          <img
                            className="iconImg"
                            src={downArrow}
                            alt="Down arrow"
                          />
                          <button
                            style={{
                              marginLeft: '4px',
                              cursor: node.stations ? 'pointer' : 'default', // Dynamic cursor
                            }}
                            id={`button-${node.randomId}`}
                            aria-controls={
                              openTooltipId === node.randomId
                                ? 'basic-menu'
                                : undefined
                            }
                            aria-haspopup="true"
                            aria-expanded={
                              openTooltipId === node.randomId
                                ? 'true'
                                : undefined
                            }
                            onClick={(e) =>
                              handleClick(e, node.id + index, node.randomId)
                            }
                          >
                            {node.count}
                          </button>
                        </>
                      )}
                    </span>
                  )}
                {node.count !== undefined && node.changeInCount === 0 && (
                  <button
                    className="noChange"
                    style={{
                      cursor: node.stations ? 'pointer' : 'default', // Dynamic cursor
                    }}
                    id={`button-${node.id + index}`}
                    aria-controls={
                      openTooltipId === node.randomId ? 'basic-menu' : undefined
                    }
                    aria-haspopup="true"
                    aria-expanded={
                      openTooltipId === node.randomId ? 'true' : undefined
                    }
                    onClick={(e) =>
                      handleClick(e, node.id + index, node.randomId)
                    }
                  >
                    {node.count}
                  </button>
                )}
                {openTooltipId === node.randomId && node.stations && (
                  <TooltipComponent
                    anchorEl={anchorEl}
                    title={
                      <BasicDialogBox
                        name={node.name}
                        stations={node.stations}
                        value={node.count ?? 0}
                        onClose={handleClose}
                      />
                    }
                    position="right"
                    open={openTooltipId === node.randomId}
                    onClose={handleMouseLeave}
                  />
                )}
              </StyledTableCell>

              <StyledTableCell>
                {node.changeInCount !== undefined &&
                  node.changeInCount !== 0 && (
                    <span
                      className={`change ${
                        node.changeInCount > 0 ? 'positive' : 'negative'
                      }`}
                    >
                      {node.changeInCount > 0
                        ? `+${node.changeInCount}`
                        : node.changeInCount}
                    </span>
                  )}
                {node.changeInCount !== undefined &&
                  node.changeInCount === 0 && (
                    <span
                      style={{
                        paddingRight: '10px',
                        color: 'black',
                      }}
                    >
                      {node.changeInCount}
                    </span>
                  )}
              </StyledTableCell>
            </TableRow>
          )}
          {!designCell && node.name && (
            <TableRow>
              <StyledTableCell depth={depth}>
                {node?.children && node?.children.length > 0 && (
                  <button onClick={() => toggleNode(node.randomId)}>
                    {node.expanded ? (
                      <img src={expanded} alt="Expand" />
                    ) : (
                      <img src={collapsed} alt="Collapse" />
                    )}
                  </button>
                )}
                {node.name}
              </StyledTableCell>
              <StyledTableCell>{node.gap}</StyledTableCell>
              <StyledTableCell
                sx={
                  node.delta === null
                    ? { backgroundColor: '#e6e9f0' }
                    : { backgroundColor: 'white' }
                }
              >
                {node.depth === 0 ? (
                  <span>
                    <span
                      style={
                        totalNewJoineeCount > totalCount
                          ? { color: 'red' }
                          : { color: '#000' }
                      }
                    >
                      {totalCount}
                    </span>{' '}
                    /{' '}
                    <span style={{ color: '#000' }}>
                      {' '}
                      {totalNewJoineeCount}
                    </span>
                    <Tooltip
                      title={
                        <span
                          style={{
                            fontSize: '12px',
                            fontWeight: '500',
                          }}
                        >
                          {totalCount < totalNewJoineeCount
                            ? `${
                                totalNewJoineeCount - totalCount
                              } new joiners are pending to be allocated`
                            : 'All joiners are allocated'}
                        </span>
                      }
                      arrow
                    >
                      <img
                        src={
                          totalCount === totalNewJoineeCount
                            ? AlertGreen
                            : Alert
                        }
                        alt="status icon"
                        style={{
                          marginLeft: '8px',
                          verticalAlign: 'middle',
                        }}
                      />
                    </Tooltip>
                  </span>
                ) : node.delta === null ? (
                  <EditableCell
                    style={{
                      backgroundColor: '#e6e9f0',
                      textAlign: 'end',
                    }}
                    value={node.newJoiners || 0}
                    onSave={(newValue) =>
                      handleEdit(
                        node.randomId,
                        'newJoiners',
                        newValue,
                        totalNewJoineeCount
                      )
                    }
                  />
                ) : (
                  <span
                    style={{
                      paddingLeft: '10px',
                      color: '#000',
                    }}
                  >
                    {node.newJoiners}
                  </span>
                )}
              </StyledTableCell>
            </TableRow>
          )}
          {node.expanded &&
            node.children &&
            renderTreeRows(node.children, depth + 1)}
        </React.Fragment>
      );
    });
  };

  return (
    <TableContainer>
      <TableBox aria-label="simple table">
        <TableHead>
          <TableRow className={designCell ? 'customHeader' : 'nonDesignHeader'}>
            {headerName &&
              headerName.map((name, index) => <th key={index}>{name}</th>)}
          </TableRow>
        </TableHead>
        <TableBody>{renderTreeRows(newData)}</TableBody>
      </TableBox>
    </TableContainer>
  );
};

export default DataTreeTable;
