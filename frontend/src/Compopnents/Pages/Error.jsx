import React from "react";
import { Header, Footer } from "../UI/Container";
import { images } from "../../assets";
const Error = () => {
  return (
    <>
      <Header />
      <section className=" relative error-section mx-auto px-8 md:px-16 flex flex-col items-center gap-8">
        <div className="mt-8 flex flex-col gap-2 md:gap-4 items-center absolute">
          <h1 className="text-2xl md:text-6xl text-gray-300 ">
            Page not found (404)
          </h1>
          <p className="text-sm px-2">
            Something went wrong please try after some time.
          </p>
        </div>
        <div className="w-full h-screen">
          <img
            className="w-full h-full object-cover"
            src={images.error}
            alt="error"
          />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Error;
