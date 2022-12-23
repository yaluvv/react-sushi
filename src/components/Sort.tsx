import React from "react";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSort, SortPropertyEnum } from "../redux/slices/filterSlice";

const Sort: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const sort = useSelector((state: any) => state.filter.sort);
  const [open, setOpen] = React.useState(false);
  const sortRef = useRef(null);

type SortType = {
  name: string;
  sort: SortPropertyEnum
}

  const sortList: SortType[] = [
    { name: "популярности", sort: SortPropertyEnum.RATING},
    { name: "цене (убыванию)", sort: SortPropertyEnum.MINPRICE},
    { name: "цене (возрастанию)", sort: SortPropertyEnum.PRICE },
    { name: "алфавиту", sort: SortPropertyEnum.TITLE },
  ];

  React.useEffect(() => {
    const handleSort = (event: MouseEvent) => {
      const _event = event as MouseEvent & {
        path: Node[]
      }
      if (sortRef.current && !_event.path.includes(sortRef.current)) {
        setOpen(false);
      }

      return () => document.body.removeEventListener("click", handleSort);
    };

    document.body.addEventListener("click", handleSort);
  }, []);

  const onListSortItem = (obj: SortType) => {
    dispatch(setSort(obj));
    setOpen(!open);
  };

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{sort.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {sortList.map((obj, i) => (
              <li
                key={i}
                onClick={() => onListSortItem(obj)}
                className={sort.sort === obj.sort ? "active" : ""}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
})

export default Sort;
