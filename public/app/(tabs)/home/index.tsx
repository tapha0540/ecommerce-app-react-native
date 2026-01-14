import Theme from "@/components/interfaces/themes";
import User from "@/components/interfaces/user";
import SearchBar from "@/components/ui/search_bar";
import { BoldText, LightText } from "@/components/ui/text";
import { useTheme } from "@/hooks/useColorsheme";
import { useUser } from "@/hooks/userHooks";
import { Feather } from "@expo/vector-icons";

import { Redirect } from "expo-router";
import { BellIcon, SquareUserRoundIcon } from "lucide-react-native";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Card } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const user = useUser()!.user;
  const theme = useTheme()!.theme;

  if (!user) {
    return <Redirect href="/signin/login" />;
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.body}>
          <TopContainer user={user} theme={theme} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const TopContainer = ({ user, theme }: { user: User; theme: Theme }) => {
  return (
    <View style={styles.topContainer}>
      <View style={styles.profileContainer}>
        <View style={styles.profile}>
          {false ? (
            <View style={styles.profileImgContainer}>
              <Image
                source={require("@/assets/images/react-logo.png")}
                style={styles.profileImg}
              />
            </View>
          ) : (
            <SquareUserRoundIcon
              width={60}
              height={60}
              color={theme.iconColor}
            />
          )}
          <View style={styles.profileTexts}>
            <View style={{ flexDirection: "row" }}>
              <LightText content="Salut " theme={theme} />
              <LightText
                style={[styles.profileUserName, { color: theme.primaryColor }]}
                content={`${user.firstName} ${user.lastName}`}
                theme={theme}
              />
            </View>
            <BoldText
              style={styles.greeting}
              content={new Date().getHours() < 13 ? "Bonjour" : "Bonsoir"}
              theme={theme}
            />
          </View>
        </View>

        <View style={styles.iconsContainer}>
          <Card
            style={[styles.card, { backgroundColor: theme.secondaryColor }]}
            onPress={() => {}}
          >
            <BellIcon size={25} color={theme.iconColor} />
          </Card>

          <Card
            style={[styles.card, { backgroundColor: theme.secondaryColor }]}
          >
            <Feather name="shopping-bag" color={theme.iconColor} size={25} />
          </Card>
        </View>
      </View>

      <SearchBar theme={theme} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    marginTop: 5,
    marginHorizontal: 15,
    padding: 5,
    rowGap: 25,
  },
  topContainer: {
    width: "auto",
    height: "auto",
    rowGap: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  profileContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    columnGap: 15,
  },
  profileImg: { width: "100%", height: "100%" },
  profileImgContainer: { width: 60, height: 60 },
  iconsContainer: {
    flexDirection: "row",
    columnGap: 15,
    justifyContent: "space-between",
    padding: 5,
  },
  card: {
    padding: 10,
  },
  profile: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    columnGap: 10,
  },
  profileTexts: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    rowGap: 10,
  },
  greeting: {
    fontWeight: "900",
  },
  profileUserName: {
    fontWeight: "100",
  },
});
export default HomeScreen;
