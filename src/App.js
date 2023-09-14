import { Route, Routes } from "react-router-dom";
import './App.css';
import Home from './Home/Home';
import Layout from './Pages/Layout/Layout'
import AddProduct from "./Component/Product/Add Product/AddProduct";
import ProductDetail from "./Component/Product/ProductDetails";
import ModifyProduct from "./Component/Product/Modify Product/ModifyProduct";
import ProductDetailModify from "./Component/Product/Modify Product/ProductDetailsModify";

function App() {
  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route path="/" element={ <Home /> } />
        <Route path='/addproduct' element={ <AddProduct /> } />
        <Route path="/productdetails/:productId" element={<ProductDetail />}/>
        <Route path="/productModify/:productId" element={<ProductDetailModify />}/>
        <Route path='/modify' element={ <ModifyProduct /> } />
      </Route>
    </Routes>
  );
}
export default App;
