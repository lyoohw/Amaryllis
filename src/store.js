import { configureStore, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const getData = axios
  .get(
    "https://gist.githubusercontent.com/lyoohw/993567724038ad2a679b374587944b42/raw/1999ff82029af3d035364d4d62afd7fbf19ccc1a/cosmetics.json"
  )
  .then((result) => {
    return result.data;
  });

const data = await getData;

const HisTrue = createSlice({
  name: "HisTrue",
  initialState: false,
  reducers: {
    setHisTrue(state) {
      return !state;
    },
  },
});

const items = createSlice({
  name: "items",
  initialState: data,
});

const currentPage = createSlice({
  name: "currentPage",
  initialState: 1,
  reducers: {
    paginate(state, number) {
      state = number.payload;
      return state;
    },
  },
});

const itemPerPage = createSlice({
  name: "itemPerPage",
  initialState: 9,
});

export let { setHisTrue } = HisTrue.actions;
export let { paginate } = currentPage.actions;

export default configureStore({
  reducer: {
    HisTrue: HisTrue.reducer,
    items: items.reducer,
    currentPage: currentPage.reducer,
    itemPerPage: itemPerPage.reducer,
  },
});
