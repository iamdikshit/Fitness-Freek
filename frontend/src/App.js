import React, { useEffect } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { loader as productLoader } from "./Compopnents/Pages/Home";
import Root from "./Compopnents/UI/Container/Root";
import {
  About,
  Cart,
  Contact,
  Home,
  Product,
  ProductDetail,
  Wishlist,
  Error,
} from "./Compopnents/Pages";
import { useDispatch } from "react-redux";
import { addMultipleItems } from "./Compopnents/Store/CartSlice";
import { addMultipleItems as addMultipleItemsWishlist } from "./Compopnents/Store/WishlistSlice";
import { loader as productDeltailLoader } from "./Compopnents/Pages/ProductDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: productLoader,
      },
      {
        path: "product",

        children: [
          {
            index: true,
            element: <Product />,
          },
          {
            path: ":slug",
            loader: productDeltailLoader,
            element: <ProductDetail />,
          },
        ],
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "wishlist",
        element: <Wishlist />,
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();
  // Store cart and wishlist from localstorage
  useEffect(() => {
    const setData = () => {
      let cartData = localStorage.getItem("cart");
      let wishlistData = localStorage.getItem("wishlist");

      cartData = JSON.parse(cartData);
      wishlistData = JSON.parse(wishlistData);

      if (cartData) {
        dispatch(addMultipleItems(cartData));
        // cartData.map((item) => dispatch(addMultipleItems(item)));
      }

      if (wishlistData) {
        dispatch(addMultipleItemsWishlist(wishlistData));
        // wishlistData.map((item) => dispatch(addMultipleItemsWishlist(item)));
      }
    };

    const timeIdentifier = setTimeout(setData, 200);
    return () => {
      clearTimeout(timeIdentifier);
    };
  }, [dispatch]);
  return <RouterProvider router={router} />;
}

export default App;
