import React from "react";
import { useDispatch } from "react-redux";
import debounce from "lodash.debounce";

import { setSearchValue } from "../../redux/slices/filterSlice";

import styles from "./Search.module.scss";
import searchIcon from "./search.svg";
import closeIcon from "./close.svg";

const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("");
  const inputRef = React.useRef();

  const onClickClear = () => {
    setSearchValue("");
    setValue("");
    inputRef.current.focus();
  };

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 1000),
    []
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <img className={styles.search} src={searchIcon} alt="search icon" />
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        type="text"
        placeholder="Введите название роллов"
      />
      {value && (
        <img
          onClick={onClickClear}
          className={styles.close}
          src={closeIcon}
          alt="close icon"
        />
      )}
    </div>
  );
};

export default Search;
