import React, { useState } from "react";

import { IoCloseSharp } from "react-icons/io5";
const OfferAlert = (props) => {
  const [alertActive, setAlertActive] = useState(true);

  const togglerAlertState = () => {
    setAlertActive((prev) => !prev);
  };
  return (
    <div
      className={` ${
        alertActive ? "" : "hidden"
      } offer-message-section mx-auto relative`}
    >
      <div className="h-16 bg-yellow-200 flex justify-center items-center px-4 py-2 sm:p-2">
        <div className="text-xs sm:text-sm md:text-lg flex justify-center items-center gap-1">
          <p className="text-center">
            <span className="font-bold">Sale🎉</span>
            {props.message}
          </p>
        </div>
      </div>
      <button
        onClick={togglerAlertState}
        className="offer-msg-btn font-bold bg-transparent sm:text-sm md:text-lg absolute top-0 right-2 sm:top-2 sm:right-4"
      >
        <IoCloseSharp
          className="w-4 h-4 md:w-6 md:h-6 text-yellow-700"
          name="close-outline"
        ></IoCloseSharp>
      </button>
    </div>
  );
};

export default OfferAlert;
