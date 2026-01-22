import ThemeActivityIndicator from "@/components/ui/activity_indicator_container";
import { useTheme } from "@/hooks/useColorsheme";
import { Redirect } from "expo-router";
import { View } from "react-native";
import { useUser } from "../hooks/userHooks";

const Index = () => {
  const userHook = useUser();
  const theme = useTheme()!.theme;

  if (!userHook || userHook.loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ThemeActivityIndicator
          loading={userHook!.loading}
          size="large"
          text="Chargement..."
          theme={theme}
        />
      </View>
    );
  }

  return userHook.user ? (
    <Redirect href="/(tabs)/home" />
  ) : (
    <Redirect href="/(auth)/login" />
  );
};

export default Index;
