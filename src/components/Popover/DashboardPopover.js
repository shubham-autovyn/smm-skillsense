import { Box, Divider, MenuItem, Popover, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Select from "../../utils/Select/Select";
import {
  getArea,
  getGroup,
  getLine,
  getSubCategory,
} from "../../redux/Reducers/SMMShopReducer";
const theme = createTheme({
  typography: {
    root: {
      fontFamily: "Roboto",
    },
    body1: {
      fontSize: "1.4rem",
      lineHeight: "1.6rem",
      letterSpacing: "-0.025em",
      fontWeight: "600",
      fontStyle: "normal",
      color: "#66696B",
    },
  },
  components: {
    MuiPopover: {
      styleOverrides: {
        paper: {
          "&.MuiPaper-root": {
            maxWidth: "500px",
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
              borderRadius: "8px",
              border: "0.4rem solid #ffffff",
            },
          },
          "&.MuiPopover-paper": {
            minWidth: "144px",
            minHeight: "210px",
            borderRadius: "8px",
          },
        },
      },
    },
  },
});
export default function CustomPopover({
  id,
  open,
  anchorEl,
  handleClose,
  onRoleSelect,
  currentRole,
  roleOptions,
}) {
  const [role, setRole] = useState(null);
  const [roleOption, setRoleOption] = useState(null);
  const subCategory = useSelector(getSubCategory);
  const group = useSelector(getGroup);
  const line = useSelector(getLine);
  const area = useSelector(getArea);

  useEffect(() => {
    setRole(currentRole);
    setRoleOption(roleOptions);
  }, [currentRole, roleOptions]);

  return (
    <ThemeProvider theme={theme}>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        disableRestoreFocus
      >
        <Box sx={{ padding: "1.6rem" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box>
              <Typography>More Filters</Typography>
            </Box>
            <Divider sx={{ margin: "0.8rem 0" }} />
            <Box sx={{ paddingTop: "0.6rem" }}>
              <Box sx={{ maxWidth: "162px", paddingBottom: "1.6rem" }}>
                <Select
                  label="Sub-category"
                  value={subCategory}
                  onChange={null}
                >
                  <MenuItem
                    style={{ display: "none" }}
                    key={"none"}
                    value={subCategory}
                  >
                    {subCategory}
                  </MenuItem>
                </Select>
              </Box>
              <Box sx={{ maxWidth: "162px", paddingBottom: "1.6rem" }}>
                <Select label="Group" value={group} onChange={null}>
                  <MenuItem
                    style={{ display: "none" }}
                    key={"none"}
                    value={group}
                  >
                    {group}
                  </MenuItem>
                </Select>
              </Box>
              <Box sx={{ maxWidth: "162px", paddingBottom: "1.6rem" }}>
                <Select label="Line" value={line} onChange={null}>
                  <MenuItem
                    style={{ display: "none" }}
                    key={"none"}
                    value={line}
                  >
                    {line}
                  </MenuItem>
                </Select>
              </Box>
              <Box sx={{ maxWidth: "162px", paddingBottom: "1.6rem" }}>
                <Select label="Area" value={area} onChange={null}>
                  <MenuItem
                    style={{ display: "none" }}
                    key={"none"}
                    value={area}
                  >
                    {area}
                  </MenuItem>
                </Select>
              </Box>
              <Box sx={{ maxWidth: "162px" }}>
                <Select
                  label="Role"
                  value={role}
                  onChange={(event) => {
                    setRole(event.target.value);
                    onRoleSelect(event.target.value);
                    handleClose();
                  }}
                >
                  {roleOption?.length > 0 ? (
                    roleOption &&
                    roleOption.map((role) => (
                      <MenuItem value={role}>{role}</MenuItem>
                    ))
                  ) : (
                    <MenuItem value={role}>{role}</MenuItem>
                  )}
                </Select>
              </Box>
            </Box>
          </Box>
        </Box>
      </Popover>
    </ThemeProvider>
  );
}
