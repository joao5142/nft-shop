import { useShoppingCart } from "use-shopping-cart";

export function useCart() {
  const {
    addItem: addItemCart,
    incrementItem,
    cartDetails,
  } = useShoppingCart();

  function addItem(product) {
    return new Promise((resolve, reject) => {
      const productCart = cartDetails[product.id] || null;

      if (productCart == null || productCart.quantity === 0) {
        console.log(product);
        addItemCart(product);
        resolve("Adicionado");
      } else if (productCart.quantity < 10) {
        incrementItem(product.id, { count: 1 });
        resolve("Adicionado");
      } else {
        reject("Quantidade máxima");
      }
    });
  }

  return {
    addItem,
  };
}
