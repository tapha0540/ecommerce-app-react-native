import { Op } from "sequelize";
import User from "../models/user.model.js";
import PasswordHash from "../utils/passwordHash.js";
import Session from "../utils/session.js";

/**
 * @param req
 * @returns Promise<{ success: boolean, message: string}>
 */
const AuthController = {
  signUp: async (req, res) => {
    const { firstName, lastName, email, phone, password } = req.body;

    // Verifier si un utilisateur avec le même email ou phone existe déja.
    const user = await User.findOne({
      where: { [Op.or]: [{ email }, { phone }] },
    });

    if (user) {
      let message = "";

      if (user.email === email && user.phone === phone) {
        message = "Un utilisateur avec cet email et ce numéro existe déjà.";
      } else if (user.email === email) {
        message = "Un utilisateur avec cet email existe déjà.";
      } else if (user.phone === phone) {
        message = "Un utilisateur avec ce numéro de téléphone existe déjà.";
      }

      return res.status(400).json({
        success: false,
        message,
      });
    }

    // Tout est bon.On peut creer le compte utilisateur.

    const hashedPassword = await PasswordHash.hash(password);

    const newUser = await User.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      password: hashedPassword,
    });

    if (newUser) {
      return res.status(200).json({
        success: true,
        message: "Votre compte a été créé avec succès.",
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Erreur coté serveur.",
      });
    }
  },
  logIn: async (req, res) => {
    const { email, password } = req.body;

    const filteredEmail = email.trim();

    const user = await User.findOne({ where: { email: filteredEmail } });

    // S'il n'y a pas d'utilisateur avec un tel email.
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Pas de compte avec un tel email.",
      });
    }
    // si un utilisateur avec un tel email existe.
    // Je vérifie que le mot de passe est correct.
    const isMatch = PasswordHash.compare(password, user.password);

    if (isMatch) {
      const token = Session.generateToken({ id: user.id });

      return res.status(200).json({
        success: true,
        message: "Connexion réussie.",
        token,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Mot de passe incorrect.",
      });
    }
  },
  getUserSession: async (req, res) => {
    // Si tous s'est bien passé.
    return res.status(200).json({
      success: true,
      message: "Session retrouvé",
      user: req.user,
    });
  },
};

export default AuthController;
