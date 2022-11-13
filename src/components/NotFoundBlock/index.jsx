import React from "react";

import style from "./NotFoundBlock.module.scss";

const NotFoundBlock = () => {
  return (
    <div>
      <h1 className={style.root}>Ничего не найдено :(</h1>
    </div>
  );
};

export default NotFoundBlock;
