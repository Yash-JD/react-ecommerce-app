import { createSlice } from "@reduxjs/toolkit";

export const cartCounterSlice = createSlice({
  name: "cartCounter",
  initialState: {
    value: 0,
  },
  reducers: {
    incrementCartCounter: (state) => {
      state.value += 1;
    },
    decrementCartCounter: (state) => {
      state.value += 1;
    },
  },
});

export const { incrementCartCounter, decrementCartCounter } =
  cartCounterSlice.actions;
export default cartCounterSlice.reducer;
