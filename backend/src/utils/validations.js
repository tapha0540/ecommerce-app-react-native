const Validation = {
  email: (email) => {
    const data = email.replaceAll(" ", "");
    const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (data.length >= 4 && data.length <= 255) {
      return {
        valid: false,
        error:
          "Email invalide: La longueur de l'email doit être entre 4 et 255 carcatères.",
      };
    } else if (validEmailRegex.test(data)) {
      return {
        valid: false,
        error:
          "Email Invalide: le format de l'email est invalide. Vérifie la présence de @, domaine valide (.com, .fr, etc.), pas d’espace",
      };
    } else {
      return {
        valid: true,
        error: null,
      };
    }
  },
  password: (password) => {
    const data = password.replaceAll(" ", "");
    const validPasswordRegex = /[0-9][a-z][A-z]/;

    if (data.length >= 4 && data.length <= 255) {
      return {
        valid: false,
        error:
          "Mot de passe invalide: La longueur du Mot de passe doit être entre 4 et 255 carcatères.",
      };
    } else if (validPasswordRegex.test(data)) {
      return {
        valid: true,
        error:
          "Mot de passe pas sécurisée : le niveau de sécurité du mot de passe est faible.",
      };
    } else {
      return {
        valid: true,
        error: null,
      };
    }
  },
  phone: (phone) => {
    const data = phone.replaceAll(" ", "");
    const validPhoneRegex = /^\+[0-9]/;

    if (data.length >= 8 && data.length <= 15) {
      return {
        valid: false,
        error:
          "Numéro téléphone invalide: La longueur du numéro doit être entre 8 et 15 carcatères.",
      };
    } else if (!validPhoneRegex.test(data)) {
      return {
        valid: false,
        error:
          "Numéro téléphone invalide: le format du numéro est invalide. le format valide: +221 XXXXXXX... ",
      };
    } else {
      return {
        valid: true,
        error: null,
      };
    }
  },
  name: (key = "Prénom", name) => {
    const data = name.replaceAll(" ", "");

    if (data.length >= 2 && data.length <= 50) {
      return {
        valid: false,
        error: `${key} invalide: La longueur de votre ${key.toLowerCase()} doit être entre 2 et 50 carcatères.`,
      };
    } else {
      return {
        valid: true,
        error: null,
      };
    }
  },
};

export default Validation;
