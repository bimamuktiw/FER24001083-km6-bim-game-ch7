import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: true,
  status: "init",
};

const movieCarousel = createSlice({
  name: "carousel",
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
        data: payload || [],
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

export const { init, success, failed } = movieCarousel.actions;
export default movieCarousel;
