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
  style?: StyleProp<any>;
}) => {
  const [pressed, setPressed] = useState(false);
  return (
    <ThemedCard
      style={{
        ...style,
        backgroundColor: pressed ? theme.primaryColor : theme.backgroundColor,
      }}
      onPress={() => {
        Vibration.vibrate(55);
        setPressed(true);
        onPress();

        setTimeout(() => {
          setPressed(false);
        }, 250);
      }}
      theme={theme}
    >
      {icon}
    </ThemedCard>
  );
};

export default PressableIcon;
