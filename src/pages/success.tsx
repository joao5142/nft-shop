import Link from "next/link";
import { ImageContainer, SuccessContainer } from "../styles/pages/success";
import { GetServerSideProps } from "next";
import { stripe } from "../lib/stripe";
import Product from "./product/[id]";
import Image from "next/image";
import Stripe from "stripe";
import Head from "next/head";

interface SuccessProps {
  customerName: string;
  products: {
    name: string;
    images: [];
  }[];
}
export default function Success({ customerName, products }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra Efetuada | NFT Shop</title>
        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <h1>Compra Efetuada</h1>
        <ImageContainer>
          {products.map((product) => (
            <Image
              src={product.images[0]}
              width={120}
              height={110}
              alt=""
              key={product.id}
            />
          ))}
        </ImageContainer>
        <p>
          Uhuul {customerName}, sua compra de {products.length}{" "}
          {products.length > 1 ? "nft's" : "nft"} já está a caminho da sua casa.
        </p>
        <Link href="/">Voltar ao catálago</Link>
      </SuccessContainer>
    </>
  );
}
///Client side / getServideProps / getStaticProps

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  const customerName = session.customer_details.name;
  const products = session.line_items.data.map((line) => {
    return line.price.product;
  });
  console.log(products);
  return {
    props: {
      customerName,
      products: products,
    },
  };
};
