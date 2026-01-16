import getAllProductsCategories from "@/services/products_categories/get_all_products_categories";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { Card } from "react-native-paper";
import ProductsCategorie from "../interfaces/api/products_categorie";
import Theme from "../interfaces/themes";
import { BoldText, LightText } from "./text";

const ProductsCategoriesFilter = ({ theme }: { theme: Theme }) => {
  const [productsCategorie, setProductsCategorie] = useState<
    ProductsCategorie[] | null
  >(null);

  useEffect(() => {
    const fn = async () => {
      const data = await getAllProductsCategories();
      if (data.productsCategories) {
        setProductsCategorie(data.productsCategories);
      }
    };
    fn();
  }, []);

  if (!productsCategorie) {
    return <View style={styles.container}></View>;
  } else
    return (
      <View style={styles.container}>
        <View style={styles.headingTxtContainer}>
          <BoldText
            content="Categories"
            theme={theme}
            style={styles.HeadingTxt}
          />
          <Pressable>
            <LightText content="Voir plus" theme={theme} />
          </Pressable>
        </View>

        <FlatList
          data={productsCategorie}
          renderItem={({ item }) => (
            <Card
              onPress={() => {}}
              style={[
                styles.categoriesCard,
                { backgroundColor: theme.secondaryColor },
              ]}
            >
              <LightText
                style={[styles.categoriesTxt]}
                content={item.name}
                theme={theme}
              />
            </Card>
          )}
          keyExtractor={({ id }) => {
            return String(id);
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headingTxtContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  HeadingTxt: {
    fontSize: 18,
  },
  categoriesCard: {},
  categoriesTxt: {},
});

export default ProductsCategoriesFilter;
