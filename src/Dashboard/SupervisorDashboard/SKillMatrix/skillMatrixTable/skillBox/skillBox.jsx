import {
  Alert,
  Backdrop,
  Box,
  CircularProgress,
  IconButton,
  Snackbar,
} from '@mui/material';
import Add from '../../../../../assets/svg/fi-rr-add.svg';
import EditPlan from '../../../../../assets/svg/fi-rr-pencil.svg';

import { useState } from 'react';
import SecondaryButton from '../../../../../../src/utils/Buttons/SecondaryButton/SecondaryButton';
import CloseIcon from '../../../../../assets/svg/closeIcon.svg';
import FilterSelectInput from '../../../../../components/FilterSelectInput/FilterSelectInput';
import PrimaryButton from '../../../../../components/PrimaryButton/PrimaryButton';
import TooltipComponent from '../../../../../components/ToolTip/ToolTip';
import useUpdateTrainingPlan from '../../../hooks/updateTrainingPlan';
import { SubmitPopHeading } from '../skillMatrixTable.style';

const skillColors = {
  1: '#ffffff',
  2: '#30C030',
  3: '#e8c46b',
  4: '#30C030',
  // 5: "#F1BE42",
};

const SkillBoxComponent = ({
  skillLevel,
  tooltip,
  index,
  staffId,
  isPlanned,
  stationData,
  fetchMatrixData,
}) => {
  const numbers = [4, 1, 3, 2];
  const colors = Array(4).fill(skillColors[1]);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipBoxOpen, setTooltipBoxOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [plaAnchorEl, setPlanAnchorEl] = useState(null);
  const [tooltipId, setTooltipId] = useState(null);
  const [updateTrainingLoader, setUpdateTrainingLoader] = useState(false);

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [responseData, setResponseData] = useState(null);

  const { updateTrainingPlan } = useUpdateTrainingPlan();

  const handleOpenTooltipBox = (event, SkillIndex) => {
    if (SkillIndex === index) {
      setPlanAnchorEl(event.currentTarget);
      setTooltipBoxOpen(true); // Set the active tooltip ID
    }
  };

  const handleCloseTooltip = () => {
    setTooltipOpen(false);
    setAnchorEl(null);
  };
  const handleCloseTooltipBox = () => {
    setTooltipBoxOpen(false); // Close any active tooltip
    setAnchorEl(null);
  };

  if (skillLevel === 2) {
    colors[1] = colors[3] = skillColors[2];
  } else if (skillLevel === 3) {
    colors[0] = skillColors[1];
    colors[1] = colors[2] = colors[3] = skillColors[3];
  } else if (skillLevel === 4) {
    colors.fill(skillColors[4]);
  }

  // const getColorsForSkillLevel = () => {
  //   if (skillLevel === 2) {
  //     return [skillColors[1], skillColors[2], skillColors[2], skillColors[1]];
  //   } else if (skillLevel === 3) {
  //     return [skillColors[1], skillColors[3], skillColors[3], skillColors[3]];
  //   } else if (skillLevel === 4) {
  //     return Array(4).fill(skillColors[4]);
  //   }
  //   return colors; // Default color
  // };

  // const colorsForSkillLevel = getColorsForSkillLevel();
  const allGreen = colors.every((color) => color === skillColors[4]);
  // const allWhite = colors.every((color) => color === skillColors[1]);

  // const allGreen = colors.every((color) => color === skillColors[4]);

  // Handle Tooltip Open/Close
  const handleMouseEnter = (event) => {
    if (allGreen) {
      setAnchorEl(event.currentTarget);
      setTooltipOpen(true);
    }
    // else if (allWhite) {
    //   setAnchorEl(event.currentTarget);
    //   setTooltipOpen(true);
    // }
  };

  const handleMouseLeave = () => {
    setTooltipOpen(false);
    setAnchorEl(null);
  };
  const onMouseClick = () => {
    setTooltipOpen(false);
    setAnchorEl(null);
  };

  const tooltipPosition = skillLevel % 2 === 0 ? 'right' : 'left';

  const fullBoxFill = (tooltipValues) => {
    return (
      <Box style={{ fontSize: '12px' }}>
        {tooltipValues?.map((res, index) => (
          <div style={{ color: '#343536', padding: '8px' }} key={index}>
            <p>
              <strong>Level:</strong> {res?.level}
            </p>
            <p>
              {' '}
              <strong>Planned:</strong> {res?.level === 3 ? 'April' : 'May'}
            </p>
            <p>
              {' '}
              <strong>Actual:</strong>{' '}
              {res?.level === 3 ? '01/04/23 - 14/04/23' : '01/05/23 - 14/04/23'}
            </p>
            <p>
              <strong>Trainer:</strong> {res?.trainer ? res?.trainer : ''}
            </p>
          </div>
        ))}
      </Box>
    );
  };

  const TooltipBoxFill = () => {
    // const [isTooltipVisible, setIsTooltipVisible] = useState(true); // State to control tooltip visibility
    const [month, setMonth] = useState(1);

    const getMonth = async () => {
      switch (month) {
        case 1:
          return 'January';
        case 2:
          return 'February';
        case 3:
          return 'March';
        case 4:
          return 'April';
        case 5:
          return 'May';
        case 6:
          return 'June';
        case 7:
          return 'July';
        case 8:
          return 'August';
        case 9:
          return 'September';
        case 10:
          return 'October';
        case 11:
          return 'November';
        case 12:
          return 'December';
        default:
          return 'January';
      }
    };
    const getMonths = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const handleSubmit = async () => {
      setUpdateTrainingLoader(true);
      try {
        handleCloseTooltipBox();
        let selectedMonth = await getMonth();

        if (selectedMonth) {
          const payload = {
            staffId: staffId,
            supervisorId: localStorage.getItem('supervisorId'),
            stationName: stationData?.stationName,
            stationDescription: stationData?.stationDescription,
            level: [0, 1, 2].includes(skillLevel) ? 3 : 4,
            month: selectedMonth,
          };
          const response = await updateTrainingPlan(payload);
          setResponseData(response);
        }
      } catch (error) {
        setIsAlertOpen(true);
        setTimeout(() => {
          setIsAlertOpen(false);
        }, 6000);
      } finally {
        fetchMatrixData();
        setUpdateTrainingLoader(false);

        setIsAlertOpen(true);

        setTimeout(() => {
          setIsAlertOpen(false);
        }, 6000);
      }
    };

    return (
      <div style={{ display: 'block' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0px 0 10px 0',
          }}
        >
          <SubmitPopHeading>Plan Training</SubmitPopHeading>
          <IconButton
            onClick={() => handleCloseTooltipBox()}
            aria-label="Close dialog"
          >
            <img src={CloseIcon} alt="close" />
          </IconButton>
        </div>
        <div style={{ padding: '10px', width: '200px' }}>
          <label
            style={{
              fontSize: '12px',
              color: '#7A7C7E',
              fontWeight: '600',
            }}
          >
            Select Month
          </label>
          <FilterSelectInput
            label="Select"
            name="Select"
            onChange={(e) => setMonth(Number(e?.target?.value) + 1)}
            options={getMonths}
            value={month}
          />
        </div>

        <hr />
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '10px',
            marginTop: '20px',
          }}
        >
          <div>
            <SecondaryButton onClick={() => handleCloseTooltipBox()}>
              Cancel
            </SecondaryButton>
          </div>
          <div>
            <PrimaryButton
              backgroundColor="#171C8F"
              textColor="#fff"
              onClick={() => handleSubmit()}
            >
              Plan Training
            </PrimaryButton>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Snackbar
        open={isAlertOpen}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={responseData?.responseCode === 200 ? 'success' : 'error'}
          variant="filled"
          sx={{ width: '100%', fontSize: '14px' }}
        >
          {responseData?.responseCode === 200
            ? 'Update Plan Successfully'
            : responseData?.message}
        </Alert>
      </Snackbar>
      <Backdrop
        sx={(theme) => ({
          color: '#fff',
          zIndex: theme.zIndex.drawer + 1,
        })}
        open={updateTrainingLoader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        display="grid"
        gridTemplateColumns="repeat(2, 1fr)"
        gridTemplateRows="repeat(2, 1fr)"
        width="100%"
        height="100%"
        sx={{
          position: 'relative',
          '&:hover': {
            bgcolor: 'red',
            cursor: 'pointer',
            '& .hoverContent': {
              opacity: 1,
              visibility: 'visible',
            },
          },
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {numbers.map((number, index) => (
          <Box
            key={index}
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgcolor={colors[index]}
            color="#000"
            fontSize="12px"
            padding="7px"
            sx={{
              border: '1px solid #E6E9F0',
              width: '100%',
              height: '100%',
              padding: '8px 12px',
              position: 'relative',
            }}
          >
            {number}
          </Box>
        ))}
        {skillLevel !== 4 &&
          (isPlanned ? (
            <Box
              className="hoverContent"
              onClick={(e) => handleOpenTooltipBox(e, index)}
            >
              <span style={{ marginRight: '5px' }}>
                <img src={EditPlan} alt="EditPlan icon" />
              </span>
              <span>Edit Plan</span>
            </Box>
          ) : (
            <Box
              className="hoverContent"
              onClick={(e) => handleOpenTooltipBox(e, index)}
            >
              <span style={{ marginRight: '5px' }}>
                <img src={Add} alt="Add icon" />
              </span>
              <span>Plan Training</span>
            </Box>
          ))}
      </Box>
      {tooltipId === `tooltip-${index}`}
      <TooltipComponent
        anchorEl={plaAnchorEl}
        title={<TooltipBoxFill tooltipValues={tooltip} />}
        onClose={handleCloseTooltipBox}
        width={'300px'}
        open={tooltipBoxOpen}
      />

      <Box>
        <TooltipComponent
          anchorEl={anchorEl}
          title={fullBoxFill(tooltip)}
          position={tooltipPosition}
          open={tooltipOpen}
          // onClose={handleCloseTooltip}
          // open={tooltipOpen}
          onClose={handleMouseLeave}
        />
      </Box>
      {/* <Box>
      <TooltipComponent
        anchorEl={anchorEl}
        title={inputBoxFill()}
        position={tooltipPosition}
        open={tooltipOpen}
       
        onClose={onMouseClick}      />
    </Box> */}
    </>
  );
};

export default SkillBoxComponent;
