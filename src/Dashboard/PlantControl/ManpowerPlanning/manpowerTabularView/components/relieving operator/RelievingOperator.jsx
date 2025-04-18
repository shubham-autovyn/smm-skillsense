import CloseIcon from "@mui/icons-material/Close";
import {
  Backdrop,
  Box,
  CircularProgress,
  DialogContent,
  IconButton,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import SecondaryButton from "../../../../../../../Utilities/Buttons/SecondaryButton/SecondaryButton";

import filter from "../../../../../../assets/icons/Filter.svg";
import sorting from "../../../../../../assets/icons/SortIcon.svg";
import DownloadIcon from "../../../../../../assets/svg/DawnloadIcon.svg";

import { useEffect, useState } from "react";
import Select from "../../../../../../components/Select/Select";
import { downloadExcelFile } from "../../../../../../utils/downloadExcel";
import useRelivingOperators from "../../../../hooks/relivingopertaors";
import {
  DateTabs,
  DialogBox,
  FilterBox,
  StyledDataGridReliver,
} from "./RelievingOperator.style";

const RelievingOperator = ({
  open,
  handleClose,
  data,
  date,
  selectedDate,
  totalCount,
  rilievingPayload,
}) => {
  const {
    data: relivingOperatorsData,
    fetchData,
    loading: graphLoader,
  } = useRelivingOperators();
  const [activeTab, setActiveTab] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const [isAscending, setIsAscending] = useState(true);
  const [tabs, setTabs] = useState([]);
  const [topFilterData, setTopfilterData] = useState(null);
  const [newRilievingPayload, setNewrilievingPayload] = useState(null);
  const [payload, setPayload] = useState({
    plant: "All",
    shop: "All",
    area: "All",
    group: "All",
    line: "All",
    type: "All",
  });

  const columns = [
    {
      field: "staff_id",
      headerName: "Staff ID",
      flex: 1.2,
      sortable: false,
      renderHeader: () => (
        <Box
          sx={{
            display: "flex",

            alignItems: "center",

            gap: "5px",

            cursor: "default",
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>Staff ID</Typography>

          <img src={filter} alt="filter icon" width={10} />

          <img
            src={sorting}
            alt="sort icon"
            width={10}
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleSortClick("staff_id");
            }}
          />
        </Box>
      ),
    },

    {
      field: "name",
      headerName: "Name",
      flex: 1.5,
      sortable: false,
      renderHeader: () => (
        <Box
          sx={{
            display: "flex",

            alignItems: "center",

            gap: "5px",

            cursor: "default",
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>Name</Typography>

          <img src={filter} alt="filter icon" width={10} />

          <img
            src={sorting}
            alt="sort icon"
            width={10}
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleSortClick("name");
            }}
          />
        </Box>
      ),
    },

    {
      field: "group_name",
      headerName: "Category",
      flex: 1.3,
      sortable: false,
      renderHeader: () => (
        <Box
          sx={{
            display: "flex",

            alignItems: "center",

            gap: "5px",

            cursor: "default",
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>Category</Typography>

          <img src={filter} alt="filter icon" width={10} />

          <img
            src={sorting}
            alt="sort icon"
            width={10}
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleSortClick("group_name");
            }}
          />
        </Box>
      ),
    },

    {
      field: "station_name",
      headerName: "Station",
      flex: 1.5,
      sortable: false,
      renderHeader: () => (
        <Box
          sx={{
            display: "flex",

            alignItems: "center",

            gap: "5px",

            cursor: "default",
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>Station</Typography>

          <img src={filter} alt="filter icon" width={10} />

          <img
            src={sorting}
            alt="sort icon"
            width={10}
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleSortClick("station_name");
            }}
          />
        </Box>
      ),
    },

    {
      field: "area_name",
      headerName: "Area",
      flex: 1.5,
      sortable: false,
      renderHeader: () => (
        <Box
          sx={{
            display: "flex",

            alignItems: "center",

            gap: "5px",

            cursor: "default",
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>Area</Typography>

          <img src={filter} alt="filter icon" width={10} />

          <img
            src={sorting}
            alt="sort icon"
            width={10}
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleSortClick("area_name");
            }}
          />
        </Box>
      ),
    },

    {
      field: "line_name",
      headerName: "Line",
      flex: 1,
      sortable: false,
      renderHeader: () => (
        <Box
          sx={{
            display: "flex",

            alignItems: "center",

            gap: "5px",

            cursor: "default",
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>Line</Typography>

          <img src={filter} alt="filter icon" width={10} />

          <img
            src={sorting}
            alt="sort icon"
            width={10}
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleSortClick("line_name");
            }}
          />
        </Box>
      ),
    },

    {
      field: "shop_name",
      headerName: "Shop",
      flex: 1,
      sortable: false,
      renderHeader: () => (
        <Box
          sx={{
            display: "flex",

            alignItems: "center",

            gap: "5px",

            cursor: "default",
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>Shop</Typography>

          <img src={filter} alt="filter icon" width={10} />

          <img
            src={sorting}
            alt="sort icon"
            width={10}
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleSortClick("shop_name");
            }}
          />
        </Box>
      ),
    },

    {
      field: "plant_name",
      headerName: "Plant",
      flex: 1,
      sortable: false,
      renderHeader: () => (
        <Box
          sx={{
            display: "flex",

            alignItems: "center",

            gap: "5px",

            cursor: "default",
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>Plant</Typography>

          <img src={filter} alt="filter icon" width={10} />

          <img
            src={sorting}
            alt="sort icon"
            width={10}
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleSortClick("plant_name");
            }}
          />
        </Box>
      ),
    },

    {
      field: "type",
      headerName: "Type",
      flex: 1,
      sortable: false,
      renderHeader: () => (
        <Box
          sx={{
            display: "flex",

            alignItems: "center",

            gap: "5px",

            cursor: "default",
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>Type</Typography>

          <img src={filter} alt="filter icon" width={10} />

          <img
            src={sorting}
            alt="sort icon"
            width={10}
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleSortClick("type");
            }}
          />
        </Box>
      ),
    },
  ];

  useEffect(() => {
    setFilteredData(data);
    setTopfilterData(filterData(data));
  }, [data]);

  useEffect(() => {
    if (rilievingPayload) {
      setNewrilievingPayload(rilievingPayload);
    }
  }, [rilievingPayload]);

  useEffect(() => {
    setTabs(
      date
        .map((item, idx) =>
          totalCount[idx] !== 0 ? { date: item, total: totalCount[idx] } : null
        )
        .filter(Boolean)
    );
  }, [date, totalCount]);

  useEffect(() => {
    const index = tabs.findIndex((item) => item.date === selectedDate);
    setActiveTab(index);
  }, [selectedDate, tabs]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    const date = tabs[newValue]?.date;
    setNewrilievingPayload((prev) => ({
      ...prev,
      end_date: date,
      start_date: date,
    }));
  };

  useEffect(() => {
    if (newRilievingPayload) {
      RelivingOperator(newRilievingPayload);
    }
  }, [newRilievingPayload, activeTab]);
  const RelivingOperator = async (payload) => {
    const response = await fetchData(payload);
    if (response?.data?.responseCode === 200) {
      setFilteredData(response?.data?.response);
      setTopfilterData(filterData(response?.data?.response));
    }
  };
  const filterData = (data) => {
    const result = {
      plant: ["All"],
      shop: ["All"],
      area_name: ["All"],
      group_name: ["All"],
      line_name: ["All"],
      station_name: ["All"],
      type: ["All"],
    };

    data.forEach((item) => {
      if (item.plant_name !== null && !result.plant.includes(item.plant_name))
        result.plant.push(item.plant_name);
      if (item.shop_name !== null && !result.shop.includes(item.shop_name))
        result.shop.push(item.shop_name);
      if (item.area_name !== null && !result.area_name.includes(item.area_name))
        result.area_name.push(item.area_name);
      if (
        item.group_name !== null &&
        !result.group_name.includes(item.group_name)
      )
        result.group_name.push(item.group_name);
      if (item.line_name !== null && !result.line_name.includes(item.line_name))
        result.line_name.push(item.line_name);
      if (
        item.station_name !== null &&
        !result.station_name.includes(item.station_name)
      )
        result.station_name.push(item.station_name);
      if (item.type !== null && !result.type.includes(item.type))
        result.type.push(item.type);
    });

    return result;
  };

  const handleChange = (key, newValue) => {
    const validKeys = ["plant", "shop", "area", "group", "line"];
    if (validKeys.includes(key)) {
      setPayload((prev) => ({
        ...prev,
        [key]: newValue,
      }));
    }
  };

  const handleApplyFilter = () => {
    setNewrilievingPayload((prev) => ({
      ...prev,
      area: payload?.area !== "All" ? payload?.area : null,
      line: payload?.line !== "All" ? payload?.line : null,
      shopid: payload?.shop !== "All" ? payload?.shop : null,
      group_name: payload?.group !== "All" ? payload?.group : null,
      plantid: payload?.plant !== "All" ? payload?.plant : null,
    }));
  };

  const handleSortClick = (type) => {
    const sortedData = [...filteredData].sort((a, b) => {
      const valueA = a[type];

      const valueB = b[type];

      if (typeof valueA === "string" && typeof valueB === "string") {
        // Handle alphabetic sorting

        return isAscending
          ? valueA.localeCompare(valueB) // Ascending
          : valueB.localeCompare(valueA); // Descending
      } else if (!isNaN(new Date(valueA)) && !isNaN(new Date(valueB))) {
        // Handle date sorting

        const dateA = new Date(valueA);

        const dateB = new Date(valueB);

        return isAscending ? dateA - dateB : dateB - dateA;
      } else if (typeof valueA === "number" && typeof valueB === "number") {
        // Handle numeric sorting

        return isAscending ? valueA - valueB : valueB - valueA;
      }

      return 0; // Default case for unhandled data types
    });

    setFilteredData(sortedData);

    setIsAscending(!isAscending); // Toggle sorting order
  };

  const handalDownload = () => {
    const headerMapping = {
      staff_id: "Staff Id",
      name: "Employee Name",
      level: "Level",
      station_name: "Station Name",
      area_name: "Area Name",
      line_name: "Line Number",
      group_name: "Group Name",
      shop_name: "Shop Name",
      plant_name: "Plant Name",
      type: "Type",
    };

    downloadExcelFile(data, headerMapping, "exal.xlsx");
  };

  return (
    <>
      <DialogBox open={open}>
        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={graphLoader}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Box
          sx={{ display: "flex", justifyContent: "space-between", mb: "10px" }}
        >
          <Typography variant="h4">Relieving Operators</Typography>
          <CloseIcon
            style={{ cursor: "pointer" }}
            aria-label="close"
            onClick={handleClose}
          />
        </Box>
        <DialogContent>
          <FilterBox>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography variant="h5">Filter: </Typography>
              </Box>
              <Box sx={{ maxWidth: "300px" }}>
                <Select
                  label="Location"
                  value={"Gurgaon Vehicle Plant"}
                  onChange={null}
                  options={["Gurgaon Vehicle Plant"]}
                ></Select>
              </Box>
              <Box sx={{ minWidth: "100px" }}>
                <Select
                  label="Plant"
                  value={payload?.plant}
                  options={topFilterData?.plant}
                  onChange={(event) =>
                    handleChange("plant", event.target.value)
                  }
                />
              </Box>
              <Box>
                <Select
                  label="Shop"
                  value={payload?.shop}
                  options={topFilterData?.shop}
                  onChange={(event) => handleChange("shop", event.target.value)}
                />{" "}
              </Box>
              <Box>
                <Select
                  label="Group"
                  value={payload?.group}
                  options={topFilterData?.group_name}
                  onChange={(event) =>
                    handleChange("group", event.target.value)
                  }
                />{" "}
              </Box>
              <Box>
                <Select
                  label="Line"
                  value={payload?.line}
                  options={topFilterData?.line_name}
                  onChange={(event) => handleChange("line", event.target.value)}
                />{" "}
              </Box>
              <Box>
                <Select
                  label="Area"
                  value={payload?.area}
                  options={topFilterData?.area_name}
                  onChange={(event) => handleChange("area", event.target.value)}
                />{" "}
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "10px",
              }}
            >
              <Box>
                <SecondaryButton onClick={handleApplyFilter}>
                  Apply
                </SecondaryButton>
              </Box>
            </Box>
          </FilterBox>

          <DateTabs>
            <Box
              sx={{
                flexGrow: 1,
              }}
            >
              <Tabs
                variant="scrollable"
                scrollButtons="auto"
                value={activeTab}
                onChange={handleTabChange}
              >
                {tabs?.map((tab, index) => (
                  <Tab
                    sx={{
                      marginRight: "5px",
                      padding: "20px 15px",
                      backgroundColor: "#f4f5f8",
                      borderRadius: "5px 5px 0 0",
                    }}
                    key={index}
                    label={
                      <Box
                        sx={{
                          cursor: "pointer",
                        }}
                      >
                        <Typography sx={{ fontSize: "10px" }}>
                          {tab.date}
                        </Typography>
                        <Typography sx={{ fontSize: "10px" }}>
                          Total: {tab.total}
                        </Typography>
                      </Box>
                    }
                  />
                ))}
              </Tabs>
            </Box>
          </DateTabs>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "15px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Box sx={{ borderRight: "1px solid", padding: "0 10px" }}>
                <Typography variant="h5">{tabs[activeTab]?.date} </Typography>
              </Box>
              <Box>
                <Typography variant="h5">
                  Total {tabs[activeTab]?.total} relieving
                </Typography>
              </Box>
            </Box>
            <IconButton
              color="primary"
              onClick={handalDownload}
              sx={{ marginLeft: "auto" }}
            >
              <img src={DownloadIcon} alt="icon" width={25} />
            </IconButton>
          </Box>

          <Box sx={{ width: "100%" }}>
            <StyledDataGridReliver
              columns={columns}
              disableColumnMenu
              disableAutosize
              disableColumnResize
              rows={filteredData || []}
              getRowId={(row) => row.staff_id}
              hideFooter
              rowHeight={35}
              columnHeaderHeight={40}
            />
          </Box>
        </DialogContent>
      </DialogBox>
    </>
  );
};

export default RelievingOperator;
