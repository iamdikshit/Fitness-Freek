import React from "react";
import { SectionAnimate } from "../UI/UiComponents/MotionAnimate";
import { motion } from "framer-motion";

const About = () => {
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
            About us
          </h1>
        </div>
      </div>
      <div className="container mx-auto  mt-10">
        <p>
          Welcome to our demo ecommerce website! We are an ecommerce store
          specializing in the sale of high-quality protein and supplements to
          help you achieve your health and fitness goals. Our mission is to
          provide our customers with the best possible products and customer
          service, ensuring that you have everything you need to reach your
          fitness goals. We understand that achieving a healthy lifestyle can be
          challenging, which is why we are dedicated to providing you with the
          support and resources you need to succeed. At our online store, you
          will find a wide selection of protein and supplements from some of the
          most trusted brands in the industry. We are committed to ensuring that
          all of our products are of the highest quality, so you can feel
          confident in the supplements you purchase from us. We believe that
          customer satisfaction is the cornerstone of our business, which is why
          we go above and beyond to ensure that our customers are happy with
          their purchases. Our team of dedicated professionals is always
          available to answer any questions you may have and provide you with
          the guidance you need to choose the best products for your specific
          needs. At our ecommerce store, we are more than just a seller of
          supplements – we are a community of individuals who are passionate
          about living healthy, active lives. We are dedicated to helping you
          achieve your goals, whether you are looking to build muscle, lose
          weight, or simply maintain a healthy lifestyle. Thank you for visiting
          our website, and we look forward to being a part of your journey
          towards a healthier, happier you.
        </p>
      </div>
    </motion.section>
  );
};

export default About;
