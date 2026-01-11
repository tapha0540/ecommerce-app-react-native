import SignUpResponse from "@/components/interfaces/requestResponses";
import ip from "./ip";

const signUp = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Promise<SignUpResponse> => {
  try {
    const response = await fetch(
      `http://${ip}/ecommerce-app-react-native/auth/signup.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      }
    );
    if (!response.ok) {
      return {
        success: false,
        message: "Vérifier votre connexion !",
      } as SignUpResponse;
    }
    const data = await response.json();
    return data as SignUpResponse;
  } catch (error) {
    console.error("Error during signup:", error);
    return {
      success: false,
      message: "Erreur coté serveur !",
    } as SignUpResponse;
  }
};

export default signUp;
