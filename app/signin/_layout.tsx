import { useTheme } from "@/hooks/useColorsheme";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext(Navigator);

export default function TopTabsLayout() {
  const theme = useTheme()!.theme;
  return (
    <MaterialTopTabs
      screenOptions={{
        tabBarActiveTintColor: theme.textColor,
        tabBarStyle: {
          backgroundColor: theme.backgroundColor,
          height: 50,
          width: "90%",
          alignSelf: "center",
          borderRadius: 25,
        },
        tabBarIndicatorStyle: {
          width: "49%",
          height: "85%",
          borderRadius: 25,
          backgroundColor: theme.primaryColor,
          marginBottom: "7.5%",
          marginLeft: "0.5%",
          marginRight: "0.5%",
        },
        sceneStyle: { backgroundColor: theme.backgroundColor },
        // tabBarContentContainerStyle: { backgroundColor: theme.backgroundColor },
      }}
      style={{
        flex: 1,
        marginTop: 30,
        borderRadius: 20,
      }}
    >
      <MaterialTopTabs.Screen name="index" options={{ title: "Connexion" }} />
      <MaterialTopTabs.Screen
        name="signup"
        options={{ title: "Inscription" }}
      />
    </MaterialTopTabs>
  );
}
