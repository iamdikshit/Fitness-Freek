import React, { useState, useEffect } from "react";
import { IoSearchOutline, IoCloseOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { Button, OverLay } from "../UiComponents";
import { client } from "../../SanityConfig/client";
import { Link } from "react-router-dom";
import SearchLoading from "./SearchLoading";
const SearchBar = (props) => {
  const [searchInput, setSearchInput] = useState("");
  const [noData, setNoData] = useState();
  const [searchProducts, setSearchProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchInputHadler = (e) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    const getData = async () => {
      if (searchInput !== "") {
        setIsLoading(true);
        const query = `*[_type == "product" && name match "${searchInput}*" || category=="${searchInput}*"]`;
        const searchProduct = await client.fetch(query);
        setIsLoading(false);
        if (searchProduct.length <= 0) {
          setNoData(true);
        } else {
          setNoData(false);
          console.log(searchProduct);
          setSearchProducts((prev) => [...searchProduct]);
        }
      } else {
        setSearchProducts([]);
        setNoData(false);
      }
    };

    const timeOutId = setTimeout(getData, 1000);

    // getData();
    return () => {
      clearTimeout(timeOutId);
    };
  }, [searchInput]);

  const ClearInput = () => {
    setSearchInput("");
    props.OnClick();
  };
  return (
    <>
      <OverLay active={props.searchActive} OnClick={props.OnClick} />
      <motion.div
        initial={{
          opacity: 0,
        }}
        whileInView={{
          opacity: 1,
        }}
        transition={{
          duration: 0.2,
          ease: "easeInOut",
        }}
        className={`mx-auto   fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-[50]  sm:mx-auto mt-12 h-96 w-full   max-w-sm sm:max-w-md shadow-lg bg-white py-8 px-4 sm:px-6 flex flex-col gap-8 ${
          props.searchActive ? "" : "hidden"
        }`}
      >
        {/* close button */}
        <Button
          OnClick={props.OnClick}
          class="absolute top-1 right-1 bg-transaprent cursor-pointer"
        >
          <IoCloseOutline
            className={`w-6 h-6 sm:w-8 sm:h-8  text-gray-700 hover:text-gray-900 `}
            id="close"
            name="close"
          ></IoCloseOutline>
        </Button>
        {/* close button end */}
        <div className="flex mt-8 gap-2 border border-gray-300 p-2 rounded-full">
          <button className="">
            <IoSearchOutline className="w-4 h-4 border-gray-300" />
          </button>
          <input
            onChange={searchInputHadler}
            type="text"
            value={searchInput}
            className="block text-lg flex-grow bg-transparent focus:outline-none  text-black"
            placeholder="Search product..."
          />
        </div>
        <div className="overflow-y-scroll">
          {!isLoading && searchInput.length > 0 && noData && (
            <div className=" z-[99999] overflow-y-scroll w-full max-w-lg max-h-48 bg-white top-12  -left-0 rounded-md bg-opacity-70 backdrop-blur-sm p-2 ">
              <ul>
                <li className="p-2 text-center text-black cursor-pointer">
                  No product found
                </li>
              </ul>
            </div>
          )}
          {searchProducts.length > 0 && (
            <div className=" z-[99999] overflow-y-scroll w-full max-w-lg max-h-48 bg-white top-12  -left-0 rounded-md bg-opacity-70 backdrop-blur-sm  p-2 ">
              <ul>
                {isLoading && <SearchLoading />}

                {!isLoading &&
                  searchProducts.length > 0 &&
                  searchProducts.map((m, index) => (
                    <Link
                      key={index}
                      onClick={ClearInput}
                      to={`/product/${m.slug.current}`}
                    >
                      <li
                        className={`p-2 ${
                          searchProducts.length <= 1
                            ? ""
                            : "border-b border-b-gray-500"
                        }  text-black  hover:text-blue-500 cursor-pointer     last:border-none`}
                      >
                        {m.name}
                      </li>
                    </Link>
                  ))}
              </ul>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default SearchBar;
