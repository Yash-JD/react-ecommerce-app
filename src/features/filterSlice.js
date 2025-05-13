import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  initialState: {
    categories: [],
  },
  name: "filterCategory",
  reducers: {
    addCategory: (state, action) => {
      if (!state.categories.includes(action.payload))
        state.categories.push(action.payload);
    },
  },
});

export const { addCategory } = filterSlice.actions;
export default filterSlice.reducer;
