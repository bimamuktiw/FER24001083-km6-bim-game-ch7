import "./style.css";
import Container from "../../atoms/Container";
import { useEffect, useState } from "react";
import { cn } from "../../../lib/utils";
import Button from "../../atoms/Button";
import Search from "../../atoms/Search";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../reducers/user";
import { clear } from "../../../reducers/favourite";
import { Icon } from "@iconify/react";
import { useLocation } from "react-router-dom";

const THRESHOLD = 100;

function Navbar() {
  const { data: user, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [scroll, setScroll] = useState(window.scrollY);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = (e) => {
      setScroll(e.currentTarget.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollCondition = scroll > THRESHOLD;
  const isLoginPage = location.pathname === "/login";

  return (
    <header
      className={cn(
        "navbar flex justify-between duration-500",
        scrollCondition ? "bg-[#1C1C1C]  bg-opacity-95" : "backdrop-blur-sm"
      )}
    >
      <Container className="py-2">
        <div className="flex justify-between items-center">
          <div
            className={cn(
              "font-Bebas text-red-600 font-bold text-5xl px-3 rounded-lg",
              !scrollCondition ? "" : ""
            )}
          >
            Nempix
          </div>
          <div>
            {!isLoginPage && (
              <Search
                className="hidden md:block w-[250px] h-[30px] text-white"
                scrollCondition={scrollCondition}
              />
            )}
          </div>
          <div className="flex items-center gap-5">
            {!loading ? (
              user ? (
                <div className="flex items-center gap-3">
                  <button
                    className="text-red-400 cursor-pointer flex items-center gap-2"
                    onClick={() => {
                      localStorage.removeItem("token");
                      dispatch(logout());
                      dispatch(clear());
                      window.location.reload();
                    }}
                  >
                    <Icon icon="bi:box-arrow-right" height={20} />
                    <span>Logout</span>
                  </button>
                  <div className="bg-blue-400 uppercase aspect-square h-[30px] rounded-full flex justify-center items-center text-2xl">
                    {user.name.slice(0, 1)}
                  </div>
                </div>
              ) : (
                <Button
                  className="button"
                  variant="primary"
                  onClick={() => (window.location.href = "/login")}
                >
                  Login
                </Button>
              )
            ) : (
              ""
            )}
          </div>
        </div>
        {!isLoginPage && (
          <Search
            className="md:hidden block mt-5 w-full"
            scrollCondition={scrollCondition}
          />
        )}
      </Container>
    </header>
  );
}

export default Navbar;
