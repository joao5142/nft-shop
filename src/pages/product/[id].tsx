import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/future/image";
import Stripe from "stripe";
import { stripe } from "../../lib/stripe";
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "../../styles/pages/product";
import axios from "axios";
import { useState } from "react";
import Head from "next/head";

import { useShoppingCart } from "use-shopping-cart";
import { toast } from "react-toastify";
import { formatNumberToBRLMoney } from "../../utils/numberFormat";
import { useCart } from "../../hooks/useCart";

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    description: string;
    price_id: number;
  };
}

export default function Product({ product }: ProductProps) {
  const { addItem } = useCart();

  async function handleAddToCart() {
    try {
      let response = await addItem(product);
      toast.success("Adicionado ao carrinho");
    } catch (err) {
      toast.error(err);
    }
  }

  return (
    <>
      <Head>
        <title>{product.name} | NFT Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{formatNumberToBRLMoney(product.price)}</span>

          <p>{product.description}</p>

          <button onClick={handleAddToCart}>Colocar na sacola</button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "prod_MLH5Wy0Y97hDAC" } }],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: price.unit_amount,
        description: product.description,
        price_id: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hours
  };
};
