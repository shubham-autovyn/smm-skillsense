const { Box } = require("@mui/material");
const styled = require("styled-components").default;

const FilterItem = styled(Box)({
  display: "flex",
  //   justifyContent: 'space-around',
  gap: "20px",
  width: "100%",
  margin: "10px 0",
  padding: "10px",
});

const FilterButton = styled(Box)({
  display: "flex",
  gap: "20px",
  justifyContent: "flex-end",
  margin: "10px 0",
  padding: "10px",
});

module.exports = {
  FilterItem,
  FilterButton,
};
