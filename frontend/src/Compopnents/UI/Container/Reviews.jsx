import React, { useEffect, useState } from "react";
import { IoStar, IoStarOutline } from "react-icons/io5";
import { client } from "../../SanityConfig/client";
const Reviews = ({ actionBtn, data }) => {
  const [productReviews, setProductRevies] = useState([]);
  useEffect(() => {
    const getAllReviews = async () => {
      try {
        let review = await client.fetch(
          `*[_type=="review" && product->_id=="${data._id}"]{
          ...,
          user->{
          ...,
          }
        }`
        );
        setProductRevies(review);
      } catch (err) {
        console.log(err);
      }
    };

    const TimeIdentitifier = setTimeout(getAllReviews, 500);

    return () => {
      clearTimeout(TimeIdentitifier);
    };
  }, [data._id]);

  return (
    <div
      className={`Reviews py-6 grid grid-cols-1 lg:grid-cols-5 gap-8 ${
        actionBtn.isReview ? "" : "hidden"
      } `}
    >
      {/* <!-- review 3 --> */}
      <div className="review lg:col-span-3  flex flex-col gap-4 py-4 mt-4 overflow-y-scroll ">
        {productReviews?.map((productreview, index) => (
          <div key={index} className="user-review  border-b border-b-gray-200">
            <div className="review-header flex items-center gap-4">
              <img
                className="w-8 h-8 rounded-full"
                src={productreview.user.image}
                alt="user "
              />
              <div className="user-detail">
                <h1 className="text-sm flex gap-2 items-center font-bold">
                  <span>{productreview.user.name}</span>
                  <span className="text-xs font-normal text-gray-500">
                    {productreview._createdAt.substr(0, 10)}
                  </span>
                </h1>
                <ul className="flex items-center">
                  {[1, 2, 3, 4, 5].map((ele, index) =>
                    ele <= productreview.rating ? (
                      <li key={index}>
                        <IoStar
                          className="text-yellow-500 w-4 h-4"
                          name="star"
                        ></IoStar>
                      </li>
                    ) : (
                      <li key={index}>
                        <IoStarOutline
                          className="text-yellow-500 w-4 h-4"
                          name="star"
                        ></IoStarOutline>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
            <div className="description my-4">
              <p className="text-sm">{productreview.review}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="give Review">
        <h1 className="text-2xl">Create Review</h1>
      </div>
    </div>
  );
};

export default Reviews;
