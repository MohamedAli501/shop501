/*eslint-disable*/

import React, { lazy, Suspense, useEffect, useState } from "react";

import "./App.css";
import Header from "./Components/Header/Header";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { loadWishItem } from "./store/wishlistSlice";
import { loadCart } from "./store/cartSlice";
import Footer from "./Components/Footer/Footer";

const Producs = lazy(() => import("./Components/Products/Products"));
const WishList = lazy(() => import("./Components/WishList/WishList"));
const Cart = lazy(() => import("./Components/Cart/Cart"));
const ProductItems = lazy(() => import("./Components/Products/ProductItems"));

function App() {
  const [localWish] = useState(localStorage.getItem("wishList"));
  const [cartList] = useState(localStorage.getItem("cart501"));
  const dispatch = useDispatch();

  // Load wishList products
  useEffect(() => {
    if (localWish) {
      dispatch(loadWishItem(JSON.parse(localWish)));
    }
  }, []);

  // Load cart products
  useEffect(() => {
    if (cartList) {
      dispatch(loadCart(JSON.parse(cartList)));
    }
  }, []);

  return (
    <Router>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div>
        <Header />
        <div className="content_h">
          <Suspense
            fallback={
              <div className="text-4xl text-center mt-32">Loading ...</div>
            }
          >
            <Routes>
              <Route exact path="/" element={<Producs />} />
              <Route exact path="/wishlist" element={<WishList />} />
              <Route exact path="/cart" element={<Cart />} />
              <Route exact path={`/product/:id`} element={<ProductItems />} />
            </Routes>
          </Suspense>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
