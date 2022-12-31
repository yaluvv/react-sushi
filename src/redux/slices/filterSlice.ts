import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

export enum SortPropertyEnum {
  RATING = "rating",
  PRICE = "price",
  MINPRICE = "-price",
  TITLE = "title",
}

type Sort = {
  name: string;
  sort: SortPropertyEnum;
};

interface FilterState {
  searchValue: string;
  categoryId: number;
  sort: Sort;
}

const initialState: FilterState = {
  searchValue: "",
  categoryId: 0,
  sort: {
    name: "популярности",
    sort: SortPropertyEnum.RATING,
  },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
  },
});

export const { setCategoryId, setSort, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;
