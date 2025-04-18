import { Box, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import Chart from 'react-apexcharts';
import * as shopReducer from '../../../../../../redux/Reducers/SMMShopReducer';

import fullScreen from '../../../../../../assets/svg/full-screen.svg';
import back from '../../../../../../assets/svg/goback.svg';
import next from '../../../../../../assets/svg/next-arrow.svg';

import { useSelector } from 'react-redux';
import basicReqIcon from '../../../../../../assets/svg/Basic Requirement.svg';
import gapIcon from '../../../../../../assets/svg/Gap01.svg';
import offlineIcon from '../../../../../../assets/svg/Offline.svg';
import onlineIcon from '../../../../../../assets/svg/Online.svg';
import { default as surplusIcon } from '../../../../../../assets/svg/Surplus.svg';

import moment from 'moment';
import {} from './stackchart.css';

const VEHGraphManpower = ({
  graphData = [],
  getSurplusOperator,
  filter,
  dayWiseBtn,
}) => {
  const shop = useSelector(shopReducer.getShop);
  const [currentGraphData, setCurrentGraphData] = useState(0);
  const itemsPerSurPlusGraphData = 10;
  const startIndex = currentGraphData * itemsPerSurPlusGraphData;
  const endIndex = startIndex + itemsPerSurPlusGraphData;
  const currentItems = graphData?.slice(startIndex, endIndex);
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  // const [surplusOperatorDate, setSurlpusOperatorDate] = useState("");

  // const data = [
  //   {
  //     date: "10-11-2024",
  //     online: 100,
  //     offline: 20,
  //     basicRequirement: 200,
  //     relieverAndAbsenteeismCover: 20,
  //     gap: 10,
  //     surplus: 60,
  //   },
  //   {
  //     date: "11-11-2024",
  //     online: 100,
  //     offline: 20,
  //     basicRequirement: 200,
  //     relieverAndAbsenteeismCover: 20,
  //     gap: 10,
  //     surplus: 0,
  //   },
  //   {
  //     date: "12-11-2024",
  //     online: 100,
  //     offline: 20,
  //     basicRequirement: 200,
  //     relieverAndAbsenteeismCover: 20,
  //     gap: 10,
  //     surplus: 60,
  //   },
  //   {
  //     date: "13-11-2024",
  //     online: 100,
  //     offline: 20,
  //     basicRequirement: 200,
  //     relieverAndAbsenteeismCover: 20,
  //     gap: 10,
  //     surplus: 0,
  //   },
  //   {
  //     date: "14-11-2024",
  //     online: 100,
  //     offline: 20,
  //     basicRequirement: 200,
  //     relieverAndAbsenteeismCover: 20,
  //     gap: 10,
  //     surplus: 60,
  //   },
  //   {
  //     date: "15-11-2024",
  //     online: 100,
  //     offline: 20,
  //     basicRequirement: 200,
  //     relieverAndAbsenteeismCover: 20,
  //     gap: 10,
  //     surplus: 0,
  //   },
  //   {
  //     date: "16-11-2024",
  //     online: 100,
  //     offline: 20,
  //     basicRequirement: 200,
  //     relieverAndAbsenteeismCover: 20,
  //     gap: 10,
  //     surplus: 60,
  //   },
  //   {
  //     date: "17-11-2024",
  //     online: 100,
  //     offline: 20,
  //     basicRequirement: 200,
  //     relieverAndAbsenteeismCover: 20,
  //     gap: 10,
  //     surplus: 0,
  //   },
  //   {
  //     date: "18-11-2024",
  //     online: 100,
  //     offline: 20,
  //     basicRequirement: 200,
  //     relieverAndAbsenteeismCover: 20,
  //     gap: 10,
  //     surplus: 60,
  //   },
  //   {
  //     date: "19-11-2024",
  //     online: 100,
  //     offline: 20,
  //     basicRequirement: 200,
  //     relieverAndAbsenteeismCover: 20,
  //     gap: 10,
  //     surplus: 0,
  //   },
  //   {
  //     date: "20-11-2024",
  //     online: 100,
  //     offline: 20,
  //     basicRequirement: 200,
  //     relieverAndAbsenteeismCover: 20,
  //     gap: 10,
  //     surplus: 60,
  //   },
  //   {
  //     date: "21-11-2024",
  //     online: 100,
  //     offline: 20,
  //     basicRequirement: 200,
  //     relieverAndAbsenteeismCover: 20,
  //     gap: 10,
  //     surplus: 0,
  //   },
  //   {
  //     date: "22-11-2024",
  //     online: 100,
  //     offline: 20,
  //     basicRequirement: 200,
  //     relieverAndAbsenteeismCover: 20,
  //     gap: 10,
  //     surplus: 0,
  //   },
  //   {
  //     date: "23-11-2024",
  //     online: 100,
  //     offline: 20,
  //     basicRequirement: 200,
  //     relieverAndAbsenteeismCover: 20,
  //     gap: 10,
  //     surplus: 0,
  //   },
  //   {
  //     date: "24-11-2024",
  //     online: 100,
  //     offline: 20,
  //     basicRequirement: 200,
  //     relieverAndAbsenteeismCover: 20,
  //     gap: 10,
  //     surplus: 0,
  //   },
  // ];

  // graphData = data;
  const categories = currentItems?.map((item) => item?.date) || '';
  const offlineData = currentItems?.map((item) => item?.offline || 0);
  const onlineData = currentItems?.map((item) => item?.online || 0);
  const relieverData = currentItems?.map(
    (item) => item?.relieverAndAbsenteeismCover || 0
  );
  const gapData = currentItems?.map((item) => item?.gap || 0);
  const basicReqData = currentItems?.map((item) => item?.basicRequirement || 0);
  const surplusData = currentItems?.map((item) => item?.surplus || 0);
  const calculateMinMax = (data) => {
    const values = data.flatMap((obj) =>
      Object.values(obj).filter((value) => typeof value === 'number')
    );

    const minPositive = Math.min(...values.filter((num) => num > 0));

    const maxValue = Math.max(...values);

    const roundedMaxValue = Math.ceil(maxValue / 200) * 200;

    const roundedMinPositive =
      minPositive < 100 ? 0 : Math.floor(minPositive / 100) * 100;

    return { roundedMinPositive, roundedMaxValue };
  };

  const { roundedMinPositive, roundedMaxValue } = calculateMinMax(graphData);

  const filteredSeries = () => {
    switch (filter) {
      case 'Only Gap':
        return [
          { name: 'Gap', data: gapData, color: '#eab0b0' },

          { name: 'Offline', data: offlineData.map(() => 0), color: '#97999b' },

          { name: 'Online', data: onlineData.map(() => 0), color: '#58a55c' },

          {
            name: 'Reliever & Absenteeism Cover',
            data: relieverData.map(() => 0),
            color: '#f1be42',
          },
        ];

      case 'Only Surplus':
        return [
          { name: 'Offline', data: offlineData.map(() => 0), color: '#97999b' },
          { name: 'Online', data: onlineData.map(() => 0), color: '#58a55c' },
          {
            name: 'Reliever & Absenteeism Cover',
            data: relieverData.map(() => 0),
            color: '#f1be42',
          },
          { name: 'Gap', data: gapData.map(() => 0), color: '#eab0b0' },
        ];

      default:
        return [
          { name: 'Offline', data: offlineData, color: '#97999b' },
          { name: 'Online', data: onlineData, color: '#58a55c' },
          {
            name: 'Reliever & Absenteeism Cover',
            data: relieverData,
            color: '#f1be42',
          },
          { name: 'Gap', data: gapData, color: '#eab0b0' },
        ];
    }
  };

  const surplusAnnotations = currentItems?.map((item, index) => ({
    x: categories[index],
    y:
      (item?.offline || 0) +
      (item?.online || 0) +
      (item?.relieverAndAbsenteeismCover || 0) +
      (item?.gap || 0),
    label: {
      text:
        filter === 'Only Gap'
          ? ''
          : item?.surplus > 0
          ? `+${item?.surplus}`
          : '',
      style: {
        color: '#FFFF',
        background: '#d83b01',
        fontSize: '8px',
      },
    },
    marker: {
      size: 0,
      shape: 'circle',
      cursor: 'pointer',
      fillColor: 'transparent',
      strokeColor: 'transparent', // Ensures no border color
      strokeWidth: 0, // Ensures no border width
    },
    id: `surplus-annotations`,
  }));

  const toggleSeries = (seriesName) => {
    if (chartRef.current) {
      chartRef.current.toggleSeries(seriesName);
    }
  };

  const options = {
    chart: {
      type: 'bar',
      stacked: true,
      toolbar: {
        show: false,
      },
      events: {
        click: function (event, chartContext, config) {
          const chartElement = event.target;
          if (
            chartElement &&
            chartElement.classList.contains('surplus-annotations')
          ) {
            if (config?.dataPointIndex !== undefined) {
              const clickedAnnotation =
                surplusAnnotations[config.dataPointIndex];
              if (clickedAnnotation?.label?.text) {
                getSurplusOperator(clickedAnnotation.x);
              }
            }
          }
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '25%',
        borderRadius: 5,
      },
    },
    dataLabels: {
      enabled: false,
    },
    annotations: {
      yaxis: [
        {
          y: currentItems[0]?.basicRequirement || 0,
          borderColor: '#171c8f',
          borderWidth: 1,
          strokeDashArray: 0,
          label: {
            text: '',
            style: {
              color: '#fff',
              background: '#8A2BE2',
            },
          },
        },
      ],
      points: surplusAnnotations,
    },

    xaxis: {
      categories,
      labels: {
        formatter: function (value) {
          const formatDate = (dateStr) => {
            console.log(dateStr);

            if (typeof dateStr !== 'string') return '';
            const parts = dateStr.split('-');
            console.log(parts);

            return parts.length === 3 ? `${parts[0]}/${parts[1]}` : dateStr;
          };

          const formatDateRange = (dateRange) => {
            if (typeof dateRange !== 'string') return '';

            const dates = dateRange.split(' - ');
            if (dates.length !== 2) return dateRange;

            const format = (dateStr) => {
              const parts = dateStr.split('-');
              return parts.length === 3 ? `${parts[0]}/${parts[1]}` : dateStr;
            };

            return `${format(dates[0])}-${format(dates[1])}`;
          };

          if (typeof value !== 'string') {
            console.warn('Unexpected value type:', value);
            return '';
          }

          if (
            Array.isArray(categories) &&
            categories.length &&
            dayWiseBtn === 'daily'
          ) {
            return formatDate(value);
          } else {
            return formatDateRange(value);
          }
        },
      },
    },

    yaxis: {
      min: roundedMaxValue,
      max: roundedMinPositive,
      tickAmount: 5,

      labels: {
        formatter: function (value) {
          return value.toFixed(0);
        },
        step: 1000,
        offsetX: -10,
      },
    },
    grid: {
      show: true, // Enable grid lines
      xaxis: {
        lines: {
          show: currentItems.length > 1, // Enable X-axis grid lines
        },
      },
      yaxis: {
        lines: {
          show: false, // Disable Y-axis grid lines
        },
      },
    },
    colors: ['#97999b', '#58a55c', '#f1be42', '#eab0b0', '#FF0000'],
    legend: {
      show: false,
      position: 'bottom',
      markers: {
        shape: 'circle',
        width: 12,
        height: 12,
      },
    },

    tooltip: {
      enabled: true,
      shared: true,

      intersect: false,
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        // Check if there's any non-zero data in the point
        const hasData = [
          offlineData,
          onlineData,
          relieverData,
          gapData,
          basicReqData,
          surplusData,
        ].some((data) => data[dataPointIndex] !== 0);

        const chartEl = document.querySelector('.apexcharts-xcrosshairs');
        if (chartEl) {
          if (hasData) {
            chartEl.style.display = 'block';
          } else {
            chartEl.style.display = 'none';
          }
        }
        if (!hasData) {
          return '';
        }

        let tooltipContent = `
          <div style="width: 280px; padding: 15px; background-color: #F4F5F8; border: 1px solid #9EA1A7; border-radius: 4px">
            <h4>
              ${(() => {
                const value = categories[dataPointIndex];

                if (typeof value === 'string' && value.includes(' - ')) {
                  const dates = value.split(' - ');
                  if (dates.length === 2) {
                    const startDate = moment(dates[0], 'DD-MM-YYYY').format(
                      'DD/MM/YYYY'
                    );
                    const endDate = moment(dates[1], 'DD-MM-YYYY').format(
                      'DD/MM/YYYY'
                    );
                    return `${startDate} - ${endDate}`;
                  }
                } else {
                  return moment(value, 'YYYY-MM-DD').format('DD/MM/YYYY');
                }
                return value;
              })()}
            </h4>`;
        // Offline section

        tooltipContent += `
            <div style="margin-top: 5px">
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span>
                    <img src="${offlineIcon}" alt="Offline" style="width: 10px; margin-right: 5px;" />
                  </span>
                  <p>Offline</p>
                </div>
                <div>
                  <p>${offlineData[dataPointIndex] || 0}</p>
                </div>
              </div>
            </div>`;

        // Online section

        tooltipContent += `
            <div style="display: flex; align-items: start; justify-content: space-between;">
              <div style="display: flex; align-items: start; gap: 3px;">
                <span>
                  <img src="${onlineIcon}" alt="Online" style="width: 10px; margin-right: 5px;" />
                </span>
                <p>Online & Reliever & </br> Absenteeism Cover </p>
              </div>
              <div>
                <p>${onlineData[dataPointIndex] || 0}</p>
              </div>
            </div>`;

        // Reliever & Absenteeism Cover section
        // if (relieverData[dataPointIndex] !== 0) {
        //   tooltipContent += `
        //     <div style="display: flex; align-items: center; justify-content: space-between;">
        //       <div style="display: flex; align-items: center;">
        //         <span>
        //           <img src="${absenteeismIcon}" alt="Absenteeism" style="width: 10px; margin-right: 5px;" />
        //         </span>
        //         <p>Reliever & Absenteeism Cover</p>
        //       </div>
        //       <div>
        //         <p>${relieverData[dataPointIndex]}</p>
        //       </div>
        //     </div>`;
        // }

        // Gap section

        tooltipContent += `
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span>
                  <img src="${gapIcon}" alt="Gap" style="width: 10px; margin-right: 5px;" />
                </span>
                <p>Gap</p>
              </div>
              <div>
                <p>${gapData[dataPointIndex] || 0}</p>
              </div>
            </div>`;

        // Basic Requirement section

        tooltipContent += `
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <div style="display: flex; align-items: center; text-align: center; gap: 3px;">
                <span style="display: flex; align-items: center;">
                  <img src="${basicReqIcon}" alt="Basic Requirement" style="width: 10px; margin-right: 5px;" />
                </span>
                <p style="margin: 0;">Basic Requirement</p>
              </div>
              <div>
                <p style="margin: 0;">${basicReqData[dataPointIndex] || 0}</p>
              </div>
            </div>`;

        // Surplus section

        tooltipContent += `
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span>
                  <img src="${surplusIcon}" alt="Surplus" style="width: 10px; margin-right: 5px;" />
                </span>
                <p>Surplus</p>
              </div>
              <div>
                <p>${surplusData[dataPointIndex] || 0}</p>
              </div>
            </div>`;

        // End tooltip content
        tooltipContent += `</div>`;

        return tooltipContent;
      },
    },
  };

  const handleFullScreen = () => {
    if (chartContainerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        chartContainerRef.current.requestFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      if (document.fullscreenElement === chartContainerRef.current) {
        chartContainerRef.current.style.backgroundColor = '#e5e6e6';
      } else if (chartContainerRef.current) {
        chartContainerRef.current.style.backgroundColor = '';
      }
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

  const handleNext = () => {
    if (endIndex < graphData?.length) {
      setCurrentGraphData((prevPage) => prevPage + 1);
    }
  };

  const handlePrevious = () => {
    if (startIndex > 0) {
      setCurrentGraphData((prevPage) => prevPage - 1);
    }
  };

  return (
    <div ref={chartContainerRef} style={{ position: 'relative' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <Typography variant="h4">{shop.shop_name} Manpower</Typography>

        <Box sx={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <img
            src={back}
            alt="back"
            style={{
              cursor: startIndex > 0 ? 'pointer' : 'not-allowed',
              opacity: startIndex > 0 ? 1 : 0.5,
            }}
            onClick={handlePrevious}
          />
          <img
            src={next}
            alt="next"
            style={{
              cursor: endIndex < graphData?.length ? 'pointer' : 'not-allowed',
              opacity: endIndex < graphData?.length ? 1 : 0.5,
            }}
            onClick={handleNext}
          />
          <img
            src={fullScreen}
            alt="Full Screen"
            onClick={handleFullScreen}
            style={{ cursor: 'pointer' }}
          />
        </Box>
      </Box>
      <Chart
        className="surplus-custom-chart"
        options={options}
        series={filteredSeries()}
        type="bar"
        height={400}
      />

      <div className="customLegend">
        <div
          style={{
            position: 'absolute',
            left: '2%',
            top: '-197%',
            fontSize: '10px',
          }}
        >
          <p>DAYS</p>
        </div>
        <span style={{ fontSize: 'small', fontWeight: 'bold' }}>Manpower:</span>
        <div className="chartLegend">
          <div
            onClick={() => toggleSeries('Offline')}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={offlineIcon}
              alt="Offline"
              style={{ width: '10px', marginRight: '5px' }}
            />
            <span>Offline</span>
          </div>
          <div
            onClick={() => toggleSeries('Online')}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={onlineIcon}
              alt="Online"
              style={{ width: '10px', marginRight: '5px' }}
            />
            <span>Online & Reliever & Absenteeism</span>
          </div>
          {/* <div
            onClick={() => toggleSeries("Reliever & Absenteeism Cover")}
            style={{ cursor: "pointer" }}
          >
            <img
              src={absenteeismIcon}
              alt="Reliever & Absenteeism Cover"
              style={{ width: "10px", marginRight: "5px" }}
            />
            <span>Reliever & Absenteeism Cover</span>
          </div> */}
          <div
            onClick={() => toggleSeries('Gap')}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={gapIcon}
              alt="Gap"
              style={{ width: '10px', marginRight: '5px' }}
            />
            <span>Gap</span>
          </div>
          <div
            onClick={() => toggleSeries('Basic Requirement')}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={basicReqIcon}
              alt="Basic Requirement"
              style={{ width: '10px', marginRight: '5px', marginBottom: '3px' }}
            />
            <span>Basic Requirement</span>
          </div>

          <div
            onClick={() => toggleSeries('Surplus')}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={surplusIcon}
              alt="Surplus"
              style={{ width: '10px', marginRight: '5px' }}
            />
            <span>Surplus</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VEHGraphManpower;
