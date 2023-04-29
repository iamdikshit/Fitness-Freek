import React from "react";
import { IoTrashOutline } from "react-icons/io5";
import { urlFor } from "../../SanityConfig/client";
import QuantityButton from "./QuantityButton";
import useCartAction from "../../Hooks/useCartAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "./Button";
const CartCard = (props) => {
  const { insertDataIntoCart, removeDataFromCart, removeItemFromCart } =
    useCartAction();

  const variants = props.data.variants[0];
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
  const increaseQuantity = () => {
    if (!insertDataIntoCart({ type: props.label, data: props.data })) {
      notify({ type: "error", message: "Quantity can not more than 5" });
    }
  };

  const decreaseQuantity = () => {
    removeDataFromCart({ type: props.label, data: props.data });
  };
  const removeItemCart = () => {
    removeItemFromCart({ type: props.label, data: props.data });
  };

  return (
    <>
      <div className="cart-card flex gap-2 md:gap-4 mt-2">
        <div className="section-one flex-shrink-0">
          <div className="product-img md:col-span-2">
            <a href="/">
              <img
                className="h-24 md:h-28"
                src={urlFor(props.data.poster).url()}
                alt="product "
              />
            </a>
          </div>
        </div>
        <div className="section-two relative h-24 flex-grow pr-4">
          <div className="flex flex-col justify-between">
            <div className="product-detail">
              <h1 className="text-sm lg:text-lg font-bold">
                {`${props.data.name}`}
              </h1>
              <p className="text-xs ">
                {`${variants.weight.weight} ${variants.weight.unit} ${variants.flavor} flavor`}
              </p>

              <ul className="flex items-center">
                <li>
                  <ion-icon
                    className="text-yellow-700 w-2 h-4 md:w-4 md:h-4"
                    name="star"
                  ></ion-icon>
                </li>
                <li>
                  <ion-icon
                    className="text-yellow-700 w-2 h-4 md:w-4 md:h-4"
                    name="star"
                  ></ion-icon>
                </li>
                <li>
                  <ion-icon
                    className="text-yellow-700 w-2 h-4 md:w-4 md:h-4"
                    name="star"
                  ></ion-icon>
                </li>
                <li>
                  <ion-icon
                    className="text-yellow-700 w-2 h-4 md:w-4 md:h-4"
                    name="star-half"
                  ></ion-icon>
                </li>
                <li>
                  <ion-icon
                    className="text-yellow-700 w-2 h-4 md:w-4 md:h-4"
                    name="star-outline"
                  ></ion-icon>
                </li>
              </ul>
              <p className="text-xs md:text-sm">In stock</p>
            </div>
            <div className="product-price-quantity relative">
              <div className="price text-lg font-bold text-slate-900">
                <span className="">₹{props.data.variants[0].price}</span>
              </div>

              <div className="quantity absolute top-0 right-0 flex items-center justify-center gap-4">
                <span className="text-sm hidden md:block font-bold">
                  Qty :{" "}
                </span>
                <span className="text-sm text-black">
                  <QuantityButton
                    increaseQuantity={increaseQuantity}
                    decreaseQuantity={decreaseQuantity}
                    quantity={props.data.quantity}
                  />
                  {/* <select
                  className="focus:outline-none py-1 px-3"
                  name="quantity"
                  id="quantity"
                >
                  <option className="py-2" value="1">
                    1
                  </option>
                  <option className="py-2" value="2">
                    2
                  </option>
                  <option className="py-2" value="3">
                    3
                  </option>
                  <option selected className="py-2" value="4">
                    4
                  </option>
                </select> */}
                </span>
              </div>
            </div>
          </div>
          <div className="remove absolute top-0 right-0">
            <Button OnClick={removeItemCart}>
              <IoTrashOutline
                className="p-1 bg-gray-100 rounded-full w-6 h-6"
                name="trash-outline"
              ></IoTrashOutline>
            </Button>
          </div>
          {/* <!-- remove --> */}
        </div>
      </div>
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

export default CartCard;
