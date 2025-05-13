import { createSlice } from "@reduxjs/toolkit";

export const wishlistSlice = createSlice({
  initialState: {
    value: 0,
    // allProducts: [],
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
    // addLikedProducts: (state, action) => {
    //   if (!state.allProducts.includes(action.payload))
    //     state.allProducts.push(action.payload);
    // },
    // removeLikedProducts: (state, action) => {
    //   if (state.allProducts.includes(action.payload))
    //     state.allProducts = state.allProducts.filter(
    //       (id) => id != action.payload
    //     );
    // },
  },
});

export const {
  incrementWishlistCounter,
  decrementWishlistCounter,
  onLoadSetWishlistCount,
} = wishlistSlice.actions;
export default wishlistSlice.reducer;
