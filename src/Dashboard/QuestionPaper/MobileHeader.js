import { Box } from "@mui/material";
import MSLogo from "../../../../assets/icons/MSLogo.svg";
import ArrowLeft from "../../assets/svg/ArrowLeft.svg";
const MobileHeader = ({ showBackButton, handleBackButton }) => {
  // useEffect(()=>{
  //   storeBearerToken()
  // },[])
  return (
    <Box
      sx={{
        height: "50px",
        width: "100%",
        background: "#FFFFFF",
        display: "flex",
        flexDirection: "row",
        boxShadow:
          "0px 1.6px 3.6px 0px rgba(0, 0, 0, 0.13), 0px 0.3px 0.9px 0px rgba(0, 0, 0, 0.10)",
        position: "fixed",
        top: "0px",
        zIndex: "2100",
      }}
    >
      {showBackButton && (
        <div
          style={{
            width: "10%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={handleBackButton}
        >
          <img
            style={{
              height: "2.4rem",
              width: "2.4rem",
              marginLeft: "1rem",
              cursor: "pointer",
            }}
            alt="MSIL Logo"
            src={ArrowLeft}
          />
        </div>
      )}
      <div
        style={{
          width: showBackButton ? "90%" : "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          style={{
            height: "3rem",
            width: "22rem",
            marginRight: showBackButton ? "11%" : "0%",
          }}
          alt="MSIL Logo"
          src={MSLogo}
        />
      </div>
    </Box>
  );
};
export default MobileHeader;
