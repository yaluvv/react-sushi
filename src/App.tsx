import React, {Suspense} from "react";

import Header from './components/Header'
import Footer from "./components/Footer";

import Home from './pages/Home'

import './scss/app.scss'
import { Route, Routes } from "react-router-dom";

const Cart = React.lazy(() => import('./pages/Cart'));
const PageNotFound = React.lazy(() => import('./pages/PageNotFound'));

const App = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
      <Suspense fallback={<div>Загрузка...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        </Suspense>
      </div>
      <Footer />
    </div >
  )

}
export default App;