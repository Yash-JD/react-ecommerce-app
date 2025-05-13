import { configureStore } from "@reduxjs/toolkit";
import wishlistCounterReducer from "../features/wishlistSlice.js";
import cartCounterReducer from "../features/cartSlice.js";
import filterSearchReducer from "../features/filterSlice.js";

export const store = configureStore({
  reducer: {
    wishlistCounter: wishlistCounterReducer,
    cartCounter: cartCounterReducer,
    filterSearch: filterSearchReducer,
  },
});
