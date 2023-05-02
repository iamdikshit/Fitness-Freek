import React, { useState } from "react";
// import { SearchBar } from "../UiComponents";
import { images } from "../../../assets";
import {
  NavList,
  SearchBar,
  Button,
  OverLay,
  GoogleBtn,
} from "../UiComponents";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";

import {
  IoCartOutline,
  IoHeartOutline,
  IoSearchOutline,
  IoReorderThreeOutline,
  IoCloseOutline,
} from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { loggedIn, loggedOut, addUser } from "../../Store/UserSlice";
import { client } from "../../SanityConfig/client";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, user } = useSelector((state) => state.user);
  const totalItems = useSelector((state) => state.cart.totalItems);
  const { totalItems: wishlistTotalItems } = useSelector(
    (state) => state.wishlist
  );

  const [isActive, setIsActive] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const toggleMenu = () => {
    setIsActive((prev) => !prev);
  };
  const toggleSearch = () => {
    setSearchActive((prev) => !prev);
  };

  // Google Login

  const login = useGoogleLogin({
    onSuccess: async (respose) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${respose.access_token}`,
            },
          }
        );

        localStorage.setItem("token", respose.access_token);

        const userData = {
          _id: res.data.sub,
          _type: "user",
          name: res.data.name,
          email: res.data.email,
          image: res.data.picture,
          token: respose.access_token,
        };

        client
          .createIfNotExists(userData)
          .then((response) => {
            dispatch(loggedIn());
            dispatch(addUser(userData));
            navigate(`${window.location.pathname}`);
          })
          .catch((error) => {
            console.error("Error creating or replacing user:", error);
          });
      } catch (err) {
        dispatch(loggedOut());
        console.log(err);
      }
    },
  });

  return (
    <>
      <header className="header-section  mx-auto h-16 md:h-24 relative  shadow-md flex items-center justify-between px-4 md:px-8 lg:px-16 z-20">
        {/* <!-- Navbar --> */}
        <div className="navbar-inner order-last">
          <ul className="navbar flex items-center justify-center gap-2 md:gap-3 lg:gap-6">
            <li className="relative flex justify-center items-center">
              <Button
                OnClick={toggleSearch}
                className="search-open flex justify-center items-center"
              >
                <IoSearchOutline
                  className="w-6 h-6 text-light-gray hover:text-dark-gray"
                  name="search-outline"
                ></IoSearchOutline>
              </Button>
            </li>
            <li className="flex justify-center items-center relative">
              <Link
                to={"wishlist"}
                className="flex justify-center items-center"
              >
                <IoHeartOutline
                  className="w-6 h-6 text-light-gray hover:text-dark-gray"
                  name="heart-outline"
                ></IoHeartOutline>
                {wishlistTotalItems > 0 && (
                  <>
                    <span className="absolute animate-ping -right-0 -top-0 md:-right-1 md:-top-1 rounded-full bg-red-700 w-2 h-2 md:w-3 md:h-3 p-0 m-0 text-white font-mono text-[0.5rem] md:text-xs leading-tight text-center"></span>
                    <span className="absolute -right-0 -top-0 md:-right-1 md:-top-1 rounded-full bg-red-700 w-2 h-2 md:w-3 md:h-3 p-0 m-0 text-white font-mono text-[0.5rem] md:text-xs leading-tight text-center"></span>
                  </>
                )}
              </Link>
            </li>
            <li className="flex justify-center items-center relative">
              <Link to={"cart"} className="flex justify-center items-center">
                <IoCartOutline
                  className="w-6 h-6 text-light-gray hover:text-dark-gray"
                  name="cart-outline"
                ></IoCartOutline>
                {totalItems > 0 && (
                  <>
                    <span className="absolute animate-ping -right-0 -top-0 md:-right-1 md:-top-1 rounded-full bg-red-700 w-2 h-2 md:w-3 md:h-3 p-0 m-0 text-white font-mono text-[0.5rem] md:text-xs leading-tight text-center"></span>
                    <span className="absolute -right-0 -top-0 md:-right-1 md:-top-1 rounded-full bg-red-700 w-2 h-2 md:w-3 md:h-3 p-0 m-0 text-white font-mono text-[0.5rem] md:text-xs leading-tight text-center"></span>
                  </>
                )}
              </Link>
            </li>
            <li className="hidden lg:block">
              <div
                className={`container mx-auto flex items-center gap-2 ${
                  isLoggedIn ? "" : "hidden"
                } `}
              >
                <a href="/">
                  <img
                    className="w-8 h-8 rounded-full border border-light-gray"
                    src={user?.image}
                    alt={user.name}
                  />
                </a>
              </div>
              {/* login */}
              {!isLoggedIn && <GoogleBtn OnClick={login} />}
            </li>
          </ul>
        </div>
        <div className="navbar-inner mx-auto absolute left-1/2 -translate-x-7 md:-translate-x-10 ">
          <a href="/" className="">
            <img
              className="w-14 md:w-20"
              src={images.logo}
              alt="website logo"
            />
          </a>
        </div>

        {/* <!-- Menu for Large screen for laptop and desktop --> */}
        <div className="navbar-inner hidden lg:flex">
          <NavList
            login={login}
            class={
              "navbar flex flex-row justify-center items-center gap-4 uppercase font-semibold"
            }
          />
        </div>
        {/* <!-- Menu icon for Tablet and Mobile version --> */}
        <div className="navbar-inner order-first lg:hidden">
          <Button
            OnClick={toggleMenu}
            class="button-open bg-transparent order-first"
          >
            <IoReorderThreeOutline
              className="w-8 h-8 text-light-gray hover:text-dark-gray"
              id="menu"
              name="menu-outline"
            ></IoReorderThreeOutline>
          </Button>
        </div>

        {/* <!-- Side Menu for Tablet and Mobile hidden for large screen --> */}
        <motion.div
          initial={{
            opacity: 0,
            pointerEvents: null,
            x: "-100%",
          }}
          whileInView={{
            x: "0%",
            opacity: 1,
            pointerEvents: "auto",
          }}
          transition={{
            duration: 0.2,
            ease: "easeInOut",
          }}
          id="nav"
          className={`menu mx-auto w-1/2 md:w-1/3 h-screen bg-white shadow-2xl top-0 left-0 fixed ${
            !isActive ? "hidden" : ""
          } lg:hidden  z-50`}
        >
          <Button
            OnClick={toggleMenu}
            class="absolute right-0 bg-transaprent cursor-pointer"
          >
            <IoCloseOutline
              className={`w-6 h-6 sm:w-8 sm:h-8  text-gray-700 hover:text-gray-900 `}
              id="close"
              name="close"
            ></IoCloseOutline>
          </Button>
          <NavList
            login={login}
            OnClick={toggleMenu}
            class={
              "navbar flex flex-col lg:flex-row gap-2 p-4 font-semibold uppercase"
            }
          />
        </motion.div>
        {/* over lay */}
        <OverLay active={isActive} OnClick={toggleMenu} />

        {/* <!-- Navbar End --> */}
        {/* <!-- Search Bar --> */}
        <SearchBar OnClick={toggleSearch} searchActive={searchActive} />
      </header>
    </>
  );
};

export default Header;
