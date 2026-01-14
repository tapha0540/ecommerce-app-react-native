import { StyleSheet, View } from "react-native";
import Theme from "../interfaces/themes";
import { BoldText } from "./text";

const CategoriesFilter = ({ theme }: { theme: Theme }) => {
  return (
    <View style={styles.container}>
      <BoldText content="Categories" theme={theme} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CategoriesFilter;
