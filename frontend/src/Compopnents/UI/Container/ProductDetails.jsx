import React, { useRef, useState, useEffect } from "react";
import PortableText from "react-portable-text";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { Button } from "../UiComponents";
import Reviews from "./Reviews";
import {
  IoHeartOutline,
  IoCartOutline,
  IoStar,
  IoStarOutline,
} from "react-icons/io5";
import { urlFor } from "../../SanityConfig/client";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useCartAction from "../../Hooks/useCartAction";
import useRatings from "../../Hooks/useRatings";

const ProductDetails = (props) => {
  const [data] = props.data;
  const carousel = useRef();
  const weight = useRef();
  const [width, setWidth] = useState(0);
  const [price, setPrice] = useState({
    price: null,
    markedprice: null,
  });
  const [averageRating, setAverageRating] = useState();
  const [productImages, setProductImages] = useState([]);

  const [ratingCount, setRatingCount] = useState();

  const { ratingFunction, noOfRating } = useRatings();

  const [flavorsData, setFlavorsData] = useState([]);
  const [activeImg, setActiveImg] = useState(0);
  const [flavors, setFlavors] = useState(null);
  const [actionBtn, setActionBtn] = useState({
    isDiscription: true,
    isReview: false,
    isSpecification: false,
  });

  const { insertDataIntoCart } = useCartAction();

  useEffect(() => {
    /*
    This useEffect is used to store the unique flavours 
    */
    let flavorArray = [];
    if (data.length !== 0 && data.variants) {
      for (const item of data.variants) {
        if (!flavorArray.includes(item.flavor)) {
          flavorArray.push(item.flavor);
        }
      }
      setPrice((prev) => ({
        price: data.price.price,
        markedprice: data.price.markedprice,
      }));

      setFlavorsData((prev) => [...flavorArray]);
    }
  }, [data.variants, data]);

  /*
    creating arrays of images
    */

  useEffect(() => {
    let Images = [data.poster];
    data.images.map((img) => Images.push(img));
    setProductImages((prev) => [...Images]);
  }, [data]);

  //function for selection of main image
  const currentImg = useRef();
  const currentImgHandler = (e) => {
    currentImg.current.src = e.target.src;
    setActiveImg(+e.target.dataset.index);
  };

  /*
    This function is used to update the value of width if next button clicked
    */
  const nextBtn = (event) => {
    if (width < 0) setWidth((prev) => -prev);
    else {
      setWidth(-(carousel.current.scrollWidth - carousel.current.offsetWidth));
    }
    // console.log(width);
  };

  /*
    This function is used to update the value of width if prev button clicked
    */
  const prevBtn = () => {
    if (width > 0) setWidth((prev) => -prev);
    else setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  };

  /*
  @FindVariants based on flavor and weight,unit
  */
  const FindVariants = (flavor, weightAndUnit) => {
    let weight, unit;

    if (weightAndUnit !== "") {
      weight = weightAndUnit.split(" ")[0];
      unit = weightAndUnit.split(" ")[1];
    } else {
      const findWeight = data.variants.filter(
        (items) => items.flavor === flavor
      );
      const getWeight = findWeight[0].weight;
      weight = getWeight.weight;
      unit = getWeight.unit;
    }

    const v = data.variants.filter(
      (item) =>
        item.flavor === (flavors ? flavors : flavor) &&
        item.weight.weight === weight &&
        item.weight.unit === unit
    );
    return v;
  };
  const getFlavourHandler = (e) => {
    if (e.target.value !== "") {
      setFlavors(e.target.value);
      const price = FindVariants(e.target.value, weight.current.value)[0]
        ?.price;

      setPrice((prev) => ({
        ...prev,
        price: +price,
      }));
    }
  };

  const getWeightHangler = () => {
    const price = FindVariants(flavors, weight.current.value)[0]?.price;

    setPrice((prev) => ({
      ...prev,
      price: +price,
    }));
  };

  const descriptionHandler = () => {
    setActionBtn((prev) => ({
      isDiscription: true,
      isReview: false,
      isSpecification: false,
    }));
  };
  const specificationHandler = () => {
    setActionBtn((prev) => ({
      isDiscription: false,
      isReview: false,
      isSpecification: true,
    }));
  };
  const reviewHandler = () => {
    setActionBtn((prev) => ({
      isDiscription: false,
      isReview: true,
      isSpecification: false,
    }));
  };

  const notify = (option) => {
    if (option.type === "success") {
      toast.success(option.message);
    } else {
      toast.error(option.message);
    }
  };

  /*
  @sendProductDataHandler : takes two parameter type:cart | wishlisht and data (product data)
  Based on type this function save the product data in cart or wishlist state
  */
  const sendProductDataHandler = (type, data) => {
    if (flavors !== "" && weight.current.value) {
      // const selectedWeight = weight.current.value.split(" ")[0];
      // const unit = weight.current.value.split(" ")[1];
      const v = FindVariants(flavors, weight.current.value);

      const productData = { ...data, variants: v };

      if (insertDataIntoCart({ type: type, data: productData })) {
        notify({ type: "success", message: `Item is added in ${type}` });
      } else {
        notify({ type: "error", message: "Quantity can not more than 5" });
      }
    } else {
      notify({ type: "error", message: "Please select flavor and weight" });
    }
  };

  /*
    Rating Calculation
  */
  useEffect(() => {
    const getRating = async (avgRating) => {
      setAverageRating(avgRating);
    };
    if (data.length !== 0) {
      ratingFunction(data._id, getRating);
      setRatingCount(noOfRating);
    }
  }, [data, ratingFunction, ratingCount, noOfRating]);

  return (
    <>
      <section className="Product-section px-8 pt-8 md:px-16 ">
        <div className="product-detail mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 pb-12">
          <div className="product-img-section grid grid-cols-1 gap-4  items-center justify-center">
            <div className="cover-image mx-auto w-full h-full md:w-96 md:h-96 bg-gray-100 ">
              <img
                ref={currentImg}
                className="main-product-img object-scale-down w-full h-full transition-all duration-500"
                id="main-product-img"
                src={urlFor(data.poster).url()}
                alt="product name"
              />
            </div>
            <motion.div
              ref={carousel}
              className="product-images relative  overflow-hidden"
            >
              {/* Carousel button */}
              <button
                onClick={prevBtn}
                className={` ${
                  productImages.length > 4 ? "" : "hidden"
                } absolute left-0 top-1/2 w-6 h-6 rounded-full z-30 bg-slate-200 bg-opacity-40 backdrop-blur-sm -translate-y-1/2 `}
              >
                <IoArrowBack className="w-full h-full text-black" />
              </button>
              <button
                onClick={nextBtn}
                className={`${productImages.length > 4 ? "" : "hidden"}
              absolute right-0 top-1/2 w-6 h-6 rounded-full z-30 bg-slate-200 bg-opacity-40 backdrop-blur-sm -translate-y-1/2  `}
              >
                <IoArrowForward className="w-full h-full text-black" />
              </button>
              {/* Carousel button end */}
              <motion.ul
                style={{ transform: `translateX(${width}px)` }}
                className="flex items-start justify-center gap-4 transition-all duration-300 ease-in-out "
              >
                {productImages.map((imgList, index) => (
                  <li key={index} className="">
                    <div
                      className={`first-letter:small-product-img w-20 h-20  lg:h-20 border-4 ${
                        activeImg === index ? "border-red-600" : ""
                      }  transition-all duration-100 cursor-pointer`}
                    >
                      <img
                        data-index={index}
                        onClick={currentImgHandler}
                        className="object-cover w-full h-full"
                        src={urlFor(imgList).url()}
                        alt="product "
                      />
                    </div>
                  </li>
                ))}
              </motion.ul>
            </motion.div>
          </div>
          <div className="product-details-section flex flex-col gap-2 md:gap-4 lg-gap-8">
            <div className="product-heading">
              <h1 className="uppercase font-semibold text-xl sm:text-3xl md:text-3xl lg:text-4xl">
                {data.name}
              </h1>
              <p className="py-2 text-light-gray text-xs sm:text-sm lg:text-base">
                <span>Brand:</span> {data.brand}
              </p>
            </div>
            <div className="product-ratings flex items-center gap-2">
              <ul className="flex items-center">
                {[1, 2, 3, 4, 5].map((el, index) =>
                  el <= averageRating ? (
                    <li key={index}>
                      <IoStar
                        className="text-yellow-500 w-4 h-4 lg:w-5 lg:h-5"
                        name="star"
                      ></IoStar>
                    </li>
                  ) : (
                    <li key={index}>
                      <IoStarOutline
                        className="text-yellow-500 w-4 h-4 lg:w-5 lg:h-5"
                        name="star-outline"
                      ></IoStarOutline>
                    </li>
                  )
                )}
              </ul>
              <p className="text-xs lg:text-sm">
                <a href="/">{`(${ratingCount} reviews)`}</a>
              </p>
            </div>
            <div className="product-price flex items-end gap-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">
                {new Intl.NumberFormat("eng-In", {
                  style: "currency",
                  currency: "INR",
                }).format(price.price)}
              </h1>
              <p className="text-gray-500 font-bold text-base sm:text-xl md:text-2xl">
                <del>
                  {new Intl.NumberFormat("eng-In", {
                    style: "currency",
                    currency: "INR",
                  }).format(price.markedprice)}
                </del>
              </p>
            </div>
            <div className="product-short-description mt-2 lg:mt-8">
              <p className="text-sm sm:text-base lg:text-sm text-light-gray">
                {data.description
                  ? `${data.description.substr(0, 300)}.....`
                  : "No description Available"}
              </p>
            </div>
            <div className="product-action-section flex flex-row gap-4 mt-4">
              <div className="cart-action-section flex items-center gap-4">
                <Button
                  OnClick={() => {
                    sendProductDataHandler("cart", data);
                  }}
                  class="p-2 border-2 border-black rounded-full flex items-center justify-center"
                >
                  <IoCartOutline
                    className="w-6 h-6"
                    name="cart-outline"
                  ></IoCartOutline>
                </Button>
                <Button
                  OnClick={() => {
                    sendProductDataHandler("wishlist", data);
                  }}
                  class="p-2 border-2 border-black rounded-full flex items-center justify-center"
                >
                  <IoHeartOutline
                    className="w-6 h-6"
                    title="Wishlist"
                    name="heart-outline"
                  ></IoHeartOutline>
                </Button>
              </div>
            </div>

            <div className="product-other-details mt-4">
              <ul className="flex flex-col gap-3">
                <li>
                  <span className="text-sm font-bold">Availability : </span>
                  <span className="text-sm text-light-gray">
                    {data.quantity > 0 ? "In stock" : "Not available"}
                  </span>
                </li>
                <li>
                  <span className="text-sm font-bold">
                    Available flavors :{" "}
                  </span>
                  <span className="text-sm text-light-gray">
                    <select
                      onChange={getFlavourHandler}
                      className="focus:outline-none py-1 px-3"
                      name="flavors"
                      id="flavors"
                    >
                      <option value="">select</option>
                      {flavorsData
                        ? flavorsData.map((item, index) => (
                            <option
                              key={index}
                              className="py-2 hover:bg-gray-000"
                              defaultValue={item}
                            >
                              {item}
                            </option>
                          ))
                        : ""}
                    </select>
                  </span>
                </li>
                <li>
                  <span className="text-sm font-bold">
                    Available Weights :{" "}
                  </span>
                  <span className="text-sm text-light-gray">
                    <select
                      ref={weight}
                      onChange={getWeightHangler}
                      className="focus:outline-none py-1 px-3"
                      name="weights"
                      id="weights"
                    >
                      {data.variants
                        ? data.variants.map(
                            (item, index) =>
                              flavors &&
                              item.flavor === flavors && (
                                <option
                                  key={index}
                                  className="py-2 hover:bg-gray-000"
                                  defaultValue={`${item.weight.weight} ${item.weight.unit}`}
                                >
                                  {item.weight.weight} {item.weight.unit}
                                </option>
                              )
                          )
                        : ""}
                    </select>
                  </span>
                </li>
                <li>
                  <span className="text-sm font-bold">shipping : </span>
                  <span className="text-sm text-light-gray">
                    {" "}
                    Free shipping
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* Review */}
      <section className="product-specification py-4 px-8 md:px-16">
        <div className="product-specification-menu flex justify-center items-center bg-red-100 py-2">
          <button
            onClick={descriptionHandler}
            className={`px-4 py-2 text-sm ${
              actionBtn.isDiscription ? "bg-red-200" : "bg-red-100"
            } `}
          >
            Description
          </button>
          <button
            onClick={specificationHandler}
            className={`px-4 py-2 text-sm ${
              actionBtn.isSpecification ? "bg-red-200" : "bg-red-100"
            } `}
          >
            Specification
          </button>
          <button
            onClick={reviewHandler}
            className={`px-4 py-2 text-sm ${
              actionBtn.isReview ? "bg-red-200" : "bg-red-100"
            } `}
          >
            Reviews
          </button>
        </div>
        <div
          className={`description py-6 ${
            actionBtn.isDiscription ? "" : "hidden"
          } `}
        >
          <p className="text-sm">
            {data.description ? data.description : "No description"}
          </p>
        </div>
        <div
          className={`specification py-6 ${
            actionBtn.isSpecification ? "" : "hidden"
          }`}
        >
          {data.specification ? (
            <PortableText content={data.specification} />
          ) : (
            "No specification Available for this product"
          )}
        </div>

        {/* Reviews section */}
        <Reviews actionBtn={actionBtn} data={data} />
      </section>
      <ToastContainer />
    </>
  );
};

export default ProductDetails;
