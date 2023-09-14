import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel'; // Import FormControlLabel
import './AddProduct.css';

const AddProduct = () => {
  const [product, setProduct] = useState({
    productName: '',
    description: '',
    image: '',
    price: '',
    quantity: 0,
    isActive: 'true', 
  });

  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalColor, setModalColor] = useState('');
  const [modalMainMsg, setModalMainMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = `http://localhost:5000/product/add/${product.quantity}`;
      console.log(product);

      const response = await axios.post(apiUrl, product);
      console.log('Product added:', response.data);

      setProduct({
        productName: '',
        description: '',
        image: '',
        price: '',
        quantity: 0,
        isActive: 'true',
      });

      setModalMessage('Product added successfully!');
      setModalColor('#4CAF50');
      setModalMainMsg('Success');
      setOpenModal(true);
    } catch (error) {
      console.error('Error adding product:', error);

      setModalMessage('Error adding product. Please try again.');
      setModalColor('#F44336');
      setModalMainMsg('Error');
      setOpenModal(true);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div style={{ justifyContent: 'center', alignItems: 'center', marginTop: '20px', marginRight: '60px', marginLeft: '60px' }}>
      <form onSubmit={handleSubmit}>
        <TextField
          name="productName"
          label="Product Name"
          variant="outlined"
          fullWidth
          margin="dense"
          value={product.productName}
          onChange={handleChange}
          required
        />
        <TextField
          name="description"
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          value={product.description}
          onChange={handleChange}
          required
        />
        
        <TextField
          name="image"
          label="image"
          variant="outlined"
          fullWidth
          margin="normal"
          value={product.image}
          onChange={handleChange}
          required
        />

        <TextField
          name="price"
          label="Price"
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={product.price}
          onChange={handleChange}
          required
        />

        <TextField
          name="quantity"
          label="Product Quantity"
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={product.quantity}
          onChange={handleChange}
          required
        />

        <RadioGroup
            name="isActive"
            value={product.isActive}
            onChange={handleChange}
            row
            >
            <Typography variant="body1" sx={{ marginRight: '10px', alignSelf: 'center' }}>
                Product Status:
            </Typography>
            <FormControlLabel
                value="true"
                control={<Radio color="primary" />}
                label="Active"
                labelPlacement="end"
            />
            <FormControlLabel
                value="false"
                control={<Radio color="primary" />}
                label="Inactive"
                labelPlacement="end"
            />
        </RadioGroup>
        <br></br>


        <Button
            type="submit"
            variant="contained"
            size="large"
            className="button-31"
            style={{ backgroundColor: '#222', color: '#fff' }}
            >
            Add Product
        </Button>


        <Modal
          open={openModal}
          onClose={handleCloseModal}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '5px',
            }}
          >
            <Typography
              variant="h4"
              sx={{ display: 'flex', alignItems: 'center' }}
              startIcon={<WarningRoundedIcon />}
              style={{ color: `${modalColor}` }}
            >
              {modalMainMsg}
            </Typography>
            <Divider />
            <br></br>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              {modalMessage}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
              <Button variant="outlined" color="primary" onClick={handleCloseModal}>
                Close
              </Button>
            </Box>
          </div>
        </Modal>
      </form>
    </div>
  );
};

export default AddProduct;
