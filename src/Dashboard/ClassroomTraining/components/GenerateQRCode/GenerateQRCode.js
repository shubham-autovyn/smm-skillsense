import { Box, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { useSearchParams } from "react-router-dom";
import useStyles from "../../../styles";
const GenerateQRCode = (props) => {
  const classes = useStyles();
  const [searchParams] = useSearchParams();
  const [qrData, setQrData] = useState(false);

  useEffect(() => {
    let qrId = searchParams.get("qr");
    setQrData(JSON.parse(sessionStorage.getItem(qrId)));
  }, []);

  const getQrURL = () => {
    let start = Math.trunc(new Date().valueOf() / 1000);
    let end = Math.trunc(new Date().valueOf() / 1000) + 1800; //seconds 30min expire time
    let type = "objective";
    if (
      process.env.REACT_APP_ENVIRONMENT === "UI_develop" ||
      process.env.REACT_APP_ENVIRONMENT === "develop"
    ) {
      return qrData?.flow === "test"
        ? `https://dev.marutisuzukiiotspace.com/manpowertraining?flow=${
            qrData?.flow
          }&training_type=${qrData?.trainingType?.replaceAll(
            " ",
            "%20"
          )}&shop_id=${qrData?.shopId}&user_id=${
            qrData?.userId
          }&end=${end}&batch_id=${
            qrData?.batchId
          }&start=${start}&type=${type}&training_name=${qrData?.trainingTopicName
            .replaceAll(" ", "%20")
            .replaceAll("&", "%26")}&training_id=${
            qrData?.trainingId
          }&test_type=${qrData?.testType}&master_topic_id=${
            qrData?.masterTopicId
          }&user_name=${qrData?.userName}`
        : `https://dev.marutisuzukiiotspace.com/manpowertraining?flow=${
            qrData?.flow
          }&training_type=${qrData?.trainingType?.replaceAll(
            " ",
            "%20"
          )}&shop_id=${qrData?.shopId}&user_id=${
            qrData?.userId
          }&end=${end}&batch_id=${qrData?.batchId}&start=${start}`;
    } else if (
      process.env.REACT_APP_ENVIRONMENT === "UI_QA" ||
      process.env.REACT_APP_ENVIRONMENT === "QA"
    ) {
      return qrData?.flow === "test"
        ? `https://uat.marutisuzukiiotspace.com/manpowertraining?flow=${
            qrData?.flow
          }&training_type=${qrData?.trainingType?.replaceAll(
            " ",
            "%20"
          )}&shop_id=${qrData?.shopId}&user_id=${
            qrData?.userId
          }&end=${end}&batch_id=${
            qrData?.batchId
          }&start=${start}&type=${type}&training_name=${qrData?.trainingTopicName
            .replaceAll(" ", "%20")
            .replaceAll("&", "%26")}&training_id=${
            qrData?.trainingId
          }&test_type=${qrData?.testType}&master_topic_id=${
            qrData?.masterTopicId
          }&user_name=${qrData?.userName}`
        : `https://uat.marutisuzukiiotspace.com/manpowertraining?flow=${
            qrData?.flow
          }&training_type=${qrData?.trainingType?.replaceAll(
            " ",
            "%20"
          )}&shop_id=${qrData?.shopId}&user_id=${
            qrData?.userId
          }&end=${end}&batch_id=${qrData?.batchId}&start=${start}`;
    } else if (
      process.env.REACT_APP_ENVIRONMENT === "UI_production" ||
      process.env.REACT_APP_ENVIRONMENT === "production"
    ) {
      return qrData?.flow === "test"
        ? `https://marutisuzukiiotspace.com/manpowertraining?flow=${
            qrData?.flow
          }&training_type=${qrData?.trainingType?.replaceAll(
            " ",
            "%20"
          )}&shop_id=${qrData?.shopId}&user_id=${
            qrData?.userId
          }&end=${end}&batch_id=${
            qrData?.batchId
          }&start=${start}&type=${type}&training_name=${qrData?.trainingTopicName
            .replaceAll(" ", "%20")
            .replaceAll("&", "%26")}&training_id=${
            qrData?.trainingId
          }&test_type=${qrData?.testType}&master_topic_id=${
            qrData?.masterTopicId
          }&user_name=${qrData?.userName}`
        : `https://marutisuzukiiotspace.com/manpowertraining?flow=${
            qrData?.flow
          }&training_type=${qrData?.trainingType?.replaceAll(
            " ",
            "%20"
          )}&shop_id=${qrData?.shopId}&user_id=${
            qrData?.userId
          }&end=${end}&batch_id=${qrData?.batchId}&start=${start}`;
    }
  };
  return (
    <Fragment>
      <Box
        className={classes["container-flex"]}
        sx={{
          width: "100%",
          height: "100%",
          backgroundColor: "white",
          zIndex: 2000,
          position: "absolute",
          top: 0,
        }}
      >
        {qrData && (
          <div style={{ width: "100%", textAlign: "center" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  textAlign: "center",
                  mb: "2rem",
                  width: "256px",
                }}
              >
                {qrData?.info}
              </Typography>
            </Box>

            <QRCode
              size={256}
              style={{ maxWidth: "100%", width: "100%" }}
              value={getQrURL()}
              viewBox={`0 0 256 256`}
            />
          </div>
        )}
      </Box>
    </Fragment>
  );
};
export default GenerateQRCode;
