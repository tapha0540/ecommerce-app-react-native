import { Redirect } from "expo-router";
import { useUser } from "../hooks/userHooks";

const Index = () => {
  const userHook = useUser();

  if (!userHook || userHook.loading) return null;

  return userHook.user ? (
    <Redirect href="/(tabs)/home" />
  ) : (
    <Redirect href="/signin/login" />
  );
};

export default Index;
