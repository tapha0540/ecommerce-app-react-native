import { Tabs } from "expo-router";
import { StatusBar, useColorScheme } from "react-native";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <StatusBar barStyle={ useColorScheme() === 'light' ? 'light-content' : 'dark-content'} />
      <Tabs.Screen name="home" options={{ tabBarLabel: 'Accueil'}} />
      <Tabs.Screen name="shopping" options={{ tabBarLabel: 'Shopping'}} />
      <Tabs.Screen name="favourite" options={{ tabBarLabel: 'Favoris'}} />
      <Tabs.Screen name="account" options={{ tabBarLabel: 'Compte'}} />
    </Tabs>
  );
};

export default TabsLayout;
