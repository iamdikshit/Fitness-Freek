import React from "react";
import { images } from "../../../assets";
import { motion } from "framer-motion";
import {
  SlideAnimateFromLeft,
  SlideAnimateFromRight,
} from "../UiComponents/MotionAnimate";
const Diet = () => {
  return (
    <section className="diet-section px-8 md:px-16 my-24 bg-red-100 overflow-x-hidden">
      <div className="container mx-auto grid grid-cols-1 items-center mb-6">
        <div className="diet-heading-section mt-6">
          <h1 className="text-2xl md:text-3xl py-2 link-bottem-line font-semibold uppercase">
            Diet Plans
          </h1>
        </div>
      </div>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div className="diets order-last sm:order-first mx-auto">
          <motion.img
            initial={SlideAnimateFromLeft.hidden}
            whileInView={SlideAnimateFromLeft.visible}
            transition={SlideAnimateFromLeft.transition}
            className="w-full"
            src={images.hero2}
            alt="diet name"
          />
        </motion.div>
        <motion.div
          initial={SlideAnimateFromRight.hidden}
          whileInView={SlideAnimateFromRight.visible}
          transition={SlideAnimateFromRight.transition}
          className="diet p-4 flex flex-col gap-3 justify-center items-center"
        >
          <h1 className="text-xl md:text-2xl lg:text-4xl font-bold text-red-700">
            Get your Diet Plans!
          </h1>
          <p className="text-sm md:text-base">Consultant with out expert</p>
          <a
            href="/"
            className="mt-6 px-2 md:px-4 py-1 cursor-pointer bg-black text-white border-black border-2 hover:border-2 hover:bg-red-100 hover:text-black transition duration-300 ease-in-out"
          >
            Get your diet plan
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Diet;
