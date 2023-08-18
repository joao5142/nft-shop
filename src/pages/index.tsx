import Image from "next/future/image";

import { GetStaticProps } from "next";
import Link from "next/link";

import { useKeenSlider } from "keen-slider/react";

import { stripe } from "../lib/stripe";
import { HomeContainer, Product } from "../styles/pages/home";

import Head from "next/head";

import CartIcon from "../assets/cart-white.png";

import "keen-slider/keen-slider.min.css";

import Stripe from "stripe";

import { useShoppingCart } from "use-shopping-cart";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useCart } from "../hooks/useCart";

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    price_id: number;
  }[];
}

export default function Home({ products }: HomeProps) {
  const { addItem } = useCart();
  const router = useRouter();

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  function handleNavigateProduct(productId: string) {
    router.push("/product/" + productId);
  }

  async function handleAddItemToCart(product) {
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
        <title>Home | NFT Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => {
          return (
            <Product className="keen-slider__slide" key={product.id}>
              <Image
                onClick={() => handleNavigateProduct(product.id)}
                src={product.imageUrl}
                width={520}
                height={480}
                alt=""
              />

              <footer>
                <div>
                  <strong>{product.name}</strong>
                  <span>
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(product.price / 100)}
                  </span>
                </div>
                <button onClick={() => handleAddItemToCart(product)}>
                  <Image src={CartIcon} />
                </button>
              </footer>
            </Product>
          );
        })}
      </HomeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount,
      price_id: price.id,
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours,
  };
};
