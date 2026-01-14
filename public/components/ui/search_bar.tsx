import { Search, Settings2Icon, View } from "lucide-react-native";
import { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { Card } from "react-native-paper";
import Theme from "../interfaces/themes";

const SearchBar = ({ theme }: { theme: Theme }) => {
  const [search, setSearch] = useState<string>("");
  return (
    <View style={styles.searchBarContainer}>
      <Card style={{ padding: 10, backgroundColor: theme.secondaryColor }}>
        <Search size={25} color={theme.iconColor} />
        <TextInput
          value={search}
          onChangeText={setSearch}
          style={styles.textInput}
        />
      </Card>
      <Card style={{ padding: 10, backgroundColor: theme.secondaryColor }}>
        <Settings2Icon size={25} />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: "row",
    columnGap: 20,
    justifyContent: "space-between",
    width: "100%",
  },
  textInput: {
    width: "80%",
  },
});

export default SearchBar;
