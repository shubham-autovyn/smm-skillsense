import { Paper, Skeleton, TableContainer } from "@mui/material";
import axios from "axios";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPermissions } from "container/selectPermissions";
import NoTrainingBatch from "../../../components/NoDataViews/NoTrainingBatch";
import {
  setAlertMessage,
  setIsAlert,
} from "../../../redux/ActionCreator/AlertActionCreator";
import { setOngoingBatchLoading } from "../../../redux/ActionCreator/ClassroomActionCreator";
import {
  fetchNewRefresherTrainingTopic,
  fetchOngoingBatchData,
  fetchTrainingPlanData,
} from "../../../redux/Actions/ClassroomAction";
import {
  getOngoingBatchData,
  getOngoingBatchLoading,
  getTrainingPlanData,
  getTrainingPlanLoading,
  getTrainingTopicList,
  getTrainingTopicListLoading,
} from "../../../redux/Reducers/SMMClassroomReducer";
import { getShop } from "../../../redux/Reducers/SMMShopReducer";
import useStyles from "../../styles";
import OngoingBatch from "./OngoingBatch/OngoingBatch";
import TrainingPlan from "./TrainingPlan/TrainingPlan";
const RefresherTraining = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const trainingPlanData = useSelector(getTrainingPlanData);
  const ongoingBatchData = useSelector(getOngoingBatchData);
  const ongoingBatchLoading = useSelector(getOngoingBatchLoading);
  const trainingPlanLoading = useSelector(getTrainingPlanLoading);
  const topicData = useSelector(getTrainingTopicList);
  const topicListLoading = useSelector(getTrainingTopicListLoading);
  const shop = useSelector(getShop);
  const roles = useSelector(selectPermissions)?.ROLES || {};
  const permissions = roles["Smart Man Power"] || {};
  const classCoordinatorShops =
    permissions?.SMM_CLASSROOM_COORDINATOR?.ALLOWED_SHOP_IDS || [];

  useEffect(() => {
    if (Array.isArray(topicData?.topicsPlan) && topicData?.topicsPlan.length) {
      props.setButtonVisibility(true);
    } else {
      props.setButtonVisibility(false);
    }
  }, [topicData]);
  useEffect(() => {
    const source = axios.CancelToken.source();
    if (shop?.id) {
      if (classCoordinatorShops?.includes(String(shop?.id))) {
        const payload = { shop_id: shop.id };
        const ongoingBatchPayload = {
          shop_id: shop.id,
          training_type: "Refresher",
          source: source,
        };
        dispatch(fetchTrainingPlanData(payload));
        dispatch(fetchOngoingBatchData(ongoingBatchPayload));
        //Fetch Training Topic
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

  return (
    <Fragment>
      {ongoingBatchLoading || trainingPlanLoading || topicListLoading ? (
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
          ) : (
            <Fragment>
              {Array.isArray(ongoingBatchData) &&
                ongoingBatchData?.length > 0 && (
                  <OngoingBatch ongoingBatchData={ongoingBatchData} />
                )}
              <TrainingPlan trainingPlanData={trainingPlanData} />
            </Fragment>
          )}
        </TableContainer>
      )}
    </Fragment>
  );
};
export default RefresherTraining;
