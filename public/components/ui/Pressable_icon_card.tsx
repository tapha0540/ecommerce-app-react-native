import { ReactNode, useState } from "react";
import { StyleProp, Vibration } from "react-native";
import Theme from "../interfaces/themes";
import { ThemedCard } from "./themed_card";


const PressableIcon = ({
  icon,
  theme,
  onPress,
  style,
}: {
  icon: ReactNode;
  theme: Theme;
  onPress: () => void;
  style: StyleProp<any>;
}) => {
  const [bgColor, setBgColor] = useState(theme.backgroundColor);

  return (
    <ThemedCard
      style={{ ...style, backgroundColor: bgColor }}
      onPress={() => {
        setTimeout(() => {
          setBgColor(theme.primaryColor);
          Vibration.vibrate(70);
          onPress();
        }, 200);
      }}
      theme={theme}
    >
      {icon}
    </ThemedCard>
  );
};

export default PressableIcon;
