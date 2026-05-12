import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window === "undefined") return [];

    try {
      const saved = localStorage.getItem("hockey_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const cartCount = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0
  );

  useEffect(() => {
    localStorage.setItem("hockey_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // 🏑 Add Hockey Gear to Cart
  const addToCart = (product, selectedPrice, quantity) => {
    if (!product || !selectedPrice) return;

    setCartItems((prev) => {
      const exists = prev.find(
        (item) =>
          item.productId === product._id &&
          item.priceOptionType === selectedPrice.type
      );

      if (exists) {
        return prev.map((item) =>
          item.productId === product._id &&
          item.priceOptionType === selectedPrice.type
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...prev,
        {
          productId: product._id,
          name: product.name,
          brand: product.brand,
          imageUrl: product.imageUrl,
          priceOptionType: selectedPrice.type,
          price: selectedPrice.price,
          quantity,
          stock: selectedPrice.stock,
        },
      ];
    });
  };

  const removeFromCart = (productId, type) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(item.productId === productId && item.priceOptionType === type)
      )
    );
  };

  const updateQuantity = (productId, type, qty) => {
    if (qty < 1) return removeFromCart(productId, type);

    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId && item.priceOptionType === type
          ? { ...item, quantity: qty }
          : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const getCartTotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);