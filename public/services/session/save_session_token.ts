import { setItemAsync } from "expo-secure-store";

const saveSession = (token: string) => {
  setItemAsync("session_token", token);
};

export default saveSession;
