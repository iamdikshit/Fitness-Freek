import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./CartSlice";
import wishlistReducer from "./WishlistSlice";

export const Store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});
