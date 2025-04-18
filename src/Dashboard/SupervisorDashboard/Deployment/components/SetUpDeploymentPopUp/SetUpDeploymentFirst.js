import { Box, DialogTitle, IconButton } from "@mui/material";
import Divider from "@mui/material/Divider";
import React, { useEffect, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import SecondaryButton from "../../../../../../Utilities/Buttons/SecondaryButton/SecondaryButton.js";
import { default as imag1 } from "../../../../../assets/images/en-1.png";
import imag2 from "../../../../../assets/images/en-2.png";
import imag3 from "../../../../../assets/images/en-3.png";
import DataTable from "../../../../../components/Data-table/data-table.jsx";
import DialogBox from "../../../../../components/Dialog/CustomDialogCard.js";
import PrimaryButton from "../../../../../components/PrimaryButton/PrimaryButton.js";
import useDailyDeployment from "../../../hooks/dailyDeployment.js";
import useFetchAllOperators from "../../../hooks/fetchAllOperators.js";
import useFetchStationName from "../../../hooks/fetchStationName.js";
import ConfirmDeploy from "../SetUpDeployment//DeploymentPopUp/ConfirmDeploymentSetUp/ConfirmDeploy.js";
import SetUpDailyDeploymentPopUp from "../SetUpDeployment/DeploymentPopUp/SetUpDailyDeploymentPopUp.js";
import {
  ButtonGrp,
  ConfirmBox,
  DragDropBox,
  MainContainer,
  MainHeading,
  MainOperatorBox,
  MainOprDetails,
  MainOprImg,
  MainOprSapn,
  MainOprSapn1,
  ProcessIcons,
  ProcessP,
  ProcessSpan1,
  ProcessSpan2,
  ProcessStations,
  SecondHeading,
  TabContainer,
  TableBoxDeatils,
  TableDrop,
  TableDropFirstDetails,
  TableDropList,
  TableDropName,
  TableIdLevel,
  TableImg,
  TableManagement,
  TableNames,
  TraineeBoxx,
  TranieeAssign,
  TranieeP,
} from "./SetUpDeploymentFirst.style.js";

const SetUpDeploymentFirst = () => {
  const [open, setOpen] = useState(false);
  const { dataDeployment: dataDeployment, fetchDeployment: fetchDeployment } =
    useDailyDeployment();
  const {
    dataAllOperators: dataAllOperators,
    fetchAllOperators: fetchAllOperators,
  } = useFetchAllOperators();
  const {
    dataStationName: dataStationName,
    fetchStationName: fetchStationName,
  } = useFetchStationName();
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    deploymentAPi();
  }, []);

  const deploymentAPi = async () => {
    try {
      await fetchStationName(`areaSupervisorId=${560871}`);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleClickOpen = async () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleApply = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const dummyOperators = [
    {
      id: "1",
      name: "John Doe",
      staffId: "1001",
      status: "REG",
      level: "L3",
      image: imag1,
    },
    {
      id: "2",
      name: "Jane Smith",
      staffId: "1002",
      status: "AO",
      level: "L2",
      image: imag2,
    },
    {
      id: "3",
      name: "Mike Johnson",
      staffId: "1003",
      status: "AO",
      level: "L1",
      image: imag3,
    },
  ];

  const dummyDragDropOp = [
    {
      id: "1",
      name: "Ankit Sharma",
      staffId: "1001",
      status: "REG",
      level: "L3",
      image: imag1,
    },
    {
      id: "2",
      name: "Jane Smith",
      staffId: "1002",
      status: "AO",
      level: "L2",
      image: imag2,
    },
    {
      id: "3",
      name: "Rakesh Verma",
      staffId: "1003",
      status: "AO",
      level: "L1",
      image: imag3,
    },
  ];

  const rows = dataStationName?.response?.map((value) => ({
    stationName: value,
    id: crypto.randomUUID(),
    mainOperator:
      dummyOperators[Math.floor(Math.random() * dummyOperators.length)],
  }));

  const columns = [
    {
      field: "stationName",
      headerName: "Process Stations(12)",
      width: 100,
      flex: 2,
      sortable: true,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        return (
          <Box>
            <ProcessStations>
              <ProcessIcons className="ProcessIcons">
                <ProcessP>{params.value.Maru_A_AR}</ProcessP>
              </ProcessIcons>
              <ProcessSpan1>{params.value.station_name}</ProcessSpan1>
              <ProcessSpan2>{params.value.description}</ProcessSpan2>
            </ProcessStations>
          </Box>
        );
      },
    },
    {
      field: "mainOperator",
      headerName: "Main Operator (Mandatory)",
      width: 100,
      flex: 2,
      display: "flex",
      sortable: true,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        const operator = params.value;
        return (
          <MainOperatorBox className="mainOperator">
            <MainOprImg src={operator.image} alt="icon" />
            <MainOprDetails>
              <MainOprSapn>{operator.name}</MainOprSapn>
              <MainOprSapn1>{operator.staffId}</MainOprSapn1>
            </MainOprDetails>
          </MainOperatorBox>
        );
      },
    },
    {
      field: "trainee",
      headerName: "Trainee L0 - L3(Optional)",
      width: 150,
      flex: 2,
      display: "flex",
      sortable: true,
      headerClassName: "super-app-theme--header",
      renderCell: () => {
        return (
          <div style={{ position: "relative" }}>
            <TraineeBoxx>
              <TranieeAssign>
                <TranieeP variant="p">+ Assign</TranieeP>
              </TranieeAssign>
            </TraineeBoxx>
          </div>
        );
      },
    },
  ];

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <MainContainer>
        <Box>
          <Box>
            <MainHeading>
              {`Set Up Daily Deployment For Line 1 > Trim-1 > Shift-B > 0.00pm >`}
              11pm
            </MainHeading>
          </Box>
          <Box>
            <SecondHeading>
              Once saved, this deployment setting will take effect immediately
              and will be used every day.
            </SecondHeading>
          </Box>

          <DragDropBox
            style={{
              // backgroundColor: "#E8E8F4",
              backgroundColor: "#E8E8F4",
              boxShadow: "0px 3.2px 7.2px 0px #00000021",
              boxShadow: "0px 0.6px 1.8px 0px #0000001A",
              fontSize: "14px",
              fontWeight: "600",
              lineHeight: "20px",
              padding: "5px",
              marginTop: "10px",
            }}
          >
            <div>
              <div style={{ marginBottom: "10px" }}>
                <span>04 New Joinees</span>{" "}
                <span
                  style={{
                    border: "1px solid black",
                    height: "12px",
                    display: "inline-block",
                  }}
                ></span>
                <span style={{ marginLeft: "5px" }}>
                  {" "}
                  Drag and drop in Trainees column to start their On the Job
                  Training
                </span>
              </div>
              <div style={{ marginBottom: "10px" }}>
                <div style={{ display: "flex", gap: "10px" }}>
                  {dummyDragDropOp.map((oprDrag, index) => (
                    <TableDropFirstDetails key={index}>
                      <TableImg src={oprDrag.image} alt="icon" />
                      <TableBoxDeatils>
                        <TableNames variant="h4">{oprDrag.name}</TableNames>
                        <TableIdLevel variant="h4">{`${oprDrag.staffId} | ${oprDrag.status} | ${oprDrag.level}`}</TableIdLevel>
                      </TableBoxDeatils>
                    </TableDropFirstDetails>
                  ))}
                </div>
              </div>
            </div>
          </DragDropBox>
          <TabContainer>
            <TableManagement>
              <DataTable
                columns={columns}
                rows={rows}
                pagination={false}
                rowHeight={90}
              />
            </TableManagement>

            <TableDrop>
              <TableDropName>Relievers & Absenteeism Cover (3)</TableDropName>
              <Divider />

              <TableDropList>
                {dummyOperators.map((operator, index) => (
                  <TableDropFirstDetails key={index}>
                    <TableImg src={operator.image} alt="icon" />
                    <TableBoxDeatils>
                      <TableNames variant="h4">{operator.name}</TableNames>
                      <TableIdLevel variant="h4">{`${operator.staffId} | ${operator.status} | ${operator.level}`}</TableIdLevel>
                    </TableBoxDeatils>
                  </TableDropFirstDetails>
                ))}
              </TableDropList>
            </TableDrop>
          </TabContainer>
        </Box>

        <ButtonGrp>
          <Box>
            <SecondaryButton
              bgColor="none"
              padding="8px 20px"
              onClick={handleBack}
            >
              Cancel
            </SecondaryButton>
          </Box>
          <Box>
            <PrimaryButton onClick={handleApply}>Apply Setting</PrimaryButton>
          </Box>
        </ButtonGrp>
      </MainContainer>

      <DialogBox onClose={handleClose} open={open}>
        <DialogTitle
          style={{
            backgroundColor: "white",
            color: "#343536",
            fontSize: "16px",
            fontWeight: "600",
          }}
        >
          Assign Trainee
        </DialogTitle>
        <SetUpDailyDeploymentPopUp
          data={dummyOperators}
          onClose={handleClose}
        />
      </DialogBox>

      <DialogBox open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle
          style={{
            color: "#343536",
            fontSize: "16px",
            fontWeight: "600",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 14px",
          }}
        >
          Confirm Deployment Set Up
          <IconButton
            sx={{ p: 0 }}
            aria-label="close"
            onClick={handleCloseDialog}
          >
            <CloseIcon sx={{ width: "16PX", height: "16px" }} />
          </IconButton>
        </DialogTitle>
        <ConfirmBox>
          <ConfirmDeploy onCancel={handleCloseDialog} />
        </ConfirmBox>
      </DialogBox>
    </>
  );
};

export default SetUpDeploymentFirst;
