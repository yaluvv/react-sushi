import axios from "axios";

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchSushi = createAsyncThunk(
    'sushi/fetchBySushi',
    async (params) => {
        const { order,
            sortBy,
            category,
            search } = params
        const { data } = await axios.get(
            `https://636d44ee91576e19e324845f.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}`)

        return data
    }
)

const initialState = {
    items: [],
    status: '',
}

export const sushiSlice = createSlice({
    name: 'sushi',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload
        },
    },
    extraReducers: {
        [fetchSushi.pending]: (state) => {
            state.status = 'loading'
            state.items = []
        },
        [fetchSushi.fulfilled]: (state, action) => {
            state.items = action.payload
            state.status = 'success'
        }, [fetchSushi.rejected]: (state) => {
            state.status = 'error'
            state.items = []
        }
    },
})

export const { setItems } = sushiSlice.actions

export default sushiSlice.reducer