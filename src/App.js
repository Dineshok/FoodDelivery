import React from "react";
import Navbar from "./Navbar";
import Home from "./Home";
import ShopingCart from "./ShopingCart";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter basename="/FoodDelivery">
        <Navbar />
        <Home />
        <Routes>
          <Route
            path="shopingCart"
            element={<ShopingCart></ShopingCart>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
