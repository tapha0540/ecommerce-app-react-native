import Theme from "@/components/interfaces/themes";
import User from "@/components/interfaces/user";
import { BoldText, LightText } from "@/components/ui/text";
import { useTheme } from "@/hooks/useColorsheme";
import { useUser } from "@/hooks/userHooks";
import { SimpleLineIcons } from "@react-native-vector-icons/simple-line-icons";
import { Redirect } from "expo-router";
import { BellIcon, SquareUserRoundIcon } from "lucide-react-native";
import { Image, StyleSheet, View } from "react-native";
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
      <View style={styles.body}>
        <TopContainer user={user} theme={theme} />
      </View>
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
            <LightText
              style={[styles.profileUserName]}
              content={`Hi ${user.firstName} ${user.lastName}`}
              theme={theme}
            />
            <BoldText
              style={styles.greeting}
              content={new Date().getHours() < 13 ? "Bonjour" : "Bonsoir"}
              theme={theme}
            />
          </View>
        </View>

        <View style={styles.iconsContainer}>
          <Card>
            <BellIcon size={24} color={theme.iconColor} />
          </Card>

          <Card>
            <SimpleLineIcons name="handbag" color={theme.iconColor} />
          </Card>
        </View>
      </View>
      {/* search bar */}
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
    padding: 10,
  },
  topContainer: {
    width: "auto",
    height: "auto",
  },
  profileContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileImg: { width: "100%", height: "100%" },
  profileImgContainer: { width: 60, height: 60 },
  iconsContainer: {},
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
