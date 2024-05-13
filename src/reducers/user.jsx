import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  loading: true,
  status: "init",
};

const userSlice = createSlice({
  name: "user",
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
    no_token(state) {
      return {
        ...state,
        data: null,
        loading: false,
        status: "success",
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
    logout(state) {
      localStorage.removeItem("favourite");
      
      return {
        ...state,
        data: null,
        loading: false,
        status: "logout",
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

export const { init, no_token, success, logout, failed } = userSlice.actions;
export default userSlice;
