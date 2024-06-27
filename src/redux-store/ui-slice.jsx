import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showCartModal: false,
  showCheckOutModal: false,
  previousPath: "",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showCart(state) {
      state.showCartModal = true;
    },
    hideCart(state) {
      state.showCartModal = false;
    },
    showCheckOutModal(state) {
      state.showCartModal = false;
      state.showCheckOutModal = true;
    },
    goBackToCart(state) {
      state.showCheckOutModal = false;
      state.showCartModal = true;
    },
    closeCheckout(state) {
      state.showCheckOutModal = false;
      state.showCartModal = false;
    },
    setPreviousPath(state, action) {
      state.previousPath = action.payload.path;
    },
  },
});

export default uiSlice.reducer;
export const uiActions = uiSlice.actions;
