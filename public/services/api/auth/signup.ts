import SignUpResponse, {
  SignUpData,
} from "@/components/interfaces/api/requestResponses";
import ip from "../../ip";

const signUp = async ({
  firstName,
  lastName,
  phone,
  email,
  password,
}: SignUpData): Promise<SignUpResponse> => {
  try {
    const response = await fetch(`http://${ip}/controllers/auth/signup.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, email, phone, password }),
    });

    const data = (await response.json()) as SignUpResponse;

    return data;
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
