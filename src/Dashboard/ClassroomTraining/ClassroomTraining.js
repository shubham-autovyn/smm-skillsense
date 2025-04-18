import { Box, Paper, Tab } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import PrimaryButton from "../../../Utilities/Buttons/PrimaryButton/PrimaryButton";
import useStyles from "../styles";
import RefresherTraining from "./RefresherTraining/RefresherTraining";
import { useNavigate } from "react-router-dom";
import DepartmentChangeTraining from "./DepartmentChangeTraining/DepartmentChangeTraining";
import NewJoineeTraining from "./NewJoineeTraining/NewJoineeTraining";
import { useDispatch, useSelector } from "react-redux";
import { getClassroomTabIndex } from "../../redux/Reducers/SMMClassroomReducer";
import { updateClassroomTab } from "../../redux/ActionCreator/ClassroomActionCreator";

const ClassroomTraining = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showTrainingButton, setShowTrainingButton] = useState(true);
  const classroomTab = useSelector(getClassroomTabIndex); //REDUX TAB STATE

  const handleTabChange = (event, newValue) => {
    dispatch(updateClassroomTab(newValue));
  };
  const handleNewTrainingButton = (flag) => {
    setShowTrainingButton(flag);
  };
  const getClassroomPrimaryButton = (tab) => {
    switch (tab) {
      case "1":
        return (
          <Box sx={{ width: "20rem" }}>
            <PrimaryButton
              type="button"
              onClick={() => navigate("/SMM/NewRefresher")}
            >
              New Refresher Training
            </PrimaryButton>
          </Box>
        );
        case "2":
          return (
            <Box sx={{ width: "160px" }}>
              <PrimaryButton
                type="button"
                onClick={() => navigate("/SMM/NewJoinee")}
              >
                New Joinee Training
              </PrimaryButton>
            </Box>
          );
      case "3":
        return (
          <Box sx={{ width: "210px" }}>
            <PrimaryButton
              type="button"
              onClick={() => navigate("/SMM/NewDepartment")}
            >
              New Department Change Training
            </PrimaryButton>
          </Box>
        );
    }
  };
  return (
    <Fragment>
      <Paper sx={{ mb: 2, p: 1.6 }}>
        <Box className={classes["container-flex"]}>
          <Box sx={{ width: "100%" }}>
            <TabContext value={classroomTab}>
              <Box sx={{ mb: 0 }} className={classes["container-flex"]}>
                <Box
                  className={classes["container-flex"]}
                  sx={{ width: "fit-content", gap: "8rem" }}
                >
                  <TabList
                    onChange={handleTabChange}
                    aria-label="dialog-tabs"
                    sx={{
                      "& button": {
                        borderRadius: 1,
                      },
                      "& button.Mui-selected": {
                        backgroundColor: "#F4F5F8",
                      },
                    }}
                  >
                    <Tab label="Refresher Training" value="1" />
                    <Tab label="New Joinee Training" value="2" />
                    <Tab label="Department Change Training" value="3" />
                  </TabList>
                </Box>

                {showTrainingButton && getClassroomPrimaryButton(classroomTab)}
              </Box>
              <TabPanel value="1">
                <RefresherTraining setButtonVisibility={handleNewTrainingButton}/>
              </TabPanel>
              <TabPanel value="2">
                <NewJoineeTraining setButtonVisibility={handleNewTrainingButton}/>
              </TabPanel>
              <TabPanel value="3">
                <DepartmentChangeTraining setButtonVisibility={handleNewTrainingButton}/>
              </TabPanel>
            </TabContext>
          </Box>
        </Box>
      </Paper>
    </Fragment>
  );
};
export default ClassroomTraining;
