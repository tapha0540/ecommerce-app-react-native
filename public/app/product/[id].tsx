import Product from "@/components/interfaces/api/product";
import ProductsCategory from "@/components/interfaces/api/products_categorie";
import PressableIcon from "@/components/ui/Pressable_icon_card";
import { BoldText, LightText } from "@/components/ui/text";
import { ThemedCard } from "@/components/ui/themed_card";
import { useTheme } from "@/hooks/useColorsheme";
import getProductCategory from "@/services/api/products_categories/get_category";
import formatPrice from "@/services/helpers/format_price";
import ip from "@/services/ip";
import { Stack, useLocalSearchParams } from "expo-router";
import { MinusIcon, PlusIcon } from "lucide-react-native";
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
  const [productCategorie, setProductCategory] =
    useState<ProductsCategory | null>(null);

  const [quantity, setQuantity] = useState("1");

  useEffect(() => {
    const fn = async () => {
      const data = await getProductCategory(product.categoryId);
      console.log(data);

      if (data.success && data.category) {
        setProductCategory(data.category);
      }
    };
    fn();
  }, []);

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
          <View style={styles.productDetails}>
            <View style={{ rowGap: 10 }}>
              <BoldText theme={theme} content={product.name} />
              <LightText
                theme={theme}
                content={`${productCategorie?.name ?? ""}`}
                style={styles.categoryName}
              />
            </View>

            <Text style={[styles.price, { color: theme.primaryColor }]}>
              {`${formatPrice(product.price)} FCFA`}
            </Text>
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
                    setQuantity(String(Number(quantity) - 1));
                  }}
                  theme={theme}
                  style={styles.iconCard}
                />
                <TextInput
                  value={quantity}
                  onChangeText={setQuantity}
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
                    setQuantity(String(Number(quantity) + 1));
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
    maxWidth: 500,
    justifyContent: "space-around",
    alignItems: "center",
    padding: 3,
    rowGap: 15,
    marginHorizontal: 15,
  },
  imageCard: {
    width: "100%",
    borderRadius: 15,
    overflow: "hidden",
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
  iconCard: {
    borderRadius: 8,
  },
  descriptionContainer: {
    width: "100%",
  },
  descriptionHeading: {
    fontSize: 16
  },
});

export default ProductScreen;
