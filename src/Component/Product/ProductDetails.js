import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import axios from 'axios';
import Typography from '@mui/joy/Typography';
import DeleteForever from '@mui/icons-material/DeleteForever';
import './ProductCard.css';
import Divider from '@mui/joy/Divider';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import Button from '@mui/joy/Button';
import { useLocation } from 'react-router-dom';

import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  IconButton,
  Paper,
} from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';

const ProductDetail = () => {

  const [sales, setSales] = useState([]);
  const [newSaleId, setNewSaleId] = useState('');

  useEffect(() => {
    const storedSales = JSON.parse(localStorage.getItem('sales')) || [];
    setSales(storedSales);
  }, []);


  const { productId } = useParams();
  const [productData, setProductData] = useState(null);
  const [stockData, setStockData] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [open, setOpen] = React.useState(false);
  const [salePrice, setSalePrice] = useState('');
  const [discount, setDiscount] = useState('');

  const handleSellButtonClick = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleSale = async () => {
    const apiUrlPush = `http://localhost:5000/sales/registerSales/${discount}`
    const dataPush = {
      "productId": productId,
      "quantitySold" : quantity,
      "salePrice": salePrice
    };
    try{
      if(salePrice && discount){
        const response = await axios.post(apiUrlPush, dataPush);
        console.log(response.data);
        setOpen(false);
        const timeAndDath = new Date();
        const newSale = { 
          saleId: response.data.data._id, 
          quantitySold:quantity, 
          salePrice: salePrice, 
          costPrice:productData.price, 
          date: timeAndDath, 
          discount:discount, 
          productName:productData.productName,
          description: productData.description,
          image: productData.image,
        };
        console.log(newSale);
        const updatedSales = [...sales, newSale];
        setSales(updatedSales);
        localStorage.setItem('sales', JSON.stringify(updatedSales));

        setNewSaleId('');

        alert('Successfully sold product');
        setTimeout(() => {
          window.location.href = `/`;
        }, 500); 
    }
    else{
      alert('Please enter sale price and discount amount');
    }

    }catch(err){
      console.error('Error selling product:', err);
    }
  };

  useEffect(() => {
    const apiUrl = `http://localhost:5000/product/${productId}`;
    axios
      .get(apiUrl)
      .then((response) => {
        setProductData(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
      });
  }, [productId]);

  useEffect(() => {
    if (productData) {
      const apiUrl1 = `http://localhost:5000/stock/bypid/${productId}`;
      axios
        .get(apiUrl1)
        .then((response) => {
          setStockData(response.data.data);
        })
        .catch((error) => {
          console.error('Error fetching stock data:', error);
        });
    }
  }, [productId, productData]);

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    setQuantity(newQuantity);
  };

  const incrementQuantity = () => {
    if (quantity < stockData.stockQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div>
      {productData && stockData ? (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardMedia
                component="img"
                alt={productData.productName}
                src={productData.image}
                height="600"
                width="100"
                style={{ objectFit: 'fill' }}
              />
            </Card>
          </Grid>
          <br /><br />
          <Grid item xs={12} sm={6}>
            <Card style={{ marginRight: '35px' }}>
              <CardContent>
                <Typography
                  color="neutral"
                  level="h1"
                  noWrap
                  variant="plain"
                >
                  {productData.productName}
                </Typography>

                <div className="description-container">
                  <p className="description-text">{productData.description}</p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography
                    color="primary"
                    level="h3"
                    variant="plain"
                    noWrap
                  >
                    Price: ${productData.price}
                  </Typography>

                  <Typography
                    color="primary"
                    level="h2"
                    variant="plain"
                    noWrap
                  >
                    Total Price: ${productData.price * quantity}
                  </Typography>
                </div>

                <Typography variant="body1">
                  Stock Quantity: {stockData.stockQuantity}
                </Typography>
                <br />
                <TextField
                  label="Quantity"
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  inputProps={{ min: 1, max: stockData.stockQuantity }}
                />
                <Paper elevation={0} style={{ display: 'inline', margin: '0 10px' }}>
                  <IconButton
                    onClick={incrementQuantity}
                    disabled={quantity >= stockData.stockQuantity}
                  >
                    <AddCircleOutline />
                  </IconButton>
                  <IconButton
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                  >
                    <RemoveCircleOutline />
                  </IconButton>
                </Paper>
              </CardContent>
              <div style={{ marginRight: '35px', marginLeft: '35px' }}>
                {quantity > stockData.stockQuantity ? (
                  <Button
                    className='button-31'
                    variant="contained"
                    color="primary"
                    disabled
                    style={{
                      backgroundColor: '#ccc',
                      color: '#666',
                      cursor: 'not-allowed',
                      opacity: '0.7',
                      '&:hover': {
                        backgroundColor: '#252',
                        color: 'white',
                        opacity: '0.7',
                      },
                    }}
                  >
                    Insufficient Quantity
                  </Button>
                ) : (
                    <Button
                      className='button-31'
                      variant="contained"
                      color="primary"
                      disabled={quantity > stockData.stockQuantity}
                      onClick={handleSellButtonClick}
                      style={{
                        backgroundColor: '#222',
                        color: 'white',
                      }}
                      classes={{
                        root: 'button-root',
                        disabled: 'page-buttons',
                      }}
                    >
                      Sell
                    </Button>
                  )}
              </div>
              <br /><br />
            </Card>
            <Modal open={open} onClose={handleModalClose}>
              <ModalDialog
                variant="outlined"
                role="alertdialog"
                aria-labelledby="alert-dialog-modal-title"
                aria-describedby="alert-dialog-modal-description"
              >
                <Typography
                  id="alert-dialog-modal-title"
                  level="h2"
                  startdecorator={<WarningRoundedIcon />}
                >
                  Sell Product: {productData.productName}
                </Typography>
                <Divider />

                <div style={{ display: 'flex', marginTop:'5px', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography
                    color="primary"
                    level="h4"
                    variant="plain"
                    noWrap
                    style={{marginBottom: '10px'}}
                  >
                    Buying Price: ${productData.price.toFixed(2)}
                  </Typography>

                  <Typography
                    color="success"
                    level="h4"
                    variant="plain"
                    noWrap
                    style={{marginBottom: '10px'}}
                  >
                    Quantity: {quantity}
                  </Typography>

                </div>

                <Box p={1}>
                  <TextField
                    label="Sale Price"
                    type="number"
                    fullWidth
                    value={salePrice}
                    required
                    onChange={(e) => setSalePrice(e.target.value)}
                  />
                  <TextField
                    label="Discount"
                    type="number"
                    fullWidth
                    required
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    style={{marginTop: '10px'}}
                  />
                </Box>
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
                  <Typography>
                    Total Price: ${(salePrice * quantity).toFixed(2)}
                  </Typography>
                </Box>
                {/* <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
                  <Typography>
                    Net Total: ${(salePrice * quantity - discount).toFixed(2)}
                  </Typography>
                </Box> */}
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
                  <Typography>
                    Net Profit: ${(productData.price * quantity).toFixed(2)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
                  <Typography>
                    Net Revenue: ${((salePrice * quantity - discount) - (productData.price * quantity)).toFixed(2)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
                  <Typography
                    color="primary"
                    level="h5"
                    variant="plain"
                    noWrap
                    style={{marginBottom: '10px'}}
                  >
                    Net Total: ${(salePrice * quantity - discount).toFixed(2)}
                  </Typography>
                </Box>

                <Divider/>
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
                  <Button variant="plain" color="neutral" onClick={handleModalClose}>
                    Cancel
                  </Button>
                  <Button variant="solid" color="primary" onClick={handleSale}>
                    Confirm Sale
                  </Button>
                </Box>
              </ModalDialog>
            </Modal>
          </Grid>
        </Grid>
      ) : (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      )}
    </div>
  );
};

export default ProductDetail;
