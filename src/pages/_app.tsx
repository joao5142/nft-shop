import { AppProps } from "next/app";
import { globalStyles } from "../styles/global";

import logoImg from "../assets/logo.svg";
import { Container, Header } from "../styles/pages/app";

import Image from "next/future/image";

import { CartProvider } from "use-shopping-cart";

import CartIcon from "../assets/cart-gray.png";
import { CartModal } from "../components/CartModal";
import { useState } from "react";
import Link from "next/link";

import { ToastContainer } from "react-toastify";

globalStyles();

import "react-toastify/dist/ReactToastify.css";

function App({ Component, pageProps }: AppProps) {
  const [cartIsOpen, setIsCartOpen] = useState(false);
  return (
    <CartProvider
      mode="payment"
      cartMode="client-only"
      stripe={process.env.STRIPE_PUBLIC_KEY}
      successUrl={`${process.env.NEXT_URL}/success`}
      cancelUrl={`${process.env.NEXT_URL}/?success=false`}
      currency="BRL"
      shouldPersist={true}
    >
      <Container>
        <Header>
          <Link href="/">
            <strong>NFT Shop</strong>
          </Link>
          <button onClick={() => setIsCartOpen(true)}>
            <Image src={CartIcon} alt="Cart" />
          </button>
        </Header>

        <Component {...pageProps} />
      </Container>

      {cartIsOpen && <CartModal onClose={() => setIsCartOpen(false)} />}
      <ToastContainer />
    </CartProvider>
  );
}

export default App;
