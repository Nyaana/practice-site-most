import { configureStore } from "@reduxjs/toolkit";
import productsReducer, { fetchProducts } from "./productsSlice";
import basketReducer from "./basketSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    basket: basketReducer,
  },
});

store.dispatch(fetchProducts());

export default store;
