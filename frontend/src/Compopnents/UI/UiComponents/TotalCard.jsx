import React from "react";
const TotalCard = (props) => {
  let totalAmount = props.data.reduce((acc, item) => acc + item.totatPrice, 0);

  return (
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
              <h1 className="text-sm">{item.name}</h1>
              <div className="flex flex-col items-end">
                <h1 className="text-sm">
                  <span>{item.quantity}</span> x ₹{item.price}
                </h1>
                <h1 className="text-sm ">₹{item.totatPrice} </h1>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <!-- Total --> */}
      <div className="total flex flex-col gap-4 mt-6">
        <div className="total flex items-end justify-between">
          <h1 className="font-bold text-base md:text-lg">Total</h1>
          <h1 className="font-bold text-base md:text-lg">₹{totalAmount}</h1>
        </div>
        <div className="coupon flex items-end justify-between flex-wrap gap-2">
          <input
            type="text"
            placeholder="Coupon code"
            name="coupon"
            id="coupon"
            className="min-w-max md:min-w-0 flex-grow px-2 md:px-4 py-1 border-2 border-gray-100 focus:outline-none"
          />
          <button className="flex-grow px-2 md:px-4 py-1 bg-black text-white border-black border-2 hover:border-2 hover:bg-white hover:text-black transition duration-300 ease-in-out">
            Apply
          </button>
        </div>
      </div>

      {/* <!-- action btn --> */}
      <div className="action-btn flex">
        <button className="flex-grow px-2 md:px-4 py-1 bg-black text-white border-black border-2 hover:border-2 hover:bg-white hover:text-black transition duration-300 ease-in-out">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default TotalCard;
