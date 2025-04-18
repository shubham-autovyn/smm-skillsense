import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { MarutiBlue500 } from "../../utils/colors";

const sizes = {
  SMALL: 15,
  MEDIUM: 40,
  small: 15,
};
const Loader = ({
  size = "MEDIUM",
  color = "Blue",
  loaderColor = MarutiBlue500,
  sx = {},
  type = undefined,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        alignItems: "center",
        alignSelf: "center",
        ...sx,
      }}
    >
      <CircularProgress
        sx={{ color: color === "white" ? "inherit" : loaderColor }}
        size={sizes[type || size]}
        color={color}
      />
    </Box>
  );
};
export default Loader;
