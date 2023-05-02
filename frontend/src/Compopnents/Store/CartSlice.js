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
    totalAmount: 0,
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
        if (
          exisitngItem.variants[0].flavor ===
            action.payload.variants[0].flavor &&
          exisitngItem.variants[0].weight.weight ===
            action.payload.variants[0].weight.weight
        ) {
          exisitngItem.quantity++;
        } else {
          exisitngItem.variants = [...action.payload.variants];
        }
        exisitngItem.totatPrice =
          exisitngItem.variants[0].price * exisitngItem.quantity;
        state.cart[existingItemIndex] = exisitngItem;
      } else {
        // data does not exists in cart
        const newItem = {
          ...action.payload,
          totatPrice: +action.payload.variants[0].price,
          quantity: 1,
        };
        state.cart = state.cart.concat(newItem);

        state.totalItems = state.totalItems + 1;
      }
    },
    addMultipleItems: (state, action) => {
      const total = action.payload.length;
      if (total <= 0) {
        state.totalItems = total;
        state.cart = [...action.payload];
      } else {
        for (const items of action.payload) {
          const existingItemIndex = state.cart.findIndex(
            (item) => item._id === items._id
          );
          const exisitngItem = state.cart[existingItemIndex];

          if (exisitngItem) {
            // data exist just update its quantity
            // const exisitngItem = state.cart[existingItemIndex];
            exisitngItem.quantity++;
            exisitngItem.totatPrice =
              exisitngItem.variants[0].price * exisitngItem.quantity;
            state.cart[existingItemIndex] = exisitngItem;
          } else {
            // data does not exists in cart
            const newItem = {
              ...items,
              totatPrice: items.variants[0].price,
              quantity: 1,
            };
            state.cart = state.cart.concat(newItem);

            state.totalItems = state.totalItems + 1;
          }
        }
      }
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
          existingItem.totatPrice =
            existingItem.quantity * existingItem.variants[0].price;
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
    updateTotalAmount: (state, action) => {
      state.totalAmount = action.payload;
    },
  },
});

export const { addItems, addMultipleItems, removeItemsByQty, removeItems } =
  cartSlice.actions;
export default cartSlice.reducer;
