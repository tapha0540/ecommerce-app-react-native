import Validation from "../utils/validations.js";

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email et password requis",
    });
  }

  const emailValidation = Validation.email(email);
  const passwordValidation = Validation.password(password);

  if (!emailValidation.valid || !passwordValidation.valid) {
    return res.status(400).json({
      success: false,
      message: [emailValidation?.error, passwordValidation?.error]
        .filter((v) => v !== null)
        .join("\n"),
    });
  }
  next();
};

export const validateSignUp = (req, res, next) => {
  const { firstName, lastName, email, phone, password } = req.body;

  if (!firstName || !lastName || !phone || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Tous les champs sont requis",
    });
  }

  const firstNameValidation = Validation.name("Prénom", firstName);
  const lastNameValidation = Validation.name("Nom", lastName);
  const emailValidation = Validation.email(email);
  const phoneValidation = Validation.phone(phone);
  const passwordValidation = Validation.password(password);
  
  if (
    !firstNameValidation.valid ||
    !lastNameValidation.valid ||
    !emailValidation.valid ||
    !phoneValidation.valid ||
    !passwordValidation.valid
  ) {
    return res.status(400).json({
      success: false,
      message: [
        firstNameValidation?.error,
        lastNameValidation?.error,
        emailValidation?.error,
        phoneValidation?.error,
        passwordValidation?.error,
      ]
        .filter((v) => v !== null)
        .join("\n"),
    });
  }

  next();
};
