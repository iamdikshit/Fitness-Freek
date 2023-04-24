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
        (item) => item._id === action.payload._id
      );
      const exisitngItem = state.cart[existingItemIndex];

      if (exisitngItem) {
        // data exist just update its quantity
        // const exisitngItem = state.cart[existingItemIndex];
        exisitngItem.quantity++;
        exisitngItem.totatPrice = exisitngItem.price * exisitngItem.quantity;
        state.cart[existingItemIndex] = exisitngItem;
      } else {
        // data does not exists in cart
        const newItem = {
          ...action.payload,
          totatPrice: action.payload.price,
          quantity: 1,
        };
        state.cart = state.cart.concat(newItem);

        state.totalItems = state.totalItems + 1;
      }
    },
    addMultipleItems: (state, action) => {
      state.totalItems = action.payload.length;
      console.log(state.totalItems);
      state.cart = [...action.payload];
    },
    removeItemsByQty: (state, action) => {
      const existingItemIndex = state.cart.findIndex(
        (item) => item._id === action.payload._id
      );
      const existingItem = state.cart[existingItemIndex];
      if (existingItem) {
        if (existingItem.quantity > 1) {
          // data exists in cart
          existingItem.quantity--;
          existingItem.totatPrice = existingItem.quantity * existingItem.price;
          state.cart[existingItemIndex] = existingItem;
        } else {
          // if quantity is zero than remove item completely
          const updatedCart = state.cart.filter(
            (item) => item._id !== action.payload._id
          );
          state.cart = [...updatedCart];
          state.totalItems = state.totalItems - 1;
        }
      }
    },
    removeItems: (state, action) => {
      const updatedCart = state.cart.filter(
        (item) => item._id !== action.payload._id
      );
      state.cart = [...updatedCart];
      state.totalItems = state.totalItems - 1;
    },
  },
});

export const { addItems, addMultipleItems, removeItemsByQty, removeItems } =
  cartSlice.actions;
export default cartSlice.reducer;
