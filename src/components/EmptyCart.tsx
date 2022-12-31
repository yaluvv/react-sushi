import React from "react";
import { Link } from "react-router-dom";

export const EmptyCart : React.FC  = ()  => {
  return (
    <div className="empty-cart">
      <h1>В корзине нет продуктов :(</h1>
      <p>Заказав роллы на главной странице они попадут в вашу корзину.</p>
      <Link to={"/"} className="empty-cart__link">
        Перейти на главную страницу
      </Link>
    </div>
  );
};

export default EmptyCart;
