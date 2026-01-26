import { MinusIcon, PlusIcon } from "lucide-react-native";
import { Dispatch, SetStateAction } from "react";
import { StyleProp, StyleSheet, TextInput, View, ViewStyle } from "react-native";
import Product from "../interfaces/api/product";
import Theme from "../interfaces/themes";
import PressableIcon from "./Pressable_icon_card";
import { ThemedCard } from "./themed_card";

const QuantityInput = ({
  product,
  quantity,
  setQuantity,
  theme,
  style
}: {
  product: Product;
  quantity: string;
  setQuantity: Dispatch<SetStateAction<string>>;
  theme: Theme;
  style?: StyleProp<ViewStyle>
}) => (
  <ThemedCard style={[styles.quantityCard, style]} theme={theme}>
    <View style={styles.quantityRow}>
      <PressableIcon
        icon={<MinusIcon size={30} color={theme.iconColor} />}
        onPress={() => {
          const value = Number(quantity) ?? 1;
          if (value > 1) {
            setQuantity(String(value - 1));
          } else {
            setQuantity(String(product.stock));
          }
        }}
        theme={theme}
        style={styles.iconCard}
      />
      <TextInput
        value={quantity}
        onChangeText={(value) => {
          setQuantity(value);
          const n = Number(value);
          const notNumber = /\D/;
          if (n > Number(product.stock) || n <= 0 || notNumber.test(value)) {
            setTimeout(() => {
              setQuantity("1");
            }, 250);
          }
        }}
        style={[styles.quantityTextInput, { color: theme.primaryColor }]}
        keyboardType="number-pad"
        numberOfLines={1}
      />

      <PressableIcon
        icon={<PlusIcon size={30} color={theme.iconColor} />}
        onPress={() => {
          const value = Number(quantity) ?? 1;
          if (value < Number(product.stock)) {
            setQuantity(String(value + 1));
          } else {
            setQuantity("1");
          }
        }}
        theme={theme}
        style={styles.iconCard}
      />
    </View>
  </ThemedCard>
);

const styles = StyleSheet.create({
  quantityRow: {
    maxWidth: 130,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 3,
  },
  quantityCard: {
    maxWidth: 130,
    flexDirection: "row",
    columnGap: 5,
    alignContent: "center",
    justifyContent: "space-between",
    borderRadius: 12,
    padding: 2,
  },
  quantityTextInput: {
    width: 50,
    height: 50,
    textAlign: "center",
  },
  iconCard: {
    borderRadius: 8,
  },
});

export default QuantityInput;
