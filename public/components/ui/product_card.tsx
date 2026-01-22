import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import Product from "../interfaces/api/product";
import Theme from "../interfaces/themes";
import PressableIcon from "./Pressable_icon_card";
import { BoldText } from "./text";

const ProductCard = ({
  product,
  theme,
}: {
  product: Product;
  theme: Theme;
}) => {
  const [iconColor, setIconColor] = useState(theme.iconColor);
  return (
    <View style={[styles.container, { borderColor: theme.primaryColor }]}>
      <View style={styles.imageCard}>
        <Image source={{ uri: product.imageUrl }} style={[styles.image, {}]} />
      </View>

      <View style={[styles.detailsContainer]}>
        <View style={styles.txtContainer}>
          <BoldText
            theme={theme}
            content={product.name}
            style={[
              styles.productName,
              { color: theme.primaryColor, fontSize: 14 },
            ]}
          />
          <BoldText
            theme={theme}
            content={`${Number(product.price).toFixed(0)} FCFA`}
            style={[
              styles.productPrice,
              { color: theme.primaryColor, fontSize: 12 },
            ]}
          />
        </View>

        <PressableIcon
          theme={theme}
          onPress={() => setIconColor(theme.backgroundColor)}
          style={styles.addCartIconContainer}
          icon={
            <MaterialIcons
              name="add-shopping-cart"
              size={24}
              color={iconColor}
            />
          }
        />
      </View>
    </View>
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
    // backgroundColor: "#f5f5f5", // fallback background
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
