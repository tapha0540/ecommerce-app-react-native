import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import Theme from "../interfaces/themes";
import { BoldText } from "./text";

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
      <BoldText
        style={{ color: theme.primaryColor }}
        content={text}
        theme={theme}
      />
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    alignSelf: 'center',
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    rowGap: 10,
  },
});

export default ThemeActivityIndicator;
