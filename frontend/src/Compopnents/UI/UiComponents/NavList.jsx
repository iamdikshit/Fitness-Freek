import React from "react";
import { images } from "../../../assets";
import { NavLink, Link } from "react-router-dom";
const NavList = (props) => {
  return (
    <ul className={`${props.class}`}>
      <li className="border-b border-b-light-gray pb-4 relative lg:hidden">
        <div className="container mx-auto flex items-center gap-4 pt-4">
          <Link to="/">
            <img
              className="w-8 h-8 rounded-full border border-light-gray"
              src={images.logo}
              alt="user default"
            />
          </Link>
          <Link
            to="/"
            className="px-4 hidden py-1 border-black border-2 hover:border-2 hover:bg-black hover:text-white transition duration-300 ease-in-out"
          >
            Login
          </Link>
          <Link to="/">
            <p className="text-dark-gray flex gap-2">
              <span>Hi!</span>
              <span>Dikshit</span>
            </p>
          </Link>
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
          className={`${({ isActive }) =>
            isActive ? "active" : ""}  menu-links `}
          to="product"
          end
        >
          Products
        </NavLink>
      </li>
      <li>
        <NavLink
          className={`${({ isActive }) =>
            isActive ? "active" : ""}  menu-links `}
          to="about"
          end
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          className={`${({ isActive }) =>
            isActive ? "active" : ""}  menu-links `}
          to="contact"
          end
        >
          Contact
        </NavLink>
      </li>
    </ul>
  );
};

export default NavList;
