import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    user: {},
    isLoggedIn: false,
  },
  reducers: {
    addUser: (state, actions) => {
      state.user = { ...actions.payload };
    },
    loggedIn: (state) => {
      state.isLoggedIn = true;
    },

    loggedOut: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { loggedOut, addUser, loggedIn } = userSlice.actions;
export default userSlice.reducer;
