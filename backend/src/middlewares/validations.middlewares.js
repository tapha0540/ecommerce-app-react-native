export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email et password requis",
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

  next();
};
