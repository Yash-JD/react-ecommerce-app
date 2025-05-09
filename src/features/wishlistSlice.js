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
  },
});

export const { incrementWishlistCounter, decrementWishlistCounter } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
