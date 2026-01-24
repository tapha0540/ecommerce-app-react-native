import CartItem from "@/components/interfaces/cart_item";
import getSavedCart from "@/services/cart/get_cart";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext<{
  cart: CartItem[];
  setCart: Dispatch<SetStateAction<CartItem[]>>;
} | null>(null);

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const fn = async () => {
      setCart(await getSavedCart())
    }
    fn();
  }, []);
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const cart = useContext(CartContext);
  return cart;
};
