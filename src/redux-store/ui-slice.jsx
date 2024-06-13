import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showCartModal: false,
    showCheckOutModal: false,
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        showCart(state) {
            state.showCartModal = true;
        },
        hideCart(state) {
            state.showCartModal = false;
        },
        showCheckOutModal(state) {
            state.showCheckOutModal = true;
            state.showCartModal = false;
        },
        goBackToCart(state) {
            state.showCheckOutModal = false;
            state.showCartModal = true;
        },
        closeCheckout(state) {
            state.showCheckOutModal = false;
            state.showCartModal = false;
        }
    }
})

export default uiSlice.reducer;
export const uiActions = uiSlice.actions;