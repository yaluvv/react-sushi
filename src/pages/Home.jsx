import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { setCategoryId } from "../redux/slices/filterSlice";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import SushiBlock from "../components/SushiBlock";
import Skeleton from "../components/Skeleton";
import { fetchSushi } from "../redux/slices/sushiSlice";
import { ErrorSushi } from "../components/ErrorSushi";

const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sort, searchValue } = useSelector(
    (state) => state.filter
  );
  const { items, status } = useSelector((state) => state.sushi);
  const sortType = sort.sort;

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };
  const getSushi = async () => {
    const order = sortType.includes("-") ? "desc" : "asc";
    const sortBy = sortType.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      fetchSushi({
        order,
        sortBy,
        category,
        search,
      })
    );
    window.scrollTo(0, 0);
  };
  React.useEffect(() => {
    getSushi();
  }, [categoryId, sortType, searchValue]);

  return (
    <div className="container">
      <div className="content">
        <div className="content__top">
          <Categories value={categoryId} onClickCategory={onClickCategory} />
          <Sort />
        </div>
        <h2 className="content__title">Все роллы</h2>
        {status === "error" ? (
          <ErrorSushi />
        ) : (
          <div className="content__items">
            {status === "loading"
              ? [...new Array(3)].map((_, index) => <Skeleton key={index} />)
              : items.map((obj) => <SushiBlock key={obj.id} {...obj} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
