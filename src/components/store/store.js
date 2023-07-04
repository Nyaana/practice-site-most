import { configureStore } from "@reduxjs/toolkit";
import productsReducer, { fetchProducts } from "./productsSlice";
import basketReducer from "./basketSlice";
import productDetailsReducer from "./productDetailsSlice";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    basket: basketReducer,
    productDetails: productDetailsReducer,
    auth: authReducer,
  },
});

store.dispatch(fetchProducts());

export default store;
