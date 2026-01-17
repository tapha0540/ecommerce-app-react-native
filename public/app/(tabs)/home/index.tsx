import User from "@/components/interfaces/api/user";
import Theme from "@/components/interfaces/themes";
import ProductsCategoriesFilter from "@/components/ui/categories_filter_bar";
import SearchBar from "@/components/ui/search_bar";
import { BoldText, LightText } from "@/components/ui/text";
import { ThemedCard } from "@/components/ui/themed_card";
import { useTheme } from "@/hooks/useColorsheme";
import { useUser } from "@/hooks/userHooks";
import { Feather } from "@expo/vector-icons";

import { Redirect } from "expo-router";
import { BellIcon, SquareUserRoundIcon } from "lucide-react-native";
import { Image, ScrollView, StyleSheet, View } from "react-native";
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
          <TopContainer user={user} theme={theme} />

          <ProductsCategoriesFilter theme={theme}  />
        
          <MiddleContainer theme={theme} />
      </ScrollView>
    </SafeAreaView>
  );
};

const TopContainer = ({ user, theme }: { user: User; theme: Theme }) => {
  return (
    <View style={[styles.topContainer, styles.body]}>
      <View style={styles.profileContainer}>
        <View style={styles.profile}>
          {user.profileImgUrl ? (
            <View style={styles.profileImgContainer}>
              <Image
                source={{ uri: user.profileImgUrl }}
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
              <BoldText
                style={[styles.profileUserName, { color: theme.primaryColor }]}
                content={`${user.firstName}`}
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
          <ThemedCard
            theme={theme}
            style={styles.card}
            // onPress={() => {}}
          >
            <BellIcon size={25} color={theme.iconColor} />
          </ThemedCard>

          <ThemedCard theme={theme} style={styles.card} onPress={() => {}}>
            <Feather name="shopping-bag" color={theme.iconColor} size={25} />
          </ThemedCard>
        </View>
      </View>
      <SearchBar theme={theme} />
    </View>
  );
};

const MiddleContainer = ({ theme }: { theme: Theme }) => {
  return <View></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    marginTop: 5,
    marginHorizontal: 15,
    padding: 3,
    rowGap: 25,
  },
  topContainer: {
    width: "auto",
    height: "auto",
    rowGap: 15,
    alignItems: "center",
    justifyContent: "space-around",
    padding: 3,
  },
  profileContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    columnGap: 10,
  },
  profileImg: { width: "100%", height: "100%" },
  profileImgContainer: { width: 60, height: 60 },
  iconsContainer: {
    flexDirection: "row",
    columnGap: 10,
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
    letterSpacing: 1.5,
    fontSize: 14,
  },
});
export default HomeScreen;
