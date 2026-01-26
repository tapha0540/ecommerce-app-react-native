import CartItem from "@/components/interfaces/cart_item";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getSavedCart = async (): Promise<CartItem[]> => {
  const JSONcart = (await AsyncStorage.getItem("cart")) ?? "[]";
  return JSON.parse(JSONcart) as CartItem[];
};

export default getSavedCart;
