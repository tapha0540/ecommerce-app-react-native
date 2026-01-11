const validateSignupData = (data: { firstName: string; lastName: string; email: string; password: string; confirmPassword: string; }) => {
  const { firstName, lastName, email, password, confirmPassword } = data;
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    return "Veuillez remplir tous les champs.";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Veuillez entrer une adresse e-mail valide.";
  }
  if (password !== confirmPassword) {
    return "Les mots de passe ne correspondent pas.";
  }
  if (password.length < 4) {
    return "Le mot de passe doit contenir au moins 4 caractères.";
  }
    return null; // No validation errors
};

export default validateSignupData;