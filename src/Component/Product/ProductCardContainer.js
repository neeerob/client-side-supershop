import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import './ProductCard.css';

const ProductCardContainer = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  const displayedProducts = products.slice(startIndex, endIndex);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="product-card-container">
      <div className="product-list">
        <div className="product-grid">
          {displayedProducts.map((product) => (
            <div className="product-item" key={product._id}>
              <ProductCard product={product} />
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
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? 'active' : ''}
            >
              {index + 1}
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

export default ProductCardContainer;
