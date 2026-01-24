import Product from "@/components/interfaces/api/product";
import ProductsCategory from "@/components/interfaces/api/products_categorie";
import { OutlineButton, ThemedButton } from "@/components/ui/buttons";
import PressableIcon from "@/components/ui/Pressable_icon_card";
import { BoldText, LightText } from "@/components/ui/text";
import { ThemedCard } from "@/components/ui/themed_card";
import { useCart } from "@/hooks/cart";
import { useTheme } from "@/hooks/useColorsheme";
import getProductCategory from "@/services/api/products_categories/get_category";
import formatPrice from "@/services/helpers/format_price";
import ip from "@/services/ip";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import { MinusIcon, PlusIcon, PlusSquare } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Card } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const ProductScreen = () => {
  const product = useLocalSearchParams() as unknown as Product;

  const theme = useTheme()!.theme;
  const cartHook = useCart();
  const [productCategorie, setProductCategory] =
    useState<ProductsCategory | null>(null);

  const [quantity, setQuantity] = useState("1");
  const [isAddedToCart, setIsAddedToCart] = useState(
    false
  );

  useEffect(() => {
    const fn = async () => {
      const data = await getProductCategory(product.categoryId);
      console.log(data);

      if (data.success && data.category) {
        setProductCategory(data.category);
      }
    };
    fn();
  }, [product.categoryId]);
  
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: product.name,
          headerStyle: { backgroundColor: theme.backgroundColor },
          headerTitleStyle: { fontSize: 16, color: theme.primaryColor },
          headerTintColor: theme.textColor,
        }}
      />
      <SafeAreaView
        style={[
          styles.safeAreaView,
          { backgroundColor: theme.backgroundColor },
        ]}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollViewContentContainer}
        >
          <Card style={styles.imageCard}>
            <Image
              source={{
                uri: `http://${ip}/uploads/products/images/${product.imageUrl}`,
              }}
              style={[styles.image, {}]}
              resizeMode="cover"
            />
          </Card>
          <View style={styles.content}>
            <View style={styles.productDetails}>
              <View style={{ rowGap: 10 }}>
                <BoldText
                  theme={theme}
                  content={product.name}
                  style={styles.productName}
                />
                <LightText
                  theme={theme}
                  content={`${productCategorie?.name ?? ""}`}
                  style={styles.categoryName}
                />
              </View>
              <View style={{ rowGap: 10 }}>
                <Text style={[styles.price, { color: theme.primaryColor }]}>
                  {formatPrice(product.price)} FCFA
                </Text>

                <View style={{ flexDirection: "row", columnGap: 5 }}>
                  <BoldText theme={theme} content="En stock :" />
                  <BoldText
                    theme={theme}
                    content={product.stock.toString()}
                    style={[styles.stock, { color: theme.primaryColor }]}
                  />
                </View>
              </View>
            </View>

            <View style={styles.inputs}>
              <View>
                {/* Pour mettre des inputs pour choisir la couleur du produit. */}
              </View>

              <ThemedCard style={styles.quantityCard} theme={theme}>
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
                      if (Number(value) <= Number(product.stock)) {
                        setQuantity(value);
                      }
                    }}
                    style={[
                      styles.quantityTextInput,
                      { color: theme.primaryColor },
                    ]}
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
            </View>
            <View style={styles.descriptionContainer}>
              <BoldText
                content="Description"
                theme={theme}
                style={styles.descriptionHeading}
              />
              <LightText
                content={product.description}
                theme={theme}
                style={styles.description}
              />
            </View>
          </View>

          <View style={styles.btns}>
            <OutlineButton
              theme={theme}
              onPress={() => {
                if (isAddedToCart)
                  cartHook?.setCart(
                    cartHook.cart.filter((each) => each.id !== product.id),
                  );
                else {
                  cartHook?.setCart([...cartHook.cart, product]);
                }
                setIsAddedToCart(!isAddedToCart);
              }}
              text="Ajouter au panier"
              textStyle={{ color: isAddedToCart ? theme.textColor : theme.primaryColor}}
              icon={<PlusSquare size={24} color={isAddedToCart ? theme.iconColor : theme.primaryColor} />}
              style={[styles.btn, { backgroundColor: isAddedToCart ? theme.primaryColor : theme.backgroundColor}]}
            />
            <ThemedButton
              theme={theme}
              onPress={() => {}}
              text="Acheter"
              icon={<Ionicons name="cart" size={24} color={theme.iconColor} />}
              style={styles.btn}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeAreaView: { flex: 1 },
  container: {
    flex: 1,
  },
  scrollViewContentContainer: {
    padding: 3,
    rowGap: 15,
    maxWidth: 500,
  },
  content: {
    marginHorizontal: 15,
    alignItems: "center",
  },
  imageCard: {
    width: "98%",
    borderRadius: 15,
    overflow: "hidden",
    alignSelf: "center",
  },
  image: {
    width: "100%",
    height: 400,
    maxHeight: 500,
    resizeMode: "cover",
  },
  productDetails: {
    width: "100%",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    columnGap: 5,
  },
  price: {
    fontWeight: "900",
    fontSize: 16,
  },
  productName: {
    fontSize: 18,
    maxWidth: "80%",
  },
  categoryName: {
    opacity: 0.5,
    fontSize: 14,
  },
  inputs: {
    flexDirection: "row",
    width: "100%",
    alignContent: "center",
    justifyContent: "space-between",
  },
  quantityTextInput: {
    width: 50,
    height: 50,
    textAlign: "center",
  },
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
  quantityIcons: {},
  stock: {
    fontSize: 16,
  },
  iconCard: {
    borderRadius: 8,
  },
  descriptionContainer: {
    width: "100%",
    rowGap: 15,
  },
  descriptionHeading: {
    fontSize: 16,
  },
  description: {
    fontSize: 14,
    opacity: 0.5,
  },
  btns: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    alignSelf: "center",
  },
  btn: {
    width: "48%",
    padding: 5,
    maxWidth: 300,
    elevation: 3,
  },
});

export default ProductScreen;
