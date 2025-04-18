/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from "@mui/material";
import TertiaryButton from "../utils/Buttons/TertiaryButton/TertiaryButton";
import PrimaryButton from "../components/PrimaryButton/PrimaryButton";

const Footer = ({
  handleNext,
  handleCancel,
  cancelLabel,
  nextLabel,
  prevLabel,
  handlePrev,
  saveLabel,
  currentStep,
  nextDisabled = false,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        alignSelf: "flex-end",
      }}
    >
      <Box>
        <TertiaryButton type="button" onClick={handleCancel}>
          {cancelLabel}
        </TertiaryButton>
      </Box>
      <Box>
        {currentStep !== 2 && (
          <PrimaryButton
            type="button"
            onClick={handleNext}
            disabled={nextDisabled}
          >
            {nextLabel}
          </PrimaryButton>
        )}
      </Box>

      {currentStep === 2 && (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "16px",
            }}
          >
            <Box>
              {/* <SecondaryButton type="button" onClick={handlePrev}>
                {prevLabel}
              </SecondaryButton> */}
            </Box>
            {/* <Box>
              <PrimaryButton
                type="button"
                disabled={nextDisabled}
                onClick={handleNext}
              >
                {saveLabel}
              </PrimaryButton>
            </Box> */}
          </Box>
        </>
      )}
    </Box>
  );
};
export default Footer;
