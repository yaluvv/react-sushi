import React from "react";

import './scss/app.scss'
import Header from './components/Header'
import Categories from "./components/Categories"
import Sort from "./components/Sort"
import SushiBlock from "./components/SushiBlock";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все роллы</h2>
          <div className="content__items">
            <SushiBlock title='Филадельфия' price='350' />
          </div>
        </div>
      </div>
      <Footer />
    </div >
  )

}
export default App;
