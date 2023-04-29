import React, { Suspense } from "react";
import { useLoaderData, Await } from "react-router-dom";
import { defer } from "react-router-dom";
import { Hero, Brand, Diet, Services, Product } from "../UI/Container";
import { client } from "../SanityConfig/client";

const Home = () => {
  const { products } = useLoaderData();

  return (
    <>
      <Hero />
      <Suspense>
        <Await resolve={products}>
          {(items) => <Product products={items} />}
        </Await>
      </Suspense>

      <Brand />
      <Diet />
      <Services />
    </>
  );
};

export default Home;

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
