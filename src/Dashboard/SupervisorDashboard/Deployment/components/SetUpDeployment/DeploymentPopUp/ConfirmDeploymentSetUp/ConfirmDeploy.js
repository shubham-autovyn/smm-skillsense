import { Box } from "@mui/material";
import SecondaryButton from "../../../../../../../../Utilities/Buttons/SecondaryButton/SecondaryButton";
import PrimaryButton from "../../../../../../../components/PrimaryButton/PrimaryButton";

import { BtnAll, BtnBox, Details } from "./ConfirmDeploy.style";

function ConfirmDeploy({ onCancel, applyDeployment }) {
  return (
    <Box className="main-box">
      <Box className="mid-notice">
        <Details variant="h5">
          Once saved, this deployment setting will take effect immediately and
          will be applied every day. Are you sure you want to proceed with this
          set up?
        </Details>
      </Box>
      <BtnBox className="buttonBox">
        <BtnAll>
          <Box>
            <SecondaryButton
              bgColor="none"
              padding="8px 20px"
              onClick={onCancel}
            >
              Cancel
            </SecondaryButton>
          </Box>
          <Box>
            <PrimaryButton onClick={applyDeployment}>
              Apply Setting
            </PrimaryButton>
          </Box>
        </BtnAll>
      </BtnBox>
    </Box>
  );
}

export default ConfirmDeploy;
