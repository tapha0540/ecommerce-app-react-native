import { useTheme } from "@/hooks/useColorsheme";
import { useState } from "react";
import { Pressable, StyleSheet, Vibration } from "react-native";
import { Text } from "react-native-paper";

export const ThemeButton = ({
  text,
  icon,
  onPress,
}: {
  text: string;
  icon?: React.ReactNode;
  onPress: () => void;
}) => {
  const theme = useTheme()!.theme;

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
}: {
  text: string;
  icon?: React.ReactNode;
  onPress: () => void;
}) => {
  const theme = useTheme()!.theme;
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
      <Text style={[styles.buttonText, { color: activeTxtColor }]}>
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    alignSelf: "center",
    maxWidth: 250,
    width: "35%",
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
