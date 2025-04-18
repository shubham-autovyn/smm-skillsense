import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const BarChart = ({ joinings, relieving, categories }) => {
  const value = relieving.length > 0 ? Math.min(...relieving) : 0;
  const minValue = value === 0 ? -15 : value;

  const maxValue = Math.abs(minValue);

  const [state, setState] = useState({
    series: [],
    options: {
      chart: {
        height: 100,
        type: 'bar',
        toolbar: {
          show: false,
        },
        stacked: false,
      },
      plotOptions: {
        bar: {
          columnWidth: '25%',
          distributed: true,
          startingShape: 'flat',
          states: {
            hover: {
              enabled: true,
              background: '#9EF3B6',
            },
          },
          barHeight: '100%', // Ensures full height alignment
          stacked: true, // ✅ Enables stacking effect
          borderRadius: 0,
          dataLabels: {
            position: 'bottom', // Centers the "+" and "-" inside bars
          },
        },
      },

      colors: [
        function ({ value, seriesIndex, w }) {
          if (value > 0) {
            return '#9EF3B6';
          } else {
            return '#FBB9B9';
          }
        },
      ],
      //["#9EF3B6", "#FBB9B9"], // Green for joining, Red for relieving
      markers: {
        size: 5,
        colors: ['#000'],
        shape: 'circle',
      },
      xaxis: {
        categories: [],
        min: 0,
        max: 0,
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        crosshairs: {
          show: false, // <--- HERE
        },
        axisTicks: {
          show: false, // Hides category ticks
        },
      },
      yaxis: {
        labels: {
          show: true,
          formatter: (val) => (val === 0 ? '0' : ''),
        },
        axisBorder: {
          show: true,
          color: '#ACB0BA',
        },
        axisTicks: {
          show: false,
        },
        min: minValue,
        max: maxValue,
      },
      grid: {
        show: false,
        padding: { left: -56 }, // Adjust left padding

        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
      },
      annotations: {
        yaxis: [
          {
            y: 0,
            borderColor: '#ACB0BA',
            strokeDashArray: 0,
            offsetX: 68,
            offsetY: 0,
          },
        ],
      },
      legend: {
        show: false,
      },

      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val > 0 ? '+' : val < 0 ? '-' : '';
        },
        style: {
          fontSize: '16px',
          fontWeight: 'bold',
          colors: ['#000'],
        },
        offsetY: -2,
        offsetX: 0,
        textAnchor: 'middle', // Aligns text in center horizontally
      },
    },
  });
  useEffect(() => {
    setState((prev) => ({
      ...prev,
      series: [
        {
          name: 'Joining',
          data: joinings.map((item) => (item > 0 ? 20 : 0)),
        }, //[33, 45, 55, 65, 25, 25, 35]
        {
          name: 'Relieving',
          data: relieving.map((item) => (item < 0 ? -20 : 0)),
        }, //[-33, -45, -55, -65, -25, -25, -35]
      ],
      options: {
        ...prev.options,
        xaxis: {
          ...prev.options.xaxis,
          categories: categories,
        },
        tooltip: {
          enabled: true,
          shared: false, // Ensures only one tooltip shows per bar
          intersect: true, // Avoids overlapping tooltips
          followCursor: true, // Ensures tooltip follows cursor properly
          y: {
            formatter: function (val, { seriesIndex, dataPointIndex, w }) {
              const name = w.globals.seriesNames[seriesIndex] || 'Unknown';
              return `${name}: ${val}`;
            },
          },
          custom: function ({ seriesIndex, dataPointIndex, w }) {
            const tooltipSeries = [joinings, relieving];

            if (
              tooltipSeries[seriesIndex] &&
              tooltipSeries[seriesIndex][dataPointIndex] !== undefined
            ) {
              const name = w.globals.seriesNames[seriesIndex] || 'Unknown';
              const value = tooltipSeries[seriesIndex][dataPointIndex];

              return `<div style="
                  padding: 8px;
                  font-size: 12px;
                  background: white;
                  color: black;
                  border-radius: 5px;
                  border: 1px solid #ccc;
                  text-align: center;
                  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
                  ">
                  <strong>${name}:</strong> ${value}
                </div>`;
            }
            return '';
          },
        },
      },
    }));
  }, [joinings, relieving, categories]);

  return (
    <div
      style={{ padding: '0 18px 0 14px', position: 'relative', bottom: '50px' }}
    >
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="bar"
        height={100}
      />
    </div>
  );
};

export default BarChart;
