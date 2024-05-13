import axios from "axios";
import { failed, init, no_token, success } from "../reducers/user";

export const fetchDataMember = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    dispatch(init());

    if (token) {
      try {
        const data = await axios
          .request({
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            method: "GET",
            url: "https://shy-cloud-3319.fly.dev/api/v1/auth/me",
          })
          .then((res) => {
            if (res?.status === 200) {
              return res?.data?.data || null;
            } else {
              new Error("Couldn't find user");
            }
          });

        dispatch(success(data));
      } catch (err) {
        console.log(err);
        dispatch(failed(err || null));
        alert(err?.response?.data?.message || "Error");
        localStorage.removeItem("token");
      }
    } else {
      dispatch(no_token());
    }
  };
};
