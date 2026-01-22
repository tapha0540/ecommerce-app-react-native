import {
  LoginData,
  LoginResponse,
} from "@/components/interfaces/api/requestResponses";
import ip from "../../ip";
import saveSession from "../../session/save_session_token";

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
    const data: LoginResponse = (await response.json()) as LoginResponse;

    if (data.success && data.token) {
      saveSession(data.token);
    }

    return data;
  } catch (error) {
    console.error("Error during login:", error);
    // Verifier si c'est une erreur de connexion.
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      return {
        success: false,
        message:
          "Impossible de se connecter au serveur. Vérifiez votre connexion ou réessayez plus tard.",
      } as LoginResponse;
    }

    return {
      success: false,
      message: "Erreur coté serveur !",
    } as LoginResponse;
  }
};

export default logIn;
