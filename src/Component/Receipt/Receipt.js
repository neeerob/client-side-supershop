import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Receipt.css";

function Receipt() {
  const [receipts, setReceipts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [totalPages, setTotalPages] = useState(10);

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/receipt/getAllReceipt?page=${currentPage}&pageSize=${itemsPerPage}`
      )
      .then((response) => {
        setReceipts(response.data.data);
        // Edit here to modify product page information.
        // Update totalPages based on the total receipts count from the response
        // setTotalPages(Math.ceil(response.data.data.length / itemsPerPage));
        // console.log(totalPages);
      })
      .catch((error) => {
        console.error("Error fetching receipts:", error);
      });
  }, [currentPage, itemsPerPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="receipt-container">
      <h1>Receipts</h1>
      <div className="receipt-list">
        {receipts.map((receipt) => (
          <div key={receipt._id} className="receipt-card">
            <h3>Receipt Number: {receipt.receiptNumber}</h3>
            <p>Total Amount: ${receipt.totalAmount.toFixed(2)}</p>
            <p>Discount: ${receipt.discount.toFixed(2)}</p>
            <p>Tax Amount: ${receipt.taxAmmount.toFixed(2)}</p>
            <p>Grand Total: ${receipt.grandTotal.toFixed(2)}</p>
            <p>Date: {new Date(receipt.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`page-button ${
              currentPage === index + 1 ? "active" : ""
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Receipt;
