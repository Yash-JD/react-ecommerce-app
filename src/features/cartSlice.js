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
    onLoadSetCartCount: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const {
  incrementCartCounter,
  decrementCartCounter,
  onLoadSetCartCount,
} = cartCounterSlice.actions;
export default cartCounterSlice.reducer;
