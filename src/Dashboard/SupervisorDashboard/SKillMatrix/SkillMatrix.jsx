import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  ContainerHeading,
  FlexBoxMatrix,
  SkillMatrixBox,
  SkillMatrixContainer,
  TimerHeading,
} from './SkillMatrix.style';

import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';
import SkillMatrixTable from './skillMatrixTable/skillMatrixTable';
// import ArrowTooltips from "./skillMatrixTable/Tooltip/Tooltip";

const SkillMatrix = () => {
  const supervisorHierarchy = JSON.parse(localStorage.getItem('dataHierarchy'));
  const firstDiv = 'firstDiv';
  const secondDiv = 'secondDiv';
  const [totalCount, setTotalCount] = useState(0);
  const [lastUpdateTime, setLastUpdateTime] = useState(0);
  const handleTotalCount = (count) => {
    setTotalCount(count[0]);
    setLastUpdateTime(count[1]);
  };

  // const handleTooltipOpen = () => {
  //   setOpen(true);
  // };

  // const handleTooltipClose = () => {
  //   setOpen(false);
  // };

  const navigate = useNavigate();

  // Function to handle the search input change
  const handleNavigation = () => {
    navigate('/SMM/TrainingPlan');
  };

  return (
    <>
      <SkillMatrixContainer>
        <FlexBoxMatrix
          sx={{
            backgroundColor: '#FBECC8',
            color: '#343536',
            Font: 'Roboto',
            fontSize: '14px',
            Weight: '400',
            Size: '14px',
            LineHeight: '16px',
            Letter: '-2.5%',
            padding: '8px',
            borderRadius: '4px',
          }}
        >
          Approval is needed for one or more planned trainings. To review and
          submit the consolidated training plan for approval, please go to the
          Multi-Skilling Training Plan.
        </FlexBoxMatrix>
        <SkillMatrixBox>
          <ContainerHeading>
            Skill Matrix - {supervisorHierarchy?.shopName}, Line-
            {supervisorHierarchy?.line}, {supervisorHierarchy?.area}
            <TimerHeading sx={{ marginLeft: '10px' }}>
              Last updated on: {lastUpdateTime}
            </TimerHeading>
          </ContainerHeading>

          <div>
            <PrimaryButton onClick={handleNavigation}>
              View Multi-Skilling Training Plan
            </PrimaryButton>
          </div>
        </SkillMatrixBox>

        <div>
          <SkillMatrixTable
            handleTotalCount={handleTotalCount}
          ></SkillMatrixTable>
        </div>
      </SkillMatrixContainer>
    </>
  );
};

export default SkillMatrix;
