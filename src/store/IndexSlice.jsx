import { createSlice } from "@reduxjs/toolkit";

let initialCartState = {
    cartdata: [],
    filtertiles: []
}
const slice = createSlice({
    name: 'Index',
    initialState: {
        ...initialCartState
    },
    reducers: {
        setCartIdx: (data, action) => {
            // data.idx = action.payload;
            data.cartdata = action.payload;
        },
        setFilterTiles: (data, action) => {
            // data.idx = action.payload;
            data.filtertiles = action.payload;
        },
    }
})
export const { setCartIdx, setFilterTiles } = slice.actions;
export default slice.reducer
export const getIdx = state => {
    return state.LPLock;
}