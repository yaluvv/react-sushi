import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, CartItem } from "../redux/slices/cartSlice";

type SushiBlockType = {
  id: string; title: string; price:number[]; imageUrl:string; quantity:number[];
}

const SushiBlock: React.FC<SushiBlockType> = ({ id, title, price, imageUrl, quantity }) => {
  const [sushiQuantityActive, setSushiQuantityActive] = React.useState(0);
  const cartItem = useSelector((state: any) =>
    state.cart.products.find((obj: any) => obj.id === id)
  );
  const dispatch = useDispatch();

  const addedCount = cartItem ? cartItem.count : 0;

  const addItem = () => {
    const item: CartItem = {
      id,
      title,
      price: price[sushiQuantityActive],
      imageUrl,
      quantity: quantity[sushiQuantityActive],
      count: 0
    };
    console.log(item);
    dispatch(addProduct(item));
  };

  return (
    <div className="sushi-block">
      <img className="sushi-block__image" src={imageUrl} alt="sushi" />
      <h4 className="sushi-block__title">{title}</h4>
      <div className="sushi-block__selector">
        <ul>
          {quantity.map((item, i) => (
            <li
              key={item}
              onClick={() => setSushiQuantityActive(i)}
              className={sushiQuantityActive === i ? "active" : ""}
            >
              {item} шт
            </li>
          ))}
        </ul>
      </div>
      <div className="sushi-block__bottom">
        <div className="sushi-block__price">{price[sushiQuantityActive]} ₽</div>
        <button
          className="button button--outline button--add"
          onClick={addItem}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {addedCount > 0 && <i>{addedCount}</i>}
        </button>
      </div>
    </div>
  );
};

export default SushiBlock;
