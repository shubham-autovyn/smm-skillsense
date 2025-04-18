import { Box } from "@mui/material";

import NavNextIcon from "../../assets/svg/NavigateNextIcon.svg";

import TransparentButton from "../../../Utilities/Buttons/TransparentButton/TransparentButton";
import FilterSelect from "../../components/FilterSelectInput/FilterSelectInput";
import { variables } from "../../styles/theme";
import { FilterBox, FilterItems } from "./CommonFilter.style";

const CommonFilter = ({ label, subLabel }) => {
  return (
    <FilterBox alignItems={"center"}>
      <Box
        sx={{
          color: variables.primaryColor,
          fontSize: "14px",
          fontWeight: 500,
        }}
      >
        {label}{" "}
        <span style={{ color: "#7A7C7E", margin: "0 5px" }}>
          <img src={NavNextIcon} alt="icon" />
        </span>{" "}
        <span style={{ color: "#7A7C7E" }}>{subLabel}</span>
      </Box>
      <FilterItems>
        <Box>
          <FilterSelect label="Site:" name="site" options={["MSIL"]} />
        </Box>
        <Box>
          <FilterSelect
            label="Location:"
            name="location"
            options={["Gurgaon Vehicle Plan"]}
          />
        </Box>
        <Box>
          <FilterSelect label="Plant:" name="plant" options={["PLT-GP1"]} />
        </Box>
        <Box>
          <FilterSelect label="Shop:" name="shop" options={["AS1"]} />
        </Box>
        <Box>
          <TransparentButton>More</TransparentButton>
        </Box>
      </FilterItems>
    </FilterBox>
  );
};

export default CommonFilter;
