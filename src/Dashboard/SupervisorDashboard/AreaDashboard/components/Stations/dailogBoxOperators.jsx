import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  InputAdornment,
  TextField,
  Tooltip,
  tooltipClasses,
} from '@mui/material';
import { useState } from 'react';
import styled from 'styled-components';
import closeIcon from '../../../../../assets/svg/closeIcon.svg';
import getInitialName from '../../../../../utils/getInitailName';
import { MaruSpanSkill } from '../../../SKillMatrix/skillMatrixTable/skillMatrixTable.style';
import {
  LabourCardPopUpMainBox,
  LabourNameText,
  LabourText,
  NameCard,
} from './Stations.styles';
import { LabourCardPopUp } from './dailogBoxOperator.styles';

const DialogBoxOperators = ({ offsetTittle, operatorData, onClose }) => {
  const [filteredOperator, setFilteredOperator] = useState(operatorData);
  const CustomTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      fontSize: '10px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '5px',
      backgroundColor: 'white',
    },
    [`& .${tooltipClasses.arrow}`]: {
      color: 'white',
    },
    [`& .${tooltipClasses.arrow}::before`]: {
      border: '1px solid #ccc',
      backgroundColor: '#ccc',
    },
  }));

  const handleFilterChange = (e) => {
    const searchQuery = e.target.value.toLowerCase();

    if (!searchQuery) {
      setFilteredOperator(operatorData);
    } else {
      const filteredData = operatorData?.filter(
        (operator) =>
          (operator?.staffName &&
            operator.staffName.toLowerCase().includes(searchQuery)) ||
          (operator?.staffId &&
            operator.staffId.toString().toLowerCase().includes(searchQuery))
      );

      setFilteredOperator(filteredData || []);
    }
  };

  return (
    <>
      <Box
        sx={{
          fontSize: '12px',

          backgroundColor: '#ffffff',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            pr: '1rem',
          }}
        >
          <Box>
            <p
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '10px',
                marginRight: '10px',
              }}
            >
              <MaruSpanSkill>{offsetTittle?.maruAAr}</MaruSpanSkill>
              <span style={{ fontWeight: 'bold', fontSize: '10px' }}>
                {offsetTittle?.name} L3 Operators
              </span>
            </p>
          </Box>
          <Box onClick={onClose}>
            <img
              src={closeIcon}
              alt=""
              style={{
                height: '15px',
                width: '15px',
                cursor: 'pointer',
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            minWidth: '208px',
            mt: '5px',
            mb: '15px',
          }}
        >
          <TextField
            placeholder="Search by Name, Staff ID"
            size="small"
            variant="outlined"
            onChange={handleFilterChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon
                    sx={{
                      fontSize: 22,
                      color: 'rgb(23, 28, 143)',
                    }}
                  />
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </Box>
        <LabourCardPopUpMainBox>
          {filteredOperator?.map((profileData, idx) => {
            return (
              <>
                <LabourCardPopUp>
                  <div
                    style={{
                      position: 'relative',
                      height: '40px',
                    }}
                  >
                    {profileData?.staffProfile ? (
                      <img
                        src={profileData.staffProfile}
                        alt={profileData.staffName}
                        style={{
                          width: '46px',
                          height: '40px',
                          borderRadius: '100%',
                          position: 'relative',
                        }}
                      />
                    ) : (
                      <NameCard>
                        {getInitialName(profileData?.staffName || 'N/A')}
                      </NameCard>
                    )}
                  </div>
                  <div
                    style={{
                      height: '100%',
                      marginTop: '4px',
                    }}
                  >
                    <CustomTooltip
                      title={
                        <span style={{ color: '#343536' }}>
                          {profileData?.staffName || ''}
                        </span>
                      }
                      arrow
                    >
                      <LabourNameText>
                        {profileData?.staffName || 'Unknown'}
                      </LabourNameText>
                    </CustomTooltip>
                    <LabourText>
                      {`${profileData?.staffId} | ${profileData?.staffLevel}` ||
                        'N/A'}
                    </LabourText>
                  </div>
                </LabourCardPopUp>
              </>
            );
          })}
        </LabourCardPopUpMainBox>
      </Box>
    </>
  );
};
export default DialogBoxOperators;
