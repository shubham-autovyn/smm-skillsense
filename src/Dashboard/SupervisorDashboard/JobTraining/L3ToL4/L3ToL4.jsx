import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Backdrop, Box, CircularProgress, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import sorting from '../../../../assets/icons/SortIcon.svg';
import Cross from '../../../../assets/svg/close-icon.svg';
import download from '../../../../assets/svg/fi-rr-download.svg';
import exclamation from '../../../../assets/svg/fi-rr-exclamation.svg';
import DialogCard from '../../../../components/Dialog/CustomDialogCard';

import { useSelector } from 'react-redux';
import { getUser } from '../../../../services/auth';
import SecondaryButton from '../../../../../src/utils/Buttons/SecondaryButton/SecondaryButton';
import Check from '../../../../assets/svg/fi-rr-check.svg';
import { DataGridTable } from '../../../../components/Data-table/dataTable.styles';
import { getShop } from '../../../../redux/Reducers/SMMShopReducer';
import useSkillEvaluation from '../../hooks/skillEvaluation';
import AddOperators from './components/AddOperators/AddOperators';
import TestDialogs from './components/UnlockTest/UnlockTest';
import {
    BtnInfo,
    DownloadBox,
    DownloadButton,
    IconInfo,
    JobContainer,
    JobMainContainer,
    LockIcons,
    OperatorButton,
    SnackBarContainer,
    StationContainer,
    StationMain,
    StationName,
    StatusLock,
    StatusUnlock,
    TopText,
    UnlockInfo,
} from './L3ToL4.style';
// import TestDialogs from "./testDialog/testDialog";

