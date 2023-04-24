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
    removeItemsByQty: (state, action) => {
      const existingItemIndex = state.wishlist.findIndex(
        (item) => item.id === action.payload.id
      );
      const existingItem = state.wishlist[existingItemIndex];
      if (existingItem) {
        if (existingItem.quantity > 0) {
          // data exists in wishlist
          existingItem.quantity--;
          state.wishlist[existingItemIndex] = existingItem;
        } else {
          // if quantity is zero than remove item completely
          const updatedwishlist = state.wishlist.filter(
            (item) => item.id !== action.payload
          );
          state.wishlist = [...updatedwishlist];
        }
      }
    },
    removeItems: (state, action) => {},
  },
});

export const { addItems, removeItemsByQty, removeItems } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
