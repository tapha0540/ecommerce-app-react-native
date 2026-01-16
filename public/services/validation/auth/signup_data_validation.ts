import { SignUpData } from "@/components/interfaces/api/requestResponses";
import { emailRegex, numeric } from "./regex/regex";

const validateSignupData = ({
  firstName,
  lastName,
  email,
  phone,
  password,
  confirmPassword,
}: SignUpData & { confirmPassword: string }) => {
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !confirmPassword
  ) {
    return "Veuillez remplir tous les champs.";
  }
  if (!emailRegex.test(email)) {
    return "Veuillez entrer une adresse e-mail valide.";
  }
  if (password !== confirmPassword) {
    return "Les mots de passe ne correspondent pas.";
  }
  if (password.length < 4) {
    return "Le mot de passe doit contenir au moins 4 caractères.";
  }
  if (phone.length < 9 && !numeric.test(phone)) {
    return "Le numéro de téléphone est invalide.";
  }
  return null; // No validation errors
};

export default validateSignupData;
