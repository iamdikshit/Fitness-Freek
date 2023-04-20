import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
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
  return <RouterProvider router={router} />;
}

export default App;
