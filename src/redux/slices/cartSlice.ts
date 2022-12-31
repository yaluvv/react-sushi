import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCartFromLS } from "../../utils/getCartFromLS";
import { calcTotalPrice } from "../../utils/calcTotalPrice";

export type CartItem = {
  id: string;
  price: number;
  count: number;
  quantity: number;
  imageUrl: string;
  title: string;
};

interface CartState {
  totalPrice: number;
  products: CartItem[];
}

const { items, totalPrice } = getCartFromLS();
const initialState: CartState = {
  totalPrice,
  products: items,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<CartItem>) {
      const findProduct = state.products.find(
        (obj) => obj.id === action.payload.id
      );

      if (findProduct) {
        findProduct.count++;
      } else {
        state.products.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = calcTotalPrice(state.products);
    },
    minusProduct(state, action: PayloadAction<string>) {
      const findProduct = state.products.find(
        (obj) => obj.id === action.payload
      );
      if (findProduct) {
        findProduct.count--;
      }
      state.totalPrice = calcTotalPrice(state.products);
    },
    removeProduct(state, action: PayloadAction<string>) {
      state.products = state.products.filter(
        (obj) => obj.id !== action.payload
      );
      state.totalPrice = calcTotalPrice(state.products);
    },
    clearProducts(state) {
      state.products = [];
      state.totalPrice = 0;
    },
  },
});

export const { addProduct, removeProduct, minusProduct, clearProducts } =
  cartSlice.actions;

export default cartSlice.reducer;
