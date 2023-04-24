import React from "react";
import { IoAdd, IoRemove } from "react-icons/io5";

const QuantityButton = (props) => {
  const addButton = () => {
    props.increaseQuantity();
  };
  const removeButton = () => {
    props.decreaseQuantity();
  };

  return (
    <div className="flex items-center justify-center gap-1 ">
      <button
        onClick={removeButton}
        className="bg-white w-6 h-6 md:w-8 md:h-8  flex justify-center  items-center text-black rounded-full border-2 border-black hover:bg-black hover:text-white  "
      >
        <IoRemove className=" w-4 h-4" />
      </button>
      <span className="w-8 h-8 font-bold text-center flex items-center justify-center focus:outline-none  p-0">
        {props.quantity}
      </span>

      <button
        onClick={addButton}
        className="bg-white w-6 h-6 md:w-8 md:h-8  flex justify-center  items-center text-black rounded-full border-2 border-black hover:bg-black hover:text-white "
      >
        <IoAdd className=" w-4 h-4" />
      </button>
    </div>
  );
};

export default QuantityButton;
