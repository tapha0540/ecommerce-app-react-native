import AsyncStorage from "@react-native-async-storage/async-storage";

const getSessionToken = async () => {
  return await AsyncStorage.getItem("session_token");
};

export default getSessionToken;
