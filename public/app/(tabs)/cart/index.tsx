import { ThemedCard } from "@/components/ui/themed_card";
import { useCart } from "@/hooks/cart";
import { useTheme } from "@/hooks/useColorsheme";

import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

const ShoppingScreen = () => {
  const [isLodaing, setIsloading] = useState(false);
  const cartHook = useCart();
  const theme = useTheme()!.theme;
  return (
    <GestureHandlerRootView>
      <SafeAreaView style={styles.container}>
        {cartHook?.cart.map((cartItem, index) => (
          <Swipeable
            key={index}
            renderRightActions={() => (
              <View>
                <Text>Delete</Text>
              </View>
            )}
          >
            <ThemedCard theme={theme} style={styles.card}>
              <Text>card</Text>
            </ThemedCard>
          </Swipeable>
        ))}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    width: 100,
    height: 100,
  },
});

export default ShoppingScreen;
