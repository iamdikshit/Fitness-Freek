import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./CartSlice";
import wishlistReducer from "./WishlistSlice";
import userReducer from "./UserSlice";

export const Store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    user: userReducer,
  },
});
