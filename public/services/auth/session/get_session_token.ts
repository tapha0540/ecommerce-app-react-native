import { getItemAsync } from "expo-secure-store";

const getSessionToken = async () => {
  return await getItemAsync("session_token");
};

export default getSessionToken;
