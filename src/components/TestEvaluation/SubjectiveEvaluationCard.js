import { Box, Typography } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { useState } from "react";
import { Green, StatusAlertSevere } from "../../../Utilities/colors";
import RadioUnselect from "../../assets/icons/RadioUnselect.svg";
const SubjectiveEvaluationCard = ({ count, data, handleEvaluation }) => {
  const [userInput, setUserInput] = useState(null);

  const handleRadioSelect = (evt, val) => {
    handleEvaluation(data, val);
  };
  return (
    <Box>
      <Box
        sx={{
          height: "fit-content !important",
          gap: "2rem !important",
          height: "100%",
          background: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
          padding: "2.8rem",
          borderRadius: "8px 8px 0px 0px;",
        }}
      >
        <Box sx={{ display: "flex", width: "100% !important", gap: "5px" }}>
          <Box>
            <Typography variant="testPrimary" sx={{ color: "#66696B" }}>
              Q{count + 1}.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-start",
              width: "100%",
            }}
          >
            <Typography variant="testPrimary" sx={{ fontWeight: 600 }}>
              {data.questionText?.text
                ? data.questionText?.text
                : data.questionText}
            </Typography>
            {data.questionText?.images &&
              data.questionText?.images.map((url) => (
                <img
                  style={{ height: "24px", width: "24px", margin: "8px" }}
                  alt="img"
                  src={url[Object.keys(url)[0]]}
                />
              ))}
          </Box>
        </Box>
        <Box sx={{ display: "flex", width: "100% !important", gap: "5px" }}>
          <Box>
            <Typography variant="testPrimary" sx={{ color: "#66696B" }}>
              Ans.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-start",
              width: "100%",
            }}
          >
            <Typography variant="testPrimary">{data?.userInput}</Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          height: "fit-content !important",
          gap: "2rem !important",
          height: "100%",
          background: "#E8E8F4",
          marginBottom: "2rem",
          display: "flex",
          alignItems: "center",
          gap: "3rem",
          paddingX: "2.8rem",
          paddingY: "0.8rem",
          borderRadius: "0px 0px 8px 8px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Typography
            variant="testPrimary"
            sx={{ fontWeight: 600, color: "#66696B" }}
          >
            Evaluate:
          </Typography>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            onChange={handleRadioSelect}
            sx={{
              "& .MuiTypography-root": {
                fontSize: "14px !important",
                lineHeight: "17px",
                color: "#66696B !important",
              },
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Box
                sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
              >
                <FormControlLabel
                  value={true}
                  control={
                    <Radio
                      icon={
                        <img
                          style={{
                            height: "17px",
                            width: "17px",
                          }}
                          alt="img"
                          src={RadioUnselect}
                        />
                      }
                      size="medium"
                      disableRipple={true}
                      sx={{
                        color: "#CFD2D9",

                        "&.Mui-checked": {
                          color: Green,
                        },
                        "& .MuiSvgIcon-root": {
                          fontSize: 18,
                        },
                      }}
                    />
                  }
                  label={"Correct"}
                />
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
              >
                <FormControlLabel
                  value={false}
                  control={
                    <Radio
                      icon={
                        <img
                          style={{
                            height: "17px",
                            width: "17px",
                          }}
                          alt="img"
                          src={RadioUnselect}
                        />
                      }
                      size="medium"
                      disableRipple={true}
                      sx={{
                        color: "#CFD2D9",

                        "&.Mui-checked": {
                          color: StatusAlertSevere,
                        },
                        "& .MuiSvgIcon-root": {
                          fontSize: 18,
                        },
                      }}
                    />
                  }
                  label={"Incorrect"}
                />
              </Box>
            </Box>
          </RadioGroup>
        </Box>
      </Box>
    </Box>
  );
};
export default SubjectiveEvaluationCard;
