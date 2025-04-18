import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import SwapArrow from "../../../../../../../assets/svg/swap.svg";
import Time from "../../../../../../../assets/svg/time.svg";
import SecondaryButton from "../../../../../../../components/Button/SecondaryButtonWithIcon";
import PrimaryButton from "../../../../../../../components/PrimaryButton/PrimaryButton";
import getInitialName from "../../../../../../../utils/getInitailName";
import {
  ButtonGrp,
  CardName,
  OperatorId,
  OperatorName,
  TagTrainee,
} from "./swipeDialog.styles";

const SwipeDialog = ({
  openDialog,
  handleCloseDialog,
  section,
  selected,
  handleSwap,
}) => {
  const currentTime = new Date().toLocaleTimeString();

  return (
    <>
      <Dialog
        className="main-dialog"
        open={openDialog}
        onClose={handleCloseDialog}
        sx={{
          width: "35%",
          margin: "auto",
          maxWidth: "100%",
        }}
      >
        <DialogTitle
          sx={{ fontSize: "14px", fontWeight: "600", marginBottom: "20px" }}
        >
          Swap Operators
        </DialogTitle>
        <DialogContent>
          <div className="station-name">
            <p
              style={{
                fontSize: "10px",
                fontWeight: "600",
                backgroundColor: "#E6E9F0",
                padding: "3px 10px",
              }}
            >
              {section[0]?.stationName} {"|"} {section[0]?.stationDescription}{" "}
              Break Pipe Fitment
            </p>
          </div>
          <div
            style={{
              display: "flex",
              gap: "20px",
              paddingTop: "20px",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#7A7C7E",
                }}
              >
                Remove
              </h2>
              {selected[0] && (
                <Box
                  className="operator-card"
                  sx={{
                    display: "flex",
                    margin: "2px",
                    alignItems: "center",
                    gap: "5px",
                    padding: "5px 0px 8px 5px",
                    marginBottom: "13px",
                    borderRadius: "30px",
                    position: "relative",
                    backgroundColor: selected[0]?.absent
                      ? "#efd9cc"
                      : "#dff6dd",
                    // boxShadow:
                    //   "5px 5px 10px #e8e8e8, -5px -5px 10px #e8e8e8",
                    border: selected[0]?.absent
                      ? "1px solid #d83b01"
                      : "1px solid #30c030",
                    width: "135px",
                  }}
                >
                  {/* <CardImg
                        src={selected[0]?.image}
                        alt="operator"
                        className="operator-image"
                      /> */}
                  <CardName style={{ background: "#58a55c" }}>
                    {getInitialName(selected[1]?.staffName)}
                  </CardName>
                  <Box className="operator-details">
                    <OperatorName className="operator-name">
                      {selected[0]?.staffName}
                    </OperatorName>
                    <OperatorId className="operator-id">
                      {selected[0]?.staffId} | {selected[0]?.staffLevel}
                    </OperatorId>
                  </Box>
                  {selected[0]?.isTrainee && (
                    <TagTrainee className="tag trainee">Trainee</TagTrainee>
                  )}
                </Box>
              )}
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src={SwapArrow} alt={"Swap Arrow"} />
            </div>
            <div>
              <h2
                style={{
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#7A7C7E",
                }}
              >
                Place
              </h2>
              <Box
                className="operator-card"
                sx={{
                  display: "flex",
                  margin: "2px",
                  alignItems: "center",
                  gap: "5px",
                  padding: "5px 0px 8px 5px",
                  marginBottom: "13px",
                  borderRadius: "30px",
                  position: "relative",
                  backgroundColor: selected[1]?.absent ? "#efd9cc" : "#dff6dd",
                  // boxShadow: "5px 5px 10px #e8e8e8, -5px -5px 10px #e8e8e8",
                  border: selected[1]?.absent
                    ? "1px solid #d83b01"
                    : "1px solid #30c030",
                  width: "135px",
                }}
              >
                {/* <CardImg
                      src={selected[1]?.image}
                      alt="operator"
                      className="operator-image"
                    /> */}
                <CardName style={{ background: "#58a55c" }}>
                  {getInitialName(selected[1]?.staffName)}
                </CardName>
                <Box className="operator-details">
                  <OperatorName className="operator-name">
                    {selected[1]?.staffName}
                  </OperatorName>
                  <OperatorId className="operator-id">
                    {selected[1]?.staffId} | {selected[1]?.staffLevel}
                  </OperatorId>
                </Box>
                {selected[1]?.isTrainee && (
                  <TagTrainee className="tag trainee">Trainee</TagTrainee>
                )}
              </Box>
            </div>
          </div>
        </DialogContent>
        <div>
          <p
            style={{
              fontSize: "12px",
              fontWeight: "600",
              color: "#7A7C7E",
              marginBottom: "5px",
            }}
          >
            Time Of Deployment
          </p>
          <div
            style={{
              borderRadius: "2px",
              border: "1px solid #CFD2D9",
              width: "200px",
              padding: "4px 10px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <p
              style={{
                fontSize: "10px",
                fontWeight: "400",
                paddingLeft: "6px",
              }}
            >
              {currentTime}
            </p>
            <img src={Time} alt="" />
          </div>
        </div>
        <DialogActions sx={{ display: "flex", justifyContent: "end" }}>
          <ButtonGrp>
            <Box>
              <SecondaryButton onClick={handleCloseDialog}>
                Cancel
              </SecondaryButton>
            </Box>
            <Box>
              <PrimaryButton onClick={handleSwap}>Swap Operators</PrimaryButton>
            </Box>
          </ButtonGrp>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SwipeDialog;
