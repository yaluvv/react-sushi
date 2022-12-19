import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

const initialState: CartState = {
  totalPrice: 0,
  products: [],
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
      state.totalPrice = state.products.reduce((acc, obj) => {
        return acc + obj.price * obj.count;
      }, 0);
    },
    minusProduct(state, action: PayloadAction<string>) {
      const findProduct = state.products.find(
        (obj) => obj.id === action.payload
      );
      if (findProduct) {
        findProduct.count--;
      }
      state.totalPrice = state.products.reduce((acc, obj) => {
        return acc + obj.price * obj.count;
      }, 0);
    },
    removeProduct(state, action: PayloadAction<string>) {
      state.products = state.products.filter(
        (obj) => obj.id !== action.payload
      );
      state.totalPrice = state.products.reduce((acc, obj) => {
        return acc + obj.price * obj.count;
      }, 0);
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
