import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

const ProductLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
        statusBarStyle: useColorScheme() === "light" ? "dark" : "light",
      }}
    >
      <Stack.Screen name="[id]" />
    </Stack>
  );
};

export default ProductLayout;
