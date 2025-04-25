import {
  Box,
  Paper,
  Skeleton,
  TableContainer,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectPermissions } from "container/selectPermissions";
import PrimaryButton from "../../../utils/Buttons/PrimaryButton/PrimaryButton";
import { TypePrimary } from "../../../utils/colors";
import Department from "../../../assets/images/Department.png";
import NoTrainingBatch from "../../../components/NoDataViews/NoTrainingBatch";
import {
  setAlertMessage,
  setIsAlert,
} from "../../../redux/ActionCreator/AlertActionCreator";
import { setOngoingBatchLoading } from "../../../redux/ActionCreator/ClassroomActionCreator";
import {
  fetchNewRefresherTrainingTopic,
  fetchOngoingBatchData,
  fetchPendingBatchAction,
} from "../../../redux/Actions/ClassroomAction";
import {
  getOngoingBatchData,
  getOngoingBatchLoading,
  getPendingBatchData,
  getPendingBatchLoading,
  getTrainingTopicList,
  getTrainingTopicListLoading,
} from "../../../redux/Reducers/SMMClassroomReducer";
import { getShop } from "../../../redux/Reducers/SMMShopReducer";
import useStyles from "../../styles";
import OngoingBatch from "./OngoingBatch/OngoingBatch";
import PendingBatch from "./PendingBatch/PendingBatch";

const NewJoineeTraining = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ongoingBatchData = useSelector(getOngoingBatchData);
  const ongoingBatchLoading = useSelector(getOngoingBatchLoading);
  const topicData = useSelector(getTrainingTopicList);
  const topicListLoading = useSelector(getTrainingTopicListLoading);
  const pendingBatchLoading = useSelector(getPendingBatchLoading);
  const pendingBatchData = useSelector(getPendingBatchData);
  const shop = useSelector(getShop);
  const roles = useSelector(selectPermissions)?.ROLES || {};
  const permissions = roles["Smart Man Power"] || {};
  const classCoordinatorShops =
    permissions?.SMM_CLASSROOM_COORDINATOR?.ALLOWED_SHOP_IDS || [];

  useEffect(() => {
    if (Array.isArray(ongoingBatchData) && ongoingBatchData?.length) {
      props.setButtonVisibility(true);
    } else {
      props.setButtonVisibility(false);
    }
  }, [ongoingBatchData]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    if (shop?.id) {
      if (classCoordinatorShops?.includes(String(shop?.id))) {
        const ongoingBatchPayload = {
          shop_id: shop.id,
          training_type: "New joinee",
          source: source,
        };

        dispatch(fetchOngoingBatchData(ongoingBatchPayload));
        dispatch(fetchNewRefresherTrainingTopic(ongoingBatchPayload));
      } else {
        dispatch(setOngoingBatchLoading(true));
        props.setButtonVisibility(false);
        dispatch(setIsAlert(true));
        dispatch(setAlertMessage("You don't have access to this shop"));
      }
    }
    return () => {
      //Cancelling current request on component unmount
      source.cancel("Multiple dependecy request cancelled!");
    };
  }, [shop]);

  useEffect(() => {
    const pendingBatchPayload = {
      shop_id: shop.id?.toString(),
      training_type: "New joinee",
    };

    dispatch(fetchPendingBatchAction(pendingBatchPayload));
  }, []);

  return (
    <Fragment>
      {ongoingBatchLoading || topicListLoading || pendingBatchLoading ? (
        <Skeleton
          className={`${classes["master-table"]} ${classes["master-table-dimensions"]}`}
          animation="wave"
          variant="rectangular"
        />
      ) : (
        <TableContainer
          className={`${classes["master-table"]} ${classes["master-table-dimensions"]}`}
          component={Paper}
          sx={{ border: "none" }}
        >
          {Array.isArray(topicData?.topicsPlan) &&
          topicData?.topicsPlan.length === 0 ? (
            <NoTrainingBatch />
          ) : (Array.isArray(ongoingBatchData) &&
              ongoingBatchData?.length > 0) ||
            (pendingBatchData &&
              pendingBatchData?.pending_batch_details?.length) ? (
            <Box>
              {Array.isArray(ongoingBatchData) &&
                ongoingBatchData?.length > 0 && (
                  <OngoingBatch ongoingBatchData={ongoingBatchData} />
                )}
              {pendingBatchData?.pending_batch_details?.length ? (
                <PendingBatch
                  pendingBatchData={
                    pendingBatchData?.pending_batch_details || []
                  }
                />
              ) : null}
            </Box>
          ) : (
            <Box sx={{ height: "55vh" }}>
              <Box sx={{ textAlign: "center", mt: "2rem" }}>
                <img
                  src={Department}
                  alt={"department"}
                  style={{
                    height: "250px",
                    width: "250px",
                    borderRadius: "125px",
                  }}
                />
              </Box>
              <Typography
                sx={{
                  fontWeight: 700,
                  textAlign: "center",
                  mt: "1rem",
                  color: TypePrimary,
                }}
              >
                No Ongoing Batch
              </Typography>
              <Typography
                variant="body1"
                sx={{ textAlign: "center", py: "1.5rem", color: TypePrimary }}
              >
                Create a new batch to conduct training for new joinees
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box />
                <Box>
                  <PrimaryButton
                    type="button"
                    onClick={() => navigate("/SMM/NewJoinee")}
                  >
                    {"New Joinee Training"}
                  </PrimaryButton>
                </Box>
                <Box />
              </Box>
            </Box>
          )}
        </TableContainer>
      )}
    </Fragment>
  );
};
export default NewJoineeTraining;
