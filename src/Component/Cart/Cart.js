import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Divider,
  Paper,
  Grid,
} from '@mui/material';

function Cart() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const storedSales = JSON.parse(localStorage.getItem('sales')) || [];
    console.log(storedSales);
    setSales(storedSales);
  }, []);

  const totalQuantity = sales.reduce((total, sale) => total + sale.quantitySold, 0);
  const totalPrice = sales.reduce((total, sale) => total + sale.salePrice * sale.quantitySold, 0);
  const totalCost = sales.reduce((total, sale) => total + sale.costPrice * sale.quantitySold, 0);
  const totalDiscount = sales.reduce((total, sale) => total + sale.discount * sale.quantitySold, 0);
  const revenue = totalPrice - totalDiscount;
  const profit = revenue - totalCost;

  return (
    <div>
      <h1>Your Cart</h1>
      <div style={{ padding: '16px' }}>
        {sales.map((sale) => (
          <Card key={sale.saleId} style={{ display: 'flex', marginBottom: '16px' }}>
            <CardMedia
              component="img"
              alt="Product Image"
              image={sale.image}
              style={{
                width: '150px',
                height: '150px',
                objectFit: 'cover',
                marginRight: '16px',
                marginLeft: '16px'
              }}
            />
            <CardContent style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" gutterBottom>
                {sale.productName}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Quantity: {sale.quantitySold}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {sale.description}
              </Typography>
            </CardContent>
            <CardContent style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <Typography variant="body2" color="text.secondary" paragraph>
                Sale Price: ${parseFloat(sale.salePrice).toFixed(2)}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Cost Price: ${parseFloat(sale.costPrice).toFixed(2)}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Total: ${(sale.quantitySold * sale.salePrice).toFixed(2)}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Discount: ${parseFloat(sale.discount).toFixed(2)}
              </Typography>
              <Typography
                    color="primary"
                    level="h4"
                    variant="plain"
                    noWrap
                    style={{marginBottom: '10px'}}
                  >
                    Net total: {((sale.quantitySold * sale.salePrice) - parseFloat(sale.discount)).toFixed(2)}
                  </Typography>
            </CardContent>
            
            {/* <CardContent style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" gutterBottom>
                {sale.productName}
              </Typography>
              <div style={{ display: 'flex',  justifyContent: 'right',justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary" paragraph>
                Quantity: {sale.quantitySold}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Sole price: {parseFloat(sale.salePrice).toFixed(2)}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Buying price: {parseFloat(sale.costPrice).toFixed(2)}
              </Typography>
                </div>
              <Typography variant="body2" color="text.secondary" paragraph>
                {sale.description}
              </Typography>
                <div style={{ display: 'flex',  justifyContent: 'right', alignItems: 'center' }}>
                  <Typography
                    color="success"
                    level="h4"
                    variant="plain"
                    noWrap
                    style={{marginBottom: '10px'}}
                  >
                    Total: ${((sale.quantitySold * sale.salePrice)).toFixed(2)}
                  </Typography>
                </div>
                <div style={{ display: 'flex',  justifyContent: 'right', alignItems: 'center' }}>
                  <Typography
                    color="success"
                    level="h4"
                    variant="plain"
                    noWrap
                    style={{marginBottom: '10px'}}
                  >
                    Discount: ${parseFloat(sale.discount).toFixed(2)}


                  </Typography>
                </div>
                <div style={{ display: 'flex',  justifyContent: 'right', alignItems: 'center' }}>
                  <Typography
                    color="primary"
                    level="h4"
                    variant="plain"
                    noWrap
                    style={{marginBottom: '10px'}}
                  >
                    Net total: {((sale.quantitySold * sale.salePrice) - parseFloat(sale.discount)).toFixed(2)}
                  </Typography>
                </div>
            </CardContent> */}
            
          </Card>
        ))}
      </div>
      <Paper style={{ marginTop: '16px', padding: '16px' }} elevation={3}>
      <Typography variant="h5" gutterBottom>
        Total Cart Information
      </Typography>
      <Divider />
      <br />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="body1">Total Quantity: {totalQuantity}</Typography>
          <Typography variant="body1">Total Price: ${totalPrice}</Typography>
          <Typography variant="body1">Total Cost: ${totalCost}</Typography>
        </Grid>
        <Grid item xs={6} style={{ textAlign: 'right' }}>
          <Typography variant="body1">Total Discount: ${totalDiscount}</Typography>
          <Typography variant="body1">Revenue: ${revenue}</Typography>
          <Typography variant="body1">Profit: ${profit}</Typography>
        </Grid>
      </Grid>
    </Paper>
    </div>
  );
}

export default Cart;
