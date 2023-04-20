import { createSlice } from "@reduxjs/toolkit";

/* 
@CART SLICE
@ It will store items in cart
*/
export const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cart: [],
    totalItems: 0,
  },
  reducers: {
    addItems: (state, action) => {
      const existingItemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingItemIndex <= -1) {
        // data does not exists in cart
        state.cart = [...state.cart, action.payload];
        state.totalItems = state.totalItems + 1;
      } else {
        // data exist just update its quantity
        const exisitngItem = state.cart[existingItemIndex];
        exisitngItem.quantity++;
        state.cart[existingItemIndex] = exisitngItem;
      }
    },
    removeItemsByQty: (state, action) => {
      const existingItemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      const existingItem = state.cart[existingItemIndex];
      if (existingItem) {
        if (existingItem.quantity > 0) {
          // data exists in cart
          existingItem.quantity--;
          state.cart[existingItemIndex] = existingItem;
        } else {
          // if quantity is zero than remove item completely
          const updatedCart = state.cart.filter(
            (item) => item.id !== action.payload
          );
          state.cart = [...updatedCart];
        }
      }
    },
    removeItems: (state, action) => {},
  },
});

export const { addItems, removeItemsByQty, removeItems } = cartSlice.actions;
export default cartSlice.reducer;
