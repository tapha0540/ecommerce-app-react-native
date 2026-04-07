import { Stack } from "expo-router";

const OrderScreenLayout = () => {
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

export default OrderScreenLayout;
