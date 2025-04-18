import { Box, Typography } from '@mui/material';
import styled from 'styled-components';

export const MainContainer = styled(Box)({
  padding: '20px 70px 0px 70px',
  backgroundColor: '#F4F5F8',
  // height: "100%",
});
export const MainHeading = styled(Typography)({
  fontSize: 20,
  color: '#343536',
  fontWeight: 600,
  fontFamily: 'Roboto',
  marginTop: '25 px',
});
export const SecondHeading = styled(Typography)({
  fontSize: 14,
  color: '#343536',
  fontWeight: 400,
  margin: '20px 0px 15px 0px',
});
export const TabContainer = styled(Box)({
  display: 'flex',
  marginRight: '2px',
  marginLeft: '2px',
  marginTop: '10px',
  height: '80%',
  gap: '20px',
});
export const TableManagement = styled(Box)({
  width: '80%',
  border: '8px solid #e6e9fo',
  borderRadius: '8px',
  overflow: 'auto',
  marginTop: '2',
  backgroundColor: '#ffffff',
});
export const TableDrop = styled(Box)({
  width: '20%',
  height: '365px',
  border: '1px solid #e6e9fo',
  textAlign: 'center',
  backgroundColor: '#ffffff',
  overflow: 'auto',
});
export const TableDropName = styled(Typography)({
  fontWeight: '600',
  fontSize: '12px',
  padding: '19px',
});
export const TableDropList = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
  padding: '10px',
  flexDirection: 'column',
});
export const TableDropFirstDetails = styled(Box)({
  width: '150px',
  height: '44px',
  border: '1px solid #9598a1',
  borderStyle: 'dashed',
  borderRadius: '30px',
  display: 'flex',
  alignItems: 'center',
  gap: '3px',
  padding: '0 3px',
});
export const TableDropSecondDetails = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  width: '163px',
  height: '44px',
  top: '13px',
  left: '382px',
  gap: '10px',
  border: '1px solid #171c8f',
  borderStyle: 'dashed',
  borderRadius: '30px',
});
export const TableDropSecondName = styled(Typography)({
  margin: 'auto',
  color: '#171caf',
});

export const ButtonGrp = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '10px',
  // paddingTop: "20px",
  paddingBottom: '5px',
  marginTop: '20px',
  position: 'relative',
  flexWrap: 'wrap',
});
export const TableImg = styled('img')({
  width: '36px',
  height: '36px',
});
export const TableBoxDeatils = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});
export const TableNames = styled(Typography)({
  margin: 0,
  minWidth: 'auto',
  maxWidth: '95px',
  fontWeight: '400',
  fontSize: 9,
  color: '#343536',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});
export const TableIdLevel = styled(Typography)({
  margin: 0,
  fontWeight: '400',
  fontSize: 8,
  color: '#66696b',
});
export const TraineeBox = styled(Box)({
  width: '150px',
  height: '44px',
  borderRadius: '30px',
  display: 'flex',
  alignItems: 'center',
  border: '1px dashed #171c8f',
  justifyContent: 'space-around',
  cursor: 'pointer',
});
export const TraineeP = styled('p')({
  color: '#171c8f',
  margin: '0',
  fontSize: '12px',
  fontWeight: '400',
});

export const ConfirmBox = styled(Box)({
  padding: '10px 14px',
  width: '400px',
});
export const ProcessStations = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
});
export const ProcessIcons = styled(Box)({
  border: '1px solid #374957',
  borderRadius: '50%',
  width: 28,
  height: 18,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 16,
  flexDirection: 'row',
});
export const ProcessP = styled(Typography)({
  fontWeight: '600',
  fontSize: '10px',
});
export const ProcessSpan1 = styled('span')({
  fontWeight: '700',
  fontSize: '14px',
});
export const ProcessSpan2 = styled('span')({
  fontWeight: '400',
  fontSize: '14px',
});
export const MainOperatorBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  width: '150px',
  gap: '10px',
  border: '1px dashed grey',
  borderRadius: '30px',
  padding: '5px 10px',
});
export const MainOprImg = styled('img')({
  width: '36px',
});
export const MainOprDetails = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});
export const MainOprSapn = styled('span')({
  fontWeight: '400',
  fontSize: 12,
  color: '#343536',
});
export const MainOprSapn1 = styled('span')({
  fontWeight: '400',
  fontSize: 11,
  color: '#66696b',
});
export const TraineeBoxx = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  top: '13px',
  cursor: 'pointer',
  left: '382px',
  gap: '10px',
});
export const TranieeAssign = styled(Box)({
  width: '150px',
  height: '44px',
  border: '1px solid #171c8f',
  borderStyle: 'dashed',
  borderRadius: '30px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
export const TranieeP = styled(Typography)({
  color: '#171c8f',
  margin: '0',
});
export const IconUpdate = styled(Box)({
  border: '1px solid grey',
  borderRadius: '50%',
  width: 28,
  height: 18,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 16,
  flexDirection: 'row',
});

export const SBMain = styled(Box)({
  paddingBottom: '10px',
});
export const InputBox = styled.input`
  outline: none;
  border: 1px solid black;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 400;
  color: #343536;
  background-color: transparent;
  margin: 0px 0px 10px 0px;
  padding: 5px 8px;
  width: 260px;
  transition: border 0.2s ease-in-out; /* Smooth transition */

  &:input:focus {
    border: 1px solid black !important;
  }
`;
export const SearchBox = styled(Box)({
  padding: '0 10px',
  minWidth: '208px',
});

export const TraineeApart = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  minHeight: '56px',
  cursor: 'pointer',
  width: '100%',
  justifyContent: 'space-between',
});
export const OptDetails = styled(Box)({
  display: 'flex',
  gap: '10px',
});
export const OptImg = styled('img')({
  width: '36px',
  height: '36px',
});
export const OptNameId = styled(Box)({
  marginTop: '4px',
  marginLeft: '2px',
});
export const Optname = styled(Typography)({
  margin: 0,
  fontWeight: '400',
  fontSize: 12,
  color: '#343536',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});
