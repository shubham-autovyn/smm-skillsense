import { Box, Paper, Radio, RadioGroup, FormControlLabel, Typography } from "@mui/material";
import Tick from "../../assets/icons/Tick.svg";
import crosss from "../../assets/icons/crosss.svg";
import GreyRadio from "../../assets/icons/GreyRadio.svg";
import GreenRadio from "../../assets/icons/GreenRadio.svg";
import RedRadio from "../../assets/icons/RedRadio.svg";

const GreyIcon = () => (<img style={{ height: "1.6rem", width: "1.6rem" }} src={GreyRadio} />);
const GreenIcon = () => (<img style={{ height: "1.6rem", width: "1.6rem" }} src={GreenRadio} />);
const RedIcon = () => (<img style={{ height: "1.6rem", width: "1.6rem" }} src={RedRadio} />);

const CrossIcon = () => {
    return (
        <img
            style={{ height: "1.6rem", width: "1.6rem" }}
            src={crosss}
        />
    );
};
const TickIcon = () => {
    return (
        <img
            style={{ height: "1.6rem", width: "1.3rem" }}
            src={Tick}
        />
    );
};

const QuestionCard = ({ questionNumber, question, options, selectedAnswer, correctAnswer, isCorrect }) => {

    return (
        <Box sx={{ marginBottom: "8px" }}>
            <Paper sx={{ display: "flex", padding: "0px 16px", flexDirection: "column", alignItems: "flex-start" }}>

                <Box sx={{ padding: "3rem", paddingLeft: "0.3rem", display: "flex",height: "32px", marginBottom: "1.6rem"}}>
                    <Typography variant="h6" sx={{ fontWeight: "400", display: 'flex', fontSize: "14px", gap: "0.7rem" }}>
                        {questionNumber}.<Typography variant="h6" sx={{ fontSize: '14px', fontFamily: "Roboto", fontWeight: "600" }}>
                            {question?.text.trim()}
                        </Typography>
                        {question?.images?.map((image, index) => <img
                            style={{ height: "2.4rem", width: "2.5rem", marginLeft: '16px' , marginTop: "-0.6rem"}}
                            src={image}
                        />)}

                    </Typography>

                </Box>
                {options.map((option, index) => (
                    <Box key={index} style={{ display: "flex", alignItems: "center", marginBottom: "14px" }}>
                        {isCorrect && selectedAnswer === index + 1 ? (
                            <GreenIcon />
                        ) : (!isCorrect && selectedAnswer === index + 1 ? (
                            <RedIcon />
                        ) : (
                            <GreyIcon />
                        ))}


                        <Box sx={{ marginLeft: "1.6rem", display: "flex", alignItems: "center" }}>
                            <Typography variant="body1" sx={{ fontFamily: 'Roboto', fontSize: '14px', fontWeight: '400' }}>
                                {option?.text.trim()}
                            </Typography>
                            {option?.images?.map((image, index) => <img
                                style={{ height: "2.4rem", width: "2.5rem", marginLeft: '16px' }}
                                src={image}
                            />)}
                            {isCorrect && selectedAnswer === index + 1 &&
                                <Box style={{ marginLeft: '1rem', display: "flex", alignItems: "center", color: "#58A55C" }}><TickIcon />
                                    <Typography variant="body1"
                                        sx={{ fontFamily: 'Roboto', fontSize: '14px', lineHeight: "1.6rem", fontWeight: '400', letterSpacing: "-0.35px", color: "#58A55C", marginLeft: "0.8rem" }}>
                                        Correct Answer!
                                    </Typography>
                                </Box>}
                            {!isCorrect && selectedAnswer === index + 1 &&
                                <Box style={{ marginLeft: '1rem', display: "flex", alignItems: "center" }}> <CrossIcon />
                                    <Typography variant="body1"
                                        sx={{ fontFamily: 'Roboto', fontSize: '14px', lineHeight: "1.6rem", fontWeight: '400', letterSpacing: "-0.35px", color: "#D83B01", marginLeft: "0.8rem" }}>
                                        Incorrect Answer!
                                    </Typography>
                                </Box>}
                            {!isCorrect && correctAnswer === index + 1 &&
                                <Box style={{ marginLeft: '1rem', display: "flex", alignItems: "center" }}><TickIcon />
                                    <Typography variant="body1"
                                        sx={{ fontFamily: 'Roboto', fontSize: '14px', lineHeight: "1.6rem", fontWeight: '400', letterSpacing: "-0.35px", color: "#58A55C", marginLeft: "0.8rem" }}>
                                        Correct Answer!
                                    </Typography>
                                </Box>}
                        </Box>
                    </Box>
                ))}
            </Paper>
        </Box>
    );
};
export default QuestionCard;




