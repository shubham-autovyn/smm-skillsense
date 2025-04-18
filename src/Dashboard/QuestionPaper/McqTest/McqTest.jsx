import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import CloseIcon from '@mui/icons-material/Close';
import {
  Alert,
  Backdrop,
  Box,
  CircularProgress,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Snackbar,
} from '@mui/material';
import React, { useEffect, useRef } from 'react';

import { useSearchParams } from 'react-router-dom';
import CustomButton from '../../../components/Button/CustomButton';
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';
import useFetchTestPaper from '../hooks/testPaper';
import updowanarrow from './../../../assets/svg/fi-rr-angle-small-down.svg';
import {} from './McqTest.scss';
import {
  BootamText,
  // FlexAlign,
  FlexBetweenBox,
  MainBox,
  Question,
  Toptext,
  TopTextScor,
  TopTextSecond,
  UpArrowImg,
} from './McqTest.style';

export const McqTest = ({ handleSubmit }) => {
  const firstQuestionRef = useRef(null);
  const [searchParams] = useSearchParams();
  const [showSuccessAlert, setShowSuccessAlert] = React.useState(false);
  const { dataTestDetails, loading, error, fetchTestPaper } =
    useFetchTestPaper();
  const submitQuestion = (value) => {
    handleSubmit(value);
  };

  const scrollToTop = () => {
    if (firstQuestionRef.current) {
      firstQuestionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const payload = {
      supervisor_id: searchParams.get('supervisorId'),
      staffId: searchParams.get('staffId'),
    };
    if (payload) {
      const data = fetchTestPaper(payload);
      if (data?.responseCode !== 200) {
        setShowSuccessAlert(true);
      } else {
        setShowSuccessAlert(false);
      }
    }
  }, []);
  // const data = [
  //   {
  //     question_body:
  //       "\\u0915\\u093f\\u0938\\u0940 model \\u0915\\u0947 \\u0905\\u0932\\u0917-\\u0905\\u0932\\u0917 variant \\u092e\\u0947\\u0902 \\u0915\\u094c\\u0928 \\u0938\\u093e component \\u0932\\u0917\\u093e\\u0928\\u093e \\u0939\\u0948, \\u092f\\u0939 \\u0915\\u0948\\u0938\\u0947 \\u092a\\u0924\\u093e \\u0915\\u0930\\u0947\\u0902\\u0917\\u0947 ?",
  //     options: [
  //       "\\u0938\\u093e\\u0925\\u0940 \\u0938\\u0947 \\u092a\\u0942\\u091b\\u0947\\u0902\\u0917\\u0947",
  //       "spec control chart \\u092e\\u0947\\u0902 \\u0926\\u0947\\u0916\\u0947\\u0902\\u0917\\u0947",
  //       "check sheet \\u092e\\u0947\\u0902 \\u0926\\u0947\\u0916\\u0947\\u0902\\u0917\\u0947",
  //       "\\u0917\\u093e\\u0921\\u093c\\u0940 \\u0915\\u0947 \\u0930\\u0902\\u0917 \\u0915\\u094b \\u0926\\u0947\\u0916\\u0915\\u0930",
  //     ],
  //     question_type: "MCQ",
  //     correct_answer_index: 2,
  //   },
  //   // ...
  // ];

  const decodeUnicode = (unicodeStr) => {
    try {
      return JSON.parse(`"${unicodeStr}"`); // Converts Unicode to Hindi text
    } catch (error) {
      console.error('Unicode parsing error:', error);
      return unicodeStr; // Return original string if parsing fails
    }
  };

  return (
    <MainBox className="mainBox">
      <Box
        sx={{
          backgroundColor: '#E6E9F0',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          padding: '32px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ backgroundColor: '#CED0D4', padding: '16px' }}>
            <div>
              <Toptext>
                AS1 - Maru-A and Maru-AR & both Maru A/AR operator test paper
              </Toptext>
            </div>
            <div>
              <TopTextSecond>
                प्रत्येक प्रश्न के साथ दिए गए विकल्पों में से सही विकल्प
                चुनें।प्रत्येक प्रश्न 5 अंक का है।
              </TopTextSecond>
            </div>
            <div ref={firstQuestionRef}>
              <TopTextScor>Passing Score: 100</TopTextScor>
            </div>
          </div>
        </Box>
        {dataTestDetails?.questions?.map((question, index) => {
          return (
            <div
              style={{
                marginTop: '20px',
                backgroundColor: '#FFFFFF',
                borderRadius: ' 8px',
                border: '1px solid #E2E2E2',
                padding: '16px 16px 0px 16px',
              }}
            >
              <div
                style={{ display: 'flex', gap: '10px', alignItems: 'start' }}
              >
                <Question>Q{index + 1}.</Question>
                <Question>
                  {/* किसी मॉडल के अलग अलग वैरिएंट में, कौनसा कॉम्पोनेन्ट लगाना है, यह
                  कैसे पता करेंगे ? */}
                  {decodeUnicode(question.question_body)}
                </Question>
              </div>
              <div>
                <div>
                  <FormControl style={{ width: '100%' }}>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="second"
                      name="radio-buttons-group"
                    >
                      {question.options.map((option, index) => {
                        return (
                          <div>
                            <FormControlLabel
                              value={index + 1}
                              control={<Radio />}
                              label={decodeUnicode(option)}
                              className="custom-label"
                            />
                          </div>
                        );
                      })}
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>
            </div>
          );
        })}
        {/* <div
          style={{
            marginTop: "20px",
            backgroundColor: "#FFFFFF",
            borderRadius: " 8px",
            border: "1px solid #E2E2E2",
            padding: "16px 16px 0px 16px",
          }}
        >
          <div style={{ display: "flex", gap: "10px", alignItems: "start" }}>
            <Question>Q2.</Question>
            <Question>
              आग लगने की स्तिथि में किस नंबर पर फ़ोन करना चाहिए ?
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
                      label="1234"
                      className="custom-label"
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value="second"
                      control={<Radio />}
                      label="3456"
                      className="custom-label"
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value="third"
                      control={<Radio />}
                      label="2222"
                      className="custom-label"
                    />
                  </div>

                  <div>
                    {" "}
                    <FormControlLabel
                      value="fourth"
                      control={<Radio />}
                      label="2134"
                      className="custom-label"
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
            borderRadius: " 8px",
            border: "1px solid #E2E2E2",
            padding: "16px 16px 0px 16px",
          }}
        >
          <div style={{ display: "flex", gap: "10px", alignItems: "start" }}>
            <Question>Q3.</Question>
            <Question>
              आग लगने की स्तिथि में किस नंबर पर फ़ोन करना चाहिए ?
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
                      label="1234"
                      className="custom-label"
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value="second"
                      control={<Radio />}
                      label="3456"
                      className="custom-label"
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value="third"
                      control={<Radio />}
                      label="2222"
                      className="custom-label"
                    />
                  </div>

                  <div>
                    {" "}
                    <FormControlLabel
                      value="fourth"
                      control={<Radio />}
                      label="2134"
                      className="custom-label"
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
            borderRadius: " 8px",
            border: "1px solid #E2E2E2",
            padding: "16px 16px 0px 16px",
          }}
        >
          <div style={{ display: "flex", gap: "10px", alignItems: "start" }}>
            <Question>Q4.</Question>
            <Question>
              इनमें से कौनसा Process iT / ma लाईन का Critical Process है ?
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
                      label="1234"
                      className="custom-label"
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value="second"
                      control={<Radio />}
                      label="3456"
                      className="custom-label"
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value="third"
                      control={<Radio />}
                      label="2222"
                      className="custom-label"
                    />
                  </div>

                  <div>
                    {" "}
                    <FormControlLabel
                      value="fourth"
                      control={<Radio />}
                      label="2134"
                      className="custom-label"
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
            borderRadius: " 8px",
            border: "1px solid #E2E2E2",
            padding: "16px 16px 0px 16px",
          }}
        >
          <div style={{ display: "flex", gap: "10px", alignItems: "start" }}>
            <Question>Q4.</Question>
            <Question>
              इनमें से कौनसा Process iT / ma लाईन का Critical Process है ?
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
                      label="1234"
                      className="custom-label"
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value="second"
                      control={<Radio />}
                      label="3456"
                      className="custom-label"
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value="third"
                      control={<Radio />}
                      label="2222"
                      className="custom-label"
                    />
                  </div>

                  <div>
                    {" "}
                    <FormControlLabel
                      value="fourth"
                      control={<Radio />}
                      label="2134"
                      className="custom-label"
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
            borderRadius: " 8px",
            border: "1px solid #E2E2E2",
            padding: "16px 16px 0px 16px",
            marginBottom: "6px",
          }}
        >
          <div style={{ display: "flex", gap: "10px", alignItems: "start" }}>
            <Question>Q20.</Question>
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
                      className="custom-label"
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value="second"
                      control={<Radio />}
                      label="SPEC CONTROL CHART में देखेंगे"
                      className="custom-label"
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value="third"
                      control={<Radio />}
                      label="CHECK SHEET में देखेंगे"
                      className="custom-label"
                    />
                  </div>

                  <div>
                    {" "}
                    <FormControlLabel
                      value="fourth"
                      control={<Radio />}
                      label="कार के रंग को देखकर"
                      className="custom-label"
                    />
                  </div>
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        </div> */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '50%',
            marginLeft: '21%',
          }}
        >
          <CustomButton
            onClick={scrollToTop}
            style={{
              width: '100%',
              justifyContent: 'center',
              borderRadius: '20px',
              display: 'flex',
              gap: '5px',
              position: 'sticky',
              zIndex: '20',
              marginTop: '-10px',
              backgroundColor: 'white',
              color: '#171C8F',
              height: '30px',
            }}
          >
            <UpArrowImg src={updowanarrow} alt="" className="updowanarrow" />
            Back To Top
          </CustomButton>
        </div>{' '}
        <FlexBetweenBox>
          <div style={{ margin: '5px 0px 5px 0px' }}>
            <BootamText>Document Classification: </BootamText>
            <BootamText>
              Secret [ ] Confidential [ ] Internal [ ] Public [ ]
            </BootamText>
          </div>
          <div style={{ margin: '5px 0px 5px 0px' }}>
            <BootamText>
              User department shall ensure the classification based on
              Information Security policy of MSIL
            </BootamText>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: '5px 0px 5px 0px',
            }}
          >
            <div>
              <BootamText>AS1/TE/04</BootamText>
            </div>
            <div>
              {' '}
              <ChangeHistoryIcon />
            </div>
          </div>
        </FlexBetweenBox>
        <PrimaryButton
          bgColor="none"
          style={{
            width: '100%',
            marginBottom: '20px',
          }}
          onClick={() => submitQuestion(true)}
        >
          Submit
        </PrimaryButton>
      </Box>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Snackbar
        open={showSuccessAlert}
        autoHideDuration={6000}
        onClose={() => setShowSuccessAlert(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setShowSuccessAlert(false)}
          severity={
            dataTestDetails?.data.responseCode !== 200 ? 'error' : 'success'
          }
          variant="filled"
          sx={{ width: '100%', fontSize: '14px' }}
          action={
            <IconButton size="small" onClick={() => setShowSuccessAlert(false)}>
              <CloseIcon fontSize="large" color="inherit" />
            </IconButton>
          }
        >
          {dataTestDetails?.data.message}
        </Alert>
      </Snackbar>
    </MainBox>
  );
};
