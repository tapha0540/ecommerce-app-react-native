import { useState } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
} from "react-native";
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
      ellipsizeMode="tail"
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

export const PressableText = ({
  content,
  theme,
  style,
  onPress,
}: {
  content: string;
  theme: Theme;
  style?: StyleProp<TextStyle>;
  onPress: () => void;
}) => {
  const [bg, setBg] = useState(theme.textColor);
  return (
    <Pressable
      onPress={() => {
        setBg(theme.primaryColor);
        setTimeout(() => {
          setBg(theme.textColor);
          onPress();
        }, 150);
      }}
      style={[styles.pressable]}
    >
      <ThemedText
        theme={theme}
        content={content}
        style={[styles.btnText, { color: bg }]}
      />
    </Pressable>
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
  pressable: {
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  btnText: {
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
    paddingHorizontal: 10,
  },
});
