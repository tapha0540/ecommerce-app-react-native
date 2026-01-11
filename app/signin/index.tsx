import { useTheme } from "@/hooks/useColorsheme";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Signin = () => {
  const theme = useTheme()!.theme;

  return (
    <>
      <SafeAreaView>
        <Text>Bonjour</Text>
      </SafeAreaView>
    </>
  );
};

export default Signin;
