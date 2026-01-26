import { useCart } from "@/hooks/cart";
import { FlatList, StyleSheet } from "react-native";
import Product from "../interfaces/api/product";
import Theme from "../interfaces/themes";
import ProductCard from "./product_card";

const ProductsCards = ({
  theme,
  filteredProducts,
  ListHeaderComponent,
  Loading,
}: {
  filteredProducts?: Product[] | null;
  theme: Theme;
  ListHeaderComponent: any;
  Loading: any;
}) => {
  const cartHook = useCart();

  return (
    <FlatList
      data={filteredProducts}
      renderItem={({ item }) => (
        <ProductCard
          theme={theme}
          product={item}
          AddToCart={() => {
            cartHook?.setCart([...cartHook.cart, { product: item, quantity: 1}]);
          }}
          removeFromCart={() => {
            cartHook?.setCart(
              cartHook!.cart.filter((each) => each.product.id !== item.id),
            );
          }}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={ListHeaderComponent}
      numColumns={2}
      contentContainerStyle={styles.productsCardContainer}
      columnWrapperStyle={styles.row}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={Loading}
    />
  );
};

const styles = StyleSheet.create({
  productsCardContainer: {
    padding: 8,
    rowGap: 15,
  },
  row: {
    justifyContent: "space-between", // espace égal entre les cartes
    marginBottom: 15,
  },
});

export default ProductsCards;
