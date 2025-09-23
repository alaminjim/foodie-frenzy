/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const { item, quantity } = action.payload;
      const existingItem = state.find((i) => i.id === item.id);
      const parsedPrice = Number(item.price) || 0;

      if (existingItem) {
        return state.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + quantity, price: parsedPrice }
            : i
        );
      }
      return [...state, { ...item, price: parsedPrice, quantity }];
    }

    case "REMOVE_ITEM": {
      return state.filter((i) => i.id !== action.payload.itemId);
    }

    case "UPDATE_QUANTITY": {
      const { itemId, newQuantity } = action.payload;
      if (newQuantity <= 0) {
        return state.filter((i) => i.id !== itemId);
      }
      return state.map((i) =>
        i.id === itemId ? { ...i, quantity: newQuantity } : i
      );
    }

    case "CLEAR_CART": {
      return [];
    }

    default:
      return state;
  }
};

const initializer = () => {
  if (typeof window !== "undefined") {
    const localCart = localStorage.getItem("cart");
    return localCart ? JSON.parse(localCart) : [];
  }
  return [];
};

export const CartProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, [], initializer);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Calculate total cost
  const cartTotal = cartItems.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  // Total items count
  const totalItemsCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const formattedTotalItems =
    totalItemsCount >= 1000
      ? (totalItemsCount / 1000).toFixed(1) + "k"
      : totalItemsCount;

  // Dispatcher wrappers
  const addToCart = useCallback((item, quantity = 1) => {
    dispatch({ type: "ADD_ITEM", payload: { item, quantity } });
  }, []);

  const removeFromCart = useCallback((itemId) => {
    dispatch({ type: "REMOVE_ITEM", payload: { itemId } });
  }, []);

  const updateQuantity = useCallback((itemId, newQuantity) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { itemId, newQuantity } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        totalItems: totalItemsCount,
        formattedTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;

// Hook
export const useCart = () => useContext(CartContext);
