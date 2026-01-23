import Product from "@/components/interfaces/api/product";
import User from "@/components/interfaces/api/user";
import Theme from "@/components/interfaces/themes";
import ThemeActivityIndicator from "@/components/ui/activity_indicator_container";
import ProductsCategoriesFilter from "@/components/ui/categories_filter_bar";
import ProductCard from "@/components/ui/product_card";
import SearchBar from "@/components/ui/search_bar";
import { LightText } from "@/components/ui/text";
import { ThemedCard } from "@/components/ui/themed_card";
import { useCart } from "@/hooks/cart";
import { useTheme } from "@/hooks/useColorsheme";
import { useUser } from "@/hooks/userHooks";
import getSomeProductsForEachCategories from "@/services/api/products/get_some_products_for_each_category";
import { filterProductsByCategorieId } from "@/services/helpers/filter_search";
import ip from "@/services/ip";
import { Feather } from "@expo/vector-icons";
import { Redirect } from "expo-router";
import { BellIcon, SquareUserRoundIcon } from "lucide-react-native";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
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
          <ThemedCard
            theme={theme}
            style={styles.card}
            // onPress={() => {}}
          >
            <BellIcon size={25} color={theme.iconColor} />
          </ThemedCard>

          <ThemedCard theme={theme} style={styles.card} onPress={() => {}}>
            <Feather name="shopping-bag" color={theme.iconColor} size={25} />
          </ThemedCard>
        </View>
      </View>
      <SearchBar theme={theme} />
    </View>
  );
};

const HomeScreen = () => {
  const user = useUser()!.user;
  const theme = useTheme()!.theme;
  const cartHook = useCart();

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
  const filteredProducts = filterProductsByCategorieId(
    products,
    selectedCategorieId,
  );

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

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

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={({ item }) => (
            <ProductCard
              theme={theme}
              product={item}
              AddToCart={() => {
                cartHook?.setCart([...cartHook.cart, item]);
                // console.log(cartHook?.cart);
              }}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
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
          numColumns={2}
          contentContainerStyle={styles.productsCardContainer}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Loading />}
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
  greeting: {
    fontWeight: "900",
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
  productsCardContainer: {
    padding: 8,
    rowGap: 15,
  },
  row: {
    justifyContent: "space-between", // espace égal entre les cartes
    marginBottom: 15,
  },
});
export default HomeScreen;
