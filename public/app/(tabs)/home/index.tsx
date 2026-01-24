import Product from "@/components/interfaces/api/product";
import User from "@/components/interfaces/api/user";
import Theme from "@/components/interfaces/themes";
import ThemeActivityIndicator from "@/components/ui/activity_indicator_container";
import ProductsCategoriesFilter from "@/components/ui/categories_filter_bar";
import PressableIcon from "@/components/ui/Pressable_icon_card";
import ProductsCards from "@/components/ui/products_cards";
import SearchBar from "@/components/ui/search_bar";
import { LightText } from "@/components/ui/text";
import { useCart } from "@/hooks/cart";
import { useTheme } from "@/hooks/useColorsheme";
import { useUser } from "@/hooks/userHooks";
import getSomeProductsForEachCategories from "@/services/api/products/get_some_products_for_each_category";
import saveCart from "@/services/cart/save_cart";
import { filterProductsByCategorieId } from "@/services/helpers/filter_search";
import ip from "@/services/ip";
import { Ionicons } from "@expo/vector-icons";
import { Redirect } from "expo-router";
import { BellIcon, SquareUserRoundIcon } from "lucide-react-native";
import { useEffect, useState } from "react";
import { AppState, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TopContainer = ({ user, theme }: { user: User; theme: Theme }) => {
  return (
    <View style={[styles.topContainer, styles.body]}>
      <View style={styles.profileContainer}>
        <View style={styles.profile}>
          {user.profileImgUrl ? (
            <View style={styles.profileImgContainer}>
              <Image
                source={{ uri: `http://${ip}/uploads/users/` }}
                style={styles.profileImg}
                resizeMode="cover"
              />
            </View>
          ) : (
            <SquareUserRoundIcon
              width={60}
              height={60}
              color={theme.iconColor}
            />
          )}
          <View style={styles.profileTexts}>
            <LightText content="Bienvenue " theme={theme} />
            <Text
              style={[styles.profileUserName, { color: theme.primaryColor }]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >{`${user.firstName} ${user.lastName}`}</Text>
          </View>
        </View>

        <View style={styles.iconsContainer}>
          <PressableIcon
            icon={<BellIcon size={25} color={theme.iconColor} />}
            theme={theme}
            onPress={() => {}}
            style={styles.card}
          />

          <PressableIcon
            icon={
              <Ionicons name="cart-outline" color={theme.iconColor} size={25} />
            }
            theme={theme}
            onPress={() => {}}
            style={styles.card}
          />
        </View>
      </View>
      <SearchBar theme={theme} />
    </View>
  );
};

const HomeScreen = () => {
  const user = useUser()!.user;
  const theme = useTheme()!.theme;
  const cart = useCart()!.cart;

  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[] | null>(null);
  const [selectedCategorieId, setSelectedCategorieId] = useState<number>(-1);

  useEffect(() => {
    const fn = async () => {
      const data: Product[] | null = await getSomeProductsForEachCategories();
      setProducts(data);
      if (data) {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };
    fn();
  }, []);

  useEffect(() => {
    const sub = AppState.addEventListener("change", (state) => {
      if (state === "background" || state === "inactive") {
        saveCart(cart);
      }
    });

    return () => sub.remove();
  }, [cart]);

  const filteredProducts = filterProductsByCategorieId(
    products,
    selectedCategorieId,
  );

  const Loading = () => (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ThemeActivityIndicator
        loading={isLoading}
        size="large"
        text="Chargement..."
        theme={theme}
      />
    </View>
  );

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <ProductsCards
          ListHeaderComponent={
            <>
              <TopContainer user={user} theme={theme} />
              <ProductsCategoriesFilter
                theme={theme}
                selectedCategorieId={selectedCategorieId}
                setSelectedCategorieId={setSelectedCategorieId}
              />
            </>
          }
          Loading={Loading}
          filteredProducts={filteredProducts}
          theme={theme}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    marginTop: 5,
    marginHorizontal: 15,
    padding: 3,
    rowGap: 25,
  },
  topContainer: {
    width: "auto",
    height: "auto",
    rowGap: 15,
    alignItems: "center",
    justifyContent: "space-around",
    padding: 3,
  },
  profileContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    columnGap: 10,
  },
  profileImg: { width: "100%", height: "100%" },
  profileImgContainer: { width: 60, height: 60 },
  iconsContainer: {
    flexDirection: "row",
    columnGap: 10,
    justifyContent: "space-between",
    padding: 5,
  },
  card: {
    padding: 10,
  },
  profile: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    columnGap: 8,
  },
  profileTexts: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    rowGap: 10,
  },
  profileUserName: {
    letterSpacing: 1.5,
    fontSize: 14,
  },
  middleContainer: {},
  noResult: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 15,
  },
  headingTxt: {
    fontSize: 18,
  },
});
export default HomeScreen;
