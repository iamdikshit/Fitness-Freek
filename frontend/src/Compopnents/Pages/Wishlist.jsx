import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { CartCard, TotalCard } from "../UI/UiComponents";
import { NoData } from "../UI/Container";
import { addMultipleItems } from "../Store/CartSlice";
import { addMultipleItems as addMultipleItemsWishlist } from "../Store/WishlistSlice";
const Wishlist = () => {
  const dispatch = useDispatch();
  const { totalItems, wishlist } = useSelector((state) => state.wishlist);

  const addToCart = () => {
    dispatch(addMultipleItems(wishlist));
    dispatch(addMultipleItemsWishlist([]));
  };

  return (
    <>
      {totalItems > 0 ? (
        <section className="Cart-section py-4 px-8 md:px-16 my-12 grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-12">
          <div className="carts flex flex-col gap-12 lg:col-span-3">
            {/* <!-- cart 1 --> */}
            {wishlist.map((item, index) => (
              <CartCard key={index} data={item} label={"wishlist"} />
            ))}
            {/* <!-- cart-2 --> */}
          </div>
          <TotalCard
            data={wishlist}
            label={"Order"}
            btnlabel={"Add to Cart"}
            OnClick={addToCart}
          />
        </section>
      ) : (
        <NoData />
      )}
    </>
  );
};

export default Wishlist;
