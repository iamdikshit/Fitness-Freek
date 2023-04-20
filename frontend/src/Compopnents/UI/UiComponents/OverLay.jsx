import React from "react";
import { motion } from "framer-motion";
const OverLay = (props) => {
  return (
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
      onClick={props.OnClick}
      className={`over-lay  fixed top-0 left-0 bg-black w-full h-screen bg-opacity-10 backdrop-blur-sm
    z-20 ${props.active ? "" : "hidden"}
  `}
    ></motion.div>
  );
};

export default OverLay;
