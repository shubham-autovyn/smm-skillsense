import { Box, Skeleton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MaruA from '../../../../../../assets/icons/MaruA.svg';
import MaruAAR from '../../../../../../assets/icons/MaruAAR.svg';
import MaruAR from '../../../../../../assets/icons/MaruAR.svg';
import NonMaru from '../../../../../../assets/icons/NonMaru.svg';
import download from '../../../../../../assets/icons/downloadIcon.svg';
import CustomAccordion from '../../../../../../components/Accordion/CustomAccordion';
import CustomStepper from '../../../../../../components/Stepper/CustomStepper';
import * as shopReducer from '../../../../../../redux/Reducers/SMMShopReducer';
import { handleDownloadExcel } from '../../../../../../utils/L0toL3Excel';
import StaffDetailsCard from '../JoineeDetails/StaffDetailsCard';
import L1ToL2Training from '../JoineeDetails/TrainingSteps/L1ToL2Training';
import L2ToL3Training from '../JoineeDetails/TrainingSteps/L2ToL3Training/L2ToL3Training';

const JoineeDetailsNew = ({
    joineeData,
    selectedStaffRow,
    handleStartTraining,
    operatorType,
}) => {
    const [testData, setTestData] = useState([]);
    const [activeStep, setActiveStep] = useState(0);
    const shop = useSelector(shopReducer.getShop);

    // useEffect(() => {
    //   fetchTestData();
    //   console.log("Data", dataTestDetails?.response);
    // }, [selectedStaffRow]);

    // const fetchTestData = async () => {
    //   if (shop?.id && selectedStaffRow?.staffID) {
    //     const level = activeStep === 0 ? "L1" : activeStep === 1 ? "L2" : "L3";
    //     const queryParams = new URLSearchParams({
    //       shopID: shop.id,
    //       staffID: selectedStaffRow.staffID,
    //       level: level,
    //       stationName: selectedStaffRow.stationName || "",
    //       OJTTrainingID:
    //         selectedStaffRow.OJTTrainingID || selectedStaffRow.ID || "",
    //     }).toString();

    //     try {
    //       const response = await fetchTestDetails(queryParams);
    //     } catch (error) {
    //       console.error("Error fetching test data:", error);
    //     }
    //   }
    // };

    useEffect(() => {
        if (selectedStaffRow) {
            setActiveStep(selectedStaffRow.currentLevel);
        }
    }, [selectedStaffRow]);

    useEffect(() => {
        if (activeStep === 0) {
            setTestData([{ currentLevel: 0, testID: 1 }]);
        } else {
            setActiveStep(0);
        }
    }, [selectedStaffRow]);

    const handleSubmitTest = (data, level, fileNamePath = {}) => {
        if (level === 'L3') {
            setActiveStep((prev) => prev + 1);
        }
    };

    const handleNext = (level) => {
        if (activeStep < 2) {
            setActiveStep((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        setActiveStep((prev) => prev - 1);
    };

    const getMaruIcon = (maruType) => {
        switch (maruType) {
            case 'A':
                return <img src={MaruA} alt="Maru A" width={18} height={16} />;
            case 'A/AR':
                return (
                    <img src={MaruAAR} alt="Maru A/AR" width={18} height={16} />
                );
            case 'AR':
                return (
                    <img src={MaruAR} alt="Maru AR" width={18} height={16} />
                );
            default:
                return (
                    <img src={NonMaru} alt="Non Maru" width={18} height={16} />
                );
        }
    };

    const getStepTitle = (step) => {
        switch (step) {
            case 0:
                return activeStep === 0 ? 'In Progress' : 'Completed';
            case 1:
                return activeStep === 1
                    ? 'In Progress'
                    : activeStep > 1
                    ? 'Completed'
                    : 'Not Started';
            case 2:
                return activeStep === 2
                    ? 'In Progress'
                    : activeStep > 2
                    ? 'Completed'
                    : 'Not Started';
            default:
                return 'Not Started';
        }
    };

    const steps = [
        {
            title: 'L0 - L1',
            subtitle: getStepTitle(0),
        },
        {
            title: 'L1 - L2',
            subtitle: getStepTitle(1),
        },
        {
            title: 'L2 - L3',
            subtitle: getStepTitle(2),
        },
    ];

    const RenderSteps = ({ step }) => {
        switch (step) {
            case 0:
                return (
                    <L1ToL2Training
                        handleNext={handleNext}
                        testData={testData}
                        handleSubmitTest={handleSubmitTest}
                        level="L1"
                        isMaru={selectedStaffRow?.maru}
                        selectedStaffRow={selectedStaffRow}
                    />
                );
            case 1:
                return (
                    <L1ToL2Training
                        handlePrev={handlePrev}
                        handleNext={handleNext}
                        testData={testData}
                        handleSubmitTest={handleSubmitTest}
                        level="L2"
                        isMaru={selectedStaffRow?.maru}
                        selectedStaffRow={selectedStaffRow}
                    />
                );
            case 2:
                return (
                    <L2ToL3Training
                        handlePrev={handlePrev}
                        handleNext={handleNext}
                        testData={testData}
                        handleSubmitTest={handleSubmitTest}
                        level="L3"
                        isMaru={selectedStaffRow?.maru}
                        selectedStaffRow={selectedStaffRow}
                    />
                );
            default:
                return null;
        }
    };

    const allStaff = [
        ...(joineeData?.newJoinee?.map((item) => ({
            staffName: item.staffName,
            staffID: item.staffID,
            processStation: (
                <Box
                    sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
                >
                    {getMaruIcon(item?.maru)}
                    {item?.stationName ? `${item.stationName} | ` : ''}
                    {item?.description || ''}
                </Box>
            ),
            currentLevel: item?.currentLevel,
            startDate: item?.startDate,
            ExhaustedDay: item?.ExhaustedDay,
            plannedDays: item?.plannedDays,
        })) || []),
        ...(joineeData?.existingOperator?.map((item) => ({
            staffName: item.staffName,
            staffID: item.staffID,
            processStation: (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {getMaruIcon(item?.maru)}
                    {item?.stationName ? `${item.stationName} | ` : ''}
                    {item?.description || ''}
                </Box>
            ),
            currentLevel: item.currentLevel,
            startDate: item.startDate,
            ExhaustedDay: item.ExhaustedDay,
            plannedDays: item.plannedDays,
        })) || []),
    ];

    const selectedStaff = allStaff.find(
        (staff) => staff.staffID === selectedStaffRow?.staffID
    );

    return (
        <>
            <Box
                sx={{
                    overflowY: 'scroll',
                    width: '80%',
                    p: 2,
                    height: 'calc(100%) !important',
                    scrollbarWidth: 'thin',
                }}
            >
                <Box>
                    <Box>
                        <CustomAccordion
                            titleComponent={
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1.5rem',
                                    }}
                                >
                                    <Typography variant="h4">
                                        {selectedStaff
                                            ? `${selectedStaff.staffName} | ${selectedStaff.staffID}`
                                            : 'Staff Details'}
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '1rem',
                                            cursor: 'pointer',
                                        }}
                                        onClick={handleDownloadExcel}
                                    >
                                        <img
                                            src={download}
                                            alt="Download Icon"
                                        />
                                        <Typography
                                            sx={{
                                                textDecoration: 'underline',
                                                fontSize: '12px',
                                            }}
                                        >
                                            Skill Evaluation & Approval Sheet
                                        </Typography>
                                    </Box>
                                </Box>
                            }
                        >
                            <StaffDetailsCard
                                selectedStaff={selectedStaff}
                                processStation={selectedStaff?.processStation}
                                currentLevel={selectedStaff?.currentLevel}
                                startDate={selectedStaff?.startDate}
                                ExhaustedDay={selectedStaff?.ExhaustedDay}
                                plannedDays={selectedStaff?.plannedDays}
                            />
                        </CustomAccordion>
                    </Box>
                    <Box>
                        <CustomStepper
                            steps={steps}
                            activeStep={activeStep}
                            disableLastStep={false}
                        />
                    </Box>
                </Box>

                <Box>
                    {testData.length === 0 ? (
                        <Skeleton
                            animation="wave"
                            variant="rectangular"
                            sx={{ width: '100%', height: 200 }}
                        />
                    ) : (
                        <Box sx={{ marginTop: '1rem' }}>
                            <RenderSteps step={activeStep} />
                        </Box>
                    )}
                </Box>
            </Box>
        </>
    );
};

export default JoineeDetailsNew;
