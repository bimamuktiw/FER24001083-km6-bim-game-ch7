import { fetcher } from "../helper/utils";
import { failed, init, success } from "../reducers/list";

export const fetchDataMovie = ({ search = "", page = 1 }) => {
  return async (dispatch) => {
    dispatch(init());
    try {
      const { data } = await fetcher(
        search
          ? `https://api.themoviedb.org/3/search/movie?query=${search}&page=${page}`
          : `https://api.themoviedb.org/3/movie/popular?page=${page}`
      );
      dispatch(success(data));
    } catch (err) {
      dispatch(failed(err));
    }
  };
};
