// store.js
import { configureStore, createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false, user: null }, // Include user details
  reducers: {
    signin(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload; // Set user details when signing in
    },
    logout(state) {
      localStorage.removeItem("userId");
      state.isLoggedIn = false;
      state.user = null; // Clear user details when logging out
    },
  },
});

export const authActions = authSlice.actions;

export const store = configureStore({
  reducer: authSlice.reducer,
});
