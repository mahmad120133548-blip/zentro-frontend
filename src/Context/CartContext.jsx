
import { createContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("zentro_cart");

    if (!savedCart) return [];

    try {
      const parsedCart = JSON.parse(savedCart);

      return parsedCart.map((item) => ({
        ...item,
        quantity: item.quantity || 1,
      }));
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("zentro_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((currentItems) => {
      const alreadyExists = currentItems.some(
        (item) => item.id === product.id
      );

      if (alreadyExists) return currentItems;

      const cartProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        sku: product.sku,
        image: product.images?.[0]?.imagePath,
        vendorId: product.vendor?.id,
        vendorName: product.vendor?.businessName,
        stock: product.stockQuantity,
        quantity: 1,
      };

      return [...currentItems, cartProduct];
    });
  };

  const increaseQuantity = (productId) => {
    setCartItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id !== productId) return item;

        if (item.quantity >= item.stock) return item;

        return {
          ...item,
          quantity: item.quantity + 1,
        };
      })
    );
  };

  const decreaseQuantity = (productId) => {
    setCartItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id !== productId) return item;

        if (item.quantity <= 1) return item;

        return {
          ...item,
          quantity: item.quantity - 1,
        };
      })
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const isInCart = (productId) =>
    cartItems.some((item) => item.id === productId);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;

