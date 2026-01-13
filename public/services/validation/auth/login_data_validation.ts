import { emailRegex } from "./regex/regex";

const validateLogInData = ({
  email,
  password,
}: {
  email: string;
  password: string;
}): string | null => {
  if (!email && !password) {
    return "Tous les champs sont obligatoires.";
  }
  if (!email || !emailRegex.test(email)) {
    return "Veuillez entrer une adresse email valide.";
  }
  if (!password || password.length < 4) {
    return "Le mot de passe doit contenir au moins 4 caractères.";
  }
  return null;
};

export default validateLogInData;
