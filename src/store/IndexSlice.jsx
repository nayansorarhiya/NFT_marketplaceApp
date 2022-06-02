import { createSlice } from "@reduxjs/toolkit";

let initialCartState = {
    cartdata: [],
    filtertiles: [{ id: 0, name: 'price', value: '05 - 30 ETH' },
    { id: 1, name: 'rarity', value: '15 - 30' },
    { id: 2, name: 'marketplace', value: 'loosrare' },]
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