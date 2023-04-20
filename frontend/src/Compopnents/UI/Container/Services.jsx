import React from "react";
import {
  IoCarSportSharp,
  IoCallSharp,
  IoCard,
  IoRestaurantSharp,
} from "react-icons/io5";

import { SectionAnimate } from "../UiComponents/MotionAnimate";
import { motion } from "framer-motion";
const Services = () => {
  return (
    <motion.section
      initial={SectionAnimate.hidden}
      whileInView={SectionAnimate.visible}
      transition={SectionAnimate.transition}
      className="service-section py-4 px-8 md:px-16 my-24 flex-wrap"
    >
      <div className="container mx-auto grid grid-cols-1 items-center mb-6">
        <div className="service-heading-section">
          <h1 className="text-2xl md:text-3xl py-2 link-bottem-line font-semibold uppercase">
            We always with you
          </h1>
        </div>
      </div>
      <div className="container mx-auto flex items-center justify-between gap-8 flex-wrap mt-10">
        <div className="services flex items-center gap-2">
          <span className="Icon">
            <IoCarSportSharp
              className="w-12 h-12 text-red-700"
              name="car-sport"
            ></IoCarSportSharp>
          </span>
          <div className="service-detail">
            <h1 className="font-bold text-black text-base sm:text-lg">
              Free Shipping
            </h1>
            <p className="text-light-gray text-xs sm:text-base">
              For all oder over ₹2000
            </p>
          </div>
        </div>
        <div className="services flex items-center gap-2">
          <span className="Icon">
            <IoCallSharp
              className="w-12 h-12 text-red-700"
              name="nuclear"
            ></IoCallSharp>
          </span>
          <div className="service-detail">
            <h1 className="font-bold text-black text-base sm:text-lg">
              Online Support 24/7
            </h1>
            <p className="text-light-gray text-xs sm:text-base">
              Dedicated support
            </p>
          </div>
        </div>
        <div className="services flex items-center gap-2">
          <span className="Icon">
            <IoCard className="w-12 h-12 text-red-700" name="card"></IoCard>
          </span>
          <div className="service-detail">
            <h1 className="font-bold text-black text-base sm:text-lg">
              Payment Secure
            </h1>
            <p className="text-light-gray text-xs sm:text-base">
              100% secure payment
            </p>
          </div>
        </div>
        <div className="services flex items-center gap-2">
          <span className="Icon">
            <IoRestaurantSharp
              className="w-12 h-12 text-red-700"
              name="restaurant"
            ></IoRestaurantSharp>
          </span>
          <div className="service-detail">
            <h1 className="font-bold text-black text-base sm:text-lg">
              Diet Plan
            </h1>
            <p className="text-light-gray text-xs sm:text-base">
              We provide complete diet plan
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Services;
