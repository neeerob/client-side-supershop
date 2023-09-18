import React, { useState, useEffect } from "react";
import ProductCardModify from "./ProductCardModify";
import "./ProductCard.css";

const ProductCardContainerModify = ({ products, onDeleteProduct }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;
  const maxVisiblePages = 5; // Change this to adjust the number of visible pages

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  const displayedProducts = products.slice(startIndex, endIndex);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const visiblePages = [];
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

  while (visiblePages.length < maxVisiblePages && startPage <= endPage) {
    visiblePages.push(startPage);
    startPage++;
  }

  return (
    <div className="product-card-container">
      <div className="product-list">
        <div className="product-grid">
          {displayedProducts.map((product) => (
            <div className="product-item" key={product._id}>
              <ProductCardModify product={product} />
            </div>
          ))}
        </div>
      </div>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <div className="page-buttons">
          {visiblePages.map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={currentPage === page ? "active" : ""}
            >
              {page}
            </button>
          ))}
        </div>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductCardContainerModify;
