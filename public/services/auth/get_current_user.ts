import User from "@/components/interfaces/user";
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
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const user = (await res.json()) as User;

    return user;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default getCurrentUser;
