import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  loading: true,
  status: "init",
};

const movieDetailSlice = createSlice({
  name: "movie-detail",
  initialState,
  reducers: {
    init(state) {
      return {
        ...state,
        data: null,
        loading: true,
        status: "fetching",
      };
    },
    success(state, action) {
      const payload = action.payload;

      return {
        ...state,
        data: payload || null,
        loading: false,
        status: "success",
      };
    },
    failed(state) {
      return {
        ...state,
        data: null,
        loading: false,
        status: "failed",
      };
    },
  },
});

export const { init, success, failed } = movieDetailSlice.actions;
export default movieDetailSlice;
