import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Checkbox, Tab } from '@mui/material';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { default as React, useEffect, useState } from 'react';

import {
    CustomTreeItem,
    TreeFilterBoxBtn,
    TreeFilterBtn,
    TreeFilterButton,
    TreeFilterInput,
    TreeFilterInputBox,
    TreeFilterSearch,
} from './treeFilter.style';

import SearchIcon from '../../assets/svg/new-search-icon.svg';
import useManpowerPlanningFilter from '../../Dashboard/Dpm/hooks/manpowerPlanningFilter';
import LocationName from '../../utils/locationName';

const CustomAddBoxIcon = () => <AddBoxIcon sx={{ color: '#171C8F' }} />;
const CustomCollapseIcon = () => (
    <IndeterminateCheckBoxIcon sx={{ color: '#171C8F' }} />
);

const parametersLabel = [
    'basic requirement',
    '+ absenteeism',
    'total manpower req',
    'relievings',
    'joinings',
    'actual manpower',
    'gap',
];

export default function TreeFilter({ onClose, showParametersTab = false }) {
    const [value, setValue] = useState('1');
    const [checkedParameter, setCheckedParameter] = useState(
        parametersLabel.map(() => true)
    );
    const [checkedItem, setCheckedItem] = useState();
    const [treeData, setTreeData] = useState([]);

    const { dataManpowerFilter } = useManpowerPlanningFilter();

    const [searchValue, setSearchValue] = useState('');
    const [filteredTreeData, setFilteredTreeData] = useState([]);

    const [treeKey, setTreeKey] = useState(0);
    // Initialize checkedParameter from localStorage on mount
    useEffect(() => {
        const savedFilter = JSON.parse(
            window.localStorage.getItem('treeFilterPara')
        );
        if (savedFilter?.parameters) {
            const savedParameters = parametersLabel.map((label) =>
                savedFilter.parameters.includes(label)
            );
            setCheckedParameter(savedParameters);
        }
    }, []);

    const updateDataFilter = (data, idMap = new Map()) => {
        if (!Array.isArray(data)) return [];

        return data.map((node) => {
            const existingId = idMap.get(node) || crypto.randomUUID();
            idMap.set(node, existingId);
            return {
                ...node,
                id: existingId,
                expanded: node.children?.length > 0,
                checked: false,
                name:
                    node.category === 'location'
                        ? LocationName(node.name)
                        : node.name,
                children: node.children
                    ? updateDataFilter(node.children, idMap)
                    : [],
            };
        });
    };

    const mapSelectedToTreeData = (items, selectedArr, parentPath = []) => {
        return items.map((node) => {
            const nodeValue = node.name || node.area;
            const currentPath = [...parentPath, nodeValue];

            const isChecked = currentPath.every((value) =>
                selectedArr.includes(value)
            );

            return {
                ...node,
                checked: isChecked,
                children: node.children
                    ? mapSelectedToTreeData(
                          node.children,
                          selectedArr,
                          currentPath
                      )
                    : [],
            };
        });
    };
    useEffect(() => {
        const savedFilter = JSON.parse(
            window.localStorage.getItem('treeFilterPara')
        );
        const selectedNodes = savedFilter?.selectedNodes || [];

        const processedTreeData = updateDataFilter(dataManpowerFilter);

        const updatedTree = mapSelectedToTreeData(
            processedTreeData,
            selectedNodes
        );

        setFilteredTreeData(updatedTree);
        setTreeData(processedTreeData);
    }, [dataManpowerFilter]);

    const result = parametersLabel.filter(
        (_, index) => checkedParameter[index]
    );

    const handleChange = (_, newValue) => {
        setValue(newValue);
    };

    const handleSearchChange = (event) => {
        const inputValue = event.target.value;
        const lowerValue = inputValue.toLowerCase();
        const upperValue = inputValue.toUpperCase();

        setSearchValue(inputValue);

        const filterTreeData = (items) => {
            return items
                .map((item) => {
                    const match =
                        item.name?.toLowerCase().includes(lowerValue) ||
                        item.area?.toLowerCase().includes(lowerValue) ||
                        item.name?.toUpperCase().includes(upperValue) ||
                        item.area?.toUpperCase().includes(upperValue);

                    const filteredChildren = filterTreeData(
                        item.children || []
                    );

                    if (match || filteredChildren.length > 0) {
                        return {
                            ...item,
                            children: filteredChildren,
                            expanded: false,
                        };
                    }
                    return null;
                })
                .filter(Boolean);
        };

        const updatedData = filterTreeData(treeData);

        setFilteredTreeData(updatedData);
    };

    const handleCheckboxChange = (id, checkedItem) => {
        const updateTreeData = (items) => {
            return items.map((node) => {
                if (node.id === id) {
                    return { ...node, checked: !node.checked };
                }

                if (node.children) {
                    const children = updateTreeData(
                        node.children,
                        node.id === id
                    );
                    const hasCheckedChildren = children.some(
                        (child) => child.checked
                    );
                    return {
                        ...node,
                        children,
                        checked: node.checked || hasCheckedChildren,
                    };
                }

                return {
                    ...node,
                    checked: node.checked,
                };
            });
        };

        const updatedData = updateTreeData(treeData);
        const checkedId = (item) => {
            if (filteredTreeData[0].checked === true) {
                return item.map((node) => {
                    if (
                        node.id === id &&
                        node.checked === true &&
                        checkedItem === true
                    ) {
                        return { ...node, checked: !node.checked };
                    }

                    if (node.children) {
                        const children = checkedId(
                            node.children,
                            node.id === id
                        );
                        return {
                            ...node,
                            children,
                        };
                    }

                    return {
                        ...node,
                        checked: node.checked,
                    };
                });
            }
        };

        const data = checkedId(updatedData);

        setFilteredTreeData(data || updatedData);

        setCheckedItem(id);
    };

    const handleParameterCheckbox = (index) => {
        setCheckedParameter((prev) =>
            prev.map((checked, i) => (i === index ? !checked : checked))
        );
    };

    const ApplyFilter = () => {
        const getCheckedValues = (nodes) => {
            let result = new Set();

            const traverse = (node) => {
                if (node.checked) {
                    result.add(node.name || node.area);
                }
                if (node.children && node.children.length > 0) {
                    node.children.forEach((child) => traverse(child));
                }
            };

            nodes.forEach((node) => traverse(node));

            return Array.from(result);
        };

        const checkedValues = getCheckedValues(filteredTreeData);
        const shopIdData = dataManpowerFilter[0]?.children
            ?.find((item) => item.name === checkedValues[1])
            ?.children.find((item) => item.name === checkedValues[2])?.shopId;
        const plantIdData = dataManpowerFilter[0]?.children?.find(
            (item) => item.name === checkedValues[1]
        )?.plantId;

        const filterData = {
            parameters: result,
            selectedNodes: checkedValues,
            shopId: shopIdData || '',
            plantId: plantIdData || '',
        };

        localStorage.setItem('treeFilterPara', JSON.stringify(filterData));
        window.dispatchEvent(new Event('treeFilterPara'));
        onClose();
    };

    const collapseAllNodes = () => {
        setTreeKey((prevKey) => prevKey + 1);
    };

    const renderTreeItem = (item) => (
        <div style={{}}>
            <CustomTreeItem
                key={item.id}
                itemId={item.id}
                label={
                    <>
                        {item.name || item.area}
                        <Checkbox
                            size="large"
                            checked={item.checked}
                            onClick={() =>
                                handleCheckboxChange(item.id, item.checked)
                            }
                            sx={{
                                padding: '4px 8px',
                                color: '#66696B',
                                '&.Mui-checked': {
                                    color: '#171C8F',
                                },
                            }}
                        />
                    </>
                }
            >
                {item.children?.map((child) => renderTreeItem(child))}
            </CustomTreeItem>
        </div>
    );

    return (
        <Box
            sx={{
                width: '300px',
                typography: 'body1',
                position: 'fixed',
                right: 80,
                backgroundColor: '#fff',
                borderRadius: '8px',
                border: '1px solid #cfd2d9',
                padding: '10px',
                minHeight: '25%',
                maxHeight: '50%',
                overflow: 'auto',
            }}
        >
            <TabContext value={value}>
                {!showParametersTab ? (
                    <p
                        style={{
                            fontFamily: 'Roboto',
                            fontSize: '12px',
                            fontWeight: '600',
                            lineHeight: '16px',
                            letterSpacing: '-0.025em',
                        }}
                    >
                        Select one node or up to two nodes at the same level
                    </p>
                ) : (
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList
                            onChange={handleChange}
                            aria-label="Tree Filter Tabs"
                        >
                            <Tab label="Data" value="1" />
                            {showParametersTab && (
                                <Tab label="Parameters" value="2" />
                            )}
                        </TabList>
                    </Box>
                )}
                <TabPanel value="1">
                    <SimpleTreeView
                        key={treeKey}
                        defaultExpandedItems={[]}
                        slots={{
                            expandIcon: CustomAddBoxIcon,
                            collapseIcon: CustomCollapseIcon,
                        }}
                    >
                        <TreeFilterSearch>
                            <TreeFilterInputBox>
                                <TreeFilterInput
                                    type="text"
                                    placeholder="Search"
                                    value={searchValue}
                                    onChange={handleSearchChange}
                                />
                                <img src={SearchIcon} alt="search-icon" />
                            </TreeFilterInputBox>
                            <TreeFilterButton onClick={collapseAllNodes}>
                                Collapse All
                            </TreeFilterButton>
                        </TreeFilterSearch>
                        {filteredTreeData.map((node) => renderTreeItem(node))}
                        <TreeFilterBoxBtn>
                            <TreeFilterBtn
                                onClick={onClose}
                                bgcolor="#fff"
                                textcolor="#171C8F"
                            >
                                Cancel
                            </TreeFilterBtn>
                            <TreeFilterBtn
                                onClick={ApplyFilter}
                                bgcolor="#171C8F"
                                textcolor="#fff"
                            >
                                Apply
                            </TreeFilterBtn>
                        </TreeFilterBoxBtn>
                    </SimpleTreeView>
                </TabPanel>
                {showParametersTab && (
                    <TabPanel style={{ textTransform: 'capitalize' }} value="2">
                        {parametersLabel.map((value, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: 'flex',
                                    gap: '10px',
                                    alignItems: 'center',
                                }}
                            >
                                <Checkbox
                                    size="large"
                                    checked={checkedParameter[index]}
                                    onChange={() =>
                                        handleParameterCheckbox(index)
                                    }
                                    sx={{
                                        padding: '4px 8px',
                                        color: '#66696B',
                                        '&.Mui-checked': {
                                            color: '#171C8F',
                                        },
                                    }}
                                />
                                <p style={{ margin: 0 }}>{value}</p>
                            </Box>
                        ))}
                        <TreeFilterBoxBtn>
                            <TreeFilterBtn
                                onClick={onClose}
                                bgcolor="#fff"
                                textcolor="#171C8F"
                            >
                                Cancel
                            </TreeFilterBtn>
                            <TreeFilterBtn
                                onClick={ApplyFilter}
                                bgcolor="#171C8F"
                                textcolor="#fff"
                            >
                                Apply
                            </TreeFilterBtn>
                        </TreeFilterBoxBtn>
                    </TabPanel>
                )}
            </TabContext>
        </Box>
    );
}
