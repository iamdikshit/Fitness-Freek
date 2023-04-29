import React from "react";
const ProductDetailLoading = () => {
  return (
    <div className="loading-section grid grid-cols-1 lg:grid-cols-2 gap-8  px-8 pt-8 md:px-16">
      <div className="left-section overflow-x-hidden flex flex-col justify-center items-center gap-8">
        <div className="main-image  animate-pulse bg-slate-300 w-full lg:w-96 h-96"></div>
        <div className="main-image  animate-pulse ">
          <ul className="flex items-center justify-center gap-6 ">
            <li className="w-20 h-20 bg-slate-300"></li>
            <li className="w-20 h-20 bg-slate-300"></li>
            <li className="w-20 h-20 bg-slate-300"></li>
            <li className="w-20 h-20 bg-slate-300"></li>
          </ul>
        </div>
      </div>
      <div className="right-section animate-pulse flex flex-col gap-3">
        <div className="bg-slate-300 w-3/4 h-10"></div>
        <div className="bg-slate-300 w-1/4 h-5"></div>
        <div className="bg-slate-300 w-1/4 h-5"></div>
        <div className="flex flex-col gap-2 mt-8">
          <div className="bg-slate-300 w-full h-2 "></div>
          <div className="bg-slate-300 w-full h-2 "></div>
          <div className="bg-slate-300 w-3/4 h-2 "></div>
          <div className="bg-slate-300 w-1/4 h-2 "></div>
        </div>
        <div className="flex gap-2 mt-4">
          <div className="bg-slate-300 w-10 h-10 rounded-full "></div>
          <div className="bg-slate-300 w-10 h-10 rounded-full "></div>
        </div>

        <div className="bg-slate-300 w-1/4 h-5 mt-8"></div>
        <div className="bg-slate-300 w-1/4 h-5"></div>
      </div>
    </div>
  );
};

export default ProductDetailLoading;
