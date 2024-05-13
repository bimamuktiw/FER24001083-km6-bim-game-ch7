import React, { useEffect } from "react";
import { getImageURL } from "../../helper/utils";
import Carousel from "../../component/atoms/Carousel";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataCarousel } from "../../actions/carousel";

export default function AuthLayout({ children }) {
  const dispatch = useDispatch();
  const { status, data, loading } = useSelector((state) => state.carousel);

  useEffect(() => {
    if (status === "init") dispatch(fetchDataCarousel());

    if (localStorage.getItem("token") !== null) {
      alert(
        "Tidak perlu login/register lagi, karena token kamu masih aktif kok"
      );
      window.location.href = "/";
    }
  }, [dispatch, status]);

  return (
    <div className="min-h-screen -mt-[60px] relative">
      <Carousel>
        {!loading &&
          data.map((item, index) => (
            <div
              key={`carousel-${index}`}
              className="flex-[0_0_100%] h-screen bg-slate-400 bg-center bg-cover"
              style={{
                backgroundImage: `url('${getImageURL(item.backdrop_path)}')`,
              }}
            />
          ))}
      </Carousel>
      <div className="absolute z-10 top-0 right-0 w-full h-full flex justify-center items-center px-[20px]">
        <div className="bg-[#1C1C1C] rounded-lg w-full min-w-[300px] max-w-[600px] p-10">
          {children}
        </div>
      </div>
    </div>
  );
}
