import React from "react";
import { images } from "../../../assets";
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoYoutube,
  IoLogoTwitter,
} from "react-icons/io5";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="footer-section py-4 px-8 md:px-16 mt-24 pb-2 bg-red-100">
      <div className="footer py-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12 border-b border-red-200">
        <div className="inner-footer flex flex-col col-span-2 sm:col-span-1 lg:col-span-2">
          <img className="w-32" src={images.logo} alt="logo" />
          <address className="mt-auto pt-6">
            We provide the right diet plan and the right sports supplements all
            over India, So that India remains healthy and wealthy, Because we
            believe that health is wealth.
          </address>
        </div>
        <div className="inner-footer flex flex-col gap-3">
          <h1 className="uppercase font-semibold">Quick links</h1>
          <ul>
            <li>
              <Link className="text-sm text-light-gray" to={"/"}>
                Home
              </Link>
            </li>
            <li>
              <Link className="text-sm text-light-gray" to={"about"}>
                About
              </Link>
            </li>
            <li className="hidden">
              <a className="text-sm text-light-gray" href="/">
                Blog
              </a>
            </li>
            <li>
              <Link className="text-sm text-light-gray" to={"product"}>
                Shop
              </Link>
            </li>
          </ul>
        </div>
        <div className="inner-footer flex flex-col gap-3">
          <h1 className="uppercase font-semibold">Account</h1>
          <ul className="">
            <li>
              <a className="text-sm text-light-gray" href="/">
                My Account
              </a>
            </li>
            <li>
              <a className="text-sm text-light-gray" href="/">
                Checkout
              </a>
            </li>
            <li>
              <a className="text-sm text-light-gray" href="/">
                Wishlisht
              </a>
            </li>
            <li>
              <a className="text-sm text-light-gray" href="/">
                My Orders
              </a>
            </li>
          </ul>
        </div>
        <div className="inner-footer flex flex-col gap-3 sm:col-span-1 lg:col-span-2">
          <h1 className="uppercase font-semibold">Contact</h1>
          <i className="">fitnessfreek@shop.com</i>
          <ul className="flex items-center gap-4">
            <li>
              <a
                href="/"
                className="p-2 bg-red-700 flex items-center justify-center rounded-full"
              >
                <IoLogoFacebook
                  className="w-6 h-6 text-white"
                  name="logo-facebook"
                ></IoLogoFacebook>
              </a>
            </li>
            <li>
              <a
                href="/"
                className="p-2 bg-red-700 flex items-center justify-center rounded-full"
              >
                <IoLogoInstagram
                  className="w-6 h-6 text-white"
                  name="logo-instagram"
                ></IoLogoInstagram>
              </a>
            </li>
            <li>
              <a
                href="/"
                className="p-2 bg-red-700 flex items-center justify-center rounded-full"
              >
                <IoLogoYoutube
                  className="w-6 h-6 text-white"
                  name="logo-youtube"
                ></IoLogoYoutube>
              </a>
            </li>
            <li>
              <a
                href="/"
                className="p-2 bg-red-700 flex items-center justify-center rounded-full"
              >
                <IoLogoTwitter
                  className="w-6 h-6 text-white"
                  name="logo-twitter"
                ></IoLogoTwitter>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto py-4 flex items-center justify-center">
        <p className="mx-auto text-xs text-light-gray">
          Copyright © 2024 All rights reserved | Developed by Yesonance
        </p>
      </div>
    </footer>
  );
};

export default Footer;
