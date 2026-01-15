import { Pressable, StyleSheet, View } from "react-native";
import Theme from "../interfaces/themes";
import { BoldText, LightText } from "./text";
import { useState } from "react";

const ProductsCategoriesFilter = ({ theme }: { theme: Theme }) => {
  const [categories, setCatgories] = useState< | null>(null);

  return (
    <View style={styles.container}>
      <View style={styles.headingTxtContainer}>
        <BoldText
          content="Categories"
          theme={theme}
          style={styles.HeadingTxt}
        />
        <Pressable>
          <LightText content="Voir plus" theme={theme} />
        </Pressable>
      </View>

      <View>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headingTxtContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  HeadingTxt: {
    fontSize: 18,
  },
});

export default ProductsCategoriesFilter;
