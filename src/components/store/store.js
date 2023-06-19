import { configureStore } from "@reduxjs/toolkit";
import productsReducer, { fetchProducts } from "./productsSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});

store.dispatch(fetchProducts());

export default store;