export const OptIdLevel = styled(Typography)({
  margin: 0,
  fontWeight: '400',
  fontSize: 11,
  color: '#66696b',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});
export const UpdateCheck = styled(Box)({
  display: 'flex',
  gap: '10px',
});
export const Update = styled('span')({
  color: '#343536',
  fontWeight: '400',
  fontSize: '11px',
  borderRadius: '8px',
  backgroundColor: '#F1BE424A',
  padding: '0 10px',
  marginLeft: '18px',
  position: 'relative',
  zIndex: 200,
});
export const CheckBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});
export const CheckBoxMain = styled(Box)({
  padding: 0,
  width: '20px',
  height: '20px',
});
export const CheckImg = styled('img')({
  width: '16px',
  height: '16px',
  objectFit: 'contain',
});
export const BtnsAll = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '10px',
  padding: '9px 15px',
  position: 'sticky',
  bottom: '0',
  zIndex: 10,
});

export const AdditionalOperatorId = styled(Box)({
  color: '#66696B',
  fontSize: '11px',
  fontWeight: '600',
});
export const AdditionalOperatorName = styled(Box)({
  color: '#343536',
  fontSize: '12px',
  fontWeight: '600',
});
export const AdditionalOperatorsTotalSpan = styled('span')({
  color: '#343536',
  fontSize: '12px',
  fontWeight: '700',
});
export const AdditionalOperatorsInfo = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  // marginTop: "10px",
  padding: '0 10px',
});
export const AdditionalOperators = styled(Box)({
  padding: '20px 0px',
});
export const AdditionalOperatorsPHeading = styled('p')({
  fontSize: '14px',
  fontWeight: '600',
  backgroundColor: '#cfd2d9',
  margin: '0',
  padding: '10px',
});
export const AdditionalOperatorsTotal = styled('p')({
  padding: '0px 10px',
  fontSize: '12px',
  fontWeight: '600',
  color: '#66696b',
});
export const AssignedP = styled('p')({
  padding: '5px 0px',
  margin: '0',
  fontSize: '10px',
  fontWeight: '600',
  color: '#66696b',
});
export const SurplusP = styled('p')({
  // padding: "0px 10px",
  fontSize: '10px',
  fontWeight: '600',
  color: '#66696b',
});
export const SurplusSpan = styled('span')({
  color: '#343536',
  fontSize: '12px',
  fontWeight: '700',
});
export const LabourBox = styled(Box)({
  display: 'flex',
  gap: '10px',
  height: '100%',
  alignItems: 'center',
});
export const LabourCard = styled(Box)({
  display: 'flex',
  gap: '5px',
  alignItems: 'center',
  backgroundColor: '#DFF6DD',
  border: '1px solid #30C0304D',
  borderRadius: '50px',
  height: '70%',
  padding: '5px 7px',
  '& p': {
    height: '15px',
  },
  '& img': {
    margin: '0',
    width: '30px',
    borderRadius: '50%',
  },
});
export const SurplusInfo = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  marginTop: '10px',
  padding: '0 10px',
});
export const SurplusName = styled(Box)({
  color: '#343536',
  fontSize: '12px',
  fontWeight: '600',
});
export const SurplusId = styled(Box)({
  color: '#66696B',
  fontSize: '11px',
  fontWeight: '600',
});
export const AssignedSpan = styled('span')({
  color: '#343536',
  fontSize: '12px',
  fontWeight: '700',
});
export const AsidName = styled(Box)({
  color: '#343536',
  fontSize: '12px',
  fontWeight: '600',
});
export const OpsInfo = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  padding: '0 10px',
});
export const NewjoneeBox = styled(Box)({
  backgroundColor: '#E8E8F4',
  boxShadow: '0px 3.2px 7.2px 0px #00000021',
  boxShadow: '0px 0.6px 1.8px 0px #0000001A',
  fontSize: '14px',
  fontWeight: '600',
  lineHeight: '20px',
  padding: '5px',
  marginTop: '10px',
});
export const RelieversBox = styled(Box)({
  display: 'flex',
  gap: '10px',
  flexDirection: 'column',
});
export const NavigateHeading = styled(Box)({
  display: 'flex',
  gap: '10px',
});
export const NewjoineeInnerBox1 = styled(Box)({
  marginBottom: '10px',
  display: 'flex',
  alignItems: 'center',
  overflow: 'auto',
  scrollbarWidth: 'none',
  width: '100%',
  justifyContent: 'space-between',
});
export const NewjoineeInnerBoxButton1 = styled.button`
  height: 50px;
  width: 18px;
  padding-right: 8px;
  position: sticky;
  left: 0px;
  background-color: #e8e8f4;
  border: none;
  cursor: pointer;
`;
export const NewjoineeInnerBoxButton2 = styled.button`
  height: 50px;
  width: 23px;
  padding-left: 10px;
  position: sticky;
  right: 0px;
  background-color: #e8e8f4;
  border: none;
  cursor: pointer;
`;

export const TableDropInnerBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  fontSize: '16px',
  backgroundColor: '#9C9ECA',
  color: '#fff',
  fontWeight: '700',
  overflow: 'auto',
});
