import React from "react";
import { TotalCard, CartCard } from "../UI/UiComponents";
import { useSelector } from "react-redux";
import { NoData } from "../UI/Container";
const Cart = () => {
  const { totalItems, cart } = useSelector((state) => state.cart);

  return (
    <>
      {totalItems > 0 ? (
        <section className="Cart-section py-4 px-8 md:px-16 my-12 grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-12">
          <div className="carts flex flex-col gap-12 lg:col-span-3">
            {/* <!-- cart 1 --> */}
            {cart.map((item, index) => (
              <CartCard key={index} data={item} label={"cart"} />
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
