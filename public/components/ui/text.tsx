import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";
import Theme from "../interfaces/themes";

export const ThemedText = ({
  theme,
  style,
  content,
}: {
  theme: Theme;
  style?: StyleProp<TextStyle>;
  content: string;
}) => {
  return (
    <Text
      style={[{ color: theme.textColor, fontFamily: theme.fontFamily }, style]}
    >
      {content}
    </Text>
  );
};

export const BoldText = ({
  theme,
  style,
  content,
}: {
  theme: Theme;
  style?: StyleProp<TextStyle>;
  content: string;
}) => {
  return (
    <ThemedText
      style={[styles.boldText, style]}
      theme={theme}
      content={content}
    />
  );
};
export const LightText = ({
  theme,
  style,
  content,
}: {
  theme: Theme;
  style?: StyleProp<TextStyle>;
  content: string;
}) => {
  return (
    <ThemedText
      style={[styles.lightText, style]}
      theme={theme}
      content={content}
    />
  );
};
const styles = StyleSheet.create({
  text: {},
  boldText: {
    fontWeight: "bold",
  },
  lightText: {
    fontWeight: "light",
  },
});
