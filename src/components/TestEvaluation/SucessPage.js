import { Box, Typography, TextField } from "@mui/material";
import Done from "../../assets/icons/Done.svg";
import { TypePrimary } from "../../../Utilities/colors";
const SucessPage = ({message}) => {

  return (
    <Box sx={{
      height: "95%",
      background: "white",
      margin: "2rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "3rem",
      padding: "2.8rem",
      borderRadius: "8px",
     }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
          pt: "10rem",
        }}
      >
        <img
          style={{ height: "15rem", width: "14rem" }}
          alt="MSIL Logo"
          src={Done}
        />
        <Typography  sx={{fontSize:"16px",color:TypePrimary,fontWeight:600, textAlign: "center" }}>
          Thank you!
        </Typography>
      </Box>
      <Box
        sx={{
          width: "70%",
          display: "flex",
          flexDirection: "column",
          justifyContent:"center",
          textAlign:"center",
          alignItems:"center",
          gap:"10px"
        }}
      >
        <Typography variant="testPrimary" sx={{color:"#66696B !important"}}>
          {"Your submission has been recorded successfully!"}
        </Typography>
        <Typography variant="testPrimary" sx={{color:"#66696B !important"}}>
          {"You can proceed with evaluating other attendees from the Deliver & Evaluate screen."}
        </Typography>
      </Box>
    </Box>
  );
};
export default SucessPage;
