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

    console.log("Signup response status:");
    if (!response.ok) {
      return {
        success: false,
        message: "Vérifier votre connexion !",
      } as SignUpResponse;
    }
    const data = await response.json();
    return data as SignUpResponse;
  } catch (error: any) {
    console.error("Error during signup:", error);

    // Vérifier si c'est une erreur réseau
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      return {
        success: false,
        message:
          "Impossible de se connecter au serveur. Vérifiez votre connexion ou réessayez plus tard.",
      } as SignUpResponse;
    }

    return {
      success: false,
      message: "Erreur côté serveur !",
    } as SignUpResponse;
  }
};

export default signUp;
