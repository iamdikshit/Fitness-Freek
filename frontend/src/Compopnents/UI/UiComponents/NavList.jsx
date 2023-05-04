import React from "react";
import { NavLink, Link } from "react-router-dom";
import GoogleBtn from "./GoogleBtn";
import { useSelector, useDispatch } from "react-redux";
import { loggedOut } from "../../Store/UserSlice";
import { images } from "../../../assets";
const NavList = (props) => {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.user);
  const logoutHandler = () => {
    localStorage.setItem("token", "");
    dispatch(loggedOut());
  };
  return (
    <ul className={`${props.class}`}>
      <li className="border-b border-b-light-gray pb-4 relative lg:hidden">
        <div className="container mx-auto flex items-center gap-4 pt-4">
          {isLoggedIn && (
            <>
              <Link to="/">
                <img
                  className="w-8 h-8 rounded-full border border-light-gray"
                  src={user.image ? user.image : images.user}
                  alt="user default"
                />
              </Link>
              <Link to="/">
                <p className="text-dark-gray flex gap-2 text-sm">
                  <span>{user.name ? user.name.split(" ")[0] : "User"}</span>
                </p>
              </Link>
            </>
          )}
          {!isLoggedIn && <GoogleBtn OnClick={props.login} />}
        </div>
        {/* <!-- Button to close the side window --> */}
        <button className="button-close bg-transparent order-first absolute -top-2 -right-2">
          <ion-icon
            className="w-6 h-6 hidden text-light-gray hover:text-dark-gray"
            id="close"
            name="close"
          ></ion-icon>
        </button>
      </li>

      <li>
        <NavLink
          onClick={props.OnClick}
          className={`${({ isActive }) =>
            isActive ? "active" : ""}  menu-links `}
          to="/"
          end
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={props.OnClick}
          className={`${({ isActive }) =>
            isActive ? "active" : ""}  menu-links `}
          to="product"
          end
        >
          Shop
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={props.OnClick}
          className={`${({ isActive }) =>
            isActive ? "active" : ""}  menu-links `}
          to="about"
          end
        >
          About
        </NavLink>
      </li>
      <li className="hidden">
        <NavLink
          onClick={props.OnClick}
          className={`${({ isActive }) =>
            isActive ? "active" : ""}  menu-links `}
          to="contact"
          end
        >
          Contact
        </NavLink>
      </li>
      {isLoggedIn && (
        <li onClick={logoutHandler} className={`menu-links cursor-pointer `}>
          Logout
        </li>
      )}
    </ul>
  );
};

export default NavList;
