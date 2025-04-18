import React, { useRef, useState } from "react";

import availableManpowerIcon from "../../../../../assets/svg/AvailableManpowerBlue.svg";
import basicRequirementIcon from "../../../../../assets/svg/BasicRequirementTopicalBlue.svg";
import onlineIcon from "../../../../../assets/svg/Online.svg";
import RelieversIcon from "../../../../../assets/svg/Relievers.svg";
import surplusIcon from "../../../../../assets/svg/Surplus.svg";
import gapDownArrowIcon from "../../../../../assets/svg/gapDownArrow.svg";
import surplusUpArrowIcon from "../../../../../assets/svg/surplusUpArrow.svg";

import tooltipIcon from "../../../../../assets/svg/tooltipIcon.svg";

import {
  Area,
  Bar,
  ComposedChart,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import moment from "moment";
import {} from "./waterfallchart.css";

// const data = [
//   {
//     period: "Nov '23",
//     basicRequirements: 7800,
//     relievers: 200,
//     hiddenRelievers: 8000,
//     attrition: -200,
//     hiddenAttrition: 7400,
//     joinings: 550,
//     hiddenJoinings: 7400,
//     availableManpower: 7980,
//     gap: 100,
//   },
//   {
//     period: "Dec '23",
//     basicRequirements: 7800,
//     relievers: null,
//     hiddenRelievers: null,
//     attrition: -200,
//     hiddenAttrition: 7400,
//     joinings: 550,
//     hiddenJoinings: 7400,
//     availableManpower: 7980,
//     gap: -100,
//   },
//   {
//     period: "Jan '24",
//     basicRequirements: 7800,
//     relievers: null,
//     hiddenRelievers: null,
//     attrition: -200,
//     hiddenAttrition: 7400,
//     joinings: 550,
//     hiddenJoinings: 7400,
//     availableManpower: 7980,
//     gap: 200,
//   },
//   {
//     period: "Feb '24",
//     basicRequirements: 7800,
//     relievers: null,
//     hiddenRelievers: null,
//     attrition: -200,
//     hiddenAttrition: 7400,
//     joinings: 550,
//     hiddenJoinings: 7400,
//     availableManpower: 7980,
//     gap: -300,
//   },
//   {
//     period: "Mar '24",
//     basicRequirements: 7800,
//     relievers: -312,
//     hiddenRelievers: 7488,
//     attrition: -200,
//     hiddenAttrition: 7288,
//     joinings: 550,
//     hiddenJoinings: 7288,
//     availableManpower: 7980,
//     gap: 400,
//   },
// ];

const WaterfallChart = ({ chartData }) => {
  const chartRef = useRef(null);
  const dataGraph = chartData;
  const [hoveredGap, setHoveredGap] = useState(null);
  const chartDataLength = dataGraph.length;

  const toggleSeries = (seriesName) => {
    if (chartRef.current) {
      chartRef.current.toggleSeries(seriesName);
    }
  };

  const handleMouseEnter = (value, x, y) => {
    setHoveredGap({ value, x, y });
  };

  const handleMouseLeave = () => {
    setHoveredGap(null);
  };

  return (
    <ResponsiveContainer minWidth={200} height={450}>
      <ComposedChart
        data={dataGraph}
        margin={{ top: 10, right: 50, left: 20, bottom: 60 }}
        barCategoryGap="10%"
        barGap={2}
      >
        <XAxis
          dataKey="period"
          scale="point"
          padding={{
            left:
              chartDataLength === 3 ? 190 : chartDataLength <= 2 ? 274 : 110,
            right:
              chartDataLength === 3 ? 170 : chartDataLength <= 2 ? 274 : 100,
          }}
          tick={({ x, y, payload }) => {
            const period = payload.value;
            const basicRequirements = dataGraph.find(
              (item) => item.period === period
            )?.basicRequirements;
            return (
              <g transform={`translate(${x},${y + 10})`}>
                <text x={0} y={0} dy={10} textAnchor="middle" fill="#666">
                  {moment(period, "M-YYYY").format("MMM YYYY")}
                </text>
                <text
                  x={0}
                  y={20}
                  dy={10}
                  textAnchor="middle"
                  fill="#666"
                  fontSize="10"
                >
                  {`Base Req.: ${basicRequirements}`}
                </text>
              </g>
            );
          }}
        />

        <YAxis allowDecimals={false} domain={[0, 1000]} />

        <Area
          type="monotone"
          dataKey="basicRequirements"
          stackId="d"
          fill="#c9d9f9"
          stroke="#4682b4"
          name="Base Requirement"
          fillOpacity={0.2}
        />

        <Bar
          dataKey="hiddenRelievers"
          stackId={"a"}
          fill="#0000"
          name="Relievers"
          legendType="none"
        />
        {
          <Bar
            dataKey="relievers"
            stackId={"a"}
            fill="#ffcccb"
            name="Relievers"
          >
            <LabelList dataKey="relievers" position="top" />
          </Bar>
        }
        <Bar
          dataKey="hiddenAttrition"
          stackId={"b"}
          fill="#0000"
          name="Attrition"
          legendType="none"
        />
        <Bar dataKey="attrition" stackId={"b"} fill="#ff6b6b" name="Attrition">
          <LabelList dataKey="attrition" position="bottom" />
        </Bar>

        <Bar
          dataKey="hiddenJoinings"
          stackId={"c"}
          fill="#0000"
          name="Joinings"
          legendType="none"
        />
        {dataGraph.map((entry, index) => {
          if (!entry) return null;

          return (
            <React.Fragment key={index}>
              {entry.joinings > 0 ? (
                <Bar
                  dataKey="joinings"
                  stackId={"c"}
                  fill="#90ee90"
                  name="Joinings"
                >
                  <LabelList dataKey="joinings" position="top" />
                </Bar>
              ) : entry.joinings === 0 ? null : (
                <Bar
                  dataKey="joinings"
                  stackId={"c"}
                  fill="#90ee90"
                  name="Joinings"
                >
                  <LabelList
                    position="top"
                    content={({ x, y }) => (
                      <text
                        x={x}
                        y={y - 10}
                        fill="black"
                        fontSize={12}
                        textAnchor="middle"
                      >
                        {/* <tspan x={x} dy="-5">Joining Data</tspan>
                <tspan x={x} dy="15">Not Available</tspan> */}
                      </text>
                    )}
                  />
                </Bar>
              )}
            </React.Fragment>
          );
        })}

        <Bar
          dataKey="availableManpower"
          fill="#3a5ea8"
          name="Available Manpower"
          barSize={40}
          margin={{ left: 0, right: 0 }}
        >
          <LabelList
            dataKey="gap"
            position="top"
            content={({ x, y, value, index, width }) => {
              if ((value) => 0) {
                const dataPoint = chartData[index];
                const availableManpower = dataPoint?.availableManpower || 0;
                const basicRequirement = dataPoint?.basicRequirements || 0;

                return (
                  <>
                    {availableManpower > 0 && (
                      <text
                        x={x + width / 2}
                        y={y + 20}
                        fill="white"
                        fontSize={8}
                        textAnchor="middle"
                      >
                        {availableManpower}
                      </text>
                    )}

                    <text
                      x={x + width / 2}
                      y={y - 10}
                      fill={value > 0 ? "#58a55c" : "#d83b01"}
                      fontSize={12}
                      textAnchor="middle"
                      onMouseEnter={() => handleMouseEnter(value, x, y)}
                      onMouseLeave={handleMouseLeave}
                      style={{
                        cursor: "pointer",
                        position: "absolute",
                        zIndex: "1",
                      }}
                    >
                      {value > 0
                        ? `↑+${value}`
                        : value === 0
                        ? ""
                        : `↓-${Math.abs(value)}`}
                    </text>
                    {hoveredGap && hoveredGap.value === value && (
                      <foreignObject
                        className="hover-waterfall-main"
                        x={hoveredGap.x - 188}
                        y={hoveredGap.y - 85}
                        width={290}
                        height={80}
                        style={{
                          pointerEvents: "none",
                          position: "relative",
                          overflow: "visible",
                          width: "100%",
                        }}
                      >
                        <div
                          className="hover-waterfall"
                          style={{
                            background: "#f4f5f8",
                            border: "2px solid #ccc",
                            borderRadius: "5px",
                            padding: "10px",
                            textAlign: "center",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
                            fontSize: "12px",
                            marginBottom: "10px",
                            position: "absolute",
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <p style={{ margin: 0, fontWeight: "bold" }}></p>
                          <p
                            style={{
                              margin: 0,
                              fontSize: "11px",
                              display: "flex",
                              justifyContent: "space-around",
                              alignItems: "top",
                              color: "#66696B",
                              gap: "4px",
                            }}
                          >
                            <span>
                              {value > 0 ? "Surplus" : "Gap"} <br />
                              <span
                                style={{
                                  color: value > 0 ? "#58a55c" : "#d83b01",
                                  fontWeight: "600",
                                }}
                              >
                                ({value >= 0 ? `+${value}` : value})
                              </span>
                            </span>
                            =
                            <span>
                              Available Manpower <br />
                              <span
                                style={{ color: "grey", fontWeight: "600" }}
                              >
                                ({availableManpower})
                              </span>
                            </span>{" "}
                            {"-"}{" "}
                            <span>
                              Basic Requirement <br />
                              <span
                                style={{ color: "grey", fontWeight: "600" }}
                              >
                                ({basicRequirement})
                              </span>
                            </span>
                          </p>
                        </div>

                        <div
                          style={{
                            position: "absolute",
                            background: "transparent",
                            bottom: "-17px",
                          }}
                        >
                          <img
                            src={tooltipIcon}
                            alt="arrow"
                            style={{
                              width: "20px",
                              backgroundColor: "transparent",
                              marginBottom: "30px",
                              marginLeft: "197px",
                            }}
                          />
                        </div>
                      </foreignObject>
                    )}
                  </>
                );
              } else {
                return null;
              }
            }}
          />
        </Bar>
      </ComposedChart>

      {/* Legend */}
      <div className="customWaterfallLegend">
        <span style={{ fontSize: "small", fontWeight: "bold" }}>Legend:</span>
        <div className="waterfallLegend">
          <div
            onClick={() => toggleSeries("Basic requirement")}
            style={{ cursor: "pointer" }}
          >
            <img
              src={basicRequirementIcon}
              alt="Basic requirement"
              style={{ width: "10px", marginRight: "5px" }}
            />
            <span>Basic requirement</span>
          </div>
          <div
            onClick={() => toggleSeries("Relievers")}
            style={{ cursor: "pointer" }}
          >
            <img
              src={RelieversIcon}
              alt="Relievings"
              style={{ width: "10px", marginRight: "5px" }}
            />
            <span>Relievings</span>
          </div>
          <div
            onClick={() => toggleSeries("Attrition")}
            style={{ cursor: "pointer" }}
          >
            <img
              src={surplusIcon}
              alt="Attrition"
              style={{ width: "10px", marginRight: "5px" }}
            />
            <span>Attrition</span>
          </div>
          <div
            onClick={() => toggleSeries("Joinings (Actual/Planned)")}
            style={{ cursor: "pointer" }}
          >
            <img
              src={onlineIcon}
              alt="Joinings (Actual/Planned)"
              style={{ width: "10px", marginRight: "5px" }}
            />
            <span>Joinings (Actual/Planned)</span>
          </div>
          <div
            onClick={() => toggleSeries("Available Manpower")}
            style={{ cursor: "pointer" }}
          >
            <img
              src={availableManpowerIcon}
              alt="Available Manpower"
              style={{ width: "10px", marginRight: "5px" }}
            />
            <span>Available Manpower</span>
          </div>
          <div
            onClick={() => toggleSeries("Surplus")}
            style={{ cursor: "pointer" }}
          >
            <img
              src={surplusUpArrowIcon}
              alt="Surplus"
              style={{ width: "14px", marginRight: "5px" }}
            />
            <span>Surplus</span>
          </div>
          <div
            onClick={() => toggleSeries("Gap")}
            style={{ cursor: "pointer" }}
          >
            <img
              src={gapDownArrowIcon}
              alt="Gap"
              style={{ width: "14px", marginRight: "5px" }}
            />
            <span>Gap</span>
          </div>
        </div>
      </div>
    </ResponsiveContainer>
  );
};

export default WaterfallChart;
