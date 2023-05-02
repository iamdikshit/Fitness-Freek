import React from "react";

const SearchLoading = () => {
  return (
    <>
      <li className="p-2 animate-pulse text-white flex flex-col gap-1">
        <div className="bg-[#616166] w-1/2 h-2"></div>
        <div className="bg-[#616166] w-1/3 h-2"></div>
      </li>
      <li className="p-2 animate-pulse text-white flex flex-col gap-1">
        <div className="bg-[#616166] w-1/2 h-2"></div>
        <div className="bg-[#616166] w-1/3 h-2"></div>
      </li>
    </>
  );
};

export default SearchLoading;
