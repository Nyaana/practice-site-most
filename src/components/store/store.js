import { configureStore } from "@reduxjs/toolkit";
import productsReducer, { fetchProducts } from "./productsSlice";
import basketReducer from "./basketSlice";
import productDetailsReducer from "./productDetailsSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    basket: basketReducer,
    productDetails: productDetailsReducer,
  },
});

store.dispatch(fetchProducts());

export default store;
