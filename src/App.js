import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Home/Home";
import Layout from "./Pages/Layout/Layout";
import AddProduct from "./Component/Product/Add Product/AddProduct";
import ProductDetail from "./Component/Product/ProductDetails";
import ModifyProduct from "./Component/Product/Modify Product/ModifyProduct";
import ProductDetailModify from "./Component/Product/Modify Product/ProductDetailsModify";
import ModifyProductInformation from "./Component/Product/Modify Product/Modify Information/ModifyProductInformation";
import Cart from "./Component/Cart/Cart";
import Receipt from "./Component/Receipt/Receipt";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/productdetails/:productId" element={<ProductDetail />} />
        <Route
          path="/productModify/:productId"
          element={<ProductDetailModify />}
        />
        <Route path="/modify" element={<ModifyProduct />} />
        <Route
          path="/updateinformation/:productId"
          element={<ModifyProductInformation />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/receipt" element={<Receipt />} />
      </Route>
    </Routes>
  );
}
export default App;
