import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [], totalAmount: 0, totalItems: 0, changed: false,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            state.totalAmount = state.totalAmount + (action.payload.price * action.payload.amount);
            state.totalItems = state.totalItems + action.payload.amount;
            state.changed = true;
            const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
            if (existingItemIndex >= 0) {
                state.items[existingItemIndex] = { ...state.items[existingItemIndex], amount: state.items[existingItemIndex].amount + action.payload.amount }
            } else {
                state.items.push(action.payload);
            }
        },
        removeFromCart(state, action) {
            state.totalItems = state.totalItems - 1;
            const existingItemIndex = state.items.findIndex(item => item.id === action.payload);
            state.totalAmount = state.totalAmount - state.items[existingItemIndex].price;
            state.changed = true;
            if (state.items[existingItemIndex].amount === 1) {
                state.items = state.items.filter(item => item.id !== action.payload);
            } else {
                state.items[existingItemIndex] = { ...state.items[existingItemIndex], amount: state.items[existingItemIndex].amount - 1 }
            }
        },
        setCart(state, action) {
            state.items = action.payload.items;
            state.totalAmount = action.payload.totalAmount;
            state.totalItems = action.payload.totalItems;
        }
    }
})

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;

