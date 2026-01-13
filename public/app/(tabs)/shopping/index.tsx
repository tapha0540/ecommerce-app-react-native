import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ShoppingScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Shopping</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ShoppingScreen;
