import { useCart } from "@/hooks/cart";

import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ShoppingScreen = () => {
  const [isLodaing, setIsloading] = useState(false);
  const cartHook = useCart();

  return (
    <SafeAreaView style={styles.container}>
      {cartHook?.cart.map((cartItem, index) => (
        <View key={index}>
          <Text>{cartItem.product.name}</Text>
          <Text>{cartItem.quantity}</Text>
        </View>
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ShoppingScreen;
