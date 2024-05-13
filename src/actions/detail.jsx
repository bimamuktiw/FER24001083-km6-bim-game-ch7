import { fetcher } from "../helper/utils";
import { failed, init, success } from "../reducers/detail";

export const fetchDataDetailMovie = ({ id = "" }) => {
  return async (dispatch) => {
    dispatch(init());
    try {
      const { data } = await fetcher(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US`
      );
      dispatch(success(data));
    } catch (err) {
      dispatch(failed(err));
    }
  };
};
