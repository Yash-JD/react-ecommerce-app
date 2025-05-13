import { createSlice } from "@reduxjs/toolkit";

export const wishlistSlice = createSlice({
  initialState: {
    value: 0,
  },
  name: "wishlistCounter",
  reducers: {
    incrementWishlistCounter: (state) => {
      state.value += 1;
    },
    decrementWishlistCounter: (state) => {
      state.value -= 1;
    },
    onLoadSetWishlistCount: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const {
  incrementWishlistCounter,
  decrementWishlistCounter,
  onLoadSetWishlistCount,
} = wishlistSlice.actions;
export default wishlistSlice.reducer;
