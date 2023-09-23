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
  const [dailySalesData, setDailySalesData] = useState([]);
  const [totalCalculation, setTotalCalculation] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isNoSale, setIsNoSale] = useState(false);

  const fetchDailySalesReport = (createDate) => {
    setIsLoading(true);
    const apiUrl = "http://localhost:5000/sales/dailySalesReport";
    const data = {
      createDate: createDate,
    };

    axios
      .post(apiUrl, data)
      .then((response) => {
        if (response.data.data.length > 0) {
          setDailySalesData(response.data.data[0].products);
          setTotalCalculation(response.data.data[0]);
          setIsNoSale(false);
        } else {
          setIsNoSale(true);
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
    if (selectedDate) {
      fetchDailySalesReport(selectedDate);
    }
  }, [selectedDate]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
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
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {isNoSale ? (
            <p> No sales in that day</p>
          ) : (
            <>
              <p>
                <TableContainer component={Paper} style={{ marginTop: "16px" }}>
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
                          <TableCell>${item.totalRevenue.toFixed(2)}</TableCell>
                          <TableCell>{item.totalUnitsSold}</TableCell>
                          <TableCell>${item.totalProfit.toFixed(2)}</TableCell>
                          <TableCell>${item.totalLoss.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow
                        style={{ background: "#f0f0f0", fontWeight: "bold" }}
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
                        <TableCell colSpan={5} align="right">
                          Net Profit/Loss:
                        </TableCell>
                        <TableCell style={{ color: netProfitLossColor }}>
                          <b>${netProfitLoss.toFixed(2)}</b>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </p>
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default DailySalesReportPage;
