import { SessionResponse } from "@/components/interfaces/api/requestResponses";
import User from "@/components/interfaces/api/user";
import ip from "./ip";
import getSessionToken from "./session/get_session_token";

const getCurrentUser = async (): Promise<User | null> => {
  const token = await getSessionToken();
  if (!token) return null;
  try {
    const res = await fetch(
      `http://${ip}/controllers/auth/get_session_user.php`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    const data: SessionResponse = await res.json();

    return data.user;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default getCurrentUser;
