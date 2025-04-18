import CloseIcon from '@mui/icons-material/Close';
import {
  Backdrop,
  Box,
  CircularProgress,
  Dialog,
  IconButton,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import back from '../../../../../../../SMM/assets/svg/goback.svg';
import next from '../../../../../../../SMM/assets/svg/next-arrow.svg';
import useFetchStationSkillChart from '../../../../hooks/fetchStationSkillChartData';
import l3Online from './../../../../../../assets/svg/Online.svg';
import l4Online from './../../../../../../assets/svg/drakgreen-circle.svg';
const FilterDialogBox = ({ onClose, title, open }) => {
  const { fetchStationSkillChartData, stationSkillChartDat, loading } =
    useFetchStationSkillChart();

  const [series, setSeries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 20;

  const paginatedCategories = categories.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const paginatedSeries = series.map((s) => ({
    ...s,
    data: s.data.slice(
      currentPage * itemsPerPage,
      (currentPage + 1) * itemsPerPage
    ),
  }));

  const handleNext = () => {
    if ((currentPage + 1) * itemsPerPage < categories.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const supervisorId = localStorage.getItem('supervisorId');
        const payload = `supervisorId=${supervisorId}`;
        await fetchStationSkillChartData(payload);
      } catch (error) {
      } finally {
        if (stationSkillChartDat?.responseCode === 200) {
          const seriesData = [
            {
              name: 'L3',
              data: [], // L3 Counts
            },
            {
              name: 'L4',
              data: [], // L4 Counts
            },
          ];
          const stations = await stationSkillChartDat?.response?.map((res) => {
            seriesData[0]?.data?.push(res?.l3SkillCount || 0);
            seriesData[1]?.data?.push(res?.l4SkillCount || 0);
            return res?.stationName;
          });
          setSeries(seriesData);
          setCategories(stations);
        }
      }
    };

    fetchChartData();
  }, [fetchStationSkillChartData]);
  const chartOptionsConfig = {
    chart: {
      type: 'bar',
      height: 500,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: paginatedCategories,
      labels: {
        rotate: -45,
        rotateAlways: true,
        style: {
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      title: {
        text: 'Operators Count',
        style: {
          fontWeight: '600',
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} Operators`,
      },
    },
    colors: ['#00b000', '#007f00'],
    legend: {
      show: false,
      position: 'bottom',
    },
  };
  const chartOptions = {
    series: paginatedSeries,
    options: chartOptionsConfig,

    // [
    //   {
    //     name: "L3",
    //     data: [6, 2, 4, 3, 5, 4, 1, 0, 2, 4, 3, 5, 3, 1, 2, 2, 3], // L3 Counts
    //   },
    //   {
    //     name: "L4",
    //     data: [3, 1, 5, 2, 6, 5, 0, 1, 1, 3, 2, 4, 5, 2, 3, 3, 4], // L4 Counts
    //   },
    // ],
    // options: {
    //   chart: {
    //     type: 'bar',
    //     height: 500,
    //     toolbar: {
    //       show: false,
    //     },
    //   },
    //   plotOptions: {
    //     bar: {
    //       horizontal: false,
    //       columnWidth: '55%',
    //     },
    //   },
    //   dataLabels: {
    //     enabled: false,
    //   },
    //   stroke: {
    //     show: true,
    //     width: 2,
    //     colors: ['transparent'],
    //   },
    //   xaxis: {
    //     categories: categories,
    //     // [
    //     //   "7RA Break Pipe Fitment",
    //     //   "7RL Vacuum Pipe Fitment",
    //     //   "8RA Sunvisor Fitment Door",
    //     //   "8RB Eco Flair Nut Torque",
    //     //   "8LB Actuator MTG Torque",
    //     //   "8LB Back Door GND Bolt",
    //     //   "9RL HVAC Unit Fitment",
    //     //   "9RL Bolt GND (BD) Torque",
    //     //   "10RL Break Pedal Fitment",
    //     //   "10LL BP Door W/Strip Fitment",
    //     //   "11LL LH Door W/Strip Fitment",
    //     //   "12RL ENG Room GND Bolt",
    //     //   "13RL RH Door W/Strip Fitment",
    //     //   "14LL Fair Nut Torque Pedal",
    //     //   "15LL Forward Sensor Fitment",
    //     //   "15RL ENG MTG & MAP Sensor",
    //     //   "16 CNG Reducer & LEG MTG",
    //     // ],
    //     labels: {
    //       rotate: -45,
    //       style: {
    //         fontSize: '12px',
    //       },
    //     },
    //   },
    //   yaxis: {
    //     title: {
    //       text: 'Operators Count',
    //       style: {
    //         fontWeight: '600',
    //       },
    //     },
    //   },
    //   fill: {
    //     opacity: 1,
    //   },
    //   tooltip: {
    //     y: {
    //       formatter: (val) => `${val} Operators`,
    //     },
    //   },
    //   colors: ['#00b000', '#007f00'], // Colors for L3 and L4
    //   legend: {
    //     show: false,
    //     position: 'bottom',
    //     // markers: {
    //     //   width: 12,
    //     //   height: 12,
    //     // },
    //   },
    // },
  };
  const handleClose = () => {
    onClose();
  };
  return (
    <Dialog
      onClose={handleClose}
      open={open}
      PaperProps={{
        sx: {
          maxWidth: '70vw', // Adjust for smaller screens
          maxHeight: '90vh',
          minHeight: '300px',
          width: '100%', // Ensure it scales to screen size
          height: 'auto',
        },
      }}
    >
      <Backdrop
        sx={(theme) => ({
          color: '#fff',
          zIndex: theme.zIndex.drawer + 1,
        })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        sx={{
          fontSize: '13px',
          fontWeight: '600',
          alignItems: 'center',
          mb: 1,
        }}
      >
        {title}
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <div
        style={{
          padding: '12px',
          border: '1px solid #ccc',
          borderRadius: '4px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '10px',
            marginTop: '10px',
          }}
        >
          <button
            style={{ background: 'transparent', cursor: 'pointer' }}
            onClick={handlePrev}
            disabled={currentPage === 0}
          >
            <img
              style={{ opacity: currentPage === 0 ? 0.5 : 1 }}
              src={back}
              alt="prev"
            />
          </button>
          <button
            style={{ background: 'transparent', cursor: 'pointer' }}
            onClick={handleNext}
            disabled={(currentPage + 1) * itemsPerPage >= categories.length}
          >
            <img
              style={{
                opacity:
                  (currentPage + 1) * itemsPerPage >= categories.length
                    ? 0.5
                    : 1,
              }}
              src={next}
              alt="next"
            />
          </button>
        </div>
        <Chart
          options={chartOptions.options}
          series={chartOptions.series}
          type="bar"
          height={390}
          // style={{ maxWidth: "800px !important" }}
        />
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '14px', fontWeight: '400' }}>Stations</p>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '12px', marginTop: '5px' }}>
        <p style={{ fontSize: '12px', fontWeight: '600' }}>Skill Level</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span>
            <img src={l3Online} alt="l3Online" style={{ width: '10px' }} />
          </span>
          <span style={{ fontSize: '12px', fontWeight: '400' }}>L3</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span>
            <img src={l4Online} alt="l4Online" style={{ width: '10px' }} />
          </span>
          <span style={{ fontSize: '12px', fontWeight: '400' }}>L4</span>
        </div>
      </div>
    </Dialog>
  );
};

export default FilterDialogBox;
