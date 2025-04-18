import { InputLabel } from "@mui/material";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { variables } from "../../styles/theme";
const InputBox = styled(TextField)({
  display: "inline-block",
  "& .MuiFormLabel-root": {
    color: "#788497",
    fontSize: "1rem",
    fontWeight: "500",
  },
  "& .MuiInputBase-input": {
    fontSize: "1rem",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: "5px",
  },
  "& .MuiFormLabel-root.Mui-focused": {
    color: variables.primaryColor,
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: variables.primaryColor,
  },
  "& .MuiOutlinedInput-root": {
    height: "27 !important",
  },
  "& .MuiInputLabel-root": {
    transform: "translate(14px, 10px) scale(1)",
  },
  "& .MuiInputLabel-root.Mui-focused, & .MuiInputLabel-root.MuiInputLabel-shrink":
    {
      transform: "translate(14px, -9px) scale(0.75)",
    },
});
export const SelectDataBoxLabel = styled(InputLabel)({
  color: variables.color,
});

export default InputBox;
