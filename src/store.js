import { configureStore, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const getData = axios
  .get(
    "https://gist.githubusercontent.com/lyoohw/993567724038ad2a679b374587944b42/raw/1999ff82029af3d035364d4d62afd7fbf19ccc1a/cosmetics.json"
  )
  .then((result) => {
    return result.data;
  });

const awaitData = await getData;
let data = [...awaitData];

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
  reducers: {
    setItems(state, a) {
      state = a.payload;
      return state;
    },
  },
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

const userData = createSlice({
  name: "userData",
  initialState: "",
  reducers: {
    setUserData(state, a) {
      state = JSON.parse(a.payload);
      return state;
    },
  },
});

const isLoggedIn = createSlice({
  name: "isLoggedIn",
  initialState: false,
  reducers: {
    setIsLoggedIn(state, a) {
      state = a.payload;
      return state;
    },
  },
});

export let { setHisTrue } = HisTrue.actions;
export let { setItems } = items.actions;
export let { paginate } = currentPage.actions;
export let { setUserData } = userData.actions;
export let { setIsLoggedIn } = isLoggedIn.actions;

export default configureStore({
  reducer: {
    HisTrue: HisTrue.reducer,
    items: items.reducer,
    currentPage: currentPage.reducer,
    itemPerPage: itemPerPage.reducer,
    userData: userData.reducer,
    isLoggedIn: isLoggedIn.reducer,
  },
});
