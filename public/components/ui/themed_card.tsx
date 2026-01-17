import { ReactNode } from "react";
import { StyleProp, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import Theme from "../interfaces/themes";

export const ThemedCard = ({
  theme,
  children,
  style,
  onPress
}: {
  theme: Theme;
  children: ReactNode;
  style?: StyleProp<any>;
  onPress?: () => void
}) => {
  return (
    <Card
      style={[
        styles.card,
        {
          backgroundColor: theme.secondaryColor,
          borderWidth: 1,
          borderColor: theme.primaryColor,
        },
        style,
      ]}
      onPress={onPress}
    >
      {children}
    </Card>
  );
};
const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    alignItems: "center",
  },
});
