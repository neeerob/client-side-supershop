import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Divider,
  Paper,
  Grid,
  Button,
  TextField,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CancelIcon from "@mui/icons-material/Cancel";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import Box from "@mui/material/Box";
import axios from "axios";
import Button1 from "@mui/joy/Button";

function Cart() {
  const [sales, setSales] = useState([]);
  const [salesPush, setSalesPush] = useState([]);
  const [salesIdNeedToPush, setsalesIdNeedToPush] = useState([]);

  useEffect(() => {
    const storedSales = JSON.parse(localStorage.getItem("sales")) || [];
    setSales(storedSales);
    const storedSales1 = JSON.parse(localStorage.getItem("salesPush")) || [];
    setSalesPush(storedSales1);
  }, []);

  const totalQuantity = sales.reduce(
    (total, sale) => total + sale.quantitySold,
    0
  );
  const totalPrice = sales.reduce(
    (total, sale) => total + sale.salePrice * sale.quantitySold,
    0
  );
  const totalCost = sales.reduce(
    (total, sale) => total + sale.costPrice * sale.quantitySold,
    0
  );
  const totalDiscount = sales.reduce(
    (total, sale) => total + sale.discount * sale.quantitySold,
    0
  );
  const revenue = totalPrice - totalDiscount;
  const profit = revenue - totalCost;

  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [deleteInput, setDeleteInput] = useState("");

  const handleInputChange = (e) => {
    setDeleteInput(e.target.value);
  };

  const handleCloseModal = () => {
    setDeleteInput("");
    setOpen(false);
    setOpen1(false);
  };

  const isDeleteInputValid = deleteInput.trim().toLowerCase() === "delete";

  const handleDeleteProduct = async () => {
    try {
      sales.map(async (individualSaleID) => {
        // try {
        //   const data = await axios.delete(
        //     `http://localhost:5000/sales/deleteSale/${individualSaleID.saleId}`
        //   );
        //   console.log(data.data);
        // } catch (error) {
        //   console.error("Error deleting product:", error);
        //   alert("Error deleting product!");
        // }
      });
      setOpen(false);
      alert("Succcessfully emptyed cart.");
      localStorage.setItem("sales", JSON.stringify([]));
      localStorage.setItem("salesPush", JSON.stringify([]));
      setSales([]);
      setSalesPush([]);
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product!");
    }
  };

  const handelDeleteIndividualProduct = async (needToDeleteSaleID) => {
    const updatedSales = sales.filter(
      (sale) => !needToDeleteSaleID.includes(sale.saleId)
    );
    const updatedSalesPush = salesPush.filter(
      (sale) => !needToDeleteSaleID.includes(sale.saleId)
    );

    console.log(updatedSales);
    console.log(updatedSalesPush);

    setSales(updatedSales);
    setSalesPush(updatedSalesPush);

    localStorage.setItem("sales", JSON.stringify(updatedSales));
    localStorage.setItem("salesPush", JSON.stringify(updatedSalesPush));

    // try {
    //   const data = await axios.delete(
    //     `http://localhost:5000/sales/deleteSale/${needToDeleteSaleID}`
    //   );
    //   alert("Successfully deleted!");
    // } catch (error) {
    //   console.error("Error deleting product:", error);
    //   alert("Error deleting product!");
    // }
  };

  const handelConfirm = async () => {
    try {
      // const creatingReceipt = await axios.post(
      //   `http://localhost:5000/receipt/crtrct`,
      //   salesPush
      // );
      // var salesIdPush = [];
      // sales.map(async (getIndividualOrder) => {
      //   const dataPush = {
      //     productId: getIndividualOrder.productId,
      //     quantitySold: getIndividualOrder.quantitySold,
      //     salePrice: getIndividualOrder.salePrice,
      //   };
      //   const apiUrlPush = `http://localhost:5000/sales/registerSales/${getIndividualOrder.discount}`;
      //   try {
      //     const response = await axios.post(apiUrlPush, dataPush);
      //     const saleIdsArrayOfObject = {
      //       saleId: response.data.data._id,
      //     };
      //     salesIdPush = [...salesIdPush, saleIdsArrayOfObject];
      //     setsalesIdNeedToPush(salesIdPush);
      //   } catch (err) {
      //     console.error(err);
      //     alert("SOMETHING WRONG");
      //   }
      // });
      // console.log(salesIdPush);
      // console.log(salesIdPush);
      // console.log("?");
      // alert("Succcessfully checked out!");
      // localStorage.setItem("sales", JSON.stringify([]));
      // localStorage.setItem("salesPush", JSON.stringify([]));
      // setSales([]);
      // setSalesPush([]);

      var salesIdPush = [];
      const postRequests = sales.map(async (getIndividualOrder) => {
        const dataPush = {
          productId: getIndividualOrder.productId,
          quantitySold: getIndividualOrder.quantitySold,
          salePrice: getIndividualOrder.salePrice,
        };
        const apiUrlPush = `http://localhost:5000/sales/registerSales/${getIndividualOrder.discount}`;
        try {
          const response = await axios.post(apiUrlPush, dataPush);
          const saleIdsArrayOfObject = {
            saleId: response.data.data._id,
          };
          salesIdPush = [...salesIdPush, saleIdsArrayOfObject];
          setsalesIdNeedToPush(salesIdPush);
        } catch (err) {
          console.error(err);
          alert("SOMETHING WRONG");
        }
      });

      Promise.all(postRequests)
        .then(async () => {
          try {
            const creatingReceipt = await axios.post(
              `http://localhost:5000/receipt/crtrct`,
              salesIdPush
            );
            setOpen1(false);
            console.log(creatingReceipt.data);
            alert("Succcessfully checked out!");
            localStorage.setItem("sales", JSON.stringify([]));
            localStorage.setItem("salesPush", JSON.stringify([]));
            setSales([]);
            setSalesPush([]);
          } catch (error) {
            alert("SOMETHING WRONG");
            console.log(error);
          }
        })
        .catch((error) => {
          console.error("Error during requests:", error);
        });
    } catch (error) {
      console.log(error);
      alert("Something wrong happened");
    }
  };

  return (
    <div>
      {sales.length > 0 ? (
        <div>
          <h1>Your Cart</h1>
          <div style={{ padding: "16px" }}>
            {sales.map((sale) => (
              <Card
                key={sale.saleId}
                style={{
                  display: "flex",
                  marginBottom: "16px",
                  position: "relative", // Add position relative to the card
                }}
              >
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handelDeleteIndividualProduct(sale.saleId)}
                  style={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    padding: "4px",
                    zIndex: 1,
                    outline: "none",
                  }}
                >
                  <CancelIcon />
                </Button>

                <CardMedia
                  component="img"
                  alt="Product Image"
                  image={sale.image}
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                    marginRight: "16px",
                    marginLeft: "16px",
                  }}
                />
                <CardContent
                  style={{ flex: 1, display: "flex", flexDirection: "column" }}
                >
                  <Typography variant="h6" gutterBottom>
                    {sale.productName}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" paragraph>
                    Quantity: {sale.quantitySold}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    SaleId: {sale.saleId}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {sale.description}
                  </Typography>
                </CardContent>
                <CardContent
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    marginTop: "40px",
                  }}
                >
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
                    style={{ marginBottom: "10px" }}
                  >
                    Net total:{" "}
                    {(
                      sale.quantitySold * sale.salePrice -
                      parseFloat(sale.discount)
                    ).toFixed(2)}
                  </Typography>
                </CardContent>
              </Card>
            ))}
            <div>
              <Button
                variant="contained"
                color="success"
                // onClick={handelConfirmProduct}
                endIcon={<ShoppingCartIcon />}
                style={{ marginTop: "16px", float: "right" }}
                onClick={() => setOpen1(true)}
              >
                Checkout
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => setOpen(true)}
                startIcon={<CancelIcon />}
              >
                Remove cart
              </Button>
            </div>
          </div>
          <Paper style={{ marginTop: "16px", padding: "16px" }} elevation={3}>
            <Typography variant="h5" gutterBottom>
              Total Cart Information
            </Typography>
            <Typography
              color="primary"
              level="h2"
              variant="h5"
              noWrap
              style={{ marginBottom: "10px" }}
            >
              Net total: ${(totalPrice - totalDiscount).toFixed(2)}
            </Typography>
            <Divider />
            <br />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body1">
                  Total Quantity: {totalQuantity}
                </Typography>
                <Typography variant="body1">
                  Total Price: ${totalPrice.toFixed(2)}
                </Typography>
                <Typography variant="body1">
                  Total Cost: ${totalCost.toFixed(2)}
                </Typography>
              </Grid>
              <Grid item xs={6} style={{ textAlign: "right" }}>
                <Typography variant="body1">
                  Total Discount: ${totalDiscount.toFixed(2)}
                </Typography>
                <Typography variant="body1">
                  Revenue: ${revenue.toFixed(2)}
                </Typography>
                <Typography variant="body1">
                  Profit: ${profit.toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
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
                <br />
                <Typography
                  id="alert-dialog-modal-description"
                  textcolor="text.tertiary"
                >
                  Are you sure you want to discard this cart?
                </Typography>
                <br />

                <TextField
                  label="Type 'DELETE' to confirm"
                  variant="outlined"
                  fullWidth
                  value={deleteInput}
                  onChange={handleInputChange}
                />
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    justifyContent: "flex-end",
                    pt: 2,
                  }}
                >
                  <Button
                    variant="plain"
                    color="neutral"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </Button>
                  <Button1
                    variant="solid"
                    color="danger"
                    onClick={handleDeleteProduct}
                    disabled={!isDeleteInputValid}
                  >
                    Discard cart
                  </Button1>
                </Box>
              </ModalDialog>
            </Modal>
          </React.Fragment>
          <React.Fragment>
            <Modal open={open1} onClose={() => setOpen1(false)}>
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
                <br />
                <Typography
                  id="alert-dialog-modal-description"
                  textcolor="text.tertiary"
                >
                  Are you sure you want to checkout this cart?
                </Typography>
                <br />

                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    justifyContent: "flex-end",
                    pt: 2,
                  }}
                >
                  <Button
                    variant="plain"
                    color="neutral"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </Button>
                  <Button1
                    variant="solid"
                    color="success"
                    onClick={handelConfirm}
                  >
                    Checkout
                  </Button1>
                </Box>
              </ModalDialog>
            </Modal>
          </React.Fragment>
        </div>
      ) : (
        <div
          style={{
            marginTop: "15px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            background: "#f0f0f0", // Add a background color
            borderRadius: "5px", // Add rounded corners
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Add a subtle shadow
          }}
        >
          <Typography
            color="primary"
            level="h2"
            variant="h5"
            noWrap
            style={{ marginBottom: "10px" }}
          >
            Your cart is empty.
          </Typography>
        </div>
      )}
    </div>
  );
}

export default Cart;