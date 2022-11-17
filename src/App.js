import React from "react";

import Header from './components/Header'
import Home from './pages/Home'
import Cart from "./pages/Cart";
import PageNotFound from "./pages/PageNotFound";
import Footer from "./components/Footer";

import './scss/app.scss'
import { Route, Routes } from "react-router-dom";

export const SearchContext = React.createContext()

const App = () => {

  const [searchValue, setSearchValue] = React.useState('')


  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
        <Footer />
      </SearchContext.Provider>
    </div >
  )

}
export default App;