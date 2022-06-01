import { createSlice } from "@reduxjs/toolkit";

let initialCartState = {
    cartdata : []
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
            }
        }
    })
export const { setCartIdx } = slice.actions;
export default slice.reducer
export const getIdx = state => {
    return state.LPLock;
}