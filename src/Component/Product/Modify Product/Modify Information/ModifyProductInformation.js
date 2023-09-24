import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import "./AddProduct.css";
import { useParams } from "react-router-dom";

const ModifyProductInformation = () => {
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    const apiUrl = `http://localhost:5000/product/${productId}`;
    axios
      .get(apiUrl)
      .then((response) => {
        setProductData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, [productId]);

  const [product, setProduct] = useState({
    productName: "",
    description: "",
    image: "",
    price: 0,
    quantity: 0,
    isActive: "true",
  });

  useEffect(() => {
    if (productData) {
      setProduct({
        productName: productData.productName || "",
        description: productData.description || "",
        image: productData.image || "",
        price: productData.price || 0,
        isActive: productData.isActive || "false",
      });
    }
  }, [productData]);

  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalColor, setModalColor] = useState("");
  const [modalMainMsg, setModalMainMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = `http://localhost:5000/product/update/${productId}`;
      const response = await axios.post(apiUrl, product);
      console.log(product);
      console.log(response);

      setModalMessage("Product Updated successfully!");
      setModalColor("#4CAF50");
      setModalMainMsg("Success");
      setOpenModal(true);
      setTimeout(() => {
        window.location.href = `../productModify/${productId}`;
      }, 500);
    } catch (error) {
      console.error("Error updating product:", error);

      setModalMessage("Error updating product. Please try again.");
      setModalColor("#F44336");
      setModalMainMsg("Error");
      setOpenModal(true);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        marginTop: "20px",
        marginRight: "60px",
        marginLeft: "60px",
      }}
    >
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
          multiline
          rows={4}
          margin="normal"
          value={product.description}
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

        <RadioGroup
          name="isActive"
          value={product.isActive}
          onChange={handleChange}
          row
        >
          <Typography
            variant="body1"
            sx={{ marginRight: "10px", alignSelf: "center" }}
          >
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

        <TextField
          name="image"
          label="Image"
          variant="outlined"
          fullWidth
          margin="normal"
          value={product.image}
          onChange={handleChange}
          required
        />

        {product.image && (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <img
              src={product.image}
              alt="Product"
              style={{
                maxWidth: "100%",
                maxHeight: "200px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            />
          </div>
        )}

        <br />

        <Button
          type="submit"
          variant="contained"
          size="large"
          className="button-31"
          style={{ backgroundColor: "#222", color: "#fff" }}
        >
          Modify Product Information
        </Button>

        <Modal
          open={openModal}
          onClose={handleCloseModal}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "5px",
            }}
          >
            <Typography
              variant="h4"
              sx={{ display: "flex", alignItems: "center" }}
              startIcon={<WarningRoundedIcon />}
              style={{ color: `${modalColor}` }}
            >
              {modalMainMsg}
            </Typography>
            <Divider />
            <br />
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              {modalMessage}
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
                variant="outlined"
                color="primary"
                onClick={handleCloseModal}
              >
                Close
              </Button>
            </Box>
          </div>
        </Modal>
      </form>
    </div>
  );
};

export default ModifyProductInformation;
