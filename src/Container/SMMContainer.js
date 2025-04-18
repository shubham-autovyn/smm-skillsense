import { ThemeProvider } from "@mui/material/styles";
import { Outlet } from "react-router-dom";
import { SMMTheme } from "../Theme/theme";

const SMMContainer = (props) => {
  return (
    <ThemeProvider theme={SMMTheme}>
      <Outlet />
    </ThemeProvider>
  );
};
export default SMMContainer;
