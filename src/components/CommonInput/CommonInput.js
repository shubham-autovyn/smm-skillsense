import { Box } from "@mui/material";
import { get } from "react-hook-form";
import FlexBox from "../FlexBox";
import InputBox, { SelectDataBoxLabel } from "./common.styles";

const CommonInput = ({
  label,
  name,
  type,
  placeholder,
  className,
  width,
  endAdornment,
  ...props
}) => {
  const error = get(name);
  return (
    <Box style={{ width: width || "100%" }}>
      <SelectDataBoxLabel shrink htmlFor="bootstrap-input">
        {label}
      </SelectDataBoxLabel>
      <FlexBox direction="column" style={{ position: "relative" }}>
        <InputBox
          fullWidth
          type={type}
          error={!!error}
          {...props}
          InputProps={{ endAdornment }}
          placeholder={placeholder}
          sx={{
            "& .MuiInputBase-input": { fontSize: "10px", height: "23px" },
            borderRadius: "0.4rem",
            input: {
              fontWeight: "normal",
              padding: "0",
              fontFamily: "Roboto",
              // fontSize: "12px",
              lineHeight: "1.6rem",
              letterSpacing: "-2.5%",
              // height: "29px",
            },
            "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
              WebkitAppearance: "none",
              margin: 0,
            },
          }}
        />

        {error && <span style={{ color: "red" }}>{error.message}</span>}
      </FlexBox>
    </Box>
  );
};

export default CommonInput;
