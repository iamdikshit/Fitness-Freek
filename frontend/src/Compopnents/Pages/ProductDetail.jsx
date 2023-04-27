import React, { Suspense } from "react";
import { defer, Await, useLoaderData } from "react-router-dom";
import { ProductDetails } from "../UI/Container";
import { client } from "../SanityConfig/client";
import { ProductDetailLoading } from "../UI/UiComponents";
const ProductDetail = () => {
  const { productDetails } = useLoaderData();
  return (
    <>
      <main className="mt-8">
        <Suspense fallback={<ProductDetailLoading />}>
          <Await resolve={productDetails}>
            {(productDetails) => <ProductDetails data={productDetails} />}
          </Await>
        </Suspense>
      </main>
    </>
  );
};

export default ProductDetail;

const getProductDetail = async (params) => {
  try {
    const query = `*[slug.current == "${params.slug}"]`;
    const products = await client.fetch(query);
    // console.log(products);
    return products;
  } catch (err) {
    return err;
  }
};

export const loader = async ({ request, params }) => {
  return defer({
    productDetails: getProductDetail(params),
  });
};
