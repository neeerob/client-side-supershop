import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import ProductCardContainer from '../Component/Product/ProductCardContainer';

const Home = () => {
  const [searchValue, setSearchValue] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const apiUrl = 'http://localhost:5000/product/all?page=1&pageSize=100';

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  useEffect(() => {
    // Filter products based on the search input
    const filtered = products.filter((product) =>
      product.productName.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchValue, products]);

  const handleSearchChange = (event, value) => {
    setSearchValue(value);
  };

  return (
    <>
      <div className="main-container">
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }} className="search">
          <Stack spacing={2} sx={{ width: 300 }}>
            <Autocomplete
              id="free-solo-demo"
              freeSolo
              options={products.map((option) => option.productName)}
              renderInput={(params) => <TextField {...params} label="Search product" />}
              onInputChange={(_, newValue) => handleSearchChange(_, newValue)}
            />
          </Stack>
        </div>

        <br></br>
      </div>
      <ProductCardContainer products={filteredProducts} />
    </>
  );
};

export default Home;
