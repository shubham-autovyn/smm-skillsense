import { Box, Table, TableCell, Typography } from '@mui/material';
import styled from 'styled-components';

export const TableCells = styled(TableCell)({
  fontSize: '11px !important',
  lineHeight: 'normal',
  padding: '0px !important',
  width: '5.333%',
  borderRight: '1px solid rgba(224, 224, 224, 1)',
});

export const StationsText = styled((Typography.variant = 'h3'))({
  fontSize: '12px',
  margin: '0',
  color: '#66696B',
  width: '65px',
  textAlign: 'center',
});
export const HeaderText = styled((Typography.variant = 'h3'))({
  fontSize: '13px',
  margin: '0',
  width: '45px',
  fontWeight: 600,
  textAlign: 'center',
  lineHeight: '1.8rem',
});
export const DateHeaderText = styled((Typography.variant = 'h3'))({
  fontSize: '13px',
  margin: '0',
  fontWeight: 600,
  padding: '10px',
});

export const DateHeaderTextSpan = styled.span({
  color: '#66696B',
});

export const FooterPara = styled((Typography.variant = 'h3'))({
  fontSize: '14px',
  margin: '0',
  textAlign: 'center',
  fontWeight: 300,
  color: '#4a4b4d',
});
export const FooterDetailPara = styled((Typography.variant = 'h3'))({
  fontSize: '14px',
  margin: '0',
  wordSpacing: '10px',
  marginLeft: '4px',
  textAlign: 'center',
  fontWeight: 300,
  color: '#4a4b4d',
});

export const FlexBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});
export const LastApproval = styled((Typography.variant = 'h3'))({
  color: 'gray',
  display: 'inline',
  padding: '10px',
  //styleName: Roboto/12;
  fontSize: '12px',
  fontWeight: '400',
  lineHeight: '14.06px',
  letterSpacing: '-0.025em',
  fontFamily: 'Roboto',
});
export const MainHeading = styled((Typography.variant = 'h2'))({
  display: 'inline',
  padding: '10px',
  //styleName: Roboto Semibold / 24;

  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '28.13px',
  letterSpacing: '-0.025em',
  fontFamily: 'Roboto',
});
export const FlexAlignBox = styled(Box)({
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
});

export const FlexBetweenBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#e6e9f0',
  padding: '10px 15px',
  marginTop: '15px',
  borderRadius: '8px',
  fontSize: '12px',
});

export const FlexData = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  fontSize: '8px !important',
  paddingTop: '10px',
});
export const MainContainer = styled(Box)({
  backgroundColor: ' #f3f3f3',
  padding: '16px 24px',
  fontFamily: 'Roboto Semibold',
  maxHeight: '100%',
});
export const SubContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px',
});
export const SubContainer2 = styled(Box)({
  backgroundColor: ' #f3f3f3',
  maxHeight: '400px',
  overflow: 'auto',
  borderRadius: '8px',
});

export const YellowBall = styled.span`
  background: #f1be42;
  border-radius: 100%;
  width: 10px;
  height: 10px;
  display: inline-block;
  margin-right: 5px;
`;
export const BlueBall = styled.span`
  background: #9ebdf9;
  border-radius: 100%;
  width: 10px;
  height: 10px;
  display: inline-block;
  margin-right: 5px;
`;
export const GreenBall = styled.span`
  background: #30c030;
  border-radius: 100%;
  width: 10px;
  height: 10px;
  display: inline-block;
  margin-right: 5px;
`;

export const TableData = styled(Box)({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  height: '100%',
  border: '1px solid #ccc',
  fontWeight: '400',
});

export const TableDataNo = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#000',
  fontSize: '14px',
  // border: "1px solid #E6E9F0",
  width: '100%',
  height: '100%',
});

export const TableBg = styled(Table)({
  border: '1px solid #E6E9F0',
  backgroundColor: 'white',
  whiteSpace: 'nowrap',
});
export const TableCellsStyle = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#97999B',
  fontSize: '14px',
  borderBottom: '1px solid #E6E9F0',
  width: '100%',
  height: '100%',
  padding: '7px 10px',
});
export const TableCellsStyle2 = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#97999B',
  fontSize: '14px',
  // border: "1px solid #E6E9F0",
  width: '100%',
  height: '100%',
  padding: '7px 10px',
});

export const TableFooterNumBox = styled(Box)({
  position: 'absolute',
  top: '17px',
  right: '17px',
});
export const TblCell = styled(Box)({
  '&.table-cell-custom': {
    width: 'calc(100% /2)',
    display: 'inline-block',
  },
});
