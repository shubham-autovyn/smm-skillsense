import { Box, Step, StepLabel, Stepper, Typography } from "@mui/material";
import {
  MarutiWhite,
  TypeSecondary,
  TypeTertiary,
} from "../../utils/colors";
import Done from "../../assets/icons/Done.svg";
import StepperEnd from "../../assets/icons/StepperEnd.svg";
import StepperEndActive from "../../assets/icons/StepperEndActive.svg";
import StepperEndDisabled from "../../assets/icons/StepperEndDisabled.svg";
import StepperMid from "../../assets/icons/StepperMid.svg";
import StepperMidActive from "../../assets/icons/StepperMidActive.svg";
import StepperStart from "../../assets/icons/StepperStart.svg";
import StepperStartActive from "../../assets/icons/StepperStartActive.svg";

const CustomStepper = ({ steps, activeStep, disableLastStep = false }) => {
  const getIcons = (index, totalSteps, lastDisabled) => {
    if (index === 1) {
      return StepperStart;
    } else if (index === totalSteps) {
      return lastDisabled ? StepperEndDisabled : StepperEnd;
    } else {
      return StepperMid;
    }
  };
  const getIconsActive = (index, totalSteps) => {
    if (index === 1) {
      return StepperStartActive;
    } else if (index === totalSteps) {
      return StepperEndActive;
    } else {
      return StepperMidActive;
    }
  };
  const StepIconLabel = (props) => {
    return (
      <Box sx={{ display: "flex", mr: -1 }}>
        <Box
          sx={{
            backgroundImage: `url(${
              props.active
                ? getIconsActive(props.icon, props?.totalSteps)
                : getIcons(props.icon, props?.totalSteps, disableLastStep)
            })`,
            width: props.icon === 1 ? "228px" : "225px",
            height: "60px",
            backgroundRepeat: "no-repeat",
            display: "flex",
            alignItems: "center",
          }}
        >
          {props?.subtitle === "Completed" && (
            <Box sx={{ paddingLeft: "20px" }}>
              <img
                style={{ height: "2.5rem", width: "2.5rem" }}
                alt="MSIL Logo"
                src={Done}
              />
            </Box>
          )}
          <Box
            sx={{
              pl: 3,
              flexDirection: "column",
              width: "auto",
              color: props.active
                ? MarutiWhite
                : disableLastStep && props.icon === props.totalSteps
                ? TypeTertiary
                : TypeSecondary,
            }}
          >
            <Typography
              sx={{
                fontWeight:
                  disableLastStep && props.icon === props.totalSteps
                    ? "normal"
                    : 600,
                mb: "0.5rem",
              }}
            >
              {props?.title}
            </Typography>
            <Typography>{props?.subtitle}</Typography>
          </Box>
        </Box>
      </Box>
    );
  };
  return (
    <Box>
      <Stepper activeStep={activeStep} connector={null}>
        {steps.map((item, index) => (
          <Step sx={{ p: 0 }} key={index}>
            <StepLabel
              StepIconProps={{
                title: item.title,
                subtitle: item.subtitle,
                totalSteps: steps.length,
              }}
              StepIconComponent={StepIconLabel}
            />
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};
export default CustomStepper;
