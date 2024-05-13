import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: true,
  status: "init",
};

const movieSlice = createSlice({
  name: "movie-list",
  initialState,
  reducers: {
    init(state) {
      return {
        ...state,
        data: [],
        loading: true,
        status: "fetching",
      };
    },
    success(state, action) {
      const payload = action.payload;

      return {
        ...state,
        data: payload?.results || [],
        loading: false,
        status: "success",
      };
    },
    failed(state) {
      return {
        ...state,
        data: [],
        loading: false,
        status: "failed",
      };
    },
  },
});

export const { init, success, failed } = movieSlice.actions;
export default movieSlice;
