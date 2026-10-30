import { createAsyncThunk } from "@reduxjs/toolkit";
import { DTOType, RequestValuesType } from "../../api/types";
import { api } from "../../api";

export type FetchValuesArgs = {
  productId: string;
  values: RequestValuesType;
  requestId: number;
};

export const fetchValues = createAsyncThunk<
  DTOType,
  FetchValuesArgs,
  { rejectValue: string }
>("values/fetchValues", async ({ productId, values }, thunkAPI) => {
  try {
    return await api.getValues(productId, values);
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error instanceof Error ? error.message : "Could not load lens prices."
    );
  }
});
