import {
  CartModalActions,
  CartModalContainer,
  CartModalContentColumn,
  CartModalMainContent,
  CartModalPriceInfo,
  CartModalProduct,
  CartModalProductContainer,
  CartModalProductImageContainer,
  CartModalProductInfo,
  CartModalProductInfoContainer,
  CartModalQuantityInfo,
} from "./styles";
import { useShoppingCart } from "use-shopping-cart";
import Image from "next/future/image";

import CloseIcon from "../../assets/close.png";

import axios from "axios";

interface CartModalProps {
  onClose: () => void;
}
export function CartModal({ onClose }: CartModalProps) {
  const {
    cartDetails,
    removeItem,
    totalPrice,
    formattedTotalPrice,
    cartCount,
    decrementItem,
    incrementItem,
  } = useShoppingCart();
  console.log(cartDetails);

  function handleRemoveProduct(e, productId) {
    e.preventDefault();
    removeItem(productId);
  }

  async function handleFinishPurchase() {
    if (cartCount > 0) {
      try {
        const items = Object.values(cartDetails).map((product) => {
          return { price: product.price_id, quantity: product.quantity };
        });
        console.log(items);
        const response = await axios.post("/api/checkout", {
          line_items: items,
        });

        const { checkoutUrl } = response.data;

        window.location.href = checkoutUrl;
      } catch (err) {
        console.log(err);
        alert("Falha ao redirecionar ao checkout!");
      }
    }
  }
  console.log(formattedTotalPrice, totalPrice);
  function handleDecrementItem(productId: string, productQuantity: number) {
    if (productQuantity > 1) {
      decrementItem(productId, { count: 1 });
    }
  }

  function handleIncrementItem(productId: string, productQuantity: number) {
    if (productQuantity < 10) {
      incrementItem(productId, { count: 1 });
    }
  }

  return (
    <CartModalContainer>
      <Image src={CloseIcon} alt="close" onClick={() => onClose()} />
      <CartModalMainContent>
        <h3>Sacola de compras</h3>

        <CartModalContentColumn>
          <CartModalProductContainer>
            {Object.values(cartDetails).map((product) => (
              <CartModalProduct key={product.id}>
                <CartModalProductImageContainer>
                  <Image
                    src={product.imageUrl}
                    alt=""
                    width={100}
                    height={80}
                  />
                </CartModalProductImageContainer>
                <CartModalProductInfoContainer>
                  <CartModalProductInfo>
                    <span>{product.name}</span>
                    <strong>{product.formattedPrice}</strong>
                    <a onClick={(e) => handleRemoveProduct(e, product.id)}>
                      Remover
                    </a>
                  </CartModalProductInfo>
                  <CartModalActions>
                    <button
                      onClick={() =>
                        handleDecrementItem(product.id, product.quantity)
                      }
                    >
                      -
                    </button>
                    <span>{product.quantity}</span>
                    <button
                      onClick={() =>
                        handleIncrementItem(product.id, product.quantity)
                      }
                    >
                      +
                    </button>
                  </CartModalActions>
                </CartModalProductInfoContainer>
              </CartModalProduct>
            ))}
          </CartModalProductContainer>
          <div>
            <CartModalQuantityInfo>
              <span>Quantidade</span>{" "}
              <span>
                {cartCount}
                {cartCount == 1 ? " item" : " itens"}{" "}
              </span>
            </CartModalQuantityInfo>
            <CartModalPriceInfo>
              <span>Valor total</span> <strong>{formattedTotalPrice}</strong>
            </CartModalPriceInfo>
          </div>
        </CartModalContentColumn>
      </CartModalMainContent>
      <footer>
        <button onClick={handleFinishPurchase}>Finalizar Compra</button>
      </footer>
    </CartModalContainer>
  );
}
