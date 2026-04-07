import CartItem from "@/components/interfaces/cart_item";
import ThemeActivityIndicator from "@/components/ui/activity_indicator_container";
import { OutlineButton, ThemedButton } from "@/components/ui/buttons";
import QuantityInput from "@/components/ui/quantity_input";
import { BoldText, LightText } from "@/components/ui/text";
import { useCart } from "@/hooks/cart";
import { useTheme } from "@/hooks/useColorsheme";
import OrderProducts from "@/services/api/orders/order_products";
import saveCart from "@/services/cart/save_cart";
import formatPrice from "@/services/helpers/format_price";
import ip from "@/services/ip";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { SearchXIcon, Trash2Icon } from "lucide-react-native";

import { useEffect, useState } from "react";
import {
  AppState,
  Image,
  StyleSheet,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import Swipeable, {
  SwipeDirection,
} from "react-native-gesture-handler/ReanimatedSwipeable";
import { SafeAreaView } from "react-native-safe-area-context";

const ShoppingScreen = () => {
  const cartHook = useCart();
  const theme = useTheme()!.theme;
  const [isLoading, setIsloading] = useState(false);
  const [total, setTotal] = useState("0");

  useEffect(() => {
    const sub = AppState.addEventListener("change", (state) => {
      if (state === "background" || state === "inactive") {
        saveCart(cartHook!.cart);
      }
    });
    setTotal(
      formatPrice(
        cartHook!.cart.reduce(
          (total, cartItem) =>
            total + cartItem.quantity * Number(cartItem.product.price),
          0,
        ),
      ),
    );

    return () => sub.remove();
  }, [cartHook]);

  const orderAllProductsFromCart = async () => {
    const orderData = cartHook!.cart.map((cartItem) => {
      return { productId: cartItem.product.id, quantity: cartItem.quantity };
    });
    await OrderProducts(orderData);
  };

  const renderRightActions = () => (
    <View
      style={[styles.renderRightActions, { backgroundColor: theme.errorColor }]}
    >
      <Trash2Icon size={40} color={theme.backgroundColor} />
    </View>
  );

  const Loading = () => (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.backgroundColor,
        },
      ]}
    >
      <ThemeActivityIndicator
        loading
        size="large"
        theme={theme}
        text="Chargement..."
      />
    </View>
  );
  const SwipeableComponent = ({ item }: { item: CartItem }) => {
    const [quantity, setQuantity] = useState(String(item.quantity));

    return (
      <Swipeable
        containerStyle={styles.swipeable}
        childrenContainerStyle={styles.childrenContainerStyle}
        renderRightActions={renderRightActions}
        onSwipeableOpen={(direction) => {
          if (direction === SwipeDirection.LEFT) {
            cartHook?.setCart(
              cartHook.cart.filter(
                (cartItem) => cartItem.product.id !== item.product.id,
              ),
            );
            saveCart(cartHook!.cart);
          }
          setIsloading(true);
          setTimeout(() => setIsloading(false), 500);
        }}
        friction={2}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={[
            styles.swipeableCard,
            {
              backgroundColor: theme.secondaryColor,
              borderColor: theme.primaryColor,
              borderWidth: theme.cardBorderWidth,
            },
          ]}
          onPress={() => {
            Vibration.vibrate(55);
            router.push({
              pathname: "/product/[id]",
              params: { id: item.product.id },
            });
          }}
        >
          <View style={[styles.imgContainer]}>
            <Image
              source={{
                uri: `http://${ip}/public/images/products/${item.product.imageUrl}`,
              }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>

          <View style={styles.detailsContainer}>
            <BoldText
              theme={theme}
              content={item.product.name}
              style={styles.productName}
            />

            <View
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                rowGap: 8,
              }}
            >
              <BoldText
                theme={theme}
                content={`${formatPrice(item.product.price)} FCFA`}
                style={[styles.productPrice, { color: theme.primaryColor }]}
              />
              <QuantityInput
                product={item.product}
                quantity={quantity}
                setQuantity={(value) => {
                  item.quantity = Number(value);
                  setQuantity(value);
                  saveCart(cartHook!.cart);
                  setTotal(
                    formatPrice(
                      cartHook!.cart.reduce(
                        (total, cartItem) =>
                          total +
                          cartItem.quantity * Number(cartItem.product.price),
                        0,
                      ),
                    ),
                  );
                }}
                theme={theme}
                style={styles.quantityInput}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Swipeable>
    );
  };

  const ListEmptyComponent = () => (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <SearchXIcon size={50} color={theme.iconColor} />
      <BoldText
        theme={theme}
        content="Pas de produit dans le panier !"
        style={styles.noResult}
      />
    </View>
  );

  const ListFooterComponent = () => (
    <View
      style={[
        styles.listFooterComponent,
        {
          backgroundColor: theme.backgroundColor,
          borderWidth: theme.cardBorderWidth,
          borderColor: theme.primaryColor,
        },
      ]}
    >
      <View style={styles.totalTxtConatiner}>
        <LightText theme={theme} content="Total :" />
        <BoldText
          theme={theme}
          style={[styles.productPrice, { color: theme.primaryColor }]}
          content={`${total} FCFA`}
        />
      </View>

      <View style={styles.totalTxtConatiner}>
        <LightText theme={theme} content="Frais de livraison :" />
        <BoldText
          theme={theme}
          style={[styles.productPrice, { color: theme.primaryColor }]}
          content={`${cartHook!.cart.length * 500} FCFA`}
        />
      </View>

      <View style={styles.totalTxtConatiner}>
        <OutlineButton
          text="Supprimer tous"
          icon={<Trash2Icon size={24} color={theme.primaryColor} />}
          onPress={(): void => {
            setIsloading(true);
            setTimeout(() => setIsloading(false), 250);
            cartHook!.setCart([]);
          }}
          theme={theme}
          style={styles.btns}
          textStyle={styles.btnsTxt}
        />
        <ThemedButton
          text="Commander tous"
          icon={
            <MaterialIcons
              name="shopping-cart"
              size={24}
              color={theme.iconColor}
            />
          }
          style={styles.btns}
          onPress={async () => {
            setIsloading(true);
            Vibration.vibrate(75);
            await orderAllProductsFromCart();
            setTimeout(() => {
              setIsloading(false);
              router.push("/(tabs)/order");
            }, 500);
            cartHook!.setCart([]);
          }}
          theme={theme}
          textStyle={styles.btnsTxt}
        />
      </View>
    </View>
  );

  return (
    <GestureHandlerRootView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <SafeAreaView>
        <FlatList
          data={cartHook?.cart}
          ListHeaderComponent={() => (
            <View>
              <BoldText
                theme={theme}
                content="Mon panier"
                style={[styles.heading, { color: theme.primaryColor }]}
              />
              {isLoading && <Loading />}
            </View>
          )}
          renderItem={({ item }) => <SwipeableComponent item={item} />}
          keyExtractor={({ product }) => product.id.toString()}
          contentContainerStyle={styles.contentContainerStyle}
          ListEmptyComponent={ListEmptyComponent}
          style={{ padding: 5 }}
          showsVerticalScrollIndicator={false}
        />
        <ListFooterComponent />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  swipeable: {
    width: "100%",
    maxHeight: 150,
    alignSelf: "center",
    padding: 5,
  },
  swipeableCard: {
    flexDirection: "row",
    width: "100%",
    maxWidth: 350,
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 12,
    elevation: 5,
    padding: 3,
    columnGap: 5,
  },
  renderRightActions: {
    maxHeight: 150,
    maxWidth: 350,
    width: "90%",
    height: "90%",
    alignItems: "flex-end",
    justifyContent: "center",
    alignSelf: "center",
    padding: 25,
    borderRadius: 15,
    elevation: 2,
  },
  imgContainer: {
    width: 145,
    height: "100%",
  },
  detailsContainer: {
    maxWidth: 250,
    height: "100%",
    justifyContent: "space-between",
    padding: 5,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
    resizeMode: "cover",
  },
  contentContainerStyle: {
    rowGap: 15,
    padding: 3,
    marginBottom: 20,
  },
  childrenContainerStyle: { justifyContent: "center", alignItems: "center" },
  productName: {
    fontSize: 14,
  },
  productPrice: {
    fontSize: 16,
  },
  quantityInput: {
    padding: 2,
    height: 45,
  },
  noResult: {
    fontSize: 16,
  },
  heading: {
    fontSize: 16,
    textAlign: "center",
    margin: 2,
  },
  listFooterComponent: {
    width: "100%",
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    position: "fixed",
    bottom: -15,
    padding: 5,
  },
  totalTxtConatiner: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
  },
  btns: {
    width: "48%",
    maxWidth: 320,
    padding: 5,
  },
  btnsTxt: {
    fontSize: 13,
  },
});

export default ShoppingScreen;
