const validateLogInData = ({
  email,
  password,
}: {
  email: string;
  password: string;
}): string | null => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email || !emailRegex.test(email)) {
    return "Veuillez entrer une adresse email valide.";
  }
  if (!password || password.length < 4) {
    return "Le mot de passe doit contenir au moins 4 caractères.";
  }
  return null;
};

export default validateLogInData;
