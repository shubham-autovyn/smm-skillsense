import { Checkbox, MenuItem, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { TypePrimary } from "../../../src/utils/colors";
import CheckEmpty from "../../assets/icons/CheckEmpty.svg";
import CheckFill from "../../assets/icons/CheckFill.svg";

const CheckItem = ({ item = {}, onCheckChange = () => {}, columns = [] }) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (columns) {
      setChecked(columns.includes(item.value));
    }
  }, [columns]);

  const handleChange = (bool) => {
    setChecked(bool);
    onCheckChange(item.value);
  };
  return (
    <MenuItem
      sx={{ paddingLeft: 0, height: "32px" }}
      disabled={item.isMandatory}
      onClick={() => {
        handleChange(!checked);
      }}
    >
      <Checkbox
        size="medium"
        disableRipple={true}
        checked={checked}
        sx={{
          "& .MuiSvgIcon-root": {
            fontSize: 14,
          },
        }}
        icon={
          <img
            alt="unchecked"
            src={CheckEmpty}
            style={{
              cursor: "pointer",
              height: "2rem",
              width: "2rem",
            }}
          />
        }
        checkedIcon={
          <img
            alt="checked"
            src={CheckFill}
            style={{
              cursor: "pointer",
              height: "2rem",
              width: "2rem",
            }}
          />
        }
      />
      <Typography variant="h5" sx={{ fontWeight: 400, color: TypePrimary }}>
        {item.name}
      </Typography>
    </MenuItem>
  );
};

export default CheckItem;
