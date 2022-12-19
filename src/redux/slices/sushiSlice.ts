import axios from "axios";

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export const fetchSushi = createAsyncThunk<Sushi[], Record<string, string>>(
  "sushi/fetchBySushi",
  async (params) => {
    const { order, sortBy, category, search } = params;
    const { data } = await axios.get<Sushi[]>(
      `https://636d44ee91576e19e324845f.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}`
    );

    return data;
  }
);

type Sushi = {
  id: string;
  title: string;
  price: number[];
  imageUrl: string;
  quantity: number[];
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface SushiState {
  items: Sushi[];
  status: "loading" | "success" | "error";
}

const initialState: SushiState = {
  items: [],
  status: Status.LOADING,
};

export const sushiSlice = createSlice({
  name: "sushi",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Sushi[]>) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchSushi.pending, (state, action) => {
      state.status = Status.LOADING;
      state.items = [];
    });

    builder.addCase(fetchSushi.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchSushi.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const { setItems } = sushiSlice.actions;

export default sushiSlice.reducer;
