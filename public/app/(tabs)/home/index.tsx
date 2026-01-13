import User from "@/components/interfaces/user";
import { useUser } from "@/hooks/userHooks";
import { Redirect } from "expo-router";
import { SquareUserRoundIcon } from "lucide-react-native";
import { Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const user = useUser()!.user;

  if (!user) {
    return <Redirect href="/signin/login" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <TopContainer user={user} />
      </View>
    </SafeAreaView>
  );
};

const TopContainer = ({ user }: { user: User }) => {
  return (
    <View style={styles.topContainer}>
      <View>
        {false ? (
          <Image source={{ uri: "" /*user.profileImgUrl*/ }} />
        ) : (
          <SquareUserRoundIcon size={24} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    marginHorizontal: 15,
  },
  topContainer: {},
});
export default HomeScreen;
