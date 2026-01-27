import CartItem from "@/components/interfaces/cart_item";
import ThemeActivityIndicator from "@/components/ui/activity_indicator_container";
import QuantityInput from "@/components/ui/quantity_input";
import { BoldText, LightText } from "@/components/ui/text";
import { useCart } from "@/hooks/cart";
import { useTheme } from "@/hooks/useColorsheme";
import saveCart from "@/services/cart/save_cart";
import formatPrice from "@/services/helpers/format_price";
import ip from "@/services/ip";
import { SearchXIcon, Trash2Icon } from "lucide-react-native";

import { useEffect, useState } from "react";
import { AppState, Image, StyleSheet, View } from "react-native";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import Swipeable, {
  SwipeDirection,
} from "react-native-gesture-handler/ReanimatedSwipeable";
import { SafeAreaView } from "react-native-safe-area-context";

const ShoppingScreen = () => {
  const cartHook = useCart();
  const theme = useTheme()!.theme;
  const [isLoading, setIsloading] = useState(false);
  const [total, setTotal] = useState(
    formatPrice(
      cartHook!.cart.reduce(
        (total, cartItem) =>
          total + cartItem.quantity * Number(cartItem.product.price),
        0,
      ),
    ),
  );

  useEffect(() => {
    const sub = AppState.addEventListener("change", (state) => {
      if (state === "background" || state === "inactive") {
        saveCart(cartHook!.cart);
      }
    });

    return () => sub.remove();
  }, [cartHook]);

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
      >
        <View
          style={[
            styles.swipeableCard,
            {
              backgroundColor: theme.secondaryColor,
              borderColor: theme.primaryColor,
              borderWidth: theme.cardBorderWidth,
            },
          ]}
        >
          <View style={[styles.imgContainer]}>
            <Image
              source={{
                uri: `http://${ip}/uploads/products/images/${item.product.imageUrl}`,
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
                style={styles.productPrice}
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
        </View>
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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          padding: 10,
        }}
      >
        <LightText theme={theme} content="Total :" />
        <BoldText
          theme={theme}
          style={[styles.productPrice, { color: theme.primaryColor }]}
          content={`${total} FCFA`}
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
  },
  swipeableCard: {
    flexDirection: "row",
    width: "100%",
    maxWidth: 350,
    height: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 12,
    elevation: 5,
    padding: 5,
    columnGap: 5,
  },
  imgContainer: {
    width: 125,
    height: "90%",
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
  },
  renderRightActions: {
    width: "80%",
    height: "100%",
    alignItems: "flex-end",
    justifyContent: "center",
    alignSelf: "center",
    padding: 25,
    borderRadius: 15,
    elevation: 2,
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
    backgroundColor: "green",
    borderRadius: 15,
    position: "fixed",
    bottom: 0,
  },
});

export default ShoppingScreen;
