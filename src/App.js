import React from "react";

import Header from './components/Header'
import Home from './pages/Home'
import Cart from "./pages/Cart";
import PageNotFound from "./pages/PageNotFound";
import Footer from "./components/Footer";

import './scss/app.scss'
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
      <Footer />
    </div >
  )

}
export default App;