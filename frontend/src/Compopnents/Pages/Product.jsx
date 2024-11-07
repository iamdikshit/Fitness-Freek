import React, { Suspense } from "react";
import { useLoaderData, Await } from "react-router-dom";
import { defer } from "react-router-dom";
import { Product } from "../UI/Container";
import { client } from "../SanityConfig/client";

const Products = () => {
  const { products } = useLoaderData();
  return (
    <Suspense>
      <Await resolve={products}>
        {(items) => <Product title={"Products"} products={items} />}
      </Await>
    </Suspense>
  );
};

export default Products;

const getProducts = async () => {
  try {
    const query = `*[_type=="product"]{
      ...,
        coupon->{
        ...,
        }
      }[0...10]`;
    const products = await client.fetch(query);
    // console.log(products);
    return products;
  } catch (err) {
    return err;
  }
};

export const loader = async () => {
  return defer({
    products: getProducts(),
  });
};
