import { StyleSheet, Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import Theme from "../interfaces/themes";

const ThemeActivityIndicator = ({
  loading,
  size,
  theme,
  text,
}: {
  loading: boolean;
  size: number | "small" | "large";
  theme: Theme;
  text: string;
}) => {
  return loading ? (
    <View style={styles.activityIndicatorContainer}>
      <ActivityIndicator size={size} color={theme.primaryColor} />
      <Text style={{ color: theme.primaryColor }}>{text}</Text>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    rowGap: 10,
  },
});

export default ThemeActivityIndicator;
