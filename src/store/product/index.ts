import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api";
import { Product } from "../../api/types";

export type ProductStatus = "idle" | "loading" | "succeeded" | "failed";

export type productState = {
  data: Product | null;
  status: ProductStatus;
  error: string | null;
};

const initialState: productState = {
  data: null,
  status: "idle",
  error: null,
};

export const fetchProduct = createAsyncThunk<
  Product,
  string,
  { rejectValue: string }
>("product/fetchProduct", async (productId, thunkAPI) => {
  try {
    return await api.getProduct(productId);
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error instanceof Error ? error.message : "Product was not found."
    );
  }
});

export const productSlice = createSlice({
  initialState,
  name: "product",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = "failed";
        state.data = null;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Product was not found.";
      });
  },
});

export const productReducer = productSlice.reducer;
