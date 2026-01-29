import Product from "@/components/interfaces/api/product";
import ProductsCategory from "@/components/interfaces/api/products_categorie";
import ThemeActivityIndicator from "@/components/ui/activity_indicator_container";
import { OutlineButton, ThemedButton } from "@/components/ui/buttons";
import PressableIcon from "@/components/ui/Pressable_icon_card";
import QuantityInput from "@/components/ui/quantity_input";
import { BoldText, LightText } from "@/components/ui/text";
import { useCart } from "@/hooks/cart";
import { useTheme } from "@/hooks/useColorsheme";
import getProduct from "@/services/api/products/get_product";
import getProductCategory from "@/services/api/products_categories/get_category";
import formatPrice from "@/services/helpers/format_price";
import ip from "@/services/ip";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { MinusSquareIcon, PlusSquareIcon, Trash2Icon } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, Vibration, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Card } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const ProductScreen = () => {
  const { id } = useLocalSearchParams() as unknown as {
    id: number;
  };
  const [product, setProduct] = useState<Product | null>(null);
  const theme = useTheme()!.theme;
  const cartHook = useCart();
  const [productCategorie, setProductCategory] =
    useState<ProductsCategory | null>(null);

  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [quantity, setQuantity] = useState("1");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fn = async () => {
      const getProductData = await getProduct(id);
      if (getProductData.product) {
        setProduct(getProductData.product);

        setIsAddedToCart(
          cartHook!.cart.some(
            (cartItem) => cartItem.product.id === product?.id,
          ),
        );

        const getProductCategoryData = await getProductCategory(
          getProductData.product.categoryId,
        );

        if (getProductCategoryData.success && getProductCategoryData.category) {
          setProductCategory(getProductCategoryData.category);
          setTimeout(() => {
            setIsLoading(false);
          }, 500);
        }

        if (isAddedToCart) {
          const index: number = cartHook!.cart.findIndex(
            (item) => item.product.id === product?.id,
          );
          if (index !== -1) setQuantity(String(cartHook?.cart[index].quantity));
        }
      }
    };
    fn();
  }, [product, id, cartHook, isAddedToCart]);

  if (!product || isLoading) {
    return (
      <>
        <Stack.Screen
          options={{
            headerTitle: "Chargement",
            headerStyle: { backgroundColor: theme.backgroundColor },
            headerTitleStyle: { fontSize: 16, color: theme.primaryColor },
            headerTintColor: theme.textColor,
          }}
        />
        <View
          style={[styles.container, { backgroundColor: theme.backgroundColor }]}
        >
          <ThemeActivityIndicator
            loading={isLoading}
            size="large"
            text=""
            theme={theme}
          />
        </View>
      </>
    );
  }
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: product.name,
          headerStyle: { backgroundColor: theme.backgroundColor },
          headerTitleStyle: { fontSize: 16, color: theme.primaryColor },
          headerTintColor: theme.textColor,
          headerRight: () => (
            <PressableIcon
              icon={
                <Ionicons
                  name="cart-outline"
                  color={theme.iconColor}
                  size={25}
                />
              }
              theme={theme}
              onPress={() => {
                Vibration.vibrate(55);
                router.push("/(tabs)/cart");
              }}
              style={{ padding: 5, width: 45, height: 45 }}
            />
          ),
        }}
      />
      <SafeAreaView
        style={[
          styles.safeAreaView,
          { backgroundColor: theme.backgroundColor },
        ]}
      >
        <KeyboardAwareScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollViewContentContainer}
          enableOnAndroid={true}
          extraScrollHeight={20}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Card style={styles.imageCard}>
            <Image
              source={{
                uri: `http://${ip}/uploads/products/images/${product.imageUrl}`,
              }}
              style={styles.image}
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

              <QuantityInput
                product={product}
                quantity={quantity}
                setQuantity={setQuantity}
                theme={theme}
              />
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
                    cartHook.cart.filter(
                      (each) => each.product.id !== product.id,
                    ),
                  );
                else {
                  cartHook?.setCart([
                    ...cartHook.cart,
                    { quantity: Number(quantity), product },
                  ]);
                }
                setIsAddedToCart(!isAddedToCart);
              }}
              text={isAddedToCart ? "Supprimer" : "Ajouter au panier"}
              textStyle={{
                color: theme.primaryColor,
              }}
              icon={
                isAddedToCart ? (
                  <Trash2Icon size={24} color={theme.primaryColor} />
                ) : (
                  <PlusSquareIcon size={24} color={theme.primaryColor} />
                )
              }
              style={styles.btn}
            />
            <ThemedButton
              theme={theme}
              onPress={() => {
                
                setTimeout(() => router.push('/(tabs)/order'), 250);
              }}
              text="Commander"
              icon={<Ionicons name="cart" size={24} color={theme.iconColor} />}
              style={styles.btn}
            />
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,

    padding: 3,
    maxWidth: 500,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollViewContentContainer: {
    rowGap: 15,
  },
  content: {
    marginHorizontal: 15,
    alignItems: "center",
    padding: 2,
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
    maxWidth: "70%",
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
    margin: 10,
    padding: 2,
  },
  btn: {
    width: "48%",
    padding: 5,
    maxWidth: 300,
    elevation: 3,
  },
});

export default ProductScreen;
