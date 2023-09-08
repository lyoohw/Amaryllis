import { configureStore, createSlice } from "@reduxjs/toolkit";

const HisTrue = createSlice({
  name: "HisTrue",
  initialState: false,
  reducers: {
    setHisTrue(state) {
      return !state;
    },
  },
});

export let { setHisTrue } = HisTrue.actions;

export default configureStore({
  reducer: {
    HisTrue: HisTrue.reducer,
  },
});
