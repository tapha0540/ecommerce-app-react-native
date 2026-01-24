import CartItem from '@/components/interfaces/cart_item';
import AsyncStorage from '@react-native-async-storage/async-storage';

const saveCart = async (cart: CartItem[]) => {
    await AsyncStorage.setItem('cart', JSON.stringify(cart));
}

export default saveCart;