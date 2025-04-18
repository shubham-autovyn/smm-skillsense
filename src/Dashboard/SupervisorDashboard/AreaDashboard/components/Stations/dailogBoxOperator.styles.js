import { Box } from '@mui/material';
import styled from 'styled-components';

export const LabourCardPopUp = styled(Box)({
  display: 'flex',
  gap: '10px',
  padding: '0 4px',
  width: '100%',
  maxWidth: '200px',
  minWidth: '140px',
  '& img': {
    margin: '0',
    width: '40px',
    borderRadius: '50%',
  },
});
