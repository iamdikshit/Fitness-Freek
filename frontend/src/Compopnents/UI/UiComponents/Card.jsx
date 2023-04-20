import React, { useRef } from "react";
import { images } from "../../../assets";
import {
  IoHeartOutline,
  IoCartOutline,
  IoStar,
  IoStarOutline,
} from "react-icons/io5";

import { Link } from "react-router-dom";
const Card = ({ data }) => {
  const wishlishtRef = useRef();
  const wishlishtHandler = (data) => {
    console.log(data);
    // console.log(wishlishtRef);
  };
  return (
    <div className="product-card w-full max-w-sm bg-white shadow-lg flex flex-col items-stretch">
      <div className="product-img relative overflow-hidden">
        <div className="badge absolute z-10 ">
          <span className="out-stock px-4 py-1 warning hidden text-white text-xs">
            Out of stock
          </span>
          <span className="bestseller px-4 py-1 success  text-white text-xs">
            Bestseller
          </span>
        </div>
        <div className="badge-discount hidden absolute z-10 transform -rotate-45 -left-7 top-4">
          <span className="discount px-8 py-1 danger text-white text-center text-xs transform -rotate-45">
            50% off
          </span>
        </div>
        <Link to={`product/slug`}>
          <img
            src={images.product0}
            className="w-full h-auto hover:scale-105 object-cover transition-all duration-500"
            alt="product "
          />
        </Link>
        <div className="shop-icon w-full absolute bottom-0">
          <ul className="flex items-center justify-center pb-2 gap-8">
            <li>
              <button
                onClick={() => {
                  wishlishtHandler(data);
                }}
                // ref={wishlishtRef}
                className="bg-white p-2 rounded-full flex items-center shadow-lg hover:-translate-y-2 transition-all duration-300"
                title="Wishlisht"
              >
                <IoHeartOutline
                  className="w-8 h-8 p-1"
                  title="Wishlisht"
                  name="heart-outline"
                ></IoHeartOutline>
              </button>
            </li>
            <li>
              <button
                className="bg-white p-2 rounded-full flex items-center shadow-lg hover:-translate-y-2 transition-all duration-300"
                title="Cart"
              >
                <IoCartOutline
                  className="w-8 h-8 p-1"
                  name="cart-outline"
                ></IoCartOutline>
              </button>
            </li>
          </ul>
        </div>
      </div>

      <Link to={`product/slug`} className="px-4 pt-2 pb-2">
        <h5 className="text-lg text-center">{data.name}</h5>
      </Link>
      <div className="flex items-end px-4 pb-4 justify-between mt-auto">
        <div className="product-ratings flex">
          <span className="">
            <IoStar className="text-yellow-500" name="star"></IoStar>
          </span>
          <span className="">
            <IoStar className="text-yellow-500" name="star"></IoStar>
          </span>
          <span className="">
            <IoStar className="text-yellow-500" name="star"></IoStar>
          </span>
          <span className="">
            <IoStar
              className="text-yellow-500"
              name="star-half-outline"
            ></IoStar>
          </span>
          <span className="">
            <IoStarOutline
              className="text-yellow-500"
              name="star-outline"
            ></IoStarOutline>
          </span>
        </div>

        <div className="price flex flex-col items-end">
          <span className="price-mrp">
            <del className="text-xs sm:text-sm font-semibold text-gray-500">
              ₹23,000
            </del>
          </span>
          <span className="total-price text-2xl font-bold text-gray-900">
            ₹{data.price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
