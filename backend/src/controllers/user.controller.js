import Logger from "../config/logger.js";
import User from "../models/user.model.js";

const UserController = {
  createUser: async (req, res) => {
    try {
      const user = await User.create({
        first_name: "Moustapha",
        last_name: "Fall",
        email: "fmoustapha095@gmail.com",
        phone: "+221763190540",
        password: "0540",
      });
      const success = !!user;
      res.json({
        success,
        message: success ? "Operation reussie" : "Echec",
        user,
      });
    } catch (e) {
      Logger.error(e);
      res.json({
        success: false,
        message: "Erreur coté serveur !",
      });
    }
  },
};

export default UserController;
