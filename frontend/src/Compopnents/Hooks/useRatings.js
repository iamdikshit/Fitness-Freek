import { useCallback, useState } from "react";
import { client } from "../SanityConfig/client";

const useRatings = () => {
  const [noOfRating, setNoOfRating] = useState(null);

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
      let count = 0;
      ratingData.reduce((acc, rating) => count++, 0);
      setNoOfRating(count);
      const avgRatings = Math.ceil(ratingSum / ratingData.length);
      getRating(avgRatings);
    } catch (err) {
      console.log(err);
    }
  }, []);
  return {
    ratingFunction,
    noOfRating,
  };
};

export default useRatings;
