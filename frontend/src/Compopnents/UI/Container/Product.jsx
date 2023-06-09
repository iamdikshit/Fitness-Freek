import React from "react";
import { Card } from "../UiComponents";
import { SectionAnimate } from "../UiComponents/MotionAnimate";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Product = (props) => {
  /*
    Notification function
  */
  const notify = (option) => {
    if (option.type === "success") {
      toast.success(option.message);
    } else {
      toast.error(option.message);
    }
  };

  return (
    <>
      <motion.section
        initial={SectionAnimate.hidden}
        whileInView={SectionAnimate.visible}
        transition={SectionAnimate.transition}
        className="product-section mx-auto py-4 px-8 md:px-16 bg-red-100"
      >
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 items-center mb-6">
          <div className="product-heading-section">
            <h1 className="text-2xl md:text-3xl py-2 link-bottem-line font-semibold uppercase">
              {props.title}
            </h1>
          </div>
          {/* <div className="product-heading-section mt-4 py-2 lg:mt-0 lg:py-0">
            <ul className="flex gap-3 lg:justify-end uppercase">
              <li>
                <a className="py-2 link-after-effect text-xs" href="/">
                  All
                </a>
              </li>
              <li>
                <a className="py-2 link-after-effect text-xs" href="/">
                  Whey Protein
                </a>
              </li>
              <li>
                <a className="py-2 link-after-effect text-xs" href="/">
                  Accessories
                </a>
              </li>
              <li>
                <a className="py-2 link-after-effect text-xs" href="/">
                  Pre Workout
                </a>
              </li>
            </ul>
          </div> */}
        </div>

        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pt-8">
          {/* Product cards comes here */}
          {props.products.map((d, index) => (
            <Card key={index} data={d} notify={notify} />
          ))}
        </div>

        <div className="product-navigation mx-auto flex items-center justify-center py-8">
          <Link
            className="link-after-effect uppercase flex items-center py-2 justify-center gap-2"
            to={"product"}
          >
            <span>View All</span>
            <span>
              <ion-icon className="text-sm" name="arrow-forward"></ion-icon>
            </span>
          </Link>
        </div>
      </motion.section>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default Product;
