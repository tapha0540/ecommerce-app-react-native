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
      style={[style, { color: theme.textColor, fontFamily: theme.fontFamily }]}
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
      style={[style, styles.boldText]}
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
      style={[style, styles.lightText]}
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
