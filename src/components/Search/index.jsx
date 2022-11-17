import React from "react";

import styles from "./Search.module.scss";
import searchIcon from "./search.svg";
import closeIcon from "./close.svg";
import { SearchContext } from "../../App";

const Search = () => {
  const { searchValue, setSearchValue } = React.useContext(SearchContext);

  return (
    <div className={styles.root}>
      <img className={styles.search} src={searchIcon} alt="search icon" />
      <input
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        className={styles.input}
        type="text"
        placeholder="Введите название роллов"
      />
      {searchValue && (
        <img
          onClick={() => setSearchValue("")}
          className={styles.close}
          src={closeIcon}
          alt="close icon"
        />
      )}
    </div>
  );
};

export default Search;
