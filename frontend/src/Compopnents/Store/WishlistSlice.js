import { createSlice } from "@reduxjs/toolkit";

/* 
@WISHLIST SLICE
@ It will store items in wishlist
*/
export const wishlistSlice = createSlice({
  name: "wishlistSlice",
  initialState: {
    wishlist: [],
    totalItems: 0,
  },
  reducers: {
    addItems: (state, action) => {
      const existingItemIndex = state.wishlist.findIndex(
        (item) => item._id === action.payload._id
      );
      const exisitngItem = state.wishlist[existingItemIndex];

      if (exisitngItem) {
        // data exist just update its quantity
        // const exisitngItem = state.wishlist[existingItemIndex];
        exisitngItem.quantity++;
        exisitngItem.totatPrice = exisitngItem.price * exisitngItem.quantity;
        state.wishlist[existingItemIndex] = exisitngItem;
      } else {
        // data does not exists in wishlist
        const newItem = {
          ...action.payload,
          totatPrice: action.payload.price,
          quantity: 1,
        };
        state.wishlist = state.wishlist.concat(newItem);

        state.totalItems = state.totalItems + 1;
      }
    },
    addMultipleItems: (state, action) => {
      state.totalItems = action.payload.length;
      if (state.totalItems <= 0) {
        state.wishlist = [...action.payload];
      } else {
        for (const items of action.payload) {
          const existingItemIndex = state.wishlist.findIndex(
            (item) => item._id === items._id
          );
          const exisitngItem = state.wishlist[existingItemIndex];

          if (exisitngItem) {
            // data exist just update its quantity
            // const exisitngItem = state.wishlist[existingItemIndex];
            exisitngItem.quantity++;
            exisitngItem.totatPrice =
              exisitngItem.price * exisitngItem.quantity;
            state.wishlist[existingItemIndex] = exisitngItem;
          } else {
            // data does not exists in wishlist
            const newItem = {
              ...items,
              totatPrice: action.payload.price,
              quantity: 1,
            };
            state.wishlist = state.wishlist.concat(newItem);

            state.totalItems = state.totalItems + 1;
          }
        }
      }
    },
    removeItemsByQty: (state, action) => {
      const existingItemIndex = state.wishlist.findIndex(
        (item) => item._id === action.payload._id
      );
      const existingItem = state.wishlist[existingItemIndex];
      if (existingItem) {
        if (existingItem.quantity > 1) {
          // data exists in wishlist
          existingItem.quantity--;
          existingItem.totatPrice = existingItem.quantity * existingItem.price;
          state.wishlist[existingItemIndex] = existingItem;
        } else {
          // if quantity is zero than remove item completely
          const updatedwishlist = state.wishlist.filter(
            (item) => item._id !== action.payload._id
          );
          state.wishlist = [...updatedwishlist];
          state.totalItems = state.totalItems - 1;
        }
      }
    },
    removeItems: (state, action) => {
      const updatedwishlist = state.wishlist.filter(
        (item) => item._id !== action.payload._id
      );
      state.wishlist = [...updatedwishlist];
      state.totalItems = state.totalItems - 1;
    },
  },
});

export const { addItems, addMultipleItems, removeItemsByQty, removeItems } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
