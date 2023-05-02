import React from "react";
import { TotalCard } from "../UI/UiComponents";
import { useSelector } from "react-redux";
const Checkout = () => {
  const { cart } = useSelector((state) => state.cart);
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [pin, setPin] = useState("");
  // const [address, setAddress] = useState("");
  // const [phone, setPhone] = useState("");

  return (
    <>
      <section className="Billing-section py-4 px-8 md:px-16 my-12 grid grid-cols-1 gap-16 md:grid-cols-5">
        <div className="billing md:col-span-3 py-4">
          <div className="cart-heading-section">
            <h1 className="text-lg md:text-2xl pb-2 link-bottem-line font-semibold uppercase">
              Billing
            </h1>
          </div>
          <div className="address-form">
            <form className="billing-form bg-white rounded py-6">
              {/* <!-- name --> */}
              <div className="flex sm:mb-4 sm:gap-6 flex-col sm:flex-row">
                <div className="mb-4 sm:mb-0 flex-grow">
                  <label
                    className="block text-gray-700 text-sm mb-2"
                    htmlFor="name"
                  >
                    Full Name
                  </label>
                  <input
                    className="bg-gray-100 text-sm appearance-none border-b-2 border-b-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-b-2 focus:border-b-green-700"
                    id="firstname"
                    name="name"
                    type="text"
                    placeholder="first name"
                    required
                  />
                </div>
              </div>

              {/* <!-- pin code --> */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm mb-2"
                  htmlFor="Pincode"
                >
                  Pin Code
                </label>
                <input
                  className="bg-gray-100 text-sm appearance-none border-b-2 border-b-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-b-2 focus:border-b-green-700"
                  id="Pincode"
                  name="Pincode"
                  type="text"
                  placeholder="pincode"
                />
              </div>

              <div className="flex sm:mb-4 sm:gap-6 flex-col sm:flex-row">
                <div className="mb-4 sm:mb-0 flex-grow">
                  <label
                    className="block text-gray-700 text-sm mb-2"
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <input
                    className="email bg-gray-100 text-sm appearance-none border-b-2 border-b-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-b-2 focus:border-b-green-700"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="email@example.com"
                    required
                  />
                </div>
                <div className="mb-4 sm:mb-0 flex-grow">
                  <label
                    className="block text-gray-700 text-sm mb-2"
                    htmlFor="Phone"
                  >
                    Phone
                  </label>
                  <input
                    className="bg-gray-100 appearance-none border-b-2 border-b-white rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight text-sm focus:outline-none focus:border-b-2 focus:border-b-green-700"
                    id="Phone"
                    type="text"
                    placeholder="phone"
                    required
                  />
                </div>
              </div>

              {/* <!-- address --> */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm mb-2"
                  htmlFor="Address"
                >
                  Address
                </label>

                <textarea
                  className="bg-gray-100 text-sm appearance-none border-b-2 border-b-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-b-2 focus:border-b-green-700"
                  name="Address"
                  id="address"
                  cols="30"
                  rows="10"
                ></textarea>
              </div>
            </form>
          </div>
        </div>

        <TotalCard
          data={cart}
          label={"Order"}
          btntype={"paynow"}
          isCouponActive={true}
          btnlabel={"Pay now"}
        />
      </section>
    </>
  );
};

export default Checkout;
