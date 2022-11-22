import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId } from "../redux/slices/filterSlice";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import SushiBlock from "../components/SushiBlock";
import Skeleton from "../components/Skeleton";
import { SearchContext } from "../App";

const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sort } = useSelector((state) => state.filter);
  const sortType = sort.sort;

  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  React.useEffect(() => {
    setLoading(true);

    const order = sortType.includes("-") ? "desc" : "asc";
    const sortBy = sortType.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    fetch(
      `https://636d44ee91576e19e324845f.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}`
    )
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
        setLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue]);

  return (
    <div className="container">
      <div className="content">
        <div className="content__top">
          <Categories value={categoryId} onClickCategory={onClickCategory} />
          <Sort />
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
