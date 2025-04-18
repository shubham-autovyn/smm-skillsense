import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory";
import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import {} from "./TestPaperResult.scss";

import FilterSelectInput from "../../../components/FilterSelectInput/FilterSelectInput";
import FlexBox from "../../../components/FlexBox";
import close from "./../../../assets/icons/crosss.svg";
import download from "./../../../assets/svg/download.svg";
import check from "./../../../assets/svg/fi-rr-check.svg";
import {
  Btn,
  EmpData,
  EmpDetails,
  EmpField,
  EmpTextField,
  FilterItem,
  FlexAlign,
  FlexBetweenBox,
  FooterNumBox,
  HeadInput,
  Para,
  ParaDetail,
  Plant2Tab,
  Plant2Tabs,
  Question,
  TriamAreaBox,
  TriamDetails,
  TriamHead,
} from "./TestPaperResult.style";

const TestPaperResult = () => {
  const [value, setValue] = useState("1");
  const handleChangebtn = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box>
      <div
        style={{ backgroundColor: "#F4F5F8", padding: "20px 40px 20px 40px" }}
      >
        <TriamAreaBox>
          <TriamHead>
            <Box>
              <Typography variant="h2">
                AS1 - L3 - L4 General Test Paper (Trim Area)
              </Typography>
            </Box>
            <HeadInput>
              <FilterItem>
                <FilterSelectInput
                  label="Site:"
                  name="site"
                  options={["Attempt: 2"]}
                />
              </FilterItem>
              <Btn>
                <img src={download} alt="download" />
              </Btn>
              {/* <div style={{ display: 'flex', gap: '10px' }}></div> */}
            </HeadInput>
          </TriamHead>
          <Box>
            <Typography
              style={{
                letterSpacing: "-0.025em",
                color: "#66696B",
                lineHeight: "16px",
                margin: "0px 0px 15px 0px",
              }}
              variant="h3"
            >
              प्रत्येक प्रश्न 5 अंक का है |
            </Typography>
          </Box>
          <TriamDetails>
            <Box
              style={{ display: "flex", gap: "15px", flexDirection: "column" }}
            >
              <EmpDetails>
                <EmpField>
                  <EmpTextField
                    style={{
                      fontWeight: "600",
                      lineHeight: "16px",
                      letterSpacing: "-0.025em",
                      color: "#66696B",
                    }}
                  >
                    Attendee:
                  </EmpTextField>
                </EmpField>
                <EmpData sx={{ width: "60%" }}>
                  <span>Ravi Gupta |</span>
                  <span>546282 |</span>
                  <span>A0</span>
                </EmpData>
              </EmpDetails>

              <EmpDetails>
                <EmpField sx={{ width: "40%" }}>
                  <EmpTextField>Work Area:</EmpTextField>
                </EmpField>
                <EmpData>
                  <span>Online ;</span>Group A;<span></span>
                  <span>Line 1;</span>
                  <span>Line-1;</span>
                  <span>A0</span>
                </EmpData>
              </EmpDetails>

              <EmpDetails>
                <EmpField>
                  <EmpTextField>Trainer:</EmpTextField>
                </EmpField>
                <EmpData>
                  <span>Ryan Saris</span>
                </EmpData>
              </EmpDetails>
            </Box>
            <Box
              style={{ display: "flex", gap: "15px", flexDirection: "column" }}
            >
              <EmpDetails>
                <EmpField>
                  <EmpTextField>Test Score & Status:</EmpTextField>
                </EmpField>
                <EmpData>
                  <Typography style={{ gap: "10px" }}>
                    <span style={{ color: "red" }}>100</span>/100
                    <span
                      style={{
                        color: "#D83B01",
                        backgroundColor: "#FED9CC",
                        borderRadius: "8px",
                        padding: "0px 8px 0px 8px",
                        fontFamily: "Roboto",
                        fontSize: "14px",
                        marginLeft: "5px",
                      }}
                    >
                      Fail
                    </span>
                  </Typography>
                </EmpData>
              </EmpDetails>
              <EmpDetails>
                <EmpField>
                  <EmpTextField>Date & Time:</EmpTextField>
                </EmpField>
                <EmpData>
                  <span>11/08/2023;</span>
                  <span>15:33</span>
                </EmpData>
              </EmpDetails>
            </Box>
          </TriamDetails>
        </TriamAreaBox>

        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "20px",
            backgroundColor: "#FFFFFF",
            borderRadius: "8px",
            // padding: "0px 10px 0px 10px",
            padding: "10px",
            // justifyContent: "space-between",
            height: "Fixed (44px)px",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: "14px", fontWeight: "600" }}>
            <p>Filter by:</p>
          </div>
          <div>
            <Plant2Tabs value={value} onChange={handleChangebtn}>
              <Plant2Tab label="All (10)" value="1" />
              <Plant2Tab label="Correct (10)" value="2" />
              <Plant2Tab label="Incorrect (0)" value="3" />
            </Plant2Tabs>
          </div>
        </div>

        <div>
          <div
            style={{
              marginTop: "20px",
              backgroundColor: "#FFFFFF",
              borderRadius: " 8px",
              border: "1px solid #E2E2E2",
              padding: "15px",
            }}
          >
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Question>Q1.</Question>
              <Question>
                किसी मॉडल के अलग अलग वैरिएंट में, कौनसा कॉम्पोनेन्ट लगाना है, यह
                कैसे पता करेंगे ?
              </Question>
            </div>
            <div>
              <div>
                <FormControl style={{ width: "100%" }}>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="second"
                    name="radio-buttons-group"
                  >
                    <div>
                      <FormControlLabel
                        value="first"
                        control={<Radio />}
                        label="साथी से पूछेंगे"
                        disabled
                        className="custom-label-input"
                      />
                    </div>
                    <div>
                      <FormControlLabel
                        value="second"
                        control={
                          <Radio
                            sx={{
                              "&.Mui-checked": {
                                color: "green",
                              },
                            }}
                          />
                        }
                        label="SPEC CONTROL CHART में देखेंगे"
                        className="custom-label-input"
                      />
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          color: "green",
                        }}
                      >
                        <img
                          src={check}
                          alt="img"
                          style={{ marginRight: "5px" }}
                        />
                        Correct Answer!
                      </span>
                    </div>
                    <div>
                      <FormControlLabel
                        value="third"
                        control={<Radio />}
                        label="CHECK SHEET में देखेंगे"
                        className="custom-label-input"
                        disabled
                      />
                    </div>

                    <div>
                      {" "}
                      <FormControlLabel
                        value="fourth"
                        control={<Radio />}
                        label="कार के रंग को देखकर"
                        className="custom-label-input"
                        disabled
                      />
                    </div>
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
          </div>
          <div
            style={{
              marginTop: "20px",
              backgroundColor: "#FFFFFF",
              borderRadius: "8px",
              border: "1px solid #E2E2E2",
              padding: "15px",
            }}
          >
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Question>Q2.</Question>
              <Question>
                इनमे से कौनसा PROCESS ट्रिम लाइन का CRITICAL PROCESS है ?
              </Question>
            </div>
            <div>
              <div>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="second"
                    name="radio-buttons-group"
                  >
                    <div>
                      <FormControlLabel
                        value="first"
                        control={
                          <Radio
                            sx={{
                              "&.Mui-checked": {
                                color: "green",
                              },
                              color: "green",
                            }}
                          />
                        }
                        label="TMC FLARE NUT TIGHTENING"
                        className="custom-label-input"
                        disabled
                      />{" "}
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          color: "green",
                        }}
                      >
                        <img
                          src={check}
                          alt="img"
                          style={{ marginRight: "5px" }}
                        />
                        Correct Answer!
                      </span>
                    </div>
                    <div>
                      <FormControlLabel
                        value="second"
                        control={
                          <Radio
                            sx={{
                              "&.Mui-checked": {
                                color: "red",
                              },
                            }}
                          />
                        }
                        label="TRIM BOARD FITMENT"
                        className="custom-label-input"
                      />

                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          color: "red",
                        }}
                      >
                        <img
                          src={close}
                          alt=""
                          style={{ marginRight: "5px" }}
                        />
                        Incorrect Answer!
                      </span>
                    </div>
                    <div>
                      {" "}
                      <FormControlLabel
                        value="third"
                        control={<Radio />}
                        label="GROMMET FITMENT"
                        className="custom-label-input"
                        disabled
                      />
                    </div>
                    <div>
                      <FormControlLabel
                        value="fourth"
                        control={<Radio />}
                        label="EMBLEM FITMENT"
                        className="custom-label-input"
                        disabled
                      />
                    </div>
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
          </div>
          <div
            style={{
              marginTop: "20px",
              backgroundColor: "#FFFFFF",
              borderRadius: "8px",
              border: "1px solid #E2E2E2",
              padding: "15px",
            }}
          >
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Question>Q3.</Question>
              <Question>
                आग लगने की स्तिथि में किस नंबर पर फ़ोन करना चाहिए ?
              </Question>
            </div>
            <div>
              <div>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="second"
                    name="radio-buttons-group"
                    className="cutom-radio-buttons"
                  >
                    <div>
                      {" "}
                      <FormControlLabel
                        value="first"
                        control={<Radio />}
                        label="1234"
                        className="custom-label-input"
                        disabled
                      />
                    </div>
                    <div>
                      <FormControlLabel
                        value="second"
                        control={
                          <Radio
                            sx={{
                              "&.Mui-checked": {
                                color: "green",
                              },
                            }}
                          />
                        }
                        label="3456"
                        className="custom-label-input"
                      />{" "}
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          color: "green",
                        }}
                      >
                        <img
                          src={check}
                          alt="img"
                          style={{ marginRight: "5px" }}
                        />
                        Correct Answer!
                      </span>
                    </div>
                    <div>
                      <FormControlLabel
                        value="third"
                        control={<Radio />}
                        label="2222"
                        className="custom-label-input"
                        disabled
                      />
                    </div>
                    <div>
                      <FormControlLabel
                        value="fourth"
                        control={<Radio />}
                        label="2134"
                        className="custom-label-input"
                        disabled
                      />
                    </div>{" "}
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
          </div>
        </div>

        <FlexBetweenBox>
          <Box sx={{ fontSize: "12px" }}>AS1/TE/04</Box>
          <FlexAlign>
            <FlexBox>
              <Para>Document Classification : </Para>
              <ParaDetail>
                Secret [ ] Confidential [ ] Internal [*] Public [ ]
              </ParaDetail>
            </FlexBox>
            <FlexBox>
              <Para>
                User department shall ensure the classification based on
                Information Security policy of MSIL
              </Para>
            </FlexBox>
          </FlexAlign>
          <Box sx={{ position: "relative" }}>
            <ChangeHistoryIcon style={{ fontSize: "30px" }} />
            <FooterNumBox>
              <Typography>1</Typography>
            </FooterNumBox>
          </Box>
        </FlexBetweenBox>
      </div>
    </Box>
  );
};
export default TestPaperResult;
