import React from "react";
import { TotalCard, CartCard } from "../UI/UiComponents";
import { useSelector } from "react-redux";
import { images } from "../../assets";
const Cart = () => {
  const { totalItems, cart } = useSelector((state) => state.cart);

  const NoData = () => {
    return (
      <section className="Cart-section py-4 px-8 md:px-16 my-4">
        <div className="relative flex  flex-col items-center justify-center">
          <h1 className=" absolute top-12 text-sm md:text-xl lg:text-4xl font-bold text-gray-500">
            Cart is empty
          </h1>
          <img className=" w-full" src={images.error} alt="error" />
        </div>
      </section>
    );
  };

  return (
    <>
      {totalItems > 0 ? (
        <section className="Cart-section py-4 px-8 md:px-16 my-12 grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-12">
          <div className="carts flex flex-col gap-12 lg:col-span-3">
            {/* <!-- cart 1 --> */}
            {cart.map((item, index) => (
              <CartCard key={index} data={item} />
            ))}
            {/* <!-- cart-2 --> */}
          </div>
          <TotalCard
            data={cart}
            label={"Order"}
            btnlabel={"Proceed to checkout"}
          />
        </section>
      ) : (
        <NoData />
      )}
    </>
  );
};

export default Cart;
