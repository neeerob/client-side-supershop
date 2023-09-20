import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DeleteForever from "@mui/icons-material/DeleteForever";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import axios from "axios"; // Import Axios

const ProductCard = ({ product, onDelete }) => {
  console.log(product.image);
  const [open, setOpen] = React.useState(false);
  const handleDeleteProduct = async () => {
    try {
      const data = await axios.delete(
        `http://localhost:5000/product/delete/${product._id}`
      );
      setOpen(false);
      alert("Successfully deleted!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product!");
    }
  };

  return (
    <Link
      to={`/productdetails/${product._id}`}
      className="cardClass link-no-underline"
    >
      <Card className="cardClass" sx={{ maxWidth: 345, Height: 505 }}>
        <CardMedia
          component="img"
          height="300"
          src={product.image}
          alt={product.productName}
          style={{ objectFit: "fill" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.productName}
          </Typography>

          <div>
            <Typography
              fontSize="lg"
              fontWeight="lg"
              fontFamily="sans-serif"
              lineHeight="1.25"
              mb="10"
            >
              ৳ {product.price}.00
            </Typography>
          </div>

          <div
            className="description-container"
            style={{ height: "5.6em", overflow: "hidden" }}
          >
            <p className="description-text">{product.description}</p>
          </div>
        </CardContent>
        <CardActions disableSpacing>
          {/* <Button
        variant="outlined"
        color="danger"
        endDecorator={<DeleteForever />}
        onClick={() => setOpen(true)}
      /> */}
        </CardActions>
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
              <Typography
                id="alert-dialog-modal-description"
                textcolor="text.tertiary"
              >
                Are you sure you want to delete this product?
              </Typography>
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
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="solid"
                  color="danger"
                  onClick={handleDeleteProduct}
                >
                  Delete product
                </Button>
              </Box>
            </ModalDialog>
          </Modal>
        </React.Fragment>
      </Card>
    </Link>
  );
};

export default ProductCard;
