import React, { useState } from "react";
import "./ReturnReceipt.css";
import axios from "axios";
import { Divider } from "@mui/material";
import Button from "@mui/joy/Button";
import Swal from "sweetalert2";

function ReturnReceipt() {
  const [receiptNumber, setReceiptNumber] = useState("");
  const [receiptData, setReceiptData] = useState(null);
  const [flag, setflag] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const handleFetchReceipt = async () => {
    setIsFetching(true);
    try {
      let url = `http://localhost:5000/receipt/getReceiptByReceiptNumber/${receiptNumber}`;
      const response = await axios.get(url);
      setReceiptData(response.data.data);
      console.log("hit");
      console.log(response.data.data.createDate);
      if (response.data.data.isActive == true) {
        setflag(true);
      } else {
        setflag(false);
      }
      setIsFetching(false);
      setConfirmationOpen(true);
    } catch (error) {
      console.error("Error fetching receipt:", error);
      setIsFetching(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Rreceipt not found!",
      });
    }
  };

  const handleReturnReceipt = async () => {
    // setSuccessOpen(true);
    // console.log("hit");

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        returnProduct();
      }
    });
  };

  const returnProduct = async () => {
    try {
      let url = `http://localhost:5000/receipt/retrnPrdt/${receiptNumber}`;
      const response = await axios.get(url);
      console.log(response);
      setConfirmationOpen(false);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Success",
        showConfirmButton: false,
        timer: 1500,
      });
      setReceiptData(null);

      // let pushDate = receiptData.createDate;
      // const apiUrl = "http://localhost:5000/sales/dailySalesReport";
      // const data = {
      //   createDate: pushDate,
      //   optional: "override",
      // };
      // axios
      //   .post(apiUrl, data)
      //   .then((response) => {
      //     console.log(response);
      //     Swal.fire({
      //       position: "top-end",
      //       icon: "success",
      //       title: "Success",
      //       showConfirmButton: false,
      //       timer: 1500,
      //     });
      //     setReceiptData(null);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    } catch (error) {
      console.error("Error fetching receipt:", error);
      setIsFetching(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Rreceipt not found!",
      });
    }
  };

  return (
    <div className="container1">
      <input
        type="text"
        placeholder="Enter Receipt Number"
        value={receiptNumber}
        onChange={(e) => setReceiptNumber(e.target.value)}
        className="input-field"
      />
      <button
        onClick={handleFetchReceipt}
        disabled={isFetching}
        className="fetch-button"
      >
        Fetch Receipt
      </button>

      {receiptData && setflag && (
        <div className="dialog">
          <h2>Receipt found! Do you want to return this receipt? </h2>
          <div className="checkout-info-container" id="checkout-info-container">
            <h1 className="receipt-heading">Receipt Information</h1>

            <div className="receipt-details">
              <h3>Receipt Number: {receiptData.receiptNumber}</h3>
              <div className="sale-ids">
                <h3>Sale IDs:</h3>
                {receiptData.selesId.map((sale) => (
                  <div>
                    <span key={sale._id} className="sale-id">
                      {sale.sele_id}
                    </span>
                    <br></br>
                  </div>
                ))}
              </div>
              <div className="receipt-summary">
                <div className="receipt-summary-item">
                  <p>Total Amount:</p>
                  <p>${receiptData.totalAmount.toFixed(2)}</p>
                </div>
                <div className="receipt-summary-item">
                  <p>Discount:</p>
                  <p>${receiptData.discount.toFixed(2)}</p>
                </div>
                <div className="receipt-summary-item">
                  <p>Tax Amount:</p>
                  <p>${receiptData.taxAmmount.toFixed(2)}</p>
                </div>
                <div className="receipt-summary-item">
                  <p>Grand Total:</p>
                  <p>${receiptData.grandTotal.toFixed(2)}</p>
                </div>
              </div>
              <p>Date: {new Date(receiptData.date).toLocaleDateString()}</p>

              {/* <Button variant="solid" color="success" onClick={handlePrint}>
                  Print
                </Button> */}
            </div>
          </div>
          <br></br>
          <div>
            {flag === true ? (
              <Button
                onClick={handleReturnReceipt}
                color="success"
                style={{ marginRight: "45px" }}
              >
                Yes
              </Button>
            ) : (
              <Button disabled color="danger" style={{ marginRight: "45px" }}>
                Already returned
              </Button>
            )}

            <Button
              onClick={() => setConfirmationOpen(false)}
              color="danger"
              style={{ marginLeft: "45px" }}
            >
              No
            </Button>
          </div>
        </div>
      )}

      {successOpen && (
        <div className="dialog">
          <h2>Return Successful</h2>
          <button
            onClick={() => setSuccessOpen(false)}
            className="confirm-button"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default ReturnReceipt;
