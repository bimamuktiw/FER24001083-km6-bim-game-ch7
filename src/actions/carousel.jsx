import { fetcher } from "../helper/utils";
import { failed, init, success } from "../reducers/carousel";

const LIMIT_CAROUSEL = 10;

export const fetchDataCarousel = () => {
  return async (dispatch) => {
    dispatch(init());
    try {
      const { data } = await fetcher(
        "https://api.themoviedb.org/3/movie/now_playing?page=1"
      );
      const dataLimit =
        data?.results?.filter((_, index) => index < LIMIT_CAROUSEL) || [];
      dispatch(success(dataLimit));
    } catch (err) {
      dispatch(failed(err));
    }
  };
};
