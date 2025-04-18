import { Box } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { MarutiBlue500 } from "../../../Utilities/colors";

const SingleSelectRadio = ({ handleRadioSelect, options }) => {
  return (
    <RadioGroup
      aria-labelledby="demo-radio-buttons-group-label"
      defaultValue="female"
      name="radio-buttons-group"
      onChange={handleRadioSelect}
      sx={{
        "& .MuiTypography-root": {
          fontSize: "14px !important",
          lineHeight: "17px",
          color: "#343536 !important",
        },
      }}
    >
      {options?.map((item, index) => (
        <Box
          key={index}
          sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
        >
          <FormControlLabel
            value={index}
            control={
              <Radio
                size="medium"
                disableRipple={true}
                sx={{
                  color: "#CFD2D9",
                  "&.Mui-checked": {
                    color: MarutiBlue500,
                  },
                  "& .MuiSvgIcon-root": {
                    fontSize: 16,
                  },
                }}
              />
            }
            label={item?.text?.trim()}
          />
          {item?.images &&
            item?.images.map((url) => (
              <img
                style={{ height: "24px", width: "24px", margin: "8px" }}
                alt="img"
                src={url[Object.keys(url)[0]]}
              />
            ))}
        </Box>
      ))}
    </RadioGroup>
  );
};
export default SingleSelectRadio;
