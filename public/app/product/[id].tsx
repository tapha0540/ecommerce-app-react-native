import Product from "@/components/interfaces/api/product";
import { useTheme } from "@/hooks/useColorsheme";
import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProductScreen = () => {
  const product = useLocalSearchParams() as unknown as Product;

  const theme = useTheme()!.theme;

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: product.name,
          headerStyle: { backgroundColor: theme.backgroundColor },
          headerTitleStyle: { fontSize: 16 },
          headerTintColor: theme.textColor,
        }}
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
        <ScrollView></ScrollView>
      </SafeAreaView>
    </>
  );
};

export default ProductScreen;
