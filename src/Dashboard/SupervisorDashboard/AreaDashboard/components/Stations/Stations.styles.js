import { Box, Button, darken, lighten, Typography } from '@mui/material';
import styled from 'styled-components';
import { DataGridTable } from '../../../../../components/Data-table/dataTable.styles';

export const WorkBox = styled(Box)({
  width: '182px',
  height: '68px',
  padding: '8px 16px 8px 16px',
  border: '1px solid #E6E9F0',
  borderRadius: '8px',
  backgroundColor: '#E8E8F4',
});

export const Header = styled(Typography)({
  fontSize: '14px',
  fontWeight: 600,
  marginBottom: '15px',
  height: '20px',
});

export const Para = styled(Typography)({
  fontSize: '24px',
  fontWeight: 600,
  margin: '0',
});

export const SearchBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#F4F5F8',
  marginTop: '10px',
  borderRadius: '8px',
  height: '38px',
  padding: '10px',
});

export const StationsText = styled(Typography)({
  fontSize: '14px',
  fontWeight: 600,
  margin: '0',
  color: '#343536',
});

export const getBackgroundColor = (color, theme, coefficient) => ({
  backgroundColor: darken(color, coefficient),
  ...theme.applyStyles('light', {
    backgroundColor: lighten(color, coefficient),
  }),
});

export const StyledDataGrid = styled(DataGridTable)(() => ({
  border: '0px solid !important',
  height: '52vh',
  width: '100%',
  overflow: 'auto',

  '& .MuiDataGrid-columnHeaders': {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: '12px',
  },

  '& .MuiDataGrid-columnHeader': {
    borderBottom: 'none !important',
  },

  '& .MuiDataGrid-row': {
    backgroundColor: '#F4F5F8',
    marginBottom: '10px',
    borderRadius: '8px',
    alignItems: 'center',
    height: '100% !important',
    maxHeight: '100px !important',
    minHeight: '52px !important',
    display: 'flex',
  },
  '& .MuiDataGrid-cell': {
    borderTop: 'none !important',
    padding: '8px',
    height: '100% !important',
    gap: '4px',
    display: 'flex',
    flexDirection: 'column',
  },

  '& .MuiDataGrid-columnHeaderTitle': {
    fontWeight: 'bold',
  },
}));

export const LabourCard = styled(Box)({
  display: 'flex',
  gap: '10px',
  backgroundColor: '#DFF6DD',
  border: '1px solid #30C0304D',
  borderRadius: '50px',
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
export const TraineeCard = styled(Box)({
  display: 'flex',
  gap: '10px',
  backgroundColor: '#f3e5c3',
  border: '1px solid #f3dca6',
  borderRadius: '50px',
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

export const LabourText = styled(Typography)({
  fontSize: '11.5px',
  margin: '0',
  color: '#343536',
  fontWeight: 400,

  '@media (max-width: 600px)': {
    fontSize: '10px',
  },
});

export const LabourNameText = styled(Typography)({
  fontSize: '11px',
  margin: '0',
  color: '#343536',
  fontWeight: 400,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: 'flow',
  alignItems: 'center',
  width: '100%',
  maxWidth: '130px',
  height: '20px',

  '@media (max-width: 600px)': {
    fontSize: '10px',
    width: '80px',
    maxWidth: '80px',
  },
});

export const LevelThree = styled(Box)({
  height: '100%',
  '& img': {
    margin: '0',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
  },
  '& ul': {
    display: 'flex',
  },
  '& li': {
    listStyleType: 'none',
    marginRight: '-10px',
    height: '40px',
  },
});
export const LevelFour = styled(Box)({
  height: '100%',
  '& img': {
    margin: '0',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
  },
  '& ul': {
    display: 'flex',
  },
  '& li': {
    listStyleType: 'none',
    marginRight: '-10px',
    height: '40px',
  },
});

export const InputBox = styled('input')({
  outline: 'none',
  border: '1px solid #cfd2d9',
  borderRadius: '4px',
  fontSize: '14px',
  fontWeight: 400,
  color: '#343536',
  backgroundColor: 'transparent',
  padding: '4px 8px',
  width: '240px',
  margin: '0',
});

export const DownloadTableButton = styled(Button)({
  '&.MuiButton-outlined': {
    padding: '7px !important',
    minWidth: '20px',
    border: 'none',
  },
});

export const FooterText = styled(Typography)({
  fontSize: '16px',
  margin: '0',
  color: '#000000',
  fontWeight: 600,
});

export const FooterSecondaryText = styled(Typography)({
  fontSize: '13px',
  margin: '0',
  color: '#66696B',
  fontWeight: 400,
});

export const TooltipIcon1 = styled.img`
  width: 20px;
  height: 20px;
  position: absolute;
  transform: rotate(90deg);
  left: -15px;
  bottom: 30px;
  z-index: 9;
`;

export const TooltipIcon2 = styled.img`
  width: 20px;
  height: 20px;
  position: absolute;
  transform: rotate(-90deg);
  right: -15px;
  bottom: 30px;
  z-index: 9999999;
`;
export const NameCard = styled(Box)({
  width: '35px',
  height: '35px',
  borderRadius: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '14px',
  fontWeight: 'bold',
  backgroundColor: 'rgb(88, 165, 92)',
  color: '#ffffff',
  overflow: 'hidden',
  position: 'relative',
  marginTop: '2.3px',
});
export const TraineeNameCard = styled(Box)({
  width: '35px',
  height: '35px',
  borderRadius: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '14px',
  fontWeight: 'bold',
  backgroundColor: '#f1be42',
  color: '#ffffff',
  overflow: 'hidden',
  position: 'relative',
  marginTop: '2.3px',
});

export const CustomTooltipStyle = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  gap: '5px',
  justifyContent: 'center',
  alignItems: 'center',
});
export const LabourCardPopUpMainBox = styled(Box)({
  overflow: 'auto',
  height: '100%',
  minHeight: '50px',
  maxHeight: '200px',
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
  scrollbarColor: '#c4c4c4 #f0f0f0',
  scrollbarWidth: 'thin',
});
