import { Op } from "sequelize";
import User from "../models/user.model";

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
    const newUser = await User.create({
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      password,
    });

    if (newUser) {
      return res.status(200).json({
        success: true,
        message: "Votre compte a été créé avec succès.",
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Erreur coté serveur."
      })
    }
  },
  logIn: async () => {},
  getSession: async () => {},
};

export default AuthController;