export const L3ToL4 = () => {
    const [open, setOpen] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [modelOpen, setModelOpen] = useState(false);
    const [evaluationTableData, setEvaluationTableData] = useState([]);
    const handleClose = () => setOpen(false);
    const { fetchSkillEvaluation, loading } = useSkillEvaluation();
    const [isAscending, setIsAscending] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const shop = useSelector(getShop);
    const [formValues, setFormValues] = useState([]);
    const supervisorId = localStorage.getItem('supervisorId');

    const columns = [
        {
            field: 'staff',
            headerName: 'Staff ID',
            resizable: false,
            headerClassName: 'super-app-theme--header',
            width: 100,
            renderHeader: () => (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        cursor: 'default',
                    }}
                >
                    <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>
                        Staff ID
                    </Typography>
                    <img
                        src={sorting}
                        alt="sort icon"
                        width={10}
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            handleSortClick('staff');
                        }}
                    />
                </Box>
            ),
        },
        {
            field: 'name',
            headerName: 'Name',
            resizable: false,
            sortable: true,
            headerClassName: 'super-app-theme--header',
            width: 150,
            renderHeader: () => (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        cursor: 'default',
                    }}
                >
                    <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>
                        Name
                    </Typography>
                    <img
                        src={sorting}
                        alt="sort icon"
                        width={10}
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            handleSortClick('name');
                        }}
                    />
                </Box>
            ),
        },
        {
            field: 'processStation',
            headerName: 'Process Station',
            resizable: false,
            sortable: true,
            headerClassName: 'super-app-theme--header',
            width: 250,
            renderHeader: () => (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        cursor: 'default',
                    }}
                >
                    <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>
                        Process Station
                    </Typography>
                    <img
                        src={sorting}
                        alt="sort icon"
                        width={10}
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            handleSortClick('processStation');
                        }}
                    />
                </Box>
            ),
            renderCell: (params) => (
                <StationMain>
                    <StationContainer>
                        {params.value.evaluation}
                    </StationContainer>
                    <StationName>
                        {params.value.firstName} | {params.value.lastName}
                    </StationName>
                </StationMain>
            ),
        },
        {
            field: 'planedMonth',
            headerName: 'Planed Month',
            resizable: false,
            sortable: true,
            headerClassName: 'super-app-theme--header',
            width: 150,
            renderHeader: () => (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        cursor: 'default',
                    }}
                >
                    <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>
                        Planed Month
                    </Typography>
                    <img
                        src={sorting}
                        alt="sort icon"
                        width={10}
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            handleSortClick('planedMonth');
                        }}
                    />
                </Box>
            ),
        },
        {
            field: 'actualTrainingDate',
            headerName: 'Actual Training Date',
            resizable: false,
            headerClassName: 'super-app-theme--header',
            width: 150,

            renderHeader: () => (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        cursor: 'default',
                    }}
                >
                    <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>
                        Actual Training Date
                    </Typography>
                    <img
                        src={sorting}
                        alt="sort icon"
                        width={10}
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            handleSortClick('actualTrainingDate');
                        }}
                    />
                </Box>
            ),
        },
        {
            field: 'testStatus',
            headerName: 'Test Status',
            resizable: false,
            headerClassName: 'super-app-theme--header',
            width: 150,
            renderHeader: () => (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        cursor: 'default',
                    }}
                >
                    <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>
                        Test Status
                    </Typography>
                    <img
                        src={sorting}
                        alt="sort icon"
                        width={10}
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            handleSortClick('testStatus');
                        }}
                    />
                </Box>
            ),

            renderCell: (params) =>
                params.row.testStatus === 'Locked' ? (
                    <StatusLock>
                        <LockIcons />
                        <IconInfo> {params.row.testStatus}</IconInfo>
                    </StatusLock>
                ) : (
                    <StatusUnlock>
                        <UnlockInfo>{params.row.testStatus}</UnlockInfo>
                        <OpenInNewIcon style={{ fontSize: '18px' }} />
                    </StatusUnlock>
                ),
        },
        {
            field: 'action',
            headerName: 'Action',
            headerClassName: 'super-app-theme--header',
            width: 150,
            renderHeader: () => (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        cursor: 'default',
                    }}
                >
                    <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>
                        Action
                    </Typography>
                </Box>
            ),
            renderCell: (params) => {
                const foundData = params?.row?.unlockTestData || false;
                return (
                    <Box>
                        <BtnInfo
                            onClick={() => {
                                foundData
                                    ? handleOpenQrCode()
                                    : handleClickOpen(params.row);
                            }}
                        >
                            {foundData ? 'View Test QR Code' : 'Unlock Test'}
                        </BtnInfo>
                    </Box>
                );
            },
        },
        {
            field: 'noOfL4Evaluation',
            headerName: 'No. of L4 Evaluation',
            resizable: false,
            headerClassName: 'super-app-theme--header',
            width: 150,
            renderHeader: () => (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        cursor: 'default',
                    }}
                >
                    <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>
                        No. of L4 Evaluation
                    </Typography>
                    <img
                        src={sorting}
                        alt="sort icon"
                        width={10}
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            handleSortClick('noOfL4Evaluation');
                        }}
                    />
                </Box>
            ),
        },
        {
            field: 'download',
            headerName: 'Skill Evaluation & Approval Sheet',
            resizable: false,
            headerClassName: 'super-app-theme--header',
            width: 200,

            renderHeader: () => (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        cursor: 'default',
                    }}
                >
                    <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>
                        Skill Evaluation & Approval Sheet
                    </Typography>
                </Box>
            ),
            renderCell: () => (
                <DownloadBox>
                    <DownloadButton variant="outlined">
                        <img src={download} alt="download" />
                    </DownloadButton>
                </DownloadBox>
            ),
        },
    ];

    const handleSortClick = (type) => {
        const sortedData = [...evaluationTableData].sort((a, b) => {
            const valueA = a[type];
            const valueB = b[type];
            if (typeof valueA === 'string' && typeof valueB === 'string') {
                // Handle alphabetic sorting
                return isAscending
                    ? valueA.localeCompare(valueB) // Ascending
                    : valueB.localeCompare(valueA); // Descending
            } else if (!isNaN(new Date(valueA)) && !isNaN(new Date(valueB))) {
                // Handle date sorting
                const dateA = new Date(valueA);
                const dateB = new Date(valueB);
                return isAscending ? dateA - dateB : dateB - dateA;
            } else if (
                typeof valueA === 'number' &&
                typeof valueB === 'number'
            ) {
                // Handle numeric sorting
                return isAscending ? valueA - valueB : valueB - valueA;
            }
            return 0; // Default case for unhandled data types
        });

        setEvaluationTableData(sortedData);
        setIsAscending(!isAscending); // Toggle sorting order
    };

    const getUserDetails = () => {
        const cred = getUser()?.username.split('\\');
        let userId = '';
        let userName = '';
        if (cred) {
            if (cred.length === 1) {
                userId = cred[0];
                userName = cred[0];
            } else {
                userId = cred[0] + '%5C' + cred[1];
                userName = cred[1];
            }
        }
        return {
            userId,
            userName,
        };
    };

    const handleOpenQrCode = () => {
        const qrId = Date.now().toString(36);

        const dataToSend = {
            shopId: shop?.id?.toString(),
            userId: getUserDetails()?.userId,
            userName: getUserDetails()?.userName,
            flow: 'test',
            info: 'L3 Test QR Code',
            staffId: selectedRowData?.staff,
            supervisorId: localStorage.getItem('supervisorId'),
        };

        // Store the data in localStorage
        sessionStorage.setItem(qrId, JSON.stringify(dataToSend));
        window.open(`/SMM/L3GenerateQRCode?qr=${[qrId]}`, '_blank');
    };
    // Function to open the Dialog
    const handleClickOpen = (rowData) => {
        setSelectedRowData(rowData);
        setOpen(true);
    };
    const handleModelOpen = () => {
        setModelOpen(true);
    };
    // Function to close the Dialog
    // const handleClose = () => setOpen(false);
    const handleModelClose = () => {
        setModelOpen(false);
    };

    let responseData;
    useEffect(() => {
        const fetchSkillData = async () => {
            try {
                const params = `supervisorId=${supervisorId}`;
                responseData = await fetchSkillEvaluation(params);
            } catch (error) {
                setEvaluationTableData([]);
            } finally {
                if (responseData?.responseCode === 200) {
                    const modifiedResponse = responseData?.response?.map(
                        (row, index) => {
                            const obj = {
                                staff: row?.staff_id,
                                id: index + 1,
                                name: row?.staff_name,
                                processStation: {
                                    evaluation: row?.group_name ? 'A' : '',
                                    firstName: row?.station_name,
                                    lastName: row?.description,
                                },
                                // planedMonth: moment(row?.planned_month).format("MMM YYYY"),
                                planedMonth: row?.start_date,
                                // actualTrainingDate: moment(row?.actual_training_date).format(
                                //   "L"
                                // ),
                                actualTrainingDate: row?.completed_date,
                                testStatus: row?.status,
                                action: 'action',
                                noOfL4Evaluation: row?.l4_evaluation || 0,
                                skillEvaluation: 'download',
                            };
                            return obj;
                        }
                    );
                    setEvaluationTableData(modifiedResponse);
                }
            }
        };
        fetchSkillData();
    }, []);

    const handleFormData = (data) => {
        setFormValues((prev) => {
            const updatedValues = prev.filter(
                (item) => item.staff !== data.staffId
            );
            return [...updatedValues, data];
        });

        const updatedData = evaluationTableData.map((item) => {
            if (
                item.staff === data.staffId &&
                data.Q1 === 'OK' &&
                data.Q2 === 'OK'
            ) {
                return {
                    ...item,
                    unlockTestData: true,
                };
            }
            return item;
        });

        setEvaluationTableData(updatedData);

        if (data.Q1 === 'OK' && data.Q2 === 'OK') {
            setShowSuccessAlert(true);
            setShowAlert(false);
            setTimeout(() => setShowSuccessAlert(false), 6000);
        } else {
            setShowAlert(true);
            setShowSuccessAlert(false);
            setTimeout(() => setShowAlert(false), 6000);
        }
    };

    return (
        <JobMainContainer>
            <Backdrop
                sx={(theme) => ({
                    color: '#fff',
                    zIndex: theme.zIndex.drawer + 1,
                })}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            {showAlert && (
                <TopText
                    style={{
                        backgroundColor: '#FED9CC',
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '6px 7px 6px 7px',
                        }}
                    >
                        <img src={exclamation} alt="exclamation" />
                        <p
                            style={{
                                fontSize: '14px',
                                fontWeight: '400',
                                lineHeight: '16px',
                                letterSpacing: '-0.025em',
                            }}
                        >
                            Test not unlocked. Operator must fulfill all L4
                            requirements to unlock the test.{' '}
                        </p>
                    </div>

                    <button
                        onClick={() => setShowAlert(false)}
                        style={{ border: 'none', background: 'none' }}
                    >
                        <img
                            src={Cross}
                            alt="cross-icon"
                            style={{ cursor: 'pointer' }}
                        />
                    </button>
                </TopText>
            )}
            {showSuccessAlert && (
                <SnackBarContainer>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '6px 7px 6px 7px',
                        }}
                    >
                        <img src={Check} alt="check" />

                        <p
                            style={{
                                fontSize: '14px',
                                fontWeight: '400',
                                lineHeight: '16px',
                                letterSpacing: '-0.025em',
                            }}
                        >
                            Test unlocked successfully. Show test QR code to the
                            operator for attempting the test.{' '}
                        </p>
                    </div>
                    <button
                        onClick={() => setShowSuccessAlert(false)}
                        style={{ border: 'none', background: 'none' }}
                    >
                        <img
                            src={Cross}
                            alt="cross-icon"
                            style={{ cursor: 'pointer' }}
                        />
                    </button>
                </SnackBarContainer>
            )}
            <JobContainer>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                    }}
                >
                    <OperatorButton
                        variant="h3"
                        sx={{ color: '#343536', fontWeight: 'bold' }}
                    >
                        L3 to L4 Skill Evaluation
                    </OperatorButton>
                    <Box>
                        <SecondaryButton
                            style={{
                                minWidth: '132px',
                                display: 'inline-block',
                            }}
                            onClick={() => handleModelOpen()}
                            // sx={{ MinWidth: "132px !important", display: "inline-block" }}
                        >
                            Add Operators
                        </SecondaryButton>
                    </Box>
                </div>
            </JobContainer>
            <Box>
                <Typography
                    variant="h3"
                    sx={{
                        color: '#343536',
                        fontWeight: 'bold',
                        margin: '1px 1px 10px 1px',
                    }}
                >
                    Total {evaluationTableData?.length}
                </Typography>
            </Box>
            <div
                style={{
                    border: '1px solid rgba(224, 224, 224, 1)',
                    borderRadius: '8px',
                    height: '50vh',
                    minHeight: '55vh',
                    maxHeight: 'auto',
                }}
            >
                <DataGridTable
                    key={formValues.length}
                    disableAutosize
                    disableColumnMenu
                    disableColumnSorting
                    columns={columns}
                    rows={evaluationTableData || []}
                />
                {open && (
                    <TestDialogs
                        open={open}
                        handleClose={handleClose}
                        rowData={selectedRowData}
                        handleFormData={handleFormData}
                    />
                )}

                <DialogCard
                    title={'Add Operators'}
                    open={modelOpen}
                    handleClose={handleModelClose}
                    maxWidth={'sm'}
                    fullWidth={true}
                >
                    <AddOperators closeDialog={handleModelClose}></AddOperators>
                </DialogCard>
            </div>
        </JobMainContainer>
    );
};
