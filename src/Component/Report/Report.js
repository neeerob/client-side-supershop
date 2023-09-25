import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";

const DailySalesReportPage = () => {
  const [reportType, setReportType] = useState(true); // Default to daily report
  const [dailySalesData, setDailySalesData] = useState([]);
  const [totalCalculation, setTotalCalculation] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(""); // Add selectedMonth state
  const [isLoading, setIsLoading] = useState(false);
  const [isFutureDate, setisFutureDate] = useState(false);
  const [isNoSale, setIsNoSale] = useState(false);
  const [isNoSale2, setIsNoSale2] = useState(false);

  const fetchDailySalesReport = (createDate) => {
    setIsLoading(true);
    const apiUrl = "http://localhost:5000/sales/dailySalesReport";
    const data = {
      createDate: createDate,
    };
    const currectdate = new Date();
    const targetdate = new Date(createDate);
    if (targetdate > currectdate) {
      console.log("greater");
      setisFutureDate(true);
    } else {
      setisFutureDate(false);
      axios
        .post(apiUrl, data)
        .then((response) => {
          if (response.data.data === null) {
            setDailySalesData([]);
            setTotalCalculation([]);
            setIsNoSale2(true);
          } else {
            setDailySalesData(response.data.data.products);
            setTotalCalculation(response.data.data);
            setIsNoSale2(false);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const fetchMonthlySalesReport = (selectedMonth) => {
    setIsLoading(true);
    const apiUrl = "http://localhost:5000/sales/monthlySalesReport";
    const data = {
      selectedMonth: selectedMonth,
    };

    axios
      .post(apiUrl, data)
      .then((response) => {
        if (response.data.data === null) {
          setDailySalesData([]);
          setTotalCalculation([]);
          setIsNoSale2(true);
        } else {
          setDailySalesData(response.data.data.products);
          setTotalCalculation(response.data.data);
          setIsNoSale2(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (selectedDate && reportType) {
      fetchDailySalesReport(selectedDate);
    } else if (selectedMonth && !reportType) {
      fetchMonthlySalesReport(selectedMonth);
    }
  }, [selectedDate, selectedMonth, reportType]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const total = dailySalesData.reduce(
    (acc, item) => {
      acc.totalCostPrice = item.totalCostPrice;
      acc.totalRevenue += item.totalRevenue;
      acc.totalUnitsSold += item.totalUnitsSold;
      acc.totalProfit += item.totalProfit;
      acc.totalLoss += item.totalLoss;
      return acc;
    },
    {
      totalCostPrice: 0,
      totalRevenue: 0,
      totalUnitsSold: 0,
      totalProfit: 0,
      totalLoss: 0,
    }
  );

  const netProfitLoss = total.totalProfit - total.totalLoss;
  const netProfitLossColor = netProfitLoss >= 0 ? "green" : "red";

  return (
    <Container>
      <Button
        variant="contained"
        color="primary"
        style={{
          top: "30px",
          margin: "30px",
          backgroundColor: reportType ? "#007BFF" : "#999", // Adjust button color based on reportType
          color: "white",
          borderRadius: "5px",
          padding: "10px 20px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
          transition: "background-color 0.3s ease",
        }}
        onClick={() => setReportType(true)}
      >
        Daily Report
      </Button>

      <Button
        variant="contained"
        color="secondary"
        style={{
          top: "30px",
          margin: "30px",
          backgroundColor: reportType ? "#999" : "#FF4500", // Adjust button color based on reportType
          color: "white",
          borderRadius: "5px",
          padding: "10px 20px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
          transition: "background-color 0.3s ease",
        }}
        onClick={() => setReportType(false)}
      >
        Monthly Report
      </Button>
      {reportType ? (
        <Container>
          <h1>Daily Sales Report</h1>
          <FormControl variant="outlined">
            <TextField
              type="date"
              variant="outlined"
              value={selectedDate}
              onChange={handleDateChange}
              InputLabelProps={{ shrink: true }}
            />
          </FormControl>
          {isFutureDate ? (
            <p>Future date selected...</p>
          ) : (
            <>
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <>
                  {isNoSale ? (
                    <p> No sales in that day</p>
                  ) : (
                    <>
                      <p>
                        <TableContainer
                          component={Paper}
                          style={{ marginTop: "16px" }}
                        >
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>Product Name</TableCell>
                                <TableCell>Buying Price</TableCell>
                                <TableCell>Sold Price</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Total Profit</TableCell>
                                <TableCell>Total Loss</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {dailySalesData.map((item) => (
                                <TableRow key={item.product_id}>
                                  <TableCell>{item.productName}</TableCell>
                                  <TableCell>
                                    ${item.totalCostPrice.toFixed(2)}
                                  </TableCell>
                                  <TableCell>
                                    ${item.totalRevenue.toFixed(2)}
                                  </TableCell>
                                  <TableCell>{item.totalUnitsSold}</TableCell>
                                  <TableCell>
                                    ${item.totalProfit.toFixed(2)}
                                  </TableCell>
                                  <TableCell>
                                    ${item.totalLoss.toFixed(2)}
                                  </TableCell>
                                </TableRow>
                              ))}
                              <TableRow
                                style={{
                                  background: "#f0f0f0",
                                  fontWeight: "bold",
                                }}
                              >
                                <TableCell>
                                  <b>Total</b>
                                </TableCell>
                                <TableCell>
                                  <b>${total.totalCostPrice.toFixed(2)}</b>
                                </TableCell>
                                <TableCell>
                                  <b>${total.totalRevenue.toFixed(2)}</b>
                                </TableCell>
                                <TableCell>
                                  <b>{total.totalUnitsSold}</b>
                                </TableCell>
                                <TableCell>
                                  <b>${total.totalProfit.toFixed(2)}</b>
                                </TableCell>
                                <TableCell>
                                  <b>${total.totalLoss.toFixed(2)}</b>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                {isNoSale2 ? (
                                  <TableCell colSpan={1} align="left">
                                    <b>No sales in this day </b>
                                  </TableCell>
                                ) : (
                                  <>
                                    <TableCell colSpan={5} align="right">
                                      Net Profit/Loss:
                                    </TableCell>
                                    <TableCell
                                      style={{ color: netProfitLossColor }}
                                    >
                                      <b>${netProfitLoss.toFixed(2)}</b>
                                    </TableCell>
                                  </>
                                )}
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </p>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </Container>
      ) : (
        <Container>
          <h1>Monthly Sales Report</h1>
          <FormControl variant="outlined">
            <FormControl variant="outlined">
              <TextField
                label="Month"
                type="month"
                variant="outlined"
                value={selectedMonth}
                onChange={handleMonthChange}
                InputLabelProps={{ shrink: true }}
                inputProps={{ max: "yyyy-MM" }}
              />
            </FormControl>
            <FormControl variant="outlined">
              {/* <TextField
                label="Year"
                type="number"
                variant="outlined"
                value={selectedYear}
                onChange={handleYearChange}
              /> */}
            </FormControl>
          </FormControl>
          {/* Rest of the monthly report UI */}
        </Container>
      )}
    </Container>
  );
};

export default DailySalesReportPage;
