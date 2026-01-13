import { UserContextProvider } from "@/hooks/userHooks";
import { Stack } from "expo-router";
import { ThemeContextProvider } from "../hooks/useColorsheme";

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
