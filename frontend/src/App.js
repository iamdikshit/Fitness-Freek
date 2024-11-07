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
  ProductDetail,
  Wishlist,
  Error,
  Checkout,
} from "./Compopnents/Pages";
import { useDispatch } from "react-redux";
import { addMultipleItems } from "./Compopnents/Store/CartSlice";
import { addMultipleItems as addMultipleItemsWishlist } from "./Compopnents/Store/WishlistSlice";
import { loader as productDeltailLoader } from "./Compopnents/Pages/ProductDetail";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { client } from "./Compopnents/SanityConfig/client";
import { addUser, loggedIn } from "./Compopnents/Store/UserSlice";
import Products from "./Compopnents/Pages/Product";
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
        path: "products",

        children: [
          {
            index: true,
            element: <Products />,
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
        path: "checkout",
        element: <Checkout />,
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    // console.log(token);

    client
      .fetch(`*[_type=="user" && token=="${token}"]`)
      .then((res) => {
        if (res.length === 1) {
          dispatch(loggedIn());
          dispatch(addUser(res[0]));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

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

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  );
}

export default App;
