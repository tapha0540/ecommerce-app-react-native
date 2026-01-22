import { CartContextProvider } from "@/hooks/cart";
import { UserContextProvider } from "@/hooks/userHooks";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { ThemeContextProvider } from "../hooks/useColorsheme";

const RootLayout = () => {
  return (
    <ThemeContextProvider>
      <UserContextProvider>
        <CartContextProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              headerTitleAlign: "center",
              statusBarStyle: useColorScheme() === "light" ? "dark" : "light",
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="product" />
          </Stack>
        </CartContextProvider>
      </UserContextProvider>
    </ThemeContextProvider>
  );
};

export default RootLayout;
