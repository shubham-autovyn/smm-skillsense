import React, { useEffect, useRef, useState } from "react";
import Chart from "react-apexcharts";
import actualIcon from "../../../../../assets/svg/actualLegend.svg";
import plannedIcon from "../../../../../assets/svg/plannedLegend.svg";

import {} from "./DatewiseChart.css";
const BarChart = ({ graphData }) => {
  const chartRef = useRef(null);

  const toggleSeries = (seriesName) => {
    if (chartRef.current) {
      chartRef.current.toggleSeries(seriesName);
    }
  };
  const rawData = graphData;

  const categories = rawData.map((item) => {
    const [day, month, year] = item.date.split("-");

    const formattedDate = new Date(`${year}-${month}-${day}`);

    if (isNaN(formattedDate.getTime())) {
      console.error(`Invalid date: ${item.date}`);
      return "";
    }

    return `${formattedDate.getDate()}/${
      formattedDate.getMonth() + 1
    }/${formattedDate.getFullYear()}`;
  });

  const plannedData = rawData.map((item) =>
    item.plannedJoinings !== 0 ? item.plannedJoinings : null
  );
  const actualData = rawData.map((item) =>
    item.actualJoings !== 0 ? item.actualJoings : null
  );

  // Find the maximum value
  const maxNumber =
    Math.ceil(
      Math.max(
        ...rawData.map((item) =>
          Math.max(item.plannedJoinings, item.actualJoings)
        )
      ) / 100
    ) * 100;

  // State for chart configuration
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        type: "bar",
        stacked: false,
        toolbar: {
          show: false, // Disable toolbar (download/export options)
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          dataLabels: {
            position: "top", // Position the labels on top of bars
          },
          columnWidth: "35%",
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val === null ? "" : val;
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#000"],
        },
      },
      xaxis: {
        categories: categories, // Dates on the X-axis
        text: "",
      },
      yaxis: {
        labels: {
          formatter: (val) => Math.floor(val), // Remove decimals on Y-axis
        },
        min: 0,
        max: maxNumber,
        tickAmount: maxNumber / 100,
      },
      colors: ["#a5c3ff", "#30c030"], // Colors for Planned and Actual bars
      legend: {
        show: false,
        position: "bottom",
        labels: {
          colors: ["#000"],
        },
        markers: {
          width: 10,
          height: 10,
        },
      },
      tooltip: {
        shared: true,
        intersect: false,
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          const data = rawData[dataPointIndex];
          if (!data) return null;
          return (
            "<div style='font-family: Arial, sans-serif; color: #333; padding: 10px; background-color: #f4f5f8;'>" +
            "<span style='border: 1px solid #C9D9F9; display: inline-block; height: 10px; width: 10px; border-radius: 100%; background-color: #C9D9F9; margin-right: 5px;'></span>" +
            "<p style='color: #66696B;  font-size:12px;'>Planned</p> " +
            "<span style='color: #343536;  font-size:12px; font-weight: 600; margin-right: 10px'>" +
            (data?.plannedJoinings || 0) +
            "</span>" +
            "<span style='color: #343536;   font-size:12px; font-weight: 400'>" +
            "(" +
            data?.date +
            ")" +
            "</span>" +
            "<br>" +
            "<span style='border: 1px solid #58A55C; display: inline-block; height: 10px; width: 10px; border-radius: 100%; background-color: #58A55C; margin-right: 5px;'></span>" +
            "<p style='color: #66696B;  font-size:12px;'>Actual</p> " +
            "<span style='color: #343536;  font-size:12px; font-weight: 600; margin-right: 10px'>" +
            (data?.actualJoings || 0) +
            "</span>" +
            "<span style='color: #343536;  font-size:12px; font-weight: 400'>" +
            "(" +
            data?.date +
            ")" +
            "</span>" +
            "<br>" +
            "<b style='color: #343536; margin-left: 15px; font-size:12px;'>Actual Joiners Categories</b>" +
            "<ul style='padding-left: 15px;  font-size:12px;'>" +
            (data?.categoryWise
              ?.map(
                (category) =>
                  "<li style=' list-style-type: none;'>" +
                  "<p style='color:rgb(121, 121, 121); display: inline; font-size: 12px' >" +
                  " <b>" +
                  category?.level +
                  "</b>  <b>" +
                  "<span style='color:rgb(0, 0, 0); font-weight: 600 font-size: 12px'>" +
                  category?.count +
                  "</span>" +
                  "</b>" +
                  "</p>" +
                  "</li>"
              )
              .join("") || "") +
            "</ul>" +
            "</div>"
          );
        },
      },

      grid: {
        show: true, // Enable grid lines
        xaxis: {
          lines: {
            show: true, // Enable X-axis grid lines
          },
        },
        yaxis: {
          lines: {
            show: false, // Disable Y-axis grid lines
          },
        },
      },
    },
    series: [
      {
        name: "Planned Joinings",
        data: plannedData, // Use planned joinings
      },
      {
        name: "Actual Joinings",
        data: actualData, // Use actual joinings
      },
    ],
  });

  useEffect(() => {
    if (!graphData || graphData.length === 0) return;

    const categories = graphData.map((item) => {
      const [day, month, year] = item.date.split("-");
      const formattedDate = new Date(`${year}-${month}-${day}`);
      return isNaN(formattedDate.getTime()) ? "" : `${day}/${month}/${year}`;
    });

    const plannedData = graphData.map((item) =>
      item.plannedJoinings !== 0 ? item.plannedJoinings : null
    );
    const actualData = graphData.map((item) =>
      item.actualJoings !== 0 ? item.actualJoings : null
    );

    const maxNumber =
      Math.ceil(
        Math.max(
          ...graphData.map((item) =>
            Math.max(item.plannedJoinings, item.actualJoings)
          )
        ) / 100
      ) * 100;

    setChartData((prev) => ({
      ...prev,
      options: {
        ...prev.options,
        xaxis: { ...prev.options.xaxis, categories },
        yaxis: {
          ...prev.options.yaxis,
          max: maxNumber,
          tickAmount: maxNumber / 100,
        },
        tooltip: {
          ...prev.options.tooltip,
          custom: function ({ series, seriesIndex, dataPointIndex, w }) {
            const data = graphData[dataPointIndex]; // <-- Ensure latest data
            if (!data) return null;
            return (
              "<div style='font-family: Arial, sans-serif; color: #333; padding: 10px; background-color: #f4f5f8;'>" +
              "<span style='border: 1px solid #C9D9F9; display: inline-block; height: 10px; width: 10px; border-radius: 100%; background-color: #C9D9F9; margin-right: 5px;'></span>" +
              "<p style='color: #66696B;  font-size:12px;'>Planned</p> " +
              "<span style='color: #343536;  font-size:12px; font-weight: 600; margin-right: 10px'>" +
              (data?.plannedJoinings || 0) +
              "</span>" +
              "<span style='color: #343536;   font-size:12px; font-weight: 400'>" +
              "(" +
              data?.date +
              ")" +
              "</span>" +
              "<br>" +
              "<span style='border: 1px solid #58A55C; display: inline-block; height: 10px; width: 10px; border-radius: 100%; background-color: #58A55C; margin-right: 5px;'></span>" +
              "<p style='color: #66696B;  font-size:12px;'>Actual</p> " +
              "<span style='color: #343536;  font-size:12px; font-weight: 600; margin-right: 10px'>" +
              (data?.actualJoings || 0) +
              "</span>" +
              "<span style='color: #343536;  font-size:12px; font-weight: 400'>" +
              "(" +
              data?.date +
              ")" +
              "</span>" +
              "<br>" +
              "<b style='color: #343536; margin-left: 15px; font-size:12px;'>Actual Joiners Categories</b>" +
              "<ul style='padding-left: 15px;  font-size:12px;'>" +
              (data?.categoryWise
                ?.map(
                  (category) =>
                    "<li style=' list-style-type: none;'>" +
                    "<p style='color:rgb(121, 121, 121); display: inline; font-size: 12px' >" +
                    " <b>" +
                    category?.level +
                    "</b>  <b>" +
                    "<span style='color:rgb(0, 0, 0); font-weight: 600 font-size: 12px'>" +
                    category?.count +
                    "</span>" +
                    "</b>" +
                    "</p>" +
                    "</li>"
                )
                .join("") || "") +
              "</ul>" +
              "</div>"
            );
          },
        },
      },
      series: [
        { name: "Planned Joinings", data: plannedData },
        { name: "Actual Joinings", data: actualData },
      ],
    }));
  }, [graphData]);

  return (
    <div className="app">
      <div className="row">
        <div className="chart plant-cm-chart">
          <Chart
            className="plant-manpower-chart"
            options={chartData.options}
            series={chartData.series}
            type="bar"
            height="350"
          />
          <div className="dateWiseFooter">
            <div className="dateWiseLegend">
              <span style={{ fontSize: "small", fontWeight: "bold" }}>
                Legend:
              </span>
              <div className="dateWiseChartLegend">
                <div
                  onClick={() => toggleSeries("Planned")}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={plannedIcon}
                    alt="Planned"
                    style={{ width: "10px", marginRight: "5px" }}
                  />
                  <span>Planned</span>
                </div>

                <div
                  onClick={() => toggleSeries("Actual")}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={actualIcon}
                    alt="Actual"
                    style={{ width: "10px", marginRight: "5px" }}
                  />
                  <span>Actual</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarChart;
