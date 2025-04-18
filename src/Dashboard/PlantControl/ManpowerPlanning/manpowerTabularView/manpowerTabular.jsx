import { Visibility, VisibilityOff } from '@mui/icons-material';
import AddBox from '@mui/icons-material/AddBoxOutlined';
import RemoveBox from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import { Backdrop, CircularProgress } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import * as shopReducer from '../../../../redux/Reducers/SMMShopReducer';
import RearrangeData from '../../../../utils/rearrangeData';
import RelievingOperator from '../../../Dpm/components/ShopDashboardTabs/ManPowerPlanning/DpmManpowerTabularTable/components/relieving operator/RelievingOperator';
import useRelivingOperators from '../../hooks/relivingopertaors';
import './manpowerTabular.css';
import { TableButton } from './manpowerTabular.style';

const ManpowerTabular = ({ tableData, dayWiseBtn }) => {
  const [expandedRows, setExpandedRows] = useState({});
  const [eyeChecked, setEyeChecked] = useState(null);
  const [treeFilterData, setTreeFilterData] = useState(null);
  const [treeFilterHierarchy, setTreeFilterHierarchy] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dayDate, setDayDate] = useState(null);
  const [filteredDates, setFilteredDates] = useState([]);
  const [reliverData, setReliverData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [operatorName, setOperatorName] = useState(null);
  const selectedLocation = useSelector(shopReducer.getLocation);
  const {
    data: relivingOperatorsData,
    fetchData,
    loading,
  } = useRelivingOperators();
  const [expandeFilter, setExpandeFilter] = useState(null);

  useEffect(() => {
    setDayDate(dayWiseBtn);
  }, [dayWiseBtn]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const RelivingOperator = async (payload) => {
    const response = await fetchData(payload);
    if (response?.data?.responseCode === 200) {
      setReliverData(response?.data?.response);
    }
    setOpenDialog(true);
  };
  useEffect(() => {
    localStorage.removeItem('treeFilterPara');
  }, []);
  const handleClickShowData = (id) => {
    setEyeChecked(eyeChecked === id ? null : id);
  };

  const handleToggle = (id) => {
    setExpandedRows((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  if (tableData) {
    tableData.particulars = [
      'Hierarchy',
      'Particulars',
      ...tableData?.particulars.filter(
        (item) => item !== 'Hierarchy' && item !== 'Particulars'
      ),
    ];
  }

  const updateDataWithExpanded = (data) => {
    if (!data) return [];
    return data.map((node) => ({
      ...node,
      id: crypto.randomUUID(),
      expanded: node.child?.length > 0,
      child: node.child ? updateDataWithExpanded(node.child) : [],
    }));
  };

  const removeHierarcyParticulars = (data, index) => {
    const filteredDates = data.filter(
      (item) => item !== 'Hierarchy' && item !== 'Particulars'
    );
    return filteredDates;
  };
  const findParentCategories = (newTableData, rowData, parents = []) => {
    if (!Array.isArray(newTableData)) {
      return null;
    }

    for (let item of newTableData) {
      if (item.id === rowData.id) {
        return [...parents, item.category];
      }
      if (item.child) {
        const result = findParentCategories(item.child, rowData, [
          ...parents,
          item.category,
        ]);
        if (result) {
          return result;
        }
      }
    }
    return null;
  };

  const [totalCount, setTotalCount] = useState(null);
  const [rilievingPayload, setRilievingPayload] = useState(null);
  const relievingDialog = (
    value,
    index,
    newTableData,
    rowData,
    particulars
  ) => {
    setTotalCount(value);
    let formattedHolidays = [];
    let particularData;

    switch (particulars) {
      case 'relievings':
        particularData = 'Reliver';
        break;
      case 'overlapping':
        particularData = 'Overlapping';
        break;
      default:
        particularData = '';
    }

    particulars = 'Reliever';

    const extractKeys = (arr) => arr.map((item) => item.date).slice(2);

    const result = extractKeys(tableData.particulars);
    if (dayDate === 'daily') {
      formattedHolidays = result;
    } else {
      formattedHolidays = tableData.particulars;
    }
    const filteredDates = removeHierarcyParticulars(formattedHolidays);

    const selectedDate = filteredDates[index];
    let [startDate, lastDate] = filteredDates[index].split(' - ');
    startDate = formatDate(startDate);
    lastDate = formatDate(lastDate);
    setSelectedDate(selectedDate);
    const parentCategories = findParentCategories(newTableData, rowData);

    setFilteredDates(filteredDates);

    const payload = {
      location: selectedLocation?.id,
      plant: parentCategories[1] || null,
      start_date: dayDate === 'daily' ? formatDate(selectedDate) : startDate,
      end_date: dayDate === 'daily' ? formatDate(selectedDate) : lastDate,
      shop: parentCategories[2] || null,
      type: parentCategories[3] || null,
      sub_category: parentCategories[4] || null,
      group_name: parentCategories[5] || null,
      line: parentCategories[6] || null,
      area: parentCategories[7] || null,
      typeBody: particularData,
    };
    setRilievingPayload(payload);
    RelivingOperator(payload);
    setOperatorName(particularData);
  };

  const filterTreeData = (data, treeFilterData) => {
    const reArrangeData = RearrangeData(data.tableData);
    return reArrangeData?.map((item) => {
      const filterInnerData = (item) => {
        if (treeFilterData?.selectedNodes?.includes(item?.category)) {
          const filteredInnerData = item?.innerData
            ?.filter((innerItem) => {
              return treeFilterData?.parameters?.includes(
                innerItem?.particulars
              );
            })
            .map((innerItem) => ({
              particulars: innerItem.particulars,
              values: innerItem.values,
              expanded: true,
            }));

          return {
            ...item,
            innerData: filteredInnerData,
            child: item?.child ? item?.child.map(filterInnerData) : undefined,
          };
        }

        if (item?.child) {
          return {
            ...item,
            child: item?.child.map(filterInnerData),
          };
        }

        return item;
      };

      return filterInnerData(item);
    });
  };
  // const filterTreeTotalData = filterTreeData(tableData, treeFilterData);
  const filterTreeTotalData = useMemo(
    () => updateDataWithExpanded(filterTreeData(tableData, treeFilterData)),
    [tableData, treeFilterData]
  );
  useEffect(() => {
    setEyeChecked(filterTreeTotalData[0]?.id);
  }, [tableData]);

  useEffect(() => {
    const updateTreeFilterData = () => {
      try {
        const storedData = JSON.parse(localStorage.getItem('treeFilterPara'));
        if (storedData) {
          setTreeFilterData(storedData);
          setExpandeFilter(storedData?.selectedNodes);
          setTreeFilterHierarchy(
            storedData?.selectedNodes[storedData?.selectedNodes.length - 1]
          );
        } else {
          setTreeFilterData(null);
          setTreeFilterHierarchy(null);
        }
      } catch (error) {
        console.error('Failed to parse treeFilterPara:', error);
        setTreeFilterData(null);
        setTreeFilterHierarchy(null);
      }
    };

    updateTreeFilterData();

    const handleStorageChange = (event) => {
      if (event.key === 'treeFilterPara' || event.type === 'treeFilterPara') {
        updateTreeFilterData();
      }
    };

    window.addEventListener('treeFilterPara', handleStorageChange);

    return () => {
      window.removeEventListener('treeFilterPara', handleStorageChange);
      localStorage.removeItem('treeFilterPara');
    };
  }, []);

  useEffect(() => {
    if (treeFilterHierarchy) {
      setExpandedRows({});
      const filterData = (data) => {
        return data.map((item) => {
          if (expandeFilter?.includes(item?.category)) {
            setExpandedRows((prevState) => ({
              ...prevState,
              [item.id]: !prevState[item.id],
            }));
            return {
              ...item,
              child: item.child ? filterData(item.child) : [],
            };
          }
          return item;
        });
      };

      filterData(filterTreeTotalData);
    }
  }, [expandeFilter, filterTreeTotalData, treeFilterHierarchy]);

  useEffect(() => {
    if (dayDate === 'weekly' || dayDate === 'monthly') {
      tableData.particulars = tableData.particulars.map((item) => {
        if (Array.isArray(item)) {
          return `${item[0]} - ${item[1]}`;
        }
        return item;
      });
    }
  }, [dayDate, tableData]);
  const treeData = (data, depth = 0) => {
    return (
      <>
        {data?.map((row, index) => {
          const isRowExpanded = expandedRows[row.id];

          return (
            <React.Fragment key={row.category || index}>
              <div
                className="row"
                role="button"
                tabIndex={0}
                id={row?.category}
              >
                {eyeChecked === row.id ||
                (treeFilterHierarchy === row.category
                  ? setEyeChecked(row.id)
                  : '') ? (
                  row?.innerData?.map((data, innerIndex) => {
                    if (
                      data.particulars === '+ attrition' &&
                      row.type !== 'shop'
                    )
                      return null;

                    return (
                      <div
                        style={{
                          display: 'contents',
                        }}
                        key={innerIndex}
                      >
                        <div
                          className="cell-manpower"
                          style={{
                            paddingLeft: `${(depth + 1) * 16}px`,
                            border:
                              row.category.length === 0
                                ? '1px solid #ccc'
                                : 'none',
                          }}
                        >
                          {innerIndex === 0 && (
                            <div className="cell-manpower-2">
                              <TableButton onClick={() => handleToggle(row.id)}>
                                {row.child &&
                                  row.child.length > 0 &&
                                  (isRowExpanded ? (
                                    <RemoveBox
                                      style={{
                                        fontSize: '14px',
                                      }}
                                    />
                                  ) : (
                                    <AddBox
                                      style={{
                                        fontSize: '14px',
                                      }}
                                    />
                                  ))}
                              </TableButton>
                              {row.category}
                              <TableButton
                                onClick={() => handleClickShowData(row.id)}
                              >
                                {eyeChecked === row.id ||
                                treeFilterHierarchy === row.category ? (
                                  <VisibilityOff
                                    style={{
                                      fontSize: '14px',
                                    }}
                                  />
                                ) : (
                                  <Visibility
                                    style={{
                                      fontSize: '14px',
                                    }}
                                  />
                                )}
                              </TableButton>
                            </div>
                          )}
                        </div>

                        <div
                          className="cell-manpower"
                          style={{
                            paddingLeft: [
                              '+ absenteeism',
                              'overlapping',
                              '+ attrition',
                            ].includes(data.particulars)
                              ? '20px'
                              : 'none',
                          }}
                        >
                          {data.particulars}
                        </div>

                        {data?.values?.map((val, idx) => {
                          const isGap = data?.particulars === 'gap';
                          const isRelieving =
                            (data?.particulars === 'relievings' ||
                              data?.particulars === 'overlapping') &&
                            val > 0;

                          const className = `cell-manpower cell-manpower-value ${
                            isGap && val < 0 ? 'red-value' : ''
                          } ${isGap && val > 0 ? 'green-value' : ''}`;
                          const displayValue =
                            val === null
                              ? 0
                              : isGap && val > 0
                              ? `+ ${val}`
                              : val;

                          return typeof val === 'number' || val === null ? (
                            <div
                              key={idx}
                              style={{
                                cursor: isRelieving ? 'pointer' : '',
                                color: isRelieving ? '#171C8F' : '',
                                fontWeight: isRelieving ? '900' : '',
                                justifyContent: 'end',
                              }}
                              className={className}
                              onClick={
                                isRelieving
                                  ? () =>
                                      relievingDialog(
                                        data?.values,
                                        idx,
                                        filterTreeTotalData,
                                        row,
                                        data?.particulars
                                      )
                                  : undefined
                              }
                            >
                              {displayValue}
                            </div>
                          ) : (
                            <div
                              className={className}
                              key={idx}
                              style={{
                                background: '#f5f5f5',
                                justifyContent: 'center',
                              }}
                            >
                              {displayValue}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })
                ) : (
                  <>
                    <div
                      className="cell-manpower"
                      style={{
                        paddingLeft: `${(depth + 1) * 16}px`,
                      }}
                    >
                      <TableButton onClick={() => handleToggle(row.id)}>
                        {row.child &&
                          row.child.length > 0 &&
                          (isRowExpanded ? (
                            <RemoveBox
                              style={{
                                fontSize: '14px',
                              }}
                            />
                          ) : (
                            <AddBox
                              style={{
                                fontSize: '14px',
                              }}
                            />
                          ))}
                      </TableButton>
                      {row.category}{' '}
                      <TableButton onClick={() => handleClickShowData(row.id)}>
                        {eyeChecked === row.id ? (
                          <VisibilityOff
                            style={{
                              fontSize: '14px',
                            }}
                          />
                        ) : (
                          <Visibility
                            style={{
                              fontSize: '14px',
                            }}
                          />
                        )}
                      </TableButton>
                    </div>
                    <div className="cell-manpower">{row.particular}</div>
                    {row.values?.map((value, idx) => {
                      return typeof value === 'number' || value === null ? (
                        <div
                          className={`cell-manpower cell-manpower-value ${
                            row.particular === 'gap' && value < 0
                              ? 'red-value'
                              : ''
                          } ${
                            row.particular === 'gap' && value > 0
                              ? 'green-value'
                              : ''
                          }`}
                          key={idx}
                          style={{
                            justifyContent: 'end',
                          }}
                        >
                          {value === null
                            ? 0
                            : value > 0
                            ? `+ ${value}`
                            : value}
                        </div>
                      ) : (
                        <div
                          className="cell-manpower cell-manpower-value"
                          key={idx}
                          style={{
                            background: '#f5f5f5',
                            justifyContent: 'center',
                          }}
                        >
                          {value}
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
              {isRowExpanded && row.child && treeData(row.child, depth + 1)}
            </React.Fragment>
          );
        })}
      </>
    );
  };

  return (
    <>
      <div
        className="table"
        style={{
          gridTemplateColumns: `repeat(${tableData?.particulars?.length}, 1fr)`,
        }}
      >
        <div className="row header">
          {tableData?.particulars?.map((date, index) => {
            const isHeader = date === 'Hierarchy' || date === 'Particulars';

            const style = {
              borderRight: isHeader ? '1px solid #ddd' : 'none',
              borderBottom: date === 'Hierarchy' ? '1px solid #ddd' : 'none',
              justifyContent: isHeader ? 'start' : 'end',
              background: isHeader
                ? 'inherit'
                : !date?.isHoliday
                ? 'none'
                : '#f5f5f5',
            };

            let formattedDate;
            if (typeof date === 'string') {
              formattedDate = date;
            } else if (date?.date) {
              formattedDate = moment(date.date).format(
                !date.isHoliday ? 'DD/MM/YYYY' : 'DD'
              );
            }

            return (
              <div className="cell-manpower" key={index} style={style}>
                {formattedDate || ''}
              </div>
            );
          })}
        </div>
        {filterTreeTotalData?.map((row, index) => {
          const isRowExpanded = expandedRows[row.id];

          return (
            <React.Fragment key={row.category || index}>
              <div className="row" role="button" tabIndex={0} id={row.category}>
                {eyeChecked === row.id ||
                (treeFilterHierarchy === row.category
                  ? setEyeChecked(row.id)
                  : '') ? (
                  row?.innerData.map(({ particulars, values }, innerIndex) => {
                    return (
                      <div className="row" key={innerIndex}>
                        <div className="cell-manpower-2">
                          {innerIndex === 0 && (
                            <>
                              <TableButton onClick={() => handleToggle(row.id)}>
                                {isRowExpanded ? (
                                  <RemoveBox
                                    style={{
                                      fontSize: '14px',
                                    }}
                                  />
                                ) : (
                                  <AddBox
                                    style={{
                                      fontSize: '14px',
                                    }}
                                  />
                                )}
                              </TableButton>
                              {row.category}
                              <TableButton
                                onClick={() => handleClickShowData(row.id)}
                              >
                                {eyeChecked === row.id ||
                                treeFilterHierarchy === row.category ? (
                                  <VisibilityOff
                                    style={{
                                      fontSize: '14px',
                                    }}
                                  />
                                ) : (
                                  <Visibility
                                    style={{
                                      fontSize: '14px',
                                    }}
                                  />
                                )}
                              </TableButton>
                            </>
                          )}
                        </div>

                        <div
                          className="cell-manpower"
                          style={{
                            paddingLeft: [
                              '+ absenteeism',
                              'overlapping',
                              '+ attrition',
                            ].includes(particulars)
                              ? '20px'
                              : 'none',
                          }}
                        >
                          {particulars}
                        </div>

                        {values?.map((val, idx) => {
                          const isGap = particulars === 'gap';
                          const isRelieving =
                            (particulars === 'relievings' ||
                              particulars === 'overlapping') &&
                            val > 0;

                          const className = `cell-manpower cell-manpower-value ${
                            isGap && val < 0 ? 'red-value' : ''
                          } ${isGap && val > 0 ? 'green-value' : ''}`;
                          const displayValue =
                            val === null
                              ? 0
                              : isGap && val > 0
                              ? `+ ${val}`
                              : val;

                          return displayValue !== '-' ||
                            displayValue === null ? (
                            <div
                              key={idx}
                              style={{
                                cursor: isRelieving ? 'pointer' : '',
                                color: isRelieving ? '#171C8F' : '',
                                fontWeight: isRelieving ? '900' : '',
                                justifyContent: 'end',
                              }}
                              className={className}
                              onClick={
                                isRelieving
                                  ? () =>
                                      relievingDialog(
                                        values,
                                        idx,
                                        filterTreeTotalData,
                                        row,
                                        particulars
                                      )
                                  : undefined
                              }
                            >
                              {displayValue}
                            </div>
                          ) : (
                            <div
                              className={className}
                              key={idx}
                              style={{
                                background: '#f5f5f5',
                                justifyContent: 'center',
                              }}
                            >
                              {displayValue}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })
                ) : (
                  <>
                    <div className="cell-manpower">
                      <TableButton onClick={() => handleToggle(row.id)}>
                        {isRowExpanded ? (
                          <RemoveBox
                            style={{
                              fontSize: '14px',
                            }}
                          />
                        ) : (
                          <AddBox
                            style={{
                              fontSize: '14px',
                            }}
                          />
                        )}
                      </TableButton>
                      {row.category}
                      <TableButton onClick={() => handleClickShowData(row.id)}>
                        {eyeChecked === row.id ? (
                          <VisibilityOff
                            style={{
                              fontSize: '14px',
                            }}
                          />
                        ) : (
                          <Visibility
                            style={{
                              fontSize: '14px',
                            }}
                          />
                        )}
                      </TableButton>
                    </div>
                    <div className="cell-manpower">
                      {row.particulars || row.particular}
                    </div>
                    {row.values.map((value, idx) => {
                      return typeof value === 'number' || value === null ? (
                        <div
                          className={`cell-manpower cell-value ${
                            (row.particulars === 'gap' ||
                              row.particular === 'gap') &&
                            value < 0
                              ? 'red-value'
                              : ''
                          } ${
                            (row.particulars === 'gap' ||
                              row.particular === 'gap') &&
                            value > 0
                              ? 'green-value'
                              : ''
                          }`}
                          key={idx}
                          style={{
                            justifyContent: 'end',
                          }}
                        >
                          {value === null
                            ? 0
                            : value > 0
                            ? `+ ${value}`
                            : value}
                        </div>
                      ) : (
                        <div
                          className="cell-manpower cell-value"
                          key={idx}
                          style={{
                            background: '#f5f5f5',
                            justifyContent: 'center',
                          }}
                        >
                          {value}
                        </div>
                      );
                    })}
                  </>
                )}
              </div>

              {isRowExpanded && row.child && treeData(row.child)}
            </React.Fragment>
          );
        })}
      </div>
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {openDialog && (
        <RelievingOperator
          open={openDialog}
          handleClose={() => setOpenDialog(false)}
          data={reliverData}
          date={filteredDates}
          selectedDate={selectedDate}
          dayDate={dayDate}
          totalCount={totalCount}
          rilievingPayload={rilievingPayload}
          operatorName={operatorName}
        />
      )}
    </>
  );
};
export default ManpowerTabular;
