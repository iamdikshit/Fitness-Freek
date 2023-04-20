import React from "react";
import { images } from "../../../assets";
import { motion } from "framer-motion";
import { SectionAnimate } from "../UiComponents/MotionAnimate";
const Hero = () => {
  return (
    <motion.section
      initial={SectionAnimate.hidden}
      whileInView={SectionAnimate.visible}
      transition={SectionAnimate.transition}
      className="hero-section md:pb-24 bg-white overflow-x-hidden"
    >
      <div className="relative flex flex-col md:flex-row items-center justify-end">
        <div className="py-4 px-8 md:px-16">
          <div className="flex flex-col mt-12 md:mt-24 w-3/4 sm:w-1/2 gap-4 lg:gap-6">
            <h1 className="py-2 font-roboto text-3xl sm:text-4xl lg:text-6xl font-bold relative after:h-[4px] after:w-[30%] after:bg-red-700 after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-300 after:ease-in-out">
              Eat well, Feel well
            </h1>
            <p className="text-sm md:text-lg">
              We provide the right diet plan and the right sports supplements
              all over India, So that India remains healthy and wealthy, Because
              we believe that health is wealth.
            </p>
          </div>

          <a
            href="/"
            className="mt-6 px-2 md:px-4 inline-block py-1 cursor-pointer bg-black text-white border-black border-2 hover:border-2 hover:bg-white hover:text-black transition duration-300 ease-in-out"
          >
            Explore
          </a>
        </div>
        <div className="md:absolute -bottom-24 -right-24 md:-right-32 lg:-right-6 xl:right-0">
          <img className="w-full" src={images.hero} alt="Muscular Man" />
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;
