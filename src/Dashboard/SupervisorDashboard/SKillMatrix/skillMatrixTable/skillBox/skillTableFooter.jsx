import { Box, Typography } from '@mui/material';
import { TableText } from '../skillMatrixTable.style';

const SkillTableFooter = ({ secondDiv }) => {
  const operators = [
    {
      name: 'MR. ISHWAR SINGH',
      staffId: '134058',
      level: 'MA15',
      profileImage: '',
      relievingDate: '30-12-2034',
      days_until_relieving: null,
      stationWiseData: [
        {
          current_level: 4,
          toolTipData: [
            {
              level: 3,
              start_date: '13',
              end_date: null,
            },
            {
              level: 4,
              start_date: '14',
              end_date: null,
            },
          ],
        },
        {
          current_level: 1,
          toolTipData: [
            {
              level: 3,
              start_date: null,
              end_date: null,
            },
            {
              level: 4,
              start_date: null,
              end_date: null,
            },
          ],
        },
      ],
    },
  ];
  const stationsData = [
    {
      station_name: '2R',
      stationDescription: 'DECK MTG.',
      current_level: 1,
      maruAAr: null,
      retaining_due_date: null,
      last_deployment_date: null,
      operator_skilled_at_station: null,
      wis_mos_form: null,
      operator_trainee_sheet: null,
      l4_test: null,
      skill_evaluation_sheet: null,
    },
  ];
  return (
    <Box
      id={secondDiv}
      display="flex"
      alignItems="center"
      gap="2px"
      padding="10px 0px 10px 5px"
      width="100%"
      sx={{
        backgroundColor: '#f4f5f8',
        flexWrap: 'Nowrap',
      }}
    >
      <Box display="flex" alignItems="center" gap="5px">
        <TableText variant="h4" sx={{ width: '70px' }}>
          Station Type:
        </TableText>
        <Box display="flex" alignItems="center" gap="2px">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="22px"
            height="18px"
            border="1px solid black"
            borderRadius="60%"
          >
            <TableText variant="body2">A</TableText>
          </Box>
          <TableText variant="h4" sx={{ color: '#66696B' }}>
            Maru-A process
          </TableText>
        </Box>
        <Box display="flex" alignItems="center" gap="5px">
          <Box width="25px" height="18px" bgcolor="grey" borderRadius="70%" />
          <TableText variant="h4" sx={{ width: '65px', color: '#66696B' }}>
            Non Maru-A Process
          </TableText>
        </Box>
      </Box>

      {/* No. of Level 3 & above operators available */}
      <Box display="flex" alignItems="center">
        <TableText variant="h4" sx={{ width: '140px' }}>
          No.(N) of Level 3 & above operators available for the station:
        </TableText>
        <Box
          display="flex"
          alignItems="center"
          gap="4px"
          sx={{ padding: '10px', backgroundColor: '#ffffff' }}
        >
          <Box
            width="13px"
            height="15px"
            border="1px solid grey"
            borderRadius="4px"
          ></Box>{' '}
          <span>N</span>
        </Box>
      </Box>

      <Box display="flex" alignItems="center" gap="4px">
        <TableText variant="h4" width="66px">
          Skill Level :
        </TableText>
        <Box display="flex" flexDirection="row" alignItems="center" gap="10px">
          <Box
            display="grid"
            gridTemplateColumns="repeat(2, 1fr)"
            gridTemplateRows="repeat(2, 1fr)"
            gap="1px"
          >
            <Box
              bgcolor="#ffffff"
              width="13px"
              height="13px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <TableText variant="h4">4</TableText>
            </Box>
            <Box
              bgcolor="#ffffff"
              width="13px"
              height="13px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <TableText variant="h4">1</TableText>
            </Box>
            <Box
              bgcolor="#ffffff"
              width="13px"
              height="13px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <TableText variant="h4">3</TableText>
            </Box>
            <Box
              bgcolor="#ffffff"
              width="13px"
              height="13px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <TableText variant="h4">2</TableText>
            </Box>
          </Box>
          <TableText variant="h4" sx={{ width: '57px', color: '#66696B' }}>
            No training
          </TableText>
        </Box>

        {/* Skill Level 3 */}
        <Box display="flex" flexDirection="row" alignItems="center" gap="5px">
          <Box
            display="grid"
            gridTemplateColumns="repeat(2, 1fr)"
            gridTemplateRows="repeat(2, 1fr)"
            gap="1px"
          >
            <Box
              bgcolor="#ffffff"
              width="13px"
              height="15px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <TableText variant="h4">4</TableText>
            </Box>
            <Box
              bgcolor="#30C030"
              width="13px"
              height="15px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <TableText variant="h4">1</TableText>
            </Box>
            <Box
              bgcolor="#ffffff"
              width="13px"
              height="15px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <TableText variant="h4">3</TableText>
            </Box>
            <Box
              bgcolor="#30C030"
              width="13px"
              height="15px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <TableText variant="h4">2</TableText>
            </Box>
          </Box>
          <TableText variant="h4" sx={{ width: '105px', color: '#66696B' }}>
            Under training cannot work
          </TableText>
        </Box>

        {/* Skill Level 4 */}
        <Box display="flex" flexDirection="row" alignItems="center" gap="5px">
          <Box
            display="grid"
            gridTemplateColumns="repeat(2, 1fr)"
            gridTemplateRows="repeat(2, 1fr)"
            gap="1px"
          >
            <Box
              bgcolor="#ffffff"
              width="13px"
              height="15px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <TableText variant="h4">4</TableText>
            </Box>
            <Box
              bgcolor="#30C030"
              width="13px"
              height="15px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="h4" style={{ fontSize: '9px' }}>
                1
              </Typography>
            </Box>
            <Box
              bgcolor="#30C030"
              width="13px"
              height="15px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="h4" style={{ fontSize: '9px' }}>
                3
              </Typography>
            </Box>
            <Box
              bgcolor="#30C030"
              width="13px"
              height="15px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="h4" style={{ fontSize: '9px' }}>
                2
              </Typography>
            </Box>
          </Box>
          <TableText variant="h4" sx={{ width: '116px', color: '#66696B' }}>
            Can work under supervision
          </TableText>
        </Box>
        <Box display="flex" flexDirection="row" alignItems="center" gap="5px">
          <Box
            display="grid"
            gridTemplateColumns="repeat(2, 1fr)"
            gridTemplateRows="repeat(2, 1fr)"
            gap="1px"
          >
            <Box
              bgcolor="#30C030"
              width="13px"
              height="15px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <TableText variant="h4">4</TableText>
            </Box>
            <Box
              bgcolor="#30C030"
              width="13px"
              height="15px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <TableText variant="43">1</TableText>
            </Box>
            <Box
              bgcolor="#30C030"
              width="13px"
              height="15px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <TableText variant="h4">3</TableText>
            </Box>
            <Box
              bgcolor="#30C030"
              width="13px"
              height="15px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <TableText variant="h4">2</TableText>
            </Box>
          </Box>
          <TableText variant="h4" sx={{ color: '#66696B' }}>
            Can work as per WIS/standard with cycle / take time independently
            and with saftey
          </TableText>
        </Box>
      </Box>
    </Box>
  );
};

export default SkillTableFooter;
