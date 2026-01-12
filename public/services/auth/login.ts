import {
  LoginData,
  LoginResponse,
} from "@/components/interfaces/requestResponses";
import ip from "./ip";
import saveSession from "./session/save_session";

const logIn = async ({
  email,
  password,
}: LoginData): Promise<LoginResponse> => {
  try {
    const response = await fetch(`http://${ip}/controllers/auth/login.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });
    if (!response.ok) {
      return {
        success: false,
        message: "Vérifier votre connexion !",
      } as LoginResponse;
    }
    const data: LoginResponse = await response.json();
    
    console.log(data);
    
    if (data.token) {
      saveSession(data.token);
    };

    return data;
  } catch (error) {
    console.error("Error during login:", error);
    return {
      success: false,
      message: "Erreur coté serveur !",
    } as LoginResponse;
  }
};

export default logIn;
