import { useState } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  TextStyle,
  Vibration,
  ViewStyle,
} from "react-native";
import { Text } from "react-native-paper";
import Theme from "../interfaces/themes";

interface ButtonProps {
  text: string;
  icon?: React.ReactNode;
  onPress: () => void;
  theme: Theme;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const ThemedButton = ({
  text,
  icon,
  onPress,
  theme,
  style,
  textStyle
}: ButtonProps) => {
  return (
    <Pressable
      style={[styles.buttons, { backgroundColor: theme.primaryColor }, style]}
      onPress={() => {
        Vibration.vibrate(100);
        onPress();
      }}
    >
      {icon}
      <Text style={[styles.buttonText, { color: theme.textColor }, textStyle]}>
        {text}
      </Text>
    </Pressable>
  );
};

export const OutlineButton = ({
  text,
  icon,
  onPress,
  theme,
  style,
  textStyle
}: ButtonProps) => {
  const [activeBgColor, setActiveBgColor] = useState(theme.backgroundColor);
  const [activeTxtColor, setActiveTxtColor] = useState(theme.primaryColor);
  return (
    <Pressable
      style={[
        styles.buttons,
        {
          backgroundColor: activeBgColor,
          borderWidth: 1,
          borderColor: theme.primaryColor,
        },
        style,
      ]}
      onPress={() => {
        setActiveBgColor(theme.primaryColor);
        setActiveTxtColor(theme.backgroundColor);
        setTimeout(() => {
          setActiveBgColor(theme.backgroundColor);
          setActiveTxtColor(theme.primaryColor);
        }, 200);
        Vibration.vibrate(100);
        onPress();
      }}
    >
      {icon}
      <Text style={[styles.buttonText, { color: activeTxtColor }, textStyle]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    alignSelf: "center",
    maxWidth: 200,
    width: "50%",
    height: 50,
    marginTop: 20,
    padding: 15,
    borderRadius: 15,
    elevation: 5,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
    paddingHorizontal: 10,
  },
});
