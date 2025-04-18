import { Box, Paper, TextField, Typography } from "@mui/material";
import { useState , useEffect} from "react";

const SubjectiveTest = ({ count, data, handleSelect, handleRemove }) => {
    const [userInput, setUserInput] = useState(null);
    const handleTextChange = (evt) => {
        setUserInput(evt.target.value);
    };
    useEffect(() => {
        const timer = setTimeout(() => {
            if (userInput.trim() !== "" && userInput !== null) {
                handleSelect(data, userInput.trim());
            }
            if (userInput.trim() === "") {
                handleRemove(data);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [userInput]);
    return (
        <Box sx={{ marginTop: "16px", marginBottom: "16px" }}>
            <Paper sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <Box sx={{ padding: "16px", width: "100%" }}>

                    <Box sx={{ marginBottom: "12px" }}>
                        <Typography sx={{ fontWeight: "400", display: 'flex', fontSize: "14px", gap: "2rem" }}>
                            Q{count + 1}.
                            <Typography sx={{ fontSize: '14px', fontFamily: "Roboto", fontWeight: "600" }}>
                                {data.question?.text ? data.question?.text : data.question}
                            </Typography>
                            {data.question?.images &&
                                data.question?.images.map((url) => (
                                    <img
                                        style={{ height: "24px", width: "24px", margin: "8px" }}
                                        alt="img"
                                        src={url[Object.keys(url)[0]]}
                                    />
                                ))}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: "1rem" }}>
                        <Typography sx={{ fontWeight: "400", fontSize: "13px" }}>
                            Ans.
                        </Typography>
                        <TextField
                            value={userInput}
                            multiline
                            maxRows={10}
                            fullWidth
                            focused={false}
                            onChange={handleTextChange}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    padding: "8px 12px !important",
                                },
                                "& .MuiOutlinedInput-input": {
                                    paddingTop: "2px !important",
                                    fontSize: "14px !important",
                                    color: "#343536 !important",
                                },
                            }}
                            placeholder="Enter number of seconds"
                        />
                    </Box>
                </Box>
            </Paper >
        </Box >
    );
};
export default SubjectiveTest;