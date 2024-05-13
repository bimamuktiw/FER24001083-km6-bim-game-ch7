import { combineReducers } from "redux";
import movieSlice from "./list";
import movieCarousel from "./carousel";
import movieDetailSlice from "./detail";
import userSlice from "./user";
import favouriteMovieSlice from "./favourite";

export default combineReducers({
  list: movieSlice.reducer,
  detail: movieDetailSlice.reducer,
  carousel: movieCarousel.reducer,
  favourite: favouriteMovieSlice.reducer,
  user: userSlice.reducer,
});
