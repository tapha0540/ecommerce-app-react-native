import getAllProductsCategories from "@/services/products_categories/get_all_products_categories";
import { SearchX } from "lucide-react-native";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { Card } from "react-native-paper";
import ProductsCategorie from "../interfaces/api/products_categorie";
import Theme from "../interfaces/themes";
import ThemeActivityIndicator from "./activity_indicator_container";
import { BoldText, LightText } from "./text";

const ProductsCategoriesFilter = ({ theme }: { theme: Theme }) => {
  const [productsCategorie, setProductsCategorie] = useState<
    ProductsCategorie[] | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategorieId, setSelectedCategorieId] = useState<number>(-1);

  useEffect(() => {
    const fn = async () => {
      const data = await getAllProductsCategories();
      if (data.productsCategories) {
        setProductsCategorie(data.productsCategories);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };
    fn();
  }, []);
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ThemeActivityIndicator
          loading={isLoading}
          size="large"
          theme={theme}
          text="Chargement..."
        />
      </View>
    );
  }
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

      {!productsCategorie || productsCategorie.length === 0 ? (
        <View style={styles.noResult}>
          <SearchX size={50} color={theme.secondaryColor} />
          <BoldText
            theme={theme}
            content={"Pas de resultat"}
            style={styles.HeadingTxt}
          />
        </View>
      ) : (
        <FlatList
          data={[
            {
              id: -1,
              name: "Tous",
              // description: "Categorie par défaut.",
            } as ProductsCategorie,
            ...productsCategorie,
          ]}
          renderItem={({ item }) => {
            const isSelected = selectedCategorieId === item.id;
            return (
              <Card
                onPress={() => {
                  setSelectedCategorieId(item.id);
                }}
                style={[
                  styles.categoriesCard,
                  {
                    backgroundColor: isSelected
                      ? theme.primaryColor
                      : theme.secondaryColor,
                  },
                ]}
              >
                <LightText
                  style={[
                    styles.categoriesTxt,
                    isSelected && {
                      color: theme.backgroundColor,
                    },
                  ]}
                  content={item.name}
                  theme={theme}
                />
              </Card>
            );
          }}
          keyExtractor={({ id }) => {
            return String(id);
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          indicatorStyle="black"
          contentContainerStyle={styles.flatListContentContainerStyle}
          style={styles.flatList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noResult: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 15,
  },
  headingTxtContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  HeadingTxt: {
    fontSize: 18,
  },
  categoriesCard: {
    padding: 12,
    borderRadius: 15,
  },
  categoriesTxt: {},
  flatList: { padding: 5 },
  flatListContentContainerStyle: {
    marginTop: 15,
    columnGap: 15,
    padding: 10,
  },
});

export default ProductsCategoriesFilter;
