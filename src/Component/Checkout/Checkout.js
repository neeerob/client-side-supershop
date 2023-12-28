import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Checkout.css";
import Button from "@mui/joy/Button";

function CheckoutInfo() {
  const { id } = useParams();

  const [receiptData, setReceiptData] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/receipt/getReceiptByReceiptNumber/${id}`
      )
      .then((response) => {
        setReceiptData([response.data.data]);
      })
      .catch((error) => {
        console.error("Error fetching receipt data:", error);
        setReceiptData([]);
      });
  }, [id]);

  //   const handlePrint = () => {
  //     const printContent = document.getElementById("checkout-info-container");
  //     const newWindow = window.open("", "_blank");
  //     newWindow.document.write("<html><head><title>Receipt</title></head><body>");
  //     newWindow.document.write(printContent.innerHTML);
  //     newWindow.document.write("</body></html>");
  //     newWindow.document.close();
  //     newWindow.print();
  //   };

  const handlePrint = () => {
    const printContent = document.getElementById("checkout-info-container");
    const newWindow = window.open("", "_blank");

    // Define a stylesheet for the print window
    const styles = `
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 20px;
        padding: 0;
      }
      .receipt-heading {
        text-align: center;
        font-size: 20px;
        margin-bottom: 10px;
      }
      .receipt-details {
        border: 1px solid #000;
        padding: 10px;
        margin-bottom: 20px;
      }
      .sale-id {
        font-weight: bold;
      }
      .receipt-summary {
        display: flex;
        justify-content: space-between;
      }
      .receipt-summary-item {
        flex: 1;
        text-align: center;
        margin-top: 10px;
      }
      button {
        display: none;
      }
    </style>
  `;

    newWindow.document.write("<html><head><title>Receipt</title></head><body>");
    newWindow.document.write(styles);
    newWindow.document.write(printContent.innerHTML);
    newWindow.document.write("</body></html>");
    newWindow.document.close();
    newWindow.print();
  };

  return (
    <div className="checkout-info-container" id="checkout-info-container">
      <h1 className="receipt-heading">Receipt Information</h1>
      {receiptData.map((receipt, index) => (
        <div key={index} className="receipt-details">
          <h3>Receipt Number: {receipt.receiptNumber}</h3>
          <div className="sale-ids">
            <h3>Sale IDs:</h3>
            {receipt.selesId.map((sale) => (
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
              <p>${receipt.totalAmount.toFixed(2)}</p>
            </div>
            <div className="receipt-summary-item">
              <p>Discount:</p>
              <p>${receipt.discount.toFixed(2)}</p>
            </div>
            <div className="receipt-summary-item">
              <p>Tax Amount:</p>
              <p>${receipt.taxAmmount.toFixed(2)}</p>
            </div>
            <div className="receipt-summary-item">
              <p>Grand Total:</p>
              <p>${receipt.grandTotal.toFixed(2)}</p>
            </div>
          </div>
          <p>Date: {new Date(receipt.date).toLocaleDateString()}</p>

          <Button variant="solid" color="success" onClick={handlePrint}>
            Print
          </Button>
        </div>
      ))}
    </div>
  );
}

export default CheckoutInfo;
