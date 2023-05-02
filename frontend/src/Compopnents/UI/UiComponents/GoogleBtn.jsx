import React from "react";
import { IoLogoGoogle } from "react-icons/io5";
const GoogleBtn = (props) => {
  return (
    <button
      onClick={() => props.OnClick()}
      className="  px-6
               
                py-2
                leading-tight
                rounded-full
                shadow-md
                bg-gradient-to-r from-red-400 to-red-600
                hover:bg-gradient-to-r
                hover:from-red-600
                hover:to-red-800
                transition
                duration-300
                ease-in-out     
                
                flex items-center gap-2
                "
    >
      <IoLogoGoogle className="text-white" />
      <span className="text-sm text-white">Log In</span>
    </button>
  );
};

export default GoogleBtn;
