import React from "react";
import { IoSearchOutline, IoCloseOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { Button, OverLay } from "../UiComponents";

const SearchBar = (props) => {
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
        className={`mx-4 fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-[9999]  sm:mx-auto mt-12 h-96  w-full max-w-md shadow-lg bg-white py-8 px-4 sm:px-6 flex flex-col gap-8 ${
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
            type="Search "
            className="block text-lg flex-grow bg-transparent focus:outline-none  text-black"
            placeholder="Search product..."
          />
        </div>
        <div className="overflow-y-scroll">
          <ul className="text-gray-600 text-sm">
            <li className="py-2 text-xl font-bold text-center ">
              No data Available
            </li>
          </ul>
          <ul className="text-gray-600 text-sm">
            <li className="py-2 hover:text-black">Onn Whey Protien</li>
            <li className="py-2 hover:text-black">Onn Whey Protien</li>
            <li className="py-2 hover:text-black">Onn Whey Protien</li>
            <li className="py-2 hover:text-black">Onn Whey Protien</li>
            <li className="py-2 hover:text-black">Onn Whey Protien</li>
            <li className="py-2 hover:text-black">Onn Whey Protien</li>
          </ul>
        </div>
      </motion.div>
    </>
  );
};

export default SearchBar;
