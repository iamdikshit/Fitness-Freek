import React from "react";
import { images } from "../../../assets";
import { SectionAnimate } from "../UiComponents/MotionAnimate";
import { motion } from "framer-motion";
const Brand = () => {
  return (
    <motion.section
      initial={SectionAnimate.hidden}
      whileInView={SectionAnimate.visible}
      transition={SectionAnimate.transition}
      className="brand-section py-4 px-8 md:px-16 my-24"
    >
      <div className="container mx-auto grid grid-cols-1 items-center mb-6">
        <div className="brand-heading-section">
          <h1 className="text-2xl md:text-3xl py-2 link-bottem-line font-semibold uppercase">
            Brands
          </h1>
        </div>
      </div>
      <div className="container mx-auto flex items-center justify-between gap-2 flex-wrap mt-10">
        <div className="brands">
          <img className="h-12" src={images.scitron} alt="brand name" />
        </div>
        <div className="brands">
          <img className="h-12" src={images.muscle} alt="brand name" />
        </div>
        <div className="brands">
          <img className="h-12" src={images.myprotien} alt="brand name" />
        </div>
        <div className="brands">
          <img className="h-12" src={images.gnc} alt="brand name" />
        </div>
      </div>
    </motion.section>
  );
};

export default Brand;
