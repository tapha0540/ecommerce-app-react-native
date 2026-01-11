import { Stack } from "expo-router";
import { ThemeContextProvider } from "../hooks/useColorsheme";
import { UserContextProvider } from "@/hooks/userHooks";

const RootLayout = () => {
  return (
    <ThemeContextProvider>
      <UserContextProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="signin" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </UserContextProvider>
    </ThemeContextProvider>
  );
};

export default RootLayout;
