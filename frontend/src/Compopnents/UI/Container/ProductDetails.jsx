import React, { useRef, useState, useEffect } from "react";
import { images } from "../../../assets";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { Button } from "../UiComponents";
import {
  IoHeartOutline,
  IoCartOutline,
  IoStar,
  IoStarOutline,
} from "react-icons/io5";
import { urlFor } from "../../SanityConfig/client";
import { motion } from "framer-motion";
const ProductDetails = (props) => {
  const [data] = props.data;
  const carousel = useRef();
  const [width, setWidth] = useState(0);
  const [flavorsData, setFlavorsData] = useState([]);
  const [activeImg, setActiveImg] = useState(0);
  const [weight, setWeight] = useState(null);
  const [flavors, setFlavors] = useState(null);
  const [actionBtn, setActionBtn] = useState({
    isDiscription: true,
    isReview: false,
    isSpecification: false,
  });

  useEffect(() => {
    /*
    This useEffect is used to store the unique flavours 
    */
    let flavorArray = [];
    if (data.variants) {
      for (const item of data.variants) {
        if (!flavorArray.includes(item.flavor)) {
          flavorArray.push(item.flavor);
        }
      }
      setFlavorsData((prev) => [...flavorArray]);
    }
  }, [data.variants]);

  console.log(weight);
  /*
    creating arrays of images
    */
  let productImages = [data.poster];
  data.images.map((img) => productImages.push(img));

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

  const getFlavourHandler = (e) => {
    setFlavors(e.target.value);
  };

  const weightHandler = (e) => {
    setWeight(e.target.value);
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
                <li>
                  <IoStar
                    className="text-yellow-500 w-4 h-4 lg:w-5 lg:h-5"
                    name="star"
                  ></IoStar>
                </li>
                <li>
                  <IoStar
                    className="text-yellow-500 w-4 h-4 lg:w-5 lg:h-5"
                    name="star"
                  ></IoStar>
                </li>
                <li>
                  <IoStar
                    className="text-yellow-500 w-4 h-4 lg:w-5 lg:h-5"
                    name="star"
                  ></IoStar>
                </li>
                <li>
                  <ion-icon
                    className="text-yellow-500 w-4 h-4 lg:w-5 lg:h-5"
                    name="star"
                  ></ion-icon>
                </li>
                <li>
                  <IoStar
                    className="text-yellow-500 w-4 h-4 lg:w-5 lg:h-5"
                    name="star-half"
                  ></IoStar>
                </li>
                <li>
                  <IoStarOutline
                    className="text-yellow-500 w-4 h-4 lg:w-5 lg:h-5"
                    name="star-outline"
                  ></IoStarOutline>
                </li>
              </ul>
              <p className="text-xs lg:text-sm">
                <a href="/">( 132 reviews )</a>
              </p>
            </div>
            <div className="product-price flex items-end gap-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">
                {new Intl.NumberFormat("eng-In", {
                  style: "currency",
                  currency: "INR",
                }).format(data.price.price)}
              </h1>
              <p className="text-gray-500 font-bold text-base sm:text-xl md:text-2xl">
                <del>
                  {new Intl.NumberFormat("eng-In", {
                    style: "currency",
                    currency: "INR",
                  }).format(data.price.markedprice)}
                </del>
              </p>
            </div>
            <div className="product-short-description mt-2 lg:mt-8">
              <p className="text-sm sm:text-base lg:text-sm text-light-gray">
                {data.description}
              </p>
            </div>
            <div className="product-action-section flex flex-row gap-4 mt-4">
              <div className="quantity hidden  items-center gap-3">
                <span className="text-base font-bold">Quantity:</span>
                <div className="quantity-btn flex flex-row rounded-lg relative bg-transparent mt-1">
                  <button
                    data-action="decrement"
                    className="bg-red-200 px-4 py-2 rounded-l-full relative after:w-[1px] after:h-6 after:absolute after:bg-red-100 after:right-0 after:top-3"
                  >
                    <span className="m-auto text-2xl font-thin">−</span>
                  </button>
                  <input
                    type="number"
                    className="focus:outline-none w-10 bg-red-200 text-center cursor-pointer appearance-none"
                    name="custom-input-number
                  "
                    min="0"
                  />
                  <button
                    data-action="increment"
                    className="bg-red-200 py-2 px-4 rounded-r-full relative after:w-[1px] after:h-6 after:absolute after:bg-red-100 after:left-0 after:top-3"
                  >
                    <span className="m-auto text-2xl font-thin">+</span>
                  </button>
                </div>
              </div>
              <div className="cart-action-section flex items-center gap-4">
                <Button class="p-2 border-2 border-black rounded-full flex items-center justify-center">
                  <IoCartOutline
                    className="w-6 h-6"
                    name="cart-outline"
                  ></IoCartOutline>
                </Button>
                <Button class="p-2 border-2 border-black rounded-full flex items-center justify-center">
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
                              value={item}
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
                      onChange={weightHandler}
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
                                  value="Chocolate"
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
            nesciunt quaerat voluptate, nisi voluptates iste ipsam dolorem
            veritatis voluptatibus voluptas, molestias ut. Fuga doloribus, error
            quae ab quo at culpa. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Magni nesciunt quaerat voluptate, nisi voluptates
            iste ipsam dolorem veritatis voluptatibus voluptas, molestias ut.
            Fuga doloribus, error quae ab quo at culpa.
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
            nesciunt quaerat voluptate, nisi voluptates iste ipsam dolorem
            veritatis voluptatibus voluptas, molestias ut. Fuga doloribus, error
            quae ab quo at culpa.
          </p>
        </div>
        <div
          className={`specification py-6 ${
            actionBtn.isSpecification ? "" : "hidden"
          }`}
        >
          <table className="table-auto">
            <tbody>
              <tr className="border-b border-b-gray-500">
                <td className="p-2 text-sm border-r border-l border-l-gray-500 border-r-gray-500">
                  The Sliding Mr. Bones
                </td>
                <td className="p-2 text-sm border-r border-r-gray-500">
                  Malcolm Lockyer
                </td>
              </tr>
              <tr className="border-b border-b-gray-500">
                <td className="p-2 text-sm border-r border-r-gray-500 border-l border-l-gray-500">
                  Witchy Woman
                </td>
                <td className="p-2 text-sm border-r border-r-gray-500">
                  The Eagles
                </td>
              </tr>
              <tr className="border-b border-b-gray-500">
                <td className="p-2 text-sm border-r border-r-gray-500 border-l border-l-gray-500">
                  Shining Star
                </td>
                <td className="p-2 text-sm border-r border-r-gray-500">
                  Earth, Wind, and Fire
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={`Reviews py-6 ${actionBtn.isReview ? "" : "hidden"} `}>
          {/* <!-- review 3 --> */}
          <div className="review border-b border-b-gray-500 flex flex-col gap-4 py-4 mt-4">
            <div className="review-header flex gap-4">
              <img
                className="w-8 h-8 rounded-full"
                src={images.user}
                alt="user "
              />
              <div className="user-detail">
                <h1 className="text-sm font-bold">
                  Ashutosh Sharma
                  <span className="text-xs font-normal text-gray-500">
                    13h ago
                  </span>
                </h1>
                <ul className="flex items-center">
                  <li>
                    <IoStar
                      className="text-yellow-700 w-4 h-4"
                      name="star"
                    ></IoStar>
                  </li>
                  <li>
                    <IoStar
                      className="text-yellow-700 w-4 h-4"
                      name="star"
                    ></IoStar>
                  </li>
                  <li>
                    <IoStar
                      className="text-yellow-700 w-4 h-4"
                      name="star"
                    ></IoStar>
                  </li>
                  <li>
                    <IoStar
                      className="text-yellow-700 w-4 h-4"
                      name="star-half"
                    ></IoStar>
                  </li>
                  <li>
                    <IoStar
                      className="text-yellow-700 w-4 h-4"
                      name="star-outline"
                    ></IoStar>
                  </li>
                </ul>
              </div>
            </div>
            <div className="description">
              <p className="text-sm">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Laborum ex officia, aperiam suscipit maxime illo laudantium
                autem ut cumque quam, at sequi! Suscipit nobis ipsa tempora
                explicabo, eum porro id.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
