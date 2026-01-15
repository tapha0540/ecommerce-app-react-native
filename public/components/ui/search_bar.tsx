import { Search, Settings2Icon } from "lucide-react-native";
import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Card } from "react-native-paper";
import Theme from "../interfaces/themes";

const SearchBar = ({ theme }: { theme: Theme }) => {
  const [search, setSearch] = useState<string>("");
  return (
    <View style={styles.searchBarContainer}>
      <View
        style={[
          styles.txtInputContainer,
          { backgroundColor: theme.secondaryColor },
        ]}
      >
        <Search size={25} color={theme.iconColor} />
        <TextInput
          placeholder="Rechercher"
          value={search}
          onChangeText={setSearch}
          style={styles.textInput}
          maxLength={50}
          numberOfLines={1}
          multiline
        />
      </View>

      <Card style={{ backgroundColor: theme.secondaryColor, padding: 12 }}>
        <Settings2Icon size={25} color={theme.iconColor} />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: "row",
    columnGap: 10,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 2
  },
  textInput: {
    width: "70%",
    height: 40,
    fontSize: 14,
  },
  txtInputContainer: {
    display: "flex",
    flexDirection: "row",
    columnGap: 5,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "80%",
    padding: 6,
    elevation: 3,
    borderRadius: 15,
  },
});

export default SearchBar;
