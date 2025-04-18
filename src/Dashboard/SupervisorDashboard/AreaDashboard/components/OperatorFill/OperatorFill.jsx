import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import React, { useCallback, useEffect, useRef, useState } from "react";
import getInitialName from "../../../../../utils/getInitailName";
import Attendance from "../OperatorFill/Attendance/Attendance";
import ClassRoomTraining from "../OperatorFill/ClassRoomTraining/ClassRoomTraining";
import Deployment from "../OperatorFill/Deployment/Deployment";
import Skills from "../OperatorFill/Skills/Skills";
import {
  CloseIcons,
  MainBox,
  MainBox2,
  MainContainer,
  TagTrainee,
  UserAllDetail,
  UserAttendance,
  UserCard,
  UserCardName,
  UserCardPara,
  UserCardStatus,
  UserData,
  UserDate,
  UserDateBirth,
  UserDaysDetail,
  UserDetail,
  UserInfo,
  UserName,
  UserNameDate,
  UserNameImg,
  UsersName,
  UserTab,
  UserTabs,
} from "./OperatorFill.styles";

dayjs.extend(customParseFormat);

const TabPanel = ({ value, index, children }) => {
  return value === index ? <Box>{children}</Box> : null;
};

export default function OperatorFill({ operatorData, users, toggleDiv }) {
  const [data, setData] = useState("1");
  const [staffid, setStaffid] = useState(operatorData?.staffId);
  const [operator, setOperator] = useState(operatorData);
  const [selectedUserId, setSelectedUserId] = useState(operator?.staffId);
  const operatorRef = useRef(null);

  const handleChange2 = (event, newValue) => {
    setData(newValue);
  };

  const convertDaysToYearsMonthsDays = (totalDays) => {
    const years = Math.floor(totalDays / 365);
    const remainingDaysAfterYears = totalDays % 365;
    const months = Math.floor(remainingDaysAfterYears / 30);
    const days = remainingDaysAfterYears % 30;

    const result = [];

    if (years > 0) result.push(`${years} year${years > 1 ? "s" : ""}`);
    if (months > 0) result.push(`${months} month${months > 1 ? "s" : ""}`);
    if (days > 0) result.push(`${days} day${days > 1 ? "s" : ""}`);

    return result.join(", ");
  };

  const handleClickOperator = useCallback(
    (id) => {
      setStaffid(id);
      setSelectedUserId(id); // Set the selected user
      const filteredUser = users?.find((val) => val?.staffId === id);
      setOperator(filteredUser);
    },
    [users]
  );

  const formatDate = (date) => {
    if (!date) return "";

    const dateObject = dayjs(date, "DD-MM-YYYY");

    return dateObject.isValid() ? dateObject.format("DD/MM/YYYY") : date;
  };

  useEffect(() => {
    if (operatorRef.current) {
      operatorRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [operatorData]);

  return (
    <MainContainer>
      <MainBox>
        <UsersName>
          {users?.map((user, index) => (
            <UserCard
              key={index}
              ref={user?.staffId === operatorData?.staffId ? operatorRef : null}
              onClick={() => handleClickOperator(user?.staffId)}
              style={{
                backgroundColor:
                  selectedUserId === user?.staffId ? "#e6e9f0" : "transparent",
                color: selectedUserId === user?.staffId ? "#171c8f" : "black",
              }}
            >
              <div style={{ position: "relative" }}>
                {user?.profileImage ? (
                  <img
                    src={user?.profileImage}
                    alt={user?.name}
                    style={{
                      width: "46px",
                      height: "46px",
                      borderRadius: "100%",
                      border: `3px solid ${
                        user?.days_until_relieving > 26 ? "green" : "red"
                      }`,
                      position: "relative",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "16px",
                      fontWeight: "bold",
                      backgroundColor: "rgb(226 225 225)",
                      color: "#555",
                      overflow: "hidden",
                      position: "relative",
                      border: `3px solid ${
                        user?.days_until_relieving > 26 ? "#58a55c" : "#d83b01"
                      }`,
                    }}
                  >
                    {getInitialName(user?.name)}
                  </div>
                )}
                {user?.is_trainee && (
                  <TagTrainee className="tag trainee">Trainee</TagTrainee>
                )}
              </div>
              <UserCardStatus>
                <UserCardName
                  style={{
                    fontFamily: "roboto",
                    fontSize: "13px",
                    fontWeight: "600",
                    lineHeight: "16px",
                    letterSpacing: "-0.025em",
                  }}
                >
                  {user?.name}
                </UserCardName>
                <UserCardPara
                  style={{
                    fontFamily: "roboto",
                    fontSize: "13px",
                    fontWeight: "400",
                    lineHeight: "14.06px",
                    letterSpacing: "-0.025em",
                  }}
                >
                  {user?.staffId} | {user?.level}
                </UserCardPara>
                <div className="user-status"></div>
              </UserCardStatus>
            </UserCard>
          ))}
        </UsersName>

        <MainBox2>
          <UserInfo>
            <UserAllDetail>
              <UserNameImg>
                {operator?.profileImage ? (
                  <Box>
                    <img
                      src={operator?.profileImage}
                      alt=""
                      style={{
                        width: "94px",
                        height: "96px",
                        borderRadius: "100%",
                      }}
                    />
                  </Box>
                ) : (
                  <div
                    style={{
                      width: "94px",
                      height: "96px",
                      borderRadius: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "24px",
                      fontWeight: "bold",
                      backgroundColor: "rgb(226 225 225)",
                      color: "#555",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    {getInitialName(operator?.name)}
                  </div>
                )}
                <UserNameDate>
                  <Box>
                    <UserName style={{ fontSize: "18px" }}>
                      {operator?.name}
                    </UserName>
                    <UserDetail>
                      {operator?.staffId} | {operator?.level}
                    </UserDetail>
                  </Box>
                  <UserDate>
                    <UserDateBirth>Date of Birth: </UserDateBirth>
                    <UserDetail>{formatDate(operator?.dob)}</UserDetail>
                  </UserDate>
                </UserNameDate>

                <UserAttendance>
                  <UserDate>
                    <UserDateBirth>Joining Date: </UserDateBirth>
                    <UserDetail>{formatDate(operator?.joiningDate)}</UserDetail>
                  </UserDate>
                  <UserDate>
                    <UserDateBirth>Relieving Date: </UserDateBirth>
                    <UserDetail>
                      {formatDate(operator?.relievingDate)}
                    </UserDetail>
                  </UserDate>
                  <UserDate>
                    <UserDateBirth>Relieving In: </UserDateBirth>
                    <UserDaysDetail
                      style={{
                        color:
                          operator?.days_until_relieving > 26 ? "green" : "red",
                      }}
                    >
                      {convertDaysToYearsMonthsDays(
                        operator?.days_until_relieving
                      )}
                    </UserDaysDetail>
                  </UserDate>
                </UserAttendance>
              </UserNameImg>

              <div>
                <CloseIcons>
                  <CloseIcon
                    sx={{ fontSize: "15px" }}
                    onClick={() => toggleDiv(true)}
                  ></CloseIcon>
                </CloseIcons>
              </div>
            </UserAllDetail>
            <Box>
              <UserData>
                <UserTabs value={data} onChange={handleChange2} centered>
                  <UserTab label="DEPLOYMENT" value="1" />
                  <UserTab label="ATTENDANCE" value="2" />
                  <UserTab label="SKILLS" value="3" />
                  <UserTab label="CLASSROOM TRAININGS" value="4" />
                </UserTabs>
              </UserData>
            </Box>
          </UserInfo>
          <Box>
            <TabPanel value={data} index="1">
              <div
                style={{
                  scrollbarWidth: "none",
                }}
              >
                <Deployment staffId={staffid}></Deployment>
              </div>
            </TabPanel>
            <TabPanel value={data} index="2">
              <Attendance></Attendance>
            </TabPanel>
            <TabPanel value={data} index="3">
              <div
                style={{
                  overflow: "auto",
                  width: "100%",
                  padding: "10px 0",
                  scrollbarWidth: "none",
                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
                }}
              >
                <Skills staffId={staffid} />
              </div>
            </TabPanel>
            <TabPanel value={data} index="4">
              <ClassRoomTraining></ClassRoomTraining>
            </TabPanel>
          </Box>
        </MainBox2>
      </MainBox>
    </MainContainer>
  );
}
