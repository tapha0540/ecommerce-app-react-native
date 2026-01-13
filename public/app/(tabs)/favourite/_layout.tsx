import { Stack } from "expo-router";

const FavouriteLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default FavouriteLayout;
