import React from "react";

import './scss/app.scss'
import Header from './components/Header'
import Categories from "./components/Categories"
import Sort from "./components/Sort"
import SushiBlock from "./components/SushiBlock";
import Footer from "./components/Footer";
import Skeleton from "./components/Skeleton";

function App() {

  const [items, setItems] = React.useState([])
  const [isLoading, setLoading] = React.useState(true)

  React.useEffect(() => {
    fetch('https://636d44ee91576e19e324845f.mockapi.io/items')
      .then(res => res.json())
      .then(json => {
        setItems(json)
        setLoading(false)
      })
  }, []);

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
            {
              isLoading ? [...new Array(3)].map((_, index) => <Skeleton key={index} />) : items.map(obj => <SushiBlock key={obj.id} {...obj} />)
            }
          </div>
        </div>
      </div>
      <Footer />
    </div >
  )

}
export default App;
