import { Box } from "@mui/material";
import { Grey10} from "../../../src/utils/colors";

const ButtonAccordion = ({
  titleComponent
}) => {
  return (
      <Box
        sx={{
          p: "0.8rem",
          height: "15%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "sticky",
          top: 0,
          background: Grey10,
          border: "2px dashed #9EA1A7",
          borderRadius: "8px",
        }}
      >
        <Box >
          {titleComponent}
        </Box>
      </Box>
  );
};
export default ButtonAccordion;
