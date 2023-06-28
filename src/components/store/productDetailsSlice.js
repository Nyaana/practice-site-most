import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProductDetails = createAsyncThunk(
  "productDetails/fetchProductDetails",
  async (productId) => {
    const response = await fetch(`https://dummyjson.com/products/${productId}`);
    const data = await response.json();
    return data;
  }
);

const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState: {
    loading: false,
    error: null,
    title: "",
    description: "",
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    brand: "",
    category: "",
    thumbnail: "",
    images: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductDetails.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProductDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.title = action.payload.title;
      state.description = action.payload.description;
      state.price = action.payload.price;
      state.discountPercentage = action.payload.discountPercentage;
      state.rating = action.payload.rating;
      state.stock = action.payload.stock;
      state.brand = action.payload.brand;
      state.category = action.payload.category;
      state.thumbnail = action.payload.thumbnail;
      state.images = action.payload.images;
    });
    builder.addCase(fetchProductDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default productDetailsSlice.reducer;
