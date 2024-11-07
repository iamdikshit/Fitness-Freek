import React, { useEffect, useState } from "react";
// import { images } from "../../../assets";
import { urlFor } from "../../SanityConfig/client";
import useRatings from "../../Hooks/useRatings";
import {
  IoHeartOutline,
  IoCartOutline,
  IoStar,
  IoStarOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import useCartAction from "../../Hooks/useCartAction";

const Card = ({ data, notify }) => {
  const [averageRating, setAverageRating] = useState();
  const { ratingFunction } = useRatings();
  const { insertDataIntoCart } = useCartAction();
  /*
    Function to store data in local storage
  */

  const wishlistHandler = (data) => {
    if (insertDataIntoCart({ type: "wishlist", data: data })) {
      notify({ type: "success", message: "Item is added in wishlist" });
    } else {
      notify({ type: "error", message: "Quantity can not more than 5" });
    }
  };

  const cartHandler = (data) => {
    if (insertDataIntoCart({ type: "cart", data: data })) {
      notify({ type: "success", message: "Item is added in cart" });
    } else {
      notify({ type: "error", message: "Quantity can not more than 5" });
    }
    // localStorage.setItem("cart", JSON.stringify(cart));
  };

  useEffect(() => {
    const getRating = async (avgRating) => {
      setAverageRating(avgRating);
    };
    ratingFunction(data._id, getRating);
  }, [data._id, ratingFunction]);

  return (
    <>
      <div className="product-card w-full max-w-sm bg-white shadow-lg flex flex-col items-stretch">
        <div className="product-img relative overflow-hidden">
          {data.coupon ? (
            <div className="badge-discount  absolute z-10 transform -rotate-45 -left-7 top-4">
              <span className="discount px-8 py-1 danger text-white text-center text-xs transform -rotate-45">
                {data.coupon.discount}% off
              </span>
            </div>
          ) : (
            <div className="badge absolute z-10 ">
              <span className="out-stock px-4 py-1 warning hidden text-white text-xs">
                Out of stock
              </span>
              <span className="bestseller px-4 py-1 success  text-white text-xs">
                Bestseller
              </span>
            </div>
          )}

          <Link className="w-full" to={`product/${data.slug?.current}`}>
            <div className="w-full h-72 flex items-center justify-center">
              <img
                src={urlFor(data.poster && data.poster).url()}
                className="w-[50%] object-cover  hover:scale-105  transition-all duration-500"
                alt="product "
              />
            </div>
          </Link>
          <div className="shop-icon w-full absolute bottom-0">
            <ul className="flex items-center justify-center pb-2 gap-8">
              <li>
                <button
                  onClick={() => {
                    wishlistHandler(data);
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
                  onClick={() => {
                    cartHandler(data);
                  }}
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
            {[1, 2, 3, 4, 5].map((el, index) =>
              el <= averageRating ? (
                <span key={index} className="">
                  <IoStar className="text-yellow-500" name="star"></IoStar>
                </span>
              ) : (
                <span key={index} className="">
                  <IoStarOutline
                    className="text-yellow-500"
                    name="star-outline"
                  ></IoStarOutline>
                </span>
              )
            )}
            {/* <span className="">
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
          </span> */}
          </div>

          <div className="price flex flex-col items-end">
            <span className="price-mrp">
              <del className="text-xs sm:text-sm font-semibold text-gray-500">
                ₹{data.price.markedprice}
              </del>
            </span>
            <span className="total-price text-2xl font-bold text-gray-900">
              ₹{data.price.price}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
