import { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, color = product.colors[0], qty = 1) => {
    setCartItems(prev => {
      const exists = prev.find(i => i.id === product.id && i.color === color);
      if (exists) {
        return prev.map(i =>
          i.id === product.id && i.color === color
            ? { ...i, qty: i.qty + qty }
            : i
        );
      }
      return [...prev, { ...product, color, qty }];
    });
  };

  const removeFromCart = (id, color) => {
    setCartItems(prev => prev.filter(i => !(i.id === id && i.color === color)));
  };

  const updateQty = (id, color, qty) => {
    if (qty <= 0) { removeFromCart(id, color); return; }
    setCartItems(prev =>
      prev.map(i => i.id === id && i.color === color ? { ...i, qty } : i)
    );
  };

  const clearCart = () => setCartItems([]);

  const totalItems = cartItems.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQty, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
