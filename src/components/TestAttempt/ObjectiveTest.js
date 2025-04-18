import { Box, Paper, Typography } from "@mui/material";
import SingleSelectRadio from "../../components/Select/SingleSelectRadio";
const ObjectiveTest = ({ count, data, handleSelect }) => {

    const handleRadioSelect = (evt, val) => {
        handleSelect(data, val);
    };

    return (
        <Box sx={{ marginBottom: "8px" }}>
            <Paper sx={{ display: "flex", padding: "0px 16px", flexDirection: "column", alignItems: "flex-start" }}>
                <Box sx={{ padding: "3rem", paddingLeft: "0.3rem", paddingBottom: "1.6rem", display: "flex" }}>
                    <Typography variant="h6" sx={{ fontWeight: "400", display: 'flex', fontSize: "14px", gap: "0.7rem" }}>
                        Q{count + 1}.<Typography variant="h6" sx={{ fontSize: '14px', fontFamily: "Roboto", fontWeight: "600" }}>
                            {data.question?.text ? data.question?.text : data.question}
                        </Typography>
                        {data.question?.images &&
                            data.question?.images.map((url) => (
                                <img
                                    style={{ height: "24px", width: "24px", marginLeft: "5px" }}
                                    alt="img"
                                    src={url[Object.keys(url)[0]]}
                                />
                            ))}
                    </Typography>
                </Box>
                <Box sx={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    gap: "1rem",
                }}>
                    <SingleSelectRadio
                        handleRadioSelect={handleRadioSelect}
                        options={data?.options}
                    />
                </Box>

            </Paper>
        </Box>
    );
};

export default ObjectiveTest;


