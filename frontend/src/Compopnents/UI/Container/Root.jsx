import React from "react";
import { Outlet } from "react-router-dom";
import { OfferAlert } from "../UiComponents";
import Footer from "./Footer";
import Header from "./Header";
const Root = () => {
  return (
    <>
      <main className="w-full">
        <OfferAlert message={"50% off on Muscle Blaze Whey Protein"} />
        <Header />
        <section>
          <Outlet />
        </section>
        <Footer />
      </main>
    </>
  );
};

export default Root;
