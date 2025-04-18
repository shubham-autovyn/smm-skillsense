import moment from 'moment';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import absenteeismIcon from '../../../assets/svg/AbsenteeismReq.svg';
import actualIcon from '../../../assets/svg/actual.svg';
import availableIcon from '../../../assets/svg/avalable.svg';
import baseIcon from '../../../assets/svg/Base Req..svg';
import gapIcon from '../../../assets/svg/Gap.svg';
import joiningsIcon from '../../../assets/svg/Joinings.svg';
import relievingIcon from '../../../assets/svg/Relievings.svg';

import BarChart from '../../Dpm/components/ShopDashboardTabs/ManPowerPlanning/BarChart/barchart';
import {} from './manpowerPlanningChart.css';

const PlantManpowerChart = ({ dataVehGraph, minYValue }) => {
  let dataGraph = dataVehGraph;
  const joinings = dataGraph?.map((item) => item?.joinings);
  const relieving =
    dataGraph?.map((item) => {
      const value = -item?.relievings || 0;
      return value === -0 ? 0 : value;
    }) || [];

  const chartRef = useRef(null);

  const gapData = dataGraph ? dataGraph.map((data) => data?.gap ?? 0) : 0;
  const basicReqData = dataGraph
    ? dataGraph.map((data) => data?.basicRequirement ?? 0)
    : 0;
  const absenteesimData = dataGraph
    ? dataGraph.map((data) => data?.absenteesim ?? 0)
    : 0;
  const availableData = dataGraph
    ? dataGraph.map((data) => data?.availableManpower ?? 0)
    : 0;
  const actualData = dataGraph
    ? dataGraph.map((data) => data?.actualManpower ?? 0)
    : 0;
  const joiningsData = dataGraph
    ? dataGraph.map((data) => data?.joinings ?? 0)
    : 0;
  const relievingData = dataGraph
    ? dataGraph.map((data) => data?.relievings ?? 0)
    : 0;

  const categories = dataGraph?.map((item) => item?.date);

  const toggleSeries = (seriesName) => {
    if (chartRef.current) {
      chartRef.current.toggleSeries(seriesName);
    }
  };

  const series = [
    {
      name: 'Available',
      data: dataGraph?.map((item) => ({
        x: item?.date,
        // y: item?.totalManpowerRequired || 0,
        y: item?.availableManpower || 0,
      })),
      type: 'line',
    },
    {
      name: 'Actual',
      data: dataGraph?.map((item) => ({
        x: item?.date,
        y: item?.actualManpower || 0,
      })),
      type: 'line',
    },
    {
      name: 'Gap',
      data: dataGraph?.map((item) => ({
        x: item?.date,
        y: item?.gap || 0,
      })),
      type: 'area',
    },
    {
      name: 'Absenteeism Req',
      data: dataGraph?.map((item) => ({
        x: item?.date,
        y: item?.absenteesim,
      })),
      type: 'line',
    },
    {
      name: 'Base Req',
      data: dataGraph?.map((item) => ({
        x: item?.date,
        y: item?.basicRequirement,
      })),
      type: 'line',
    },
  ];

  const [options, setOptions] = useState({
    chart: {
      type: 'line',
      height: 350,
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
      labels: {
        colors: '#000',
      },
      marker: {
        show: true,
        width: 6,
        height: 0,
        radius: 0,
      },
    },
    stroke: {
      width: [2, 2, 3, 3, 1],
      curve: 'straight',
      dashArray: [5, 0, 0, 4, 5],
    },
    colors: ['#2aaf2b', '#fb7dcc', '#e1bcd3', '#008FFB', '#9498A1'],
    xaxis: {
      categories: categories,
      position: 'top',
      axisBorder: {
        show: true,
        color: '#ACB0BA',
      },
      axisTicks: {
        show: true,
      },
      labels: {
        formatter: function (value) {
          const date = moment(value, 'DD-MM-YYYY');
          // Format the date as 'DD MMM'
          return date.format('DD MMM');
        },
        style: {
          fontSize: '12px', // Adjust font size if needed
          colors: '#8e8da4',
        },
        offsetY: -5, // Add margin-bottom to labels
      },
    },
    yaxis: {
      tickAmount: 4,
      floating: false,
      labels: {
        style: {
          colors: '#8e8da4',
        },
        offsetY: -7,
        offsetX: 0,
      },
      axisBorder: {
        show: true,
        color: '#ACB0BA',
      },
      axisTicks: {
        show: false,
      },
      formatter: function (val) {
        return val.toFixed(0);
      },
    },

    tooltip: {
      show: true,
    },
    grid: {
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
  });
  const setMinOption = useCallback(
    (minValue) => {
      setOptions((prevOptions) => ({
        ...prevOptions,
        yaxis: {
          ...prevOptions.yaxis,
          min: 0,
        },
      }));
    },
    [minYValue]
  );

  const setTooltip = useCallback(() => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      tooltip: {
        show: true,
        custom: function ({ series, seriesIndex, dataPointIndex }) {
          const value = series[seriesIndex][dataPointIndex];

          return `
            <div style=" width: 280px; padding : 5px; background-color: #F4F5F8">
            <div style" margin-top: 4px">
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <div style="display: flex; align-items: center;">
                  
                    <img
                      src="${baseIcon}"
                      alt="baseIcon"
                      style="width: 18px; margin-right: 8px;"
                    />
              
                  <p>Base</p>
                </div>
                <div>
                   <p>${basicReqData[dataPointIndex]}</p>
                </div>
              </div>
    
    
               <div style="display: flex; align-items: center; justify-content: space-between;">
                <div style="display: flex; align-items: center;">
                    <img
                      src="${absenteeismIcon}"
                      alt="absenteeismIcon"
                      style="width: 18px; margin-right: 8px;"
                    />
                 
                  <p>+Absenteeism</p>
                </div>
                <div>
                 <p>${absenteesimData[dataPointIndex]}</p>
                </div>
              </div>
    
    
               <div style="display: flex; align-items: center; justify-content: space-between;">
                <div style="display: flex; align-items: center;">
                    <img
                      src="${availableIcon}"
                      alt="availableIcon"
                      style="width: 18px; margin-right: 8px;"
                    />
                  <p>Available</p>
                </div>
                <div>
                 <p>${availableData[dataPointIndex]}</p>
                </div>
              </div>
    
    
    
               <div style="display: flex; align-items: center; justify-content: space-between;">
                <div style="display: flex; align-items: center;">
                    <img
                      src="${actualIcon}"
                      alt="Gap"
                      style="width: 18px; margin-right: 8px;"
                    />
                  <p>Actual</p>
                </div>
                <div>
                 <p>${actualData[dataPointIndex]}</p>
                </div>
              </div>
    
    
    
              <div style="display: flex; align-items: center; justify-content: space-between;">
      <div style="display: flex; align-items: center;">
          <img
            src="${joiningsIcon}"
            alt="Offline"
            style="width: 18px; margin-right: 8px;"
          />
        <p style="margin: 0;">Joinings</p>
      </div>
      <div>
       <p>${joiningsData[dataPointIndex]}</p>
      </div>
    </div>
    
    
               <div style="display: flex; align-items: center; justify-content: space-between;">
                <div style="display: flex; align-items: center;">
                    <img
                      src="${relievingIcon}"
                      alt="Offline"
                      style="width: 18px; margin-right: 8px;"
                    />
                  
                  <p>Relievings</p>
                </div>
                <div>
                <p>${relievingData[dataPointIndex]}</p>
                </div>
              </div>
    
              <div style="display: flex; align-items: center; justify-content: space-between;">
      <div style="display: flex; align-items: center;">
          <img
            src="${gapIcon}"
            alt="gap icon"
            style="width: 18px; margin-right: 8px;"
          />
        <p style="margin: 0;">Gap</p>
      </div>
      <div>
        <p>${
          gapData[dataPointIndex] > 0
            ? `+${gapData[dataPointIndex]}`
            : gapData[dataPointIndex]
        }</p>
      </div>
    </div>
              </div>
             
            </div>
          `;
        },
      },
    }));
  }, [dataGraph]);

  useEffect(() => {
    setMinOption(minYValue);
    // setOption1();
    setTooltip();
    return () => {
      dataGraph = [];
      minYValue = 0;
    };
  }, [minYValue, dataGraph]);

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={350}
        />

        <BarChart
          joinings={joinings}
          relieving={relieving}
          categories={categories}
        />
      </div>
      <div id="html-dist"></div>
      <div className="custom-legend">
        <span style={{ fontSize: 'small', fontWeight: 'bold' }}>Legend:</span>
        <div className="chart-legend">
          <div
            onClick={() => toggleSeries('Available')}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={availableIcon}
              alt="Available"
              style={{ width: '20px', marginRight: '5px' }}
            />
            <span>Available</span>
          </div>
          <div
            onClick={() => toggleSeries('Actual')}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={actualIcon}
              alt="Actual"
              style={{ width: '20px', marginRight: '5px' }}
            />
            <span>Actual</span>
          </div>
          <div
            onClick={() => toggleSeries('Gap')}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={gapIcon}
              alt="Gap"
              style={{ width: '20px', marginRight: '5px' }}
            />
            <span>Gap</span>
          </div>
          <div
            onClick={() => toggleSeries('Absenteeism Req')}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={absenteeismIcon}
              alt="Absenteeism"
              style={{ width: '20px', marginRight: '5px' }}
            />
            <span>+Absenteeism Req.</span>
          </div>
          <div
            onClick={() => toggleSeries('Base Req')}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={baseIcon}
              alt="Base Req"
              style={{ width: '20px', marginRight: '5px' }}
            />
            <span>Base Req.</span>
          </div>

          <div
            onClick={() => toggleSeries('Joinings')}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={joiningsIcon}
              alt="Joinings"
              style={{ width: '20px', marginRight: '5px' }}
            />
            <span>Joinings</span>
          </div>
          <div
            onClick={() => toggleSeries('Relievings(Actual - 26 days)')}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={relievingIcon}
              alt="Relievings(Actual - 26 days)"
              style={{ width: '20px', marginRight: '5px' }}
            />
            <span>Relievings(Actual - 26 days)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PlantManpowerChart };
