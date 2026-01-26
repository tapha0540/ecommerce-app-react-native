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
  textStyle,
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
  textStyle,
}: ButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);
  return (
    <Pressable
      style={[
        styles.buttons,
        {
          backgroundColor: isPressed
            ? theme.primaryColor
            : theme.secondaryColor,
          borderWidth: 1,
          borderColor: theme.primaryColor,
        },
        style,
      ]}
      onPress={() => {
        Vibration.vibrate(100);
        setIsPressed(true);
        setTimeout(() => setIsPressed(false), 250);
        onPress();
      }}
    >
      {icon}
      <Text
        style={[
          styles.buttonText,
          { color: isPressed ? theme.backgroundColor : theme.primaryColor },
          textStyle,
        ]}
      >
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
    fontSize: 13,
    textAlign: "center",
    paddingHorizontal: 10,
  },
});
