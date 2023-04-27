import React from "react";
import { images } from "../../../assets";
const NoData = () => {
  return (
    <section className="Cart-section py-4 px-8 md:px-16 my-4">
      <div className="relative flex  flex-col items-center justify-center">
        <h1 className=" absolute top-12 text-sm md:text-xl lg:text-4xl font-bold text-gray-500">
          Cart is empty
        </h1>
        <img className=" w-full" src={images.error} alt="error" />
      </div>
    </section>
  );
};

export default NoData;
