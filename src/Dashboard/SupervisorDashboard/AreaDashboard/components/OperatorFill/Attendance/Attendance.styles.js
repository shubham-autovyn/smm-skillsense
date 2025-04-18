import { Box } from '@mui/material';
import styled from 'styled-components';

export const SummaryMainBox = styled(Box)({
  width: '100%',
  backgroundColor: '#f4f5f8',
  fontSize: '12px',
  display: 'flex',
  gap: 2,
  marginTop: 2,
  marginBottom: 2,
  borderRadius: 2,
});

export const DataGridTableMainBox = styled(Box)({
  height: '47vh',
  width: '100%',
  overflow: 'auto',
  border: '1px solid #e0e0e0',
  borderRadius: 2,
  '& .absent-cell': {
    color: '#F44336',
  },
});
