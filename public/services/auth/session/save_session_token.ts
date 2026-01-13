import AsyncStorage from "@react-native-async-storage/async-storage";

const saveSession = (token: string) => {
  AsyncStorage.setItem("session_token", token);
};

export default saveSession;
