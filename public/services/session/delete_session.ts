import { deleteItemAsync } from "expo-secure-store";

const deleteSession = async () => {
  await deleteItemAsync("session_token").catch((err) => {
    console.error("Error while deleting a session : ", err);
  });
};

export default deleteSession;
