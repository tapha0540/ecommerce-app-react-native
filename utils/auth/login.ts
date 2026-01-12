import { LoginResponse } from "@/components/interfaces/requestResponses";
import ip from "./ip";

const logIn = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await fetch(
      `http://${ip}/ecommerce-app-react-native/auth/login.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      }
    );
    if (!response.ok) {
      return {
        success: false,
        message: "Vérifier votre connexion !",
      } as LoginResponse;
    }
    const data = await response.json();
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
