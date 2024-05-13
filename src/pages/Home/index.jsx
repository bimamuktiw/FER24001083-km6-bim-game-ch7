import Container from "../../component/atoms/Container";
import Carousel from "../../component/atoms/Carousel";
import Button from "../../component/atoms/Button";
import { useEffect, useState } from "react";
import { getImageURL } from "../../helper/utils";
import { Icon } from "@iconify/react";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom";
import Pagination from "../../component/atoms/Pagination";
import { cn } from "../../lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataMovie } from "../../actions/list";
import { fetchDataCarousel } from "../../actions/carousel";
import { useFavourite } from "../../hooks/useFavourite";

const MAX_PAGE = 500;

export default function HomePage() {
  const location = useLocation();
  const [page, setPage] = useState(1);
  const search = new URLSearchParams(location.search).get("search");
  const { setFavourite, checkFavourite } = useFavourite();
  const { data: list, loading } = useSelector((state) => state.list);
  const { data: user, loading: loadingUser } = useSelector(
    (state) => state.user
  );

  const {
    status,
    data: carouselList,
    loading: loadingCarousel,
  } = useSelector((state) => state.carousel);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "init") dispatch(fetchDataCarousel());
  }, [dispatch, status]);

  useEffect(() => {
    dispatch(fetchDataMovie({ search, page }));
  }, [dispatch, page, search]);

  return (
    <div className="-mt-[60px] bg-[#1C1C1C] ">
      {!search && (
        <Carousel>
          {!loadingCarousel &&
            carouselList.map((item, index) => (
              <div
                key={`carousel-${index}`}
                className="flex-[0_0_100%] h-screen bg-slate-400 bg-center bg-cover"
                style={{
                  backgroundImage: `url('${getImageURL(item.backdrop_path)}')`,
                }}
              >
                <Container className="flex items-center h-full">
                  <Link
                    key={`card-${index}`}
                    to={`/detail/${item.id}`}
                    className="group"
                  >
                    <div className="max-w-[500px] h-[250px] backdrop-blur-sm py-[40px] px-8 rounded-2xl text-white">
                      <h1 className="text-5xl">{item.original_title}</h1>
                      <p className="mt-4">{item.overview}</p>

                      <Button className="mt-9">
                        <Icon icon="el:play-alt" width={20} height={20} />
                        Watch Trailer
                      </Button>
                    </div>
                  </Link>
                </Container>
              </div>
            ))}
        </Carousel>
      )}

      <Container className={search ? "mt-0" : "mt-[50px]"}>
        <div className="flex items-center justify-between pt-20">
          {search && (
            <p
              className="flex items-center gap-1 text-gray-500 hover:text-white"
              onClick={() => {
                window.location.href = "/";
                setPage(1);
              }}
            >
              <Icon icon="tabler:chevron-left" height={25} />
              back to home
            </p>
          )}
          <h3 className="text-2xl flex gap-2 items-center text-white">
            {search && <Icon icon="ic:sharp-search" height={35} />}
            {search ? `Search result "${search}"` : "Movies"}
          </h3>
          {!loading && (
            <Pagination
              page={page}
              onPrev={() => setPage((count) => count - 1)}
              onNext={() => setPage((count) => count + 1)}
              onSubmit={(val) => setPage(val)}
              maxPage={MAX_PAGE}
            />
          )}
        </div>
        {loading ? (
          <div className="h-[70vh] flex items-center justify-center flex-col gap-5 text-gray-300">
            <Icon icon="eos-icons:bubble-loading" height={65} />
            <p className="text-xl font-bold">Sabar!!!</p>
          </div>
        ) : list?.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-5 xl:grid-cols-6 gap-10 my-10">
            {list.map((item, index) => {
              const isFavourite = checkFavourite(item.id);

              return (
                <div
                  className="relative duration-150 bottom-0 hover:bottom-4"
                  key={`card-${index}`}
                >
                  {user && !loadingUser && (
                    <button
                      className={cn(
                        "cursor-pointer absolute flex justify-center items-center z-10 right-3 top-3 aspect-square w-[40px] border-2 border-white rounded-full duration-150 backdrop-blur-sm hover:text-red-800",
                        isFavourite
                          ? "text-red-500 border-red-400"
                          : "text-white"
                      )}
                      onClick={() => setFavourite(item)}
                    >
                      <Icon icon="mdi:favourite" height={20} className="" />
                    </button>
                  )}

                  <Link
                    to={`/detail/${item.id}`}
                    className="group cursor-pointer"
                  >
                    <div
                      className="flex items-end overflow-hidden rounded-lg aspect-[3/5] bg-center object-cover bg-cover"
                      style={{
                        backgroundImage: `url('${getImageURL(
                          item.poster_path
                        )}')`,
                      }}
                    >
                      <p className="bg-gradient-to-t from-gray-800 w-full px-5 pb-5 pt-10 text-white text-m font-bold">
                        {item.original_title}
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="h-[70vh] flex items-center justify-center flex-col gap-5 text-gray-300">
            <Icon icon="line-md:coffee-half-empty-twotone-loop" height={125} />
            <p className="text-xl font-bold">
              Jangan nyari yang aneh aneh plis!
            </p>
          </div>
        )}
        {!loading && (
          <div
            className={cn(
              "flex items-end py-2",
              search ? "justify-end" : "justify-end"
            )}
          >
            <Pagination
              page={page}
              onPrev={() => setPage((count) => count - 1)}
              onNext={() => setPage((count) => count + 1)}
              onSubmit={(val) => setPage(val)}
              maxPage={MAX_PAGE}
            />
          </div>
        )}
      </Container>
    </div>
  );
}
