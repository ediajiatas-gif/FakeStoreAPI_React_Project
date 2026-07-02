import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import EditProduct from "./pages/EditProduct";
import AddProduct from "./pages/AddProduct";
import ProductDetail from "./pages/ProductDetail";
import ProductList from "./pages/ProductList";
import ShoppingCart from "./components/ShoppingCart";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { auth } from "./firebase";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
