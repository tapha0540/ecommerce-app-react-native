import { useState } from "react";
import { Pressable, StyleSheet, Vibration } from "react-native";
import { Text } from "react-native-paper";
import Theme from "../interfaces/themes";

interface ButtonProps {
  text: string;
  icon?: React.ReactNode;
  onPress: () => void;
  theme: Theme;
}

export const ThemeButton = ({ text, icon, onPress, theme }: ButtonProps) => {
  return (
    <Pressable
      style={[styles.buttons, { backgroundColor: theme.primaryColor }]}
      onPress={onPress}
    >
      {icon}
      <Text style={[styles.buttonText, { color: theme.backgroundColor }]}>
        {text}
      </Text>
    </Pressable>
  );
};

export const OutlineThemeButton = ({
  text,
  icon,
  onPress,
  theme,
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
      <Text style={[styles.buttonText, { color: activeTxtColor }]}>{text}</Text>
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
    width: "45%",
    height: 50,
    padding: 5,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 10,
  },
});
