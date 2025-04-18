import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  InputAdornment,
  Menu,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SecondaryButton from "../../../Utilities/Buttons/SecondaryButton/SecondaryButton";
import { Grey5, MarutiBlue500 } from "../../../Utilities/colors";
import CheckItem from "./CheckItem";

const ColumnSelector = ({
  columns = {},
  selectedColumns = [],
  onChange = () => {},
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [search, setSearch] = useState("");
  const [domain, setDomain] = useState([]);
  const [filteredDomain, setFilteredDomain] = useState([]);

  useEffect(() => {
    setDomain(Object.values(columns));
    setFilteredDomain(Object.values(columns));
  }, [columns]);

  const handleSearchChange = (e) => {
    let value = e.target.value.toLowerCase();
    setSearch(value);
    value = value?.trim();
    let filter = domain;
    if (value !== "" && filter.length !== 0) {
      const filtered = filter?.filter((x) =>
        String(x?.name)?.toLowerCase().includes(value)
      );
      setFilteredDomain(filtered);
    } else {
      setFilteredDomain(filter);
    }
  };

  const handleIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <SecondaryButton onClick={handleIconClick}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" sx={{ color: MarutiBlue500 }}>
            {"Columns"}
          </Typography>
          <KeyboardArrowDownRoundedIcon />
        </Box>
      </SecondaryButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          style: {
            width: "fit-content",
            marginTop: "3.4rem",
          },
        }}
        sx={{
          "& .MuiMenuItem-root": {
            borderBottom: "none !important",
          },
        }}
      >
        <TextField
          id="input-with-icon-textfield"
          placeholder="Search"
          sx={{
            "& .MuiInputAdornment-root": {
              marginRight: 0,
              paddingLeft: "1rem",
            },
          }}
          value={search}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: Grey5 }} fontSize="large" />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
        <Box
          sx={{
            mt: 1,
            maxHeight: "40rem",
            overflowY: "auto",
            scrollbarWidth: "thin",
            scrollbarColor: "#c4c4c4 #f4f5f8",
            "&::-webkit-scrollbar": {
              width: " 1.2rem",
              height: " 1.2rem",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#c4c4c4",
              "&:hover": {
                backgroundColor: "#97999B !important",
              },
              borderRadius: "2rem",
              border: "0.4rem solid #ffffff",
            },
          }}
        >
          {filteredDomain?.map((item, index) => (
            <CheckItem
              key={index}
              item={item}
              onCheckChange={onChange}
              columns={selectedColumns}
            />
          ))}
        </Box>
      </Menu>
    </>
  );
};

export default ColumnSelector;
