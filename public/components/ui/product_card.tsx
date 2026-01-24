import { useCart } from "@/hooks/cart";
import formatPrice from "@/services/helpers/format_price";
import ip from "@/services/ip";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Vibration, View } from "react-native";
import { Card } from "react-native-paper";
import Product from "../interfaces/api/product";
import Theme from "../interfaces/themes";
import { BoldText } from "./text";
import { ThemedCard } from "./themed_card";

const ProductCard = ({
  product,
  theme,
  AddToCart,
  removeFromCart,
}: {
  product: Product;
  theme: Theme;
  AddToCart: () => void;
  removeFromCart: () => void;
}) => {
  const cartHook = useCart();
  const [isAddedToCart, setIsAddedToCart] = useState(cartHook?.cart.some(any => any.id === product.id));
  return (
    <Card
      style={[
        styles.container,
        {
          backgroundColor: theme.backgroundColor,
          borderColor: theme.primaryColor,
        },
      ]}
      onPress={() => {
        Vibration.vibrate(55);
        router.push({
          pathname: "/product/[id]",
          params: { ...product },
        });
      }}
    >
      <View style={styles.imageCard}>
        <Image
          source={{
            uri: `http://${ip}/uploads/products/images/${product.imageUrl}`,
          }}
          style={[styles.image, {}]}
        />
      </View>

      <View style={[styles.detailsContainer]}>
        <View style={styles.txtContainer}>
          <BoldText
            theme={theme}
            content={product.name}
            style={[
              styles.productName,
              { color: theme.textColor, fontSize: 14 },
            ]}
          />
          <BoldText
            theme={theme}
            content={`${formatPrice(product.price)} FCFA`}
            style={[
              styles.productPrice,
              { color: theme.primaryColor, fontSize: 12 },
            ]}
          />
        </View>

        <ThemedCard
          theme={theme}
          onPress={() => {
            Vibration.vibrate(85);
            if (isAddedToCart) removeFromCart();
            else AddToCart();

            setIsAddedToCart(!isAddedToCart);
          }}
          style={{
            ...styles.addCartIconContainer,
            backgroundColor: isAddedToCart
              ? theme.primaryColor
              : theme.backgroundColor,
          }}
        >
          <MaterialIcons
            name="add-shopping-cart"
            size={28}
            color={isAddedToCart ? theme.backgroundColor : theme.iconColor}
          />
        </ThemedCard>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "48%", // two cards per row with margin
    margin: "1%",
    rowGap: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  imageCard: {
    borderRadius: 12,
    overflow: "hidden",
    margin: 5,
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    columnGap: 5,
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  txtContainer: {
    flex: 1,
    rowGap: 4,
  },
  productName: {
    fontSize: 14,
    fontWeight: "700",
  },
  productPrice: {
    fontSize: 12,
    fontWeight: "600",
  },
  addCartIconContainer: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: "#e0e0e0", // subtle button background
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductCard;
