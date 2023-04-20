import React from "react";
import { Card } from "../UiComponents";
import { SectionAnimate } from "../UiComponents/MotionAnimate";
import { motion } from "framer-motion";
const Product = () => {
  const data = [
    {
      id: "e1",
      name: "whey protien",
      price: 2300,
    },
    {
      id: "e2",
      name: "whey protien",
      price: 2200,
    },
    {
      id: "e3",
      name: "GNCwhey protien",
      price: 2300,
    },
    {
      id: "e4",
      name: "whey protien",
      price: 2300,
    },
    {
      id: "e5",
      name: "Onn whey protien",
      price: 2400,
    },
    {
      id: "e6",
      name: "Mywhey protien",
      price: 2600,
    },
  ];
  return (
    <motion.section
      initial={SectionAnimate.hidden}
      whileInView={SectionAnimate.visible}
      transition={SectionAnimate.transition}
      className="product-section mx-auto py-4 px-8 md:px-16 bg-red-100"
    >
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 items-center mb-6">
        <div className="product-heading-section">
          <h1 className="text-2xl md:text-3xl py-2 link-bottem-line font-semibold uppercase">
            New Products
          </h1>
        </div>
        <div className="product-heading-section mt-4 py-2 lg:mt-0 lg:py-0">
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
        </div>
      </div>

      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {/* Product cards comes here */}
        {data.map((d) => (
          <Card key={d.id} data={d} />
        ))}
      </div>

      <div className="product-navigation mx-auto flex items-center justify-center py-8">
        <a
          className="link-after-effect uppercase flex items-center py-2 justify-center gap-2"
          href="/"
        >
          <span>View All</span>
          <span>
            <ion-icon className="text-sm" name="arrow-forward"></ion-icon>
          </span>
        </a>
      </div>
    </motion.section>
  );
};

export default Product;
