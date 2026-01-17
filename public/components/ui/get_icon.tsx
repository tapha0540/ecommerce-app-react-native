import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  Ionicons,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { SearchXIcon } from "lucide-react-native";
import { StyleSheet } from "react-native";
import Theme from "../interfaces/themes";


// This fonction take parameter icon with the following format 'iconLibrary:iconName'
const GetIcon = ({
  icon,
  size,
  theme,
  isSelected,
}: {
  icon: string;
  size: number;
  theme: Theme;
  isSelected: boolean;
}) => {
  const [iconLibrary, iconName] = icon.split(":");
  const color = isSelected ? theme.backgroundColor : theme.iconColor;

  switch (iconLibrary) {
    case "MaterialIcons":
      return (
        <MaterialIcons
          name={iconName as any}
          size={size}
          color={color}
          style={styles.icons}
        />
      );
    case "Ionicons":
      return (
        <Ionicons
          name={iconName as any}
          size={size}
          color={color}
          style={styles.icons}
        />
      );
    case "FontAwesome6":
      return (
        <FontAwesome6
          name={iconName as any}
          size={size}
          color={color}
          style={styles.icons}
        />
      );
    case "FontAwesome":
      return (
        <FontAwesome
          name={iconName as any}
          size={size}
          color={color}
          style={styles.icons}
        />
      );
    case "AntDesign":
      return (
        <AntDesign
          name={iconName as any}
          size={size}
          color={color}
          style={styles.icons}
        />
      );
    case "FontAwesome5":
      return (
        <FontAwesome5
          name={iconName as any}
          size={size}
          color={color}
          style={styles.icons}
        />
      );
    case "Entypo":
      return (
        <Entypo
          name={iconName as any}
          size={size}
          color={color}
          style={styles.icons}
        />
      );
    case "SimpleLineIcons":
      return (
        <SimpleLineIcons
          name={iconName as any}
          size={size}
          color={color}
          style={styles.icons}
        />
      );
    case "Feather":
      return (
        <Feather
          name={iconName as any}
          size={size}
          color={color}
          style={styles.icons}
        />
      );
    default:
      return (
        <SearchXIcon
          size={size}
          color={color}
          style={styles.icons}
          fill={color}
        />
      );
  }
};
const styles = StyleSheet.create({
  icons: {
    alignSelf: "center",
  },
});
export default GetIcon;
