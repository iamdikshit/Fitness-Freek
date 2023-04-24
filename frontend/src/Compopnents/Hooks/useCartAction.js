import { useDispatch } from "react-redux";
import { useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { addItems, removeItemsByQty, removeItems } from "../Store/CartSlice";
import { addItems as addWishlistItems } from "../Store/WishlistSlice";

const useCartAction = () => {
  const cart = useSelector((state) => state.cart.cart);
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const dispatch = useDispatch();

  /*
   storeLacalStorage function takse option as input
   option =  {
    key ,
    value
   }
   An this function is used to store the data into localstorage
  */
  const storeLocalStorage = useCallback((option) => {
    localStorage.setItem(option.key, JSON.stringify(option.value));
  }, []);
  useEffect(() => {
    const setLocalData = () => {
      storeLocalStorage({ key: "cart", value: cart });
      storeLocalStorage({ key: "wishlist", value: wishlist });
    };
    const timeIdentifier = setTimeout(setLocalData, 1000);
    return () => {
      clearTimeout(timeIdentifier);
    };
  }, [cart, wishlist, storeLocalStorage]);

  /*
   insertDataIntoCart function takse option as input
   options =  {
    type: "cart"||"wishlist" ,
    data:data
   }
   An this function is used to store the data into cart state or wishlist state
  */
  const insertDataIntoCart = (options) => {
    const { type, data } = options;
    const item = {
      _id: data._id,
      name: data.name,
      poster: data.poster,
      price: +data.price.price,
      variants: data.variants ? [data.variants[0]] : [],
    };

    const existItem = cart.find((item) => item._id === data._id);

    const quantity = existItem?.quantity ? existItem.quantity : 0;
    if (type === "cart") {
      if (quantity < 5) {
        dispatch(addItems(item));
        return true;
      } else {
        return false;
      }
    } else if (type === "wishlist") {
      if (quantity < 5) {
        dispatch(addWishlistItems(item));
        return true;
      } else {
        return false;
      }
    }
  };

  const removeDataFromCart = (options) => {
    const { type, data } = options;
    if (type === "cart") {
      dispatch(removeItemsByQty({ _id: data._id }));
    } else if (type === "wishlist") {
      dispatch(removeItemsByQty({ _id: data._id }));
    }
  };

  const removeItemFromCart = (options) => {
    const { type, data } = options;
    if (type === "cart") {
      dispatch(removeItems({ _id: data._id }));
    } else if (type === "wishlist") {
      dispatch(removeItemsByQty({ _id: data._id }));
    }
  };
  return {
    insertDataIntoCart,
    removeDataFromCart,
    removeItemFromCart,
  };
};

export default useCartAction;
