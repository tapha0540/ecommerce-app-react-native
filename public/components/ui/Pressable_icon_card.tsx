import { ReactNode } from "react";
import { StyleProp, Vibration } from "react-native";
import Theme from "../interfaces/themes";
import { ThemedCard } from "./themed_card";

const PressableIcon = ({
  icon,
  theme,
  onPress,
  style,
  isSelected,
}: {
  icon: ReactNode;
  theme: Theme;
  onPress: () => void;
  style: StyleProp<any>;
  isSelected: boolean;
}) => {
  return (
    <ThemedCard
      style={{
        ...style,
        backgroundColor: isSelected
          ? theme.primaryColor
          : theme.backgroundColor,
      }}
      onPress={() => {
        Vibration.vibrate(45);
        onPress();
      }}
      theme={theme}
    >
      {icon}
    </ThemedCard>
  );
};

export default PressableIcon;
