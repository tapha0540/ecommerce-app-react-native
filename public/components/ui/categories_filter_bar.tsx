import getAllProductsCategories from "@/services/api/products_categories/get_all_products_categories";
import { SearchX } from "lucide-react-native";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Vibration, View } from "react-native";
import ProductsCategorie from "../interfaces/api/products_categorie";
import Theme from "../interfaces/themes";
import ThemeActivityIndicator from "./activity_indicator_container";
import GetIcon from "./get_icon";
import { BoldText, LightText, PressableText } from "./text";
import { ThemedCard } from "./themed_card";

const ProductsCategoriesFilter = ({
  theme,
  selectedCategorieId,
  setSelectedCategorieId,
}: {
  theme: Theme;
  selectedCategorieId: number;
  setSelectedCategorieId: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [productsCategorie, setProductsCategorie] = useState<
    ProductsCategorie[] | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);

  const [seeAll, setSeeAll] = useState(false);

  useEffect(() => {
    const fn = async () => {
      const data = await getAllProductsCategories();
      if (data.productsCategories) {
        setProductsCategorie(data.productsCategories);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
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
          <PressableText
            onPress={() => {
              setSeeAll(!seeAll);
            }}
            content="Voir plus"
            theme={theme}
          />
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
              icon: "FontAwesome6:circle-dot",
              description: "Categorie par défaut.",
            } as ProductsCategorie,
            ...productsCategorie,
          ]}
          renderItem={({ item }) => {
            const isSelected = selectedCategorieId === item.id;
            return (
              <ThemedCard
                theme={theme}
                onPress={() => {
                  setSelectedCategorieId(item.id);
                  Vibration.vibrate(45);
                }}
                style={[
                  styles.categoriesCard,
                  {
                    backgroundColor: isSelected
                      ? theme.primaryColor
                      : theme.secondaryColor,
                    borderColor: theme.primaryColor,
                  },
                ]}
              >
                <GetIcon
                  size={24}
                  theme={theme}
                  icon={item.icon}
                  isSelected={isSelected}
                />
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
              </ThemedCard>
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
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 15,
  },
  HeadingTxt: {
    fontSize: 18,
  },
  categoriesCard: {
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    justifyContent: "center",
    alignContent: "center",
    maxWidth: 200,
    borderWidth: 1,
  },
  categoriesTxt: {
    marginTop: 3,
    fontSize: 12,
  },
  flatList: { padding: 5 },
  flatListContentContainerStyle: {
    marginTop: 5,
    gap: 15,
    padding: 5,
    justifyContent: "center",
    alignContent: "center",
  },
});

export default ProductsCategoriesFilter;
