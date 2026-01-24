import AsyncStorage from "@react-native-async-storage/async-storage";

const saveEmail = async (email: string) => {
  await AsyncStorage.setItem("email", email);
};

export default saveEmail;
