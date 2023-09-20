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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import axios from "axios";

const DailySalesReportPage = () => {
  const [dailySalesData, setDailySalesData] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const apiUrl = "http://localhost:5000/sales/dailySalesReport";

    axios
      .get(apiUrl)
      .then((response) => {
        setDailySalesData(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const filteredData = dailySalesData.filter(
    (item) => item.date === selectedDate
  );

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <Container>
      <h1>Daily Sales Report</h1>
      <FormControl variant="outlined">
        <InputLabel>Date</InputLabel>
        <Select label="Date" value={selectedDate} onChange={handleDateChange}>
          <MenuItem value="">All Dates</MenuItem>
          {dailySalesData.map((item) => (
            <MenuItem key={item.date} value={item.date}>
              {item.date}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TableContainer component={Paper} style={{ marginTop: "16px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Total Revenue</TableCell>
              <TableCell>Total Units Sold</TableCell>
              <TableCell>Total Profit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.date}>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.totalRevenue}</TableCell>
                <TableCell>{item.totalUnitsSold}</TableCell>
                <TableCell>{item.totalProfit}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default DailySalesReportPage;
