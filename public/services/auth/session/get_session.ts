import AsyncStorage from "@react-native-async-storage/async-storage";

const getSession = async () => {
  const sessionId = await AsyncStorage.getItem("session_id");
  return sessionId;
};

export default getSession;
