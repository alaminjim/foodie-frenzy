import { Children, createContext, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  return <CartContext.Provider>{children}</CartContext.Provider>;
};

export default CartContext;

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);
