import { useCallback } from "react";
import { client } from "../SanityConfig/client";

const useRatings = () => {
  const ratingFunction = useCallback(async (id, getRating) => {
    try {
      const ratingData = await client.fetch(
        `*[_type=="review" && product->_id=="${id}"]`
      );

      // calculate average ratings
      const ratingSum = ratingData.reduce(
        (acc, rating) => acc + rating.rating,
        0
      );

      const avgRatings = Math.ceil(ratingSum / ratingData.length);
      getRating(avgRatings);
    } catch (err) {
      console.log(err);
    }
  }, []);
  return {
    ratingFunction,
  };
};

export default useRatings;
