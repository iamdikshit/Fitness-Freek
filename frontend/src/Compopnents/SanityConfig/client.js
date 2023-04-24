import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Compose the URL for your project's endpoint and add the query

export const client = sanityClient({
  projectId: "ukiyjmcr",
  dataset: "production",
  apiVersion: "2021-10-21",
  useCdn: true,
  token: process.env.REACT_APP_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
