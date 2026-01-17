import { useTheme } from "@/hooks/useColorsheme";
import { Entypo, Feather, FontAwesome, Octicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { CircleUser, HeartIcon } from "lucide-react-native";

const TabsLayout = () => {
  const theme = useTheme()!.theme;
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        animation: "shift",
        tabBarIconStyle: {
          color: theme?.textColor,
        },
        tabBarActiveTintColor: theme.primaryColor,
        tabBarInactiveTintColor: theme.iconColor,
        tabBarStyle: {
          backgroundColor: theme.backgroundColor,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Accueil",
          tabBarIcon: ({ color, focused, size }) => (
            <Octicons
              name={focused ? "home-fill" : "home"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="shopping"
        options={{
          tabBarLabel: "Shopping",
          tabBarIcon: ({ focused, size, color }) =>
            focused ? (
              <Entypo name="shopping-bag" color={color} size={size} />
            ) : (
              <Feather name="shopping-bag" color={color} size={size} />
            ),
        }}
      />
      <Tabs.Screen
        name="favourite"
        options={{
          tabBarLabel: "Favoris",
          tabBarIcon: ({ color, focused, size }) => (
            <HeartIcon
              size={size}
              color={color}
              fill={focused ? color : theme.backgroundColor}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          tabBarLabel: "Compte",
          tabBarIcon: ({ color, focused, size }) =>
            focused ? (
              <FontAwesome name="user-circle" color={color} size={size} />
            ) : (
              <CircleUser size={size} color={color} />
            ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
