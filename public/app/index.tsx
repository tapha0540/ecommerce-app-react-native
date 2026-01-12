import { Redirect } from "expo-router";
import { useUser } from "../hooks/userHooks";

const Index = () => {
  const user = useUser()?.user;
  const isLoggedIn = !!user;

  if (isLoggedIn) {
    return <Redirect href="/(tabs)" />;
  } else {
    return <Redirect href="/signin" />;
  }
};

export default Index;
