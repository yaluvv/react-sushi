import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import SushiBlock from "../components/SushiBlock";
import Skeleton from "../components/Skeleton";

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: "популярности",
    sort: "rating",
  });

  React.useEffect(() => {
    setLoading(true);

    const order = sortType.sort.includes("-") ? "desc" : "asc";
    const sortBy = sortType.sort.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";

    fetch(
      `https://636d44ee91576e19e324845f.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`
    )
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
        setLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  return (
    <div className="container">
      <div className="content">
        <div className="content__top">
          <Categories
            value={categoryId}
            onClickCategory={(id) => setCategoryId(id)}
          />
          <Sort value={sortType} onChangeSort={(i) => setSortType(i)} />
        </div>
        <h2 className="content__title">Все роллы</h2>
        <div className="content__items">
          {isLoading
            ? [...new Array(3)].map((_, index) => <Skeleton key={index} />)
            : items.map((obj) => <SushiBlock key={obj.id} {...obj} />)}
        </div>
      </div>
    </div>
  );
};

export default Home;
