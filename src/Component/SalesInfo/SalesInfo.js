import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#FF33E5",
  "#33FFA5",
  "#FF6633",
];

const SalesPieChart = () => {
  const [data, setData] = useState([]);
  const [mainData, setMainData] = useState({
    totalMonthlyRevenue: "",
    totalMonthlyProfit: "",
  });

  const [mainData1, setMainData1] = useState({
    totalRevenue: "",
    LossOrProfit: "",
  });

  const [usefulInfo, setUsefulInfo] = useState({
    product_id: "",
    totalRevenue: "",
    totalUnitsSold: "",
    totalProfit: "",
  });
  const [hoveredData, setHoveredData] = useState(null);

  const centerItemStyle = {
    flex: "2",
    textAlign: "center",
  };

  const textItemStyle = {
    flex: "1",
    textAlign: "center",
    padding: "10px",
    color: "#007bff", // Blue color
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "5px",
  };

  useEffect(() => {
    // Make an Axios GET request to fetch the data
    axios
      .get(`${process.env.REACT_APP_API_URL}/sales/monthlysalesreport`)
      .then((response) => {
        setData(response.data.data[0].monthlySales);
        setMainData(response.data.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    axios
      .get(`${process.env.REACT_APP_API_URL}/sales/yearlysalesreport`)
      .then((response) => {
        setMainData1(response.data.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleMouseOver = (entry) => {
    setHoveredData(entry);
    let data = {
      product_id: entry.product_id,
      totalRevenue: entry.totalRevenue,
      totalUnitsSold: entry.totalUnitsSold,
      totalProfit: entry.totalProfit,
    };
    setUsefulInfo(data);
  };

  const handleMouseLeave = () => {
    setHoveredData(null);
    let data = {
      product_id: "",
      totalRevenue: "",
      totalUnitsSold: "",
      totalProfit: "",
    };
    setUsefulInfo(data);
  };

  const tooltipStyle = {
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    padding: "10px",
    borderRadius: "5px",
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  };

  const reportContainerStyle = {
    flex: "1",
    border: "1px solid #ccc",
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "#f0f0f0",
    margin: "5px",
  };

  const reportTitleStyle = {
    fontWeight: "bold",
    marginBottom: "5px",
  };

  const reportItemStyle = {
    marginBottom: "5px",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h2>Sales report</h2>
        <div style={containerStyle}>
          {mainData.totalMonthlyProfit !== "" &&
          mainData1.totalRevenue !== "" ? (
            <div style={containerStyle}>
              <div style={reportContainerStyle}>
                <div style={reportTitleStyle}>Monthly report</div>
                <div style={reportItemStyle}>
                  Revenue: {mainData.totalMonthlyRevenue.toFixed(2)} $
                </div>
                <div style={reportItemStyle}>
                  Profit: {mainData.totalMonthlyProfit.toFixed(2)} $
                </div>
              </div>
              <div style={reportContainerStyle}>
                <div style={reportTitleStyle}>Yearly report</div>
                <div style={reportItemStyle}>
                  Revenue: {mainData1.totalRevenue.toFixed(2)} $
                </div>
                <div style={reportItemStyle}>
                  Profit: {mainData1.LossOrProfit.toFixed(2)} $
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            dataKey="totalRevenue"
            nameKey="product_id"
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={140}
            fill="#8884d8"
            label
            onMouseEnter={handleMouseOver}
            onMouseLeave={handleMouseLeave}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={tooltipStyle}
            cursor={{ stroke: "black", strokeWidth: 1 }}
          >
            {hoveredData && (
              <div>
                <p>
                  <strong>Product ID:</strong> {hoveredData.product_id}
                </p>
                <p>
                  <strong>Total Revenue:</strong> {hoveredData.totalRevenue}
                </p>
                <p>
                  <strong>Total Units Sold:</strong>{" "}
                  {hoveredData.totalUnitsSold}
                </p>
                <p>
                  <strong>Total Profit:</strong> {hoveredData.totalProfit}
                </p>
                <p>
                  <strong>Additional Field:</strong>{" "}
                  {hoveredData.additionalField}
                </p>
              </div>
            )}
          </Tooltip>
        </PieChart>
        {usefulInfo.product_id !== "" ? (
          <div className="info-container">
            <div className="info-item">
              <strong>Product ID:</strong> {usefulInfo.product_id}
            </div>
            <div className="info-item">
              <strong>Total Revenue:</strong> {usefulInfo.totalRevenue}
            </div>
            <div className="info-item">
              <strong>Total Units Sold:</strong> {usefulInfo.totalUnitsSold}
            </div>
            <div className="info-item profit">
              <strong>Total Profit:</strong> {usefulInfo.totalProfit}
            </div>
          </div>
        ) : (
          <></>
        )}
        <Legend
          align="right"
          verticalAlign="middle"
          layout="vertical"
          wrapperStyle={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
      </div>
    </div>
  );
};

export default SalesPieChart;
