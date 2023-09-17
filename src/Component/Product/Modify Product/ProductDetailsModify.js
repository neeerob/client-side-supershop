import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import axios from 'axios';
import Typography from '@mui/joy/Typography';
import DeleteForever from '@mui/icons-material/DeleteForever';
import './ProductCard.css'
import Divider from '@mui/joy/Divider';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import Button from '@mui/joy/Button';
import { Link } from 'react-router-dom';

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

const ProductDetailModify = () => {
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);
  const [stockData, setStockData] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [deleteInput, setDeleteInput] = useState('');
  

  const isDeleteInputValid = deleteInput.trim().toLowerCase() === 'delete';

  const handleInputChange = (e) => {
    setDeleteInput(e.target.value);
  };

  const handleCloseModal = () => {
    setDeleteInput('');
    setOpen(false);
  };

  const [open, setOpen] = React.useState(false);
  const [openStock, setOpenStock] = React.useState(false);
  const handleDeleteProduct = async () => {
    try {
      const data = await axios.delete(`http://localhost:5000/product/delete/${productId}`);
      setOpen(false);
      alert("Successfully deleted!");
      setTimeout(() => {
        window.location.href = '/modify'
      }, 500); 
    } catch (error) {
      console.error('Error deleting product:', error);
      alert("Error deleting product!");
    }
  };

  const handelStockUpdateProduct = async () => {
    try {
      const data = await axios.post(`http://localhost:5000/stock/updateStock/${productId}/${quantity}`);
      setOpen(false);
      alert("Successfully Updated product stock!");
      setTimeout(() => {
        window.location.reload();
      }, 500); 
    } catch (error) {
      console.error('Error updating stock:', error);
      alert("Error updating stock!");
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
                style={{objectFit: 'fill'}}
              />
            </Card>
          </Grid>
          <br /><br />
          <Grid item xs={12} sm={6}>
            <Card style={{marginRight: '35px'}}>
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
                </div>


                <Typography variant="body1">
                  Stock Quantity: {stockData.stockQuantity}
                </Typography>
                <br />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
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
                </div>
                <div>
              <Button
                className='button-31'
                variant="contained"
                color="primary"
                onClick={() => setOpen(true)}
                style={{
                  backgroundColor: '#f05668',
                  color: 'white',
                  top: '5px'
                }}
                classes={{
                  root: 'button-root',
                  disabled: 'page-buttons',
                }}
              >
                Delete Product
              </Button>

                </div>

                </div>
              </CardContent>
              {/* marginTop:'100px', */}
              <div style={{marginLeft:'35px'}}>

              <Button
                className='button-31'
                variant="contained"
                color="primary"
                onClick={() => setOpenStock(true)}
                style={{
                  backgroundColor: '#35bd50',
                  color: 'white',
                  top: '5px',
                  right: '20px'
                }}
                disabled={quantity <= 0}
                classes={{
                  root: 'button-root',
                  disabled: 'page-buttons',
                }}
              >
                Update Stock
              </Button>

              <Link to={`/updateinformation/${productId}`} className='cardClass link-no-underline'>
              <Button
                  className='button-31'
                  variant="contained"
                  color="primary"
                  style={{
                    backgroundColor: '#222',
                    color: 'white',
                    top: '15px',
                    right: '20px'
                  }}
                  classes={{
                    root: 'button-root',
                    disabled: 'page-buttons',
                  }}
                >
                  Update product details
                </Button>
                </Link>

                </div>
                <br/><br/><br/>
            </Card>
            <React.Fragment>
              <Modal open={open} onClose={() => setOpen(false)}>
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
                    Confirmation
                  </Typography>
                  <Divider />
                  <Typography id="alert-dialog-modal-description" textcolor="text.tertiary">
                    Are you sure you want to delete this product?
                  </Typography>
                  <br/>

                  <TextField
          label="Type 'DELETE' to confirm"
          variant="outlined"
          fullWidth
          value={deleteInput}
          onChange={handleInputChange}
        />
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
          <Button variant="plain" color="neutral" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button
            variant="solid"
            color="danger"
            onClick={handleDeleteProduct}
            disabled={!isDeleteInputValid}
          >
            Delete product
          </Button>
        </Box>  
                </ModalDialog>
              </Modal>
      </React.Fragment>


      {/* START */}

      <React.Fragment>
      <Modal open={openStock} onClose={() => setOpenStock(false)}>
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
            Confirmation
          </Typography>
          <Divider />
          <Typography id="alert-dialog-modal-description" textcolor="text.tertiary">
          Are you certain you'd like to increase your product's stock quantity by <span style={{color: '#4CAF50'}}>{quantity} units</span>?
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
            <Button variant="plain" color="neutral" onClick={() => setOpenStock(false)}>
              Cancel
            </Button>
            <Button variant="solid" color="success" onClick={handelStockUpdateProduct}>
              Update Stock
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
      </React.Fragment>

      {/* END */}
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

export default ProductDetailModify;
