import AsyncStorage from "@react-native-async-storage/async-storage";

const saveSession = (token: string) => {
  AsyncStorage.setItem("session_id", token);
};

export default saveSession;
