import { createSlice, current } from "@reduxjs/toolkit";

const initialState = [];

const favouriteMovieSlice = createSlice({
  name: "favourite",
  initialState,
  reducers: {
    add_remove(state, action) {
      const { data } = action.payload;
      const payload = {
        id: data.id,
        title: data.title,
        poster: data.poster_path,
      };

      // check if already added
      const listId = state.map((item) => item.id);

      if (listId.includes(payload.id)) {
        const indexItem = listId.indexOf(payload.id);
        const temp = current(state);

        return temp.filter((item, index) => index !== indexItem);
      }

      const formData = [...state, payload];

      localStorage.setItem("favourite", JSON.stringify(formData));

      return formData;
    },
    clear() {
      return initialState;
    },
  },
});

export const { add_remove, clear } = favouriteMovieSlice.actions;
export default favouriteMovieSlice;
