import { ReactNode, useState } from "react";
import { StyleProp } from "react-native";
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
          onPress();
        }, 250);
      }}
      theme={theme}
    >
      {icon}
    </ThemedCard>
  );
};

export default PressableIcon;
