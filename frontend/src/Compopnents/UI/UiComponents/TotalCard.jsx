import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { client } from "../../SanityConfig/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoCloseCircle } from "react-icons/io5";
const TotalCard = (props) => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [productDiscount, setProductDiscount] = useState({});
  const [couponInput, setCouponInput] = useState("");
  const notify = (option) => {
    if (option.type === "success") {
      toast.success(option.message);
    } else {
      toast.error(option.message);
    }
  };

  const getCoupon = async (code) => {
    try {
      const coupon = await client.fetch(
        `*[_type=="coupon" && code=="${code}"]`
      );

      return coupon;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let total = props.data.reduce((acc, item) => acc + +item.totatPrice, 0);
    let discount;
    let newAmount = 0;

    const d = new Date().getTime();

    for (const item of props.data) {
      if (
        item.coupon &&
        item.coupon.active &&
        d < new Date(item.coupon.expire).getTime()
      ) {
        console.log(item.coupon.active);
        discount = item.coupon.discount;
        newAmount =
          newAmount +
          +item.variants[0].price * item.quantity * (discount / 100);
      }
    }

    setTotalAmount(total - newAmount);
  }, [props.data]);

  const CouponCodeHandler = async (e) => {
    e.preventDefault();
    if (couponInput !== "") {
      const coupon = await getCoupon(couponInput.toUpperCase());
      if (coupon.length > 0) {
        setCouponInput("");
        if (props.data.length === 1) {
          if (props.data[0].coupon) {
            notify({
              type: "error",
              message: "Coupon already exists for this product",
            });
          } else {
            if (productDiscount.discount) {
              notify({
                type: "error",
                message: "Coupon code already applied on this product",
              });
            } else {
              setProductDiscount((prev) => ({ ...coupon[0] }));
              const newAmount =
                +props.data[0].variants[0].price *
                props.data[0].quantity *
                (coupon[0].discount / 100);
              console.log(newAmount);
              setTotalAmount((prev) => prev - newAmount);
            }
          }
        } else {
          notify({
            type: "error",
            message: "Coupon code only applicable for one product",
          });
        }
      } else {
        notify({ type: "error", message: "Invalid coupon code" });
      }
    }
  };

  const couponInputHandler = (e) => {
    setCouponInput(e.target.value);
  };

  const removeDiscountHandler = () => {
    const newAmount = +props.data[0].variants[0].price * props.data[0].quantity;
    setTotalAmount((prev) => newAmount);
    setProductDiscount((prev) => ({}));
  };

  return (
    <>
      <div className="order md:max-h-[33rem] shadow-md flex flex-col gap-8 p-4 lg:col-span-2 border-b-4 rounded-lg border-black">
        <div className="order-heading-section">
          <h1 className="text-lg md:text-2xl pb-2 link-bottem-line font-semibold uppercase">
            {props.label}
          </h1>
        </div>
        <div className="Order-detail py-4 border-b border-b-gray-100">
          <div className="product flex flex-col gap-2">
            {/* cart total */}
            <div className="Product-detail-heading flex items-end justify-between">
              <h1 className="font-bold text-base md:text-lg">Product</h1>
              <h1 className="font-bold text-base md:text-lg">Total</h1>
            </div>
            {props.data.map((item, index) => (
              <div
                key={index}
                className="Products flex items-start justify-between"
              >
                <div>
                  <h1 className="text-sm">{item.name}</h1>
                  {item.coupon !== null && (
                    <span className="text-xs text-green-800">
                      {`coupon code:${item.coupon.code} (${item.coupon.discount}% off)`}
                    </span>
                  )}
                </div>
                <div className="flex flex-col items-end">
                  <h1 className="text-sm">
                    <span>{item.quantity}</span> x ₹{item.variants[0].price}
                  </h1>
                  {item.coupon ? (
                    <>
                      <h1 className="text-xs">
                        <span className="text-red-500">
                          - ₹
                          {(+item.variants[0].price *
                            item.quantity *
                            item.coupon.discount) /
                            100}
                        </span>
                      </h1>
                      <h1 className="text-sm ">
                        ₹
                        {item.totatPrice -
                          (+item.variants[0].price *
                            item.quantity *
                            item.coupon.discount) /
                            100}{" "}
                      </h1>
                    </>
                  ) : (
                    <h1 className="text-sm ">₹{item.totatPrice} </h1>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* <!-- Total --> */}
        <div className="total flex flex-col gap-4 mt-6">
          <div className="total flex items-end justify-between">
            <h1 className="font-bold text-base md:text-lg">Total</h1>
            <div className="flex flex-col items-end">
              <h1 className="font-bold text-base md:text-lg">₹{totalAmount}</h1>
              {productDiscount.discount ? (
                <p className="text-xs text-green-600 flex gap-1 items-center">
                  {`coupon code:${productDiscount.code} applied (${productDiscount.discount}%off)  `}{" "}
                  <span
                    onClick={removeDiscountHandler}
                    className="cursor-pointer"
                  >
                    <IoCloseCircle className="w-3 h-3" />
                  </span>{" "}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>

          {props.isCouponActive && (
            <form
              className="coupon flex items-end justify-between flex-wrap gap-2"
              onSubmit={CouponCodeHandler}
            >
              <input
                type="text"
                placeholder="Coupon code"
                name="coupon"
                id="coupon"
                onChange={couponInputHandler}
                value={couponInput}
                className="min-w-max uppercase  md:min-w-0 flex-grow px-2 md:px-4 py-1 border-2 border-gray-100 focus:outline-none"
              />
              <button
                type="submit"
                className="flex-grow px-2 md:px-4 py-1 bg-black text-white border-black border-2 hover:border-2 hover:bg-white hover:text-black transition duration-300 ease-in-out"
              >
                Apply
              </button>
            </form>
          )}
        </div>

        {/* <!-- action btn --> */}
        <div className="action-btn flex">
          {props.btntype === "paynow" && (
            <button
              onClick={props.OnClick}
              className="flex-grow px-2 md:px-4 py-1 bg-black text-center text-white border-black border-2 hover:border-2 hover:bg-white hover:text-black transition duration-300 ease-in-out"
            >
              {props.btnlabel}
            </button>
          )}

          {props.btntype === "wishlist" && (
            <button
              onClick={props.OnClick}
              className="flex-grow px-2 md:px-4 py-1 bg-black text-center text-white border-black border-2 hover:border-2 hover:bg-white hover:text-black transition duration-300 ease-in-out"
            >
              {props.btnlabel}
            </button>
          )}

          {props.btntype === "cart" && (
            <Link
              to={"/checkout"}
              onClick={props.OnClick}
              className="flex-grow px-2 md:px-4 py-1 bg-black text-center text-white border-black border-2 hover:border-2 hover:bg-white hover:text-black transition duration-300 ease-in-out"
            >
              {props.btnlabel}
            </Link>
          )}
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

export default TotalCard;
